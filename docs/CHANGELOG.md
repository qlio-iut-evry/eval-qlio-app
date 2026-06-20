# Changelog — Evaluation 1/3 Stage BUT QLIO

Toutes les modifications notables sont documentées ici.  
Format : [Semantic Versioning](https://semver.org/lang/fr/) — `MAJEUR.MINEUR.CORRECTIF`

---

## [1.1.0] — 2026-06-20

> Version majeure ajoutant le support BUT3, les presets éditables, les filtres avancés et une série de correctifs d'ergonomie.

### Nouveautés

#### Support BUT3

- **Grille d'évaluation BUT3** : trois livrables distincts — Fiche de cadrage (5 critères), Schéma des flux (4 critères), Tableau de bord (4 critères)
- **Sélecteur de niveau** dans la barre latérale : chips **Tous / BUT 2 / BUT 3** avec couleurs distinctives (bleu pour BUT2, violet pour BUT3)
- **Choix du niveau à l'import** : une boîte de dialogue s'ouvre lors de chaque import Excel/CSV pour affecter BUT2 ou BUT3 aux étudiants importés
- **Sélecteur BUT2/BUT3 sur la fiche étudiant** : changement de niveau possible après l'import sans perte des données existantes
- **Formule de scoring générique** : `(somme × 2) ÷ nombre de critères` — fonctionne pour 4 ou 5 critères sans modification de la logique existante
- **Export CSV étendu** : les colonnes s'adaptent au niveau (colonne Tableau de bord pour BUT3, colonne Planning pour BUT2)

#### Presets de commentaires éditables

- **Gestionnaire de presets** par rubrique et par niveau (BUT2 / BUT3 indépendants)
- **Ajouter, modifier, supprimer** des commentaires rapides via une modale dédiée
- **Bouton + Gérer** toujours visible (bleu pâle) dans la zone preset de chaque rubrique
- Presets persistés en base avec le reste de la campagne (`state.presets.but2` et `state.presets.but3`)

#### Filtres avancés

- **Barre de filtre dans la vue Tableau** : chips Niveau (BUT2/BUT3/Tous) + Parcours + compteur d'étudiants affichés
- **Barre de filtre dans la vue Recap** : chips Niveau (BUT2/BUT3/Tous) ajoutés au-dessus des filtres Parcours existants
- Tous les filtres sont synchronisés : changer le niveau dans la sidebar met à jour simultanément Tableau et Recap

#### Ergonomie

- **Désélection par re-clic** : cliquer sur la note déjà sélectionnée (0–10) la remet à `null`
- **Désélection Oui/Non** : cliquer sur Oui ou Non déjà actif annule la sélection
- **Suppression individuelle d'étudiant** : bouton ✕ permanent (faible opacité, plus visible au survol) sur chaque ligne de la liste
- **Regroupement des onglets** : `[Evaluation | Fiche]` et `[Tableau | Recap]` regroupés visuellement en paires, `Sauvegarde` séparé
- Titres de l'application fixés à `BUT QLIO – EVRY` (suppression du titre dynamique selon le niveau)

### Correctifs

| Ref | Problème | Correction |
|---|---|---|
| FIX-01 | Colonne TP `"TP FI-FIA"` non reconnue à l'import (affichait `?`) | Ajout de l'alias `"tp fi-fia"` (avec tiret sans espaces) dans `HEADERS.tp` |
| FIX-02 | Fond transparent dans la modale de gestion des presets | Remplacement de `--bg-panel` (variable non définie) par `#1e1e2e` fixe |
| FIX-03 | Texte illisible dans la modale de gestion des presets | Ajout de `color: #e2e2f0` et stylisation des boutons pour fond sombre |
| FIX-04 | Bouton ✕ de suppression invisible (opacity 0 au repos) | Opacité de base à `0.18`, montée à `0.7` au survol de la ligne |
| FIX-05 | Badge de niveau BUT2/BUT3 redondant dans la liste d'étudiants | Suppression du badge (le filtre de niveau le remplace) |
| FIX-06 | Import JSON avec accents corrompus | Passage forcé à `TextDecoder("utf-8")` pour tous les imports JSON |

---

## [1.0.0] — 2026-06-20 (version initiale)

> Première version fonctionnelle. Support BUT2 uniquement, sauvegarde GitHub, auto-save.

### Fonctionnalités initiales

#### Gestion des campagnes

- Création, renommage, suppression et changement de campagne active
- Persistance dans `localStorage` et synchronisation GitHub
- Index des campagnes dans `data/index.json`

#### Import et gestion des étudiants

- Import Excel (`.xlsx`, `.xls`) et CSV via `xlsx-js-style`
- Reconnaissance automatique des colonnes (Nom, Prénom, Parcours, TD, TP, Mails, Entreprise, Sujet, Tuteur, Maître de stage)
- Décodage UTF-8 forcé pour préserver les accents
- Normalisation des en-têtes (minuscules, accents supprimés, alias multiples)

#### Évaluation BUT2

- Trois livrables : Planning (4 critères), Schéma des flux (4 critères), Fiche de cadrage (4 critères)
- Notes de critère de 0 à 10
- Indicateur Oui/Non pour la 1ère version (pénalité ×0,5 si Non)
- Score automatique par livrable et note finale sur 20
- Bonus participation (0–5 points)
- Commentaire général et commentaire par rubrique
- Commentaires rapides (presets) non éditables (prédéfinis en constants)
- Validation de l'évaluation avec horodatage

#### Interface

- Barre latérale : campagne, import, filtres (parcours, statut, recherche), liste étudiants avec hover-card
- Onglets : Evaluation, Fiche étudiant, Tableau de bord, Récap, Sauvegarde
- Navigation Précédent/Suivant entre étudiants
- Envoi de commentaires par mail (`mailto:`)
- Envoi groupé depuis le Récap
- Impression du récap et PDF des commentaires
- 4 thèmes : Contraste jaune (défaut), IUT bleu, Nuit violet, Océan vert

#### Tableau de bord

- KPI : nombre d'étudiants, évaluations complètes, à faire, moyenne générale
- Avancement par parcours (barres de progression)
- Alertes (étudiants sans évaluation ou avec champs manquants)
- Comparaison par groupe TP
- Moyennes par livrable

#### Sauvegarde et persistance

- Auto-save toutes les 30 secondes (après remplacement de l'auto-save à 3 secondes, trop agressif)
- Save à la fermeture via `visibilitychange`
- Pas de save sur la navigation pure (changement d'étudiant, de vue)
- Verrou `_saveInProgress` contre les sauvegardes concurrentes
- Gestion des conflits SHA (retry ×3 avec relecture du SHA)
- Export CSV et JSON de secours
- Import JSON pour restauration
- Cache-busting via `?_=<timestamp>` (solution CORS GitHub API)
- Encodage UTF-8 sur tous les appels API (TextEncoder/TextDecoder)

#### Déploiement

- GitHub Actions : injection de `config.js` depuis les secrets, déploiement GitHub Pages
- Application Electron Windows portable (`.exe`) via `electron-builder`

---

## Format des versions

Ce projet suit [Semantic Versioning](https://semver.org/lang/fr/) :

- **MAJEUR** : changements incompatibles du modèle de données (migration requise)
- **MINEUR** : nouvelles fonctionnalités rétrocompatibles
- **CORRECTIF** : correctifs de bugs rétrocompatibles

### Types de changements

- **Nouveautés** : nouvelles fonctionnalités
- **Modifications** : changements de fonctionnalités existantes
- **Correctifs** : corrections de bugs
- **Sécurité** : correctifs de vulnérabilités
- **Supprimé** : fonctionnalités retirées
