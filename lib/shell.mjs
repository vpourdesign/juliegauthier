// Shell partagé : TOKENS, nav(active), FOOTER, SCRIPT — pour acheter/vendre/secteurs.
export const ROOT = '';

export const TOKENS = `
:root{
  --bg:#F7F5EE; --paper:#FCFBF7; --white:#FFFFFF;
  --ink:#1A1A1C; --ink-2:#474C57; --ink-3:#8B909B;
  --line:color-mix(in oklch, var(--ink) 12%, transparent); --line-2:color-mix(in oklch, var(--ink) 7%, transparent);
  --blue:#0043FF; --blue-deep:#0C2749; --navy:#000E35; --red:#FF1200; --red-deep:#AA1120; --red-dark:#660000; --sky:#A3D4F2;
  --focus-ring:var(--blue);
  --font-display:"Archivo","Helvetica Neue",Arial,sans-serif; --font-body:"Inter","Helvetica Neue",Arial,sans-serif;
  --fw-regular:400; --fw-medium:500; --fw-semibold:600; --fw-bold:700; --fw-black:800;
  --fs-display:clamp(2.75rem,6vw,5.5rem); --fs-h2:clamp(2rem,4vw,3.25rem); --fs-h3:clamp(1.25rem,2vw,1.6rem);
  --fs-lead:clamp(1.125rem,1.6vw,1.375rem); --fs-body:1.0625rem; --fs-eyebrow:0.75rem; --fs-label:0.8125rem;
  --lh-display:1.02; --lh-h2:1.06; --lh-h3:1.2; --lh-lead:1.6; --lh-body:1.7;
  --ls-display:-0.03em; --ls-h2:-0.02em; --ls-tight:-0.01em; --ls-eyebrow:0.16em; --ls-label:0.04em;
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px; --space-5:24px; --space-6:32px; --space-7:48px; --space-8:64px; --space-9:96px; --space-10:128px;
  --section-y:clamp(5rem,10vw,9rem); --gutter:clamp(1.25rem,4vw,2.5rem); --container:1240px; --container-wide:1400px; --nav-h:76px;
  --r-xs:4px; --r-sm:8px; --r-md:14px; --r-pill:999px;
  --shadow-sm:0 1px 2px rgba(12,39,73,0.06),0 2px 6px rgba(12,39,73,0.05);
  --shadow-md:0 2px 6px rgba(12,39,73,0.06),0 10px 24px rgba(12,39,73,0.08),0 30px 60px rgba(12,39,73,0.06);
  --shadow-hover:0 6px 16px rgba(12,39,73,0.10),0 22px 50px rgba(12,39,73,0.12);
  --ease-spring:cubic-bezier(0.16,1,0.3,1); --ease-out:cubic-bezier(0.22,0.61,0.36,1);
  --dur-fast:140ms; --dur-base:240ms; --dur-slow:420ms; --dur-reveal:720ms;
}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--font-body);font-size:var(--fs-body);line-height:var(--lh-body);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;overflow-x:hidden}
h1,h2,h3,h4{font-family:var(--font-display);color:var(--ink);margin:0;font-weight:var(--fw-bold)}
h1{font-size:var(--fs-display);font-weight:var(--fw-black);line-height:var(--lh-display);letter-spacing:var(--ls-display)}
h2{font-size:var(--fs-h2);line-height:var(--lh-h2);letter-spacing:var(--ls-h2)}
h3{font-size:var(--fs-h3);font-weight:var(--fw-semibold);line-height:var(--lh-h3);letter-spacing:var(--ls-tight)}
p{margin:0;text-wrap:pretty}
a{color:var(--blue);text-decoration:none}
:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}
::selection{background:color-mix(in oklch,var(--blue) 22%,transparent);color:var(--ink)}
.jg-btn{font-family:var(--font-body);font-weight:600;letter-spacing:.01em;line-height:1;display:inline-flex;align-items:center;justify-content:center;border:1px solid transparent;cursor:pointer;text-decoration:none;white-space:nowrap;user-select:none;transition:transform var(--dur-fast) var(--ease-spring),background-color var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out),color var(--dur-base) var(--ease-out)}
.jg-btn--sm{padding:8px 16px;font-size:.8125rem;gap:6px}
.jg-btn--md{padding:13px 24px;font-size:.9375rem;gap:8px}
.jg-btn--lg{padding:17px 32px;font-size:1.0625rem;gap:10px}
.jg-btn--primary{background:var(--red);color:var(--bg);border-radius:var(--r-sm);box-shadow:var(--shadow-sm)}
.jg-btn--primary:hover{background:var(--red-deep);transform:translateY(-1px)}
.jg-btn--primary:active{transform:translateY(0) scale(.985)}
.jg-btn--secondary{background:transparent;color:var(--ink);border:1px solid var(--line);border-radius:var(--r-sm)}
.jg-btn--secondary:hover{background:var(--paper)}
.jg-btn--full{display:flex;width:100%}
.jg-skip{position:fixed;top:-64px;left:16px;z-index:200;background:var(--navy);color:var(--bg);padding:11px 18px;border-radius:var(--r-sm);font:600 14px/1 var(--font-body);text-decoration:none;transition:top var(--dur-base) var(--ease-out)}
.jg-skip:focus{top:16px}
[data-reveal]{opacity:0;transform:translateY(24px);transition:opacity .7s var(--ease-spring),transform .7s var(--ease-spring)}
[data-reveal].is-in{opacity:1;transform:none}
.jg-navlink{position:relative;white-space:nowrap;font:500 0.9375rem/1 var(--font-body);color:var(--nav-fg);text-decoration:none;border-bottom:1.5px solid transparent;padding-bottom:4px;transition:border-color var(--dur-base) var(--ease-out),color var(--dur-base) var(--ease-out)}
.jg-navlink:hover{border-bottom-color:var(--red)}
.jg-navlink[aria-current="page"]{border-bottom-color:var(--blue);color:var(--ink)}
.jg-navlink:focus-visible{outline:2px solid var(--blue);outline-offset:3px;border-radius:2px}
.jg-burger{display:none}
.jg-has-sub{position:relative;display:flex;align-items:center}
.jg-subtoggle{display:inline-flex;align-items:center;gap:6px;background:none;border:0;cursor:pointer;font:500 0.9375rem/1 var(--font-body);color:var(--nav-fg);padding:0 0 4px;border-bottom:1.5px solid transparent;transition:border-color var(--dur-base) var(--ease-out),color var(--dur-base) var(--ease-out)}
.jg-subtoggle:hover,.jg-has-sub:hover .jg-subtoggle,.jg-subtoggle[aria-expanded="true"],.jg-subtoggle[data-active="true"]{border-bottom-color:var(--blue);color:var(--ink)}
.jg-subtoggle svg{transition:transform var(--dur-base) var(--ease-out)}
.jg-has-sub:hover .jg-subtoggle svg,.jg-subtoggle[aria-expanded="true"] svg{transform:rotate(180deg)}
.jg-submenu{position:absolute;top:calc(100% + 16px);left:50%;transform:translateX(-50%) translateY(6px);min-width:230px;background:var(--paper);border:1px solid var(--line);border-radius:var(--r-md);box-shadow:var(--shadow-md);padding:8px;list-style:none;margin:0;opacity:0;visibility:hidden;pointer-events:none;transition:opacity var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-spring);z-index:60}
.jg-submenu::before{content:"";position:absolute;top:-16px;left:0;right:0;height:16px}
.jg-has-sub:hover .jg-submenu,.jg-submenu.is-open{opacity:1;visibility:visible;pointer-events:auto;transform:translateX(-50%) translateY(0)}
.jg-sublink{display:flex;align-items:center;gap:11px;padding:11px 13px;border-radius:var(--r-sm);font:500 0.9375rem/1.35 var(--font-body);color:var(--ink);text-decoration:none;transition:background var(--dur-base) var(--ease-out),color var(--dur-base) var(--ease-out)}
.jg-sublink:hover{background:color-mix(in oklch,var(--blue) 8%,var(--bg));color:var(--blue)}
.jg-sublink[aria-current="page"]{color:var(--blue);background:color-mix(in oklch,var(--blue) 7%,var(--bg))}
.jg-sublink svg{flex:none;color:var(--blue)}
.jg-sublink:focus-visible{outline:2px solid var(--blue);outline-offset:-1px}
.jg-nav-desktop>ul{line-height:1}
.jg-nav-desktop>ul>li{display:flex;align-items:center}
.jg-foot-link{color:color-mix(in oklch,var(--bg) 82%,transparent);font:400 0.9375rem/1.4 var(--font-body);text-decoration:none;transition:color var(--dur-base) var(--ease-out)}
.jg-foot-link:hover{color:var(--bg)}
.jg-soc{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:var(--r-pill);border:1px solid color-mix(in oklch,var(--bg) 22%,transparent);color:color-mix(in oklch,var(--bg) 80%,transparent);transition:color var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-spring)}
.jg-soc:hover{color:var(--sky);border-color:var(--sky);transform:translateY(-2px)}
.jg-overlay{position:fixed;inset:0;z-index:120;background:var(--bg);display:flex;flex-direction:column;transform:translateX(100%);opacity:0;pointer-events:none;transition:transform var(--dur-slow) var(--ease-spring),opacity var(--dur-base) var(--ease-out)}
.jg-overlay.is-open{transform:translateX(0);opacity:1;pointer-events:auto}
.jg-drawer-head{display:flex;align-items:center;justify-content:space-between;padding:var(--gutter);border-bottom:1px solid var(--line)}
.jg-iconbtn{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;background:transparent;border:none;cursor:pointer;color:var(--ink)}
.jg-mob-eyebrow{font:600 0.6875rem/1 var(--font-body);text-transform:uppercase;letter-spacing:0.16em;color:var(--ink-3);padding:var(--space-4) 0 var(--space-2)}
`.trim();

export function nav(active){
  const svc = (k,label)=> k===active
    ? `<a role="menuitem" class="jg-sublink" href="${k}.html" aria-current="page">${label}</a>`
    : `<a role="menuitem" class="jg-sublink" href="${k}.html">${label}</a>`;
  const svcActive = (active==='acheter'||active==='vendre') ? ' data-active="true"' : '';
  const secActive = (active==='secteurs'||active==='mirabel'||active==='saint-augustin') ? ' data-active="true"' : '';
  const outActive = (active==='calculatrice'||active==='taxe-bienvenue'||active==='capacite-emprunt') ? ' data-active="true"' : '';
  const propAttr = (active==='proprietes') ? ' aria-current="page"' : '';
  const aproAttr = (active==='apropos') ? ' aria-current="page"' : '';
  const pinSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
  const icCalc = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="14" x2="8" y2="14"></line><line x1="12" y1="14" x2="12" y2="14"></line><line x1="16" y1="14" x2="16" y2="18"></line></svg>`;
  const icTax = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6"></path><path d="M9 13h6"></path><path d="M9 17h4"></path></svg>`;
  const icWallet = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path><path d="M16 12h2"></path><path d="M3 9h13a2 2 0 0 1 0 4H3"></path></svg>`;
  const tool = (href,key,label,icon)=> active===key
    ? `<a role="menuitem" class="jg-sublink" href="${href}" aria-current="page">${icon}${label}</a>`
    : `<a role="menuitem" class="jg-sublink" href="${href}">${icon}${label}</a>`;
  return `
<header id="jg-nav" style="position:sticky;top:0;z-index:50;--nav-fg:var(--ink);background:color-mix(in oklch,var(--bg) 85%,transparent);backdrop-filter:blur(12px) saturate(1.4);-webkit-backdrop-filter:blur(12px) saturate(1.4);border-bottom:1px solid var(--line);transition:box-shadow var(--dur-base) var(--ease-out)">
  <nav style="max-width:var(--container-wide);margin:0 auto;padding:0 var(--gutter);height:var(--nav-h);display:flex;align-items:center;justify-content:space-between;gap:var(--space-6)">
    <a href="index.html" aria-label="Julie Gauthier, RE/MAX Crystal, accueil" style="display:block;flex:none">
      <span style="display:inline-flex;align-items:center;gap:13px;line-height:1">
        <img src="brand_assets/ballon.png" alt="" aria-hidden="true" style="height:42px;width:auto;display:block;flex:none">
        <span style="font-family:var(--font-display);font-weight:700;font-size:22px;letter-spacing:-.01em;color:var(--ink);white-space:nowrap">Julie Gauthier</span>
      </span>
    </a>
    <div class="jg-nav-desktop" style="display:flex;align-items:center;gap:var(--space-6)">
      <ul style="display:flex;align-items:center;gap:var(--space-5);list-style:none;margin:0;padding:0">
        <li><a class="jg-navlink" href="index.html">Accueil</a></li>
        <li><a class="jg-navlink" href="apropos.html"${aproAttr}>À propos</a></li>
        <li class="jg-has-sub">
          <button class="jg-subtoggle"${svcActive} type="button" aria-expanded="false" aria-haspopup="true" aria-controls="jg-sub-services">Services <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button>
          <ul class="jg-submenu" id="jg-sub-services" role="menu">
            <li role="none">${svc('acheter','Acheter')}</li>
            <li role="none">${svc('vendre','Vendre')}</li>
          </ul>
        </li>
        <li><a class="jg-navlink" href="proprietes.html"${propAttr}>Propriétés</a></li>
        <li class="jg-has-sub">
          <button class="jg-subtoggle"${secActive} type="button" aria-expanded="false" aria-haspopup="true" aria-controls="jg-sub-secteurs">Secteurs <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button>
          <ul class="jg-submenu" id="jg-sub-secteurs" role="menu">
            <li role="none">${active==='secteurs'?`<a role="menuitem" class="jg-sublink" href="secteurs.html" aria-current="page">Tous les secteurs</a>`:`<a role="menuitem" class="jg-sublink" href="secteurs.html">Tous les secteurs</a>`}</li>
            <li role="none">${active==='mirabel'?`<a role="menuitem" class="jg-sublink" href="mirabel.html" aria-current="page">${pinSvg}Mirabel</a>`:`<a role="menuitem" class="jg-sublink" href="mirabel.html">${pinSvg}Mirabel</a>`}</li>
            <li role="none">${active==='saint-augustin'?`<a role="menuitem" class="jg-sublink" href="saint-augustin.html" aria-current="page">${pinSvg}Saint-Augustin</a>`:`<a role="menuitem" class="jg-sublink" href="saint-augustin.html">${pinSvg}Saint-Augustin</a>`}</li>
          </ul>
        </li>
        <li class="jg-has-sub">
          <button class="jg-subtoggle"${outActive} type="button" aria-expanded="false" aria-haspopup="true" aria-controls="jg-sub-outils">Outils <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button>
          <ul class="jg-submenu" id="jg-sub-outils" role="menu" style="min-width:266px">
            <li role="none">${tool('calculatrice-hypothecaire.html','calculatrice','Calculatrice hypothécaire',icCalc)}</li>
            <li role="none">${tool('taxe-de-bienvenue.html','taxe-bienvenue','Taxe de bienvenue',icTax)}</li>
            <li role="none">${tool('capacite-emprunt.html','capacite-emprunt',"Capacité d'emprunt",icWallet)}</li>
          </ul>
        </li>
        <li><a class="jg-navlink" href="index.html#temoignages">Témoignages</a></li>
        <li><a class="jg-navlink" href="index.html#contact">Contact</a></li>
      </ul>
      <a class="jg-btn jg-btn--primary jg-btn--sm" href="tel:+15148954921" aria-label="Appeler le 514 895 4921">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        514.895.4921
      </a>
    </div>
    <button id="jg-burger" class="jg-burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="jg-menu" style="display:none;align-items:center;justify-content:center;width:44px;height:44px;background:transparent;border:none;cursor:pointer;padding:0;flex:none">
      <span style="position:relative;display:block;width:24px;height:14px">
        <span style="position:absolute;left:0;top:0;width:100%;height:2px;background:var(--ink);border-radius:2px"></span>
        <span style="position:absolute;left:0;top:6px;width:100%;height:2px;background:var(--ink);border-radius:2px"></span>
        <span style="position:absolute;left:0;top:12px;width:100%;height:2px;background:var(--ink);border-radius:2px"></span>
      </span>
    </button>
  </nav>
</header>

<div id="jg-menu" class="jg-overlay" role="dialog" aria-modal="true" aria-label="Menu de navigation" aria-hidden="true" inert>
  <div class="jg-drawer-head">
    <img src="brand_assets/crystal-long-noir.png" alt="RE/MAX Crystal" style="height:26px;width:auto;display:block">
    <button id="jg-menu-close" class="jg-iconbtn" type="button" aria-label="Fermer le menu"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"></path></svg></button>
  </div>
  <nav style="display:flex;flex-direction:column;padding:var(--space-7) var(--gutter) 0;overflow-y:auto">
    <a href="index.html" style="font:700 clamp(1.75rem,8vw,2.5rem)/1.05 var(--font-display);letter-spacing:-0.03em;color:var(--ink);text-decoration:none;padding:var(--space-3) 0">Accueil</a>
    <a href="apropos.html"${aproAttr} style="font:700 clamp(1.75rem,8vw,2.5rem)/1.05 var(--font-display);letter-spacing:-0.03em;color:${active==='apropos'?'var(--blue)':'var(--ink)'};text-decoration:none;padding:var(--space-3) 0">À propos</a>
    <a href="proprietes.html"${propAttr} style="font:700 clamp(1.75rem,8vw,2.5rem)/1.05 var(--font-display);letter-spacing:-0.03em;color:${active==='proprietes'?'var(--blue)':'var(--ink)'};text-decoration:none;padding:var(--space-3) 0">Propriétés</a>
    <div class="jg-mob-eyebrow">Services</div>
    <a href="acheter.html"${active==='acheter'?' aria-current="page"':''} style="font:700 clamp(1.5rem,6.5vw,2rem)/1.1 var(--font-display);letter-spacing:-0.02em;color:${active==='acheter'?'var(--blue)':'var(--ink)'};text-decoration:none;padding:var(--space-2) 0">Acheter</a>
    <a href="vendre.html"${active==='vendre'?' aria-current="page"':''} style="font:700 clamp(1.5rem,6.5vw,2rem)/1.1 var(--font-display);letter-spacing:-0.02em;color:${active==='vendre'?'var(--blue)':'var(--ink)'};text-decoration:none;padding:var(--space-2) 0">Vendre</a>
    <div class="jg-mob-eyebrow">Secteurs</div>
    <a href="secteurs.html"${active==='secteurs'?' aria-current="page"':''} style="font:700 clamp(1.5rem,6.5vw,2rem)/1.1 var(--font-display);letter-spacing:-0.02em;color:${active==='secteurs'?'var(--blue)':'var(--ink)'};text-decoration:none;padding:var(--space-2) 0">Tous les secteurs</a>
    <a href="mirabel.html"${active==='mirabel'?' aria-current="page"':''} style="font:700 clamp(1.5rem,6.5vw,2rem)/1.1 var(--font-display);letter-spacing:-0.02em;color:${active==='mirabel'?'var(--blue)':'var(--ink)'};text-decoration:none;padding:var(--space-2) 0">Mirabel</a>
    <a href="saint-augustin.html"${active==='saint-augustin'?' aria-current="page"':''} style="font:700 clamp(1.5rem,6.5vw,2rem)/1.1 var(--font-display);letter-spacing:-0.02em;color:${active==='saint-augustin'?'var(--blue)':'var(--ink)'};text-decoration:none;padding:var(--space-2) 0">Saint-Augustin</a>
    <div class="jg-mob-eyebrow">Outils</div>
    <a href="calculatrice-hypothecaire.html"${active==='calculatrice'?' aria-current="page"':''} style="font:700 clamp(1.5rem,6.5vw,2rem)/1.1 var(--font-display);letter-spacing:-0.02em;color:${active==='calculatrice'?'var(--blue)':'var(--ink)'};text-decoration:none;padding:var(--space-2) 0">Calculatrice hypothécaire</a>
    <a href="taxe-de-bienvenue.html"${active==='taxe-bienvenue'?' aria-current="page"':''} style="font:700 clamp(1.5rem,6.5vw,2rem)/1.1 var(--font-display);letter-spacing:-0.02em;color:${active==='taxe-bienvenue'?'var(--blue)':'var(--ink)'};text-decoration:none;padding:var(--space-2) 0">Taxe de bienvenue</a>
    <a href="capacite-emprunt.html"${active==='capacite-emprunt'?' aria-current="page"':''} style="font:700 clamp(1.5rem,6.5vw,2rem)/1.1 var(--font-display);letter-spacing:-0.02em;color:${active==='capacite-emprunt'?'var(--blue)':'var(--ink)'};text-decoration:none;padding:var(--space-2) 0">Capacité d'emprunt</a>
    <a href="index.html#temoignages" style="font:700 clamp(1.75rem,8vw,2.5rem)/1.05 var(--font-display);letter-spacing:-0.03em;color:var(--ink);text-decoration:none;padding:var(--space-3) 0">Témoignages</a>
    <a href="index.html#contact" style="font:700 clamp(1.75rem,8vw,2.5rem)/1.05 var(--font-display);letter-spacing:-0.03em;color:var(--ink);text-decoration:none;padding:var(--space-3) 0 var(--space-5)">Contact</a>
  </nav>
  <div style="margin-top:auto;padding:var(--space-6) var(--gutter)">
    <a href="tel:+15148954921" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;background:var(--red);color:var(--bg);font:600 1.0625rem/1 var(--font-body);padding:18px 24px;border-radius:var(--r-sm);text-decoration:none;box-shadow:var(--shadow-sm)">514.895.4921</a>
  </div>
</div>`;
}

export const FOOTER = `
<footer style="background:var(--navy);border-top:1px solid color-mix(in oklch,var(--bg) 12%,transparent);padding:var(--space-9) 0 var(--space-6)">
  <div class="jg-foot-grid" style="max-width:var(--container);margin:0 auto;padding:0 var(--gutter);display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:var(--space-7)">
    <div style="max-width:340px">
      <img src="brand_assets/crystal-long-blanc.png" alt="RE/MAX Crystal" style="height:30px;width:auto;display:block">
      <p style="margin-top:var(--space-5);color:color-mix(in oklch,var(--bg) 64%,transparent);font:400 0.9375rem/1.6 var(--font-body)">Julie Gauthier, courtière immobilière agréée. Au service des acheteurs et vendeurs de Mirabel, Saint-Augustin et de la Rive-Nord de Montréal.</p>
      <div style="display:flex;gap:12px;margin-top:var(--space-6)">
        <a class="jg-soc" href="index.html#contact" aria-label="Facebook de Julie Gauthier"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H8v3h2v6h3v-6h2.5l.5-3H13v-2a1 1 0 0 1 1-1Z"></path></svg></a>
        <a class="jg-soc" href="index.html#contact" aria-label="Instagram de Julie Gauthier"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"></circle></svg></a>
        <a class="jg-soc" href="index.html#contact" aria-label="LinkedIn de Julie Gauthier"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 8A1.5 1.5 0 1 0 6.5 5a1.5 1.5 0 0 0 0 3ZM5 10h3v9H5v-9Zm5 0h2.9v1.2h.04c.4-.75 1.4-1.55 2.9-1.55 3.1 0 3.66 2 3.66 4.7V19h-3v-4.1c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19h-3v-9Z"></path></svg></a>
      </div>
    </div>
    <div>
      <div style="font:600 0.6875rem/1 var(--font-body);text-transform:uppercase;letter-spacing:0.16em;color:color-mix(in oklch,var(--bg) 50%,transparent)">Navigation</div>
      <ul style="list-style:none;margin:var(--space-5) 0 0;padding:0;display:flex;flex-direction:column;gap:var(--space-3)">
        <li><a class="jg-foot-link" href="index.html">Accueil</a></li>
        <li><a class="jg-foot-link" href="apropos.html">À propos</a></li>
        <li><a class="jg-foot-link" href="proprietes.html">Propriétés</a></li>
        <li><a class="jg-foot-link" href="acheter.html">Acheter</a></li>
        <li><a class="jg-foot-link" href="vendre.html">Vendre</a></li>
        <li><a class="jg-foot-link" href="calculatrice-hypothecaire.html">Calculatrice hypothécaire</a></li>
      </ul>
    </div>
    <div>
      <div style="font:600 0.6875rem/1 var(--font-body);text-transform:uppercase;letter-spacing:0.16em;color:color-mix(in oklch,var(--bg) 50%,transparent)">Secteurs &amp; contact</div>
      <ul style="list-style:none;margin:var(--space-5) 0 0;padding:0;display:flex;flex-direction:column;gap:var(--space-3)">
        <li><a class="jg-foot-link" href="mirabel.html">Mirabel</a></li>
        <li><a class="jg-foot-link" href="saint-augustin.html">Saint-Augustin</a></li>
        <li><a class="jg-foot-link" href="tel:+15148954921">514.895.4921</a></li>
        <li><a class="jg-foot-link" href="mailto:bonjour@juliegauthier.ca">bonjour@juliegauthier.ca</a></li>
        <li><span style="color:color-mix(in oklch,var(--bg) 64%,transparent);font:400 0.9375rem/1.4 var(--font-body)">Courtière immobilière agréée</span></li>
      </ul>
    </div>
  </div>
  <div style="max-width:var(--container);margin:var(--space-8) auto 0;padding:var(--space-5) var(--gutter) 0;border-top:1px solid color-mix(in oklch,var(--bg) 12%,transparent);display:flex;justify-content:space-between;gap:var(--space-4) var(--space-6);flex-wrap:wrap;color:color-mix(in oklch,var(--bg) 58%,transparent);font:400 0.8125rem/1.5 var(--font-body)">
    <span>© 2026 Julie Gauthier. Tous droits réservés.</span>
    <span>Chaque bureau est indépendant et autonome.</span>
  </div>
</footer>`;

export const SCRIPT = `<script>
(function(){
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var nav=document.getElementById('jg-nav');
    var onScroll=function(){ if(nav) nav.style.boxShadow=window.scrollY>16?'var(--shadow-sm)':'none'; };
    window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
    var reveals=[].slice.call(document.querySelectorAll('[data-reveal]'));
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){ reveals.forEach(function(el){el.classList.add('is-in');}); }
    else { var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(!e.isIntersecting)return; var el=e.target; var sibs=[].slice.call(el.parentElement.querySelectorAll(':scope > [data-reveal]')); var i=Math.max(0,sibs.indexOf(el)); el.style.transitionDelay=(i*70)+'ms'; el.classList.add('is-in'); io.unobserve(el); }); },{threshold:0.1,rootMargin:'0px 0px -6% 0px'}); reveals.forEach(function(el){io.observe(el);}); setTimeout(function(){reveals.forEach(function(el){el.classList.add('is-in');});},4000); }
    document.querySelectorAll('.jg-has-sub').forEach(function(wrap){
      var btn=wrap.querySelector('.jg-subtoggle'),menu=wrap.querySelector('.jg-submenu'); if(!btn||!menu)return;
      var op=function(){menu.classList.add('is-open');btn.setAttribute('aria-expanded','true');};
      var cl=function(){menu.classList.remove('is-open');btn.setAttribute('aria-expanded','false');};
      btn.addEventListener('click',function(e){e.stopPropagation();menu.classList.contains('is-open')?cl():op();});
      wrap.addEventListener('keydown',function(e){if(e.key==='Escape'){cl();btn.focus();}});
      document.addEventListener('click',function(e){if(!wrap.contains(e.target))cl();});
    });
    (function(){ var b=document.getElementById('jg-burger'),m=document.getElementById('jg-menu'),c=document.getElementById('jg-menu-close'); if(!b||!m)return;
      var fo=function(){return [].slice.call(m.querySelectorAll('a[href], button')).filter(function(el){return el.offsetParent!==null;});};
      var op=function(){m.classList.add('is-open');m.removeAttribute('inert');m.setAttribute('aria-hidden','false');b.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';var f=fo();if(f[0])f[0].focus();};
      var cl=function(){m.classList.remove('is-open');m.setAttribute('inert','');m.setAttribute('aria-hidden','true');b.setAttribute('aria-expanded','false');document.body.style.overflow='';b.focus();};
      b.addEventListener('click',op); if(c)c.addEventListener('click',cl); m.querySelectorAll('a[href]').forEach(function(a){a.addEventListener('click',cl);});
      document.addEventListener('keydown',function(e){ if(m.getAttribute('aria-hidden')!=='false')return; if(e.key==='Escape'){cl();return;} if(e.key==='Tab'){var f=fo();if(!f.length)return;var first=f[0],last=f[f.length-1]; if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();} else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}} });
    })();
    var form=document.getElementById('svc-form');
    if(form) form.addEventListener('submit',function(e){ e.preventDefault(); var btn=form.querySelector('button[type="submit"]'); if(btn){ btn.textContent='Merci, je vous reviens rapidement.'; btn.disabled=true; } });
  });
})();
<\/script>`;
