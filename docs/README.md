# Evaluation 1/3 Stage BUT QLIO

Application web d'évaluation des journées de tiers-stage pour les promotions BUT2 et BUT3 QLIO – IUT d'Évry.

---

## Présentation rapide

| | |
|---|---|
| **Accès web** | GitHub Pages (connexion internet requise) |
| **Accès bureau** | Application Windows portable `.exe` (sans installation) |
| **Données** | Stockées dans un dépôt GitHub privé (`qlio-iut-evry/eval-qlio-data`) |
| **Niveaux supportés** | BUT2 et BUT3 dans la même campagne |
| **Navigateurs testés** | Chrome 120+, Edge 120+, Firefox 121+ |

---

## Prérequis

### Pour utiliser l'application web
- Un navigateur moderne
- Un compte GitHub avec accès au dépôt de données `qlio-iut-evry/eval-qlio-data`
- Un token GitHub personnel avec le scope `contents: write` (fourni par l'administrateur)

### Pour développer ou déployer
- Node.js 18+ (pour Electron uniquement)
- Compte GitHub avec droits d'administration sur `qlio-iut-evry/eval-qlio-app`
- Secrets GitHub configurés (voir [Guide de déploiement](GUIDE-DEPLOIEMENT.md))

---

## Installation rapide

### Option A — Application web (GitHub Pages)

Aucune installation. Ouvrir l'URL fournie par l'administrateur.

### Option B — Application bureau (Windows)

1. Télécharger `Evaluation-1-3-Stage-QLIO.exe` depuis les releases GitHub
2. Créer un fichier `app/config.js` dans le même dossier (fourni par l'administrateur)
3. Double-cliquer sur l'exécutable — aucune installation requise

### Option C — Mode développement (Electron)

```bash
# Cloner le dépôt
git clone https://github.com/qlio-iut-evry/eval-qlio-app.git
cd eval-qlio-app

# Installer les dépendances (Electron uniquement)
npm install

# Créer la configuration locale (non versionnée)
# Voir docs/GUIDE-DEPLOIEMENT.md pour le contenu de config.js

# Lancer en mode développement
npm start

# Générer l'exécutable Windows portable
npm run dist
# → dist/Evaluation-1-3-Stage-QLIO.exe
```

---

## Structure du projet

```
eval-qlio-app/
├── app/
│   ├── index.html          # Interface (SPA sans routeur)
│   ├── app.js              # Logique métier (~2 500 lignes)
│   ├── styles.css          # Styles (~2 150 lignes)
│   ├── db.js               # Couche GitHub API
│   └── config.js           # ⚠️ Non versionné — à créer manuellement
├── electron/
│   └── main.js             # Point d'entrée Electron
├── .github/workflows/
│   └── deploy-pages.yml    # CI/CD GitHub Actions
├── docs/                   # Documentation
├── CLAUDE.md               # Référence technique pour développeurs
└── package.json
```

---

## Utilisation rapide

1. **Importer une liste** — Bouton **Importer la liste** → sélectionner le fichier Excel/CSV exporté depuis Apogée ou Pégase → choisir BUT2 ou BUT3
2. **Évaluer un étudiant** — Cliquer sur son nom dans la liste → onglet **Evaluation** → remplir les grilles
3. **Valider** — Bouton **Valider l'évaluation** quand tous les critères sont remplis
4. **Consulter le récap** — Onglet **Recap** → filtrer par niveau ou parcours → **Imprimer notes**

La sauvegarde vers GitHub est automatique toutes les **30 secondes**.

---

## Formule de notation

```
Note livrable (/20) = (somme des critères × 2) ÷ nombre de critères
  → BUT2 : 4 critères par livrable      → diviseur 2
  → BUT3 Fiche de cadrage : 5 critères  → diviseur 2,5

Pénalité 1ère version non rendue : score livrable × 0,5

Note finale = (Planning + Flux + Fiche de cadrage) ÷ 3
```

---

## Liens

- Application web : `https://qlio-iut-evry.github.io/eval-qlio-app/`
- Dépôt code : `https://github.com/qlio-iut-evry/eval-qlio-app`
- Dépôt données : `https://github.com/qlio-iut-evry/eval-qlio-data` (privé)
- Guide utilisateur : [docs/GUIDE-UTILISATEUR.md](GUIDE-UTILISATEUR.md)
- Guide déploiement : [docs/GUIDE-DEPLOIEMENT.md](GUIDE-DEPLOIEMENT.md)
- Changelog : [docs/CHANGELOG.md](CHANGELOG.md)
