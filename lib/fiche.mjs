// Générateur de fiche propriété — data-driven depuis un objet Centris normalisé.
import { TOKENS, nav, FOOTER, SCRIPT } from './shell.mjs';
import { FICHE_CSS } from './fiche-css.mjs';

const STATUS_LABEL = { forsale:'À vendre', sold:'Vendu', new:'Nouveau' };
const TYPE_LABEL = { maison:'Maison', condo:'Condo / Copropriété', plex:'Plex', terrain:'Terrain' };
const esc = s => (s||'').toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const money = n => (n||n===0) ? `${Math.round(n).toLocaleString('fr-CA').replace(/ | /g,' ')} $` : '';
const nb = s => (s||'').replace(/ /g,' ');

// Caractéristiques Centris : code → { name, vals }
const FEAT = {
  EAU:{name:'Approvisionnement en eau',vals:{AMU:'Municipal',PUIT:'Puits artésien',SURF:'Eau de surface'}},
  CHAU:{name:'Chauffage',vals:{AIRP:'Air pulsé',PELC:'Plinthes électriques',RADI:'Radiateur',AIRC:'Convecteur',AIRR:'Air rayonnant',PLRA:'Plancher radiant',POEL:'Poêle',FOUR:'Fournaise'}},
  ENER:{name:'Énergie',vals:{ELEC:'Électricité',GAZN:'Gaz naturel',HUIL:'Mazout',BOIS:'Bois',PROP:'Propane',SOLA:'Solaire'}},
  EQUI:{name:'Équipement',vals:{THEM:'Thermopompe',ECHA:"Échangeur d'air",CENT:'Aspirateur central',ALAR:"Système d'alarme",VENT:'Ventilation',GEOT:'Géothermie'}},
  FOND:{name:'Fondation',vals:{BETO:'Béton coulé',BLOC:'Blocs de béton',PIER:'Pierres'}},
  TOIT:{name:'Toiture',vals:{BARD:"Bardeaux d'asphalte",TOLE:'Tôle',MEMB:'Membrane élastomère',ARDO:'Ardoise'}},
  FENE:{name:'Fenêtres',vals:{HYBR:'Hybride',ALUM:'Aluminium',PVC:'PVC',BOIS:'Bois'}},
  GARA:{name:'Garage',vals:{ATT:'Attenant',DET:'Détaché',INT:'Intégré',CHAU:'Chauffé',SIMP:'Simple',DOUB:'Double',TRIP:'Triple'}},
  PISC:{name:'Piscine',vals:{HT:'Hors-terre',CR:'Creusée',INT:'Intérieure',CHAU:'Chauffée'}},
  REV:{name:'Revêtement',vals:{BRIQ:'Brique',VINY:'Vinyle',PIER:'Pierre',BOIS:'Bois',CREP:'Crépi',ALUM:'Aluminium',FIBR:'Fibre de bois'}},
  STAT:{name:'Stationnement',vals:{ASPH:'Asphalte',INT:'Intérieur',EXT:'Extérieur',GAR:'Garage',PAVE:'Pavé uni'}},
  SOUS:{name:'Sous-sol',vals:{TOTA:'Totalement aménagé',PART:'Partiellement aménagé',NON:'Non aménagé',VIDE:'Vide sanitaire',AUC:'Aucun',6:'6 pi et plus'}},
  EGOU:{name:'Égout',vals:{MUNI:'Municipal',FOSS:'Fosse septique',NON:'Aucun'}},
  ZONE:{name:'Zonage',vals:{RES:'Résidentiel',AGR:'Agricole',COM:'Commercial',VILL:'Villégiature'}},
};
function decodeFeatures(features) {
  const groups = {};
  for (const f of features||[]) {
    const cat = FEAT[f.code]; if (!cat) continue;
    const val = cat.vals[f.value] || f.value;
    (groups[cat.name] ??= new Set()).add(val);
  }
  return Object.entries(groups).map(([k,set])=>[k,[...set].join(', ')]);
}

/* SVG icônes réutilisées */
const IC_BED='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9V5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v4"></path><path d="M2 11h20v8"></path><path d="M5 19v-2"></path><path d="M19 19v-2"></path><path d="M5 11V9h6v2"></path><path d="M13 11V9h6v2"></path></svg>';
const IC_BATH='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2a1 1 0 0 1 1-1Z"></path><path d="M6 12V5a2 2 0 0 1 2-2h2"></path><path d="M9 5h3"></path></svg>';
const IC_AREA='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3h18v18H3z"></path><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>';
const PHONE_SVG='<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';

function areaLabel(a){ if(!a) return ''; const [v,u]=a.split(' '); const n=parseFloat(v); if(!n) return ''; return `${Math.round(n).toLocaleString('fr-CA').replace(/ | /g,' ')} ${u==='PC'?'pi²':'m²'}`; }

function gallery(photos){
  const tiles = photos.slice(0,5).map((ph,i)=>{
    const more = (i===4 && photos.length>5) ? `<span class="jg-gal-more-mark" aria-hidden="true"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect></svg><span>+${photos.length-5}</span></span>` : '';
    return `      <button type="button" class="jg-gal-item${i===0?' hero':''}" data-gindex="${i}" aria-label="Agrandir la photo ${i+1}">
        <img class="jg-gal-img" src="${ph.url}" alt="Photo ${i+1} de la propriété" loading="${i===0?'eager':'lazy'}">
        <span class="jg-img-shade" aria-hidden="true"></span><span class="jg-img-tint" aria-hidden="true"></span>${more}
      </button>`;
  }).join('\n');
  return tiles;
}

function characteristics(p){
  const rows = [];
  rows.push(['Genre de propriété', TYPE_LABEL[p.type]||'Propriété']);
  if(p.yearBuilt) rows.push(['Année de construction', p.yearBuilt]);
  if(p.areaTerrain) rows.push(['Superficie du terrain', areaLabel(p.areaTerrain)]);
  if(p.beds) rows.push(['Chambres', String(p.beds)]);
  if(p.baths) rows.push(['Salles de bain', String(p.baths)]);
  if(p.powder) rows.push(["Salles d'eau", String(p.powder)]);
  for(const [k,v] of decodeFeatures(p.features)) rows.push([k,v]);
  if(p.eval && p.eval.total) rows.push([`Évaluation municipale ${p.eval.year||''}`.trim(), money(p.eval.total)]);
  return rows.map(([k,v])=>`          <div class="jg-kv-row"><span class="jg-kv-k">${esc(k)}</span><span class="jg-kv-v">${esc(v)}</span></div>`).join('\n');
}

function roomsTable(rooms){
  if(!rooms||!rooms.length) return '';
  const order=[]; const byLevel={};
  for(const r of rooms){ const lvl=r.level||'Autre'; if(!byLevel[lvl]){byLevel[lvl]=[];order.push(lvl);} byLevel[lvl].push(r); }
  let body=''; let zeb=false;
  for(const lvl of order){
    body+=`              <tr class="jg-tgroup"><th scope="colgroup" colspan="4">${esc(lvl)}</th></tr>\n`;
    for(const r of byLevel[lvl]){ body+=`              <tr${zeb?' class="jg-zeb"':''}><td>${esc(r.name)}</td><td>${esc(r.dim)||'—'}</td><td>${esc(lvl)}</td><td>${esc(r.rev)||'—'}</td></tr>\n`; zeb=!zeb; }
  }
  return `      <div class="jg-block" data-reveal>
        <h2 class="jg-h2">Les pièces</h2>
        <div class="jg-h2-rule" aria-hidden="true"></div>
        <div class="jg-tablewrap" role="region" aria-label="Tableau des pièces" tabindex="0">
          <table class="jg-table">
            <thead><tr><th scope="col">Pièce</th><th scope="col">Dimensions</th><th scope="col">Niveau</th><th scope="col">Revêtement</th></tr></thead>
            <tbody>
${body}            </tbody>
          </table>
        </div>
      </div>`;
}

function financier(p){
  const cards=[];
  if(p.eval && p.eval.total){
    cards.push(`          <div class="jg-fincard"><h3>Évaluation municipale ${esc(p.eval.year||'')}</h3>
            <div class="jg-finrow"><span>Terrain</span><span class="v">${money(p.eval.terrain)}</span></div>
            <div class="jg-finrow"><span>Bâtiment</span><span class="v">${money(p.eval.batiment)}</span></div>
            <div class="jg-finrow total"><span>Total</span><span class="v">${money(p.eval.total)}</span></div></div>`);
  }
  if(p.taxes && (p.taxes.mun||p.taxes.sco)){
    const tot=(p.taxes.mun||0)+(p.taxes.sco||0);
    cards.push(`          <div class="jg-fincard"><h3>Taxes ${esc(p.taxes.year||'')}</h3>
            <div class="jg-finrow"><span>Municipales</span><span class="v">${money(p.taxes.mun)} <span class="jg-peryear">/an</span></span></div>
            <div class="jg-finrow"><span>Scolaires</span><span class="v">${money(p.taxes.sco)} <span class="jg-peryear">/an</span></span></div>
            <div class="jg-finrow total"><span>Total</span><span class="v">${money(tot)} <span class="jg-peryear">/an</span></span></div></div>`);
  }
  if(!cards.length) return '';
  return `      <div class="jg-block" data-reveal>
        <h2 class="jg-h2">Sommaire financier</h2>
        <div class="jg-h2-rule" aria-hidden="true"></div>
        <div class="jg-fin" style="grid-template-columns:repeat(${cards.length},1fr)">
${cards.join('\n')}
        </div>
      </div>`;
}

function description(p){
  if(!p.descFr) return '';
  const sent=p.descFr.split(/(?<=[.!?])\s+/);
  const lead=sent.slice(0,2).join(' '), rest=sent.slice(2).join(' ');
  return `      <div class="jg-block" data-reveal>
        <h2 class="jg-h2">Description</h2>
        <div class="jg-h2-rule" aria-hidden="true"></div>
        <p class="jg-lead">${esc(lead)}</p>
${rest?`        <div class="jg-more" id="jg-desc-more"><div><p class="jg-prose" style="margin-top:var(--space-4)">${esc(rest)}</p></div></div>
        <button type="button" class="jg-link" id="jg-readmore" aria-expanded="false" aria-controls="jg-desc-more" style="margin-top:var(--space-4)">Lire la suite <span aria-hidden="true">↓</span></button>`:''}
      </div>`;
}

function remarques(p){
  if(!p.remFr) return '';
  return `      <div class="jg-block" data-reveal>
        <h2 class="jg-h2">Remarques du courtier</h2>
        <div class="jg-h2-rule" aria-hidden="true"></div>
        <p class="jg-prose">${esc(p.remFr)}</p>
      </div>`;
}

function localisation(p){
  if(!p.lat||!p.lon) return '';
  const maps=`https://www.google.com/maps?q=${p.lat},${p.lon}`;
  const sv=`https://www.google.com/maps?q=&layer=c&cbll=${p.lat},${p.lon}`;
  return `      <div class="jg-block" data-reveal>
        <h2 class="jg-h2">Le secteur — ${esc(p.city)}</h2>
        <div class="jg-h2-rule" aria-hidden="true"></div>
        <div class="jg-map" role="img" aria-label="Emplacement approximatif, ${esc(p.city)}">
          <span class="road" style="left:0;right:0;top:38%;height:6px" aria-hidden="true"></span>
          <span class="road" style="left:0;right:0;top:66%;height:4px" aria-hidden="true"></span>
          <span class="road" style="top:0;bottom:0;left:34%;width:5px" aria-hidden="true"></span>
          <span class="road" style="top:0;bottom:0;left:62%;width:4px" aria-hidden="true"></span>
          <span class="pin" aria-hidden="true"></span>
          <span class="legend">${esc(p.city)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-5);margin-top:var(--space-4);flex-wrap:wrap">
          <a class="jg-link" href="${maps}" target="_blank" rel="noopener">Ouvrir dans Google Maps <span aria-hidden="true">→</span></a>
          <a class="jg-link" href="${sv}" target="_blank" rel="noopener">Vue de la rue <span aria-hidden="true">→</span></a>
        </div>
      </div>`;
}

function similarCards(related){
  if(!related||!related.length) return '';
  const cards=related.map(p=>{
    const meta=p.type==='terrain'?'Terrain':`${p.beds} ch${p.baths?` · ${p.baths} sdb`:''}`;
    return `      <div class="jg-cardwrap" data-reveal>
        <a class="jg-card" href="nos-proprietes/${p.slug}/" aria-label="Voir la propriété, ${esc(p.address)}, ${esc(p.city)}">
          <div class="jg-card-media"><img class="jg-card-img" src="${(p.photos[0]||{}).url||''}" alt="Photo, ${esc(p.address)}" loading="lazy"><span class="jg-img-shade" aria-hidden="true"></span><span class="jg-img-tint" aria-hidden="true"></span><span class="jg-card-tag"><span class="jg-tag" data-status="${p.status}">${STATUS_LABEL[p.status]}</span></span></div>
          <div class="jg-card-price">${money(p.price)}</div>
          <div class="jg-card-addr"><div class="jg-card-address">${esc(p.address)}</div><div class="jg-card-city">${esc(p.city)}</div></div>
          <div class="jg-card-foot"><div class="jg-card-meta">${meta}</div><span class="jg-card-cta">Voir <span aria-hidden="true">→</span></span></div>
        </a>
      </div>`;}).join('\n');
  return `<section aria-labelledby="jg-sim-title" style="background:var(--paper);border-top:1px solid var(--line);padding:var(--section-y) 0">
  <div style="max-width:var(--container);margin:0 auto;padding:0 var(--gutter)">
    <div data-reveal style="display:flex;align-items:flex-end;justify-content:space-between;gap:var(--space-5);flex-wrap:wrap">
      <h2 id="jg-sim-title" style="font-size:clamp(2rem,4vw,3.25rem);line-height:1.04;letter-spacing:-0.03em;color:var(--ink);max-width:18ch;margin:0">D'autres propriétés à découvrir</h2>
      <a class="jg-link" href="proprietes.html" style="font-size:1rem">Toutes les propriétés <span aria-hidden="true">→</span></a>
    </div>
    <div class="jg-prop-grid" style="margin-top:var(--space-8)">
${cards}
    </div>
  </div>
</section>`;
}

export function ficheHTML(p, related) {
  const photos = p.photos || [];
  const cityUpper = (p.city||'').toUpperCase();
  const title = `${p.address}, ${p.city} · ${money(p.price)} · Julie Gauthier · RE/MAX Crystal`;
  const desc = `${p.address}, ${p.city} : ${TYPE_LABEL[p.type]||'propriété'}${p.beds?`, ${p.beds} chambres`:''}, ${money(p.price)}. Présentée par Julie Gauthier, courtière immobilière agréée, RE/MAX Crystal.`;
  const qs = [];
  if(p.beds) qs.push(`<span class="jg-qs">${IC_BED}<b>${p.beds}</b><span>chambre${p.beds>1?'s':''}</span></span>`);
  if(p.baths) qs.push(`<span class="jg-qs">${IC_BATH}<b>${p.baths}</b><span>salle${p.baths>1?'s':''} de bain</span></span>`);
  if(p.powder) qs.push(`<span class="jg-qs"><b>${p.powder}</b><span>salle${p.powder>1?'s':''} d'eau</span></span>`);
  if(p.areaTerrain) qs.push(`<span class="jg-qs">${IC_AREA}<b>${nb(areaLabel(p.areaTerrain))}</b><span>terrain</span></span>`);
  if(p.yearBuilt) qs.push(`<span class="jg-qs"><span>construite en</span><b>${p.yearBuilt}</b></span>`);
  const quickstats = qs.join('\n        <span class="jg-qs-sep" aria-hidden="true"></span>\n        ');
  const evalLine = (p.eval&&p.eval.total)?`<div style="margin-top:8px;font:400 0.8125rem/1.4 var(--font-body);color:var(--ink-3)">Évaluation municipale ${money(p.eval.total)}</div>`:'';
  const videoLink = p.video?`<a class="jg-link" href="${p.video}" target="_blank" rel="noopener" style="margin-left:6px">▶ Vidéo</a>`:'';
  const jsonld = {"@context":"https://schema.org","@type":p.type==='terrain'?'Place':'SingleFamilyResidence',"name":p.address,"address":{"@type":"PostalAddress","streetAddress":p.address,"addressLocality":p.city,"addressRegion":"QC","postalCode":p.postalCode,"addressCountry":"CA"},"numberOfBedrooms":p.beds||undefined,"numberOfBathroomsTotal":(p.baths||0)+(p.powder||0)||undefined,"offers":{"@type":"Offer","price":String(p.price),"priceCurrency":"CAD","availability":"https://schema.org/InStock"},"broker":{"@type":"RealEstateAgent","name":"Julie Gauthier — RE/MAX Crystal","telephone":"+1-514-895-4921"}};
  if(p.lat&&p.lon) jsonld.geo={"@type":"GeoCoordinates","latitude":p.lat,"longitude":p.lon};

  const main = `
<nav aria-label="Fil d'Ariane" style="max-width:var(--container);margin:0 auto;padding:var(--space-6) var(--gutter) 0">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--space-4);flex-wrap:wrap">
    <ol style="display:flex;align-items:center;gap:10px;list-style:none;margin:0;padding:0;font:500 0.8125rem/1.3 var(--font-body);flex-wrap:wrap">
      <li><a class="jg-crumb" href="index.html">Accueil</a></li>
      <li aria-hidden="true" style="color:var(--ink-3)">&rsaquo;</li>
      <li><a class="jg-crumb" href="proprietes.html">Propriétés</a></li>
      <li aria-hidden="true" style="color:var(--ink-3)">&rsaquo;</li>
      <li aria-current="page" style="color:var(--ink-3)">${esc(p.address)}</li>
    </ol>
    <a class="jg-link" href="proprietes.html"><span aria-hidden="true">&larr;</span> Toutes les propriétés</a>
  </div>
</nav>

<section aria-label="Galerie photos" style="max-width:var(--container);margin:0 auto;padding:var(--space-5) var(--gutter) 0">
  <div class="jg-gal-wrap" data-reveal>
    <div class="jg-gal" id="jg-gal">
${gallery(photos)}
    </div>
    <span class="jg-gal-tag"><span id="jg-hero-tag" class="jg-tag" data-status="${p.status}">${p.status==='forsale'?'<span class="dot" aria-hidden="true"></span>':''}${STATUS_LABEL[p.status]}</span></span>
    <div class="jg-gal-actions">
      <button type="button" class="jg-gal-btn" id="jg-open-gallery"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect></svg>Voir les <span id="jg-photo-count">${photos.length}</span> photos</button>
    </div>
  </div>
</section>

<section aria-labelledby="jg-address" style="max-width:var(--container);margin:0 auto;padding:clamp(2rem,4vw,3rem) var(--gutter) 0">
  <div class="jg-head" data-reveal>
    <div class="jg-head-info">
      <span class="jg-eyebrow" style="color:var(--red)"><span class="rule" aria-hidden="true"></span>${STATUS_LABEL[p.status].toUpperCase()} · ${esc(cityUpper)}</span>
      <h1 id="jg-address" style="margin:var(--space-4) 0 0;font-family:var(--font-display);font-weight:800;font-size:clamp(2.4rem,4.4vw,3.6rem);line-height:1.02;letter-spacing:-0.03em;color:var(--ink)">${esc(p.address)}</h1>
      <p style="margin:var(--space-3) 0 0;font:400 var(--fs-lead)/1.5 var(--font-body);color:var(--ink-2)">${esc(p.city)} (Québec)${p.postalCode?' '+esc(p.postalCode):''}</p>
      <div style="display:flex;align-items:center;gap:var(--space-4);flex-wrap:wrap;margin-top:var(--space-5)">
        <span class="jg-typebadge">${TYPE_LABEL[p.type]||'Propriété'}</span>
        <span style="font:500 0.8125rem/1 var(--font-body);letter-spacing:0.02em;color:var(--ink-3)">No Centris ${esc(p.mls)}</span>${videoLink}
      </div>
      <div class="jg-quickstats" aria-label="Caractéristiques rapides">
        ${quickstats}
      </div>
    </div>
    <aside class="jg-head-prix" aria-label="Prix">
      <div class="jg-price-aside">
        <div style="font:600 0.6875rem/1 var(--font-body);text-transform:uppercase;letter-spacing:0.08em;color:var(--ink-3)">Prix demandé</div>
        <div class="jg-price" style="margin-top:10px">${money(p.price)}</div>
        ${evalLine}
        <div class="jg-action-stack">
          <a class="jg-btn jg-btn--primary jg-btn--md jg-btn--full" href="#jg-contact-form">Planifier une visite</a>
          <a class="jg-btn jg-btn--secondary jg-btn--md jg-btn--full" href="#jg-contact-form">Demande d'information</a>
          <div class="jg-action-row">
            <button type="button" id="jg-fav" class="jg-iconaction" style="flex:1" aria-pressed="false" aria-label="Ajouter aux favoris"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path></svg></button>
            <button type="button" id="jg-share" class="jg-iconaction" style="flex:1" aria-label="Partager"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.59 13.51 6.83 3.98"></path><path d="m15.41 6.51-6.82 3.98"></path></svg></button>
          </div>
          <span id="jg-share-status" class="sr-only" role="status" aria-live="polite"></span>
        </div>
      </div>
    </aside>
  </div>
</section>

<section style="max-width:var(--container);margin:0 auto;padding:clamp(2.5rem,5vw,4rem) var(--gutter) var(--section-y)">
  <div class="jg-body">
    <article style="min-width:0">
${description(p)}
      <div class="jg-block" data-reveal>
        <h2 class="jg-h2">Caractéristiques</h2>
        <div class="jg-h2-rule" aria-hidden="true"></div>
        <div class="jg-kv">
${characteristics(p)}
        </div>
      </div>
${roomsTable(p.rooms)}
${financier(p)}
${remarques(p)}
${localisation(p)}
    </article>

    <aside class="jg-aside" aria-label="Contacter la courtière">
      <div class="jg-broker" data-reveal>
        <div class="jg-broker-top">
          <div class="jg-broker-pic"><img src="assets/img/julie-portrait.jpg" alt="Julie Gauthier, courtière immobilière agréée"><span class="t" aria-hidden="true"></span></div>
          <div style="min-width:0"><div class="jg-broker-name">Julie Gauthier</div><div class="jg-broker-role">Courtière immobilière agréée · RE/MAX Crystal</div></div>
        </div>
        <a class="jg-broker-phone" href="tel:+15148954921">${PHONE_SVG}514.895.4921</a>
        <div style="display:flex;flex-direction:column;gap:var(--space-3);margin-top:var(--space-5)">
          <a class="jg-btn jg-btn--primary jg-btn--md jg-btn--full" href="#jg-contact-form">Planifier une visite</a>
          <a class="jg-btn jg-btn--secondary jg-btn--md jg-btn--full" href="#jg-contact-form">Demande d'information</a>
        </div>
        <div class="jg-broker-foot"><a class="jg-link" href="mailto:bonjour@juliegauthier.ca" style="font-size:0.875rem">Écrire à Julie</a><img src="brand_assets/crystal-long-noir.png" alt="RE/MAX Crystal" style="height:20px;width:auto;display:block;opacity:0.9"></div>
      </div>

      <form class="jg-panel" id="jg-contact-form" autocomplete="off">
        <h3 class="jg-panel-h">Cette propriété vous intéresse ?</h3>
        <div class="jg-remind">Au sujet de : ${esc(p.address)} · No ${esc(p.mls)}</div>
        <input type="hidden" name="adresse" value="${esc(p.address)}, ${esc(p.city)}">
        <input type="hidden" name="noCentris" value="${esc(p.mls)}">
        <div class="jg-field"><label class="jg-flabel" for="jg-f-nom">Nom</label><input class="jg-input" id="jg-f-nom" name="nom" type="text" placeholder="Votre nom" required></div>
        <div class="jg-field"><label class="jg-flabel" for="jg-f-courriel">Courriel</label><input class="jg-input" id="jg-f-courriel" name="courriel" type="email" placeholder="vous@exemple.ca" required></div>
        <div class="jg-field"><label class="jg-flabel" for="jg-f-tel">Téléphone</label><input class="jg-input" id="jg-f-tel" name="telephone" type="tel" placeholder="514 000 0000"></div>
        <div class="jg-field"><label class="jg-flabel" for="jg-f-msg">Message</label><textarea class="jg-textarea" id="jg-f-msg" name="message" rows="3">Bonjour, je souhaite en savoir plus sur le ${esc(p.address)} (No Centris ${esc(p.mls)}).</textarea></div>
        <label class="jg-consent" for="jg-f-consent"><input type="checkbox" id="jg-f-consent" name="consentement" required><span>J'accepte d'être contacté(e) au sujet de cette propriété.</span></label>
        <div style="margin-top:var(--space-5)"><button type="submit" class="jg-btn jg-btn--secondary jg-btn--md jg-btn--full">Envoyer ma demande</button></div>
        <p id="jg-form-status" role="status" aria-live="polite" style="margin:var(--space-3) 0 0;font:500 0.8125rem/1.4 var(--font-body);color:var(--blue);min-height:1.2em"></p>
      </form>

      <div class="jg-panel" data-reveal>
        <span class="jg-eyebrow" style="color:var(--blue)"><span class="rule" aria-hidden="true"></span>Estimation</span>
        <h3 class="jg-panel-h" style="margin-top:10px">Estimation des paiements</h3>
        <div class="jg-field"><label class="jg-flabel" for="jg-c-prix">Prix de la propriété</label><input class="jg-input" id="jg-c-prix" type="text" inputmode="numeric" value="${money(p.price)}"></div>
        <div class="jg-field"><label class="jg-flabel" for="jg-c-mise">Mise de fonds · <span id="jg-c-mise-out"></span></label><input class="jg-range" id="jg-c-mise" type="range" min="5" max="50" step="1" value="20"></div>
        <div class="jg-field"><label class="jg-flabel" for="jg-c-taux">Taux annuel</label><input class="jg-input" id="jg-c-taux" type="text" inputmode="decimal" value="5,25 %"></div>
        <div class="jg-field"><label class="jg-flabel" for="jg-c-amort">Amortissement</label><select class="jg-select" id="jg-c-amort"><option value="15">15 ans</option><option value="20">20 ans</option><option value="25" selected>25 ans</option><option value="30">30 ans</option></select></div>
        <div class="jg-calc-out"><div class="lbl">Paiement mensuel estimé</div><div class="jg-calc-amt" id="jg-c-out" aria-live="polite">—</div></div>
        <p style="margin:var(--space-3) 0 0;font:400 0.75rem/1.45 var(--font-body);color:var(--ink-3)">À titre indicatif. <a class="jg-link" href="calculatrice-hypothecaire.html" style="font-size:0.75rem">Calculatrice complète →</a></p>
      </div>
    </aside>
  </div>
</section>

<section aria-labelledby="jg-cta-title" style="position:relative;padding:var(--section-y) 0;background:var(--navy);overflow:hidden">
  <div aria-hidden="true" style="position:absolute;top:-35%;left:50%;transform:translateX(-50%);width:70%;height:95%;background:var(--glow-red);opacity:0.14;filter:blur(70px);border-radius:50%"></div>
  <div class="jg-cta-grid" data-reveal style="position:relative;max-width:var(--container);margin:0 auto;padding:0 var(--gutter);display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:clamp(2rem,5vw,4.5rem);align-items:center">
    <div>
      <div style="display:flex;align-items:center;gap:14px"><img src="brand_assets/ballon.png" alt="" aria-hidden="true" style="height:28px;width:auto;display:block;flex:none"><span class="jg-eyebrow" style="color:var(--red)">Cette propriété</span></div>
      <h2 id="jg-cta-title" style="margin-top:var(--space-4);color:var(--bg);font-size:clamp(2rem,4vw,3.25rem);line-height:1.04;letter-spacing:-0.03em;max-width:16ch">Intéressé par cette propriété ?</h2>
    </div>
    <div style="display:flex;flex-direction:column;gap:var(--space-6);padding-left:clamp(0rem,3vw,2.5rem);border-left:1px solid color-mix(in oklch,var(--bg) 16%,transparent)">
      <p style="margin:0;color:var(--sky);font:400 var(--fs-lead)/1.6 var(--font-body);max-width:42ch">Planifiez une visite à votre rythme, ou appelez Julie directement.</p>
      <div style="display:flex;gap:var(--space-6);align-items:center;flex-wrap:wrap"><a class="jg-btn jg-btn--primary jg-btn--lg" href="#jg-contact-form">Planifier une visite</a><a class="jg-cream-link" href="tel:+15148954921">${PHONE_SVG}514.895.4921</a></div>
    </div>
  </div>
</section>

${similarCards(related)}`;

  const mobilebar = `
<div class="jg-mobilebar" role="region" aria-label="Actions rapides">
  <div class="mb-price"><small>Prix demandé</small>${money(p.price)}</div>
  <div class="mb-actions"><a class="jg-mb-visit" href="#jg-contact-form">Planifier une visite</a><a class="jg-mb-phone" href="tel:+15148954921" aria-label="Appeler">${PHONE_SVG}</a></div>
</div>`;

  const lightbox = `
<div id="jg-lb" class="jg-lb" role="dialog" aria-modal="true" aria-label="Galerie photos" aria-hidden="true" inert>
  <div class="jg-lb-top"><div class="jg-lb-counter"><b id="jg-lb-cur">1</b> / <span id="jg-lb-total">${photos.length}</span></div><button type="button" class="jg-lb-close" id="jg-lb-close" aria-label="Fermer"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"></path></svg></button></div>
  <div class="jg-lb-stage"><button type="button" class="jg-lb-arrow" id="jg-lb-prev" aria-label="Précédente"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg></button><figure class="jg-lb-figure"><div class="jg-lb-imgwrap"><img class="jg-lb-img" id="jg-lb-img" alt=""><figcaption class="jg-lb-cap" id="jg-lb-cap"></figcaption></div></figure><button type="button" class="jg-lb-arrow" id="jg-lb-next" aria-label="Suivante"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg></button></div>
  <div class="jg-lb-thumbs" id="jg-lb-thumbs"></div><span id="jg-lb-live" class="sr-only" role="status" aria-live="polite"></span>
</div>`;

  const ficheJs = `<script>
(function(){
  var root=document.getElementById('jg-fiche'); if(!root) return;
  var PHOTOS=${JSON.stringify(photos.map(x=>({url:x.url})))};
  var SHARE={title:${JSON.stringify(p.address+' · Julie Gauthier')},text:${JSON.stringify(p.address+', '+p.city+' — '+money(p.price))}};
  function money(n){var s=Math.round(Math.abs(n)).toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g,'\\u00A0');return (n<0?'-':'')+s+'\\u00A0$';}
  function pct(n){return String(Math.round(n*100)/100).replace('.',',')+'\\u00A0%';}
  function parseNum(s){if(typeof s!=='string')return NaN;return parseFloat(s.replace(/[^\\d,.-]/g,'').replace(/\\s/g,'').replace(',','.'));}
  function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn);}
  ready(function(){
    var lb=root.querySelector('#jg-lb'),img=root.querySelector('#jg-lb-img'),cap=root.querySelector('#jg-lb-cap'),cur=root.querySelector('#jg-lb-cur'),live=root.querySelector('#jg-lb-live'),tw=root.querySelector('#jg-lb-thumbs');
    if(lb&&img&&PHOTOS.length){var N=PHOTOS.length,idx=0;tw.innerHTML='';
      var thumbs=PHOTOS.map(function(ph,i){var b=document.createElement('button');b.type='button';b.className='jg-lb-thumb';b.setAttribute('aria-label','Photo '+(i+1));var im=document.createElement('img');im.src=ph.url;im.alt='';im.loading='lazy';b.appendChild(im);b.addEventListener('click',function(){go(i);});tw.appendChild(b);return b;});
      function render(){var ph=PHOTOS[idx];img.style.opacity='0';img.src=ph.url;var show=function(){img.style.opacity='1';};if(img.complete)requestAnimationFrame(show);else{img.onload=show;img.onerror=show;}if(cap)cap.textContent='Photo '+(idx+1)+' / '+N;if(cur)cur.textContent=String(idx+1);if(live)live.textContent='Photo '+(idx+1)+' sur '+N;thumbs.forEach(function(t,i){if(i===idx){t.setAttribute('aria-current','true');t.scrollIntoView({block:'nearest',inline:'nearest'});}else t.removeAttribute('aria-current');});}
      function go(i){idx=(i+N)%N;render();}
      var last=null;function fo(){return [].slice.call(lb.querySelectorAll('button')).filter(function(el){return el.offsetParent!==null;});}
      function open(i){last=document.activeElement;go(i||0);lb.classList.add('is-open');lb.removeAttribute('inert');lb.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';var c=root.querySelector('#jg-lb-close');if(c)c.focus();}
      function close(){lb.classList.remove('is-open');lb.setAttribute('inert','');lb.setAttribute('aria-hidden','true');document.body.style.overflow='';if(last&&last.focus)last.focus();}
      root.querySelectorAll('.jg-gal-item').forEach(function(btn){btn.addEventListener('click',function(){open(parseInt(btn.dataset.gindex||'0',10));});});
      var ob=root.querySelector('#jg-open-gallery');if(ob)ob.addEventListener('click',function(){open(0);});
      root.querySelector('#jg-lb-close').addEventListener('click',close);root.querySelector('#jg-lb-prev').addEventListener('click',function(){go(idx-1);});root.querySelector('#jg-lb-next').addEventListener('click',function(){go(idx+1);});
      document.addEventListener('keydown',function(e){if(lb.getAttribute('aria-hidden')!=='false')return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft'){e.preventDefault();go(idx-1);}else if(e.key==='ArrowRight'){e.preventDefault();go(idx+1);}else if(e.key==='Tab'){var f=fo();if(!f.length)return;var a=f[0],b=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();b.focus();}else if(!e.shiftKey&&document.activeElement===b){e.preventDefault();a.focus();}}});
    }
    var rm=root.querySelector('#jg-readmore'),more=root.querySelector('#jg-desc-more');
    if(rm&&more)rm.addEventListener('click',function(){var o=more.classList.toggle('is-open');rm.setAttribute('aria-expanded',o?'true':'false');rm.innerHTML=o?'Lire moins <span aria-hidden="true">↑</span>':'Lire la suite <span aria-hidden="true">↓</span>';});
    var fav=root.querySelector('#jg-fav');if(fav)fav.addEventListener('click',function(){var on=fav.getAttribute('aria-pressed')==='true';fav.setAttribute('aria-pressed',on?'false':'true');var s=fav.querySelector('svg');if(s)s.setAttribute('fill',on?'none':'currentColor');});
    var sh=root.querySelector('#jg-share'),st=root.querySelector('#jg-share-status');if(sh)sh.addEventListener('click',function(){var d={title:SHARE.title,text:SHARE.text,url:location.href};try{if(navigator.share)navigator.share(d);else if(navigator.clipboard){navigator.clipboard.writeText(location.href);if(st)st.textContent='Lien copié.';}}catch(e){}});
    var prix=root.querySelector('#jg-c-prix'),mise=root.querySelector('#jg-c-mise'),mo=root.querySelector('#jg-c-mise-out'),taux=root.querySelector('#jg-c-taux'),am=root.querySelector('#jg-c-amort'),out=root.querySelector('#jg-c-out');
    if(prix&&mise&&taux&&am&&out){am.value='25';function calc(){var P=parseNum(prix.value)||0,pc=parseFloat(mise.value)||0,dn=P*pc/100,loan=Math.max(0,P-dn),r=(parseNum(taux.value)||0)/100/12,n=(parseInt(am.value,10)||25)*12,m=0;if(loan>0)m=r===0?loan/n:loan*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);if(mo)mo.innerHTML=pct(pc)+' · '+money(dn);out.innerHTML=money(m)+' <span class="per">/mois</span>';}prix.addEventListener('input',calc);prix.addEventListener('blur',function(){var v=parseNum(prix.value);if(!isNaN(v))prix.value=money(v);});taux.addEventListener('input',calc);mise.addEventListener('input',calc);am.addEventListener('change',calc);calc();}
    var cf=root.querySelector('#jg-contact-form');if(cf)cf.addEventListener('submit',function(e){e.preventDefault();var s=root.querySelector('#jg-form-status');if(s)s.textContent='Merci, votre demande a été transmise à Julie.';});
  });
})();
<\/script>`;

  return `<!DOCTYPE html>
<html lang="fr-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#000E35">
<meta property="og:type" content="website"><meta property="og:locale" content="fr_CA">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">${photos[0]?`<meta property="og:image" content="${photos[0].url}">`:''}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap">
<script type="application/ld+json">${JSON.stringify(jsonld)}<\/script>
<style>
${TOKENS}
${FICHE_CSS}
</style>
</head>
<body>
<div id="jg-fiche" style="background:var(--bg)">
<a href="#contenu" class="jg-skip">Aller au contenu</a>
${nav('proprietes')}
<main id="contenu">
${main}
</main>
${FOOTER}
${mobilebar}
${lightbox}
</div>
${SCRIPT}
${ficheJs}
</body>
</html>
`;
}
