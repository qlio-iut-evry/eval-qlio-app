// Stockage des campagnes via l'API GitHub
// Remplissez les 3 constantes ci-dessous (voir README pour les obtenir)

// Les constantes GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO sont définies dans config.js (non commité)
const GITHUB_BRANCH = "main";
const DATA_DIR = "data";

// ---------- utilitaires ----------

function dbIsConfigured() {
  return GITHUB_TOKEN !== "YOUR_GITHUB_TOKEN";
}

async function ghFetch(path, options = {}) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      ...(options.headers || {})
    }
  });
  return res;
}

async function ghRead(path) {
  const res = await ghFetch(path);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub GET ${path} : ${res.status}`);
  const json = await res.json();
  return {
    sha: json.sha,
    content: JSON.parse(fromBase64(json.content))
  };
}

function toBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach(b => binary += String.fromCharCode(b));
  return btoa(binary);
}

function fromBase64(b64) {
  const binary = atob(b64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function ghWrite(path, content, sha, message) {
  const body = {
    message: message || `update ${path}`,
    content: toBase64(JSON.stringify(content, null, 2)),
    branch: GITHUB_BRANCH
  };
  if (sha) body.sha = sha;
  const res = await ghFetch(path, { method: "PUT", body: JSON.stringify(body) });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `GitHub PUT ${path} : ${res.status}`);
  }
  return true;
}

// ---------- API publique (appelée depuis app.js) ----------

async function dbListCampaigns() {
  try {
    const result = await ghRead(`${DATA_DIR}/index.json`);
    return result ? result.content : [];
  } catch (e) {
    console.error("dbListCampaigns:", e);
    return [];
  }
}

async function dbLoadCampaign(id) {
  try {
    const result = await ghRead(`${DATA_DIR}/${id}.json`);
    return result ? result.content : null;
  } catch (e) {
    console.error("dbLoadCampaign:", e);
    return null;
  }
}

async function dbSaveCampaign(id, name, stateData) {
  window._lastDbError = null;
  try {
    const now = new Date().toISOString();

    // 1. Écrire le fichier de la campagne
    const existing = await ghRead(`${DATA_DIR}/${id}.json`);
    await ghWrite(`${DATA_DIR}/${id}.json`, stateData, existing?.sha, `save campaign ${name}`);

    // 2. Mettre à jour l'index (retry jusqu'à 3 fois en cas de conflit SHA)
    for (let attempt = 0; attempt < 3; attempt++) {
      const indexFile = await ghRead(`${DATA_DIR}/index.json`);
      const index = indexFile ? indexFile.content : [];
      const entry = index.find((c) => c.id === id);
      if (entry) { entry.name = name; entry.updated_at = now; }
      else { index.unshift({ id, name, updated_at: now }); }
      index.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
      try {
        await ghWrite(`${DATA_DIR}/index.json`, index, indexFile?.sha, `index: update ${name}`);
        break;
      } catch (e) {
        if (attempt === 2) throw e;
      }
    }

    return true;
  } catch (e) {
    console.error("dbSaveCampaign:", e);
    window._lastDbError = e.message;
    return false;
  }
}
