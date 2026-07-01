# Prompts Claude Design — Julie Gauthier · RE/MAX Crystal

Deux prompts prêts à coller dans Claude Design (le design system premium-calme RE/MAX Crystal
est déjà chargé). Générés via workflow multi-agent : brouillons sous 3 angles (luxe / conversion /
exhaustivité) → synthèse → critique anti-slop. Colle un prompt, génère la page, puis ajuste.

=================================================================
## 1) PAGE D'ACCUEIL (one-page)
=================================================================

Génère UNE page d'accueil (home, one-page, scroll-driven) haute-fidélité pour **Julie Gauthier, courtière immobilière agréée chez RE/MAX Crystal**, au service des acheteurs et vendeurs du **Grand Montréal**. Téléphone réel : **514.895.4921**. Toute la copie est en **français québécois, vouvoiement**, phrases courtes, concrètes et chaleureuses. Direction : **premium calme / luxe immobilier**, calme, raffiné, digne de confiance, jamais tape-à-l'œil. L'autorité RE/MAX exprimée avec la retenue d'une maison de prestige : beaucoup d'espace, de grandes photographies, une couleur dosée au compte-gouttes. Sous cette sérénité, une **structure de conversion limpide** : CTA évidents, signaux de confiance, prise de contact facile, parcours acheteur/vendeur clair, sans jamais paraître agressif.

Applique strictement le design system déjà chargé (RE/MAX Crystal, premium calme). Les `brand_assets/` priment sur toute référence. Rappels de tokens à respecter tels quels, **n'introduis aucune couleur hors palette**. Harmonise le titre au féminin partout : **« Courtière immobilière agréée »**.

## Tokens (ne pas réinventer)
- Fonds : crème `--bg #F7F5EE` (dominant, jamais blanc pur) · surface chaude `--paper #FCFBF7` · `--white #FFFFFF` rare (inputs, surfaces flottantes uniquement)
- Texte : charbon `--ink #1A1A1C` (jamais `#000`) · secondaire `--ink-2 #474C57` · discret `--ink-3 #8B909B`
- Filet `--line` = `color-mix(in oklch, var(--ink) 12%, transparent)`, hairline 1px
- Bleu interactif `--blue #0043FF` (liens, icônes, états, focus ring) · bleu profond `--blue-deep #0C2749` · bleu nuit `--navy #000E35` (sections sombres, scrim, pied de page)
- Rouge signature `--red #FF1200` (l'étincelle : CTA principal, tag « À vendre », détails) · survol `--red-deep #AA1120` · `--red-dark #660000` (fin de dégradé) · bleu ciel `--sky #A3D4F2` (tag « Nouveau », texte navy dessus)
- **Répartition obligatoire : ~90 % crème + charbon.** Rouge et bleu en petites touches seulement (un seul CTA rouge par section au maximum) ; pas de grands aplats rouge/bleu, ça casse le calme. Sections sombres limitées au héro (scrim), au contact et au pied de page, en `--navy`.
- Titres/display **Archivo** 700/800, `letter-spacing -0.03em`, lh 1.02–1.06 · corps/UI **Inter** 400/500/600, lh 1.7, mesure 66ch · accent serif **Fraunces** ACTIVÉ, réservé au nom « Julie Gauthier », aux citations et aux grands chiffres
- Échelle type fluide en `clamp()` uniquement : Display `clamp(2.75rem, 6vw, 5.5rem)` · H2 `clamp(2rem, 4vw, 3.25rem)` · H3 `clamp(1.25rem, 2vw, 1.6rem)` · Lead `clamp(1.125rem, 1.6vw, 1.375rem)` · corps 17px lh 1.7 · eyebrow 0.75rem UPPERCASE `0.16em` en `--red` ou `--blue`
- Espacement grille 8px (4·8·12·16·24·32·48·64·96·128) · padding vertical des sections `clamp(5rem, 10vw, 9rem)` · conteneur 1240px (large 1400px, texte 720px) · gouttières `clamp(1.25rem, 4vw, 2.5rem)`
- Rayons : images/feature 2–4px · cartes/boutons 8px · tags pilule 999px · bordures hairline 1px
- Ombres en couches teintées bleu (jamais `0 4px 6px rgba(0,0,0,.1)`) :
  `--shadow-sm: 0 1px 2px rgba(12,39,73,.06), 0 2px 6px rgba(12,39,73,.05)`
  `--shadow-md: 0 2px 6px rgba(12,39,73,.06), 0 10px 24px rgba(12,39,73,.08), 0 30px 60px rgba(12,39,73,.06)`
- Plans : base crème → cartes `--paper` + `--shadow-sm` → flottant (nav, modale) `--shadow-md` + blur.

## Logos (placeholders fidèles à la marque)
- Nav et sections claires : lockup **« REMAX CRYSTAL » version noire** (`crystal-long-noir.png`). Sections sombres (pied de page, scrim) : **version blanche** (`crystal-long-blanc.png`).
- **Ballon RE/MAX** en accent décoratif **petit** uniquement : couleurs d'origine (rouge en haut, blanc au centre, bleu en bas), **jamais recoloré, jamais déformé, jamais dans une boîte** ; espace libre respecté (≥ ½ de la hauteur de la barre blanche du ballon), rien qui le chevauche. Le symbole ® n'apparaît pas dans le nom du bureau.
- Si un fichier logo manque : placeholder texte « REMAX CRYSTAL » dans la bonne couleur, marqué « placeholder logo ».

## Photographie
- Grandes images placeholder via `https://placehold.co/` (cadrage immobilier haut de gamme : façades, intérieurs lumineux, ou portrait de Julie). **Jamais d'`<img>` brut** : toujours overlay/scrim + `mix-blend-mode` léger pour l'unité chromatique. Toutes les images et stats sont des placeholders explicitement marqués.

---

## STRUCTURE DE LA PAGE (de haut en bas)

### 0. Skip-link (accessibilité)
- Tout premier élément focusable : lien « Aller au contenu » masqué visuellement, révélé au focus clavier (anneau `--blue`), pointant vers `<main id="contenu">`.

### 1. Nav collante
- Barre fixe. **Gauche** : logo « REMAX CRYSTAL » noir. **Centre/droite** : liens Accueil · À propos · Services · Propriétés · Témoignages · Contact (ancres). **Extrême droite** : CTA téléphone en **pilule rouge `--red`** texte crème « 514.895.4921 » (petite icône combiné, lien `tel:5148954921`).
- États : **transparente** au-dessus du héro (texte crème, logo blanc sur la photo sombre) ; **au scroll (> ~80px)** → fond crème `--bg` à ~85 % + `backdrop-filter: blur(12px)` + hairline `--line` en bas + logo et liens repassent en charbon. Transition douce sur `background`/`opacity`/`transform` seulement (jamais `transition-all`). Seul endroit où le blur est permis.
- Liens : hover = soulignement animé (offset, `--blue`) ; **focus-visible** = anneau `--blue` 2px + offset 2px ; active légère pression. CTA pilule : hover → `--red-deep` + lift léger ; focus-visible anneau bleu.
- **Mobile** : hamburger (traits charbon/crème selon fond) → panneau plein écran crème qui glisse (translate + fade), liens empilés en grand (Archivo), CTA pilule rouge pleine largeur en bas, bouton fermer (X). Focus piégé dans le menu ouvert, échap ferme, retour du focus au bouton hamburger à la fermeture. `aria-expanded` sur le bouton. Cibles tactiles ≥ 44px.

### 2. Héro plein écran (section sombre, grille à zones nommées asymétrique)
- Hauteur `100svh`. **Grande photographie** placeholder (propriété d'exception ou Julie) pleine largeur, `object-fit: cover`, avec **scrim `--navy`** en dégradé (plus dense en bas et derrière le texte, ~0 % en haut), une **lueur radiale subtile** `#0043FF → #000E35` en arrière-plan, et un **grain SVG `feTurbulence`** très léger.
- Contenu calé **en bas-gauche** (pas centré) :
  - **Eyebrow rouge** UPPERCASE : « Courtière immobilière agréée · RE/MAX Crystal »
  - **Titre display Archivo 800** texte crème, 2 lignes max, accroche de confiance ancrée Grand Montréal (couleur pleine, jamais de dégradé), ex. : « Vendre et acheter, sereinement, dans le Grand Montréal. »
  - **Sous-titre Inter** crème un ton plus doux, ≤ 60ch, ex. : « Un accompagnement humain et rigoureux, du premier rendez-vous jusqu'à la signature. »
  - **Deux actions** côte à côte : primaire rouge `--red` « Prendre rendez-vous » (hover → `--red-deep` + lift) ; secondaire en **lien souligné** crème « Voir les propriétés » (soulignement offset animé + flèche → qui glisse au hover).
  - **Petit ballon RE/MAX** en accent discret (coin ou près de l'eyebrow), couleurs d'origine, pas encadré.
- Indicateur de scroll fin en bas-centre (petit trait/flèche qui pulse en opacité).
- **Motion** : à l'entrée, image `scale 1.06 → 1` + révélation par `clip-path: inset()` ; titre et sous-titre montent (`y: 24px → 0`, opacité) en stagger 0.08s ; parallax doux de l'image au scroll (transform uniquement). Focus-visible anneau bleu sur les deux actions ; renforcer le scrim sous le texte pour garantir le contraste AA crème sur photo.

### 3. À propos de Julie
- Fond `--bg`. **CSS Grid à zones nommées, asymétrique** (PAS centré) : colonne portrait (~5/12) + colonne texte (~6/12) décalées, large gouttière.
- **Portrait** placeholder vertical de Julie (`https://placehold.co/800x1000`), rayon 2–4px, overlay léger + `mix-blend-mode`, ombre `--shadow-md`, `alt` descriptif. Légende discrète possible dessous.
- **Texte** : eyebrow bleu « À propos » ; titre H2 où **« Julie Gauthier » est en Fraunces** (serif, même charbon, pas de dégradé), reste en Archivo ; bio courte 2–3 phrases vouvoiement, mesure 66ch, ton chaleureux et concret (approche, accompagnement, connaissance du Grand Montréal), ex. : « Julie vous accompagne à chaque étape, avec écoute et transparence. Elle connaît le Grand Montréal et défend vos intérêts, sans précipitation. »
- **Bandeau de crédentiels** sous la bio (pas de pastilles colorées, pas de bande à gauche) : 3 éléments séparés par des **filets verticaux hairline** : « Courtière immobilière agréée » · « RE/MAX Crystal » · « Grand Montréal », libellés discrets en `--ink-3`, petites icônes line `--blue`.
- Motion : portrait et texte révélés au scroll en stagger.

### 4. Services (parcours acheteur/vendeur clair)
- Fond `--bg` ou `--paper`. Eyebrow rouge « Services » + titre H2 + courte intro.
- **3–4 offres VARIÉES, interdit la grille de cartes identiques** (pas le même icône+titre+texte décliné). Traite-les en **lignes/cartes éditoriales asymétriques** : chacune porte un **grand numéro de tête** (01–04 en Archivo léger `--ink-3`) + un filet hairline, un titre H3, 1–2 phrases bénéfice/confiance, et un lien « En savoir plus » bleu souligné. Varie largeurs/alignements et mets une carte en avant (ex. « Évaluation gratuite » en carte accent, fin **filet `--red`** près du numéro/titre, lien « Demander mon évaluation »). Pas 4 colonnes égales clonées. Le filet rouge reste un détail : un seul CTA rouge plein par section au maximum, ici réservé au héro/contact.
- Copie placeholder :
  - 01 **Vendre** : « Mise en marché stratégique, photos professionnelles et négociation serrée pour obtenir le meilleur prix. »
  - 02 **Acheter** : « On cible les bonnes propriétés, on visite ensemble, on vous protège à l'offre. »
  - 03 **Évaluation gratuite** : « Connaître la juste valeur de votre propriété, sans engagement. » (carte accent)
  - 04 **Accompagnement** : « Un seul interlocuteur, du premier appel jusqu'aux clés en main. »
- **Hover** : lift léger (`translateY(-4px)` + `--shadow-md`) + apparition d'un **filet rouge `--red` court** près du numéro/titre (pas une bande pleine hauteur) ; numéro légèrement foncé/déplacé ; focus-visible anneau bleu si cliquable.
- Sous les cartes : un **lien de parcours** unique bleu souligné, ex. « Parlons de votre projet ». Stagger 0.08s à l'entrée.

### 5. Aperçu Propriétés
- Eyebrow bleu « Propriétés » + titre H2 « Quelques inscriptions » + lien « Voir toutes les propriétés → » (bleu souligné animé) aligné en haut-droite.
- **3 cartes propriétés** placeholder, surface `--paper`, `--shadow-sm`, rayon 8px, alignées via **`subgrid`** pour que prix / ville / méta tombent sur les mêmes pistes. Chaque carte :
  - **Photo** placeholder (`https://placehold.co/800x600`) avec overlay dégradé bas (`--navy` → transparent) + `mix-blend-mode` léger.
  - **Tag de statut** en pilule sur la photo, **traitements DISTINCTS** (pas trois pastilles identiques) : « À vendre » = `--red`, texte crème · « Vendu » = `--navy`, texte crème · « Nouveau » = `--sky`, texte `--navy`. Le statut est toujours porté par le libellé texte, jamais par la couleur seule.
  - Sous la photo : **prix** en Archivo (ex. « 749 000 $ »), **ville/quartier** (ex. « Rosemont, Montréal », « Outremont », « Le Plateau »), ligne méta **« 4 ch · 2 sdb · 1 850 pi² »** en `--ink-2`. Carte entière cliquable (lien englobant accessible). Mention discrète « placeholder, à connecter à Centris ».
  - **Hover** : image `scale 1.04` (conteneur `overflow:hidden`, transform only) + lift + `--shadow-md` ; focus-visible anneau bleu.
- Motion : reveal stagger au scroll.

### 6. Chiffres-clés (signaux de confiance, sobres)
- Fond `--paper` (ou bande claire), séparé par filets. 3–4 stats en **rangée éditoriale**, **éviter le cliché hero-metric SaaS** (énorme chiffre + mini label + accent dégradé). Ici : chiffre en Archivo ou Fraunces, taille mesurée, charbon, **label discret** dessous en `--ink-3`, **séparateurs verticaux hairline** plutôt que des cartes lourdes. Pas de dégradé sur les chiffres.
- Placeholders explicitement marqués **(placeholder, à confirmer)** : « 120+ » Propriétés vendues · « 12 » Années d'expérience · « 98 % » Clients satisfaits · (optionnel) « Grand Montréal ». Une seule petite touche de couleur autorisée (ex. le « + » ou le « % » en `--red`).
- Motion : compteur qui s'incrémente doucement au scroll (sinon fade/translate stagger), désactivé sous `prefers-reduced-motion` (afficher la valeur finale d'emblée).

### 7. Témoignages (preuve sociale)
- Fond `--bg`, beaucoup d'air. Eyebrow rouge « Témoignages » + titre H2.
- **2–3 citations clients** courtes et crédibles (vouvoiement) en **Fraunces** (citation serif, grande, charbon, jamais en dégradé), sur filet ou carte crème `--paper` légère, balisées `<blockquote>` + `<cite>`. **Disposition non répétitive** (pas trois cartes clones) : une citation en vedette plus grande + deux plus discrètes, ou décalage éditorial alterné. Sous chaque : **nom** (Inter 600) + **secteur** (Inter 500 `--ink-3`). Petit guillemet `«` ou filet rouge court en accent, jamais une grosse icône. Tout en placeholder, ex. :
  - « Julie a vendu notre maison rapidement et au bon prix. Toujours disponible, toujours honnête. » : Marie & Patrick, Rosemont
  - « Premier achat sans stress grâce à elle. On s'est sentis guidés du début à la fin. » : Sophie L., Villeray
  - « Une professionnelle calme et rigoureuse. Je la recommande sans hésiter. » : Daniel T., Ahuntsic
- Motion : reveal en stagger ; option carrousel doux sur mobile (transform only, contrôles accessibles au clavier).

### 8. Contact (section sombre, conversion)
- Fond **`--navy #000E35`**, texte crème `--bg`. Lueur radiale `#0043FF → #000E35` très discrète + grain SVG léger. **Grille à zones nommées** : colonne formulaire + colonne coordonnées/carte (empilée sur mobile).
- Copie d'invitation chaleureuse, ex. : « Parlons de votre projet. Votre prochaine adresse commence par une vraie conversation. »
- **Formulaire** : champs Nom · Courriel · Téléphone · Message (textarea), chaque champ avec `<label>` associé (pas de placeholder seul comme étiquette). Inputs sur fond `--white`/crème légèrement translucide, texte charbon, rayon 8px, hairline ; labels Inter 500 crème, placeholders `--ink-3`. **Focus = anneau `--blue` 2px + offset + bordure `--blue`** (bien visible sur fond sombre). État erreur = filet rouge + message court relié par `aria-describedby` (jamais la couleur seule). Bouton **« Envoyer le message »** primaire rouge `--red` (hover → `--red-deep`, focus anneau bleu).
- **Colonne coordonnées** : **téléphone bien visible** « 514.895.4921 » en grand (Archivo, lien `tel:5148954921`), lien courriel placeholder « bonjour@juliegauthier.ca » (`mailto:`, bleu souligné), titre « Courtière immobilière agréée · RE/MAX Crystal », logo « REMAX CRYSTAL » blanc discret en rappel.
- **Placeholder carte** : bloc rectangulaire (rayon 8px, navy/crème, hairline) « Carte — Grand Montréal (placeholder) », sans dépendance externe.
- Motion : reveal doux, transform/opacity seulement.

### 9. Pied de page (navy)
- Fond **`--navy`**, texte crème. **Logo « REMAX CRYSTAL » blanc** à gauche (ballon couleurs d'origine, texte blanc).
- Colonnes : navigation (mêmes liens), coordonnées (514.895.4921 en `tel:`, courriel placeholder en `mailto:`), mention **« Courtière immobilière agréée »**, et la mention légale **« Chaque bureau est indépendant et autonome. »** en petit `--ink-3` clair (contraste AA maintenu sur navy : éclaircir si nécessaire).
- **Réseaux sociaux** : icônes line (Facebook, Instagram, LinkedIn) en crème, avec `aria-label` explicite, hover → `--sky` ou `--blue` ; focus-visible anneau bleu. Filet hairline `--line` (clair sur navy) en haut + « © 2026 Julie Gauthier. Tous droits réservés. » discret. Petit ballon RE/MAX en accent possible, jamais recoloré ni encadré.

---

## MOTION (global)
- Smooth scroll Lenis + reveals scroll-driven (GSAP/ScrollTrigger). N'anime que **`transform` et `opacity`**, jamais le layout, jamais `transition-all`. Easing ressort `cubic-bezier(0.16, 1, 0.3, 1)` ou `power3.out`. Reveals `y: 24px → 0` + opacité, **stagger 0.08s** sur les fratries, léger settle/overshoot, rien ne s'arrête sec. Héro : parallax + `clip-path: inset()`. Nav : transparente → crème + blur au scroll. `will-change: transform` seulement sur l'élément animé. **`prefers-reduced-motion: reduce`** : couper parallax/transforms/compteurs, ne garder que des fondus d'opacité courts, états finaux visibles d'emblée.

## RESPONSIVE (mobile-first)
- Tout fluide via `clamp()` et container queries, pas de sauts de breakpoint. Nav → hamburger plein écran. Héro `100svh` avec scrim renforcé pour la lisibilité. Grilles asymétriques → pile 1 colonne en gardant la hiérarchie. Propriétés en carrousel ou pile. Chiffres-clés empilés avec filets horizontaux. Formulaire pleine largeur. Photographies généreuses sur petit écran. Cibles tactiles ≥ 44px. CTA téléphone toujours accessible.

## ACCESSIBILITÉ
- Skip-link en tête. **Chaque** élément interactif a hover + **focus-visible (anneau `--blue` 2px + offset 2px)** + active, sans exception. Contraste AA partout (crème sur navy, charbon sur crème, `--ink-3` éclairci sur navy ; renforcer le scrim sous le texte sur photo). Aucune information portée par la couleur seule (statuts, erreurs : toujours doublés d'un libellé texte). HTML sémantique (`header/nav`, `main#contenu`, `section` titrées avec un seul `h1` au héro, `footer`), `blockquote/cite` pour les témoignages, liens `tel:`/`mailto:` réels, `alt` descriptifs, `label` associés au formulaire, ordre de tabulation logique, menu mobile avec `aria-expanded` + focus piégé + échap + retour de focus.

## BANS (à ne jamais livrer)
- Pas de `#000` / `#fff` purs → crème + charbon tirés vers la marque (`#fff` toléré seulement pour inputs/surfaces flottantes).
- Pas de **texte en dégradé** → couleur pleine, l'emphase passe par poids/taille.
- Pas de bleu/indigo Tailwind générique (indigo-500, blue-600…) → uniquement les hex RE/MAX listés.
- Pas d'ombres plates mono-stop → toujours en couches, teintées bleu.
- Pas de glassmorphisme par défaut → blur réservé à la nav collante au scroll.
- Pas de bloc « hero-metric » SaaS.
- Pas de grilles de cartes identiques (services, propriétés, témoignages tous visiblement variés).
- Pas de bandes de couleur à gauche des cartes → bordure pleine, teinte douce, ou numéro de tête.
- Pas de **tirets cadratins (—)** dans la copie → virgules, deux-points, points.
- **Ne jamais recolorer/déformer/encadrer le ballon RE/MAX** ; respecter son espace libre.
- Pas de rouge + bleu en grands aplats partout : accents seulement, ~90 % crème + charbon ; sections sombres limitées au héro/contact/pied de page en `--navy`.
- Pas de police en px figés (toujours `clamp()`) / pas de `transition-all` / ne pas animer le layout.

**Test final anti-slop :** on ne doit pas pouvoir dire « c'est une IA qui a fait ça », ni deviner la palette rien qu'à la catégorie (immobilier → bleu/gris générique). La signature visible = **crème chaud + charbon + l'étincelle rouge/bleu RE/MAX dosée**, généreuse en espace et en photographie, jamais le bleu corporate attendu. Si l'un des deux échoue, retravaille.

=================================================================
## 2) PAGE PROPRIÉTÉS (listing, prête pour Centris)
=================================================================

Génère **UNE seule page web haute-fidélité, responsive (mobile-first)** : la **page « Propriétés » (listing)** du site de **Julie Gauthier, courtière immobilière agréée, RE/MAX Crystal** (Grand Montréal, tél. 514.895.4921). Direction : **premium calme / luxe immobilier**. Applique **strictement** le design system déjà chargé (palette RE/MAX, typo Archivo + Inter, espacement, motion, composants, bans). Toute la copie est en **français québécois, vouvoiement**. Sentiment visé : **calme, raffiné, digne de confiance** : beaucoup d'espace, grande photographie, couleur dosée au compte-gouttes.

**But de la page :** lister les propriétés inscrites de Julie. Le contenu est en **placeholder** pour l'instant, mais la **carte de propriété doit être un composant cohérent et réutilisable**, prêt à être alimenté par des données Centris (prix, ville, ch/sdb, superficie, statut, photos) générées dans `site/nos-proprietes/`. Garde un équilibre : cadrage luxe serein, structure de conversion limpide, couverture exhaustive des états (filtres actifs, état vide, chargement, charger plus).

## Tokens à respecter (ne jamais dévier, ne pas inventer de couleur hors liste)
- **Fond de page** `--bg #F7F5EE` (crème chaud, jamais blanc pur) · **surface carte** `--paper #FCFBF7` · **blanc** `#FFFFFF` rare (inputs, surfaces flottantes).
- **Texte** `--ink #1A1A1C` (charbon, jamais `#000`) · secondaire `--ink-2 #474C57` · discret `--ink-3 #8B909B`. **Filet** `--line` = `color-mix(in oklch, var(--ink) 12%, transparent)`, hairline 1px.
- **Accents au compte-gouttes :** bleu interactif `--blue #0043FF` (liens, icônes, focus ring, états actifs) · bleu profond `--blue-deep #0C2749` · bleu nuit `--navy #000E35` (sections sombres) · rouge `--red #FF1200` = **l'étincelle** (CTA principal, tag « À vendre ») · `--red-deep #AA1120` (survol CTA) · `--red-dark #660000` (fin de dégradé) · bleu ciel `--sky #A3D4F2` (tag « Nouveau », texte navy dessus).
- **~90 % de la page = crème + charbon.** Le rouge/bleu n'apparaît que par petites touches. Aucun grand aplat rouge ou bleu hors sections sombres explicites (`--navy`).
- **Rayons :** images 2–4px (`--r-xs`), cartes 8px (`--r-sm`), boutons 8px, chips/tags pilule 999px (`--r-pill`). **Ombres en couches teintées bleu** (jamais `0 4px 6px rgba(0,0,0,.1)`) : `--shadow-sm: 0 1px 2px rgba(12,39,73,.06), 0 2px 6px rgba(12,39,73,.05)` · `--shadow-md: 0 2px 6px rgba(12,39,73,.06), 0 10px 24px rgba(12,39,73,.08), 0 30px 60px rgba(12,39,73,.06)`.
- **Typo :** titres **Archivo** 700/800 (`letter-spacing:-0.03em`, lh 1.02–1.06), corps **Inter** 400/500/600 (lh 1.7, mesure 66ch). Eyebrow Inter 600, `0.75rem`, UPPERCASE, `0.16em`, en `--red` ou `--blue`. Méta/label Inter 500 `0.8125rem`, `0.04em`. Accent serif **Fraunces désactivé par défaut** (réservable au nom « Julie Gauthier » ou aux grands prix si touche magazine voulue). **Toujours `clamp()`, jamais de px figés par breakpoint.**
- **Espacement :** grille 8px (4·8·12·16·24·32·48·64·96·128). Padding vertical des sections `clamp(5rem, 10vw, 9rem)`. Conteneur contenu `max-width:1240px`, large `1400px`, texte `720px`. Gouttières `clamp(1.25rem, 4vw, 2.5rem)`.

---

## Structure de la page, de haut en bas

### 1. Nav collante (identique à la page d'accueil)
- Barre collante en haut. **Logo « REMAX Crystal » noir** (`crystal-long-noir.png`) à gauche sur ce fond clair, ballon RE/MAX 4 couleurs **jamais recoloré, jamais dans une boîte**, espace libre respecté. Liens centre/droite : Accueil · À propos · Services · **Propriétés** (état actif) · Contact. **CTA téléphone « 514.895.4921 » en pilule rouge `--red`** à droite (lien `tel:+15148954921`, le libellé visible reste « 514.895.4921 »).
- Cette page n'a **pas** de héro photo plein écran : la nav démarre déjà en mode « clair », fond crème `--bg` translucide + **hairline `--line` en bas** + `backdrop-filter: blur(12px)` (plan flottant, `--shadow-sm` léger au scroll). **C'est le seul endroit, avec la barre de filtres collante, où le glassmorphisme est permis.**
- **État actif du lien « Propriétés » :** soulignement fin `--blue` (offset), pas de pastille, **`aria-current="page"`** sur le lien.
- **États (tous les éléments cliquables, sans exception) :** liens → soulignement animé `--blue` au hover ; CTA téléphone → hover `--red-deep` + lift léger (`translateY(-1px)`), active → enfoncé léger ; **focus-visible** → anneau `--blue` 2px + offset 2px.
- **Mobile :** logo + bouton téléphone visibles ; liens repliés dans un menu hamburger (panneau crème, hairlines, focus visibles, `aria-expanded` sur le bouton, piège de focus dans le panneau ouvert).

### 2. En-tête de page
- **Fond crème `--bg`.** Padding vertical généreux en haut (`clamp(5rem, 10vw, 9rem)`), un peu moins en bas car la barre de filtres suit. Conteneur 1240px.
- **CSS Grid à zones nommées, asymétrique** (pas de bloc centré) : titre + sous-titre à gauche (≈ 7 colonnes), compteur de résultats aligné en bas à droite (≈ 4 colonnes), un long filet `--line` ferme le bloc et amorce la barre de filtres.
- **Eyebrow rouge :** « INSCRIPTIONS » (Inter 600, UPPERCASE, `0.16em`, `--red`).
- **Titre Archivo display :** « Propriétés » (`clamp(2.75rem, 6vw, 5.5rem)`, 800, `-0.03em`, lh 1.02, `--ink`). **Une seule couleur pleine, jamais de texte en dégradé.**
- **Sous-titre / lead :** « Les inscriptions de Julie Gauthier dans le Grand Montréal. Chaque propriété, présentée avec le soin qu'elle mérite. » (Inter 400, `clamp(1.125rem, 1.6vw, 1.375rem)`, `--ink-2`, mesure ≤ 66ch).
- **Compteur de résultats discret :** « 8 propriétés disponibles » en Inter 500 `0.8125rem`, `--ink-3`, suivi d'une note sobre « Placeholder, données Centris à venir ». Petit, jamais en bloc hero-metric. Marqué en commentaire comme dynamique côté code, avec `aria-live="polite"` pour annoncer la mise à jour du compte au filtrage.
- Reveal doux à l'entrée (opacité + `y: 24px → 0`).

### 3. Barre de filtres
- **Sticky sous la nav** (offset = hauteur de la nav), fond crème `--bg` translucide + hairline `--line` en bas + blur léger au scroll. Épurée, structurée par **filets hairline**, **pas** par des boîtes lourdes ni ombre forte. Conteneur `<form role="search">` avec un libellé global accessible (« Filtrer les propriétés »).
- **Contrôles (gauche → droite), tous en `--paper` ou `--white`, contour hairline `--line`, rayon 8px :**
  - **Type :** Tous · Maison · Condo · Plex · Terrain (select ou groupe de chips pilule).
  - **Fourchette de prix :** select « Prix » (ex. 300 k$–500 k$, 500 k$–750 k$, 750 k$+) ou double-curseur sobre.
  - **Ville / secteur :** select (placeholder : Montréal, Laval, Longueuil, Brossard… « secteur à confirmer »).
  - **Chambres :** chips 1+ · 2+ · 3+ · 4+.
  - **Salles de bain :** chips 1+ · 2+ · 3+.
  - **Statut :** Tous · À vendre · Vendu · Nouveau.
  - **Tri (aligné à droite) :** « Plus récent » · « Prix croissant » · « Prix décroissant ».
- **États (obligatoires) :** repos hairline `--line` ; **hover** → fond `--paper`, filet légèrement plus marqué ; **focus-visible** → anneau `--blue` 2px + offset 2px ; **actif/sélectionné** (chip) → fond `color-mix(in oklch, var(--blue) 12%, var(--bg))`, texte `--blue`, `aria-pressed="true"` sur les chips à bascule, **jamais** bleu Tailwind. Chevron/loupe d'icône en `--blue` ou `--ink-3`.
- **Chips de filtres actifs** (sous la barre) : pilules `--paper` avec « × » pour retirer (bouton avec libellé accessible « Retirer le filtre [X] »), plus un lien texte « Réinitialiser » en `--blue` (soulignement animé).
- **Mobile :** la barre se réduit à un bouton **« Filtres »** (compteur de filtres actifs en petite pastille `--blue`, `aria-expanded`) + le tri ; les contrôles s'ouvrent dans un **panneau / drawer** plein écran crème, hairlines, focus visibles et piégés, bouton « Appliquer » (pilule `--red`) collé en bas.
- **Accessibilité :** chaque champ a un `<label>` associé, navigation clavier complète, état sélectionné annoncé.

### 4. Grille de cartes propriétés (le cœur de la page)
- **Conteneur 1240px**, fond crème. **CSS Grid responsive : 1 colonne (mobile) → 2 (tablette) → 3 (desktop)**, gouttières `clamp(1.25rem, 4vw, 2.5rem)`. Utilise **`subgrid`** pour que la **méta (prix, adresse, ville, ch·sdb·superficie) de toutes les cartes s'aligne ligne par ligne** sur les pistes du parent, peu importe la longueur des titres. Chaque carte expose ses lignes internes en `grid-template-rows` héritées via `subgrid` afin que les cartes au contenu plus court (ex. terrain sans ch/sdb) **conservent l'alignement** : la rangée méta reste réservée, jamais effondrée.
- **Composant carte propriété (réutilisable, structure prête pour le pipeline Centris) — chaque carte :**
  - **Photo en haut** (placeholder `https://placehold.co/800x600`), rayon **2–4px** (éditorial, net), ratio constant (≈ 4:3) via `aspect-ratio`. **`alt` descriptif placeholder obligatoire** (ex. « Photo de la propriété, 124 rue des Érables, Rosemont »), `loading="lazy"`. **Traitement image obligatoire :** overlay **dégradé** discret (transparent en haut → voile `--navy` léger en bas, pour la lisibilité du tag) **+ une fine couche `mix-blend-mode` (multiply/overlay)** teintée `--navy` très légère pour unifier les photos. **Jamais d'`<img>` brut posé.** Au hover : **zoom photo doux** (`scale(1.04)` sur l'image seule, `overflow:hidden`, transition `transform` uniquement, easing `cubic-bezier(0.16,1,0.3,1)`).
  - **Tag de statut** posé en haut à gauche sur la photo, en **pilule**, **trois traitements distincts (jamais trois pastilles identiques)** : **« À vendre » → fond `--red`, texte `--bg`** · **« Vendu » → fond `--navy`, texte `--bg`** · **« Nouveau » → fond `--sky`, texte `--navy`**. Un seul tag par carte. Le statut est aussi porté en texte accessible (pas couleur seule).
  - **Corps de carte** (`--paper`, padding 16–24px) :
    - **Prix en évidence**, **Archivo** 700, `clamp(1.25rem, 2vw, 1.6rem)`, `--ink`, ancre visuelle de la carte (ex. « 749 000 $ »). Format québécois : espace insécable comme séparateur de milliers, « $ » après le nombre.
    - **Adresse / titre** : Inter 600, `--ink` (ex. « 124, rue des Érables »).
    - **Ville** : Inter 500 `0.8125rem`, `--ink-3` (ex. « Rosemont, Montréal »).
    - **Méta sur une ligne, alignée par subgrid** : « 3 ch · 2 sdb · 1 540 pi² », séparateurs « · » discrets, Inter 500 `--ink-2`. Petites icônes trait fin `--blue` facultatives (décoratives, `aria-hidden`). Pour un terrain sans chambre/sdb, méta adaptée (« Terrain · 18 500 pi² ») dans la **même rangée réservée**.
    - **Lien vers la fiche** : « Voir la propriété » en lien texte `--blue` avec soulignement animé (offset), ou flèche `→` qui se déplace au hover. Carte entière cliquable via un vrai `<a>` focusable vers `site/nos-proprietes/{slug}/`, avec libellé explicite (`aria-label="Voir la propriété, 124 rue des Érables"`).
  - **Carte = plan élevé :** `--paper` + `--shadow-sm`, hairline `--line` au repos.
- **Interactions carte (obligatoires) :** **hover** → **lift léger** (`translateY(-4px)`) + passage à `--shadow-md` + zoom photo ; **focus-visible** → anneau `--blue` 2px + offset sur la carte (ou `:focus-within`) ; **active** → lift légèrement réduit. Transitions sur `transform`/`opacity`/`box-shadow` seulement, **jamais `transition-all`, jamais animer le layout.**
- **Reveal au scroll :** cartes `y: 24px → 0` + opacité, **stagger 0.08s** par carte (jamais à l'unisson), léger settle, GSAP `power3.out` / ScrollTrigger + Lenis. `will-change: transform` seulement pendant l'animation.
- **Contenu placeholder : 8 cartes volontairement variées** (statuts, prix, villes, types et longueurs d'adresse différents, pas un clone répété, au moins un de chaque statut) :
  1. « À vendre » · 749 000 $ · 124, rue des Érables · Rosemont, Montréal · 3 ch · 2 sdb · 1 540 pi² (Maison)
  2. « Nouveau » · 524 900 $ · 88, av. du Parc, app. 502 · Plateau-Mont-Royal · 2 ch · 1 sdb · 910 pi² (Condo)
  3. « Vendu » · 1 295 000 $ · 17, place Belvédère · Westmount · 4 ch · 3 sdb · 2 780 pi² (Maison)
  4. « À vendre » · 619 000 $ · 230, rue Sainte-Catherine E · Ville-Marie, Montréal · 2 ch · 2 sdb · 1 120 pi² (Condo)
  5. « À vendre » · 1 050 000 $ · 9, montée des Cèdres · Laval · 5 ch · 3 sdb · 3 200 pi² (Maison)
  6. « Nouveau » · 449 000 $ · 415, boul. Saint-Laurent · Longueuil · 2 ch · 1 sdb · 845 pi² (Condo)
  7. « Vendu » · 875 000 $ · 56, rue des Tilleuls · Brossard · 4 ch · 2 sdb · 2 010 pi² (Plex)
  8. « À vendre » · 389 000 $ · 12, rang du Domaine · secteur à confirmer · Terrain · 18 500 pi² (Terrain, sans ch/sdb)
- Marque tout le contenu chiffré (prix, compteur, méta) comme **placeholder Centris** en commentaire, carte prête à être bouclée sur des données (`site/nos-proprietes/`). Isole clairement le markup d'**une** carte avec un commentaire « composant carte réutilisable · pipeline Centris ».

### 5. Pagination / « Charger plus » + état « aucune propriété »
- **Sous la grille, centré et aéré :** bouton **« Charger plus de propriétés »** en **bouton secondaire** (contour hairline `--line`, texte `--ink`, rayon 8px ; hover → fond `--paper` + lift léger ; active → enfoncé léger ; focus-visible → anneau `--blue`) comme principal. **État de chargement** prévu : libellé « Chargement… » + `aria-busy="true"`, jamais un saut de layout (réserver la hauteur). Variante discrète possible à côté : pagination numérotée (1 · 2 · 3) en liens `--blue`, page courante en `--ink` non cliquable (`aria-current="page"`). Indicateur « 8 sur 8 affichées » en `--ink-3`.
- **État « aucune propriété » élégant** (présent dans le markup, masqué par défaut, clairement marqué « état : aucun résultat ») : bloc crème centré sur `--paper`, hairline, **ballon RE/MAX en petit accent discret** (jamais recoloré, jamais dans une boîte) ou pictogramme fin (trait, pas d'emoji), titre Archivo « Aucune propriété ne correspond. », ligne `--ink-2` « Élargissez votre recherche, ou écrivez à Julie : elle déniche aussi des propriétés hors marché. », bouton secondaire « Réinitialiser les filtres » + lien téléphone `--blue` (`tel:+15148954921`). Calme, jamais une page d'erreur froide.

### 6. Bande CTA
- **Section pleine largeur sur fond sombre `--navy #000E35`**, texte crème `--bg`, padding `clamp(5rem, 10vw, 9rem)`. **Lueur radiale subtile** en fond (dégradé autorisé `#0043FF → #000E35` ou `#FF1200 → #660000`, **très discret**, en lueur de fond seulement, **pas de texte en dégradé**) **+ grain SVG `feTurbulence` léger** : jamais un aplat plat.
- **Layout asymétrique** (pas centré façon SaaS), grille à zones nommées : titre à gauche, actions à droite, séparés par un filet clair `color-mix(in oklch, var(--bg) 16%, transparent)`.
- **Titre Archivo :** « Vous cherchez quelque chose de précis ? » (`clamp(2rem, 4vw, 3.25rem)`, 700, crème, couleur pleine).
- **Sous-texte** Inter `--sky` ou crème adouci : « Dites-moi votre secteur, votre budget et vos incontournables. Je trouve l'adresse qui vous ressemble, souvent avant tout le monde. » Ton chaleureux, jamais pressant.
- **Actions :** **CTA principal rouge** « Parler à Julie » (pilule/bouton `--red`, texte `--bg`, hover `--red-deep` + lift léger, active enfoncé, focus-visible anneau `--blue`) **+ téléphone bien visible** « 514.895.4921 » en lien crème souligné animé (`tel:+15148954921`). **Un seul CTA rouge dans la section.** Ballon RE/MAX possible en très petit accent décoratif, jamais recoloré.

### 7. Pied de page (identique à la page d'accueil)
- **Fond `--navy #000E35`**, texte crème `--bg`. **Logo « REMAX Crystal » blanc** (`crystal-long-blanc.png`) en haut à gauche, ballon en couleur, jamais recoloré.
- **CSS Grid à zones nommées** (pas une seule rangée flex) : colonne marque + coordonnées (téléphone **514.895.4921** en lien crème souligné `tel:+15148954921`, courriel placeholder, secteur « Grand Montréal »), colonne navigation (Accueil · À propos · Services · Propriétés · Contact), colonne réseaux sociaux (icônes fines, placeholders, libellés accessibles).
- **Mentions légales obligatoires :** « Courtière immobilière agréée » · « RE/MAX Crystal » · **« Chaque bureau est indépendant et autonome »**. Filet `--line` clair séparateur, copyright discret `--ink-3` adouci sur navy.
- **États :** liens crème → soulignement animé `--blue`/crème au hover, focus-visible anneau `--blue` 2px + offset.

---

## Motion (global)
- **GSAP + ScrollTrigger + Lenis** (smooth scroll). N'anime **que `transform` et `opacity`**. Easing ressort `cubic-bezier(0.16,1,0.3,1)` ou `power3.out`.
- Nav : passe en mode « élevé » (hairline + blur + `--shadow-sm`) au scroll. Barre de filtres : se colle sous la nav, hairline qui apparaît au scroll.
- Cartes : reveal stagger 0.08s ; hover lift + zoom photo léger. **Rien ne s'arrête sec** (settle/overshoot léger).
- **`prefers-reduced-motion` :** couper parallax/transforms et zoom photo au hover, garder l'opacité ; les cartes apparaissent sans translation.

## Accessibilité
- **Tout élément cliquable a hover + focus-visible + active**, sans exception. **Anneau focus `--blue` 2px + offset 2px** partout.
- Contrastes AA : charbon sur crème, crème sur navy. Tags lisibles (texte `--bg` sur rouge/navy, `--navy` sur `--sky`) ; le statut n'est jamais véhiculé par la couleur seule (texte présent).
- Cartes : un vrai `<a>` focusable par carte ; libellé de lien explicite (« Voir la propriété, 124 rue des Érables »). Filtres : `<label>` associés, `aria-pressed`/`aria-current` selon l'état. Images : `alt` descriptif (icônes décoratives `aria-hidden`). Ordre de tabulation logique : nav → filtres → cartes → charger plus → CTA → pied. Compteur de résultats en `aria-live="polite"`.

## Responsive (mobile-first)
- Tout fluide via **`clamp()` et container queries**, **aucun saut de breakpoint brutal**. Grille cartes 1→2→3 colonnes. Barre de filtres → bouton « Filtres » + drawer sur mobile. Nav → hamburger. Padding et typo continus.

## Bans (à vérifier avant de livrer)
- Pas de `#000` / `#fff` purs (crème + charbon tirés vers la marque).
- **Pas de texte en dégradé** ; emphase par poids/taille, couleur pleine. Les dégradés ne servent qu'en lueur radiale de fond sur les sections sombres.
- **Pas de bleu/indigo Tailwind générique** ; uniquement les hex RE/MAX listés.
- Pas d'ombres plates mono-stop ; toujours en couches teintées bleu.
- Glassmorphisme **uniquement** sur la nav collante et la barre de filtres collante.
- Pas de bloc « hero-metric » SaaS (le compteur de résultats reste discret).
- **Pas de grille de cartes identiques** : statuts, prix, villes, types et longueurs variés.
- Pas de bande de couleur à gauche des cartes ; bordure pleine hairline ou tag de statut.
- **Pas de tirets cadratins (—) dans la copie** : virgules, deux-points, points (« · » autorisé comme séparateur de méta uniquement).
- **Ne jamais recolorer le ballon RE/MAX**, ni le déformer, ni le mettre dans une boîte ; espace libre respecté.
- Rouge + bleu **en accents seulement** (CTA, tags, filets, icônes) : ~90 % crème + charbon. La section CTA sombre (navy) est le seul grand bloc de couleur.
- Jamais `transition-all` ; ne jamais animer le layout (transform/opacity seulement) ; jamais de px figés (toujours `clamp()`).

**Test anti-slop avant de livrer :** (1) Impossible de dire « c'est une IA qui a fait ça ». (2) On ne devine pas la palette à la seule catégorie « immobilier » (pas de bleu/gris corporate générique). La signature = **crème chaud + charbon + l'étincelle rouge/bleu RE/MAX dosée**, beaucoup d'espace, photographie en grand, cartes nettes et réutilisables.

## Livrable
Un seul `index.html` autonome, styles dans `<head>`, polices via Google Fonts ou Bunny (Archivo, Inter ; Fraunces optionnel désactivé), GSAP + ScrollTrigger + Lenis via CDN, images via `https://placehold.co/`. Au moins **une grille CSS à zones nommées** (en-tête de page, bande CTA ou pied) + **`subgrid`** sur la méta des cartes. Code propre, **composant carte clairement isolé et commenté « réutilisable / pipeline Centris »**.


=================================================================
## 3) FICHE PROPRIÉTÉ (détail d'une propriété, template Centris)
=================================================================
Structure inspirée d'une fiche RE/MAX Québec (Bardagi), transposée résidentiel ; rendu 100% notre look.

Génère une page web complète, autonome et haute-fidélité, en un seul fichier `index.html` (tout le CSS dans un `<style>`, tout le JS inline, CDN autorisés : Tailwind optionnel, GSAP + ScrollTrigger + Lenis, Google Fonts pour Archivo + Inter + Fraunces) : la **FICHE D'UNE PROPRIÉTÉ RÉSIDENTIELLE** (page de détail) pour le site de **Julie Gauthier, courtière immobilière agréée chez RE/MAX Crystal** (Grand Montréal). Cette page est un **TEMPLATE RÉUTILISABLE** : `build.mjs` la régénère pour chaque inscription dans `site/nos-proprietes/{slug}/index.html` à partir des fichiers `.TXT` Centris. Construis le gabarit avec des valeurs placeholder résidentielles plausibles et marque CHAQUE zone dynamique par un commentaire HTML qui nomme le fichier Centris source : `<!-- DYNAMIQUE · Centris: FICHIER.TXT · champ(s)… · build.mjs boucle ici -->`, et chaque bloc conditionnel par `<!-- CONDITIONNEL · masqué par build.mjs si absent -->`.

La structure (ORDRE et CHAMPS) s'inspire d'une fiche de courtier RE/MAX Québec (Bardagi) transposée du commercial au résidentiel — **inspiration d'ordre et de champs SEULEMENT, JAMAIS le look**. Le rendu visuel est à **100 % le design system premium-calme de Julie** (crème chaud + charbon + l'étincelle RE/MAX dosée). Surtout PAS le style de Bardagi, surtout PAS un look immobilier générique. Trois exigences se combinent et priment : une **galerie luxe sereine**, un **aside courtière sticky qui convertit**, et une **couverture exhaustive des champs Centris**. Quand deux options s'opposent, tranche toujours vers le **premium calme**.

================================================================
DESIGN SYSTEM — À RESPECTER À LA LETTRE (déjà défini, ne pas réinventer)
================================================================

PALETTE (hex RE/MAX officiels, n'introduis AUCUNE autre couleur) :
- `--bg` crème `#F7F5EE` (fond dominant, jamais blanc pur) · `--paper` `#FCFBF7` (cartes/panneaux surélevés) · `--white` `#FFFFFF` (rare : inputs, surfaces flottantes)
- `--ink` charbon `#1A1A1C` (texte principal, jamais `#000`) · `--ink-2` `#474C57` (secondaire, intros) · `--ink-3` `#8B909B` (méta, captions, placeholders)
- `--line` `color-mix(in oklch, var(--ink) 12%, transparent)` (hairline 1px)
- `--blue` `#0043FF` (liens, icônes, états actifs, anneau focus) · `--blue-deep` `#0C2749` (survols/fonds profonds) · `--navy` `#000E35` (sections sombres : bande CTA, pied de page, scrim visionneuse)
- `--red` `#FF1200` (**L'ÉTINCELLE** : CTA principal, tag « À vendre ») · `--red-deep` `#AA1120` (survol CTA, fin de dégradé) · `--red-dark` `#660000` (fin de dégradé profond) · `--sky` `#A3D4F2` (fonds doux, tag « Nouveau » texte navy)

RÉPARTITION (règle d'or) : **~90 % de la page est crème + charbon.** Rouge/bleu en accents SEULEMENT (CTA, tags, filets, icônes), jamais en grands aplats. **Un seul CTA rouge par section au maximum.** Le bleu est le ton calme (liens/états), le rouge est l'étincelle. JAMAIS de rouge+bleu en grands aplats partout : ça casse le calme.

STATUTS (trois traitements DISTINCTS, pas trois pastilles identiques) :
- À vendre = pilule `--red`, texte crème · Vendu = pilule `--navy`, texte crème · Nouveau = pilule `--sky`, texte `--navy`.

TYPOGRAPHIE (charger Archivo + Inter + Fraunces ; toujours `clamp()`, jamais de px figés par breakpoint) :
- Display/titres → **Archivo** 700/800, `letter-spacing:-0.03em`, `line-height:1.02–1.06`.
- Corps/UI → **Inter** 400/500/600, corps `1.0625rem` `line-height:1.7`, mesure **66ch** max ; intro/lead `clamp(1.125rem,1.6vw,1.375rem)` lh 1.6 en `--ink-2`.
- Accent serif → **Fraunces** réservé STRICTEMENT au **nom « Julie Gauthier »**, aux **citations** et aux **grands chiffres/prix**.
- Échelle : Display h1 `clamp(2.75rem,6vw,5.5rem)` · H2 `clamp(2rem,4vw,3.25rem)` · H3 `clamp(1.25rem,2vw,1.6rem)` · eyebrow `0.75rem` UPPERCASE `letter-spacing:0.16em` en `--red` ou `--blue` · label/méta `0.8125rem` `0.04em`.

ESPACEMENT & LAYOUT (grille 8px : 4·8·12·16·24·32·48·64·96·128) :
- Padding vertical des sections `clamp(5rem,10vw,9rem)`. Conteneur contenu `max-width:1240px` · large `1400px` · texte `720px (~66ch)`. Gouttières `clamp(1.25rem,4vw,2.5rem)`.
- **Au moins une CSS Grid à zones nommées asymétrique** (en-tête fiche + corps 2 colonnes). `subgrid` pour aligner la méta des cartes « propriétés similaires ». Stack CSS moderne bienvenue : container queries (`@container`), propriétés logiques (`margin-inline`/`padding-block`), `oklch()`/`color-mix()`, `@property` pour variables animables, nesting, `@layer`, `backdrop-filter`, grain SVG `feTurbulence`, `mix-blend-mode`.

FORME & PROFONDEUR :
- Rayons : images/feature `2–4px` · cartes `8px` · boutons `8px` · chips/tags pilule `999px`. Tokens `--r-xs:4px` `--r-sm:8px` `--r-md:14px` `--r-pill:999px`.
- Bordures : hairline 1px `--line` (le filet structure plus que l'ombre).
- Ombres en couches teintées bleu, JAMAIS `0 4px 6px rgba(0,0,0,.1)` :
  `--shadow-sm: 0 1px 2px rgba(12,39,73,.06), 0 2px 6px rgba(12,39,73,.05);`
  `--shadow-md: 0 2px 6px rgba(12,39,73,.06), 0 10px 24px rgba(12,39,73,.08), 0 30px 60px rgba(12,39,73,.06);`
- Plans : base (crème) → élevé (cartes `--paper` + `--shadow-sm`) → flottant (nav collante / visionneuse / barre mobile : `--shadow-md` + `backdrop-filter:blur`).

MOTION (GSAP + ScrollTrigger + Lenis via CDN) :
- N'anime QUE `transform` et `opacity`. Jamais `transition-all` ni de propriétés de layout. Easing ressort `cubic-bezier(0.16,1,0.3,1)` ou GSAP `power3.out`.
- Reveals au scroll : `y:24px→0` + opacité, **stagger 0.08s** sur les fratries (vignettes, cartes, lignes de tableau, paires clé/valeur), jamais à l'unisson, léger settle, rien ne s'arrête sec.
- Galerie héro : parallax doux (scale `1.06→1`). Nav transparente en haut → crème + hairline + blur au scroll. `will-change:transform` seulement sur l'élément actif.
- **`prefers-reduced-motion` : coupe parallax/transforms, garde l'opacité.**

ACCESSIBILITÉ (non négociable) :
- HTML sémantique (`<header><nav><main><article><aside><section><table><footer>`), un seul `<h1>` (l'adresse), hiérarchie correcte. Landmarks. `aria-current` sur le fil d'Ariane.
- TOUT élément interactif a hover + `:focus-visible` (anneau `--blue` 2px, offset 2px) + active. Cibles tactiles **≥ 44px**. `<label>` associé (`for`/`id`) à chaque champ. `alt` descriptifs. Contraste AA partout (crème sur navy, charbon sur crème).
- Visionneuse photos pilotable au clavier (`←`/`→` naviguent, `Échap` ferme), **focus trap**, `role="dialog"` `aria-modal="true"`, `aria-live="polite"` annonçant « Photo 3 sur 32 », retour du focus au déclencheur à la fermeture, scroll du body verrouillé.
- Tableau des pièces en `<table>` sémantique (`<caption class="sr-only">`, `<thead>`, `<th scope="col">`, groupes par étage). `aria-expanded` sur « Lire plus » et les accordéons. Slider de la calculatrice accessible au clavier, avec `aria-valuetext` lisant le format québécois.

================================================================
BANS — NE LIVRE JAMAIS ÇA (vérifie chaque point avant de finir)
================================================================
- Pas de `#000` ni `#fff` purs → crème + charbon tirés vers la marque.
- Pas de **texte en dégradé** → couleur pleine ; l'emphase passe par le poids/la taille.
- Pas de bleu/indigo Tailwind par défaut (indigo-500, blue-600…) → uniquement les hex RE/MAX listés.
- Pas d'**ombres plates mono-stop** → toujours en couches teintées bleu.
- Pas de **glassmorphisme** partout → blur rare et intentionnel (nav, visionneuse, barre mobile seulement).
- Pas de bloc « **hero-metric** » SaaS (énorme chiffre + mini label + accent dégradé).
- Pas de **grilles de cartes identiques** (même icône/titre/texte répétés) → varie les traitements.
- Pas de **bandes de couleur à gauche** des cartes/encadrés/caractéristiques → bordure pleine, teinte douce, ou numéro de tête.
- Pas de **tirets cadratins (—) dans la copie** → virgules, deux-points, points (y compris dans Rénovations : écris « 2019 · Réfection de la toiture », jamais « 2019 — … »). Le séparateur visuel des stats et listes est le point médian « · », jamais le tiret cadratin.
- Ne **jamais recolorer le ballon RE/MAX**, le mettre dans une boîte, ni le déformer ; espace libre respecté.
- Pas de rouge + bleu en grands aplats partout → accents seulement, le calme d'abord.
- Pas de px figés sur les polices, pas de `transition-all`, ne pas animer le layout.
- Pas d'`<img>` brut posé tel quel → toujours overlay dégradé + couche `mix-blend-mode`. Aucune dépendance externe pour la carte de localisation (placeholder maison, pas d'iframe Google Maps).

================================================================
LOGOS & ASSETS
================================================================
- Nav (fond clair) : logo **REMAX Crystal NOIR** (`brand_assets/crystal-long-noir.png`, `alt="RE/MAX Crystal"`), hauteur ~28px. Pied de page (fond navy) : **REMAX Crystal BLANC** (`brand_assets/crystal-long-blanc.png`). Aside courtière : petit lockup REMAX Crystal noir.
- Portrait de Julie : extrait de `brand_assets/brand.png` (sinon `https://placehold.co/200x200` marqué placeholder).
- Ballon RE/MAX : accent décoratif petit uniquement, JAMAIS recoloré/encadré/déformé.
- Photos propriété : `https://placehold.co/1200x800` (principale), `https://placehold.co/600x400` (vignettes), toutes marquées « placeholder Centris » ; `build.mjs` les remplacera par `PHOTOS.TXT`.

================================================================
COPIE PLACEHOLDER (français québécois, vouvoiement ; valeurs résidentielles plausibles marquées « placeholder Centris »)
================================================================
Propriété d'exemple : **742, rue des Lilas**, quartier **Rosemont**, Montréal (Québec) **H1X 2P4** · **879 000 $** · **Maison à étages** · statut **À vendre** · **4 chambres · 2 salles de bain · 1 salle d'eau** · **2 100 pi²** habitable · **terrain 4 500 pi²** · construite en **2008** · **No Centris 12345678**.
Format québécois des nombres partout : **espace insécable** comme séparateur de milliers, signe **« $ » APRÈS** le montant (ex. « 879 000 $ »), « /an » discret en `--ink-3`, « pi² » pour les superficies. Aucun tiret cadratin dans la copie, le séparateur en ligne est le point médian « · ».

================================================================
STRUCTURE DE LA PAGE — SECTION PAR SECTION, DE HAUT EN BAS
================================================================

### 1. NAV COLLANTE (identique aux autres pages — `<header><nav>`)
- À gauche : logo **REMAX Crystal noir** (`crystal-long-noir.png`, ~28px). Centre/droite : liens `Accueil · À propos · Propriétés · Services · Contact` (texte, soulignement animé en offset au hover, `:focus-visible`). Tout à droite : **CTA téléphone en pilule rouge `--red`** « 514.895.4921 » (`href="tel:+15148954921"`, hover `--red-deep` + lift léger).
- Mobile : **hamburger** ≥ 44px → panneau plein écran crème, focus trap, fermeture `Échap`.
- Comportement : transparente en haut → fond crème + hairline bas + `backdrop-filter:blur` au scroll (plan flottant `--shadow-md`).

### 2. FIL D'ARIANE + RETOUR (`<nav aria-label="Fil d'Ariane">`)
- `Accueil › Propriétés › 742, rue des Lilas` (dernier en `aria-current="page"`, non cliquable, `--ink-3` ; les autres `--ink`, liens avec hover + `:focus-visible`). À droite, lien retour **« ← Toutes les propriétés »** (`/nos-proprietes/`, `--blue`, soulignement animé au hover, `:focus-visible`).
<!-- DYNAMIQUE · Centris: INSCRIPTIONS.TXT · adresse/slug du dernier crumb · build.mjs -->

### 3. GALERIE PHOTOS — mosaïque héro luxe + visionneuse plein écran (la galerie doit respirer la sérénité, grande photographie en vedette)
<!-- DYNAMIQUE · Centris: PHOTOS.TXT · N photos (src + alt), compteur = nombre · build.mjs boucle ici -->
- **Mosaïque héro** en CSS Grid à zones nommées : **1 grande photo principale** (zone `hero`, ~⅔, rayon 2–4px) + **4 vignettes** (grille 2×2, droite). Traitement image obligatoire (jamais d'`<img>` brut) : overlay dégradé léger vers `--navy` transparent en bas + couche `mix-blend-mode` douce pour unifier le ton ; `object-fit:cover` ; `alt` descriptif placeholder (« Façade avant de la propriété », « Cuisine », etc., remplacés par PHOTOS.TXT).
- **Tag de statut** posé en haut-gauche de la grande photo : pilule **« À vendre » `--red`** texte crème (placeholder Centris). Prévoir en commentaire les variantes Vendu `--navy` / Nouveau `--sky` texte navy, traitements distincts.
<!-- CONDITIONNEL · Centris: INSCRIPTIONS.TXT · statut (À vendre / Vendu / Nouveau) · build.mjs choisit la variante de pilule -->
- **Bouton flottant** bas-droite de la mosaïque : **« Voir les 32 photos »** (secondaire, contour hairline, icône grille) + variante **« Plein écran »**. Cibles ≥ 44px, `:focus-visible`. Le « 32 » est dynamique (= nombre de photos PHOTOS.TXT).
- **VISIONNEUSE PLEIN ÉCRAN (lightbox accessible)** déclenchée par les boutons ou un clic sur une photo : scrim `--navy` ~96 % + `backdrop-filter:blur`, `role="dialog"` `aria-modal="true"` `aria-label="Galerie photos"`, carrousel image centrée (overlay + mix-blend), **compteur « 3 / 32 »** (Inter méta), flèches précédent/suivant (≥ 44px), bande de **vignettes** cliquables en bas (active soulignée `--blue`), bouton fermer ✕ haut-droite (≥ 44px). **Clavier : `←`/`→` naviguent, `Échap` ferme. Focus trap** (Tab/Shift-Tab bouclent dans la modale), `aria-live="polite"` « Photo 3 sur 32 », retour du focus au déclencheur à la fermeture, scroll du body verrouillé. `prefers-reduced-motion` : transitions en opacité seulement.

### 4. EN-TÊTE FICHE (`<section>` — CSS Grid à zones nommées asymétrique : `info` large + `prix` aside)
<!-- DYNAMIQUE · Centris: INSCRIPTIONS.TXT (adresse, ville, CP, prix, type, no Centris, statut) + CARACTERISTIQUES.TXT (ch, sdb, salles d'eau, superficies, année) · build.mjs -->
- **Gauche (`info`)** : eyebrow rouge UPPERCASE « À VENDRE · ROSEMONT ». **Adresse en Archivo display** (`<h1>`) « 742, rue des Lilas », sous-ligne Inter `--ink-2` « Rosemont, Montréal (Québec) H1X 2P4 ». **Badge type** sobre (pilule contour hairline, pas rouge) « Maison à étages ». **No Centris** discret méta `--ink-3` « No Centris 12345678 ». **Stats rapides** en ligne, séparées par de fines barres verticales `--line` (PAS des cartes, PAS un bloc hero-metric) : « 4 chambres · 2 salles de bain · 1 salle d'eau · 2 100 pi² habitable · terrain 4 500 pi² · 2008 », icônes monoline `--ink-2` optionnelles et discrètes.
- **Droite (`prix`, aside)** : label discret « Prix demandé » au-dessus, **prix en évidence** « 879 000 $ » (Archivo grand, ou Fraunces pour le grand chiffre ; format québécois). Méta discrète sous le prix « Évaluation municipale 770 000 $ » (placeholder). **Actions rapides :** **« Planifier une visite »** (primaire ROUGE, ≥ 44px, un seul rouge ici) · **« Demande d'information »** (secondaire contour hairline) · **« Ajouter aux favoris »** (bouton-icône cœur, `aria-pressed`, libellé `aria-label`) · **« Partager »** (bouton-icône, `aria-label`). Tous : hover + `:focus-visible` + active.

### 5. CORPS — CSS Grid 2 colonnes à zones nommées (desktop ~8fr `contenu` / ~4fr `aside`). Mobile : une colonne ; l'aside courtière devient **barre d'action collante en bas**.

#### CONTENU (colonne gauche, `<article>`)

**a. Description**
<!-- DYNAMIQUE · Centris: ADDENDA.TXT + REMARQUES.TXT · build.mjs -->
- H2 « Description ». Texte chaleureux, vouvoiement, mesure **66ch**, `line-height:1.7`, premier paragraphe en lead `--ink-2`. **« Lire la suite »** (bouton texte bleu, `aria-expanded`) si > ~6 lignes (déplie via `grid-template-rows: 0fr→1fr` ou max-height, animation `transform`/`opacity` acceptable, jamais d'animation de layout brutale).
- Placeholder Centris : « Nichée sur une rue paisible et bordée d'arbres au cœur de Rosemont, cette maison à étages vous accueille dans une lumière douce et constante. Les espaces de vie ouverts invitent aux grands soupers, pendant que l'étage réserve quatre chambres généreuses, dont une suite parentale avec salle de bain attenante. Le sous-sol aménagé offre une pièce familiale polyvalente. À distance de marche des parcs, des écoles et de la station de métro de la ligne bleue. »

**b. Caractéristiques** (grille clé/valeur épurée en hairlines, PAS de bandes colorées à gauche)
<!-- DYNAMIQUE · Centris: CARACTERISTIQUES.TXT · paires clé/valeur (boucle) · build.mjs -->
- H2 « Caractéristiques ». 2 colonnes desktop / 1 mobile, chaque ligne séparée par un filet `--line` bas : **clé** en label méta `--ink-3`, **valeur** en `--ink` Inter 500.
- Paires (placeholder Centris) : Genre de propriété · Résidentiel unifamilial · Type de bâtiment · À étages, isolé · Année de construction · 2008 · Superficie habitable · 2 100 pi² · Superficie du terrain · 4 500 pi² · Stationnement · Garage (1) + allée (2) · Mode de chauffage · Plinthes électriques et plancher radiant · Énergie · Électricité · Eau / Égouts · Municipal · Fenestration · PVC · Revêtement · Brique et fibrociment · Toiture · Bardeaux d'asphalte (2019) · Sous-sol · Aménagé, 6 pi et plus · Nombre de pièces · 10 · Chambres · 4 · Salles de bain · 2 · Salles d'eau · 1 · Mode d'occupation · Propriétaire-occupant · Disponibilité · 60 jours après l'acte · Zonage · Résidentiel.
- Mobile : accordéon possible (`<details>`/`<summary>` accessibles, `summary` ≥ 44px, `aria-expanded` géré nativement).

**c. Pièces** (`<table>` sémantique accessible)
<!-- DYNAMIQUE · Centris: PIECES_UNITES.TXT · pièces groupées par niveau (boucle) · build.mjs -->
- H2 « Les pièces ». `<table>` avec `<caption class="sr-only">Détail des pièces par étage</caption>`, `<thead>` `<th scope="col">` : **Pièce · Dimensions · Niveau · Revêtement de sol**, corps groupé par étage (ligne de groupe via `<th scope="colgroup">` ou ligne de section stylée, pas de bande colorée gauche) : **Rez-de-chaussée / Étage / Sous-sol**. Zébrure très subtile (`--paper` une ligne sur deux) + filets `--line`.
- Lignes placeholder Centris :
  - *Rez-de-chaussée* : Hall d'entrée · 2,1 × 1,8 m · RDC · Céramique | Cuisine · 4,3 × 3,6 m · RDC · Bois franc | Salle à manger · 3,8 × 3,3 m · RDC · Bois franc | Salon · 5,2 × 4,1 m · RDC · Bois franc | Salle d'eau · 1,6 × 1,4 m · RDC · Céramique.
  - *Étage* : Chambre principale · 4,6 × 4,0 m · Étage · Bois franc | Salle de bain attenante · 3,0 × 2,4 m · Étage · Céramique | Chambre 2 · 3,6 × 3,2 m · Étage · Bois franc | Chambre 3 · 3,4 × 3,0 m · Étage · Bois franc | Salle de bain · 2,8 × 2,2 m · Étage · Céramique.
  - *Sous-sol* : Chambre 4 · 3,8 × 3,3 m · Sous-sol · Plancher flottant | Salle familiale · 6,0 × 4,5 m · Sous-sol · Plancher flottant | Rangement · 3,0 × 2,5 m · Sous-sol · Béton.
- Mobile : conteneur `role="region"` `aria-label="Tableau des pièces"` `tabindex="0"` en **scroll horizontal** (`overflow-x:auto`) OU empilement en cartes ; garde TOUJOURS la sémantique `<table>`.

**d. Inclusions / Exclusions** (deux listes claires)
<!-- DYNAMIQUE · Centris: REMARQUES.TXT · inclusions / exclusions · build.mjs -->
- H2 « Inclusions et exclusions ». Deux `<ul>` côte à côte (desktop) / empilés (mobile), titres H3 « Inclusions » / « Exclusions », puces sobres (petit filet ou point `--ink-3`, pas de coches criardes, pas de bande colorée).
- Inclusions (placeholder Centris) : Réfrigérateur, cuisinière, lave-vaisselle, luminaires, stores et toiles, thermopompe murale, abri d'auto. Exclusions : Laveuse et sécheuse, rideaux du salon, support TV mural, effets personnels des vendeurs.

**e. Sommaire financier** (sobre, sous-cartes `--paper` `--shadow-sm` / mini-tableaux, PAS de bandes colorées ; format québécois partout)
<!-- DYNAMIQUE · Centris: DEPENSES.TXT (+ INSCRIPTIONS.TXT) · build.mjs -->
- H2 « Sommaire financier ». Trois sous-blocs :
  1. **Évaluation municipale 2026** : Terrain 312 000 $ · Bâtiment 458 000 $ · **Total 770 000 $**.
  2. **Taxes** : Municipales 5 240 $ /an · Scolaires 612 $ /an · **Total 5 852 $ /an**.
  3. **Dépenses annuelles** : Énergie (électricité) 2 180 $ · Assurances 1 320 $ · Déneigement 480 $.
- Le **Total** en Inter 600 `--ink`, lignes en hairlines. « /an » discret `--ink-3`. Montants alignés à droite, format québécois (espace insécable, « $ » après).
<!-- CONDITIONNEL · Centris: DEPENSES.TXT · ligne « Frais de copropriété » (mensuels) affichée seulement si la propriété est un condo, sinon masquée par build.mjs -->

**f. Rénovations** (conditionnel)
<!-- CONDITIONNEL · Centris: RENOVATIONS.TXT · section masquée par build.mjs si vide -->
- H2 « Rénovations ». Liste **année · description** en filets (année de tête en `--ink` Inter 600, pas de bande colorée gauche, pas de tiret cadratin) : 2019 · Réfection complète de la toiture · 2021 · Cuisine repensée (armoires, comptoir quartz) · 2023 · Salle de bain de l'étage rénovée.

**g. Localisation** (placeholder maison, AUCUNE dépendance externe)
<!-- DYNAMIQUE · Centris: INSCRIPTIONS.TXT · quartier/ville pour la légende et la note · build.mjs -->
- H2 « Le quartier ». Bloc carte **placeholder** : rectangle `--paper`, rayon `--r-sm` (8px), hairline `--line`, hauteur ~320px (ratio ~16:9), libellé centré `--ink-3` **« Carte, Rosemont (placeholder) »** + petit repère/épingle stylé monoline (pas d'iframe, pas de Google Maps, aucune dépendance externe). Sous la carte, lien texte bleu **« Vue de la rue »** (placeholder, `aria-disabled="true"` ou ancre inerte, `:focus-visible`) + courte **note quartier** (66ch) : écoles primaires et secondaires à distance de marche, station de métro de la ligne bleue à 600 m, épiceries, cafés et parc Maisonneuve à proximité.

**h. Visite libre** (conditionnel)
<!-- CONDITIONNEL · Centris: VISITES_LIBRES.TXT · section masquée par build.mjs si aucune visite -->
- Encadré `--paper` doux, hairline : eyebrow bleu « VISITE LIBRE », date/heure en Archivo H3 « Dimanche 13 avril, de 14 h à 16 h » (placeholder Centris), ligne d'adresse, pictogramme calendrier monoline + CTA secondaire **« M'inscrire à la visite »** (garde un seul rouge dominant par section : ici le CTA reste secondaire pour ne pas concurrencer le rouge de l'aside).

#### ASIDE STICKY (colonne droite, `<aside>` `position:sticky; top:~96px`) — devient **barre d'action collante en bas** sur mobile. C'est le moteur de conversion : il doit rester présent, lisible et calme.

**Carte courtière Julie** (`--paper` `--shadow-sm`, rayon 8px, hairline)
<!-- STATIQUE · courtière Julie Gauthier (réel, identique sur toutes les fiches) -->
- **Portrait** de Julie (`brand_assets/brand.png` ; sinon `https://placehold.co/200x200`, `alt="Julie Gauthier, courtière immobilière agréée"`), overlay léger + mix-blend doux, rond ou rayon 4px. **Nom « Julie Gauthier »** en **Fraunces**. Sous-titre Inter méta « Courtière immobilière agréée · RE/MAX Crystal ». **Téléphone bien visible** « 514.895.4921 » cliquable (`href="tel:+15148954921"`, icône téléphone monoline, `--blue`). Boutons pleine largeur : **« Planifier une visite »** (primaire ROUGE) + **« Demande d'information »** (secondaire contour hairline). Lien courriel discret « Écrire à Julie » (`mailto:` placeholder). **Logo REMAX Crystal noir** discret en pied de carte (`crystal-long-noir.png`, ~22px), ballon jamais recoloré ni encadré.

**Formulaire court contextualisé** (`<form>`, surfaces inputs `--white`)
<!-- DYNAMIQUE · adresse + No Centris injectés dans le message pré-rempli et les champs cachés · build.mjs -->
- Titre H3 « Cette propriété vous intéresse ? ». `<label>` associé (`for`/`id`) à CHAQUE champ : Nom, Courriel, Téléphone, Message (pré-rempli « Bonjour, je souhaite en savoir plus sur le 742, rue des Lilas (No Centris 12345678). »). **Rappel discret** « Au sujet de : 742, rue des Lilas · No 12345678 » + `<input type="hidden">` pour adresse et noCentris. Case **consentement** obligatoire (case + `<label>` cliquable court « J'accepte d'être contacté(e) au sujet de cette propriété »). Bouton submit « Envoyer ma demande » (secondaire pour éviter deux rouges qui se battent avec le CTA de la carte). Validation HTML5 (`required`, `type=email`, `type=tel`). Anneau focus `--blue` 2px offset 2px sur chaque champ.

**Calculatrice hypothécaire** (sobre, optionnelle, indicative)
<!-- STATIQUE · calculatrice indicative (aucune donnée Centris ; le prix initial vient d'INSCRIPTIONS.TXT) -->
- Encadré `--paper` hairline, eyebrow « ESTIMATION », H3 « Estimation des paiements ». Champs avec `<label>` : Prix (pré-rempli 879 000 $), Mise de fonds (% slider/input, défaut 20 %), Taux annuel (% input, défaut 5,25 %), Amortissement (select 25 ans). **Sortie : « Paiement mensuel estimé »** en grand chiffre (Archivo ou Fraunces), recalculé en direct (JS, formule d'annuité standard, anime opacity seulement, format québécois avec espace insécable et « $ » après). Mention `--ink-3` « À titre indicatif seulement. Ne constitue pas une offre de financement. » Slider accessible au clavier (flèches), `:focus-visible`, `aria-valuetext` lisant la valeur formatée.

### 6. BANDE CTA — section sombre `--navy` `#000E35`
<!-- STATIQUE · CTA conversion -->
- Pleine largeur, texte crème `--bg`. Titre Archivo « Intéressé par cette propriété ? » + sous-ligne courte rassurante. **Un seul CTA « Planifier une visite »** (rouge `--red`) + **téléphone bien visible** « 514.895.4921 » (`tel:`) en lien crème souligné, icône monoline. **Lueur radiale subtile** en fond (une seule, très douce : `#FF1200→#660000` OU `#0043FF→#000E35`) + **grain SVG `feTurbulence`** léger en overlay. Pas de grand aplat rouge, pas de texte en dégradé. Logo REMAX Crystal blanc discret possible. Contraste AA du texte crème sur navy.

### 7. PROPRIÉTÉS SIMILAIRES — 3 cartes RÉUTILISANT EXACTEMENT le composant carte de la page Propriétés
<!-- DYNAMIQUE · Centris: INSCRIPTIONS.TXT + PHOTOS.TXT · 3 inscriptions voisines (même quartier / fourchette de prix) · build.mjs boucle ici -->
- H2 « D'autres propriétés à découvrir ». 3 cartes : photo (overlay dégradé + `mix-blend-mode`, jamais d'`<img>` brut), **tag de statut** (traitements distincts À vendre/Vendu/Nouveau), **prix en Archivo**, adresse, ville, méta « ch · sdb · pi² » alignée via **`subgrid`** sur les pistes du parent. Hover : lift léger + filet rouge bas. `:focus-visible` sur la carte entière (lien `../{slug}/`, cible ≥ 44px). Cartes variées (statuts distincts), pas trois clones identiques.
- Placeholder Centris : 2 312, av. du Parc-Royal, Rosemont · 749 000 $ · 3 ch · 1 sdb · 1 680 pi² · « À vendre » | 56, rue Hochelaga, Mercier · 624 000 $ · 4 ch · 2 sdb · 1 920 pi² · « Nouveau » | 410, rue Beaubien Est, Petite-Patrie · 998 000 $ · 5 ch · 3 sdb · 2 540 pi² · « Vendu ».

### 8. PIED DE PAGE — identique aux autres pages (`<footer>` fond `--navy`)
<!-- STATIQUE · pied de page commun -->
- **Logo REMAX Crystal BLANC** (`crystal-long-blanc.png`, `alt="RE/MAX Crystal"`), ballon jamais recoloré ni encadré. Colonnes : coordonnées (Julie Gauthier, « Courtière immobilière agréée », téléphone `tel:`, courriel `mailto:`, secteur « Grand Montréal »), liens de navigation, réseaux sociaux (icônes monoline, `aria-label`, `:focus-visible`). Mentions légales en méta clair : **« Courtière immobilière agréée »** et **« Chaque bureau est indépendant et autonome. »** Hairline de séparation, texte crème, méta éclairci pour le contraste AA sur navy. Lueur radiale + grain SVG discrets.

================================================================
RESPONSIVE (mobile-first)
================================================================
- **Aside courtière → barre d'action collante en bas** sur mobile (`position:fixed; bottom:0`, plan flottant `--shadow-md` + `backdrop-filter:blur`, `padding-bottom:env(safe-area-inset-bottom)`, hauteur ≥ 56px) : à gauche **prix « 879 000 $ »**, à droite **« Planifier une visite » (rouge)** + icône **téléphone** (`tel:`, ≥ 44px). La carte courtière complète + formulaire + calculatrice se replacent dans le flux du contenu plus bas (ne pas les dupliquer : la barre mobile ne contient que prix + visite + téléphone).
- **Galerie** : mosaïque → une grande photo **swipeable** (scroll-snap horizontal) + bouton « Voir les 32 photos », visionneuse tactile (swipe), boutons ≥ 44px.
- **En-tête** : adresse puis prix empilés, actions rapides pleine largeur ou en ligne scrollable.
- **Caractéristiques** : accordéon `<details>` possible. **Tableau pièces** : scroll horizontal (région focusable `tabindex="0"`) ou empilé en cartes, sémantique `<table>` conservée.
- Tout fluide via `clamp()` / container queries, pas de sauts de breakpoint. Cibles ≥ 44px partout. Vérifie que la barre d'action mobile ne masque pas le pied de page (réserve d'espace en bas du `<main>`).

================================================================
SORTIE & QA
================================================================
Un seul fichier `index.html` autonome, valide, prêt à servir sur `localhost`, mobile-first, prêt à être bouclé par `build.mjs` dans `site/nos-proprietes/{slug}/`. Conserve les commentaires `<!-- DYNAMIQUE · Centris: … -->` et `<!-- CONDITIONNEL · … -->` sur chaque zone à boucler. Copie 100 % en français québécois (vouvoiement), tous les nombres au format québécois (espace insécable, « $ » après), aucun tiret cadratin (séparateur en ligne = point médian « · »). Fais au moins 2 passes de QA par captures d'écran (localhost) et corrige les écarts.

Avant de finir, confirme point par point : (1) visionneuse photos pilotable au clavier ←/→/Échap + focus trap + retour focus + `aria-live` « Photo N sur M » ; (2) `<table>` sémantique des pièces avec `<caption>`/`<thead>`/`scope`, groupée par étage ; (3) états hover + `:focus-visible` + active sur TOUT élément interactif, cibles ≥ 44px ; (4) format monétaire québécois partout (espace insécable, « $ » après) ; (5) ballon RE/MAX jamais recoloré/encadré/déformé, logo noir sur clair / blanc sur navy ; (6) aside courtière sticky (desktop) et barre d'action collante prix + visite + téléphone (mobile), sans duplication ; (7) galerie luxe sereine, grande photographie en vedette ; (8) couverture exhaustive des champs Centris (chaque bloc mappé à son fichier `.TXT` en commentaire) ; (9) ~90 % crème + charbon, rouge/bleu en accents seulement, un seul CTA rouge par section ; (10) aucun ban enfreint (pas de `#000`/`#fff`, pas de texte dégradé, pas d'ombres plates, pas de bandes colorées à gauche, pas de glassmorphisme hors nav/visionneuse/barre, pas d'`<img>` brut, pas de `transition-all`, pas d'animation de layout, pas de px figés sur les polices).
