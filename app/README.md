# Prototype - Evaluation 1/3 stage BUT QLIO

## Lancement

Ouvrir `index.html` dans un navigateur moderne depuis le dossier SharePoint.

Au demarrage, l'application oblige l'utilisateur a charger une sauvegarde JSON. Il faut choisir le dernier fichier JSON disponible dans le dossier SharePoint avant de commencer la saisie.

## Application Windows Electron

Une version Windows autonome est disponible dans :

`../dist/Evaluation-1-3-Stage-QLIO.exe`

Cette version ouvre l'application dans une fenetre dediee avec un ecran de demarrage. Elle utilise les boites de dialogue Windows pour charger et enregistrer les fichiers JSON, ce qui evite les differences entre navigateurs.

Pour reconstruire le `.exe` apres modification :

```bash
npm install
npm run dist
```

## Fonctionnalites V1

- creation d'une campagne locale ;
- import d'une liste etudiants Excel ou CSV ;
- recherche et filtres par parcours/statut ;
- navigation par etudiant ;
- saisie de la grille 1/3 stage ;
- calcul automatique sur 60 et sur 20 ;
- bonus participation ;
- validation d'une evaluation ;
- fiche etudiant/stage ;
- tableau de bord d'avancement ;
- comparaison des notes par groupe, par etudiant et par livrable ;
- affichage des notes intermediaires : planning, schema des flux, fiche de cadrage ;
- infobulles d'aide pour chaque critere d'evaluation ;
- feuille recap imprimable ;
- mode SharePoint simple par fichier HTML et sauvegardes JSON ;
- ecran de demarrage bloquant tant que le dernier JSON n'est pas charge ;
- sauvegarde automatique dans le navigateur ;
- export CSV ;
- export/restauration JSON avec sauvegardes horodatees ;
- alerte avant fermeture si des modifications n'ont pas ete enregistrees dans un JSON ;
- themes contraste jaune par defaut, IUT bleu, nuit violet et ocean vert ;
- raccourcis : fleches pour changer d'etudiant, `E` evaluation, `F` fiche, `T` tableau, `R` recap, `Ctrl+S` sauvegarde.

## Note technique

L'import Excel utilise la bibliotheque `xlsx-js-style` chargee depuis CDN. Si le poste n'a pas acces a Internet, exporter la liste etudiants en CSV permet de conserver un import de secours.

## Travail collaboratif SharePoint simple

1. Ouvrir l'application HTML depuis SharePoint.
2. Charger obligatoirement le dernier fichier `.json` du dossier SharePoint.
3. Travailler normalement : le navigateur garde aussi une sauvegarde locale de secours.
4. Avant de fermer, enregistrer le JSON de travail ou creer une sauvegarde JSON horodatee.
5. Deposer la nouvelle sauvegarde dans SharePoint sans supprimer ni remplacer les anciennes.

Attention : ce mode ne fusionne pas automatiquement deux saisies faites en meme temps a partir du meme fichier. Il faut donc se repartir le travail et conserver toutes les sauvegardes pour pouvoir retrouver une information si besoin.
