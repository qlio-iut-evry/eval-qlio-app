# Guide utilisateur — Evaluation 1/3 Stage BUT QLIO

> Ce guide est destiné aux enseignants et tuteurs pédagogiques. Aucune connaissance informatique particulière n'est nécessaire.

---

## Sommaire

1. [Ouvrir l'application](#1-ouvrir-lapplication)
2. [Découvrir l'écran principal](#2-découvrir-lécran-principal)
3. [Importer votre liste d'étudiants](#3-importer-votre-liste-détudiants)
4. [Filtrer et rechercher](#4-filtrer-et-rechercher)
5. [Évaluer un étudiant](#5-évaluer-un-étudiant)
6. [Comprendre le calcul de la note](#6-comprendre-le-calcul-de-la-note)
7. [Personnaliser les commentaires rapides](#7-personnaliser-les-commentaires-rapides)
8. [Valider une évaluation](#8-valider-une-évaluation)
9. [Consulter le tableau de bord](#9-consulter-le-tableau-de-bord)
10. [Imprimer le récapitulatif des notes](#10-imprimer-le-récapitulatif-des-notes)
11. [Gérer plusieurs campagnes](#11-gérer-plusieurs-campagnes)
12. [Sauvegarde et export](#12-sauvegarde-et-export)
13. [Changer de thème visuel](#13-changer-de-thème-visuel)
14. [Questions fréquentes](#14-questions-fréquentes)

---

## 1. Ouvrir l'application

### Via un navigateur web

Ouvrez **Chrome** ou **Edge** et saisissez l'adresse que vous a communiquée l'administrateur (de la forme `https://qlio-iut-evry.github.io/eval-qlio-app/`).

L'application se charge en quelques secondes. Aucun identifiant à saisir.

> **Conseil :** Ajoutez l'adresse à vos favoris. Sur Chrome : étoile ☆ dans la barre d'adresse.

### Via l'application bureau (Windows)

Double-cliquez sur le fichier **Evaluation-1-3-Stage-QLIO.exe**. Une fenêtre s'ouvre — c'est la même interface que le site web, sans avoir besoin d'internet.

---

## 2. Découvrir l'écran principal

L'écran est divisé en deux grandes zones :

```
┌─────────────────────┬────────────────────────────────────────┐
│                     │  Barre d'onglets (Evaluation | Fiche   │
│   BARRE LATÉRALE    │  Tableau | Recap | Sauvegarde)         │
│                     │                                        │
│  • Nom de campagne  │                                        │
│  • Import           │         ZONE PRINCIPALE                │
│  • Filtres BUT2/3   │   (change selon l'onglet actif)        │
│  • Recherche        │                                        │
│  • Liste étudiants  │                                        │
└─────────────────────┴────────────────────────────────────────┘
```

### La barre latérale (à gauche, fond sombre)

| Élément | À quoi ça sert |
|---|---|
| **BUT QLIO – EVRY / Evaluation 1/3 stage** | Titre de l'application |
| **Dots de couleur** (jaune, bleu, violet, vert) | Changer l'apparence visuelle |
| **Campagne active** | Choisir l'année en cours (ex. 2025-2026) |
| **Importer la liste** | Charger le fichier Excel de vos étudiants |
| **Tous / BUT 2 / BUT 3** | Filtrer par niveau |
| **Champ Rechercher** | Trouver un étudiant par nom |
| **FI / FA / OSC / Tous** | Filtrer par parcours |
| **Validé / En cours / À faire / Tous** | Filtrer par avancement |
| **Liste des étudiants** | Cliquer sur un nom pour l'évaluer |

### Les onglets (en haut à droite)

| Onglet | Ce qu'il affiche |
|---|---|
| **Evaluation** | La grille de notation de l'étudiant sélectionné |
| **Fiche** | Les informations personnelles et de stage |
| **Tableau** | Les statistiques globales de la campagne |
| **Recap** | Le tableau récapitulatif de toutes les notes |
| **Sauvegarde** | Les options d'export et de sauvegarde manuelle |

---

## 3. Importer votre liste d'étudiants

### Étape 1 — Préparer le fichier

Exportez depuis **Apogée** ou **Pégase** votre liste d'étudiants au format Excel (`.xlsx`) ou CSV. Vérifiez que le fichier contient bien les colonnes : Nom, Prénom, Parcours, TD, TP, Mail.

### Étape 2 — Importer

1. Dans la barre latérale, cliquez sur le bouton jaune **Importer la liste**
2. Sélectionnez votre fichier dans l'explorateur Windows qui s'ouvre
3. Une fenêtre apparaît :

```
┌─────────────────────────────────┐
│   Importer pour quel niveau ?   │
│                                 │
│   [ BUT 2 ]      [ BUT 3 ]      │
└─────────────────────────────────┘
```

4. Cliquez sur **BUT 2** ou **BUT 3** selon votre promotion
5. Les étudiants apparaissent immédiatement dans la liste à gauche

> **Astuce :** Vous pouvez importer plusieurs fichiers dans la même campagne — une fois BUT2, une fois BUT3 — pour mélanger les deux niveaux.

> **Colonne TP :** Les formats reconnus incluent `TP A1`, `TP FI-FIA`, `TP FI - FIA`, `Groupe TP`, etc. Si un étudiant affiche `?` dans son groupe TP, contactez l'administrateur pour ajouter l'alias manquant.

### Supprimer un étudiant

Survolez son nom dans la liste puis cliquez sur le **✕** qui apparaît à droite. Confirmez la suppression.

---

## 4. Filtrer et rechercher

### Filtrer par niveau BUT

En haut de la barre latérale, trois boutons :

- **Tous** — affiche tous les étudiants (BUT2 et BUT3)
- **BUT 2** — affiche uniquement les BUT2 (bouton bleu)
- **BUT 3** — affiche uniquement les BUT3 (bouton violet)

Ces filtres s'appliquent à la liste, au Tableau et au Recap simultanément.

### Filtrer par parcours et statut

Cliquez sur **FI**, **FA** ou **OSC** pour ne voir qu'un parcours.  
Cliquez sur **Validé**, **En cours** ou **À faire** pour filtrer par avancement.

> Vous pouvez combiner les filtres : BUT2 + FI + À faire affiche uniquement les étudiants BUT2 du parcours FI dont l'évaluation n'est pas commencée.

### Rechercher un étudiant

Tapez les premières lettres du nom ou du prénom dans le champ **Rechercher**. La liste se filtre en temps réel.

---

## 5. Évaluer un étudiant

### Sélectionner l'étudiant

Cliquez sur son nom dans la liste à gauche. Son nom apparaît en gras dans la barre latérale.

### Ouvrir la vue Évaluation

Cliquez sur l'onglet **Evaluation** en haut à droite.

### Lire l'en-tête

```
┌──────────────────────────────────────────────┬────────────────┐
│ FI · BUT2 · TP A1                            │  Note 1/3 stage│
│ Martin Sophie                                │   13,3 /20     │
│ Évaluation en cours · D. Gerelli             │    40 /60 pts  │
└──────────────────────────────────────────────┴────────────────┘
```

La note se met à jour en temps réel au fur et à mesure de la saisie.

### Remplir une rubrique

Chaque livrable (Planning, Schéma des flux, Fiche de cadrage) est présenté dans un bloc séparé.

**1. La 1ère version**

```
  1ère version rendue au début de journée    [ Oui ]  [ Non ]
```

Cliquez **Oui** ou **Non**. Cliquez à nouveau sur le bouton actif pour le désélectionner.

> ⚠️ Si vous cliquez **Non**, la note du livrable sera divisée par 2 automatiquement (pénalité 1ère version).

**2. Les critères**

Pour chaque critère, cliquez sur un chiffre de **0** à **10** :

```
  Démarche d'amélioration retenue
  [ 0 ][ 1 ][ 2 ][ 3 ][ 4 ][ 5 ][ 6 ][ 7 ][ 8 ][ 9 ][ 10 ]
                                           ^^^
                                     (en surbrillance)
```

Cliquez à nouveau sur le même chiffre pour le **désélectionner**.

**3. Les commentaires rapides (presets)**

Sous chaque rubrique, des boutons de commentaires pré-rédigés sont disponibles. Cliquez sur l'un d'eux pour l'insérer dans la zone de commentaire.

**4. Le commentaire libre**

Saisissez directement dans la zone de texte jaune pâle en bas de chaque rubrique.

### Mini-cartes des livrables

Sous l'en-tête, trois cartes affichent les scores intermédiaires en temps réel :

```
┌───────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   Planning    │  │  Schéma des flux │  │ Fiche de cadrage │
│   14 / 20     │  │  12 / 20 × 0,5   │  │   14 / 20        │
└───────────────┘  └──────────────────┘  └──────────────────┘
```

La mention `× 0,5` indique qu'une pénalité 1ère version est appliquée.

### Naviguer entre étudiants

En bas de la vue Evaluation :

- **← Précédent** — étudiant précédent dans la liste filtrée
- **Suivant →** — étudiant suivant dans la liste filtrée

La saisie est conservée automatiquement à chaque changement d'étudiant.

---

## 6. Comprendre le calcul de la note

### Formule générale

La note de chaque livrable est calculée ainsi :

```
Note livrable (/20) = (somme de vos notes) × 2 ÷ (nombre de critères)
```

| Niveau | Livrable | Critères | Exemple (tous à 7) |
|---|---|---|---|
| BUT2 | Planning | 4 | (7+7+7+7) × 2 ÷ 4 = **14/20** |
| BUT2 | Schéma des flux | 4 | idem |
| BUT2 | Fiche de cadrage | 4 | idem |
| BUT3 | Fiche de cadrage | 5 | (7×5) × 2 ÷ 5 = **14/20** |
| BUT3 | Schéma des flux | 4 | idem BUT2 |
| BUT3 | Tableau de bord | 4 | idem BUT2 |

### Pénalité 1ère version

Si **Non** est sélectionné : `note du livrable × 0,5`

Exemple : Planning noté 14/20 avec Non → **7/20** affiché.

### Note finale

```
Note finale = (Planning + Flux + Fiche de cadrage) ÷ 3
```

Affichée sur 20 et sur 60 dans l'en-tête de l'étudiant.

### Bonus participation

Dans la section **Commentaires et validation**, vous pouvez attribuer un bonus de 0 à 5 points qui s'ajoute à la note finale.

---

## 7. Personnaliser les commentaires rapides

Chaque rubrique dispose d'un bouton **+ Gérer** (en bleu) pour modifier vos presets de commentaires.

### Ouvrir le gestionnaire

Cliquez sur **+ Gérer** à côté d'une rubrique.

```
┌─────────────────────────────────────────────────────────────┐
│ Presets — Planning — BUT2                                   │
├─────────────────────────────────────────────────────────────┤
│ Planning trop général…           [ Modifier ] [ Supprimer ] │
│ Les jalons ne sont pas assez…    [ Modifier ] [ Supprimer ] │
│ ─────────────────────────────────────────────────────────── │
│ [ + Ajouter un commentaire ]                                │
└─────────────────────────────────────────────────────────────┘
```

### Modifier un preset

1. Cliquez **Modifier** → une zone de texte s'ouvre
2. Corrigez le texte
3. Cliquez **Enregistrer**

### Ajouter un preset

1. Cliquez **+ Ajouter un commentaire**
2. Saisissez votre texte
3. Cliquez **Ajouter**

### Supprimer un preset

Cliquez **Supprimer** puis confirmez.

> Les presets BUT2 et BUT3 sont indépendants. Gérez-les séparément en changeant le filtre de niveau.

> Les presets sont sauvegardés en base avec le reste de la campagne.

---

## 8. Valider une évaluation

Une fois tous les critères remplis et les commentaires saisis :

1. Remplissez le champ **Évaluateur** (votre nom) ou cliquez sur votre nom dans la liste rapide
2. Ajoutez un **Commentaire général** (synthèse, points forts, axes d'amélioration)
3. Cliquez sur le bouton jaune **Valider l'évaluation**

Le badge passe de **Brouillon** à **Validé** (vert). La date de validation est enregistrée.

> Vous pouvez modifier une évaluation après validation — elle repassera automatiquement en brouillon.

### Envoyer les commentaires par mail

Sous le bouton Valider, cliquez **Envoyer par mail** pour ouvrir votre messagerie avec le mail de l'étudiant pré-rempli et le commentaire en corps du message.

---

## 9. Consulter le tableau de bord

Cliquez sur l'onglet **Tableau**.

### Les chiffres clés

```
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│ Etudiants  │ │ Complétées │ │  À faire   │ │ Moyenne/20 │
│     7      │ │     4      │ │     3      │ │   13,4     │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
```

### Filtrer le tableau

Utilisez la barre de filtre en haut de la vue Tableau pour restreindre les statistiques à un niveau (BUT2/BUT3) ou un parcours.

### Les alertes

La section **Alertes** signale les étudiants avec des évaluations incomplètes. C'est utile pour savoir qui relancer en priorité.

---

## 10. Imprimer le récapitulatif des notes

Cliquez sur l'onglet **Recap**.

### Filtrer avant d'imprimer

Utilisez les filtres **Niveau** et **Parcours** en haut du tableau pour n'afficher que les étudiants souhaités.

### Imprimer

Cliquez sur le bouton **Imprimer notes** (en haut à droite du Recap) pour ouvrir la boîte de dialogue d'impression de votre navigateur.

Seul le tableau est imprimé — la barre latérale et les boutons disparaissent automatiquement.

### Exporter les commentaires

Cliquez sur **Commentaires PDF** pour générer un document avec les commentaires détaillés de chaque étudiant.

### Envoi groupé

Cliquez sur **Envoi groupé** pour ouvrir votre messagerie et envoyer les commentaires à tous les étudiants filtrés en une opération.

---

## 11. Gérer plusieurs campagnes

### Créer une nouvelle campagne

1. Dans la barre latérale, cliquez **Nouvelle** (sous le nom de campagne)
2. Saisissez le nom dans le champ (ex. `"Stage BUT3 2026-2027"`)
3. Cliquez **Renommer**

### Changer de campagne

Cliquez sur la liste déroulante **Campagne active** et sélectionnez la campagne souhaitée. Les données se rechargent immédiatement.

### Supprimer une campagne

Cliquez **Supprimer** puis confirmez. Cette action est irréversible.

---

## 12. Sauvegarde et export

### Sauvegarde automatique

L'application sauvegarde automatiquement toutes les **30 secondes** vers la base de données GitHub. Vous n'avez rien à faire. Un indicateur ✓ en vert en haut à droite confirme la dernière sauvegarde réussie.

> La sauvegarde se déclenche aussi à la fermeture de l'onglet ou de la fenêtre.

### Sauvegarde manuelle

Cliquez sur l'onglet **Sauvegarde** puis sur le bouton **Sauvegarder maintenant** pour forcer une sauvegarde immédiate.

### Exporter une copie de secours

Dans l'onglet Sauvegarde :

| Bouton | Ce qu'il fait |
|---|---|
| **Exporter CSV** | Télécharge un fichier tableur lisible dans Excel |
| **Exporter JSON local** | Télécharge une copie complète de la campagne (format technique) |

### Restaurer depuis un fichier JSON

1. Cliquez **Importer un JSON**
2. Sélectionnez le fichier JSON précédemment exporté
3. La campagne est restaurée dans son état au moment de l'export

---

## 13. Changer de thème visuel

En haut de la barre latérale, quatre petits cercles colorés :

| Couleur | Thème |
|---|---|
| 🟡 Jaune | Contraste jaune (défaut) — très lisible en salle de cours |
| 🔵 Bleu | IUT bleu — sobre, adapté aux présentations |
| 🟣 Violet | Nuit violet — pour travailler dans l'obscurité |
| 🟢 Vert | Océan vert — reposant pour les longues sessions |

Le thème choisi est mémorisé et restauré au prochain démarrage.

---

## 14. Questions fréquentes

**L'application ne se charge pas.**  
Vérifiez votre connexion internet et que l'URL est correcte. Si le problème persiste, contactez l'administrateur.

**Mes données ont disparu après un rechargement.**  
Vos données sont sauvegardées toutes les 30 secondes. Si la page s'est rechargée normalement, elles devraient se restaurer automatiquement. Si elles semblent perdues, allez dans l'onglet **Sauvegarde** → **Importer un JSON** pour restaurer votre dernière copie de secours.

**La colonne TP affiche "?" pour certains étudiants.**  
Le nom de la colonne TP dans votre fichier Excel n'est pas encore reconnu. Notez le nom exact et signalez-le à l'administrateur (ex. `"Groupe TP FI-FIA"`).

**Je vois la grille BUT2 mais mon étudiant est en BUT3.**  
Allez dans l'onglet **Fiche** et vérifiez que le sélecteur **BUT2 / BUT3** est bien positionné sur BUT3. Vous pouvez aussi changer le niveau directement depuis la fiche.

**Le bouton "Valider l'évaluation" ne fait rien.**  
Vérifiez qu'au moins un critère est rempli et qu'un évaluateur est renseigné.

**Puis-je travailler depuis deux ordinateurs en même temps ?**  
Oui, mais évitez de modifier le même étudiant simultanément depuis deux postes. La sauvegarde gère les conflits automatiquement (3 tentatives), mais des doublons de saisie peuvent apparaître si les deux postes valident en même temps.

**Comment utiliser l'application sans internet ?**  
Utilisez la version Electron (`.exe`). Elle fonctionne sans internet ; les données sont synchronisées vers GitHub quand la connexion revient.
