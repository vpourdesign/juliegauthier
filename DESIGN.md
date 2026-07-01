# DESIGN.md — Julie Gauthier · Courtier immobilier agréé · RE/MAX Crystal

> Système de design du site de Julie Gauthier. À lire **en premier** avant tout code.
> Direction : **premium calme / luxe immobilier**. Palette, typo et logos **RE/MAX 2025**
> (réf. `brand_assets/remax-brandbook.pdf`, p.11 couleurs). Les `brand_assets/` priment
> toujours sur toute référence empruntée.

---

## Brand & voice

**Qui :** Julie Gauthier, courtière immobilière agréée chez **RE/MAX Crystal**, au service
des acheteurs et vendeurs du **Grand Montréal** (indicatif 514 — territoire précis à
confirmer). Clientèle résidentielle, achat et vente.

**Le sentiment en 3 mots : _calme · raffiné · digne de confiance._**
Une vitrine immobilière haut de gamme, jamais tape-à-l'œil. L'autorité de la marque
RE/MAX, exprimée avec la retenue d'une maison de prestige — beaucoup d'espace, de
grandes photographies, une couleur dosée au compte-gouttes.

**Voix (copie) :** français québécois, **vouvoiement**, professionnel et chaleureux.
Phrases courtes, concrètes, humaines. On vend de la **confiance et de l'accompagnement**,
pas du superlatif. Pas d'anglicismes inutiles. « RE/MAX » peut s'écrire avec ou sans la
barre oblique ; le bureau est **RE/MAX Crystal**.

Pistes de signature / accroche (à valider) :
- « L'immobilier, mené avec rigueur et chaleur. »
- « Vendre et acheter, sereinement, dans le Grand Montréal. »
- « Votre prochaine adresse commence par une vraie conversation. »

**Coordonnées (réelles) :** **514.895.4921** · titre exact tel que sur `brand.png` :
« Courtier immobilier agréé » (variante féminine « Courtière immobilière agréée »
possible — au choix de Julie, rester cohérent partout).

---

## Colour

Palette **strictement RE/MAX** (hex officiels, p.11 du brandbook). On **n'introduit aucune
couleur hors palette**. En premium calme, la base est **crème**, le texte **charbon**, et
le rouge/bleu servent d'**accents rares**, pas d'aplats.

### Fondations (neutres — la majorité de la page)
| Rôle | Token | Hex | Usage |
|---|---|---|---|
| Fond de page | `--bg` | `#F7F5EE` (Cream) | Fond dominant, chaud, jamais blanc pur |
| Surface chaude | `--paper` | `#FCFBF7` | Cartes, panneaux légèrement surélevés |
| Blanc | `--white` | `#FFFFFF` | Rare, surfaces flottantes / inputs |
| Texte principal | `--ink` | `#1A1A1C` | Charbon tiré du brand Black, **jamais `#000`** |
| Texte secondaire | `--ink-2` | `#474C57` | Sous-titres, intros, légendes longues |
| Texte discret | `--ink-3` | `#8B909B` | Méta, captions, placeholders |
| Filet / bordure | `--line` | `color-mix(in oklch, var(--ink) 12%, transparent)` | Hairlines 1px |

### Accents de marque (au compte-gouttes)
| Rôle | Token | Hex | Usage |
|---|---|---|---|
| Bleu interactif | `--blue` | `#0043FF` (Primary Blue) | Liens, icônes, états actifs, focus ring |
| Bleu profond | `--blue-deep` | `#0C2749` (Bridge Blue) | Sections sombres, survols |
| Bleu nuit | `--navy` | `#000E35` (Dark Blue) | Pied de page, scrim héro, fonds sombres |
| Rouge signature | `--red` | `#FF1200` (Primary Red) | **L'étincelle** : CTA principal, tag « À vendre », détails |
| Rouge profond | `--red-deep` | `#AA1120` (Bridge Red) | Survol du CTA, fin de dégradé rouge |
| Rouge sombre | `--red-dark` | `#660000` (Dark Red) | Fin de dégradé profond, accents sur sombre |
| Bleu ciel | `--sky` | `#A3D4F2` (Sky Blue) | Fonds doux, tag « Nouveau », pastilles |

**Règles de couleur**
- **Le calme d'abord :** ~90 % de la page est crème + charbon. Le rouge/bleu apparaît par
  petites touches (CTA, tags, filets, icônes), jamais en grands blocs partout.
- **Bleu = ton calme** (liens, navigation, états). **Rouge = l'étincelle** (un seul CTA
  rouge par section au maximum, tags de statut).
- **Sections sombres** (héro scrim, contact, pied de page) : fond `--navy #000E35`,
  texte `--bg` crème.
- **Dégradations autorisées** (le brandbook les permet sur rouge et bleu, pour créer du
  contraste sans ajouter de couleur) : `#FF1200 → #660000` (lueur rouge),
  `#0043FF → #000E35` (profondeur bleue). Toujours **subtiles**, en lueur radiale
  derrière le héro / pied de page, avec un grain SVG (`feTurbulence`) léger.
- **Statuts propriétés :** À vendre = `--red` · Vendu = `--navy` · Nouveau = `--sky` (texte navy).
  Trois traitements distincts — **pas** trois pastilles identiques.

---

## Typography

Backbone **grotesque** fidèle au brandbook (Gotham / Akzidenz-Grotesk / Arial). Le premium
vient de l'**échelle, du blanc et du poids** — pas d'un effet. Accent serif **optionnel**.

- **Titres / display → `Archivo`** (700/800). Grotesque architectural, large, distinctif —
  parfait pour l'immobilier. `letter-spacing: -0.03em`, `line-height: 1.02–1.06`.
- **Corps / UI → `Inter`** (400/500/600). Neutre, premium — tient le rôle Akzidenz/Arial.
  Corps `line-height: 1.7`, mesure **66ch** max.
- **Accent éditorial (optionnel, désactivé par défaut) → `Fraunces`** (serif variable).
  Réservé au **nom « Julie Gauthier »**, aux **citations** et aux **grands chiffres**.
  À activer seulement si Julie veut la touche « luxe magazine » ; sinon, tout en grotesque.
- Charger via Google Fonts ou Bunny Fonts. Polices variables : animer le poids avec parcimonie.

**Échelle fluide (toujours `clamp()`, jamais de px figés par breakpoint)**
| Niveau | Police | clamp() | Détails |
|---|---|---|---|
| Display (h1 héro) | Archivo 800 | `clamp(2.75rem, 6vw, 5.5rem)` | `-0.03em`, lh 1.02 |
| H2 section | Archivo 700 | `clamp(2rem, 4vw, 3.25rem)` | `-0.02em`, lh 1.06 |
| H3 | Archivo 600 | `clamp(1.25rem, 2vw, 1.6rem)` | lh 1.2 |
| Intro / lead | Inter 400 | `clamp(1.125rem, 1.6vw, 1.375rem)` | lh 1.6, `--ink-2` |
| Corps | Inter 400 | `1.0625rem` (17px) | lh 1.7, 66ch |
| Eyebrow / kicker | Inter 600 | `0.75rem` | UPPERCASE, `0.16em`, en `--red` ou `--blue` |
| Label / méta | Inter 500 | `0.8125rem` | `0.04em` |

---

## Spacing & layout

Générosité = signe extérieur de richesse. Grille 8px, rythme aéré.

- **Échelle d'espacement (8px) :** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.
- **Padding vertical des sections :** `clamp(5rem, 10vw, 9rem)`.
- **Conteneurs :** contenu `max-width: 1240px` · large `1400px` · **texte 720px (~66ch)**.
- **Gouttières :** `clamp(1.25rem, 4vw, 2.5rem)`.
- **Grille éditoriale obligatoire :** au moins un **CSS Grid à zones nommées** asymétrique
  (héro et « À propos » : portrait + texte décalés, pas centrés). `subgrid` pour aligner
  la méta des cartes de propriétés sur les pistes du parent.
- Mobile-first ; tout fluide via `clamp()` / container queries, pas de sauts de breakpoint.

---

## Shape & elevation

Premium = **net et discret**. Peu d'arrondi, ombres légères, on s'appuie sur l'espace.

- **Rayons :** images/feature `2–4px` (éditorial, net) · cartes `8px` · boutons `8px` ·
  chips/tags `999px` (pilule). Tokens : `--r-xs 4px` `--r-sm 8px` `--r-md 14px` `--r-pill 999px`.
- **Bordures :** hairline `1px` `--line`. Le filet structure plus que l'ombre.
- **Ombres en couches, teintées bleu** (jamais `0 4px 6px rgba(0,0,0,.1)`) :
  ```css
  --shadow-sm: 0 1px 2px rgba(12,39,73,.06), 0 2px 6px rgba(12,39,73,.05);
  --shadow-md: 0 2px 6px rgba(12,39,73,.06), 0 10px 24px rgba(12,39,73,.08),
               0 30px 60px rgba(12,39,73,.06);
  ```
- **Système de plans :** base (crème) → élevé (cartes `--paper` + `--shadow-sm`) →
  flottant (nav collante / modale : `--shadow-md` + `backdrop-filter: blur`).

---

## Motion

Scroll-driven, fluide, physique. **GSAP + ScrollTrigger + Lenis** (smooth scroll).

- N'anime que `transform` et `opacity`. **Jamais** `transition-all` ni propriétés de layout.
- Easing ressort : `cubic-bezier(0.16, 1, 0.3, 1)` ou GSAP `power3.out`.
- **Reveals au scroll :** `y: 24px → 0`, opacité, **stagger 0.08s** sur les fratries
  (cartes, items) — jamais à l'unisson. Léger settle/overshoot, rien ne s'arrête sec.
- **Héro :** parallax doux (scale 1.06 → 1) + révélation par `clip-path: inset()`.
- **Nav :** transparente sur le héro → crème + hairline + blur au scroll.
- `will-change: transform` seulement sur les éléments en cours d'animation.
- **`prefers-reduced-motion` :** désactiver transforms/parallax, garder l'opacité.

---

## Components

- **Nav (collante) :** logo **REMAX Crystal** à gauche, liens centre/droite, **CTA téléphone
  514.895.4921** (pilule rouge `--red`). Transparente sur héro → crème + blur au scroll.
- **Héro :** grande photographie pleine largeur (propriété ou Julie), scrim `--navy`,
  titre Archivo display, eyebrow rouge, 1 CTA primaire (rouge) + 1 secondaire (lien souligné).
  Ballon RE/MAX en petit accent — jamais recoloré, jamais dans une boîte.
- **À propos :** grille asymétrique portrait + bio + **bandeau de crédentiels** (titre,
  RE/MAX Crystal, secteur). Accent serif possible sur « Julie Gauthier ».
- **Services :** 3–4 cartes (Vendre / Acheter / Évaluation / Accompagnement) — **variées**
  (numéro de tête + filet, pas le même icône+titre+texte répété). Hover : lift léger + filet rouge.
- **Propriétés (placeholder Centris) :** grille de cartes — photo (overlay dégradé +
  `mix-blend-mode`), prix, ville, ch./sdb, **tag de statut** (À vendre/Vendu/Nouveau).
  Structure prête pour `site/nos-proprietes/` généré par `build.mjs` (voir `CENTRIS-SETUP.md`).
- **Chiffres-clés :** propriétés vendues, années d'expérience, satisfaction — **placeholders
  à confirmer**, présentés sobrement (gros chiffre Archivo/Fraunces, label discret). Pas le
  cliché « hero-metric » SaaS.
- **Témoignages :** citations (Fraunces si activé), nom + secteur, en filet ou carte crème.
- **Contact :** section sombre `--navy`, formulaire (nom, courriel, téléphone, message),
  **téléphone bien visible**, lien courriel, placeholder carte. États focus visibles (`--blue`).
- **Pied de page :** fond `--navy`, **logo REMAX Crystal blanc** (`crystal-long-blanc.png`),
  coordonnées, mention « Courtier immobilier agréé », « Chaque bureau est indépendant et
  autonome », réseaux sociaux.

**Boutons / liens (tous : hover + focus-visible + active, sans exception)**
- Primaire : fond `--red`, texte `--bg`, `--r-sm` ; hover → `--red-deep` + lift léger.
- Secondaire : contour hairline `--line`, texte `--ink` ; hover → fond `--paper`.
- Lien texte : `--blue`, soulignement animé (offset) au hover.
- Focus-visible : anneau `--blue` 2px + offset 2px.

---

## Logos & assets (brand_assets/)

| Asset | Quand l'utiliser |
|---|---|
| `crystal-long-noir.png` | Logo principal sur fonds **clairs** (nav crème, sections claires) |
| `crystal-long-blanc.png` | Logo sur fonds **sombres** (pied de page navy, scrim héro) |
| Ballon (extrait des logos) | Accent décoratif **petit** uniquement — jamais recoloré, jamais dans une boîte, espace libre ≥ ½ de la barre blanche |
| `brand.png` | Bannière marketing (photo de Julie + nom + tél) — **source du portrait** et du lockup contact, **pas** un logo web |
| `remax-brandbook.pdf` | Référence couleurs (p.11) / typo / règles logo |

**Règles logo (brandbook) :** fond neutre, espace libre respecté, rien qui chevauche, ballon
toujours en couleur, ne pas mélanger/altérer. Le symbole ® n'apparaît pas dans le nom de bureau.

---

## Bans (ce qu'on ne livre jamais)

- `#000` / `#fff` purs → toujours crème + charbon tirés vers la marque.
- Texte en dégradé → une couleur pleine ; l'emphase passe par le **poids/la taille**.
- Bleu/indigo Tailwind par défaut (indigo-500, blue-600…) → uniquement les hex RE/MAX.
- Ombres plates mono-stop (`shadow-md`) → toujours en couches, teintées bleu.
- Glassmorphisme par défaut → blur rare et intentionnel (nav collante seulement).
- Bloc « hero-metric » SaaS (énorme chiffre + mini label + accent dégradé).
- Grilles de cartes identiques (même icône/titre/texte répétés).
- Bandes de couleur à gauche des cartes/encadrés → bordure pleine, teinte douce, ou numéro.
- Tirets cadratins (—) dans la copie → virgules, deux-points, points.
- **Recolorer le ballon RE/MAX**, le mettre dans une boîte, ou le déformer.
- Rouge + bleu en grands aplats partout : ça casse le « calme ». Accents seulement.
- Polices en px figés / `transition-all` / animer le layout.

**Test anti-slop :** (1) Pourrait-on dire « c'est une IA qui a fait ça » ? (2) Devine-t-on
la palette rien qu'à la catégorie (immobilier → bleu/gris générique) ? Si oui à l'un des deux,
on retravaille jusqu'à ce que la réponse ne soit pas évidente. Ici, la signature = **crème
chaud + charbon + l'étincelle rouge/bleu RE/MAX dosée**, pas le bleu corporate attendu.
