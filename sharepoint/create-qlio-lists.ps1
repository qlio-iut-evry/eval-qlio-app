param(
  [string]$SiteUrl = "https://ueve.sharepoint.com/sites/TEAMQLIO"
)

$ErrorActionPreference = "Stop"

function Ensure-Module {
  if (-not (Get-Module -ListAvailable -Name PnP.PowerShell)) {
    Write-Host "Module PnP.PowerShell manquant." -ForegroundColor Yellow
    Write-Host "Installation possible avec : Install-Module PnP.PowerShell -Scope CurrentUser"
    throw "Installez PnP.PowerShell puis relancez le script."
  }
}

function Ensure-List {
  param(
    [string]$Title,
    [string]$Description
  )

  $list = Get-PnPList -Identity $Title -ErrorAction SilentlyContinue
  if ($null -eq $list) {
    Write-Host "Creation liste : $Title" -ForegroundColor Cyan
    New-PnPList -Title $Title -Template GenericList -OnQuickLaunch -EnableVersioning | Out-Null
    Set-PnPList -Identity $Title -Description $Description | Out-Null
  } else {
    Write-Host "Liste deja presente : $Title" -ForegroundColor DarkGray
  }
}

function Ensure-FieldXml {
  param(
    [string]$ListTitle,
    [string]$FieldXml
  )

  [xml]$xml = $FieldXml
  $internalName = $xml.Field.Name
  $existing = Get-PnPField -List $ListTitle -Identity $internalName -ErrorAction SilentlyContinue
  if ($null -eq $existing) {
    Write-Host "  + colonne $internalName" -ForegroundColor Green
    Add-PnPFieldFromXml -List $ListTitle -FieldXml $FieldXml | Out-Null
  } else {
    Write-Host "  = colonne $internalName" -ForegroundColor DarkGray
  }
}

function TextField {
  param([string]$Name, [string]$DisplayName)
  return "<Field Type='Text' Name='$Name' StaticName='$Name' DisplayName='$DisplayName' />"
}

function NoteField {
  param([string]$Name, [string]$DisplayName)
  return "<Field Type='Note' Name='$Name' StaticName='$Name' DisplayName='$DisplayName' NumLines='6' RichText='FALSE' />"
}

function NumberField {
  param([string]$Name, [string]$DisplayName)
  return "<Field Type='Number' Name='$Name' StaticName='$Name' DisplayName='$DisplayName' Min='0' />"
}

function DateField {
  param([string]$Name, [string]$DisplayName)
  return "<Field Type='DateTime' Name='$Name' StaticName='$Name' DisplayName='$DisplayName' Format='DateTime' />"
}

function BooleanField {
  param([string]$Name, [string]$DisplayName)
  return "<Field Type='Boolean' Name='$Name' StaticName='$Name' DisplayName='$DisplayName'><Default>0</Default></Field>"
}

function ChoiceField {
  param([string]$Name, [string]$DisplayName, [string[]]$Choices)
  $choiceXml = ($Choices | ForEach-Object { "<CHOICE>$_</CHOICE>" }) -join ""
  return "<Field Type='Choice' Name='$Name' StaticName='$Name' DisplayName='$DisplayName' Format='Dropdown'><CHOICES>$choiceXml</CHOICES></Field>"
}

function Ensure-Fields {
  param(
    [string]$ListTitle,
    [string[]]$Fields
  )

  Write-Host "Colonnes liste : $ListTitle" -ForegroundColor White
  foreach ($field in $Fields) {
    Ensure-FieldXml -ListTitle $ListTitle -FieldXml $field
  }
}

Ensure-Module

Write-Host "Connexion au site $SiteUrl" -ForegroundColor Cyan
Connect-PnPOnline -Url $SiteUrl -Interactive

Ensure-List -Title "QLIO_Campagnes" -Description "Campagnes annuelles d'evaluation 1/3 stage BUT QLIO 2e annee."
Ensure-List -Title "QLIO_Etudiants" -Description "Etudiants rattaches aux campagnes d'evaluation 1/3 stage."
Ensure-List -Title "QLIO_Evaluations_1_3_Stage" -Description "Evaluations detaillees des rendus de 1/3 stage."
Ensure-List -Title "QLIO_Journal_Modifications" -Description "Journal des modifications importantes."

Ensure-Fields -ListTitle "QLIO_Campagnes" -Fields @(
  (NumberField "AnneeDebut" "Annee debut"),
  (NumberField "AnneeFin" "Annee fin"),
  (ChoiceField "Statut" "Statut" @("Preparation", "Ouverte", "Cloturee", "Archivee")),
  (TextField "GrilleVersion" "Version de grille"),
  (DateField "UpdatedAt" "Derniere mise a jour")
)

Ensure-Fields -ListTitle "QLIO_Etudiants" -Fields @(
  (TextField "CampagneKey" "Campagne"),
  (TextField "Civilite" "Civilite"),
  (TextField "Nom" "Nom"),
  (TextField "Prenom" "Prenom"),
  (ChoiceField "Parcours" "Parcours" @("QMI", "OSC", "MTD")),
  (TextField "TD" "TD"),
  (TextField "TP" "TP"),
  (TextField "Etat" "Etat"),
  (TextField "MailUniversitaire" "Mail universitaire"),
  (TextField "MailPersonnel" "Mail personnel"),
  (TextField "Entreprise" "Entreprise"),
  (NoteField "Sujet" "Sujet de stage"),
  (TextField "TuteurPedagogique" "Tuteur pedagogique"),
  (TextField "MaitreStage" "Maitre de stage"),
  (TextField "Evaluateur" "Evaluateur")
)

Ensure-Fields -ListTitle "QLIO_Evaluations_1_3_Stage" -Fields @(
  (TextField "CampagneKey" "Campagne"),
  (TextField "EtudiantKey" "Etudiant"),
  (TextField "Evaluateur" "Evaluateur"),
  (ChoiceField "StatutEvaluation" "Statut evaluation" @("A faire", "En cours", "Valide")),
  (BooleanField "PlanningDepotInitial" "Planning depot initial"),
  (NumberField "PlanningDemarche" "Planning demarche"),
  (NumberField "PlanningRealisme" "Planning realisme"),
  (NumberField "PlanningApportsJournee" "Planning apports journee"),
  (NumberField "PlanningPresentation" "Planning presentation"),
  (NumberField "PlanningNote" "Planning note"),
  (BooleanField "FluxDepotInitial" "Flux depot initial"),
  (NumberField "FluxDetail" "Flux detail"),
  (NumberField "FluxClarte" "Flux clarte"),
  (NumberField "FluxApportsJournee" "Flux apports journee"),
  (NumberField "FluxPresentation" "Flux presentation"),
  (NumberField "FluxNote" "Flux note"),
  (BooleanField "CadrageDepotInitial" "Cadrage depot initial"),
  (NumberField "CadrageDefinition" "Cadrage definition"),
  (NumberField "CadrageExistant" "Cadrage existant"),
  (NumberField "CadrageApportsJournee" "Cadrage apports journee"),
  (NumberField "CadragePresentation" "Cadrage presentation"),
  (NumberField "CadrageNote" "Cadrage note"),
  (NumberField "BonusParticipation" "Bonus participation"),
  (NumberField "NoteSur60" "Note sur 60"),
  (NumberField "NoteSur20" "Note sur 20"),
  (NoteField "Commentaire" "Commentaire"),
  (DateField "ValideLe" "Valide le"),
  (DateField "ModifieLe" "Modifie le"),
  (TextField "ModifiePar" "Modifie par")
)

Ensure-Fields -ListTitle "QLIO_Journal_Modifications" -Fields @(
  (TextField "CampagneKey" "Campagne"),
  (TextField "EtudiantKey" "Etudiant"),
  (TextField "EvaluationKey" "Evaluation"),
  (TextField "Action" "Action"),
  (NoteField "AncienneValeur" "Ancienne valeur"),
  (NoteField "NouvelleValeur" "Nouvelle valeur"),
  (TextField "Utilisateur" "Utilisateur"),
  (DateField "DateAction" "Date action")
)

Write-Host ""
Write-Host "Listes SharePoint QLIO pretes." -ForegroundColor Green
Write-Host "Site : $SiteUrl"
