/*
 * Préférences de confidentialité (Loi 25) : juliegauthier.immo
 *
 * - Aucun témoin : le choix est gardé dans localStorage (clé « jg-confidentialite »).
 * - Accepter et Refuser ont le même poids. « Personnaliser » détaille les catégories.
 * - Mesure d'audience (Vercel Web Analytics, anonyme, sans témoin) : active tant que la
 *   personne ne la refuse pas ; un refus bloque l'envoi des pages vues (beforeSend).
 * - Publicité et réseaux sociaux : aucun outil actif. Tout futur pixel doit vérifier
 *   window.jgConfidentialite.permis("publicite") avant de se charger (désactivé par défaut).
 * - Lien « Préférences de confidentialité » ajouté au pied de chaque page.
 *
 * Ce fichier doit être chargé AVANT /_vercel/insights/script.js (les deux en defer).
 */
(function () {
  "use strict";

  var CLE = "jg-confidentialite";
  var VERSION = 1;

  function lire() {
    try {
      var v = JSON.parse(localStorage.getItem(CLE) || "null");
      return v && v.version === VERSION ? v : null;
    } catch (e) {
      return null;
    }
  }

  function ecrire(choix) {
    var v = { version: VERSION, mesure: !!choix.mesure, publicite: false, date: new Date().toISOString() };
    try {
      localStorage.setItem(CLE, JSON.stringify(v));
    } catch (e) {}
    etat = v;
    return v;
  }

  var etat = lire();

  // Mesure d'audience : coupée si la personne l'a refusée.
  window.va =
    window.va ||
    function () {
      (window.vaq = window.vaq || []).push(arguments);
    };
  window.va("beforeSend", function (evenement) {
    return etat && etat.mesure === false ? null : evenement;
  });

  window.jgConfidentialite = {
    permis: function (categorie) {
      if (categorie === "mesure") return !(etat && etat.mesure === false);
      if (categorie === "publicite") return !!(etat && etat.publicite);
      return categorie === "essentiels";
    },
    ouvrir: function () {
      afficher(true);
    },
  };

  /* ── Interface ─────────────────────────────────────────────────────────── */

  var CSS =
    ".jgc{position:fixed;left:16px;bottom:16px;z-index:9999;width:min(440px,calc(100vw - 32px));" +
    "background:var(--navy,#000E35);color:var(--bg,#F7F5EE);border-radius:var(--r-md,14px);" +
    "border:1px solid color-mix(in oklch,var(--bg,#F7F5EE) 14%,transparent);" +
    "box-shadow:0 2px 6px rgb(0 14 53/.18),0 18px 48px rgb(0 14 53/.28);" +
    "font-family:var(--font-body,Inter,'Helvetica Neue',Arial,sans-serif);font-size:.9375rem;line-height:1.55;" +
    "padding:22px 22px 20px;opacity:0;transform:translateY(12px);transition:opacity .4s cubic-bezier(.16,1,.3,1),transform .4s cubic-bezier(.16,1,.3,1)}" +
    ".jgc.jgc--on{opacity:1;transform:none}" +
    ".jgc h2{font-family:var(--font-display,Archivo,'Helvetica Neue',Arial,sans-serif);font-weight:700;font-size:1.0625rem;" +
    "letter-spacing:-.01em;margin:0 0 8px;color:var(--bg,#F7F5EE)}" +
    ".jgc p{margin:0 0 16px;color:color-mix(in oklch,var(--bg,#F7F5EE) 82%,transparent)}" +
    ".jgc a{color:var(--sky,#A3D4F2);text-underline-offset:3px}" +
    ".jgc-actions{display:flex;flex-wrap:wrap;gap:8px}" +
    ".jgc-btn{flex:1 1 120px;min-height:44px;padding:0 16px;border-radius:var(--r-sm,8px);font:inherit;font-weight:600;" +
    "font-size:.875rem;cursor:pointer;border:1px solid color-mix(in oklch,var(--bg,#F7F5EE) 40%,transparent);" +
    "background:transparent;color:var(--bg,#F7F5EE);transition:background-color .2s,color .2s,border-color .2s}" +
    ".jgc-btn:hover{background:color-mix(in oklch,var(--bg,#F7F5EE) 12%,transparent)}" +
    ".jgc-btn--plein{background:var(--bg,#F7F5EE);color:var(--navy,#000E35);border-color:var(--bg,#F7F5EE)}" +
    ".jgc-btn--plein:hover{background:var(--sky,#A3D4F2);border-color:var(--sky,#A3D4F2)}" +
    ".jgc-btn--lien{flex:0 0 auto;border:0;padding:0 4px;font-weight:500;text-decoration:underline;text-underline-offset:3px}" +
    ".jgc-btn--lien:hover{background:transparent;color:var(--sky,#A3D4F2)}" +
    ".jgc :focus-visible{outline:2px solid var(--sky,#A3D4F2);outline-offset:2px}" +
    ".jgc-cats{list-style:none;margin:0 0 16px;padding:0;border-top:1px solid color-mix(in oklch,var(--bg,#F7F5EE) 14%,transparent)}" +
    ".jgc-cat{display:grid;grid-template-columns:1fr auto;gap:4px 16px;align-items:center;padding:12px 0;" +
    "border-bottom:1px solid color-mix(in oklch,var(--bg,#F7F5EE) 14%,transparent)}" +
    ".jgc-cat strong{font-weight:600}" +
    ".jgc-cat span{grid-column:1/-1;font-size:.8125rem;color:color-mix(in oklch,var(--bg,#F7F5EE) 70%,transparent)}" +
    ".jgc-etat{font-size:.8125rem;color:var(--sky,#A3D4F2)}" +
    ".jgc-switch{position:relative;width:44px;height:26px;border-radius:999px;border:0;cursor:pointer;" +
    "background:color-mix(in oklch,var(--bg,#F7F5EE) 25%,transparent);transition:background-color .2s}" +
    ".jgc-switch::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;" +
    "background:var(--bg,#F7F5EE);transition:transform .2s cubic-bezier(.16,1,.3,1)}" +
    ".jgc-switch[aria-checked=true]{background:var(--blue,#0043FF)}" +
    ".jgc-switch[aria-checked=true]::after{transform:translateX(18px)}" +
    ".jgc-pied{background:none;border:0;padding:0;font:inherit;color:inherit;cursor:pointer;" +
    "text-decoration:underline;text-underline-offset:3px;min-height:24px}" +
    ".jgc-pied:hover{color:var(--sky,#A3D4F2)}" +
    ".jgc-pied-groupe{display:inline-flex;flex-wrap:wrap;align-items:center;gap:8px}" +
    ".jgc-pied-zone{text-align:center;padding:12px 16px 0;font-size:.8125rem}" +
    "@media (prefers-reduced-motion:reduce){.jgc,.jgc-switch,.jgc-switch::after{transition:none}}";

  var boite = null;

  function el(tag, attrs, enfants) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === "texte") n.textContent = attrs[k];
      else if (k.indexOf("on") === 0) n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    }
    (enfants || []).forEach(function (c) {
      if (c) n.appendChild(c);
    });
    return n;
  }

  function fermer() {
    if (!boite) return;
    var b = boite;
    boite = null;
    b.classList.remove("jgc--on");
    setTimeout(function () {
      b.remove();
    }, 400);
  }

  function decider(mesure) {
    ecrire({ mesure: mesure });
    fermer();
  }

  function afficher(detail) {
    if (boite) fermer();
    var mesure = !(etat && etat.mesure === false);

    var interrupteur = el("button", {
      class: "jgc-switch",
      type: "button",
      role: "switch",
      "aria-checked": String(mesure),
      "aria-label": "Mesure d'audience anonyme",
      onclick: function () {
        mesure = !mesure;
        interrupteur.setAttribute("aria-checked", String(mesure));
      },
    });

    var corps = detail
      ? [
          el("h2", { id: "jgc-titre", texte: "Préférences de confidentialité" }),
          el("ul", { class: "jgc-cats" }, [
            el("li", { class: "jgc-cat" }, [
              el("strong", { texte: "Essentiels" }),
              el("em", { class: "jgc-etat", texte: "Toujours actifs" }),
              el("span", { texte: "Fonctionnement du site et mémorisation de ce choix dans votre navigateur. Aucun témoin." }),
            ]),
            el("li", { class: "jgc-cat" }, [
              el("strong", { texte: "Mesure d'audience anonyme" }),
              interrupteur,
              el("span", {
                texte:
                  "Vercel Web Analytics compte les pages vues sans témoin ni adresse IP conservée. Statistiques agrégées, traitées hors Québec.",
              }),
            ]),
            el("li", { class: "jgc-cat" }, [
              el("strong", { texte: "Publicité et réseaux sociaux" }),
              el("em", { class: "jgc-etat", texte: "Aucun outil actif" }),
              el("span", { texte: "Ce site n'utilise aucun pixel publicitaire. Si cela change, votre accord sera demandé avant." }),
            ]),
          ]),
          el("div", { class: "jgc-actions" }, [
            el("button", { class: "jgc-btn jgc-btn--plein", type: "button", texte: "Enregistrer mes choix", onclick: function () { decider(mesure); } }),
          ]),
        ]
      : [
          el("h2", { id: "jgc-titre", texte: "Votre vie privée" }),
          el("p", {}, [
            document.createTextNode(
              "Ce site ne dépose aucun témoin. Une mesure d'audience anonyme nous aide à l'améliorer ; vous pouvez la refuser. ",
            ),
            el("a", { href: "/politique-de-confidentialite.html", texte: "Politique de confidentialité" }),
          ]),
          el("div", { class: "jgc-actions" }, [
            el("button", { class: "jgc-btn jgc-btn--plein", type: "button", texte: "Accepter", onclick: function () { decider(true); } }),
            el("button", { class: "jgc-btn", type: "button", texte: "Refuser", onclick: function () { decider(false); } }),
            el("button", { class: "jgc-btn jgc-btn--lien", type: "button", texte: "Personnaliser", onclick: function () { afficher(true); } }),
          ]),
        ];

    boite = el("section", { class: "jgc", role: "dialog", "aria-modal": "false", "aria-labelledby": "jgc-titre" }, corps);
    document.body.appendChild(boite);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (boite) boite.classList.add("jgc--on");
      });
    });
    if (detail) {
      var premier = boite.querySelector("button");
      if (premier) premier.focus({ preventScroll: true });
    }
  }

  function lienPied() {
    var pied = document.querySelector("footer");
    if (!pied || pied.querySelector(".jgc-pied")) return;
    var bouton = el("button", { class: "jgc-pied", type: "button", texte: "Préférences de confidentialité", onclick: function () { afficher(true); } });
    // À côté du lien « Politique de confidentialité » s'il existe, sinon en bas du pied de page.
    var politique = pied.querySelector('a[href*="politique-de-confidentialite"]');
    if (politique) {
      // Un seul bloc : le pied de page aligne ses enfants en ligne (flex), il ne faut pas en ajouter.
      var groupe = el("span", { class: "jgc-pied-groupe" });
      politique.replaceWith(groupe);
      groupe.appendChild(politique);
      groupe.appendChild(el("span", { "aria-hidden": "true", texte: "·" }));
      groupe.appendChild(bouton);
      return;
    }
    pied.appendChild(el("div", { class: "jgc-pied-zone" }, [bouton]));
  }

  function demarrer() {
    document.head.appendChild(el("style", { texte: CSS }));
    lienPied();
    if (!etat) afficher(false);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && boite && etat) fermer();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
