# Creation des listes SharePoint QLIO

Ce dossier contient le script de creation des listes SharePoint pour l'application d'evaluation 1/3 stage BUT QLIO 2e annee.

## Prerequis

- Avoir un compte avec les droits de creation/modification de listes sur :
  `https://ueve.sharepoint.com/sites/TEAMQLIO`
- Utiliser PowerShell.
- Installer le module PnP.PowerShell si necessaire.

## Installation du module PnP.PowerShell

Dans PowerShell :

```powershell
Install-Module PnP.PowerShell -Scope CurrentUser
```

Si PowerShell demande confirmation, accepter.

## Lancer le script

Depuis le dossier du projet :

```powershell
.\sharepoint\create-qlio-lists.ps1
```

Ou avec l'URL explicitement :

```powershell
.\sharepoint\create-qlio-lists.ps1 -SiteUrl "https://ueve.sharepoint.com/sites/TEAMQLIO"
```

Une fenetre de connexion Microsoft s'ouvrira.

## Listes creees

- `QLIO_Campagnes`
- `QLIO_Etudiants`
- `QLIO_Evaluations_1_3_Stage`
- `QLIO_Journal_Modifications`

Le script est idempotent : il peut etre relance. Il ne recree pas les listes ou colonnes deja presentes.

## Etape suivante

Une fois les listes creees, l'application pourra etre adaptee pour lire/ecrire directement dans ces listes via l'API REST SharePoint du site.
