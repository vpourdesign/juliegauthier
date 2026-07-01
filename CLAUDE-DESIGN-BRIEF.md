# Brief Claude Design — Julie Gauthier · RE/MAX Crystal

Tout ce qu'il faut coller dans **Claude Design** pour générer le plus beau design system.
Copie le bloc « Company name » et le bloc « Blurb », puis colle les inputs complémentaires
(palette, polices, vibe) si l'outil les demande.

---

## 1) Company name (champ « nom »)

```
Julie Gauthier — Courtier immobilier agréé · RE/MAX Crystal
```

Version courte (si le champ est limité) :
```
Julie Gauthier Immobilier — RE/MAX Crystal
```

---

## 2) Blurb (champ « description ») — FR 🇫🇷 (à privilégier, le site est en français)

```
Julie Gauthier est courtière immobilière agréée chez RE/MAX Crystal, au service des
acheteurs et vendeurs de la grande région de Montréal. Son site est une vitrine
immobilière haut de gamme : calme, éditoriale et raffinée, jamais tape-à-l'œil.
Beaucoup d'espace, de grandes photographies de propriétés, une typographie soignée,
et les couleurs RE/MAX — rouge vif, bleu profond et fond crème chaud — utilisées avec
retenue, comme des accents plutôt qu'en grands aplats. L'expérience doit inspirer la
confiance et le prestige d'une maison de courtage de premier plan, tout en restant
chaleureuse, humaine et locale. On y présente Julie, ses services d'achat et de vente,
ses propriétés inscrites, des témoignages de clients, et une prise de contact simple
au 514.895.4921. Ton : professionnel, chaleureux, en français québécois (vouvoiement).
```

### Blurb — EN 🇬🇧 (si Claude Design préfère un prompt en anglais)

```
Julie Gauthier is a licensed real-estate broker with RE/MAX Crystal, serving buyers and
sellers across Greater Montreal (French-speaking, Quebec). Her website is a high-end,
calm, editorial real-estate showcase — never flashy. Generous whitespace, large property
photography, refined typography, and the RE/MAX colors (vivid red, deep blue, warm cream)
used sparingly as accents rather than big color blocks. It should feel like a prestigious
brokerage: trustworthy and premium, yet warm, human and local. Sections: an introduction
to Julie, her buying and selling services, her property listings, client testimonials, and
a simple way to get in touch (514.895.4921). Tone: professional, warm, French (Québec).
```

---

## 3) Inputs complémentaires (à coller si demandé)

**Catégorie / industrie**
Immobilier résidentiel haut de gamme · courtage · marque personnelle d'un agent RE/MAX.

**Vibe / mots-clés**
premium calme · luxe immobilier · éditorial · chaleureux · épuré · confiance · crème + accents RE/MAX · espace généreux · photographie en grand.

**Palette de couleurs (hex officiels RE/MAX 2025 — ne pas ajouter d'autres couleurs)**
- Fond crème (dominant) : `#F7F5EE`
- Surface chaude : `#FCFBF7`
- Texte charbon (pas de noir pur) : `#1A1A1C`
- Texte secondaire : `#474C57`
- Bleu interactif (liens, états) : `#0043FF`
- Bleu profond (sombre/survol) : `#0C2749`
- Bleu nuit (pied de page, scrim) : `#000E35`
- Rouge signature (CTA, étincelle) : `#FF1200`
- Rouge profond (survol CTA) : `#AA1120`
- Bleu ciel (fonds doux, tags) : `#A3D4F2`

> Répartition : ~90 % crème + charbon, le rouge/bleu seulement en accents (CTA, tags,
> filets, icônes). Sections sombres en bleu nuit `#000E35` avec texte crème.

**Polices**
- Titres / display : **Archivo** (grotesque architectural ; équivalents : Aktiv Grotesk, Helvetica Now).
- Corps / interface : **Inter** (neutre, premium ; rôle Akzidenz/Arial du brandbook).
- Accent serif optionnel : **Fraunces** (nom, citations, grands chiffres) — peut être désactivé.

**Forme & profondeur**
Arrondis discrets (images 2–4px, cartes/boutons 8px, tags en pilule). Filets hairline 1px.
Ombres légères, en couches, teintées bleu. Le calme passe par l'espace, pas par l'ombre.

**Ton de voix**
Français québécois, vouvoiement, professionnel et chaleureux. Phrases courtes et concrètes.
On vend la confiance et l'accompagnement, pas le superlatif.

**Sections / pages (one-page)**
Héro · À propos de Julie · Services (Vendre / Acheter / Évaluation / Accompagnement) ·
Propriétés (inscriptions) · Chiffres-clés · Témoignages · Contact (514.895.4921) · Pied de page.

**À éviter (anti-slop)**
Noir/blanc purs · texte en dégradé · bleu/indigo Tailwind générique · ombres plates ·
glassmorphisme par défaut · grilles de cartes identiques · recolorer le ballon RE/MAX ·
rouge+bleu en grands aplats partout · tirets cadratins dans la copie.

**Logos (fournis dans `brand_assets/`)**
Ballon RE/MAX 4 couleurs + « REMAX CRYSTAL » (versions noire pour fonds clairs, blanche pour
fonds sombres). Ballon toujours en couleur, jamais recoloré ni dans une boîte.

---

## 4) Notes / à confirmer avec Julie

- **Territoire précis** (indicatif 514 = Montréal ; secteur exact à confirmer pour la copie et la table Centris `CP_CITY`).
- **Titre** : « Courtier immobilier agréé » (tel que sur `brand.png`) ou variante féminine « Courtière immobilière agréée ».
- **Chiffres-clés** (propriétés vendues, années d'expérience) : placeholders en attendant les vrais.
- **Courriel + réseaux sociaux** + URL de prise de rendez-vous (Centris/Google Calendar) à fournir.
