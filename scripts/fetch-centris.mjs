// Télécharge le zip Centris du jour depuis DriveHQ (WebDAV) + extrait dans _centris/.
// Recule jour par jour (jusqu'à 14 j) si le zip du jour n'est pas encore déposé.
// Secrets attendus : DRIVEHQ_USER, DRIVEHQ_PASS, DRIVEHQ_WEBDAV_URL
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const USER = process.env.DRIVEHQ_USER;
const PASS = process.env.DRIVEHQ_PASS;
const BASE = process.env.DRIVEHQ_WEBDAV_URL;
if (!USER || !PASS || !BASE) {
  console.error('Missing DRIVEHQ_USER / DRIVEHQ_PASS / DRIVEHQ_WEBDAV_URL');
  process.exit(1);
}

// YYYYMMDD dans le fuseau America/Toronto
function ymd(d) {
  const t = new Date(d.toLocaleString('en-US', { timeZone: 'America/Toronto' }));
  return `${t.getFullYear()}${String(t.getMonth()+1).padStart(2,'0')}${String(t.getDate()).padStart(2,'0')}`;
}

// Nettoie la valeur du secret : retire espaces / sauts de ligne / guillemets parasites, puis les / finaux
const baseRaw = BASE.trim().replace(/^["']|["']$/g, '').replace(/[\s]+$/g, '');
const baseUrl = baseRaw.replace(/\/+$/, '');
const tmp = path.join(process.cwd(), '_tmp.zip');
const MAX_DAYS_BACK = 14;
let fetched = false;
const now = new Date();

// host de l'URL (sans identifiants) pour diagnostic
let scheme = 'https';
try { const u = new URL(baseUrl); console.log(`WebDAV base: ${u.protocol}//${u.host}${u.pathname}`); scheme = u.protocol.replace(':',''); }
catch { console.error(`⚠ DRIVEHQ_WEBDAV_URL invalide : "${JSON.stringify(baseUrl).slice(0,40)}…"`); }

// candidats d'URL de base : la valeur donnée, + repli http↔https sur le même host/chemin
const bases = [baseUrl];
if (scheme === 'https') bases.push(baseUrl.replace(/^https:/, 'http:'));
else if (scheme === 'http') bases.push(baseUrl.replace(/^http:/, 'https:'));

function tryCurl(url) {
  try {
    const out = execSync(`curl -sS -L -o "${tmp}" -w "%{http_code}" --user "${USER}:${PASS}" "${url}" 2>/tmp/curlerr`, { encoding: 'utf8' }).trim();
    return { code: out, err: '' };
  } catch (e) {
    let err = '';
    try { err = fs.readFileSync('/tmp/curlerr', 'utf8').trim().split('\n')[0]; } catch {}
    return { code: '000', err };
  }
}

const codes = new Set();
let firstErr = '';
outer:
for (const base of bases) {
  for (let offset = 0; offset <= MAX_DAYS_BACK; offset++) {
    const d = new Date(now.getTime() - offset * 86400000);
    const fileName = `VPOURDESIGN${ymd(d)}.zip`;
    const url = `${base}/${fileName}`;
    process.stdout.write(`Trying ${base.replace(/^https?:\/\//,'').split('/')[0]} · ${fileName} … `);
    const { code, err } = tryCurl(url);
    codes.add(code);
    if (code === '200') { console.log(`✓ HTTP 200 (J-${offset})`); fetched = true; break outer; }
    if (!firstErr && err) firstErr = err;
    console.log(`× HTTP ${code}${err ? ' — ' + err : ''}`);
    if (code === '000' && offset === 0) break; // host injoignable sur cette base → passe au repli
  }
}

if (!fetched) {
  console.error(`Aucun zip récupéré. Codes : ${[...codes].join(', ')}`);
  if (firstErr) console.error(`Erreur curl : ${firstErr}`);
  if (codes.has('401') || codes.has('403')) console.error('→ 401/403 : DRIVEHQ_USER / DRIVEHQ_PASS incorrect.');
  else if (codes.has('404')) console.error('→ 404 : mauvais DRIVEHQ_WEBDAV_URL (fichier absent à ce chemin).');
  else if (codes.has('000')) console.error('→ 000 : host injoignable (SSL/connexion) — voir l\'erreur curl ci-dessus.');
  process.exit(1);
}

fs.rmSync('_centris', { recursive: true, force: true });
fs.mkdirSync('_centris', { recursive: true });
execSync(`unzip -q -o "${tmp}" -d _centris`, { stdio: 'inherit' });
fs.unlinkSync(tmp);
console.log('Zip Centris extrait dans _centris/.');
