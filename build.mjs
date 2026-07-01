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
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CENTRIS = path.join(ROOT, '_centris');
const FEED_DATE = new Date(); // date du build (pour le statut « Nouveau »)
const FICHES_READY = false;   // passera à true quand les fiches nos-proprietes/{slug}/ existeront

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
function writeListing(props) {
  const F = path.join(ROOT,'proprietes.html');
  let h = fs.readFileSync(F,'utf8');
  const n = props.length;

  // 1) cartes
  const open = '<div id="jg-prop-grid" class="jg-prop-grid">';
  const s = h.indexOf(open); if(s<0) throw new Error('Ancre grille introuvable dans proprietes.html');
  const sEnd = s + open.length;
  const closeAnchor = '\n      </div>\n    </div>';
  const e = h.indexOf(closeAnchor, sEnd); if(e<0) throw new Error('Fin de grille introuvable');
  const cards = props.map(propertyCard).join('\n');
  h = h.slice(0,sEnd) + '\n' + cards + '\n' + h.slice(e);

  // 2) options de ville
  const cities = [...new Map(props.map(p=>[slug(p.city),p.city])).entries()].sort((a,b)=>a[1].localeCompare(b[1],'fr'));
  const cityOpts = ['            <option value="tous">Toutes les villes</option>',
    ...cities.map(([v,l])=>`            <option value="${v}">${esc(l)}</option>`)].join('\n');
  const so = '<select id="jg-f-city" class="jg-select" data-filter-group="city">';
  const a = h.indexOf(so); if(a<0) throw new Error('Select ville introuvable');
  const aEnd = a + so.length;
  const b = h.indexOf('</select>', aEnd);
  h = h.slice(0,aEnd) + '\n' + cityOpts + '\n          ' + h.slice(b);

  // 3) compteurs
  h = h.replace(/\d+\s+propriétés disponibles/, `${n} propriétés disponibles`);
  h = h.replace(/\d+ sur \d+ affichées/, `${n} sur ${n} affichées`);

  fs.writeFileSync(F, h);
  console.log(`proprietes.html régénéré (${n} cartes, ${cities.length} villes).`);
}

/* ---------- main ---------- */
if (!fs.existsSync(path.join(CENTRIS,'INSCRIPTIONS.TXT'))) {
  console.log('Mode B · pas de _centris/ — aucune régénération (HTML committé conservé).');
  process.exit(0);
}
console.log('Mode A · lecture du zip Centris…');
const props = ingest();
fs.mkdirSync(path.join(ROOT,'data'), { recursive: true });
fs.writeFileSync(path.join(ROOT,'data','properties.json'), JSON.stringify(props, null, 2));
writeListing(props);
console.log('✓ build terminé.');
