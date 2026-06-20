const STORAGE_KEY = "qlio_eval_1_3_stage_v1";
const DEFAULT_CAMPAIGN_ID = "campaign_default";
const CRITERION_SCORES = Array.from({ length: 11 }, (_, index) => index);

const RUBRIC_COMMENT_PRESETS = {
  planning: [
    "Planning trop général : les étapes manquent de précision et ne permettent pas de suivre clairement l'avancement.",
    "Les jalons ne sont pas assez datés ou mesurables.",
    "Le lien entre les actions prévues et la démarche d'amélioration reste à clarifier.",
    "Le planning semble peu réaliste au regard du temps restant en stage.",
    "La présentation doit être améliorée pour rendre les priorités et dépendances plus lisibles.",
    "L'ordre des actions n'est pas toujours cohérent avec la progression attendue du projet.",
    "Les durées estimées semblent trop approximatives ou non justifiées.",
    "Les risques, points de blocage ou dépendances ne sont pas assez anticipés.",
    "Les actions prévues restent descriptives et ne montrent pas assez le pilotage du stage.",
    "La prise en compte des remarques de la journée reste trop partielle."
  ],
  flow: [
    "Le schéma des flux ne fait pas apparaître assez clairement les acteurs impliqués.",
    "Les flux d'information ne sont pas suffisamment explicites.",
    "Les flux ne sont pas quantifiés : volumes, fréquences ou délais doivent être précisés pour mesurer leur importance.",
    "Le sens de circulation des flux ou les supports utilisés doivent être précisés.",
    "La présentation graphique manque de lisibilité et gagnerait à être restructurée.",
    "Certains flux importants semblent absents ou sous-représentés.",
    "Les documents, données ou supports échangés ne sont pas assez identifiés.",
    "La frontière entre flux physiques, flux d'information et responsabilités reste confuse.",
    "Le schéma ne permet pas encore de repérer clairement les dysfonctionnements ou points d'amélioration.",
    "Les corrections ou remarques formulées pendant la journée ne sont pas assez visibles dans la version finale."
  ],
  framing: [
    "Le problème traité n'est pas encore formulé de façon assez précise.",
    "Les objectifs du projet doivent être rendus plus concrets et mesurables.",
    "Le périmètre de l'étude reste trop flou.",
    "L'analyse de l'existant manque de faits, données ou observations terrain.",
    "Les livrables attendus et la suite de la démarche doivent être mieux explicités.",
    "Les enjeux pour l'entreprise ne sont pas suffisamment mis en évidence.",
    "La situation initiale est décrite de manière trop générale.",
    "Les indicateurs de réussite ou critères d'évaluation du projet sont absents ou peu clairs.",
    "Les contraintes, acteurs et ressources du projet doivent être davantage précisés.",
    "La fiche de cadrage ne montre pas assez l'évolution apportée par les retours de la journée."
  ]
};

const RUBRICS = [
  {
    id: "planning",
    title: "Planning",
    firstVersionLabel: "1ère version rendue au début de journée",
    criteria: [
      ["improvement", "Démarche d'amélioration retenue", "Évaluer si l'étudiant a identifié une vraie piste d'amélioration, cohérente avec le sujet et exploitable pour la suite du stage."],
      ["realism", "Réalisme du planning et jalons pertinents", "Vérifier que les étapes sont réalistes, ordonnées, datées et associées à des jalons utiles pour suivre l'avancement."],
      ["dayInputs", "Prise en compte des apports de la journée", "Mesurer si les remarques et conseils donnés pendant la journée ont été compris puis réintégrés dans le planning."],
      ["presentation", "Présentation", "Apprécier la lisibilité, la mise en forme, la précision des libellés et la capacité à comprendre rapidement le planning."]
    ]
  },
  {
    id: "flow",
    title: "Schéma des flux",
    firstVersionLabel: "1ère version rendue au début de journée",
    criteria: [
      ["detail", "Pertinence du niveau de détail", "Évaluer si le schéma montre les flux importants sans être trop vague ni inutilement compliqué."],
      ["clarity", "Clarté et explications", "Vérifier que les flux, acteurs, supports, informations et sens de circulation sont compréhensibles."],
      ["dayInputs", "Prise en compte des apports de la journée", "Mesurer si les corrections demandées pendant la journée ont été prises en compte dans le schéma."],
      ["presentation", "Présentation", "Apprécier la propreté graphique, l'organisation visuelle, les légendes et la facilité de lecture."]
    ]
  },
  {
    id: "framing",
    title: "Fiche de cadrage",
    firstVersionLabel: "1ère version rendue au début de journée",
    criteria: [
      ["definition", "Définition du projet et des objectifs", "Évaluer si le problème, le périmètre, les objectifs et les livrables attendus sont clairement posés."],
      ["existing", "Analyse de l'existant", "Vérifier que la situation actuelle est décrite avec des faits, des données ou des observations utiles."],
      ["dayInputs", "Prise en compte des apports de la journée", "Mesurer si les conseils de cadrage ont permis d'améliorer la formulation du projet."],
      ["presentation", "Présentation", "Apprécier la structure, la lisibilité, la précision du vocabulaire et la qualité de rédaction."]
    ]
  }
];

const RUBRIC_COMMENT_PRESETS_BUT3 = {
  framing: [
    "Le problème traité n'est pas encore formulé de façon assez précise.",
    "Les objectifs du projet doivent être rendus plus concrets et mesurables.",
    "L'analyse de l'existant manque de faits, données ou observations terrain.",
    "La méthodologie proposée n'est pas assez structurée ou réaliste.",
    "Le planning manque de jalons précis et de dates.",
    "Les livrables attendus et la suite de la démarche doivent être mieux explicités.",
    "Les enjeux pour l'entreprise ne sont pas suffisamment mis en évidence.",
    "Les indicateurs de réussite ou critères d'évaluation du projet sont absents ou peu clairs.",
    "La fiche de cadrage ne montre pas assez l'évolution apportée par les retours de la journée.",
    "La présentation doit être améliorée : structure, lisibilité et qualité de rédaction."
  ],
  flow: [
    "Le schéma des flux ne fait pas apparaître assez clairement les acteurs impliqués.",
    "Les flux d'information ne sont pas suffisamment explicites.",
    "Les flux ne sont pas quantifiés : volumes, fréquences ou délais doivent être précisés.",
    "Le sens de circulation des flux ou les supports utilisés doivent être précisés.",
    "La présentation graphique manque de lisibilité et gagnerait à être restructurée.",
    "Certains flux importants semblent absents ou sous-représentés.",
    "Les documents, données ou supports échangés ne sont pas assez identifiés.",
    "La frontière entre flux physiques, flux d'information et responsabilités reste confuse.",
    "Les corrections ou remarques formulées pendant la journée ne sont pas assez visibles dans la version finale."
  ],
  dashboard: [
    "Les indicateurs choisis ne sont pas suffisamment en lien avec les objectifs du projet.",
    "Le tableau de bord ne permet pas de suivre l'avancement du stage de façon claire.",
    "Les consignes de présentation ne sont pas respectées : format, structure ou contenu attendu.",
    "La mise en forme doit être améliorée : lisibilité, cohérence visuelle et organisation.",
    "Les données présentées manquent de sources ou de justification.",
    "Certains indicateurs clés sont absents ou insuffisamment renseignés.",
    "Le tableau de bord ne montre pas assez les évolutions ou tendances attendues.",
    "La prise en compte des retours de la journée reste insuffisante dans la version finale.",
    "La présentation orale du tableau de bord manque de clarté ou de structuration.",
    "Les données chiffrées doivent être mieux mises en valeur ou contextualisées."
  ]
};

const RUBRICS_BUT3 = [
  {
    id: "framing",
    title: "Fiche de cadrage",
    firstVersionLabel: "1ère version rendue au début de journée",
    criteria: [
      ["definition", "Définition du projet et des objectifs", "Évaluer si le problème, le périmètre, les objectifs et les livrables attendus sont clairement posés."],
      ["existing", "Analyse de l'existant", "Vérifier que la situation actuelle est décrite avec des faits, des données ou des observations utiles."],
      ["methodology", "Méthodologie et planning", "Évaluer si la démarche proposée est structurée, réaliste et accompagnée d'un planning avec des jalons précis."],
      ["dayInputs", "Prise en compte des apports de la journée", "Mesurer si les conseils de cadrage ont permis d'améliorer la formulation du projet."],
      ["presentation", "Présentation", "Apprécier la structure, la lisibilité, la précision du vocabulaire et la qualité de rédaction."]
    ]
  },
  {
    id: "flow",
    title: "Schéma des flux",
    firstVersionLabel: "1ère version rendue au début de journée",
    criteria: [
      ["detail", "Pertinence du niveau de détail", "Évaluer si le schéma montre les flux importants sans être trop vague ni inutilement compliqué."],
      ["clarity", "Clarté et explications", "Vérifier que les flux, acteurs, supports, informations et sens de circulation sont compréhensibles."],
      ["dayInputs", "Prise en compte des apports de la journée", "Mesurer si les corrections demandées pendant la journée ont été prises en compte dans le schéma."],
      ["presentation", "Présentation", "Apprécier la propreté graphique, l'organisation visuelle, les légendes et la facilité de lecture."]
    ]
  },
  {
    id: "dashboard",
    title: "Tableau de bord",
    firstVersionLabel: "1ère version rendue au début de journée",
    criteria: [
      ["compliance", "Respect des consignes", "Vérifier que le tableau de bord respecte le format, la structure et le contenu attendus dans le cadre du stage."],
      ["layout", "Mise en forme et lisibilité", "Apprécier la clarté visuelle, la cohérence graphique et la facilité de lecture des indicateurs."],
      ["dayInputs", "Prise en compte des apports de la journée", "Mesurer si les retours formulés pendant la journée ont été intégrés dans la version finale."],
      ["presentation", "Présentation", "Évaluer la capacité à présenter et expliquer le tableau de bord, à justifier les choix d'indicateurs."]
    ]
  }
];

function activeRubrics(student) {
  return student?.butLevel === "but3" ? RUBRICS_BUT3 : RUBRICS;
}

function activePresets(student) {
  return student?.butLevel === "but3" ? RUBRIC_COMMENT_PRESETS_BUT3 : RUBRIC_COMMENT_PRESETS;
}

const HEADERS = {
  civility: ["civ", "civilite"],
  lastName: ["nom"],
  firstName: ["prenom"],
  path: ["parcours", "groupe"],
  cm: ["cm"],
  td: ["td"],
  tp: ["tp", "tp fi", "tp fi-fia", "tp fi - fia", "tp s6", "groupe tp", "grp tp", "tp osc", "tp qmi"],
  state: ["etat"],
  schoolMail: ["mail"],
  personalMail: ["personnel", "mail personnel"]
};

const state = {
  campaigns: [],
  activeCampaignId: DEFAULT_CAMPAIGN_ID,
  campaignName: "2025-2026",
  students: [],
  selectedId: null,
  view: "dashboard",
  filters: { path: "Tous", status: "Tous", level: "Tous", search: "" },
  theme: "contrast",
  dark: false,
  backup: {
    dirtySinceJsonSave: true,
    lastJsonSaveAt: "",
    lastJsonLoadName: ""
  }
};

const el = {};

const recapFilters = { path: "Tous", student: "" };
const recapSelection = new Set();

document.addEventListener("DOMContentLoaded", async () => {
  document.body.classList.toggle("is-electron", Boolean(window.electronAPI));
  cacheElements();
  bindEvents();
  loadState();
  initDbMode();
  render();
  await autoLoadLastCampaign();
  _appReady = true;
  setInterval(saveToDb, 30000);
});

function cacheElements() {
  [
    "themeSelect", "campaignSelect", "campaignName", "renameCampaignBtn", "newCampaignBtn", "deleteCampaignBtn", "saveBtn", "dropZone", "studentFile",
    "importBtn", "importStatus", "searchInput", "pathFilters", "stateFilters", "levelFilters", "studentList",
    "pageTitle", "dashboardView", "evaluationView", "studentView", "recapView", "exportsView",
    "kpiStudents", "kpiDone", "kpiTodo", "kpiAverage", "pathStats", "alertsList", "groupStats",
    "deliverableStats", "studentComparison", "deliverableScoreCards",
    "selectedPath", "selectedName", "selectedMeta", "score20", "score60", "rubrics",
    "bonusInput", "evaluatorInput", "evaluatorQuickFill", "commentInput", "completionBadge", "prevStudentBtn",
    "validateBtn", "nextStudentBtn", "lastNameInput", "firstNameInput", "pathInput",
    "tdInput", "tpInput", "schoolMailInput", "companyInput", "subjectInput", "tutorInput",
    "mentorInput", "printRecapBtn", "printCommentsBtn", "recapTable", "commentsTable", "exportCsvBtn", "restoreFile",
    "loadJsonBtn", "saveJsonBtn", "quickLoadJsonBtn", "startupModal", "startupLoadJsonBtn", "startupSkipBtn",
    "jsonSaveStatus", "jsonDirtyBadge", "minimizeWindowBtn", "maximizeWindowBtn", "closeWindowBtn", "toast", "studentHoverCard",
    "sendMailBtn", "sendMailGroupBtn",
    "saveDbBtn", "loadDbBtn", "startupDbSelect", "startupLoadDbBtn", "startupDesc"
  ].forEach((id) => {
    el[id] = document.getElementById(id);
  });
}

function bindEvents() {
  el.themeSelect.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-theme]");
    if (!btn) return;
    state.theme = btn.dataset.theme;
    state.dark = state.theme === "dark";
    saveState();
    renderTheme();
  });

  el.campaignSelect.addEventListener("change", () => {
    syncActiveCampaignFromWorkingState();
    state.activeCampaignId = el.campaignSelect.value;
    loadActiveCampaignIntoWorkingState();
    saveState();
    render();
    toast("Campagne chargee");
  });

  el.campaignName.addEventListener("input", () => {
    state.campaignName = el.campaignName.value;
  });

  el.campaignName.addEventListener("keydown", (event) => {
    if (event.key === "Enter") renameActiveCampaign();
  });

  el.renameCampaignBtn.addEventListener("click", renameActiveCampaign);

  el.newCampaignBtn.addEventListener("click", () => {
    createCampaign();
    saveState();
    render();
    toast("Nouvelle campagne creee");
  });

  el.deleteCampaignBtn.addEventListener("click", deleteActiveCampaign);

  el.saveBtn.addEventListener("click", () => {
    saveState();
    toast("Campagne sauvegardee localement");
  });

  el.importBtn.addEventListener("click", () => el.studentFile.click());
  el.studentFile.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) importStudentFile(file);
    event.target.value = "";
  });

  ["dragenter", "dragover"].forEach((name) => {
    el.dropZone.addEventListener(name, (event) => {
      event.preventDefault();
      el.dropZone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach((name) => {
    el.dropZone.addEventListener(name, (event) => {
      event.preventDefault();
      el.dropZone.classList.remove("dragover");
    });
  });

  el.dropZone.addEventListener("drop", (event) => {
    const file = event.dataTransfer.files[0];
    if (file) importStudentFile(file);
  });

  el.searchInput.addEventListener("input", () => {
    state.filters.search = el.searchInput.value;
    renderStudentList();
  });

  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  el.bonusInput.addEventListener("input", () => {
    const student = selectedStudent();
    if (!student) return;
    student.evaluation.bonus = toNumber(el.bonusInput.value);
    autosaveRenderStudent({ renderSelected: false });
  });

  el.evaluatorInput.addEventListener("input", saveEvaluatorInput);
  el.commentInput.addEventListener("input", saveGeneralCommentInput);
  el.validateBtn.addEventListener("click", validateEvaluation);
  el.prevStudentBtn.addEventListener("click", () => moveSelection(-1));
  el.nextStudentBtn.addEventListener("click", () => moveSelection(1));

  [
    ["lastNameInput", "lastName"],
    ["firstNameInput", "firstName"],
    ["pathInput", "path"],
    ["tdInput", "td"],
    ["tpInput", "tp"],
    ["schoolMailInput", "schoolMail"],
    ["companyInput", "company"],
    ["subjectInput", "subject"],
    ["tutorInput", "tutor"],
    ["mentorInput", "mentor"]
  ].forEach(([inputId, field]) => {
    el[inputId].addEventListener("input", () => updateStudentField(field, el[inputId].value));
  });

  document.getElementById("butLevelBtns").querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const student = selectedStudent();
      if (!student) return;
      student.butLevel = btn.dataset.value;
      saveState();
      renderRubrics();
      renderSelectedStudent();
      renderStudentList();
      renderFilters();
    });
  });

  el.sendMailBtn.addEventListener("click", sendMailToStudent);
  el.sendMailGroupBtn.addEventListener("click", sendMailToAll);
  el.exportCsvBtn.addEventListener("click", exportCsv);
  el.loadJsonBtn.addEventListener("click", openWorkingJsonFile);
  el.saveJsonBtn.addEventListener("click", saveWorkingJsonFile);
  if (el.quickLoadJsonBtn) el.quickLoadJsonBtn.addEventListener("click", openWorkingJsonFile);
  if (el.startupLoadJsonBtn) el.startupLoadJsonBtn.addEventListener("click", openWorkingJsonFile);
  if (el.startupSkipBtn) el.startupSkipBtn.addEventListener("click", skipStartupJsonLoad);
  el.printRecapBtn.addEventListener("click", printRecap);
  el.printCommentsBtn.addEventListener("click", printComments);
  el.restoreFile.addEventListener("change", restoreJson);
  if (el.saveDbBtn) el.saveDbBtn.addEventListener("click", saveToDb);
  if (el.loadDbBtn) el.loadDbBtn.addEventListener("click", openCampaignFromDb);
  if (el.startupLoadDbBtn) el.startupLoadDbBtn.addEventListener("click", loadDbCampaignFromStartup);
  if (window.electronAPI) {
    el.minimizeWindowBtn.addEventListener("click", () => window.electronAPI.minimizeWindow());
    el.maximizeWindowBtn.addEventListener("click", toggleElectronMaximize);
    el.closeWindowBtn.addEventListener("click", closeElectronWindow);
  }
  document.addEventListener("keydown", handleShortcuts);
  if (el.startupModal) {
    el.startupModal.addEventListener("click", (event) => {
      if (event.target === el.startupModal) skipStartupJsonLoad();
    });
  }
  if (!window.electronAPI) {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") saveToDb();
    });
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      Object.assign(state, saved);
    }
    migrateCampaigns();
    if (!state.theme) state.theme = state.dark ? "dark" : "light";
    normalizeBackupState();
    state.students = (state.students || []).map(normalizeStudent);
    loadActiveCampaignIntoWorkingState();
  } catch (error) {
    console.warn(error);
    toast("Sauvegarde locale illisible");
  }
}

function saveState(options = {}) {
  normalizeBackupState();
  if (options.markDirty !== false) {
    state.backup.dirtySinceJsonSave = true;
  }
  syncActiveCampaignFromWorkingState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderBackupStatus();
}

let _appReady = false;
let _saveInProgress = false;

async function saveToDb() {
  if (!_appReady) return;
  if (!dbIsConfigured()) return;
  if (_saveInProgress) return;
  _saveInProgress = true;
  setDbSyncStatus("sauvegarde...");
  const ok = await dbSaveCampaign(state.activeCampaignId, state.campaignName, state);
  _saveInProgress = false;
  if (ok) {
    state.backup.dirtySinceJsonSave = false;
    state.backup.lastJsonSaveAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderBackupStatus();
    setDbSyncStatus("sauvegarde OK");
    setTimeout(() => setDbSyncStatus(""), 3000);
  } else {
    setDbSyncStatus("erreur - donnees conservees localement");
  }
}

function setDbSyncStatus(text) {
  const el2 = document.getElementById("dbSyncStatus");
  if (el2) el2.textContent = text;
}

function migrateCampaigns() {
  if (Array.isArray(state.campaigns) && state.campaigns.length) return;
  state.activeCampaignId = state.activeCampaignId || DEFAULT_CAMPAIGN_ID;
  state.campaigns = [{
    id: state.activeCampaignId,
    name: normalizeCampaignName(state.campaignName || defaultCampaignName()),
    students: (state.students || []).map(normalizeStudent),
    selectedId: state.selectedId || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }];
}

function activeCampaign() {
  return state.campaigns.find((campaign) => campaign.id === state.activeCampaignId) || null;
}

function syncActiveCampaignFromWorkingState() {
  migrateCampaigns();
  let campaign = activeCampaign();
  if (!campaign) {
    campaign = {
      id: state.activeCampaignId || makeId(),
      name: cleanEditableCampaignName(state.campaignName),
      students: [],
      selectedId: null,
      createdAt: new Date().toISOString()
    };
    state.campaigns.push(campaign);
    state.activeCampaignId = campaign.id;
  }
  campaign.name = cleanEditableCampaignName(state.campaignName || campaign.name);
  campaign.students = (state.students || []).map(normalizeStudent);
  campaign.selectedId = state.selectedId || null;
  campaign.updatedAt = new Date().toISOString();
}

function cleanEditableCampaignName(name) {
  const text = String(name || "").trim();
  return text || defaultCampaignName();
}

function loadActiveCampaignIntoWorkingState() {
  migrateCampaigns();
  cleanupCampaignNames();
  const campaign = activeCampaign() || state.campaigns[0];
  state.activeCampaignId = campaign.id;
  state.campaignName = campaign.name;
  state.students = (campaign.students || []).map(normalizeStudent);
  state.selectedId = campaign.selectedId || state.students[0]?.id || null;
}

function createCampaign() {
  syncActiveCampaignFromWorkingState();
  let baseName = defaultCampaignName();
  let name = baseName;
  let index = 1;
  while (state.campaigns.some((campaign) => campaign.name === name)) {
    index += 1;
    name = `${baseName} (${index})`;
  }
  const campaign = {
    id: makeId(),
    name,
    students: [],
    selectedId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  state.campaigns.push(campaign);
  state.activeCampaignId = campaign.id;
  loadActiveCampaignIntoWorkingState();
}

function deleteActiveCampaign() {
  const campaign = activeCampaign();
  if (!campaign) return;
  const isLastCampaign = state.campaigns.length <= 1;
  const message = isLastCampaign
    ? `Supprimer la derniere campagne "${campaign.name}" ? Toutes les donnees locales seront effacees et une campagne vide sera recreee pour repartir a zero.`
    : `Supprimer la campagne "${campaign.name}" ? Cette action efface ses donnees locales.`;
  if (!confirm(message)) return;
  state.campaigns = state.campaigns.filter((item) => item.id !== campaign.id);
  if (!state.campaigns.length) {
    state.activeCampaignId = makeId();
    state.campaignName = defaultCampaignName();
    state.students = [];
    state.selectedId = null;
    migrateCampaigns();
  } else {
    state.activeCampaignId = state.campaigns[0].id;
  }
  loadActiveCampaignIntoWorkingState();
  saveState();
  render();
  toast(isLastCampaign ? "Campagne supprimee, nouvelle campagne vide creee" : "Campagne supprimee");
}

function renameActiveCampaign() {
  const campaign = activeCampaign();
  if (!campaign) return;
  const name = cleanEditableCampaignName(el.campaignName.value);
  campaign.name = name;
  state.campaignName = name;
  saveState();
  renderCampaignSelect();
  el.campaignName.value = name;
  toast("Campagne renommee");
}

function setView(view) {
  if (view === "collaboration") view = "exports";
  state.view = view;
  saveState({ markDirty: false });
  renderViews();
}

function render() {
  el.searchInput.value = state.filters.search || "";
  el.themeSelect.querySelectorAll("[data-theme]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === (state.theme || "contrast"));
  });
  renderTheme();
  renderBackupStatus();
  renderCampaignSelect();
  el.campaignName.value = state.campaignName;
  renderFilters();
  renderStudentList();
  renderRubrics();
  renderSelectedStudent();
  renderDashboard();
  renderViews();
}

function renderCampaignSelect() {
  cleanupCampaignNames();
  el.campaignSelect.innerHTML = state.campaigns.map((campaign) => {
    const count = (campaign.students || []).length;
    const label = `${campaign.name} - ${count} etud.`;
    return `<option value="${escapeAttr(campaign.id)}">${escapeHtml(label)}</option>`;
  }).join("");
  el.campaignSelect.value = state.activeCampaignId;
}

function cleanupCampaignNames() {
  const seen = new Map();
  state.campaigns.forEach((campaign) => {
    const normalizedName = normalizeCampaignName(campaign.name || defaultCampaignName());
    const explicitCopy = normalizedName.match(/^(.*) \((\d+)\)$/);
    const baseName = explicitCopy ? explicitCopy[1] : normalizedName;
    const count = seen.get(baseName) || 0;
    seen.set(baseName, count + 1);
    if (count === 0) campaign.name = normalizedName;
  });
}

function normalizeCampaignName(name) {
  const text = String(name || "").trim();
  if (!text || text === "Campagne" || text === "Campagne sans nom") return defaultCampaignName();
  const yearWithCopy = text.match(/^(\d{4}-\d{4})\s*\((\d+)\)$/);
  if (yearWithCopy) return `${yearWithCopy[1]} - copie ${yearWithCopy[2]}`;
  const prefixedYear = text.match(/^Campagne 1\/3 stage\s+(\d{4}-\d{4})(.*)$/i);
  if (prefixedYear) return `${prefixedYear[1]}${prefixedYear[2] || ""}`.trim();
  return text;
}

function defaultCampaignName() {
  const now = new Date();
  const year = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
  return `${year}-${year + 1}`;
}

function normalizeBackupState() {
  state.backup = {
    dirtySinceJsonSave: state.backup?.dirtySinceJsonSave !== false,
    lastJsonSaveAt: state.backup?.lastJsonSaveAt || "",
    lastJsonLoadName: state.backup?.lastJsonLoadName || ""
  };
}

function renderBackupStatus() {
  if (!el.jsonSaveStatus) return;
  normalizeBackupState();
  const loaded = state.backup.lastJsonLoadName ? `Campagne chargee : ${state.backup.lastJsonLoadName}.` : "";
  const saved = state.backup.lastJsonSaveAt ? ` Derniere sauvegarde en base : ${formatDateTime(state.backup.lastJsonSaveAt)}.` : "";
  el.jsonSaveStatus.textContent = loaded + saved || "Sauvegarde automatique active.";
}

function renderTheme() {
  document.body.classList.remove("theme-light", "theme-dark", "theme-ocean", "theme-contrast");
  document.body.classList.add(`theme-${state.theme || "light"}`);
}

function renderViews() {
  if (state.view === "collaboration") state.view = "exports";
  const titles = {
    dashboard: "Tableau de bord",
    evaluation: "Evaluation rapide",
    student: "Fiche etudiant",
    recap: "Recap imprimable",
    exports: "Sauvegarde"
  };
  el.pageTitle.textContent = titles[state.view] || "Application";
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.view);
  });
  [
    ["dashboard", el.dashboardView],
    ["evaluation", el.evaluationView],
    ["student", el.studentView],
    ["recap", el.recapView],
    ["exports", el.exportsView]
  ].forEach(([view, node]) => node.classList.toggle("active-view", view === state.view));
}

function renderFilters() {
  const paths = ["Tous", ...Array.from(new Set(state.students.map((s) => s.path).filter(Boolean))).sort()];
  el.pathFilters.innerHTML = paths.map((path) => (
    `<button class="chip ${state.filters.path === path ? "active" : ""}" data-path="${escapeAttr(path)}">${escapeHtml(path)}</button>`
  )).join("");
  el.pathFilters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.filters.path = button.dataset.path;
      renderStudentList();
      renderFilters();
    });
  });

  const statuses = ["Tous", "A faire", "En cours", "Valide"];
  el.stateFilters.innerHTML = statuses.map((status) => (
    `<button class="chip ${state.filters.status === status ? "active" : ""}" data-status="${escapeAttr(status)}">${escapeHtml(status)}</button>`
  )).join("");
  el.stateFilters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.filters.status = button.dataset.status;
      renderStudentList();
      renderFilters();
    });
  });

  const levels = ["Tous", "but2", "but3"];
  const levelLabels = { "Tous": "Tous", "but2": "BUT 2", "but3": "BUT 3" };
  el.levelFilters.innerHTML = levels.map((level) => (
    `<button class="level-chip ${state.filters.level === level ? "active" : ""}" data-level="${escapeAttr(level)}">${escapeHtml(levelLabels[level])}</button>`
  )).join("");
  el.levelFilters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.filters.level = button.dataset.level;
      renderStudentList();
      renderFilters();
    });
  });

}

function renderStudentList() {
  const list = filteredStudents();
  if (!state.selectedId && list[0]) state.selectedId = list[0].id;

  el.studentList.innerHTML = list.map((student) => {
    const status = evaluationStatus(student);
    return `
      <div class="student-row ${student.id === state.selectedId ? "active" : ""}">
        <button class="student-item" data-id="${student.id}">
          <span>
            <span class="student-name">${escapeHtml(student.lastName)} ${escapeHtml(student.firstName)}</span>
            <span class="student-sub">${escapeHtml(student.td || "-")} - ${escapeHtml(student.tp || "-")} - ${escapeHtml(status)}</span>
          </span>
          <span class="path-badge path-${pathClass(student.path)}">${escapeHtml(student.path || "?")}</span>
        </button>
        <button class="student-delete-btn" data-id="${student.id}" title="Supprimer cet etudiant">✕</button>
      </div>
    `;
  }).join("") || `<p class="status-line">Aucun etudiant pour ce filtre.</p>`;

  el.studentList.querySelectorAll(".student-item").forEach((button) => {
    button.addEventListener("mouseenter", () => showStudentHoverCard(button));
    button.addEventListener("focus", () => showStudentHoverCard(button));
    button.addEventListener("mouseleave", hideStudentHoverCard);
    button.addEventListener("blur", hideStudentHoverCard);
    button.addEventListener("click", () => {
      state.selectedId = button.dataset.id;
      saveState({ markDirty: false });
      renderStudentList();
      renderSelectedStudent();
      renderDashboard();
    });
  });

  el.studentList.querySelectorAll(".student-delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const student = state.students.find((s) => s.id === btn.dataset.id);
      if (!student) return;
      if (!confirm(`Supprimer ${student.lastName} ${student.firstName} ?`)) return;
      state.students = state.students.filter((s) => s.id !== btn.dataset.id);
      if (state.selectedId === btn.dataset.id) state.selectedId = state.students[0]?.id || null;
      saveState();
      render();
    });
  });
}

function showStudentHoverCard(button) {
  const student = state.students.find((item) => item.id === button.dataset.id);
  if (!student || !el.studentHoverCard) return;
  const rect = button.getBoundingClientRect();
  const top = Math.max(12, Math.min(window.innerHeight - 250, rect.top - 12));
  el.studentHoverCard.innerHTML = studentTooltipHtml(student);
  el.studentHoverCard.style.top = `${top}px`;
  el.studentHoverCard.style.left = `${rect.right + 10}px`;
  el.studentHoverCard.classList.add("show");
  el.studentHoverCard.setAttribute("aria-hidden", "false");
}

function hideStudentHoverCard() {
  if (!el.studentHoverCard) return;
  el.studentHoverCard.classList.remove("show");
  el.studentHoverCard.setAttribute("aria-hidden", "true");
}

function studentTooltipHtml(student) {
  const score = calculateScore(student);
  const scoreText = (detail) => detail?.score20 === null || detail?.score20 === undefined ? "-" : formatScore(detail.score20);
  const total = score.total20 === null ? "-" : formatScore(score.total20);
  const rows = score.rubrics.map((detail) => `
    <span class="tooltip-score-row">
      <span>${escapeHtml(detail.title)}</span>
      <strong>${scoreText(detail)}/20</strong>
    </span>
  `).join("");
  return `
    <span class="tooltip-title">${escapeHtml(student.lastName)} ${escapeHtml(student.firstName)}</span>
    <span class="tooltip-meta">${escapeHtml(student.path || "Parcours ?")} - ${escapeHtml(student.td || "TD ?")} - ${escapeHtml(student.tp || "TP ?")}</span>
    <span class="tooltip-status">${escapeHtml(evaluationStatus(student))}</span>
    <span class="tooltip-scores">${rows}</span>
    <span class="tooltip-total"><span>Note finale</span><strong>${total}/20</strong></span>
  `;
}

function renderRubrics() {
  const student = selectedStudent();
  const rubrics = activeRubrics(student);
  const presets = activePresets(student);
  el.rubrics.innerHTML = rubrics.map((rubric) => `
    <article class="rubric" data-rubric="${rubric.id}">
      <header>
        <h3>${escapeHtml(rubric.title)}</h3>
        <span class="rubric-score" data-rubric-score="${rubric.id}">-/20</span>
      </header>
      <div class="rubric-body">
        <div class="switch-row">
          <label>${escapeHtml(rubric.firstVersionLabel)} <span class="help" title="Si la premiere version n'a pas ete rendue au debut de journee, la note du livrable est penalisee par defaut a 50 %.">?</span></label>
          <div class="segmented" data-field="firstVersion">
            <button data-value="yes">Oui</button>
            <button data-value="no">Non</button>
          </div>
        </div>
        ${rubric.criteria.map(([key, label, help]) => `
          <div class="criterion" data-criterion="${key}">
            <label><span>${escapeHtml(label)}</span><span class="help" title="${escapeAttr(help)}">?</span></label>
            <div class="score-buttons">
              ${CRITERION_SCORES.map((score) => `<button data-score="${score}">${score}</button>`).join("")}
            </div>
          </div>
        `).join("")}
        <label class="rubric-comment">
          Commentaire libre ${escapeHtml(rubric.title)}
          <textarea data-rubric-comment="${escapeAttr(rubric.id)}" rows="3" placeholder="Remarque specifique a ce livrable..."></textarea>
        </label>
        <div class="comment-presets" aria-label="Commentaires types ${escapeAttr(rubric.title)}">
          ${(presets[rubric.id] || []).map((preset) => `
            <button type="button" data-comment-preset="${escapeAttr(preset)}" title="${escapeAttr(preset)}" aria-label="${escapeAttr(preset)}">${escapeHtml(shortPresetLabel(preset))}</button>
          `).join("")}
        </div>
      </div>
    </article>
  `).join("");

  el.rubrics.querySelectorAll(".segmented button").forEach((button) => {
    button.addEventListener("click", () => {
      const student = selectedStudent();
      if (!student) return;
      const rubricId = button.closest(".rubric").dataset.rubric;
      student.evaluation.rubrics[rubricId].firstVersion = button.dataset.value;
      student.evaluation.validated = false;
      autosaveRenderStudent();
    });
  });

  el.rubrics.querySelectorAll(".score-buttons button").forEach((button) => {
    button.addEventListener("click", () => {
      const student = selectedStudent();
      if (!student) return;
      const rubricId = button.closest(".rubric").dataset.rubric;
      const criterion = button.closest(".criterion").dataset.criterion;
      student.evaluation.rubrics[rubricId].criteria[criterion] = Number(button.dataset.score);
      student.evaluation.validated = false;
      autosaveRenderStudent();
    });
  });

  el.rubrics.querySelectorAll("[data-rubric-comment]").forEach((textarea) => {
    textarea.addEventListener("input", () => {
      const student = selectedStudent();
      if (!student) return;
      const rubricId = textarea.dataset.rubricComment;
      student.evaluation.rubrics[rubricId].comment = textarea.value;
      student.evaluation.validated = false;
      saveState();
      renderBackupStatus();
    });
    textarea.addEventListener("blur", () => {
      renderStudentList();
      renderDashboard();
      renderRecapTable();
    });
  });

  el.rubrics.querySelectorAll("[data-comment-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const student = selectedStudent();
      if (!student) return;
      const rubricId = button.closest(".rubric").dataset.rubric;
      const textarea = button.closest(".rubric").querySelector("[data-rubric-comment]");
      const preset = button.dataset.commentPreset;
      const current = student.evaluation.rubrics[rubricId].comment || "";
      const next = toggleCommentPreset(current, preset);
      student.evaluation.rubrics[rubricId].comment = next;
      student.evaluation.validated = false;
      if (textarea) textarea.value = next;
      button.classList.toggle("active", hasCommentPreset(next, preset));
      autosaveRenderStudent();
    });
  });
}

function shortPresetLabel(text) {
  const firstPart = String(text || "").split(":")[0];
  return firstPart.length > 34 ? `${firstPart.slice(0, 31)}...` : firstPart;
}

function appendCommentPreset(current, preset) {
  const existing = String(current || "").trim();
  const addition = String(preset || "").trim();
  if (!addition) return existing;
  if (!existing) return addition;
  if (hasCommentPreset(existing, addition)) return existing;
  return `${existing}\n${addition}`;
}

function toggleCommentPreset(current, preset) {
  if (hasCommentPreset(current, preset)) return removeCommentPreset(current, preset);
  return appendCommentPreset(current, preset);
}

function hasCommentPreset(current, preset) {
  const addition = String(preset || "").trim();
  if (!addition) return false;
  return commentLines(current).includes(addition);
}

function removeCommentPreset(current, preset) {
  const addition = String(preset || "").trim();
  return commentLines(current).filter((line) => line !== addition).join("\n");
}

function commentLines(value) {
  return String(value || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function renderSelectedStudent() {
  const student = selectedStudent();
  const hasStudent = Boolean(student);
  const score = hasStudent ? calculateScore(student) : { total60: null, total20: null };
  el.selectedPath.textContent = hasStudent ? `${student.path || "Parcours inconnu"} - ${evaluationStatus(student)}` : "Aucun etudiant";
  el.selectedName.textContent = hasStudent ? `${student.lastName} ${student.firstName}` : "Importez une promotion";
  el.selectedMeta.textContent = hasStudent ? `${student.td || "-"} - ${student.tp || "-"} - ${student.company || "Entreprise non renseignee"}` : "";
  el.score20.textContent = score.total20 === null ? "-/20" : `${formatScore(score.total20)}/20`;
  el.score60.textContent = score.total60 === null ? "-/60" : `${formatScore(score.total60)}/60`;
  renderDeliverableScores(student);

  if (!student) {
    fillInputs({});
    setRubricControls(null);
    return;
  }

  el.bonusInput.value = student.evaluation.bonus ?? "";
  el.evaluatorInput.value = student.evaluator || "";
  el.commentInput.value = student.evaluation.comment || "";
  fillInputs(student);
  setRubricControls(student);
  renderEvaluatorQuickFill(student);
  renderCompletion(student);
}

function renderEvaluatorQuickFill(student = selectedStudent()) {
  if (!el.evaluatorQuickFill) return;
  const names = evaluatorSuggestions(student);
  el.evaluatorQuickFill.innerHTML = names.length
    ? names.map((name) => `<button type="button" data-evaluator="${escapeAttr(name)}">${escapeHtml(name)}</button>`).join("")
    : `<span class="quick-empty">Aucun nom recent</span>`;
  el.evaluatorQuickFill.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const student = selectedStudent();
      if (!student) return;
      const value = button.dataset.evaluator;
      student.evaluator = value;
      el.evaluatorInput.value = value;
      saveState();
      renderEvaluatorQuickFill(student);
      toast("Evaluateur renseigne");
    });
  });
}

function evaluatorSuggestions(student = selectedStudent()) {
  const names = [student?.evaluator, ...state.students.map((item) => item.evaluator)]
    .map((name) => String(name || "").trim())
    .filter(Boolean);
  return Array.from(new Set(names)).slice(0, 8);
}

function fillInputs(student) {
  el.lastNameInput.value = student.lastName || "";
  el.firstNameInput.value = student.firstName || "";
  el.pathInput.value = student.path || "";
  el.tdInput.value = student.td || "";
  el.tpInput.value = student.tp || "";
  el.schoolMailInput.value = student.schoolMail || "";
  el.companyInput.value = student.company || "";
  el.subjectInput.value = student.subject || "";
  el.tutorInput.value = student.tutor || "";
  el.mentorInput.value = student.mentor || "";
  const level = student.butLevel || "but2";
  document.getElementById("butLevelBtns").querySelectorAll("button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.value === level);
  });
}

function setRubricControls(student) {
  el.rubrics.querySelectorAll(".rubric").forEach((node) => {
    const rubricId = node.dataset.rubric;
    const rubric = student?.evaluation?.rubrics?.[rubricId];
    node.querySelectorAll(".segmented button").forEach((button) => {
      button.classList.toggle("active", rubric?.firstVersion === button.dataset.value);
    });
    node.querySelectorAll(".criterion").forEach((criterionNode) => {
      const criterion = criterionNode.dataset.criterion;
      const value = rubric?.criteria?.[criterion];
      criterionNode.querySelectorAll("button").forEach((button) => {
        button.classList.toggle("active", value === Number(button.dataset.score));
      });
    });
    const comment = rubric?.comment || "";
    const commentInput = node.querySelector("[data-rubric-comment]");
    if (commentInput) commentInput.value = comment;
    node.querySelectorAll("[data-comment-preset]").forEach((button) => {
      button.classList.toggle("active", hasCommentPreset(comment, button.dataset.commentPreset));
    });
  });
}

function renderDeliverableScores(student) {
  const details = student ? calculateScore(student).rubrics : [];
  el.deliverableScoreCards.innerHTML = activeRubrics(student).map((rubric) => {
    const detail = details.find((item) => item.id === rubric.id);
    const text20 = detail && detail.score20 !== null ? `${formatScore(detail.score20)}/20` : "-/20";
    const textRaw = detail && detail.scoreRaw !== null ? `${formatScore(detail.scoreRaw)}/20 brut` : "Non renseigne";
    return `
      <article class="deliverable-score-card">
        <span>${escapeHtml(rubric.title)}</span>
        <strong>${text20}</strong>
        <small class="muted">${textRaw}${detail?.penalized ? " - penalite appliquee" : ""}</small>
      </article>
    `;
  }).join("");

  document.querySelectorAll("[data-rubric-score]").forEach((node) => {
    const detail = details.find((item) => item.id === node.dataset.rubricScore);
    node.textContent = detail && detail.score20 !== null ? `${formatScore(detail.score20)}/20` : "-/20";
  });
}

function renderCompletion(student) {
  const status = evaluationStatus(student);
  el.completionBadge.textContent = status;
  el.completionBadge.classList.toggle("ok", status === "Valide");
  el.completionBadge.classList.toggle("warn", status !== "Valide");
}

function renderDashboard() {
  const students = state.students;
  const done = students.filter((student) => evaluationStatus(student) === "Valide").length;
  const scored = students.map(calculateScore).filter((score) => score.total20 !== null);
  const average = scored.length ? scored.reduce((sum, score) => sum + score.total20, 0) / scored.length : null;

  el.kpiStudents.textContent = students.length;
  el.kpiDone.textContent = done;
  el.kpiTodo.textContent = Math.max(students.length - done, 0);
  el.kpiAverage.textContent = average === null ? "-" : formatScore(average);

  const grouped = groupBy(students, (student) => student.path || "Sans parcours");
  el.pathStats.innerHTML = Object.entries(grouped).map(([path, rows]) => {
    const pathDone = rows.filter((student) => evaluationStatus(student) === "Valide").length;
    const percent = rows.length ? Math.round((pathDone / rows.length) * 100) : 0;
    return `
      <div class="stat-row">
        <strong>${escapeHtml(path)}</strong>
        <span class="progress"><span style="width:${percent}%"></span></span>
        <span>${pathDone}/${rows.length}</span>
      </div>
    `;
  }).join("") || `<p class="muted">Importez une promotion pour afficher les statistiques.</p>`;

  const alerts = [];
  const missingCompany = students.filter((student) => !student.company).length;
  const missingSubject = students.filter((student) => !student.subject).length;
  const withoutPath = students.filter((student) => !student.path).length;
  if (missingCompany) alerts.push([`${missingCompany} etudiant(s) sans entreprise`, "Fiche"]);
  if (missingSubject) alerts.push([`${missingSubject} etudiant(s) sans sujet`, "Fiche"]);
  if (withoutPath) alerts.push([`${withoutPath} etudiant(s) sans parcours`, "Import"]);
  if (!students.length) alerts.push(["Aucune promotion importee", "Import"]);
  el.alertsList.innerHTML = alerts.map(([label, tag]) => `
    <div class="alert-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(tag)}</strong></div>
  `).join("");

  renderGroupStats();
  renderDeliverableStats();
  renderStudentComparison();
  renderRecapTable();
}

function renderGroupStats() {
  const groups = groupBy(state.students, (student) => student.path || "Sans parcours");
  const rows = Object.entries(groups).map(([path, students]) => {
    const scores = students.map(calculateScore).filter((score) => score.total20 !== null);
    const average = scores.length ? averageOf(scores.map((score) => score.total20)) : null;
    return {
      path,
      count: students.length,
      done: students.filter((student) => evaluationStatus(student) === "Valide").length,
      average
    };
  });
  el.groupStats.innerHTML = tableHtml(["Groupe", "Etudiants", "Validees", "Moyenne /20"], rows.map((row) => [
    row.path,
    row.count,
    row.done,
    row.average === null ? "-" : formatScore(row.average)
  ]), [1, 2, 3]);
}

function renderDeliverableStats() {
  const allRubrics = [...RUBRICS, ...RUBRICS_BUT3].filter((r, i, arr) => arr.findIndex((x) => x.id === r.id) === i);
  const rows = allRubrics.map((rubric) => {
    const values = state.students
      .filter((s) => activeRubrics(s).some((r) => r.id === rubric.id))
      .map((student) => calculateScore(student).rubrics.find((item) => item.id === rubric.id)?.score20)
      .filter((value) => value !== null && value !== undefined);
    const avg = values.length ? averageOf(values) : null;
    const percent = avg === null ? 0 : Math.round((avg / 20) * 100);
    return `
      <div class="stat-row">
        <strong>${escapeHtml(rubric.title)}</strong>
        <span class="progress"><span style="width:${percent}%"></span></span>
        <span>${avg === null ? "-" : formatScore(avg)}/20</span>
      </div>
    `;
  });
  el.deliverableStats.innerHTML = rows.join("") || `<p class="muted">Aucune note pour le moment.</p>`;
}

function renderStudentComparison() {
  const rows = state.students.map((student) => studentRecapRow(student));
  el.studentComparison.innerHTML = tableHtml([
    "Nom", "Prenom", "Niveau", "Groupe", "Planning", "Flux", "Cadrage", "TdB", "Total /20", "Statut"
  ], rows.map((row) => [
    row.lastName,
    row.firstName,
    row.butLevel,
    row.path || "-",
    row.planning ?? "-",
    row.flow,
    row.framing,
    row.dashboard ?? "-",
    row.total20,
    row.status
  ]), [4, 5, 6, 7, 8]);
}

function renderRecapTable() {
  const students = filteredRecapStudents();
  const rows = students.map(studentRecapRow);
  const done = students.filter((s) => evaluationStatus(s) === "Valide").length;
  const scored = students.map(calculateScore).filter((score) => score.total20 !== null);
  const average = scored.length ? formatScore(averageOf(scored.map((score) => score.total20))) : "-";
  const date = new Date().toLocaleDateString("fr-FR");

  const paths = ["Tous", ...Array.from(new Set(state.students.map((s) => s.path).filter(Boolean))).sort()];
  const selCount = rows.filter((r) => recapSelection.has(r.id)).length;
  const allSelected = rows.length > 0 && rows.every((r) => recapSelection.has(r.id));
  const someSelected = rows.some((r) => recapSelection.has(r.id));

  const filterLabel = recapFilters.path !== "Tous" || recapFilters.student
    ? ` — ${recapFilters.path !== "Tous" ? escapeHtml(recapFilters.path) : ""}${recapFilters.student ? ` "${escapeHtml(recapFilters.student)}"` : ""}`
    : "";

  const hadSearchFocus = document.activeElement?.classList.contains("recap-search-input");

  el.recapTable.innerHTML = `
    <div class="recap-filter-bar no-print">
      <div class="recap-filter-group">
        <span class="recap-filter-label">Parcours</span>
        <div class="recap-filter-chips">
          ${paths.map((p) => `<button class="recap-chip ${recapFilters.path === p ? "active" : ""}" data-path="${escapeAttr(p)}">${escapeHtml(p)}</button>`).join("")}
        </div>
      </div>
      <div class="recap-filter-group">
        <span class="recap-filter-label">Étudiant</span>
        <input class="recap-search-input" type="text" placeholder="Rechercher…" value="${escapeAttr(recapFilters.student)}">
      </div>
      <span class="recap-filter-count">${students.length} affiché${students.length !== 1 ? "s" : ""}${selCount ? ` · <strong>${selCount} sélectionné${selCount !== 1 ? "s" : ""}</strong>` : ""}</span>
    </div>
    <div class="print-cover">
      <div>
        <p class="print-kicker">BUT QLIO - 2e annee - Evaluation 1/3 stage</p>
        <h2>Recapitulatif des notes${filterLabel}</h2>
        <p>Campagne ${escapeHtml(state.campaignName)} - Edition du ${escapeHtml(date)}</p>
      </div>
      <div class="print-summary">
        <span><strong>${students.length}</strong> etudiants</span>
        <span><strong>${done}</strong> validees</span>
        <span><strong>${average}</strong> moyenne /20</span>
      </div>
    </div>
    <table class="data-table recap-table">
      <colgroup>
        <col class="col-check no-print">
        <col class="col-name">
        <col class="col-first">
        <col class="col-level">
        <col class="col-path">
        <col class="col-td">
        <col class="col-company">
        <col class="col-subject">
        <col class="col-note">
        <col class="col-note">
        <col class="col-note">
        <col class="col-note">
        <col class="col-total">
        <col class="col-status">
      </colgroup>
      <thead>
        <tr>
          <th class="col-check no-print"><input type="checkbox" class="recap-check-all" title="Tout sélectionner" ${allSelected ? "checked" : ""}></th>
          <th>Nom</th>
          <th>Prenom</th>
          <th>Niv.</th>
          <th>Parc.</th>
          <th>TD</th>
          <th>Entreprise</th>
          <th>Sujet</th>
          <th class="num">Planning</th>
          <th class="num">Flux</th>
          <th class="num">Cadrage</th>
          <th class="num">TdB</th>
          <th class="num">Note /20</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        ${rows.length ? rows.map((row) => `
          <tr class="${recapSelection.has(row.id) ? "recap-row-selected" : ""}">
            <td class="col-check no-print"><input type="checkbox" class="recap-row-check" data-id="${escapeAttr(row.id)}" ${recapSelection.has(row.id) ? "checked" : ""}></td>
            <td class="strong">${escapeHtml(row.lastName)}</td>
            <td>${escapeHtml(row.firstName)}</td>
            <td><span class="mini-badge">${escapeHtml(row.butLevel)}</span></td>
            <td><span class="mini-badge">${escapeHtml(row.path || "-")}</span></td>
            <td>${escapeHtml(row.td || "-")}</td>
            <td>${escapeHtml(row.company || "")}</td>
            <td>${escapeHtml(row.subject || "")}</td>
            <td class="num">${escapeHtml(row.planning ?? "-")}</td>
            <td class="num">${escapeHtml(row.flow)}</td>
            <td class="num">${escapeHtml(row.framing)}</td>
            <td class="num">${escapeHtml(row.dashboard ?? "-")}</td>
            <td class="num strong">${escapeHtml(row.total20)}</td>
            <td><span class="status-print status-${slug(row.status)}">${escapeHtml(row.status)}</span></td>
          </tr>
        `).join("") : `<tr><td colspan="14" class="recap-empty">Aucun étudiant ne correspond aux filtres.</td></tr>`}
      </tbody>
    </table>
  `;

  // Filtre parcours
  el.recapTable.querySelectorAll(".recap-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      recapFilters.path = btn.dataset.path;
      recapSelection.clear();
      renderRecapTable();
    });
  });

  // Recherche étudiant
  const searchInput = el.recapTable.querySelector(".recap-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      recapFilters.student = searchInput.value;
      recapSelection.clear();
      renderRecapTable();
    });
    if (hadSearchFocus) {
      searchInput.focus();
      const len = searchInput.value.length;
      searchInput.setSelectionRange(len, len);
    }
  }

  // Checkbox "tout sélectionner"
  const checkAll = el.recapTable.querySelector(".recap-check-all");
  if (checkAll) {
    checkAll.indeterminate = someSelected && !allSelected;
    checkAll.addEventListener("change", () => {
      rows.forEach((r) => checkAll.checked ? recapSelection.add(r.id) : recapSelection.delete(r.id));
      updateRecapSelectionUI();
    });
  }

  // Checkboxes individuelles (sans re-render complet)
  el.recapTable.querySelectorAll(".recap-row-check").forEach((cb) => {
    cb.addEventListener("change", () => {
      if (cb.checked) recapSelection.add(cb.dataset.id);
      else recapSelection.delete(cb.dataset.id);
      updateRecapSelectionUI();
    });
  });
}

function updateRecapSelectionUI() {
  const rows = [...el.recapTable.querySelectorAll(".recap-row-check")];
  const allChecked = rows.length > 0 && rows.every((cb) => recapSelection.has(cb.dataset.id));
  const someChecked = rows.some((cb) => recapSelection.has(cb.dataset.id));

  const checkAll = el.recapTable.querySelector(".recap-check-all");
  if (checkAll) {
    checkAll.checked = allChecked;
    checkAll.indeterminate = someChecked && !allChecked;
  }

  rows.forEach((cb) => {
    cb.checked = recapSelection.has(cb.dataset.id);
    cb.closest("tr").classList.toggle("recap-row-selected", recapSelection.has(cb.dataset.id));
  });

  const counter = el.recapTable.querySelector(".recap-filter-count");
  if (counter) {
    const shown = rows.length;
    const sel = recapSelection.size;
    counter.innerHTML = `${shown} affiché${shown !== 1 ? "s" : ""}${sel ? ` · <strong>${sel} sélectionné${sel !== 1 ? "s" : ""}</strong>` : ""}`;
  }
}

function studentRecapRow(student) {
  const score = calculateScore(student);
  const detail = Object.fromEntries(score.rubrics.map((item) => [item.id, item]));
  const isBut3 = (student.butLevel || "but2") === "but3";
  const fmt = (d) => d?.score20 == null ? "-" : formatScore(d.score20);
  return {
    id: student.id,
    lastName: student.lastName,
    firstName: student.firstName,
    path: student.path,
    td: student.td,
    tp: student.tp,
    company: student.company,
    subject: student.subject,
    butLevel: isBut3 ? "BUT3" : "BUT2",
    planning: isBut3 ? null : fmt(detail.planning),
    flow: fmt(detail.flow),
    framing: fmt(detail.framing),
    dashboard: isBut3 ? fmt(detail.dashboard) : null,
    planningComment: student.evaluation.rubrics.planning?.comment || "",
    flowComment: student.evaluation.rubrics.flow?.comment || "",
    framingComment: student.evaluation.rubrics.framing?.comment || "",
    dashboardComment: student.evaluation.rubrics.dashboard?.comment || "",
    total60: score.total60 === null ? "-" : formatScore(score.total60),
    total20: score.total20 === null ? "-" : formatScore(score.total20),
    status: evaluationStatus(student),
    comment: student.evaluation.comment || ""
  };
}

function autosaveRenderStudent(options = {}) {
  saveState();
  if (options.renderSelected !== false) renderSelectedStudent();
  renderStudentList();
  renderDashboard();
  renderRecapTable();
}

function updateStudentField(field, value) {
  const student = selectedStudent();
  if (!student) return;
  student[field] = value;
  saveState();
  renderStudentList();
  renderDashboard();
  renderRecapTable();
  if (!isEditingSelectedStudentForm()) renderSelectedStudent();
}

function saveEvaluatorInput() {
  const student = selectedStudent();
  if (!student) return;
  student.evaluator = el.evaluatorInput.value;
  saveState();
  renderBackupStatus();
  renderEvaluatorQuickFill(student);
}

function saveGeneralCommentInput() {
  const student = selectedStudent();
  if (!student) return;
  student.evaluation.comment = el.commentInput.value;
  student.evaluation.validated = false;
  saveState();
  renderBackupStatus();
}

function updateEvaluationField(field, value) {
  const student = selectedStudent();
  if (!student) return;
  student.evaluation[field] = value;
  if (field !== "validated") student.evaluation.validated = false;
  autosaveRenderStudent({ renderSelected: !isEditingSelectedStudentForm() });
}

function isEditingSelectedStudentForm() {
  return Boolean(document.activeElement?.matches?.("#bonusInput, #evaluatorInput, #commentInput, #studentView input, #rubrics textarea"));
}

function validateEvaluation() {
  const student = selectedStudent();
  if (!student) return;
  const missing = missingEvaluationFields(student);
  if (missing.length) {
    toast(`Evaluation incomplete : ${missing[0]}`);
    return;
  }
  student.evaluation.validated = true;
  student.evaluation.validatedAt = new Date().toISOString();
  saveState();
  renderSelectedStudent();
  renderStudentList();
  renderDashboard();
  toast("Evaluation validee");
}

function missingEvaluationFields(student) {
  const missing = [];
  activeRubrics(student).forEach((rubric) => {
    const data = student.evaluation.rubrics[rubric.id];
    if (!data.firstVersion) missing.push(`${rubric.title} : depot initial`);
    rubric.criteria.forEach(([key, label]) => {
      if (data.criteria[key] === null || data.criteria[key] === undefined) missing.push(`${rubric.title} : ${label}`);
    });
  });
  return missing;
}

function calculateScore(student) {
  if (!student) return { total60: null, total20: null, rubrics: [] };
  const rubrics = activeRubrics(student);
  const details = rubrics.map((rubric) => {
    const data = student.evaluation.rubrics[rubric.id];
    const values = rubric.criteria.map(([key]) => data?.criteria?.[key]).filter((value) => Number.isFinite(value));
    if (!values.length) {
      return {
        id: rubric.id,
        title: rubric.title,
        scoreRaw: null,
        score20: null,
        score60Part: 0,
        penalized: false
      };
    }
    const subtotal = values.reduce((part, value) => part + value, 0);
    const score20 = (subtotal * 2) / rubric.criteria.length;
    const penalty = data.firstVersion === "no" ? 0.5 : 1;
    const penalized = penalty < 1;
    return {
      id: rubric.id,
      title: rubric.title,
      scoreRaw: score20,
      score20: score20 * penalty,
      score60Part: score20 * penalty,
      penalized
    };
  });

  const hasAnyScore = details.some((detail) => detail.score20 !== null);
  const total = details.reduce((sum, detail) => sum + detail.score60Part, 0) + toNumber(student.evaluation.bonus);
  if (!hasAnyScore) return { total60: null, total20: null, rubrics: details };
  return { total60: total, total20: total / 3, rubrics: details };
}

function evaluationStatus(student) {
  if (student.evaluation.validated) return "Valide";
  const missing = missingEvaluationFields(student);
  if (missing.length === activeRubrics(student).reduce((sum, rubric) => sum + rubric.criteria.length + 1, 0)) return "A faire";
  return "En cours";
}

function askImportLevel() {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "import-level-overlay";
    overlay.innerHTML = `
      <div class="import-level-dialog">
        <p class="import-level-title">Niveau des etudiants a importer</p>
        <p class="import-level-sub">Vous pourrez modifier le niveau individuellement dans la fiche de chaque etudiant.</p>
        <div class="import-level-buttons">
          <button class="primary-btn" data-level="but2">BUT 2</button>
          <button class="primary-btn import-but3-btn" data-level="but3">BUT 3</button>
        </div>
      </div>
    `;
    overlay.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.body.removeChild(overlay);
        resolve(btn.dataset.level);
      });
    });
    document.body.appendChild(overlay);
  });
}

async function importStudentFile(file) {
  el.importStatus.textContent = "Lecture du fichier...";
  try {
    const rows = await readSpreadsheet(file);
    const students = rows.map(rowToStudent).filter((student) => student.lastName || student.firstName);
    if (!students.length) throw new Error("Aucun etudiant reconnu");
    const level = await askImportLevel();
    students.forEach((s) => { s.butLevel = level; });
    mergeStudents(students);
    state.selectedId = state.students[0]?.id || null;
    saveState();
    render();
    el.importStatus.textContent = `${students.length} etudiant(s) importes`;
    toast(`${students.length} etudiant(s) importes`);
  } catch (error) {
    console.error(error);
    el.importStatus.textContent = "Import impossible";
    toast(error.message || "Import impossible");
  }
}

function readSpreadsheet(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Lecture du fichier impossible"));
    reader.onload = () => {
      try {
        if (file.name.toLowerCase().endsWith(".csv") && !window.XLSX) {
          resolve(parseCsv(reader.result));
          return;
        }
        if (!window.XLSX) {
          reject(new Error("Bibliotheque Excel indisponible. Verifiez la connexion internet ou exportez en CSV."));
          return;
        }
        const workbook = XLSX.read(reader.result, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        resolve(XLSX.utils.sheet_to_json(sheet, { defval: "" }));
      } catch (error) {
        reject(error);
      }
    };
    if (file.name.toLowerCase().endsWith(".csv") && !window.XLSX) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
}

function parseCsv(text) {
  const lines = String(text || "").split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return [];
  const separator = lines[0].includes(";") ? ";" : ",";
  const headers = splitCsvLine(lines[0], separator);
  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line, separator);
    return headers.reduce((row, header, index) => {
      row[header] = values[index] || "";
      return row;
    }, {});
  });
}

function splitCsvLine(line, separator) {
  const cells = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === separator && !quoted) {
      cells.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current);
  return cells.map((cell) => cell.trim());
}

function rowToStudent(row) {
  const normalized = {};
  Object.entries(row).forEach(([key, value]) => {
    normalized[normalizeHeader(key)] = value;
  });
  const pick = (field) => {
    const aliases = HEADERS[field];
    const key = aliases.find((alias) => normalized[normalizeHeader(alias)] !== undefined);
    return key ? String(normalized[normalizeHeader(key)] || "").trim() : "";
  };

  return normalizeStudent({
        id: makeId(),
    civility: pick("civility"),
    lastName: pick("lastName").toUpperCase(),
    firstName: titleCase(pick("firstName")),
    path: pick("path").toUpperCase(),
    cm: pick("cm"),
    td: pick("td"),
    tp: pick("tp"),
    state: pick("state"),
    schoolMail: pick("schoolMail"),
    personalMail: pick("personalMail"),
    company: "",
    subject: "",
    tutor: "",
    mentor: "",
    evaluator: ""
  });
}

function mergeStudents(imported) {
  const existingByKey = new Map(state.students.map((student) => [studentKey(student), student]));
  imported.forEach((student) => {
    const key = studentKey(student);
    const existing = existingByKey.get(key);
    if (existing) {
      Object.assign(existing, {
        civility: student.civility,
        lastName: student.lastName,
        firstName: student.firstName,
        path: student.path,
        cm: student.cm,
        td: student.td,
        tp: student.tp,
        state: student.state,
        schoolMail: student.schoolMail,
        personalMail: student.personalMail
      });
    } else {
      state.students.push(student);
    }
  });
  state.students.sort((a, b) => `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`));
}

function normalizeStudent(student) {
  const normalized = {
    id: student.id || makeId(),
    civility: student.civility || "",
    lastName: student.lastName || "",
    firstName: student.firstName || "",
    path: student.path || "",
    cm: student.cm || "",
    td: student.td || "",
    tp: student.tp || "",
    state: student.state || "",
    schoolMail: student.schoolMail || "",
    personalMail: student.personalMail || "",
    company: student.company || "",
    subject: student.subject || "",
    tutor: student.tutor || "",
    mentor: student.mentor || "",
    evaluator: student.evaluator || "",
    butLevel: student.butLevel || "but2",
    evaluation: student.evaluation || {}
  };

  normalized.evaluation = {
    bonus: normalized.evaluation.bonus ?? "",
    comment: normalized.evaluation.comment || "",
    validated: Boolean(normalized.evaluation.validated),
    validatedAt: normalized.evaluation.validatedAt || "",
    rubrics: normalized.evaluation.rubrics || {}
  };

  [...RUBRICS, ...RUBRICS_BUT3].forEach((rubric) => {
    const data = normalized.evaluation.rubrics[rubric.id] || {};
    normalized.evaluation.rubrics[rubric.id] = {
      firstVersion: data.firstVersion || "",
      criteria: data.criteria || {},
      comment: data.comment || ""
    };
    rubric.criteria.forEach(([key]) => {
      if (normalized.evaluation.rubrics[rubric.id].criteria[key] === undefined) {
        normalized.evaluation.rubrics[rubric.id].criteria[key] = null;
      }
    });
  });

  return normalized;
}

function filteredStudents() {
  const search = normalizeHeader(state.filters.search || "");
  return state.students.filter((student) => {
    const matchesPath = state.filters.path === "Tous" || student.path === state.filters.path;
    const matchesStatus = state.filters.status === "Tous" || evaluationStatus(student) === state.filters.status;
    const matchesLevel = state.filters.level === "Tous" || (student.butLevel || "but2") === state.filters.level;
    const haystack = normalizeHeader(`${student.lastName} ${student.firstName} ${student.company} ${student.subject}`);
    return matchesPath && matchesStatus && matchesLevel && haystack.includes(search);
  });
}

function filteredRecapStudents() {
  const search = normalizeHeader(recapFilters.student || "");
  return state.students.filter((s) => {
    if (!(s.lastName || s.firstName)) return false;
    if (recapFilters.path !== "Tous" && s.path !== recapFilters.path) return false;
    if (search) {
      const haystack = normalizeHeader(`${s.lastName} ${s.firstName}`);
      if (!haystack.includes(search)) return false;
    }
    return true;
  });
}

function selectedStudent() {
  return state.students.find((student) => student.id === state.selectedId) || null;
}

function moveSelection(delta) {
  const list = filteredStudents();
  if (!list.length) return;
  const index = Math.max(0, list.findIndex((student) => student.id === state.selectedId));
  const next = list[(index + delta + list.length) % list.length];
  state.selectedId = next.id;
  saveState({ markDirty: false });
  renderStudentList();
  renderSelectedStudent();
  renderDashboard();
}

function handleShortcuts(event) {
  if (event.key === "Escape" && el.startupModal?.classList.contains("show")) {
    skipStartupJsonLoad();
    return;
  }
  if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
  if (event.key === "ArrowDown" || event.key === "ArrowRight") moveSelection(1);
  if (event.key === "ArrowUp" || event.key === "ArrowLeft") moveSelection(-1);
  if (event.key.toLowerCase() === "e") setView("evaluation");
  if (event.key.toLowerCase() === "f") setView("student");
  if (event.key.toLowerCase() === "t") setView("dashboard");
  if (event.key.toLowerCase() === "r") setView("recap");
  if (event.ctrlKey && event.key.toLowerCase() === "s") {
    event.preventDefault();
    saveState();
    toast("Campagne sauvegardee");
  }
}

function buildMailBody(student) {
  const score = calculateScore(student);
  const lines = [];

  lines.push(`Bonjour ${student.firstName} ${student.lastName},`);
  lines.push("");
  lines.push("Veuillez trouver ci-dessous votre évaluation 1/3 stage — BUT QLIO.");
  lines.push("");

  score.rubrics.forEach((detail) => {
    const rubric = activeRubrics(student).find((r) => r.id === detail.id);
    const comment = student.evaluation.rubrics[detail.id]?.comment?.trim();
    if (!comment) return;
    lines.push(`▶ ${rubric.title}`);
    lines.push(comment);
    lines.push("");
  });

  const generalComment = student.evaluation.comment?.trim();
  if (generalComment) {
    lines.push("Commentaire général :");
    lines.push(generalComment);
    lines.push("");
  }

  if (student.evaluator) lines.push(`Cordialement,\n${student.evaluator}`);
  return lines;
}

function openMailtoForStudent(student) {
  const mail = student.schoolMail || student.personalMail;
  const lines = buildMailBody(student);
  const subject = `Évaluation 1/3 stage BUT QLIO — ${student.firstName} ${student.lastName}`;
  const mailto = `mailto:${encodeURIComponent(mail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;

  if (window.electronAPI?.openExternal) {
    return window.electronAPI.openExternal(mailto);
  } else {
    const a = document.createElement("a");
    a.href = mailto;
    a.click();
    return Promise.resolve();
  }
}

function sendMailToStudent() {
  const student = selectedStudent();
  if (!student) { toast("Aucun étudiant sélectionné"); return; }

  const mail = student.schoolMail || student.personalMail;
  if (!mail) { toast("Aucune adresse mail renseignée pour cet étudiant"); return; }

  openMailtoForStudent(student);
  toast(`Mail ouvert pour ${student.firstName} ${student.lastName}`);
}

async function sendMailToAll() {
  const filtered = filteredRecapStudents().filter(s => s.schoolMail || s.personalMail);
  const selectedInFilter = filtered.filter(s => recapSelection.has(s.id));
  const students = selectedInFilter.length > 0 ? selectedInFilter : filtered;

  if (!students.length) {
    toast("Aucun étudiant avec une adresse mail");
    return;
  }

  const label = selectedInFilter.length > 0
    ? `${students.length} étudiant${students.length > 1 ? "s" : ""} sélectionné${students.length > 1 ? "s" : ""}`
    : `${students.length} étudiant${students.length > 1 ? "s" : ""} (tous les filtrés)`;

  const confirmed = confirm(`Envoyer les commentaires par mail à ${label} ?\n\nUn mail s'ouvrira pour chaque étudiant dans votre client mail.`);
  if (!confirmed) return;

  for (let i = 0; i < students.length; i++) {
    await openMailtoForStudent(students[i]);
    if (i < students.length - 1) await new Promise(r => setTimeout(r, 400));
  }

  toast(`${students.length} mail${students.length > 1 ? "s" : ""} ouvert${students.length > 1 ? "s" : ""}`);
}

function exportCsv() {
  const rows = state.students.map((student) => {
    const row = studentRecapRow(student);
    const isBut3 = (student.butLevel || "but2") === "but3";
    return {
      campagne: state.campaignName,
      niveau: row.butLevel,
      nom: student.lastName,
      prenom: student.firstName,
      parcours: student.path,
      td: student.td,
      tp: student.tp,
      entreprise: student.company,
      sujet: student.subject,
      evaluateur: student.evaluator,
      statut: evaluationStatus(student),
      planning_sur_20: isBut3 ? "" : row.planning,
      schema_flux_sur_20: row.flow,
      fiche_cadrage_sur_20: row.framing,
      tableau_de_bord_sur_20: isBut3 ? row.dashboard : "",
      commentaire_planning: isBut3 ? "" : row.planningComment,
      commentaire_schema_flux: row.flowComment,
      commentaire_fiche_cadrage: row.framingComment,
      commentaire_tableau_de_bord: isBut3 ? row.dashboardComment : "",
      note_sur_60: row.total60,
      note_sur_20: row.total20,
      commentaire: student.evaluation.comment || ""
    };
  });
  downloadText(`evaluation_1_3_stage_${slug(state.campaignName)}.csv`, toCsv(rows), "text/csv;charset=utf-8");
}

function restoreJson(event) {
  const file = event.target.files[0];
  if (!file) return;
  restoreJsonFile(file);
  event.target.value = "";
}

async function restoreJsonFile(file, options = {}) {
  try {
    const buffer = await file.arrayBuffer();
    const text = new TextDecoder("utf-8").decode(buffer);
    applyRestoredState(JSON.parse(text), file.name, options);
    toast("Derniere sauvegarde JSON chargee");
  } catch (error) {
    toast("Fichier JSON invalide : chargez la derniere sauvegarde valide");
  }
}

function restoreJsonContent(content, filename, options = {}) {
  try {
    applyRestoredState(JSON.parse(content), filename, options);
    toast("Derniere sauvegarde JSON chargee");
  } catch (error) {
    toast("Fichier JSON invalide : chargez la derniere sauvegarde valide");
  }
}

function applyRestoredState(restored, filename, options = {}) {
  Object.assign(state, restored);
  state.view = "dashboard";
  normalizeBackupState();
  state.backup.lastJsonLoadName = filename || state.backup.lastJsonLoadName || "";
  state.backup.lastJsonSaveAt = options.keepSavedAt ? state.backup.lastJsonSaveAt : "";
  state.backup.dirtySinceJsonSave = false;
  state.students = (state.students || []).map(normalizeStudent);
  migrateCampaigns();
  loadActiveCampaignIntoWorkingState();
  saveState({ markDirty: false });
  dismissStartupWarning();
  render();
}

async function openWorkingJsonFile() {
  if (window.electronAPI?.openJson) {
    try {
      const result = await window.electronAPI.openJson();
      if (!result) { dismissStartupWarning(); return; }
      restoreJsonContent(result.content, result.name);
      return;
    } catch (error) {
      dismissStartupWarning();
      toast("Ouverture du JSON impossible");
      return;
    }
  }

  if ("showOpenFilePicker" in window) {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{ description: "Sauvegarde JSON", accept: { "application/json": [".json"] } }],
        multiple: false
      });
      const file = await handle.getFile();
      await restoreJsonFile(file);
      return;
    } catch (error) {
      dismissStartupWarning();
      if (error?.name !== "AbortError") toast("Ouverture du JSON impossible");
      return;
    }
  }
  el.restoreFile.click();
}

async function saveWorkingJsonFile() {
  saveState({ markDirty: false });
  state.backup.lastJsonSaveAt = new Date().toISOString();
  state.backup.dirtySinceJsonSave = false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  const filename = jsonBackupFilename();
  const content = JSON.stringify(state, null, 2);

  if (window.electronAPI?.saveFile) {
    const result = await saveTextWithElectron(filename, content, [
      { name: "Sauvegardes JSON", extensions: ["json"] }
    ]);
    if (!result) {
      markJsonSaveCanceled();
      return;
    }
    renderBackupStatus();
    toast("Nouvelle sauvegarde JSON enregistree");
    return;
  }

  if ("showSaveFilePicker" in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [{ description: "Sauvegarde JSON", accept: { "application/json": [".json"] } }]
      });
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
      renderBackupStatus();
      toast("Nouvelle sauvegarde JSON enregistree");
      return;
    } catch (error) {
      if (error?.name === "AbortError") {
        markJsonSaveCanceled();
        return;
      }
      toast("Enregistrement direct refuse. Une sauvegarde horodatee va etre telechargee.");
    }
  }

  downloadText(filename, content, "application/json");
  renderBackupStatus();
  toast("Sauvegarde horodatee telechargee. Deposez-la sur SharePoint sans ecraser les anciennes.");
}

function markJsonSaveCanceled() {
  state.backup.dirtySinceJsonSave = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderBackupStatus();
  toast("Sauvegarde annulee : le JSON reste a enregistrer");
}

function closeElectronWindow() {
  if (!window.electronAPI?.closeWindow) return;
  if (state.backup?.dirtySinceJsonSave) {
    const confirmed = confirm("Des modifications ne sont pas encore enregistrees dans un JSON. Fermer quand meme l'application ?");
    if (!confirmed) return;
  }
  saveState({ markDirty: false });
  window.electronAPI.closeWindow();
}

async function toggleElectronMaximize() {
  if (!window.electronAPI?.maximizeWindow) return;
  const maximized = await window.electronAPI.maximizeWindow();
  el.maximizeWindowBtn.textContent = maximized ? "❐" : "□";
  el.maximizeWindowBtn.title = maximized ? "Restaurer" : "Agrandir";
}

function jsonBackupFilename() {
  return `sauvegarde_1_3_stage_${slug(state.campaignName)}_${timestampSlug()}.json`;
}

function timestampSlug() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}h${pad(now.getMinutes())}`;
}

async function autoLoadLastCampaign() {
  let db = false;
  try { db = typeof dbIsConfigured !== "undefined" && dbIsConfigured(); } catch (e) {}
  if (!db) return;
  try {
    const campaigns = await dbListCampaigns();
    if (!campaigns.length) return;
    const last = campaigns[0];
    const alreadyLoaded = state.backup?.lastJsonLoadName === `base:${last.name}`;
    if (alreadyLoaded) { toast("Campagne chargee depuis la sauvegarde locale"); return; }
    const data = await dbLoadCampaign(last.id);
    if (!data) return;
    applyRestoredState(data, `base:${last.name}`);
    toast(`Campagne "${last.name}" chargee depuis la base`);
  } catch (e) {
    console.error("autoLoadLastCampaign:", e);
  }
}

function initDbMode() {
  const db = typeof dbIsConfigured !== "undefined" && dbIsConfigured();
  if (el.saveDbBtn) el.saveDbBtn.hidden = false;
  if (el.loadDbBtn) el.loadDbBtn.hidden = !db;
  if (el.startupLoadDbBtn) el.startupLoadDbBtn.hidden = !db;
  if (el.startupDbSelect) el.startupDbSelect.hidden = !db;
  if (db && el.saveJsonBtn) el.saveJsonBtn.classList.replace("primary-btn", "ghost-btn");
}

async function showStartupWarning() {
  if (!el.startupModal) return;
  let db = false;
  try {
    db = typeof dbIsConfigured !== "undefined" && dbIsConfigured();
  } catch (e) { db = false; }

  if (db) {
    try {
      const campaigns = await dbListCampaigns();
      if (el.startupDbSelect) {
        el.startupDbSelect.innerHTML = campaigns.length
          ? campaigns.map((c) => `<option value="${escapeAttr(c.id)}">${escapeHtml(c.name)} — ${formatDateTime(c.updated_at)}</option>`).join("")
          : `<option value="">Aucune campagne en base</option>`;
        el.startupDbSelect.hidden = false;
      }
      if (el.startupLoadDbBtn) {
        el.startupLoadDbBtn.hidden = false;
        el.startupLoadDbBtn.disabled = !campaigns.length;
      }
    } catch (e) {
      db = false;
    }
  }

  if (!db && el.startupDesc) {
    el.startupDesc.textContent = "Commencez une nouvelle session ou chargez un fichier JSON local.";
    if (el.startupLoadJsonBtn) el.startupLoadJsonBtn.hidden = false;
  }

  el.startupModal.classList.add("show");
  const focusBtn = (db && el.startupLoadDbBtn && !el.startupLoadDbBtn.hidden)
    ? el.startupLoadDbBtn
    : (el.startupLoadJsonBtn && !el.startupLoadJsonBtn.hidden ? el.startupLoadJsonBtn : el.startupSkipBtn);
  if (focusBtn) focusBtn.focus();
}

async function loadDbCampaignFromStartup() {
  const id = el.startupDbSelect?.value;
  if (!id) return;
  const data = await dbLoadCampaign(id);
  if (!data) { toast("Erreur de chargement depuis la base"); return; }
  const label = el.startupDbSelect.options[el.startupDbSelect.selectedIndex]?.text?.split(" — ")[0] || id;
  applyRestoredState(data, `base:${label}`);
  toast("Campagne chargee depuis la base");
}

async function openCampaignFromDb() {
  await showStartupWarning();
}

async function saveCampaignToDb() {
  saveState({ markDirty: false });
  const ok = await dbSaveCampaign(state.activeCampaignId, state.campaignName, state);
  if (ok) {
    state.backup.dirtySinceJsonSave = false;
    state.backup.lastJsonSaveAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderBackupStatus();
    toast("Campagne sauvegardee en base");
  } else {
    toast("Erreur de sauvegarde en base — verifiez la configuration Supabase");
  }
}

function dismissStartupWarning() {
  if (!el.startupModal) return;
  el.startupModal.classList.remove("show");
}

function skipStartupJsonLoad() {
  normalizeBackupState();
  state.backup.dirtySinceJsonSave = true;
  state.backup.lastJsonLoadName = "Aucun JSON charge au demarrage";
  saveState();
  dismissStartupWarning();
  renderBackupStatus();
  toast("Mode sans chargement JSON : pensez a creer une sauvegarde horodatee.");
}


function formatDateTime(value) {
  if (!value) return "";
  return new Date(value).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

async function printRecap() {
  state.view = "recap";
  saveState({ markDirty: false });
  renderViews();
  renderRecapTable();
  document.body.classList.add("printing-recap");
  await new Promise(r => setTimeout(r, 80));

  if (window.electronAPI?.printToPdf) {
    const result = await window.electronAPI.printToPdf({ filename: `notes_${slug(state.campaignName)}.pdf` });
    document.body.classList.remove("printing-recap");
    if (result && !result.canceled) toast("PDF enregistré");
  } else {
    window.print();
  }
}

window.addEventListener("afterprint", () => {
  document.body.classList.remove("printing-recap", "printing-comments");
});

function renderCommentsRecap() {
  const date = new Date().toLocaleDateString("fr-FR");
  const students = filteredRecapStudents();

  const cards = students.map((student) => {
    const score = calculateScore(student);
    const totalStr = score.total20 !== null ? `${formatScore(score.total20)}/20` : "—";

    const rubricBlocks = score.rubrics.map((detail) => {
      const rubric = activeRubrics(student).find((r) => r.id === detail.id);
      const noteStr = detail.score20 !== null ? `${formatScore(detail.score20)}/20` : "—";
      const penalStr = detail.penalized ? ' <span class="comment-penalty">pénalité 1ère version</span>' : "";
      const comment = student.evaluation.rubrics[detail.id]?.comment?.trim();
      return `
        <div class="comment-rubric-block">
          <div class="comment-rubric-head">
            <strong>${escapeHtml(rubric.title)}</strong>
            <span class="comment-rubric-score">${noteStr}${penalStr}</span>
          </div>
          <p class="comment-rubric-text">${comment ? escapeHtml(comment) : '<em class="comment-empty">Aucun commentaire</em>'}</p>
        </div>`;
    }).join("");

    const generalComment = student.evaluation.comment?.trim();
    const generalBlock = `
      <div class="comment-rubric-block comment-general">
        <div class="comment-rubric-head"><strong>Commentaire général</strong></div>
        <p class="comment-rubric-text">${generalComment ? escapeHtml(generalComment) : '<em class="comment-empty">Aucun commentaire général</em>'}</p>
      </div>`;

    const bonus = toNumber(student.evaluation.bonus);
    const bonusStr = bonus ? ` + ${bonus} pt${bonus > 1 ? "s" : ""} participation` : "";
    const statusStr = evaluationStatus(student);

    return `
      <div class="comment-card">
        <div class="comment-card-head">
          <div>
            <span class="comment-name">${escapeHtml(student.lastName)} ${escapeHtml(student.firstName)}</span>
            <span class="comment-meta">${escapeHtml(student.path || "")}${student.td ? ` · TD${escapeHtml(student.td)}` : ""}${student.company ? ` · ${escapeHtml(student.company)}` : ""}</span>
          </div>
          <div class="comment-score-block">
            <strong>${totalStr}${bonusStr}</strong>
            <span class="status-print status-${slug(statusStr)}">${escapeHtml(statusStr)}</span>
          </div>
        </div>
        ${rubricBlocks}
        ${generalBlock}
      </div>`;
  }).join("");

  el.commentsTable.innerHTML = `
    <div class="print-cover">
      <div>
        <p class="print-kicker">BUT QLIO — 2e année — Évaluation 1/3 stage</p>
        <h2>Récapitulatif des commentaires</h2>
        <p>Campagne ${escapeHtml(state.campaignName)} — Édition du ${escapeHtml(date)}</p>
      </div>
      <div class="print-summary">
        <span><strong>${students.length}</strong> étudiants</span>
      </div>
    </div>
    ${cards}`;
}

async function printComments() {
  state.view = "recap";
  saveState({ markDirty: false });
  renderViews();
  renderCommentsRecap();
  document.body.classList.add("printing-comments");
  await new Promise(r => setTimeout(r, 80));

  if (window.electronAPI?.printToPdf) {
    const result = await window.electronAPI.printToPdf({ filename: `commentaires_${slug(state.campaignName)}.pdf` });
    document.body.classList.remove("printing-comments");
    if (result && !result.canceled) toast("PDF enregistré");
  } else {
    window.print();
  }
}

function toCsv(rows) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(";")];
  rows.forEach((row) => {
    lines.push(headers.map((header) => csvCell(row[header])).join(";"));
  });
  return lines.join("\r\n");
}

function csvCell(value) {
  const text = String(value ?? "");
  if (/[;"\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

async function downloadText(filename, text, type) {
  if (window.electronAPI?.saveFile) {
    const filters = type.includes("csv")
      ? [{ name: "Fichiers CSV", extensions: ["csv"] }]
      : [{ name: "Tous les fichiers", extensions: ["*"] }];
    const result = await saveTextWithElectron(filename, text, filters);
    if (result) toast("Fichier enregistre");
    return;
  }

  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function saveTextWithElectron(filename, content, filters) {
  try {
    const result = await window.electronAPI.saveFile({ filename, content, filters });
    if (result?.canceled) return null;
    return result;
  } catch (error) {
    toast("Enregistrement impossible");
    return null;
  }
}

function groupBy(rows, keyFn) {
  return rows.reduce((acc, row) => {
    const key = keyFn(row);
    acc[key] = acc[key] || [];
    acc[key].push(row);
    return acc;
  }, {});
}

function averageOf(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function tableHtml(headers, rows, numericIndexes = []) {
  if (!rows.length) return `<p class="muted">Aucune donnee disponible.</p>`;
  return `
    <table class="data-table">
      <thead>
        <tr>${headers.map((header, index) => `<th class="${numericIndexes.includes(index) ? "num" : ""}">${escapeHtml(header)}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${rows.map((row) => `
          <tr>${row.map((cell, index) => `<td class="${numericIndexes.includes(index) ? "num" : ""}">${escapeHtml(cell)}</td>`).join("")}</tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function studentKey(student) {
  return normalizeHeader(`${student.lastName}-${student.firstName}-${student.schoolMail || student.personalMail}`);
}

function normalizeHeader(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function titleCase(value) {
  return String(value || "").toLowerCase().replace(/(^|[-' ])[a-z]/g, (match) => match.toUpperCase());
}

function makeId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function toNumber(value) {
  const number = Number(String(value ?? "").replace(",", "."));
  return Number.isFinite(number) ? number : 0;
}

function formatScore(value) {
  return Number(value).toFixed(2).replace(".", ",").replace(/,00$/, "");
}

function pathClass(path) {
  return ["QMI", "OSC", "MTD"].includes(path) ? path : "other";
}

function slug(value) {
  return normalizeHeader(value).replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "campagne";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function toast(message) {
  el.toast.textContent = message;
  el.toast.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.toast.classList.remove("show"), 2800);
}
