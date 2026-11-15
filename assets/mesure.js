/*
 * Mesure des demandes venues de Google Ads : juliegauthier.immo
 *
 * - La balise Google (gtag.js) se charge seulement après l'accord de la personne
 *   pour la catégorie « publicite » (voir /assets/confidentialite.js, Loi 25).
 * - Conversions Google Ads (compte 397-645-7297) :
 *     · Formulaire envoyé avec succès  → « JG | Formulaire site (lead) »
 *     · Clic sur un lien tel:          → « JG | Clic téléphone (site) »
 * - Les formulaires appellent window.jgLead() quand Formspree répond OK.
 *   jgLead envoie la conversion puis mène à /merci.html.
 *
 * Ce fichier doit être chargé APRÈS /assets/confidentialite.js (les deux en defer).
 */
(function () {
  "use strict";

  var AW = "AW-18487268757";
  var LEAD = AW + "/8mPaCMSzuLgdEJWrte9E";
  var APPEL = AW + "/_LzJCMezuLgdEJWrte9E";
  var MERCI = "/merci.html";

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });

  var charge = false;

  function permis() {
    var c = window.jgConfidentialite;
    return !!(c && c.permis("publicite"));
  }

  function charger() {
    if (charge || !permis()) return;
    charge = true;
    gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "denied",
    });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + AW;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", AW);
  }

  // Formulaire envoyé : conversion, puis page merci (même si Google ne répond pas).
  window.jgLead = function () {
    var parti = false;
    function suite() {
      if (parti) return;
      parti = true;
      window.location.href = MERCI;
    }
    if (charge) {
      gtag("event", "conversion", { send_to: LEAD, value: 1.0, currency: "CAD", event_callback: suite });
      setTimeout(suite, 1200);
    } else {
      suite();
    }
  };

  // Clic sur un numéro de téléphone (délégation : couvre toutes les pages et les fiches).
  document.addEventListener(
    "click",
    function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href^="tel:"]') : null;
      if (!a || !charge) return;
      gtag("event", "conversion", { send_to: APPEL, value: 1.0, currency: "CAD" });
    },
    true,
  );

  // Choix fait dans le bandeau pendant la visite.
  document.addEventListener("jg-consentement", charger);
  charger();
})();
