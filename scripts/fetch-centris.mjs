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

const baseUrl = BASE.replace(/\/$/, '');
const tmp = path.join(process.cwd(), '_tmp.zip');
const MAX_DAYS_BACK = 14;
let fetched = false;
const now = new Date();

// host de l'URL (sans identifiants) pour diagnostic
try { console.log(`WebDAV host: ${new URL(baseUrl).host}`); }
catch { console.error(`⚠ DRIVEHQ_WEBDAV_URL invalide (pas une URL http(s)) : "${baseUrl.slice(0,12)}…"`); }

const codes = new Set();
for (let offset = 0; offset <= MAX_DAYS_BACK; offset++) {
  const d = new Date(now.getTime() - offset * 86400000);
  const fileName = `VPOURDESIGN${ymd(d)}.zip`;
  const url = `${baseUrl}/${fileName}`;
  process.stdout.write(`Trying ${fileName} … `);
  let code = '000';
  try {
    code = execSync(`curl -s -L -o "${tmp}" -w "%{http_code}" --user "${USER}:${PASS}" "${url}"`, { encoding: 'utf8' }).trim();
  } catch { code = '000'; }
  codes.add(code);
  if (code === '200') {
    console.log(`✓ HTTP 200 — téléchargé (J-${offset})`);
    fetched = true;
    break;
  }
  console.log(`× HTTP ${code}`);
}

if (!fetched) {
  console.error(`Aucun zip récupéré. Codes vus : ${[...codes].join(', ')}`);
  if (codes.has('401') || codes.has('403')) console.error('→ 401/403 : DRIVEHQ_USER ou DRIVEHQ_PASS incorrect.');
  else if (codes.has('404')) console.error('→ 404 : mauvais DRIVEHQ_WEBDAV_URL (le fichier n\'est pas à ce chemin).');
  else if (codes.has('000')) console.error('→ 000 : URL/host injoignable (DRIVEHQ_WEBDAV_URL malformé ou hôte erroné).');
  process.exit(1);
}

fs.rmSync('_centris', { recursive: true, force: true });
fs.mkdirSync('_centris', { recursive: true });
execSync(`unzip -q -o "${tmp}" -d _centris`, { stdio: 'inherit' });
fs.unlinkSync(tmp);
console.log('Zip Centris extrait dans _centris/.');
