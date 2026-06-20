# Cahier des charges - Application d'evaluation 1/3 stage BUT2 QLIO

## 1. Contexte et objectif

Le departement QLIO souhaite disposer d'une application moderne permettant d'evaluer les rendus de 1/3 stage des etudiants de deuxieme annee du BUT QLIO.

Aujourd'hui, l'evaluation est suivie dans un classeur Excel annuel. Ce fonctionnement est souple, mais il oblige l'evaluateur a manipuler beaucoup de colonnes, a reporter des informations manuellement, a surveiller les formules et a conserver les historiques par fichiers separes.

L'application devra donc :

- reduire au maximum les actions de l'evaluateur ;
- fiabiliser les calculs de notes ;
- conserver les evaluations d'une annee sur l'autre ;
- permettre l'evolution des grilles et des criteres sans redevelopper toute l'application ;
- offrir une interface ergonomique, claire, rapide et utilisable pendant les journees d'evaluation.

## 2. Analyse des fichiers Excel existants

### 2.1 Fichier d'evaluation

Fichier analyse : `Eval_tiers stage BUT2 2024-2025.xlsx`.

Le classeur contient principalement une feuille d'evaluation annuelle avec :

- la liste des etudiants ;
- le parcours ou groupe : QMI, OSC, MTD ;
- l'evaluateur 1/3 stage ;
- le tuteur pedagogique ;
- l'entreprise d'accueil ;
- le sujet du stage ;
- un bonus de participation ;
- un commentaire general ;
- trois blocs d'evaluation du rendu 1/3 stage :
  - Planning ;
  - Schema des flux ;
  - Fiche de cadrage ;
- une note 1/3 stage sur 60 ;
- une note 1/3 stage ramenee sur 20 ;
- des colonnes de suivi plus global du stage : visite tuteur, ecrit 1, ecrit 2, moyenne ecrit, oral, entreprise, note finale ;
- des informations administratives complementaires : societe, maitre de stage, genre, titre, telephone, adresse, mail, adresse pendant le stage.

Chaque bloc d'evaluation comprend une question de depot initial, de type "1ere version rendue au debut de journee ?", puis plusieurs criteres notes sur 5.

Le comportement actuel semble etre :

- si la premiere version est rendue, le bloc est note normalement ;
- sinon, la note du bloc est divisee par deux ;
- les trois blocs sont additionnes ;
- un bonus de participation peut etre ajoute ;
- la note finale 1/3 stage est calculee sur 60 puis ramenee sur 20.

Points de vigilance observes :

- certaines formules contiennent des references cassees dans les lignes de moyenne ;
- une formule de ligne etudiant semble pointer vers la mauvaise cellule ;
- les listes de valeurs existent mais ne sont pas visibles sous forme de workflow applicatif ;
- l'ergonomie Excel expose trop de colonnes a la fois ;
- la conservation annuelle depend du classement manuel des fichiers.

### 2.2 Fichier de liste etudiants

Fichier analyse : `etudiants_QlioDutFI_S4.xlsx`.

Le fichier contient une liste de promotion avec :

- civilite ;
- nom ;
- prenom ;
- parcours ;
- CM ;
- TD ;
- TP FI/FIA ;
- etat ;
- mail universitaire ;
- mail personnel.

Ce fichier doit servir de source d'import annuelle pour creer automatiquement la promotion et pre-remplir les fiches etudiants.

### 2.3 Page HTML de reference ergonomique

Fichier analyse : `fiches-poursuite-BUT-QLIO.html`.

Cette page sert de reference pour la forme attendue. Elle montre une application orientee usage quotidien, avec une barre laterale, une gestion des promotions, une recherche etudiante, plusieurs vues de travail, une zone d'import Excel, des exports PDF/Excel, une sauvegarde/restauration de session, un mode sombre, des raccourcis clavier et un apercu imprimable.

Les principes a reprendre sont :

- une interface plein ecran, sans sensation de formulaire administratif lourd ;
- une navigation laterale par etudiant ;
- des filtres rapides ;
- des vues separees selon l'action a effectuer ;
- des boutons d'action visibles en permanence ;
- des infobulles pour guider sans surcharger l'ecran ;
- une zone d'import par clic ou glisser-deposer ;
- un indicateur de chargement lors des imports ;
- des exports individuels et de masse ;
- un mode clair et un mode sombre ;
- des raccourcis clavier pour les utilisateurs intensifs ;
- un apercu propre avant impression ou export PDF.

## 3. Utilisateurs et roles

### 3.1 Administrateur pedagogique

Il parametre l'annee universitaire, importe la promotion, definit la grille d'evaluation, affecte les evaluateurs et controle la cloture des evaluations.

### 3.2 Evaluateur 1/3 stage

Il consulte uniquement les etudiants qui lui sont affectes, saisit les notes et commentaires, puis valide l'evaluation.

### 3.3 Tuteur pedagogique

Il peut consulter les informations de suivi de ses etudiants et, selon les droits retenus, completer certaines donnees de stage.

### 3.4 Responsable de formation

Il dispose d'une vue globale : avancement des evaluations, notes, statistiques, exports, historique par annee.

## 4. Perimetre fonctionnel attendu

### 4.1 Gestion des annees universitaires

L'application doit permettre de creer une nouvelle campagne d'evaluation par annee universitaire.

Fonctionnalites attendues :

- creation d'une annee universitaire ;
- duplication possible des parametres de l'annee precedente ;
- archivage des campagnes terminees ;
- consultation des evaluations des annees precedentes ;
- conservation des anciennes grilles meme si la grille courante evolue.

### 4.2 Import de la promotion

L'application doit permettre d'importer un fichier Excel de liste etudiants.

Fonctionnalites attendues :

- import depuis un fichier `.xlsx` ;
- reconnaissance ou mapping des colonnes : civilite, nom, prenom, parcours, TD, TP, etat, mails ;
- detection des lignes incompletes ;
- controle des doublons ;
- affichage d'un resume avant validation ;
- creation ou mise a jour des fiches etudiants ;
- conservation de la source d'import pour audit.

L'objectif est que l'administrateur n'ait pas a recopier les noms, parcours, TD ou TP.

### 4.3 Fiche etudiant

Chaque etudiant doit disposer d'une fiche centralisee contenant :

- identite : civilite, nom, prenom ;
- parcours : QMI, OSC, MTD ;
- TD et TP ;
- mails ;
- statut ;
- entreprise d'accueil ;
- sujet de stage ;
- tuteur pedagogique ;
- evaluateur 1/3 stage ;
- maitre de stage ;
- coordonnees utiles ;
- historique des evaluations.

### 4.4 Affectation des evaluateurs

L'application doit simplifier l'affectation des evaluateurs.

Fonctionnalites attendues :

- affectation manuelle par etudiant ;
- affectation en masse par parcours, TD, TP ou groupe ;
- reutilisation des affectations de l'annee precedente si pertinent ;
- filtre par evaluateur ;
- detection des etudiants sans evaluateur ;
- vue de charge par evaluateur.

### 4.5 Grille d'evaluation 1/3 stage

La grille initiale doit reprendre la logique du classeur existant.

Blocs minimaux :

1. Planning
   - Premiere version rendue au debut de journee : oui/non.
   - Demarche d'amelioration retenue : note sur 5.
   - Realisme du planning et presence de jalons pertinents : note sur 5.
   - Prise en compte des apports de la journee 1/3 stage : note sur 5.
   - Presentation : note sur 5.

2. Schema des flux
   - Premiere version rendue au debut de journee : oui/non.
   - Pertinence du niveau de detail : note sur 5.
   - Clarte et explications : note sur 5.
   - Prise en compte des apports de la journee 1/3 stage : note sur 5.
   - Presentation : note sur 5.

3. Fiche de cadrage
   - Premiere version rendue au debut de journee : oui/non.
   - Definition du projet et des objectifs : note sur 5.
   - Analyse de l'existant : note sur 5.
   - Prise en compte des apports de la journee 1/3 stage : note sur 5.
   - Presentation : note sur 5.

Regles de calcul :

- chaque critere est note de 0 a 5 ;
- si la premiere version du bloc n'a pas ete rendue, la note du bloc est penalisee selon le coefficient configure, par defaut division par deux ;
- le bonus participation est ajoute a la note 1/3 stage si renseigne ;
- la note 1/3 stage est calculee sur 60 ;
- la note est convertie sur 20 ;
- tous les calculs doivent etre automatiques, visibles et verrouilles contre les erreurs de formule.

### 4.6 Saisie d'evaluation ultra-rapide

L'evaluateur doit pouvoir noter un etudiant avec le moins d'actions possible.

Ergonomie attendue :

- une page "Mes evaluations" avec uniquement les etudiants de l'evaluateur ;
- recherche rapide par nom ;
- filtres : a faire, en cours, complete, parcours, TD, entreprise ;
- fiche d'evaluation en une seule page ;
- boutons oui/non pour le depot initial ;
- notation par boutons 0, 1, 2, 3, 4, 5 ou par curseur ;
- navigation clavier possible ;
- sauvegarde automatique ;
- calcul de la note en temps reel ;
- indicateur de progression ;
- commentaires rapides avec modeles reutilisables ;
- validation finale avec controle des champs manquants ;
- possibilite de revenir modifier tant que la campagne n'est pas cloturee.

### 4.7 Aide a la decision pour l'evaluateur

Pour simplifier la vie de l'evaluateur, l'application doit proposer :

- une grille compacte lisible sans defilement horizontal ;
- des libelles de criteres courts avec aide contextuelle ;
- des badges d'alerte si un critere est oublie ;
- une alerte si une note semble incoherente avec les autres blocs ;
- des commentaires types modifiables ;
- une synthese automatique de l'evaluation ;
- un rappel des informations stage : entreprise, sujet, tuteur ;
- un mode "evaluation rapide" pour enchainement d'etudiants ;
- un mode "revue" pour verifier toutes les evaluations avant cloture.

### 4.8 Tableau de bord

L'application doit fournir un tableau de bord pour suivre la campagne.

Indicateurs attendus :

- nombre d'etudiants importes ;
- nombre d'etudiants par parcours ;
- evaluations a faire ;
- evaluations en cours ;
- evaluations finalisees ;
- etudiants sans evaluateur ;
- etudiants sans entreprise ou sans sujet ;
- moyenne par parcours ;
- distribution des notes ;
- alertes sur donnees manquantes ;
- progression par evaluateur.

### 4.9 Exports

L'application doit permettre d'exporter les donnees.

Exports attendus :

- export Excel complet compatible avec le suivi actuel ;
- export Excel par evaluateur ;
- export PDF d'une fiche individuelle ;
- export PDF ou Excel de synthese de campagne ;
- export des commentaires ;
- export anonymise pour statistiques si necessaire.

Les exports doivent conserver les calculs et les libelles de criteres afin que les donnees restent exploitables hors de l'application.

### 4.10 Conservation et historique

L'application doit assurer la conservation fiable des evaluations.

Exigences :

- base de donnees persistante ;
- sauvegarde automatique ;
- historique par annee universitaire ;
- historisation des grilles utilisees ;
- journal des modifications importantes ;
- date de validation de chaque evaluation ;
- identification de l'utilisateur ayant valide ;
- possibilite de restaurer ou consulter une ancienne campagne ;
- export d'archive en fin d'annee.

### 4.11 Parametrage evolutif de la grille

Pour permettre l'evolution d'annee en annee, la grille doit etre configurable.

Parametres attendus :

- creation de blocs d'evaluation ;
- ajout, modification ou desactivation de criteres ;
- note maximale par critere ;
- coefficient par bloc ou critere ;
- penalite si document non rendu ;
- bonus ;
- libelles affiches ;
- aide contextuelle ;
- ordre d'affichage ;
- date d'application ;
- duplication d'une grille existante.

Important : une ancienne evaluation doit rester liee a la version de grille utilisee au moment de sa saisie.

## 5. Parcours utilisateur cible

### 5.1 Preparation de l'annee

1. Le responsable cree l'annee universitaire.
2. Il importe la liste des etudiants.
3. L'application signale les anomalies : parcours manquant, mail absent, doublon.
4. Le responsable affecte les evaluateurs.
5. La campagne est ouverte.

### 5.2 Evaluation

1. L'evaluateur ouvre "Mes evaluations".
2. Il selectionne un etudiant.
3. Les informations administratives sont deja pre-remplies.
4. Il renseigne les oui/non, les notes et les commentaires.
5. La note est calculee instantanement.
6. L'application signale les champs manquants.
7. L'evaluateur valide.
8. Il passe directement a l'etudiant suivant.

### 5.3 Cloture

1. Le responsable verifie le tableau de bord.
2. Il corrige les donnees manquantes.
3. Il verrouille la campagne.
4. Il exporte les resultats.
5. Les donnees restent consultables l'annee suivante.

## 6. Exigences ergonomiques

L'application doit etre moderne, rapide et adaptee a un usage terrain.

Principes d'interface :

- design clair, professionnel et sobre ;
- interface responsive, utilisable sur ordinateur portable et tablette ;
- pas de tableau geant horizontal pour la saisie ;
- priorite a la fiche etudiant et aux actions rapides ;
- navigation fluide entre etudiants ;
- sauvegarde automatique visible ;
- etats clairs : brouillon, complet, valide, verrouille ;
- couleurs utilisees pour guider sans surcharger ;
- messages d'erreur simples ;
- impression ou export propre.

### 6.1 Structure d'ecran recommandee

L'application doit reprendre une organisation proche de la page HTML fournie :

- a gauche, une barre laterale listant les etudiants ;
- en haut, une barre d'actions permanente ;
- au centre, la vue active ;
- en bas ou dans la barre laterale, les actions d'import et de sauvegarde.

La barre laterale doit contenir :

- le nom de la campagne ;
- le nombre d'etudiants ;
- une recherche ;
- des filtres par statut et parcours ;
- la liste des etudiants avec badges de parcours ;
- un indicateur visuel des evaluations incompletes ou non sauvegardees.

La barre d'actions doit contenir :

- les vues principales : tableau de bord, evaluation, fiche etudiant, apercu, exports, parametrage ;
- les actions de campagne : importer, sauvegarder, restaurer, exporter, cloturer ;
- les utilitaires : mode sombre, raccourcis, aide.

### 6.2 Vues applicatives attendues

Les vues minimales sont :

- Tableau de bord : suivi global de la campagne.
- Mes evaluations : liste filtree des etudiants affectes.
- Evaluation rapide : saisie des criteres et commentaires.
- Fiche etudiant : informations stage et administratif.
- Apercu : rendu imprimable ou exportable.
- Parametrage : grille, coefficients, penalites, evaluateurs.
- Archives : anciennes campagnes.

Chaque vue doit etre specialisee. L'evaluateur ne doit pas avoir a travailler dans un grand tableau unique comme dans Excel.

### 6.3 Interactions avancees attendues

L'application doit integrer des interactions modernes :

- glisser-deposer pour les fichiers Excel ;
- sauvegarde automatique ;
- badge "modifications non sauvegardees" si necessaire ;
- raccourcis clavier pour passer a l'etudiant suivant ou precedent ;
- raccourcis clavier pour changer de vue ;
- confirmation avant action destructive ;
- infobulles sur les boutons ;
- chargement progressif avec barre de progression ;
- messages d'erreur regroupes et comprehensibles ;
- preference utilisateur pour le mode clair ou sombre ;
- persistance des filtres et de la derniere vue ouverte.

### 6.4 Direction graphique

La direction graphique doit rester dans l'esprit de la page fournie :

- univers QLIO/IUT clair, institutionnel et moderne ;
- dominante bleu/navy, mais avec couleurs de statut distinctes ;
- typographie sans-serif lisible pour l'interface ;
- cartes et panneaux sobres ;
- boutons compacts et explicites ;
- badges de parcours visibles ;
- densite d'information elevee mais lisible ;
- couleurs d'alerte normalisees : succes, attention, erreur ;
- version imprimable sobre et professionnelle.

L'interface doit donner l'impression d'un outil metier abouti, pas d'une simple feuille Excel transposee dans un navigateur.

## 7. Exigences techniques

### 7.1 Architecture recommandee

Application web moderne avec :

- frontend dynamique ;
- backend applicatif ;
- base de donnees relationnelle ;
- systeme d'authentification ;
- module d'import/export Excel ;
- module de generation PDF ;
- sauvegardes automatisees.

Architecture possible :

- Frontend : React, Vue ou Svelte ;
- Backend : Node.js, Python/FastAPI ou framework equivalent ;
- Base de donnees : PostgreSQL pour une solution partagee, SQLite pour un premier prototype local ;
- Authentification : comptes internes ou connexion institutionnelle si disponible ;
- Export : generation Excel et PDF cote serveur.

### 7.2 Donnees principales

Entites a prevoir :

- Annee universitaire ;
- Campagne d'evaluation ;
- Etudiant ;
- Parcours ;
- Groupe TD ;
- Groupe TP ;
- Entreprise ;
- Stage ;
- Utilisateur ;
- Role ;
- Affectation evaluateur ;
- Grille d'evaluation ;
- Version de grille ;
- Bloc d'evaluation ;
- Critere ;
- Evaluation ;
- Reponse de critere ;
- Commentaire ;
- Export ;
- Journal d'audit.

### 7.3 Securite et droits

L'application doit prevoir :

- connexion obligatoire ;
- droits differencies selon les roles ;
- limitation de l'acces aux etudiants affectes ;
- verrouillage des campagnes cloturees ;
- sauvegarde des donnees ;
- journalisation des validations ;
- protection contre la suppression accidentelle.

### 7.4 Qualite et fiabilite

Attendus :

- tests automatiques sur les calculs de notes ;
- tests d'import Excel ;
- tests d'export ;
- controle des donnees obligatoires ;
- gestion des erreurs d'import ;
- documentation courte pour administrateur et evaluateur.

## 8. Fonctionnalites prioritaires pour une premiere version

### Version 1 - Socle indispensable

- import de la liste etudiants depuis Excel ;
- creation d'une campagne annuelle ;
- gestion des etudiants ;
- affectation des evaluateurs ;
- grille 1/3 stage conforme au fichier actuel ;
- saisie rapide des notes ;
- calcul automatique sur 60 et sur 20 ;
- commentaires ;
- tableau de bord d'avancement ;
- export Excel complet ;
- conservation en base de donnees.

### Version 2 - Ergonomie avancee

- commentaires types ;
- mode enchainement d'evaluations ;
- alertes d'incoherence ;
- export PDF individuel ;
- statistiques par parcours ;
- duplication de grille ;
- historique detaille des modifications.

### Version 3 - Evolution et integration

- connexion institutionnelle ;
- import automatique depuis une source scolarite si disponible ;
- workflow de validation multi-role ;
- portail tuteur pedagogique ;
- archivage avance ;
- comparaison des campagnes d'une annee sur l'autre.

## 9. Criteres d'acceptation

L'application sera consideree comme satisfaisante si :

- une promotion peut etre importee sans ressaisie des noms et parcours ;
- un evaluateur peut retrouver uniquement ses etudiants ;
- une evaluation complete peut etre saisie rapidement ;
- les notes sont calculees automatiquement et sans formule visible a corriger ;
- les donnees restent disponibles apres fermeture de l'application ;
- une nouvelle annee peut etre creee sans perdre les anciennes ;
- les grilles peuvent evoluer sans casser les evaluations passees ;
- un export Excel permet de retrouver une synthese proche du fonctionnement actuel ;
- le responsable peut voir en un coup d'oeil ce qui reste a faire.

## 10. Points a clarifier avant developpement

- Faut-il une application locale installee sur un poste ou une application web partagee ?
- Combien d'evaluateurs doivent utiliser l'application en meme temps ?
- Les etudiants ou tuteurs entreprise doivent-ils avoir un acces ?
- Le calcul exact du bonus participation doit-il etre borne ?
- La penalite "document non rendu au debut de journee" doit-elle rester une division par deux ?
- La note 1/3 stage doit-elle rester uniquement sur 60 et sur 20 ?
- Faut-il integrer les autres notes de stage : visite, ecrit, oral, entreprise ?
- Quelle duree legale ou pedagogique de conservation faut-il appliquer ?
- Une authentification par comptes universitaires est-elle possible ?

## 11. Recommandation de demarrage

La meilleure approche consiste a developper d'abord un prototype centre sur le workflow reel de l'evaluateur :

1. importer la promotion ;
2. affecter les evaluateurs ;
3. saisir une evaluation 1/3 stage ;
4. calculer automatiquement la note ;
5. exporter les resultats ;
6. conserver la campagne.

Ce prototype permettra de valider rapidement l'ergonomie avant d'ajouter les fonctions plus avancees de statistiques, d'historique et de parametrage complet.
