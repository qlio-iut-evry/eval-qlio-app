# Architecture collaborative SharePoint - Evaluation 1/3 stage BUT QLIO 2e annee

## Objectif utilisateur

L'utilisateur doit ouvrir l'application et retrouver directement les donnees a jour, sans manipuler de fichier JSON, sans importer/exporter manuellement a chaque utilisation.

Plusieurs evaluateurs doivent pouvoir travailler en meme temps. Les modifications doivent etre visibles par les autres utilisateurs autorises.

## Conclusion technique

Un fichier partage dans SharePoint n'est pas adapte a ce besoin. Il ne permet pas une collaboration simultanee fiable sur des donnees structurees.

La solution recommandee initiale est :

- application web hebergee sur SharePoint ou une URL interne ;
- authentification Microsoft 365 deja portee par SharePoint ;
- donnees stockees dans des listes SharePoint ;
- lecture/ecriture via l'API REST SharePoint du site `TEAMQLIO` ;
- sauvegarde automatique a chaque modification importante ;
- rechargement automatique ou bouton de synchronisation ;
- gestion des conflits par horodatage et version d'element.

Cette approche evite d'avoir besoin du `Tenant ID` et du `Client ID` dans un premier temps. Elle impose en revanche que l'application soit ouverte depuis le site SharePoint, par exemple depuis une bibliotheque `Documents`, `SiteAssets` ou une page du site.

## Workflow cible

1. L'evaluateur ouvre l'application.
2. Il est reconnu avec son compte Microsoft 365.
3. SharePoint authentifie deja l'utilisateur.
4. L'application charge automatiquement la campagne active depuis les listes SharePoint.
5. L'evaluateur modifie les notes ou commentaires.
6. Chaque modification est sauvegardee dans SharePoint.
7. Les autres evaluateurs voient les changements apres synchronisation.
8. Le responsable peut suivre l'avancement global en temps reel.

## Listes SharePoint recommandees

### 1. QLIO_Campagnes

Une ligne par campagne.

Colonnes :

- Title : nom de campagne, par exemple `2025-2026`
- AnneeDebut : nombre
- AnneeFin : nombre
- Statut : choix `Preparation`, `Ouverte`, `Cloturee`, `Archivee`
- GrilleVersion : texte
- CreatedAt : date
- UpdatedAt : date

### 2. QLIO_Etudiants

Une ligne par etudiant et par campagne.

Colonnes :

- Title : nom complet
- CampagneId : lookup vers `QLIO_Campagnes`
- Nom : texte
- Prenom : texte
- Civilite : texte
- Parcours : choix `QMI`, `OSC`, `MTD`
- TD : texte
- TP : texte
- Etat : texte
- MailUniversitaire : texte
- MailPersonnel : texte
- Entreprise : texte
- Sujet : texte long
- TuteurPedagogique : texte
- MaitreStage : texte
- Evaluateur : texte ou personne

### 3. QLIO_Evaluations_1_3_Stage

Une ligne par evaluation etudiant.

Colonnes :

- Title : nom etudiant + campagne
- CampagneId : lookup
- EtudiantId : lookup
- Evaluateur : personne ou texte
- Statut : choix `A faire`, `En cours`, `Valide`
- PlanningDepotInitial : oui/non
- PlanningDemarche : nombre
- PlanningRealisme : nombre
- PlanningApportsJournee : nombre
- PlanningPresentation : nombre
- PlanningNote : nombre
- FluxDepotInitial : oui/non
- FluxDetail : nombre
- FluxClarte : nombre
- FluxApportsJournee : nombre
- FluxPresentation : nombre
- FluxNote : nombre
- CadrageDepotInitial : oui/non
- CadrageDefinition : nombre
- CadrageExistant : nombre
- CadrageApportsJournee : nombre
- CadragePresentation : nombre
- CadrageNote : nombre
- BonusParticipation : nombre
- NoteSur60 : nombre
- NoteSur20 : nombre
- Commentaire : texte long
- ValideLe : date
- ModifieLe : date
- ModifiePar : personne ou texte

### 4. QLIO_Journal_Modifications

Optionnel mais recommande.

Colonnes :

- Title : action
- CampagneId : lookup
- EtudiantId : lookup
- EvaluationId : lookup
- Action : texte
- AncienneValeur : texte long
- NouvelleValeur : texte long
- Utilisateur : personne ou texte
- DateAction : date

## Gestion des droits

Les droits doivent etre portes par SharePoint :

- responsables : lecture/ecriture sur toutes les listes ;
- evaluateurs : lecture de la campagne, ecriture sur les evaluations autorisees ;
- consultation : lecture seule si necessaire.

La premiere version peut utiliser les droits de la liste SharePoint globale. Une version plus avancee pourra filtrer strictement par evaluateur dans l'application.

## Gestion des conflits

Chaque evaluation doit conserver :

- date de derniere modification ;
- utilisateur de derniere modification ;
- version SharePoint de l'element.

Si deux utilisateurs modifient le meme etudiant, l'application doit avertir :

`Cette evaluation a ete modifiee par un autre utilisateur. Recharger avant d'enregistrer ?`

## Informations necessaires pour developper la connexion sans Entra ID

Pour brancher l'application a SharePoint, il faut :

- URL du site SharePoint : `https://ueve.sharepoint.com/sites/TEAMQLIO` ;
- droit de creer ou modifier les listes du site ;
- droit d'ajouter les fichiers de l'application dans une bibliotheque SharePoint ;
- nom exact ou identifiant des listes ;
- choix d'hebergement : bibliotheque SharePoint, page SharePoint ou Teams.

Dans cette option, le `Client ID` et le `Tenant ID` ne sont pas indispensables au demarrage.

## Option avancee avec Microsoft Graph

Une connexion Microsoft Graph avec Entra ID reste possible plus tard, mais elle demande :

- autorisation de creer une application Microsoft Entra ID ;
- Client ID de l'application Entra ;
- Tenant ID Microsoft 365 ;
- politique de droits souhaitee pour les evaluateurs.

## Configuration retenue a ce stade

Site SharePoint :

`https://ueve.sharepoint.com/sites/TEAMQLIO`

Noms de listes proposes :

- `QLIO_Campagnes`
- `QLIO_Etudiants`
- `QLIO_Evaluations_1_3_Stage`
- `QLIO_Journal_Modifications`

Ces noms sont deja preconfigures dans `app/sharepoint-config.js`.

Mode d'authentification retenu dans `app/sharepoint-config.js` :

`sharepoint-rest-same-site`

Cela signifie : l'application doit etre deposee sur le site SharePoint, et elle utilisera la session SharePoint deja ouverte de l'utilisateur.

## Prochaine etape de developpement

1. Creer les listes SharePoint.
2. Deposer l'application sur le site SharePoint.
3. Remplacer le stockage local par les appels REST SharePoint.
4. Ajouter la synchronisation automatique.
5. Ajouter la gestion des conflits.
6. Passer a Microsoft Graph plus tard seulement si la DSI le demande.
