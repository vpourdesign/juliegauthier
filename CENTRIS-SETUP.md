# CENTRIS-SETUP.md — Intégration des propriétés Centris (Julie Gauthier)

Procédure pour brancher les inscriptions Centris de Julie Gauthier sur son site, avec
rafraîchissement **automatique toutes les 24 h** via GitHub Actions.
Copié et adapté du setup éprouvé de `JACQUESROUSSEL/`.

---

## Vue d'ensemble du pipeline

```
DriveHQ (WebDAV)          GitHub Actions (cron 1×/jour)         Site
┌────────────────┐        ┌──────────────────────────┐        ┌──────────────┐
│ VPOURDESIGN     │  pull  │ 1. fetch-centris.mjs      │ build  │ site/        │
│ YYYYMMDD.zip    │ ─────► │    → dézippe dans         │ ─────► │  nos-        │
│ (export Centris │        │      _centris/            │        │  proprietes/ │
│  quotidien)     │        │ 2. node build.mjs         │ commit │  data/       │
└────────────────┘        │ 3. git commit + push      │ ─────► └──────────────┘
                          └──────────────────────────┘
```

1. **Centris** dépose chaque jour un export complet (zip de fichiers `.TXT`) sur un
   espace **DriveHQ** accessible en **WebDAV**. Le fichier est nommé
   `VPOURDESIGN<YYYYMMDD>.zip` (préfixe = nom du compte agence VPOURDESIGN, pas le client).
2. Un **workflow GitHub** se déclenche tous les jours, télécharge le zip du jour
   (ou le plus récent des 14 derniers jours), l'extrait dans `_centris/`, relance le
   build du site, puis **commit + push** les pages mises à jour.
3. Le `build.mjs` parse les `.TXT` Centris et génère les pages de propriétés statiques.

---

## Pièces à copier de JACQUESROUSSEL

| Fichier | Rôle | À adapter pour Julie ? |
|---|---|---|
| `scripts/fetch-centris.mjs` | Télécharge + extrait le zip Centris | Non (générique) |
| `.github/workflows/daily-centris.yml` | Cron quotidien : fetch → build → commit | Oui (email du bot) |
| `build.mjs` | Parse Centris + génère le site | Oui (courtier, territoire, calendrier) |
| `_centris/` | Données extraites (généré, ne pas commit à la main) | — |

---

## Étape 1 — Le script de fetch : `scripts/fetch-centris.mjs`

Télécharge le zip Centris du jour depuis DriveHQ (WebDAV) et l'extrait dans `_centris/`.
Recule jour par jour jusqu'à 14 jours en arrière si le zip du jour n'est pas encore déposé.

```js
// Télécharge le zip Centris du jour depuis DriveHQ (WebDAV) + extrait dans _centris/
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const USER = process.env.DRIVEHQ_USER;
const PASS = process.env.DRIVEHQ_PASS;
const BASE = process.env.DRIVEHQ_WEBDAV_URL;
if (!USER || !PASS || !BASE) {
  console.error('Missing DRIVEHQ_USER / DRIVEHQ_PASS / DRIVEHQ_WEBDAV_URL');
  process.exit(1);
}

// Construit YYYYMMDD pour un Date donné dans le fuseau America/Toronto
function ymd(d) {
  const t = new Date(d.toLocaleString('en-US', { timeZone: 'America/Toronto' }));
  return `${t.getFullYear()}${String(t.getMonth()+1).padStart(2,'0')}${String(t.getDate()).padStart(2,'0')}`;
}

const baseUrl = BASE.replace(/\/$/, '');
const tmp = path.join(process.cwd(), '_tmp.zip');

// Essaie le zip du jour, puis recule jour par jour jusqu'à 14 jours en arrière.
const MAX_DAYS_BACK = 14;
let fetched = false;
const now = new Date();

for (let offset = 0; offset <= MAX_DAYS_BACK; offset++) {
  const d = new Date(now.getTime() - offset * 86400000);
  const fileName = `VPOURDESIGN${ymd(d)}.zip`;
  const url = `${baseUrl}/${fileName}`;
  process.stdout.write(`Trying ${fileName} … `);
  try {
    execSync(`curl -fsSL --user "${USER}:${PASS}" -o "${tmp}" "${url}"`, { stdio: 'pipe' });
    console.log(`✓ téléchargé (offset J-${offset})`);
    fetched = true;
    break;
  } catch {
    console.log('× non disponible');
  }
}

if (!fetched) {
  console.error(`Aucun zip VPOURDESIGN*.zip trouvé dans les ${MAX_DAYS_BACK} derniers jours.`);
  process.exit(1);
}

// Extract
fs.rmSync('_centris', { recursive: true, force: true });
fs.mkdirSync('_centris', { recursive: true });
execSync(`unzip -q -o "${tmp}" -d _centris`, { stdio: 'inherit' });
fs.unlinkSync(tmp);

console.log('Centris zip extracted into _centris/');
```

**Note :** le préfixe du zip reste `VPOURDESIGN` (compte agence Centris commun à tous les
clients). Si Julie a son propre export sous un autre préfixe, ajuster la ligne
`` const fileName = `VPOURDESIGN${ymd(d)}.zip` ``.

---

## Étape 2 — Le workflow GitHub : `.github/workflows/daily-centris.yml`

Déclenche tous les jours à **12 h UTC** (`cron: '0 12 * * *'`, soit ~7 h/8 h heure du
Québec) — et manuellement via `workflow_dispatch`.

```yaml
name: Daily Centris ingest

on:
  schedule:
    - cron: '0 12 * * *'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  rebuild:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Fetch Centris zip
        env:
          DRIVEHQ_USER: ${{ secrets.DRIVEHQ_USER }}
          DRIVEHQ_PASS: ${{ secrets.DRIVEHQ_PASS }}
          DRIVEHQ_WEBDAV_URL: ${{ secrets.DRIVEHQ_WEBDAV_URL }}
        run: node scripts/fetch-centris.mjs

      - name: Build site
        run: |
          rm -rf site/nos-proprietes site/data
          node build.mjs

      - name: Commit updated site
        run: |
          git config user.name "centris-bot"
          git config user.email "bot@juliegauthier.com"   # ← adapter au domaine de Julie
          git add site/
          if git diff --cached --quiet; then
            echo "No site changes today"
          else
            git commit -m "data: daily Centris refresh $(date -u +%Y-%m-%d)"
            git push
          fi
```

**À adapter pour Julie :**
- `user.email` du bot → domaine de Julie.
- Le `cron` peut rester identique. Pour changer l'heure : `'0 12 * * *'` = 12 h UTC.

---

## Étape 3 — Secrets GitHub à configurer

Dans le repo de Julie sur GitHub : **Settings → Secrets and variables → Actions →
New repository secret**. Créer les trois secrets lus par `fetch-centris.mjs` :

| Secret | Contenu |
|---|---|
| `DRIVEHQ_USER` | Identifiant du compte DriveHQ |
| `DRIVEHQ_PASS` | Mot de passe DriveHQ |
| `DRIVEHQ_WEBDAV_URL` | URL WebDAV du dossier où Centris dépose les zips (ex. `https://webdav.drivehq.com/.../`) |

> Les mêmes identifiants DriveHQ servent déjà pour JACQUESROUSSEL (compte agence
> VPOURDESIGN). Réutiliser les valeurs existantes sauf si Julie a un dépôt distinct.

---

## Étape 4 — Données Centris dans `_centris/`

Une fois le zip extrait, `_centris/` contient les fichiers `.TXT` Centris
(encodage **windows-1252**, séparateur CSV) lus par `build.mjs` :

```
INSCRIPTIONS.TXT          ← fiches d'inscription (le cœur)
PHOTOS.TXT                ← photos par inscription
ADDENDA.TXT               ← descriptions longues
CARACTERISTIQUES.TXT      ← caractéristiques
REMARQUES.TXT             ← remarques
PIECES_UNITES.TXT         ← pièces
DEPENSES.TXT  RENOVATIONS.TXT  UNITES_DETAILLEES.TXT
MEMBRES.TXT               ← courtiers (sert à filtrer les inscriptions de Julie)
BUREAUX.TXT  FIRMES.TXT  VISITES_LIBRES.TXT  ...
```

`_centris/` est **généré** : ne pas le modifier à la main, ne pas s'inquiéter de son
contenu local (le workflow le régénère à chaque run).

---

## Étape 5 — Filtrer sur LE courtier (Julie Gauthier)

C'est le point critique du `build.mjs`. JACQUESROUSSEL agrège **deux** courtiers ;
pour Julie il faut cibler **son** nom dans `MEMBRES.TXT`. Adapter ce bloc en haut de
`build.mjs` :

```js
// Cibler la ou les courtière(s) — inscriptions où Julie est primaire OU co-courtier
const TARGET_BROKERS = [
  { firstName: 'Julie', lastName: 'Gauthier' }
];
```

Autres valeurs à personnaliser dans `build.mjs` :
- **`GCAL_APPOINTMENT_URL`** — l'URL de prise de rendez-vous Google Calendar de Julie.
- **`CP_CITY`** — la table préfixe code postal → ville, à ajuster sur **son territoire**
  (JACQUESROUSSEL couvre la Rive-Nord ouest ; remplacer par le secteur de Julie).

---

## Checklist de mise en place

- [ ] Copier `scripts/fetch-centris.mjs` (tel quel).
- [ ] Copier `.github/workflows/daily-centris.yml` → changer l'email du bot.
- [ ] Copier `build.mjs` → changer `TARGET_BROKERS`, `GCAL_APPOINTMENT_URL`, `CP_CITY`.
- [ ] Confirmer que Julie est bien dans l'export Centris (`MEMBRES.TXT`) sous le compte VPOURDESIGN.
- [ ] Créer les 3 secrets GitHub (`DRIVEHQ_USER`, `DRIVEHQ_PASS`, `DRIVEHQ_WEBDAV_URL`).
- [ ] Lancer le workflow à la main une 1re fois (onglet **Actions → Daily Centris ingest → Run workflow**) pour valider.
- [ ] Vérifier que `site/nos-proprietes/` et `site/data/` sont générés et committés.

---

## Tester localement (sans GitHub)

```bash
# Depuis la racine du projet de Julie
export DRIVEHQ_USER='...'
export DRIVEHQ_PASS='...'
export DRIVEHQ_WEBDAV_URL='https://webdav.drivehq.com/.../'

node scripts/fetch-centris.mjs     # télécharge + extrait dans _centris/
node build.mjs                     # génère site/nos-proprietes + site/data
```

## Dépannage

- **« Missing DRIVEHQ_… »** → les 3 secrets/variables d'env ne sont pas définis.
- **« Aucun zip VPOURDESIGN*.zip trouvé »** → Centris n'a rien déposé depuis 14 j,
  identifiants WebDAV erronés, ou mauvais préfixe de fichier.
- **0 propriété générée** → `TARGET_BROKERS` ne correspond pas exactement au nom dans
  `MEMBRES.TXT` (vérifier orthographe / accents).
- **Caractères accentués cassés** → l'encodage de lecture doit rester `windows-1252`.
