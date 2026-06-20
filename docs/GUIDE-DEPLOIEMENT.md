# Guide de déploiement — Evaluation 1/3 Stage BUT QLIO

> Ce guide est destiné aux administrateurs système et développeurs. Il couvre les trois modes de déploiement : GitHub Pages (production), Electron (Windows portable) et développement local.

---

## Sommaire

1. [Architecture globale](#1-architecture-globale)
2. [Prérequis](#2-prérequis)
3. [Configuration des dépôts GitHub](#3-configuration-des-dépôts-github)
4. [Déploiement GitHub Pages (production)](#4-déploiement-github-pages-production)
5. [Build de l'application Electron (Windows)](#5-build-de-lapplication-electron-windows)
6. [Développement local](#6-développement-local)
7. [Gestion des secrets et tokens](#7-gestion-des-secrets-et-tokens)
8. [Structure du dépôt de données](#8-structure-du-dépôt-de-données)
9. [Mise à jour de l'application](#9-mise-à-jour-de-lapplication)
10. [Résolution des problèmes courants](#10-résolution-des-problèmes-courants)

---

## 1. Architecture globale

```
┌─────────────────────────────────────────────────────────────────┐
│  UTILISATEURS                                                   │
│  ┌──────────────────┐    ┌──────────────────────────────────┐  │
│  │  Navigateur web  │    │  Application bureau (.exe)       │  │
│  │  GitHub Pages    │    │  Electron — Windows portable     │  │
│  └────────┬─────────┘    └────────────┬─────────────────────┘  │
└───────────┼────────────────────────────┼────────────────────────┘
            │                            │
            ▼                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  qlio-iut-evry/eval-qlio-app  (dépôt code — public)            │
│  GitHub Pages sert app/ (HTML + JS + CSS)                       │
│  CI/CD : .github/workflows/deploy-pages.yml                     │
│          injecte config.js depuis les secrets GitHub Actions    │
└─────────────────────────────┬───────────────────────────────────┘
                              │  GitHub Contents API
                              │  PUT/GET /repos/.../contents/data/
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  qlio-iut-evry/eval-qlio-data  (dépôt données — PRIVÉ)         │
│  data/index.json         → index des campagnes                  │
│  data/<campaign-id>.json → données complètes de chaque campagne │
└─────────────────────────────────────────────────────────────────┘
```

### Flux de sauvegarde

1. L'utilisateur saisit des données dans l'UI → `state` en mémoire
2. `saveState()` persiste dans `localStorage` (immédiat, local)
3. Toutes les 30 secondes ou à la fermeture : `saveToDb()` → PUT vers l'API GitHub
4. L'API GitHub écrit dans le dépôt `eval-qlio-data`
5. Sur un autre poste, au chargement suivant : GET depuis l'API → restauration

---

## 2. Prérequis

### Pour GitHub Pages

- Organisation GitHub : `qlio-iut-evry` (ou équivalent)
- Dépôt applicatif : `eval-qlio-app` avec GitHub Pages activé sur la branche `main`
- Dépôt de données : `eval-qlio-data` (privé)
- Token GitHub Personal Access Token (PAT) avec scopes :
  - `repo` (accès complet au dépôt privé de données)
- Secrets GitHub Actions configurés (voir §7)

### Pour le build Electron

- Node.js 18 ou supérieur
- npm 9+
- Windows 10/11 (pour générer le `.exe` portable)
- Git installé

### Pour le développement local

- Même que Electron
- Fichier `app/config.js` créé manuellement (non versionné)

---

## 3. Configuration des dépôts GitHub

### 3.1 Dépôt applicatif (`eval-qlio-app`)

#### Activer GitHub Pages

1. Aller dans **Settings** → **Pages**
2. Source : **GitHub Actions**
3. Le workflow `deploy-pages.yml` gère le déploiement automatiquement

#### Configurer les secrets GitHub Actions

Aller dans **Settings** → **Secrets and variables** → **Actions** → **New repository secret** :

| Nom du secret | Valeur |
|---|---|
| `DATA_GITHUB_TOKEN` | Token PAT avec scope `repo` (voir §7) |
| `DATA_GITHUB_OWNER` | `qlio-iut-evry` (propriétaire du dépôt de données) |
| `DATA_GITHUB_REPO` | `eval-qlio-data` (nom du dépôt de données) |

#### Vérifier les permissions du workflow

Dans `.github/workflows/deploy-pages.yml`, les permissions suivantes sont requises :

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

### 3.2 Dépôt de données (`eval-qlio-data`)

#### Créer la structure initiale

```bash
# Initialiser le dépôt avec le fichier index vide
echo "[]" > data/index.json
git add data/index.json
git commit -m "Init: empty campaign index"
git push
```

Le dépôt doit rester **privé** en permanence — il contient les données personnelles des étudiants.

#### Droits d'accès

Le token PAT utilisé doit appartenir à un compte ayant accès en écriture (`push`) sur `eval-qlio-data`.

---

## 4. Déploiement GitHub Pages (production)

### Déploiement automatique (recommandé)

Tout push sur la branche `main` du dépôt `eval-qlio-app` déclenche automatiquement le déploiement.

```bash
git push origin main
# → GitHub Actions injecte config.js, déploie sur Pages (~60 secondes)
```

#### Ce que fait le workflow

```yaml
# Extrait de .github/workflows/deploy-pages.yml

- name: Inject config.js from secrets
  run: |
    cat > app/config.js << 'EOF'
    const GITHUB_TOKEN = "${{ secrets.DATA_GITHUB_TOKEN }}";
    const GITHUB_OWNER = "${{ secrets.DATA_GITHUB_OWNER }}";
    const GITHUB_REPO  = "${{ secrets.DATA_GITHUB_REPO }}";
    EOF

- uses: actions/upload-pages-artifact@v3
  with:
    path: app       # Seul le dossier app/ est déployé
```

> ⚠️ `app/config.js` est généré dans le runner GitHub Actions et n'existe **jamais** dans le dépôt source. Il est listé dans `.gitignore`.

### Déploiement manuel

Via l'interface GitHub : **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

### Vérifier le déploiement

1. Aller dans **Actions** pour voir le statut du workflow
2. Une fois terminé (✅), ouvrir l'URL Pages
3. Vérifier que l'application se charge et que le statut de sync (coin supérieur droit) passe en vert

---

## 5. Build de l'application Electron (Windows)

### Préparer l'environnement

```bash
git clone https://github.com/qlio-iut-evry/eval-qlio-app.git
cd eval-qlio-app
npm install
```

### Créer la configuration locale

Créer le fichier `app/config.js` (ne jamais le commiter) :

```js
const GITHUB_TOKEN = "github_pat_XXXXXXXXXXXXXXXXXXXX";
const GITHUB_OWNER = "qlio-iut-evry";
const GITHUB_REPO  = "eval-qlio-data";
```

> Le token doit avoir le scope `repo` sur le dépôt `eval-qlio-data`.

### Générer l'exécutable

```bash
npm run dist
```

L'exécutable est généré dans `dist/Evaluation-1-3-Stage-QLIO.exe`.

### Distribuer l'exécutable

L'exécutable est **portable** (aucune installation). Copier simplement le fichier `.exe` sur le poste cible.

> ⚠️ Le token GitHub est compilé dans l'exécutable. Ne pas distribuer le `.exe` à des personnes extérieures au projet. Générer un token distinct par utilisateur si nécessaire.

### Options de build (`package.json`)

```json
"build": {
  "appId": "fr.iut.qlio.evaluation13stage",
  "productName": "Evaluation 1-3 Stage QLIO",
  "win": { "target": ["portable"] },
  "portable": { "artifactName": "Evaluation-1-3-Stage-QLIO.exe" }
}
```

---

## 6. Développement local

### Lancer en mode Electron

```bash
npm start
```

Ouvre une fenêtre Electron avec rechargement automatique à chaque modification de fichier (selon la configuration de Electron).

### Travailler sans Electron (navigateur simple)

Ouvrir directement `app/index.html` dans Chrome avec l'option de contournement CORS :

```bash
# Windows — Chrome avec CORS désactivé (développement uniquement !)
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:\tmp\chrome-dev"
```

> ⚠️ Ne jamais utiliser un navigateur avec CORS désactivé pour naviguer sur internet.

### Points d'attention développement

| Problème | Cause | Solution |
|---|---|---|
| Requêtes GitHub bloquées (CORS) | Header `Cache-Control` dans les requêtes | Ne jamais ajouter ce header ; le cache-busting se fait via `?_=<timestamp>` |
| Accents corrompus à l'import | Utilisation de `file.text()` | Toujours utiliser `new TextDecoder("utf-8").decode(buffer)` |
| Conflits 409 à la sauvegarde | SHA obsolète | `dbSaveCampaign` gère 3 tentatives avec relecture du SHA |
| Données corrompues après changement de niveau BUT | `normalizeStudent` non mis à jour | Toujours initialiser les slots pour RUBRICS et RUBRICS_BUT3 dans `normalizeStudent` |

---

## 7. Gestion des secrets et tokens

### Créer un Personal Access Token (PAT)

1. Sur GitHub : **Settings** (profil) → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **Generate new token (classic)**
3. Note : `eval-qlio-data write access`
4. Expiration : selon politique de sécurité (90 jours recommandé)
5. Scopes à cocher : `repo` (contenu complet du dépôt privé)
6. Copier le token immédiatement (affiché une seule fois)

### Rotation du token

Quand le token expire ou est compromis :

1. Générer un nouveau token (voir ci-dessus)
2. Mettre à jour le secret `DATA_GITHUB_TOKEN` dans GitHub Actions (Settings → Secrets)
3. Rebuilder le `.exe` Electron avec le nouveau token si applicable
4. Révoquer l'ancien token dans GitHub Settings

### Sécurité

- Le token **ne doit jamais** apparaître dans le code source ni dans les commits
- `app/config.js` est dans `.gitignore` — vérifier avec `git status` avant tout commit
- Le dépôt de données `eval-qlio-data` doit rester **privé** (RGPD — données personnelles étudiants)

---

## 8. Structure du dépôt de données

Le dépôt `eval-qlio-data` contient uniquement des fichiers JSON dans `data/` :

```
eval-qlio-data/
└── data/
    ├── index.json              # Liste des campagnes [{id, name, updated_at}]
    ├── campaign_default.json   # Données de la campagne par défaut
    └── <uuid>.json             # Données de chaque campagne additionnelle
```

### Format de `index.json`

```json
[
  {
    "id": "campaign_default",
    "name": "2025-2026",
    "updated_at": "2026-06-20T14:37:00.000Z"
  }
]
```

### Format d'un fichier campagne

```json
{
  "activeCampaignId": "campaign_default",
  "campaignName": "2025-2026",
  "students": [ /* tableau des étudiants */ ],
  "filters": { "path": "Tous", "status": "Tous", "level": "Tous", "search": "" },
  "presets": { "but2": { "planning": [...], "flow": [...], "framing": [...] }, "but3": { ... } },
  "theme": "contrast"
}
```

### Accès en lecture des données

Pour consulter ou sauvegarder manuellement les données :

```bash
# Cloner le dépôt de données (accès nécessaire)
git clone https://github.com/qlio-iut-evry/eval-qlio-data.git
```

---

## 9. Mise à jour de l'application

### Mise à jour mineure (correctif ou nouvelle fonctionnalité)

```bash
# Modifier les fichiers dans app/
git add app/app.js app/styles.css  # ou les fichiers concernés
git commit -m "Fix: description du correctif"
git push origin main
# → Déploiement automatique en ~60 secondes
```

### Mise à jour du modèle de données (cas critique)

Si vous modifiez les clés de `RUBRICS` ou `RUBRICS_BUT3` :

1. Vérifier que `normalizeStudent` initialise les nouveaux slots
2. Prévoir une migration des données existantes dans le dépôt `eval-qlio-data`
3. Tester en local avec une copie JSON des données de production
4. Déployer après validation complète

> ⚠️ Un changement de clé de critère **sans migration** orpheline les données des étudiants déjà évalués.

### Mettre à jour la version Electron

```bash
# Après mise à jour du code
npm run dist
# Distribuer le nouveau .exe aux utilisateurs
```

Il n'y a pas de mise à jour automatique en mode Electron — la distribution manuelle du `.exe` est nécessaire.

---

## 10. Résolution des problèmes courants

### L'application ne se connecte pas à GitHub

**Symptôme :** Statut de sync rouge, toast d'erreur "GitHub …"

**Vérifications :**
1. Token valide et non expiré → GitHub Settings → Tokens
2. Secret `DATA_GITHUB_TOKEN` à jour dans GitHub Actions
3. Dépôt `eval-qlio-data` accessible avec ce token
4. Pas de restrictions réseau bloquant `api.github.com` (proxy, firewall)

### Conflits 409 répétés à la sauvegarde

**Symptôme :** Toast "Conflit SHA" même après plusieurs tentatives

**Cause probable :** Deux onglets ou deux utilisateurs sauvegardent simultanément très fréquemment.

**Solution :** L'application gère 3 tentatives automatiques. Si les conflits persistent, forcer un rechargement (F5) sur l'onglet secondaire pour synchroniser le SHA local.

### Données corrompues après import

**Symptôme :** Champs vides, `?` à la place des données, accents manquants

**Causes et solutions :**

| Symptôme | Cause | Solution |
|---|---|---|
| Accents manquants (é → Ã©) | Import via `file.text()` | Utiliser `TextDecoder("utf-8")` (déjà corrigé en v1.x) |
| Colonne TP = `?` | Alias non reconnu | Ajouter l'alias dans `HEADERS.tp` dans `app.js` |
| Prénom/nom inversés | Colonnes non standards | Vérifier les alias dans `HEADERS.lastName` et `HEADERS.firstName` |

### Le workflow GitHub Actions échoue

**Vérifier dans Actions → le workflow → les logs :**

| Erreur | Cause probable |
|---|---|
| `Error: Secrets not found` | Secret non configuré ou mal nommé |
| `Error: Resource not accessible by integration` | Permissions du workflow insuffisantes |
| `Error: No artifact found` | Le dossier `app/` est vide ou absent |

### L'exécutable Electron ne démarre pas

**Vérifications :**
1. Windows Defender peut bloquer un `.exe` non signé → clic droit → Exécuter quand même
2. `app/config.js` manquant dans le même répertoire que le `.exe`
3. Antivirus bloquant l'exécutable Electron (faux positif fréquent)
