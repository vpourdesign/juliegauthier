// build.mjs — Importe les inscriptions Centris de Julie Gauthier et régénère
// la liste des propriétés (proprietes.html) + data/properties.json.
// Idempotent : relançable à chaque dépôt du zip quotidien (voir CENTRIS-SETUP.md).
//
//   Mode A : _centris/ présent (zip frais) → parse + régénère + écrit data/properties.json
//   Mode B : pas de _centris/ → ne touche à rien (garde le HTML committé)
//
// Aucune dépendance externe. Encodage source Centris = windows-1252.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { ficheHTML, areaLabel } from './lib/fiche.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CENTRIS = path.join(ROOT, '_centris');
const SITE = 'https://juliegauthier.immo';   // domaine de production (sitemap + canonical)
const FEED_DATE = new Date(); // date du build (pour le statut « Nouveau »)
const FICHES_READY = true;    // fiches nos-proprietes/{slug}/ générées → cartes cliquables

// Courtière ciblée (nom exact dans MEMBRES.TXT — colonnes 4=nom, 5=prénom)
const TARGET = { firstName: 'Julie', lastName: 'Gauthier' };

/* ---------- utilitaires ---------- */
function parseCSV(text) {
  const rows=[]; let row=[],f='',q=false,i=0;
  while(i<text.length){const c=text[i];
    if(q){if(c==='"'&&text[i+1]==='"'){f+='"';i+=2;continue;}if(c==='"'){q=false;i++;continue;}f+=c;i++;continue;}
    if(c==='"'){q=true;i++;continue;}
    if(c===','){row.push(f);f='';i++;continue;}
    if(c==='\r'){i++;continue;}
    if(c==='\n'){row.push(f);rows.push(row);row=[];f='';i++;continue;}
    f+=c;i++;}
  if(f.length||row.length){row.push(f);rows.push(row);}
  return rows;
}
const readCentris = n => parseCSV(new TextDecoder('windows-1252').decode(fs.readFileSync(path.join(CENTRIS,n))));
const norm = s => (s||'').toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').trim();
const slug = s => (s||'').toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
const fmtPrice = p => p ? `${Math.round(p).toLocaleString('fr-CA').replace(/ | /g,' ')} $` : 'Prix sur demande';
const esc = s => (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

// Décodage des pièces (code → nom / niveau / revêtement) + dimensions
const ROOM_NAME = {HAL:"Hall d'entrée",SAL:'Salon',SAM:'Salle à manger',SFM:'Salle familiale',CUI:'Cuisine',CR:'Coin-repas',BUR:'Bureau',BIB:'Bibliothèque',CAC:'Chambre',CCP:'Chambre principale',CC2:'Chambre secondaire',SDB:'Salle de bains',SDE:"Salle d'eau",'S-E':"Salle d'eau",SDL:'Salle de lavage',SDJ:'Salle de jeux',RAN:'Rangement',VES:'Vestibule',GAR:'Garage',VER:'Véranda',ATE:'Atelier',SEJ:'Séjour',SOL:'Solarium',SAU:'Sauna',MEZ:'Mezzanine',BOU:'Boudoir',ENT:'Entrée',WALK:'Walk-in',CAV:'Cave à vin',AU:'Autre'};
const ROOM_LEVEL = {'1':'1er niveau','2':'2e niveau','3':'3e niveau','4':'4e niveau','RC':'Rez-de-chaussée','0':'Sous-sol','SS':'Sous-sol','SS1':'Sous-sol','GR':'Grenier','MEZ':'Mezzanine'};
const ROOM_REV = {PFLO:'Plancher flottant',CERAM:'Céramique',BOIS:'Bois',BOIF:'Bois franc',TAPI:'Tapis',VINY:'Vinyle',BETO:'Béton',LINO:'Linoléum',MARB:'Marbre',GRES:'Grès cérame',ARDO:'Ardoise'};
function fmtDim(raw){const m=(raw||'').match(/^([\d.]+)\s*x\s*([\d.]+)\s*([A-Z]?)/i);if(!m)return raw||'';const conv=d=>{const f=Math.floor(parseFloat(d));const inch=Math.round((parseFloat(d)-f)*12);return inch?`${f}'${inch}"`:`${f}'`;};return `${conv(m[1])} × ${conv(m[2])}${m[3]==='M'?' m':''}`;}

function typeFilter(desc,beds){const d=(desc||'').toLowerCase();if(/\b(duplex|triplex|quadruplex|quintuplex|plex)\b/.test(d))return'plex';if(/\bcondo\b|copropri[ée]t[ée] divise|unit[ée] de copropri/.test(d))return'condo';if(beds===0&&/\b(terrain|lot vacant|vacant)\b/.test(d))return'terrain';return'maison';}
const STATUS_LABEL = {forsale:'À vendre',sold:'Vendu',new:'Nouveau'};

/* ---------- ingestion ---------- */
function ingest() {
  const muni = Object.fromEntries(
    parseCSV(new TextDecoder('windows-1252').decode(fs.readFileSync(path.join(ROOT,'reference','MUNICIPALITES.TXT')))).map(r=>[r[0],r[1]])
  );
  const membres = readCentris('MEMBRES.TXT');
  const hit = membres.find(r => norm(r[4])===norm(TARGET.lastName) && norm(r[5])===norm(TARGET.firstName));
  if (!hit) throw new Error(`Courtière ${TARGET.firstName} ${TARGET.lastName} absente de MEMBRES.TXT`);
  const brokerNo = hit[0];
  console.log(`✓ ${TARGET.firstName} ${TARGET.lastName} → NO_MEMBRE=${brokerNo}`);

  const inscr = readCentris('INSCRIPTIONS.TXT');
  const photos = readCentris('PHOTOS.TXT');
  const pieces = readCentris('PIECES_UNITES.TXT');
  const addenda = readCentris('ADDENDA.TXT');
  const remarques = readCentris('REMARQUES.TXT');
  const caracts = readCentris('CARACTERISTIQUES.TXT');
  const depenses = readCentris('DEPENSES.TXT');
  const liens = readCentris('LIENS_ADDITIONNELS.TXT');

  const taxByMls={};
  for(const d of depenses){const m=d[0];if(!m)continue;const code=d[1],amt=parseFloat(d[2])||0,yr=d[3];(taxByMls[m]??={});if(code==='TAXMUN'){taxByMls[m].mun=amt;taxByMls[m].year=yr;}else if(code==='TAXSCO'){taxByMls[m].sco=amt;taxByMls[m].year=taxByMls[m].year||yr;}}
  const vidByMls={}; for(const l of liens){const m=l[0];if(!m)continue;if(/VID|VIR/.test(l[2]||'')&&!vidByMls[m])vidByMls[m]=l[3];}

  const photosByMls={}; for(const p of photos){const m=p[0];if(!m)continue;(photosByMls[m]??=[]).push({seq:+p[1],type:p[3],url:p[6]});}
  for(const k in photosByMls) photosByMls[k].sort((a,b)=>a.seq-b.seq);

  const piecesByMls={};
  for(const p of pieces){const m=p[0];if(!m)continue;(piecesByMls[m]??=[]).push({seq:+p[2]||0,code:p[3]||'',level:p[6]||'',dim:p[9]||'',rev:p[11]||''});}
  for(const k in piecesByMls) piecesByMls[k].sort((a,b)=>a.seq-b.seq);

  function groupText(rows){const o={};for(const r of rows){const m=r[0],l=r[2],t=r[6]||'';if(!m)continue;const k=m+'|'+l;(o[k]??=[]).push({s:+r[1],n:+r[3],t});}for(const k in o){o[k].sort((a,b)=>(a.s-b.s)||(a.n-b.n));o[k]=o[k].map(x=>x.t).join(' ').replace(/\s+/g,' ').trim();}return o;}
  const addMap = groupText(addenda), remMap = groupText(remarques);
  const caractsByMls={}; for(const c of caracts){const m=c[0];if(!m)continue;(caractsByMls[m]??=[]).push({code:c[1],value:c[2]});}

  const mine = inscr.filter(r => r[2]===brokerNo || r[4]===brokerNo);
  const props = mine.map(r => {
    const mls=r[0], price=parseFloat(r[6])||0;
    const civic=(r[25]||'').trim(), street=(r[27]||'').trim();
    const address=[civic,street].filter(Boolean).join(', ');
    const city=muni[r[22]]||'Rive-Nord';
    const cp=(r[29]||'').trim();
    const rs=piecesByMls[mls]||[];
    let beds=rs.filter(p=>['CAC','CCP','CC2'].includes(p.code)).length;
    let baths=rs.filter(p=>p.code==='SDB').length;
    let powder=rs.filter(p=>['SDE','S-E'].includes(p.code)).length;
    if(!rs.length){beds=parseInt(r[82])||0;baths=parseInt(r[84])||0;}
    const ph=photosByMls[mls]||[];
    const descFr=addMap[mls+'|F']||'';
    const days=Math.round((FEED_DATE-new Date((r[20]||'').replace(/\//g,'-')))/86400000);
    const status=(days>=0&&days<=21)?'new':'forsale';
    const rooms=rs.map(p=>({name:ROOM_NAME[p.code]||p.code,level:ROOM_LEVEL[p.level]||p.level,dim:fmtDim(p.dim),rev:ROOM_REV[p.rev]||p.rev}));
    return {
      mls, price, civic, street, address, city, postalCode:cp,
      type:typeFilter(descFr,beds), beds, baths, powder,
      yearBuilt:(r[59]&&/^\d{4}$/.test(r[59]))?r[59]:'',
      areaTerrain:r[75]?`${r[75]} ${r[76]||''}`.trim():'',
      lat:parseFloat(r[144])||null, lon:parseFloat(r[145])||null,
      eval:{year:r[78]||'',terrain:parseFloat(r[79])||0,batiment:parseFloat(r[80])||0,total:(parseFloat(r[79])||0)+(parseFloat(r[80])||0)},
      taxes:taxByMls[mls]||null, video:vidByMls[mls]||null,
      status, listingDate:(r[20]||'').replace(/\//g,'-'),
      descFr, remFr:remMap[mls+'|F']||'',
      features:caractsByMls[mls]||[], rooms, photos:ph,
      slug:`${mls}-${slug(street)}-${slug(city)}`
    };
  }).filter(p => p.price>0 && p.photos.length>=3)
    .sort((a,b)=>b.price-a.price);

  console.log(`Chargé ${props.length} propriétés actives.`);
  return props;
}

/* ---------- génération des cartes ---------- */
function propertyCard(p, i) {
  const href = FICHES_READY ? `nos-proprietes/${p.slug}/` : 'fiche.html';
  const meta = p.type==='terrain' ? 'Terrain' : `${p.beds} ch${p.baths?` · ${p.baths} sdb`:''}`;
  const photo = (p.photos[0]||{}).url || '';
  return `        <a class="jg-card" href="${href}" data-fiche="nos-proprietes/${p.slug}/" aria-label="Voir la propriété, ${esc(p.address)}, ${esc(p.city)}" data-status="${p.status}" data-type="${p.type}" data-beds="${p.beds}" data-baths="${p.baths}" data-price="${p.price}" data-city="${slug(p.city)}" data-index="${i}" data-reveal>
          <div class="jg-card-media">
            <img class="jg-card-img" src="${photo}" alt="Photo de la propriété, ${esc(p.address)}, ${esc(p.city)}" loading="lazy">
            <span class="jg-card-shade" aria-hidden="true"></span>
            <span class="jg-card-tint" aria-hidden="true"></span>
            <span class="jg-tag" data-status="${p.status}">${STATUS_LABEL[p.status]}</span>
          </div>
          <div class="jg-card-price">${fmtPrice(p.price)}</div>
          <div class="jg-card-addr">
            <div class="jg-card-address">${esc(p.address)}</div>
            <div class="jg-card-city">${esc(p.city)}</div>
          </div>
          <div class="jg-card-foot">
            <div class="jg-card-meta">${meta}</div>
            <span class="jg-card-cta"><span class="txt">Voir la propriété</span><span class="arw" aria-hidden="true">&rarr;</span></span>
          </div>
        </a>`;
}

/* ---------- réécriture de proprietes.html (par ancres structurelles) ---------- */
function writeListing(props, vendues = []) {
  const F = path.join(ROOT,'proprietes.html');
  let h = fs.readFileSync(F,'utf8');
  const n = props.length;

  // 1) cartes
  const open = '<div id="jg-prop-grid" class="jg-prop-grid">';
  const s = h.indexOf(open); if(s<0) throw new Error('Ancre grille introuvable dans proprietes.html');
  const sEnd = s + open.length;
  const closeAnchor = '\n      </div>\n    </div>';
  const e = h.indexOf(closeAnchor, sEnd); if(e<0) throw new Error('Fin de grille introuvable');
  // Les vendues ferment la grille : elles témoignent de l'activité sans
  // reléguer les inscriptions encore disponibles.
  const toutes = [...props, ...vendues];
  const cards = toutes.map(propertyCard).join('\n');
  h = h.slice(0,sEnd) + '\n' + cards + '\n' + h.slice(e);

  // 2) options de ville
  const cities = [...new Map(toutes.map(p=>[slug(p.city),p.city])).entries()].sort((a,b)=>a[1].localeCompare(b[1],'fr'));
  const cityOpts = ['            <option value="tous">Toutes les villes</option>',
    ...cities.map(([v,l])=>`            <option value="${v}">${esc(l)}</option>`)].join('\n');
  const so = '<select id="jg-f-city" class="jg-select" data-filter-group="city">';
  const a = h.indexOf(so); if(a<0) throw new Error('Select ville introuvable');
  const aEnd = a + so.length;
  const b = h.indexOf('</select>', aEnd);
  h = h.slice(0,aEnd) + '\n' + cityOpts + '\n          ' + h.slice(b);

  // 3) compteurs — « disponibles » ne compte que les inscriptions actives
  h = h.replace(/\d+\s+propriétés disponibles/, `${n} propriétés disponibles`);
  h = h.replace(/\d+ sur \d+ affichées/, `${toutes.length} sur ${toutes.length} affichées`);

  fs.writeFileSync(F, h);
  console.log(`proprietes.html régénéré (${n} actives` +
    (vendues.length ? ` + ${vendues.length} vendue(s)` : '') +
    `, ${cities.length} villes).`);
}

/* ---------- propriétés vendues ----------------------------------------------
   Le flux Centris ne contient que les inscriptions ACTIVES : la colonne de
   statut vaut « AI » pour toutes, et il n'y a ni date ni prix de vente. Une
   propriété vendue disparaît simplement du fichier. On repère donc les sorties
   en comparant le flux du jour aux propriétés déjà connues, et on les garde
   affichées JOURS_VENDU jours.

   ATTENTION : une inscription peut aussi disparaître sans avoir été vendue
   (mandat expiré, retrait du vendeur, transfert à un autre courtier). Le
   fichier data/archives.json est volontairement lisible et modifiable à la
   main : retirer une entrée suffit à la faire disparaître du site.           */
const JOURS_VENDU = 30;

function majArchives(actifs, aujourdhui, flux) {
  const lire = f => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return []; } };
  let arch = fs.existsSync(ARCHIVES) ? lire(ARCHIVES) : [];

  const mlsActifs = new Set(actifs.map(p => p.mls));

  // Une propriété remise en vente redevient active et quitte les archives.
  arch = arch.filter(a => !mlsActifs.has(a.mls));

  // Nouvelles sorties : connues au build précédent, absentes du flux d'aujourd'hui.
  // Sans flux frais on ne peut rien conclure, donc on n'ajoute rien.
  if (flux) {
    const connues = fs.existsSync(DATA) ? lire(DATA) : [];
    const deja = new Set(arch.map(a => a.mls));
    for (const p of connues) {
      if (mlsActifs.has(p.mls) || deja.has(p.mls)) continue;
      arch.push({ ...p, status: 'sold', sortieLe: aujourdhui });
    }
  }

  // Au-delà du délai, la propriété quitte le site.
  const limite = new Date(aujourdhui + 'T00:00:00Z');
  limite.setUTCDate(limite.getUTCDate() - JOURS_VENDU);
  const limiteISO = limite.toISOString().slice(0, 10);
  const avant = arch.length;
  arch = arch.filter(a => (a.sortieLe || '') >= limiteISO);

  arch.sort((a, b) => (b.sortieLe || '').localeCompare(a.sortieLe || '') || b.price - a.price);
  fs.mkdirSync(path.dirname(ARCHIVES), { recursive: true });
  fs.writeFileSync(ARCHIVES, JSON.stringify(arch, null, 2));
  const expirees = avant - arch.length;
  console.log(`vendues : ${arch.length} affichée(s)` +
    (expirees > 0 ? `, ${expirees} retirée(s) après ${JOURS_VENDU} jours.` : '.'));
  return arch;
}

/* ---------- vitrine de l'accueil : les 3 inscriptions les plus récentes ---------- */
function homeCard(p) {
  const photo = (p.photos[0] || {}).url || '';
  const tag = p.status === 'new'
    ? '<span class="jg-tag jg-tag--new">Nouveau</span>'
    : p.status === 'sold'
      ? '<span class="jg-tag jg-tag--sold">Vendu</span>'
      : '<span class="jg-tag jg-tag--forsale"><span aria-hidden="true" class="jg-tag__dot"></span>À vendre</span>';

  // Un terrain n'a ni chambre ni salle de bain : on ne montre que sa superficie.
  const area = areaLabel(p.areaTerrain);
  const specs = (p.type === 'terrain' ? [] : [
    p.beds ? `<span class="jg-spec"><strong>${p.beds}</strong><span>ch.</span></span>` : '',
    p.baths ? `<span class="jg-spec"><strong>${p.baths}</strong><span>sdb</span></span>` : '',
  ]).concat(area ? `<span class="jg-spec"><strong>${esc(area)}</strong><span>terrain</span></span>` : '')
    .filter(Boolean).join('\n              ');

  return `      <div data-reveal>
        <a class="jg-pcard" href="nos-proprietes/${p.slug}/" aria-label="Voir la propriété, ${esc(p.address)}, ${esc(p.city)}">
          <div class="jg-pcard__media">
            <img src="${photo}" alt="Photo de la propriété, ${esc(p.address)}, ${esc(p.city)}" loading="lazy">
            <span aria-hidden="true" class="jg-pcard__scrim"></span>
            <span class="jg-pcard__tag">${tag}</span>
          </div>
          <div class="jg-pcard__body">
            <div class="jg-pcard__price">${fmtPrice(p.price)}</div>
            <div class="jg-pcard__addr">${esc(p.address)}</div>
            <div class="jg-pcard__city">${esc(p.city)}</div>
            <div class="jg-pcard__specs">
              ${specs}
            </div>
          </div>
        </a>
      </div>`;
}

function writeHome(props) {
  const F = path.join(ROOT, 'index.html');
  let h = fs.readFileSync(F, 'utf8');
  const A = '<!-- CARTES:DEBUT', B = '<!-- CARTES:FIN -->';
  const s = h.indexOf(A); if (s < 0) throw new Error('Ancre CARTES:DEBUT introuvable dans index.html');
  const sEnd = h.indexOf('-->', s) + 3;
  const e = h.indexOf(B, sEnd); if (e < 0) throw new Error('Ancre CARTES:FIN introuvable');

  // Les plus récentes d'abord ; à date égale, la plus chère passe devant.
  const recent = [...props]
    .sort((a, b) => (b.listingDate || '').localeCompare(a.listingDate || '') || b.price - a.price)
    .slice(0, 3);

  h = h.slice(0, sEnd) + '\n' + recent.map(homeCard).join('\n') + '\n      ' + h.slice(e);
  fs.writeFileSync(F, h);
  console.log(`index.html : ${recent.length} inscriptions en vitrine (${recent.map(p => p.mls).join(', ')}).`);
}

/* ---------- génération des fiches individuelles ---------- */
function writeFiches(props) {
  const dir = path.join(ROOT, 'nos-proprietes');
  fs.rmSync(dir, { recursive: true, force: true });   // repart à neuf (retire les fiches délistées)
  for (const p of props) {
    let related = props.filter(x => x.mls !== p.mls && x.city === p.city).slice(0,3);
    if (related.length < 3) related = related.concat(props.filter(x => x.mls !== p.mls && !related.includes(x)).slice(0, 3 - related.length));
    let html = ficheHTML(p, related.slice(0,3));
    // préfixe ../../ pour les chemins relatifs (fiche = 2 niveaux sous la racine)
    html = html.replace(/(href|src)="(?!https?:|tel:|mailto:|#|\/|data:)/g, '$1="../../');
    const out = path.join(dir, p.slug);
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(path.join(out, 'index.html'), html);
  }
  console.log(`${props.length} fiches générées dans nos-proprietes/.`);
}

/* ---------- génération du sitemap.xml ---------- */
// Pages jamais indexées : fiche.html est un gabarit de démonstration (propriété
// fictive) et 404.html n'existe que pour les erreurs.
const SITEMAP_SKIP = new Set(['fiche.html', '404.html']);
const SITEMAP_PRIORITY = {
  'proprietes.html': '0.9', 'acheter.html': '0.8', 'vendre.html': '0.8',
  'apropos.html': '0.7', 'secteurs.html': '0.7',
};

// Date du dernier commit touchant le fichier ; à défaut, date de modification.
function lastmodOf(rel) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', rel],
      { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    if (out) return out.slice(0, 10);
  } catch { /* hors dépôt git ou fichier jamais committé */ }
  try { return fs.statSync(path.join(ROOT, rel)).mtime.toISOString().slice(0, 10); }
  catch { return null; }
}

function writeSitemap(props) {
  const urls = [];
  const add = (loc, lastmod, changefreq, priority) =>
    urls.push({ loc, lastmod, changefreq, priority });

  add(`${SITE}/`, lastmodOf('index.html'), 'weekly', '1.0');

  // Pages racine découvertes automatiquement : les nouvelles pages (secteurs,
  // articles de blogue) entrent dans le sitemap sans toucher au build.
  for (const f of fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).sort()) {
    if (f === 'index.html' || SITEMAP_SKIP.has(f)) continue;
    add(`${SITE}/${f}`, lastmodOf(f),
      f === 'proprietes.html' ? 'daily' : 'monthly',
      SITEMAP_PRIORITY[f] || '0.6');
  }

  for (const p of props) {
    const d = /^\d{4}-\d{2}-\d{2}$/.test(p.listingDate || '') ? p.listingDate : null;
    add(`${SITE}/nos-proprietes/${p.slug}/`, d, 'weekly', '0.8');
  }

  const xml = ['<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(u => ['  <url>',
      `    <loc>${u.loc}</loc>`,
      u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : null,
      `    <changefreq>${u.changefreq}</changefreq>`,
      `    <priority>${u.priority}</priority>`,
      '  </url>'].filter(Boolean).join('\n')),
    '</urlset>', ''].join('\n');

  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
  console.log(`sitemap.xml régénéré (${urls.length} URLs).`);
}

/* ---------- main ---------- */
const DATA = path.join(ROOT, 'data', 'properties.json');
const ARCHIVES = path.join(ROOT, 'data', 'archives.json');

let props, vendues;
const AUJOURDHUI = FEED_DATE.toISOString().slice(0, 10);

if (fs.existsSync(path.join(CENTRIS,'INSCRIPTIONS.TXT'))) {
  console.log('Mode A · lecture du zip Centris…');
  props = ingest();
  // Avant d'écraser data/properties.json : ce qui a disparu du flux est vendu.
  vendues = majArchives(props, AUJOURDHUI, true);
  fs.mkdirSync(path.join(ROOT,'data'), { recursive: true });
  fs.writeFileSync(DATA, JSON.stringify(props, null, 2));
} else if (fs.existsSync(DATA)) {
  // Mode B : pas de zip frais, mais on régénère quand même le HTML à partir des
  // données déjà committées. C'est ce qui permet à une correction de gabarit de
  // se propager sans attendre le prochain dépôt Centris.
  console.log('Mode B · pas de _centris/ — régénération depuis data/properties.json.');
  props = JSON.parse(fs.readFileSync(DATA,'utf8'));
  // Sans flux frais, aucune nouvelle sortie détectable : on se contente de
  // purger les vendues arrivées à échéance.
  vendues = majArchives(props, AUJOURDHUI, false);
} else {
  console.log('Aucune donnée (_centris/ et data/properties.json absents) — rien à faire.');
  process.exit(0);
}

writeListing(props, vendues);
writeFiches([...props, ...vendues]);   // la fiche d'une vendue reste en ligne 30 jours
writeHome(props);                      // la vitrine ne montre que les inscriptions actives
writeSitemap(props);                   // les vendues sont temporaires : hors sitemap
console.log('✓ build terminé.');
