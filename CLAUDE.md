# CLAUDE.md — Evaluation 1/3 Stage BUT QLIO

## Stack technique

- **Frontend** : HTML5 / CSS3 / JavaScript ES2022 vanilla — aucun framework, aucun bundler
- **Runtime cible** : navigateur (GitHub Pages) + Electron (app Windows portable)
- **Base de données** : GitHub Contents API sur le dépôt privé `qlio-iut-evry/eval-qlio-data`
  - Lecture : `GET /repos/.../contents/data/<id>.json?_=<timestamp>` (cache-busting obligatoire)
  - Écriture : `PUT` avec SHA courant (3 tentatives pour gérer les conflits)
  - Index des campagnes : `data/index.json`
- **Persistance locale** : `localStorage` (clé `qlio_eval_1_3_stage_v1`)
- **Import Excel/CSV** : bibliothèque CDN `xlsx-js-style` (chargée dans `index.html`)
- **CI/CD** : GitHub Actions → GitHub Pages (`qlio-iut-evry/eval-qlio-app`)
  - `app/config.js` est injecté par le workflow depuis les secrets GitHub
  - Déploiement automatique sur push `main`

## Architecture des dossiers

```
/
├── app/                        # Sources déployées (GitHub Pages / Electron)
│   ├── index.html              # Shell HTML unique (SPA sans routeur)
│   ├── app.js                  # Logique applicative complète (~2 500 lignes)
│   ├── styles.css              # Styles complets (~2 150 lignes)
│   ├── db.js                   # Couche GitHub API (ghFetch, ghRead, ghWrite, dbSaveCampaign)
│   ├── config.js               # Credentials GitHub (GITIGNORED — ne jamais commiter)
│   └── sharepoint-config.js    # Config SharePoint (non utilisé activement)
├── electron/
│   └── main.js                 # Point d'entrée Electron (fenêtre, menu, IPC)
├── .github/workflows/
│   └── deploy-pages.yml        # Pipeline CI/CD — injection config.js + déploiement Pages
├── data/                       # Dossier local de référence (non déployé)
├── dist/                       # Binaires Electron générés (gitignored)
├── package.json                # Electron + electron-builder uniquement
└── CLAUDE.md                   # Ce fichier
```

## Fichiers critiques — ne pas modifier sans comprendre l'impact

| Fichier | Risque |
|---|---|
| `app/config.js` | Contient le token GitHub local — **jamais commiter**, listé dans `.gitignore` |
| `.github/workflows/deploy-pages.yml` | Injecte les secrets en prod — toute modification casse le déploiement |
| `app/db.js` → `dbSaveCampaign` | Logique SHA + retry — modifier sans soin provoque des conflits 409 |
| `app/app.js` → `normalizeStudent` | Normalise TOUS les champs étudiants BUT2+BUT3 — toute régression corrompt les données sauvegardées |
| `app/app.js` → `RUBRICS` / `RUBRICS_BUT3` | Définit les grilles d'évaluation — un changement de clé de critère orpheline les données existantes |

## Architecture de app.js

Le fichier est organisé de haut en bas dans cet ordre :

1. **Constantes globales** : `STORAGE_KEY`, `CRITERION_SCORES`, `RUBRIC_COMMENT_PRESETS`, `RUBRICS`, `RUBRIC_COMMENT_PRESETS_BUT3`, `RUBRICS_BUT3`, `HEADERS`
2. **État applicatif** : objet `state` (unique source de vérité), `initPresets()`
3. **Cache DOM** : `cacheElements()`, `bindEvents()`
4. **Persistance** : `loadState()`, `saveState()`, `saveToDb()`, `initDbMode()`
5. **Rendu** : fonctions `render*()` — chacune écrit dans le DOM à partir de `state`
6. **Logique métier** : `calculateScore()`, `normalizeStudent()`, `evaluationStatus()`, `filteredStudents()`
7. **Import/Export** : `importStudentFile()`, `exportCsv()`, `saveWorkingJsonFile()`
8. **Utilitaires** : `normalizeHeader()`, `escapeHtml()`, `formatScore()`, `makeId()`, etc.

## Conventions de nommage

- **Fonctions** : `camelCase`, verbe d'action + objet — ex. `renderStudentList`, `calculateScore`, `filteredStudents`
- **Fonctions de rendu** : préfixe `render` obligatoire — ex. `renderDashboard`, `renderFilters`
- **Constantes globales** : `UPPER_SNAKE_CASE` — ex. `RUBRICS_BUT3`, `STORAGE_KEY`
- **IDs HTML** : `camelCase` — ex. `studentList`, `pathFilters`, `levelFilters`
- **Classes CSS** : `kebab-case` — ex. `student-item`, `recap-filter-bar`, `level-chip`
- **Clés de rubrique** : snake_case court — `planning`, `flow`, `framing`, `dashboard`
- **Clés de critère** : camelCase court — `dayInputs`, `firstVersion`, `presentation`
- **Niveaux BUT** : valeurs internes `"but2"` / `"but3"` (minuscules), affichage `"BUT2"` / `"BUT3"`

## Modèle de données

### Étudiant (objet dans `state.students[]`)
```js
{
  id: string,           // UUID généré par makeId()
  butLevel: "but2"|"but3",
  lastName, firstName, civility, path, cm, td, tp,
  state, schoolMail, personalMail, company, subject, tutor, mentor, evaluator,
  evaluation: {
    bonus: number|"",
    comment: string,
    validated: boolean,
    validatedAt: string,   // ISO 8601
    rubrics: {
      [rubricId]: {
        firstVersion: "yes"|"no"|"",
        criteria: { [criterionKey]: number|null },  // 0-10
        comment: string
      }
    }
  }
}
```

### Campagne (objet dans `state`)
```js
{
  activeCampaignId: string,
  campaignName: string,
  students: Student[],
  filters: { path, status, level, search },
  presets: { but2: {...}, but3: {...} },   // presets éditables, persistés en base
  theme: "contrast"|"light"|"dark"|"ocean"
}
```

## Règles de scoring

- **Formule générale** : `score/20 = (somme des critères × 2) / nombre de critères`
  - 4 critères (BUT2 ou BUT3 flux/dashboard) : diviseur = 2
  - 5 critères (BUT3 Fiche de cadrage) : diviseur = 2,5
- **Pénalité 1ère version** : si `firstVersion === "no"`, score du livrable × 0,5
- **Note finale** : `(score planning + score flux + score cadrage) / 3` → `/20`
- La fonction `activeRubrics(student)` retourne `RUBRICS` ou `RUBRICS_BUT3` selon `student.butLevel`

## Sauvegarde — comportement attendu

- **Auto-save** : toutes les 30 secondes via `setInterval`
- **Save manuel** : bouton "Sauvegarder maintenant" dans l'onglet Sauvegarde
- **Save à la fermeture** : event `visibilitychange` → `hidden`
- **Pas de save** sur la navigation pure (changement de vue, sélection d'étudiant) : appels `saveState({ markDirty: false })`
- **Verrou** : `_saveInProgress` empêche les sauvegardes concurrentes
- **Conflits SHA** : retry jusqu'à 3 fois avec relecture du SHA avant chaque tentative

## Règles de commit

- Messages en anglais, impératif, concis (< 72 caractères sur la 1ère ligne)
- Format : `<action>: <quoi>` — ex. `Fix TP alias: add 'tp fi-fia'`, `Add BUT3 rubric scoring`
- Corps optionnel pour expliquer le **pourquoi** si non évident
- Toujours suffixer avec `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` lors des commits assistés
- Ne jamais commiter `app/config.js` (token GitHub)
- Ne jamais utiliser `--no-verify`

## Déploiement local (Electron)

```bash
npm start          # Lance l'app Electron en développement
npm run dist       # Génère Evaluation-1-3-Stage-QLIO.exe dans dist/
```

Créer `app/config.js` manuellement (non versionné) :
```js
const GITHUB_TOKEN = "github_pat_...";
const GITHUB_OWNER = "qlio-iut-evry";
const GITHUB_REPO  = "eval-qlio-data";
```

## Points d'attention spécifiques

- **CORS GitHub API** : ne jamais ajouter `Cache-Control` aux headers des requêtes GitHub (bloqué par preflight). Le cache-busting se fait uniquement via `?_=${Date.now()}` en query string.
- **Import Excel** : toujours décoder via `new TextDecoder("utf-8").decode(buffer)` pour préserver les accents. Ne pas utiliser `file.text()`.
- **Colonnes TP** : alias reconnus dans `HEADERS.tp` — si un nouveau format de fichier apparaît, ajouter l'alias normalisé (minuscules, tirets directs) dans ce tableau.
- **BUT3 Fiche de cadrage** : partage les clés `framing` et `flow` avec BUT2 mais avec des critères différents. `normalizeStudent` initialise les slots pour les deux jeux de rubriques afin que le changement de niveau ne corrompe pas les données.
