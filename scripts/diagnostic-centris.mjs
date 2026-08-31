// Analyse en lecture seule du flux Centris du jour : répartition des inscriptions
// par courtier, collaborations de Julie, et statut des inscriptions.
// N'écrit aucun fichier. Script temporaire, à supprimer après usage.
import fs from 'node:fs';
import path from 'node:path';

const CENTRIS = path.join(process.cwd(), '_centris');

function parseCSV(t) {
  const rows = []; let row = [], f = '', q = false, i = 0;
  while (i < t.length) { const c = t[i];
    if (q) { if (c === '"' && t[i+1] === '"') { f += '"'; i += 2; continue; }
             if (c === '"') { q = false; i++; continue; } f += c; i++; continue; }
    if (c === '"') { q = true; i++; continue; }
    if (c === ',') { row.push(f); f = ''; i++; continue; }
    if (c === '\r') { i++; continue; }
    if (c === '\n') { row.push(f); rows.push(row); row = []; f = ''; i++; continue; }
    f += c; i++; }
  if (f.length || row.length) { row.push(f); rows.push(row); }
  return rows;
}
const rd = n => parseCSV(new TextDecoder('windows-1252').decode(fs.readFileSync(path.join(CENTRIS, n))));
const norm = s => (s||'').toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').trim();

const membres = rd('MEMBRES.TXT');
const nom = {};
for (const m of membres) nom[m[0]] = `${m[5]} ${m[4]}`.trim();
const julie = membres.find(r => norm(r[4]) === 'gauthier' && norm(r[5]) === 'julie');
const JULIE = julie ? julie[0] : null;

const inscr = rd('INSCRIPTIONS.TXT').filter(r => r[0]);

console.log('═'.repeat(66));
console.log(`FLUX DU JOUR · ${inscr.length} inscriptions · ${membres.length} courtiers au bureau`);
console.log(`Julie Gauthier = NO_MEMBRE ${JULIE}`);
console.log('═'.repeat(66));

console.log('\n── Répartition par courtier principal (colonne 2) ──');
const par = {};
for (const r of inscr) (par[r[2] || '(vide)'] ??= []).push(r[0]);
for (const [k, v] of Object.entries(par).sort((a,b) => b[1].length - a[1].length))
  console.log(`   ${String(v.length).padStart(3)}  ${nom[k] || 'inconnu'} (${k})`);

console.log('\n── Inscriptions liées à Julie ──');
const principales = inscr.filter(r => r[2] === JULIE);
const collabs = inscr.filter(r => r[4] === JULIE && r[2] !== JULIE);
console.log(`   principales   : ${principales.length}`);
console.log(`   collaborations: ${collabs.length}`);
for (const r of collabs)
  console.log(`      ${r[0]}  inscripteur = ${nom[r[2]] || r[2]}  ·  ${r[25]} ${r[27]}`);

console.log('\n── Julie est-elle co-courtière ailleurs (colonne 4 renseignée) ? ──');
const avecCo = inscr.filter(r => r[4]);
console.log(`   ${avecCo.length} inscription(s) du bureau ont un co-courtier`);
for (const r of avecCo)
  console.log(`      ${r[0]}  ${nom[r[2]]||r[2]}  +  ${nom[r[4]]||r[4]}`);

console.log('\n── Statut des inscriptions (colonne 13) ──');
const st = {};
for (const r of inscr) st[r[13] || '(vide)'] = (st[r[13] || '(vide)'] || 0) + 1;
console.log('   ' + Object.entries(st).map(([k,v]) => `${k}=${v}`).join('  '));

const CIBLE = process.env.MLS_CIBLE || '16148821';
console.log(`\n── Recherche de l'inscription ${CIBLE} ──`);
const c = inscr.find(r => r[0] === CIBLE);
if (!c) console.log('   absente du flux');
else {
  console.log(`   inscripteur (col 2) : ${nom[c[2]] || c[2]}`);
  console.log(`   co-courtier (col 4) : ${c[4] ? (nom[c[4]] || c[4]) : '— aucun'}`);
  console.log(`   Julie impliquée     : ${c[2] === JULIE || c[4] === JULIE ? 'OUI' : 'NON'}`);
  console.log(`   adresse             : ${c[25]} ${c[27]}`);
}
console.log('\n' + '═'.repeat(66));
