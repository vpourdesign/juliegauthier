// CSS de la fiche propriété (extrait du gabarit vérifié).
export const FICHE_CSS = `
:root{--font-accent:"Fraunces","Playfair Display",Georgia,serif;--aside-top:calc(var(--nav-h) + 20px);--glow-red:radial-gradient(circle,#FF1200 0%,rgba(255,18,0,0) 70%);--shadow-lg:0 24px 60px rgba(0,14,53,0.5),0 8px 24px rgba(0,14,53,0.4)}
html{scroll-behavior:smooth}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
.jg-cream-link{display:inline-flex;align-items:center;gap:8px;color:var(--bg);text-decoration:none;border-bottom:1px solid color-mix(in oklch,var(--bg) 45%,transparent);padding-bottom:2px;font:600 1.0625rem/1 var(--font-body);transition:border-color var(--dur-base) var(--ease-out),gap var(--dur-base) var(--ease-out)}
.jg-cream-link:hover{border-bottom-color:var(--bg);gap:11px}
.jg-cream-link:focus-visible{outline:2px solid var(--sky);outline-offset:3px;border-radius:2px}
.jg-link{display:inline-flex;align-items:center;gap:6px;color:var(--blue);font:600 0.9375rem/1 var(--font-body);text-decoration:none;border-bottom:1px solid color-mix(in oklch,var(--blue) 38%,transparent);padding-bottom:2px;cursor:pointer;background:none;border-left:0;border-right:0;border-top:0;transition:border-color var(--dur-base) var(--ease-out),color var(--dur-base) var(--ease-out),gap var(--dur-base) var(--ease-out)}
.jg-link:hover{border-bottom-color:var(--red);color:var(--red);gap:10px}
.jg-link:focus-visible{outline:2px solid var(--blue);outline-offset:3px;border-radius:2px}
.jg-link[aria-disabled="true"]{opacity:.55;cursor:not-allowed;border-bottom-color:transparent}
.jg-link[aria-disabled="true"]:hover{color:var(--blue);gap:6px}
.jg-crumb{color:var(--ink);text-decoration:none;border-bottom:1px solid transparent;padding-bottom:1px;transition:border-color var(--dur-base) var(--ease-out),color var(--dur-base) var(--ease-out)}
.jg-crumb:hover{color:var(--blue);border-bottom-color:color-mix(in oklch,var(--blue) 45%,transparent)}
.jg-crumb:focus-visible{outline:2px solid var(--blue);outline-offset:3px;border-radius:2px}
.jg-iconaction{display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;flex:none;color:var(--ink-2);background:var(--bg);border:1px solid var(--line);border-radius:var(--r-sm);cursor:pointer;transition:color var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out),background var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-spring)}
.jg-iconaction:hover{color:var(--blue);border-color:color-mix(in oklch,var(--blue) 40%,transparent);transform:translateY(-2px)}
.jg-iconaction:active{transform:translateY(0)}
.jg-iconaction:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
.jg-iconaction[aria-pressed="true"]{color:var(--red);border-color:color-mix(in oklch,var(--red) 45%,transparent);background:color-mix(in oklch,var(--red) 7%,var(--bg))}
.jg-iconaction[aria-pressed="true"] svg{fill:var(--red)}
.jg-eyebrow{display:inline-flex;align-items:center;gap:12px;font:600 var(--fs-eyebrow)/1 var(--font-body);text-transform:uppercase;letter-spacing:var(--ls-eyebrow)}
.jg-eyebrow .rule{width:24px;height:1px;background:currentColor;opacity:0.7}
.jg-h2{font-family:var(--font-display);font-weight:700;font-size:clamp(1.5rem,2.4vw,2rem);line-height:1.08;letter-spacing:-0.02em;color:var(--ink);margin:0}
.jg-h2-rule{height:1px;background:var(--line);margin:var(--space-4) 0 var(--space-6)}
.jg-block{padding-block:clamp(2.25rem,4vw,3.25rem);border-top:1px solid var(--line)}
.jg-block:first-child{border-top:0;padding-top:0}
/* GALERIE */
.jg-gal-wrap{position:relative}
.jg-gal{display:grid;grid-template-columns:1.5fr 1.5fr 1fr 1fr;grid-template-rows:repeat(2,1fr);gap:10px;height:clamp(380px,52vw,580px)}
.jg-gal-item{position:relative;overflow:hidden;border-radius:var(--r-xs);min-width:0;min-height:0;padding:0;border:0;cursor:pointer;background:linear-gradient(135deg,var(--blue-deep),var(--navy));display:block}
.jg-gal-item.hero{grid-column:1 / 3;grid-row:1 / 3}
.jg-gal-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.02);transition:transform var(--dur-reveal) var(--ease-spring);will-change:transform}
.jg-gal-item:hover .jg-gal-img{transform:scale(1.06)}
.jg-img-shade{position:absolute;inset:0;background:linear-gradient(to top,color-mix(in oklch,var(--navy) 55%,transparent) 0%,transparent 52%);pointer-events:none}
.jg-img-tint{position:absolute;inset:0;background:color-mix(in oklch,var(--navy) 14%,transparent);mix-blend-mode:multiply;pointer-events:none}
.jg-gal-item:focus-visible{outline:3px solid var(--blue);outline-offset:-3px}
.jg-gal-more-mark{position:absolute;right:10px;bottom:10px;display:flex;align-items:center;gap:7px;font:600 0.8125rem/1 var(--font-body);color:var(--bg);background:color-mix(in oklch,var(--navy) 62%,transparent);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);padding:9px 13px;border-radius:var(--r-pill);pointer-events:none}
.jg-tag{display:inline-flex;align-items:center;gap:7px;font:600 0.6875rem/1 var(--font-body);text-transform:uppercase;letter-spacing:0.09em;padding:8px 13px;border-radius:var(--r-pill);box-shadow:var(--shadow-sm)}
.jg-tag[data-status="forsale"]{background:var(--red);color:var(--bg)}
.jg-tag[data-status="sold"]{background:var(--navy);color:var(--bg)}
.jg-tag[data-status="new"]{background:var(--sky);color:var(--navy)}
.jg-tag .dot{width:6px;height:6px;border-radius:50%;background:currentColor}
.jg-gal-tag{position:absolute;top:16px;left:16px;z-index:3}
.jg-gal-actions{position:absolute;right:16px;bottom:16px;z-index:3;display:flex;gap:10px}
.jg-gal-btn{display:inline-flex;align-items:center;gap:9px;min-height:46px;font:600 0.875rem/1 var(--font-body);color:var(--ink);background:color-mix(in oklch,var(--bg) 88%,transparent);backdrop-filter:blur(10px) saturate(1.3);-webkit-backdrop-filter:blur(10px) saturate(1.3);border:1px solid color-mix(in oklch,var(--bg) 60%,transparent);border-radius:var(--r-sm);padding:0 18px;cursor:pointer;box-shadow:var(--shadow-sm);transition:transform var(--dur-base) var(--ease-spring),background var(--dur-base) var(--ease-out)}
.jg-gal-btn:hover{transform:translateY(-2px);background:var(--bg)}
.jg-gal-btn:active{transform:translateY(0)}
.jg-gal-btn:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
/* LIGHTBOX */
.jg-lb{position:fixed;inset:0;z-index:160;display:flex;flex-direction:column;background:color-mix(in oklch,var(--navy) 96%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);opacity:0;pointer-events:none;transition:opacity var(--dur-base) var(--ease-out)}
.jg-lb.is-open{opacity:1;pointer-events:auto}
.jg-lb-top{display:flex;align-items:center;justify-content:space-between;gap:var(--space-4);padding:clamp(1rem,2.5vw,1.5rem) clamp(1.25rem,4vw,2.5rem)}
.jg-lb-counter{font:500 0.9375rem/1 var(--font-body);letter-spacing:0.06em;color:color-mix(in oklch,var(--bg) 86%,transparent)}
.jg-lb-counter b{color:var(--bg);font-weight:600}
.jg-lb-close{display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;color:var(--bg);background:color-mix(in oklch,var(--bg) 10%,transparent);border:1px solid color-mix(in oklch,var(--bg) 22%,transparent);border-radius:var(--r-pill);cursor:pointer;transition:background var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-spring)}
.jg-lb-close:hover{background:color-mix(in oklch,var(--bg) 18%,transparent);transform:rotate(90deg)}
.jg-lb-close:focus-visible{outline:2px solid var(--sky);outline-offset:2px}
.jg-lb-stage{flex:1;display:flex;align-items:center;justify-content:center;gap:clamp(0.5rem,2vw,1.5rem);padding:0 clamp(0.75rem,3vw,2rem);min-height:0}
.jg-lb-arrow{display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;flex:none;color:var(--bg);background:color-mix(in oklch,var(--bg) 10%,transparent);border:1px solid color-mix(in oklch,var(--bg) 22%,transparent);border-radius:var(--r-pill);cursor:pointer;transition:background var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-spring)}
.jg-lb-arrow:hover{background:color-mix(in oklch,var(--bg) 18%,transparent);transform:scale(1.06)}
.jg-lb-arrow:active{transform:scale(0.97)}
.jg-lb-arrow:focus-visible{outline:2px solid var(--sky);outline-offset:2px}
.jg-lb-figure{position:relative;flex:1;max-width:min(1100px,100%);height:100%;display:flex;align-items:center;justify-content:center;margin:0}
.jg-lb-imgwrap{position:relative;max-width:100%;max-height:100%;border-radius:var(--r-xs);overflow:hidden;box-shadow:var(--shadow-lg)}
.jg-lb-img{display:block;max-width:100%;max-height:72vh;object-fit:contain;transition:opacity var(--dur-base) var(--ease-out)}
.jg-lb-cap{position:absolute;left:0;right:0;bottom:0;padding:18px 16px 12px;font:500 0.8125rem/1.3 var(--font-body);color:var(--bg);background:linear-gradient(to top,color-mix(in oklch,var(--navy) 75%,transparent),transparent);pointer-events:none}
.jg-lb-thumbs{display:flex;gap:8px;overflow-x:auto;padding:clamp(0.75rem,2vw,1.25rem) clamp(1.25rem,4vw,2.5rem);scrollbar-width:thin}
.jg-lb-thumb{position:relative;flex:0 0 auto;width:88px;height:62px;border-radius:var(--r-xs);overflow:hidden;border:0;padding:0;cursor:pointer;opacity:0.5;outline-offset:2px;transition:opacity var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out)}
.jg-lb-thumb img{width:100%;height:100%;object-fit:cover}
.jg-lb-thumb:hover{opacity:0.85}
.jg-lb-thumb:focus-visible{outline:2px solid var(--sky)}
.jg-lb-thumb[aria-current="true"]{opacity:1;box-shadow:inset 0 -3px 0 var(--blue)}
/* EN-TÊTE */
.jg-head{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,4fr);grid-template-areas:"info prix";column-gap:clamp(2rem,5vw,4.5rem);row-gap:var(--space-6);align-items:start}
.jg-head-info{grid-area:info}
.jg-head-prix{grid-area:prix;align-self:stretch}
.jg-typebadge{display:inline-flex;align-items:center;gap:8px;font:600 0.8125rem/1 var(--font-body);letter-spacing:0.01em;color:var(--ink-2);background:var(--paper);border:1px solid var(--line);border-radius:var(--r-pill);padding:9px 16px}
.jg-quickstats{display:flex;flex-wrap:wrap;align-items:center;gap:0;margin-top:var(--space-6)}
.jg-qs{display:flex;align-items:center;gap:9px;padding:4px 0}
.jg-qs svg{flex:none;color:var(--ink-3)}
.jg-qs b{font:600 1rem/1 var(--font-body);color:var(--ink)}
.jg-qs span{font:400 0.9375rem/1 var(--font-body);color:var(--ink-2)}
.jg-qs-sep{width:1px;height:22px;background:var(--line);margin:0 clamp(0.85rem,1.6vw,1.35rem)}
.jg-price-aside{position:relative;background:var(--paper);border:1px solid var(--line);border-radius:var(--r-sm);box-shadow:var(--shadow-sm);padding:clamp(1.5rem,2.6vw,2rem)}
.jg-price{font-family:var(--font-accent);font-weight:700;font-size:clamp(2.25rem,3.4vw,3rem);line-height:1;letter-spacing:-0.02em;color:var(--ink)}
.jg-action-stack{display:flex;flex-direction:column;gap:var(--space-3);margin-top:var(--space-5)}
.jg-action-row{display:flex;gap:var(--space-3)}
/* CORPS */
.jg-body{display:grid;grid-template-columns:minmax(0,8fr) minmax(0,4fr);gap:clamp(2rem,4.5vw,3.75rem);align-items:start}
.jg-aside{position:sticky;top:var(--aside-top);display:flex;flex-direction:column;gap:var(--space-5)}
.jg-lead{font:400 var(--fs-lead)/1.6 var(--font-body);color:var(--ink-2);max-width:66ch;margin:0}
.jg-prose{font:400 var(--fs-body)/1.7 var(--font-body);color:var(--ink);max-width:66ch}
.jg-more{display:grid;grid-template-rows:0fr;transition:grid-template-rows var(--dur-slow) var(--ease-spring),opacity var(--dur-base) var(--ease-out);opacity:0}
.jg-more>div{overflow:hidden}
.jg-more.is-open{grid-template-rows:1fr;opacity:1}
.jg-kv{display:grid;grid-template-columns:1fr 1fr;column-gap:clamp(1.5rem,4vw,3rem)}
.jg-kv-row{display:flex;align-items:baseline;justify-content:space-between;gap:var(--space-5);padding:13px 0;border-bottom:1px solid var(--line)}
.jg-kv-k{font:600 0.75rem/1.3 var(--font-body);text-transform:uppercase;letter-spacing:0.05em;color:var(--ink-3);flex:none;max-width:52%}
.jg-kv-v{font:500 0.9375rem/1.4 var(--font-body);color:var(--ink);text-align:right}
.jg-tablewrap{overflow-x:auto;border:1px solid var(--line);border-radius:var(--r-sm);background:var(--paper)}
.jg-tablewrap:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
.jg-table{width:100%;min-width:540px;border-collapse:collapse;font:400 0.9375rem/1.4 var(--font-body)}
.jg-table thead th{text-align:left;font:600 0.6875rem/1 var(--font-body);text-transform:uppercase;letter-spacing:0.08em;color:var(--ink-3);padding:14px 18px;border-bottom:1px solid var(--line);white-space:nowrap}
.jg-table thead th:last-child,.jg-table td:last-child{text-align:left}
.jg-tgroup th{text-align:left;font:700 0.8125rem/1 var(--font-body);letter-spacing:0.02em;color:var(--ink);background:color-mix(in oklch,var(--ink) 4%,var(--paper));padding:11px 18px;border-bottom:1px solid var(--line)}
.jg-table tbody td{padding:13px 18px;color:var(--ink);border-bottom:1px solid var(--line-2);vertical-align:top}
.jg-table tbody td:first-child{font-weight:500}
.jg-table tr.jg-zeb td{background:color-mix(in oklch,var(--ink) 2.5%,transparent)}
.jg-table tbody tr:last-child td{border-bottom:0}
.jg-two{display:grid;grid-template-columns:1fr 1fr;gap:clamp(1.5rem,4vw,3rem)}
.jg-list{list-style:none;margin:var(--space-4) 0 0;padding:0;display:flex;flex-direction:column}
.jg-list li{position:relative;padding:11px 0 11px 22px;border-bottom:1px solid var(--line-2);font:400 0.9375rem/1.5 var(--font-body);color:var(--ink)}
.jg-list li::before{content:"";position:absolute;left:0;top:18px;width:6px;height:6px;border-radius:50%;background:var(--ink-3)}
.jg-list.excl li::before{width:9px;height:1px;border-radius:0;background-color:var(--ink-3);top:21px}
.jg-fin{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-5)}
.jg-fincard{background:var(--paper);border:1px solid var(--line);border-radius:var(--r-sm);box-shadow:var(--shadow-sm);padding:clamp(1.25rem,2vw,1.5rem)}
.jg-fincard h3{font:600 0.6875rem/1.2 var(--font-body);text-transform:uppercase;letter-spacing:0.09em;color:var(--ink-3);margin:0 0 var(--space-4)}
.jg-finrow{display:flex;align-items:baseline;justify-content:space-between;gap:var(--space-4);padding:9px 0;border-bottom:1px solid var(--line-2);font:400 0.9375rem/1.4 var(--font-body);color:var(--ink-2)}
.jg-finrow .v{color:var(--ink);font-weight:500;white-space:nowrap;font-variant-numeric:tabular-nums}
.jg-finrow.total{border-bottom:0;border-top:1px solid var(--line);margin-top:4px;padding-top:13px;color:var(--ink)}
.jg-finrow.total span:first-child{font-weight:600}
.jg-finrow.total .v{font-weight:600}
.jg-peryear{color:var(--ink-3);font-weight:400}
.jg-reno-row{display:grid;grid-template-columns:auto 1fr;gap:var(--space-5);align-items:baseline;padding:14px 0;border-bottom:1px solid var(--line)}
.jg-reno-row:last-child{border-bottom:0}
.jg-reno-y{font:600 1.0625rem/1 var(--font-body);color:var(--ink);font-variant-numeric:tabular-nums}
.jg-reno-d{font:400 0.9375rem/1.5 var(--font-body);color:var(--ink-2)}
.jg-map{position:relative;aspect-ratio:16/9;max-height:340px;border-radius:var(--r-sm);border:1px solid var(--line);overflow:hidden;background:var(--paper);background-image:repeating-linear-gradient(0deg,transparent 0 31px,color-mix(in oklch,var(--ink) 5%,transparent) 31px 32px),repeating-linear-gradient(90deg,transparent 0 31px,color-mix(in oklch,var(--ink) 5%,transparent) 31px 32px)}
.jg-map .road{position:absolute;background:color-mix(in oklch,var(--ink) 9%,transparent)}
.jg-map .pin{position:absolute;left:46%;top:42%;width:18px;height:18px;border-radius:50% 50% 50% 0;background:var(--red);transform:rotate(-45deg);box-shadow:0 6px 14px rgba(170,17,32,0.35)}
.jg-map .pin::after{content:"";position:absolute;left:5px;top:5px;width:8px;height:8px;border-radius:50%;background:var(--paper)}
.jg-map .legend{position:absolute;left:16px;bottom:14px;font:500 0.75rem/1 var(--font-body);letter-spacing:0.03em;color:var(--ink-3)}
.jg-openhouse{background:var(--paper);border:1px solid var(--line);border-radius:var(--r-sm);box-shadow:var(--shadow-sm);padding:clamp(1.5rem,3vw,2.25rem);display:grid;grid-template-columns:auto 1fr auto;gap:clamp(1rem,2.5vw,2rem);align-items:center}
.jg-oh-cal{display:flex;flex-direction:column;align-items:center;justify-content:center;width:62px;height:64px;flex:none;border:1px solid var(--line);border-radius:var(--r-sm);background:var(--bg);color:var(--ink)}
.jg-oh-cal .m{font:600 0.625rem/1 var(--font-body);text-transform:uppercase;letter-spacing:0.08em;color:var(--blue);margin-bottom:3px}
.jg-oh-cal .d{font-family:var(--font-display);font-weight:700;font-size:1.4rem;line-height:1}
.jg-broker{background:var(--paper);border:1px solid var(--line);border-radius:var(--r-sm);box-shadow:var(--shadow-sm);padding:clamp(1.35rem,2.2vw,1.75rem)}
.jg-broker-top{display:flex;align-items:center;gap:var(--space-4)}
.jg-broker-pic{position:relative;width:74px;height:74px;flex:none;border-radius:var(--r-pill);overflow:hidden;box-shadow:var(--shadow-sm)}
.jg-broker-pic img{width:100%;height:100%;object-fit:cover;object-position:50% 18%}
.jg-broker-pic .t{position:absolute;inset:0;background:linear-gradient(150deg,transparent 55%,color-mix(in oklch,var(--navy) 22%,transparent));mix-blend-mode:multiply}
.jg-broker-name{font-family:var(--font-accent);font-weight:600;font-size:1.4rem;line-height:1.05;letter-spacing:-0.01em;color:var(--ink)}
.jg-broker-role{margin-top:4px;font:500 0.8125rem/1.35 var(--font-body);color:var(--ink-3)}
.jg-broker-phone{display:inline-flex;align-items:center;gap:9px;margin-top:var(--space-5);font:600 1.0625rem/1 var(--font-body);color:var(--blue);text-decoration:none;border-bottom:1px solid transparent;padding-bottom:2px;transition:border-color var(--dur-base) var(--ease-out)}
.jg-broker-phone:hover{border-bottom-color:color-mix(in oklch,var(--blue) 45%,transparent)}
.jg-broker-phone:focus-visible{outline:2px solid var(--blue);outline-offset:3px;border-radius:2px}
.jg-broker-foot{display:flex;align-items:center;justify-content:space-between;gap:var(--space-4);margin-top:var(--space-5);padding-top:var(--space-5);border-top:1px solid var(--line)}
.jg-panel{background:var(--paper);border:1px solid var(--line);border-radius:var(--r-sm);box-shadow:var(--shadow-sm);padding:clamp(1.35rem,2.2vw,1.75rem)}
.jg-panel-h{font-family:var(--font-display);font-weight:700;font-size:1.2rem;line-height:1.12;letter-spacing:-0.01em;color:var(--ink);margin:0}
.jg-field{display:flex;flex-direction:column;gap:7px;margin-top:var(--space-4)}
.jg-flabel{font:600 0.75rem/1 var(--font-body);text-transform:uppercase;letter-spacing:0.06em;color:var(--ink-3)}
.jg-input,.jg-textarea{font:400 0.9375rem/1.4 var(--font-body);color:var(--ink);background:var(--white);border:1px solid var(--line);border-radius:var(--r-sm);padding:12px 14px;width:100%;transition:border-color var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out)}
.jg-input::placeholder,.jg-textarea::placeholder{color:var(--ink-3)}
.jg-input:hover,.jg-textarea:hover{border-color:color-mix(in oklch,var(--ink) 22%,transparent)}
.jg-input:focus-visible,.jg-textarea:focus-visible{outline:2px solid var(--blue);outline-offset:2px;border-color:var(--blue)}
.jg-textarea{resize:vertical;min-height:92px}
.jg-remind{margin-top:var(--space-4);font:500 0.75rem/1.45 var(--font-body);color:var(--ink-3);background:color-mix(in oklch,var(--blue) 5%,var(--bg));border:1px solid color-mix(in oklch,var(--blue) 16%,transparent);border-radius:var(--r-sm);padding:10px 13px}
.jg-consent{display:flex;align-items:flex-start;gap:10px;margin-top:var(--space-4);cursor:pointer}
.jg-consent input{flex:none;width:20px;height:20px;margin-top:1px;accent-color:var(--blue);cursor:pointer}
.jg-consent input:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
.jg-consent span{font:400 0.8125rem/1.45 var(--font-body);color:var(--ink-2)}
.jg-calc-out{margin-top:var(--space-5);padding:var(--space-5);border-radius:var(--r-sm);background:color-mix(in oklch,var(--blue) 5%,var(--bg));border:1px solid color-mix(in oklch,var(--blue) 14%,transparent)}
.jg-calc-out .lbl{font:600 0.6875rem/1 var(--font-body);text-transform:uppercase;letter-spacing:0.08em;color:var(--ink-3)}
.jg-calc-amt{font-family:var(--font-accent);font-weight:700;font-size:clamp(1.9rem,3vw,2.35rem);line-height:1;letter-spacing:-0.02em;color:var(--ink);margin-top:8px;transition:opacity var(--dur-base) var(--ease-out)}
.jg-calc-amt .per{font-family:var(--font-body);font-weight:500;font-size:0.9375rem;color:var(--ink-3);letter-spacing:0}
.jg-range{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:var(--r-pill);background:var(--line);outline:none;cursor:pointer;margin:4px 0}
.jg-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:22px;height:22px;border-radius:50%;background:var(--blue);border:3px solid var(--white);box-shadow:var(--shadow-sm);cursor:pointer}
.jg-range::-moz-range-thumb{width:22px;height:22px;border-radius:50%;background:var(--blue);border:3px solid var(--white);box-shadow:var(--shadow-sm);cursor:pointer}
.jg-range:focus-visible{outline:2px solid var(--blue);outline-offset:6px;border-radius:var(--r-pill)}
.jg-select{appearance:none;-webkit-appearance:none;font:500 0.9375rem/1 var(--font-body);color:var(--ink);background-color:var(--white);border:1px solid var(--line);border-radius:var(--r-sm);padding:12px 38px 12px 14px;cursor:pointer;width:100%;background-repeat:no-repeat;background-position:right 13px center;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%230043FF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");transition:border-color var(--dur-base) var(--ease-out)}
.jg-select:hover{border-color:color-mix(in oklch,var(--ink) 22%,transparent)}
.jg-select:focus-visible{outline:2px solid var(--blue);outline-offset:2px;border-color:var(--blue)}
.jg-mobilebar{display:none;position:fixed;left:0;right:0;bottom:0;z-index:90;align-items:center;justify-content:space-between;gap:var(--space-4);padding:12px clamp(1rem,4vw,1.5rem);padding-bottom:calc(12px + env(safe-area-inset-bottom));background:color-mix(in oklch,var(--bg) 90%,transparent);backdrop-filter:blur(14px) saturate(1.3);-webkit-backdrop-filter:blur(14px) saturate(1.3);border-top:1px solid var(--line);box-shadow:var(--shadow-md)}
.jg-mobilebar .mb-price{font-family:var(--font-accent);font-weight:700;font-size:1.3rem;line-height:1;letter-spacing:-0.02em;color:var(--ink)}
.jg-mobilebar .mb-price small{display:block;font-family:var(--font-body);font-weight:500;font-size:0.625rem;letter-spacing:0.06em;text-transform:uppercase;color:var(--ink-3);margin-bottom:3px}
.jg-mobilebar .mb-actions{display:flex;align-items:center;gap:10px}
.jg-mb-visit{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 18px;font:600 0.9375rem/1 var(--font-body);color:var(--bg);background:var(--red);border:0;border-radius:var(--r-sm);text-decoration:none;box-shadow:var(--shadow-sm);transition:background var(--dur-base) var(--ease-out)}
.jg-mb-visit:hover{background:var(--red-deep)}
.jg-mb-visit:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
.jg-mb-phone{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;flex:none;color:var(--blue);background:var(--paper);border:1px solid var(--line);border-radius:var(--r-sm);transition:border-color var(--dur-base) var(--ease-out)}
.jg-mb-phone:hover{border-color:color-mix(in oklch,var(--blue) 40%,transparent)}
.jg-mb-phone:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
.jg-prop-grid{display:grid;grid-template-columns:repeat(3,1fr);column-gap:clamp(1.25rem,4vw,2.5rem);row-gap:clamp(2rem,4vw,3rem)}
.jg-cardwrap{position:relative}
.jg-cardwrap::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--red);transform:scaleX(0);transform-origin:left;transition:transform var(--dur-base) var(--ease-out);border-radius:0 0 var(--r-sm) var(--r-sm);pointer-events:none}
.jg-cardwrap:hover::after{transform:scaleX(1)}
.jg-card{display:flex;flex-direction:column;background:var(--paper);border:1px solid var(--line);border-radius:var(--r-sm);box-shadow:var(--shadow-sm);overflow:hidden;text-decoration:none;color:var(--ink);transition:transform var(--dur-base) var(--ease-spring),box-shadow var(--dur-base) var(--ease-out)}
.jg-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-hover)}
.jg-card:active{transform:translateY(-2px)}
.jg-card:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
.jg-card-media{position:relative;aspect-ratio:4/3;overflow:hidden;background:linear-gradient(135deg,var(--blue-deep),var(--navy))}
.jg-card-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.01);transition:transform var(--dur-reveal) var(--ease-spring);will-change:transform}
.jg-card:hover .jg-card-img{transform:scale(1.05)}
.jg-card-tag{position:absolute;top:12px;left:12px}
.jg-card-price{padding:var(--space-5) var(--space-5) 0;font-family:var(--font-accent);font-weight:700;font-size:clamp(1.25rem,2vw,1.6rem);letter-spacing:-0.02em;color:var(--ink);line-height:1.1}
.jg-card-addr{padding:6px var(--space-5) 0}
.jg-card-address{font:600 0.9375rem/1.35 var(--font-body);color:var(--ink)}
.jg-card-city{margin-top:3px;font:500 0.8125rem/1.3 var(--font-body);color:var(--ink-3)}
.jg-card-foot{margin:var(--space-4) var(--space-5) var(--space-5);padding-top:var(--space-4);border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;gap:var(--space-4)}
.jg-card-meta{font:500 0.8125rem/1.3 var(--font-body);color:var(--ink-2)}
.jg-card-cta{display:inline-flex;align-items:center;gap:6px;color:var(--blue);font:600 0.8125rem/1 var(--font-body);white-space:nowrap;transition:gap var(--dur-base) var(--ease-out)}
.jg-cardwrap:hover .jg-card-cta{gap:9px}
@media (max-width:1200px){.jg-nav-desktop{display:none!important}.jg-burger{display:inline-flex!important}}
@media (max-width:980px){
  .jg-body{grid-template-columns:1fr!important}
  .jg-aside{position:static!important;top:auto!important}
  .jg-head{grid-template-columns:1fr;grid-template-areas:"info" "prix"}
  .jg-fin{grid-template-columns:1fr!important}
  .jg-foot-grid{grid-template-columns:1fr 1fr!important}
  .jg-cta-grid{grid-template-columns:1fr!important}
  main{padding-bottom:84px}
  .jg-mobilebar{display:flex}
}
@media (max-width:760px){
  .jg-head{grid-template-columns:1fr;grid-template-areas:"info" "prix"}
  .jg-kv{grid-template-columns:1fr}
  .jg-two{grid-template-columns:1fr}
  .jg-openhouse{grid-template-columns:1fr;text-align:left}
  .jg-prop-grid{grid-template-columns:1fr}
  .jg-foot-grid{grid-template-columns:1fr!important}
  .jg-gal{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;height:auto;gap:10px;-webkit-overflow-scrolling:touch;scroll-padding:0 var(--gutter)}
  .jg-gal-item{flex:0 0 86%;scroll-snap-align:center;aspect-ratio:4/3;height:auto}
  .jg-gal-item.hero{flex:0 0 92%}
  .jg-gal-actions{position:static;display:flex;margin-top:12px;padding:0}
  .jg-gal-tag{top:12px;left:12px}
}
@media (min-width:761px) and (max-width:980px){.jg-prop-grid{grid-template-columns:repeat(2,1fr)}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.jg-gal-img,.jg-card-img{transition:none!important}}
`.trim();
