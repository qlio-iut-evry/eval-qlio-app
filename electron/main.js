const { app, BrowserWindow, dialog, ipcMain, shell } = require("electron");
const path = require("path");
const fs = require("fs/promises");

let mainWindow;
let splashWindow;

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 520,
    height: 300,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    show: true,
    backgroundColor: "#111111"
  });

  splashWindow.loadFile(path.join(__dirname, "splash.html"));
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1100,
    minHeight: 720,
    show: false,
    frame: false,
    backgroundColor: "#fffbe8",
    title: "Evaluation 1/3 stage - BUT QLIO",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, "..", "app", "index.html"));
  mainWindow.once("ready-to-show", () => {
    setTimeout(() => {
      if (splashWindow && !splashWindow.isDestroyed()) splashWindow.close();
      mainWindow.show();
      mainWindow.focus();
    }, 2400);
  });
}

app.whenReady().then(() => {
  createSplashWindow();
  createMainWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createSplashWindow();
    createMainWindow();
  }
});

ipcMain.handle("json:open", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Charger une sauvegarde JSON",
    filters: [{ name: "Sauvegardes JSON", extensions: ["json"] }],
    properties: ["openFile"]
  });

  if (result.canceled || !result.filePaths[0]) return null;
  const filePath = result.filePaths[0];
  const content = await fs.readFile(filePath, "utf8");
  return {
    name: path.basename(filePath),
    path: filePath,
    content
  };
});

ipcMain.handle("file:save", async (_event, { filename, content, filters }) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: "Enregistrer le fichier",
    defaultPath: filename,
    filters: filters || [{ name: "Tous les fichiers", extensions: ["*"] }]
  });

  if (result.canceled || !result.filePath) return { canceled: true };
  await fs.writeFile(result.filePath, content, "utf8");
  return {
    canceled: false,
    path: result.filePath,
    name: path.basename(result.filePath)
  };
});

ipcMain.handle("window:minimize", () => {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.minimize();
});

ipcMain.handle("window:maximize", () => {
  if (!mainWindow || mainWindow.isDestroyed()) return false;
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
    return false;
  }
  mainWindow.maximize();
  return true;
});

ipcMain.handle("window:close", () => {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.close();
});

ipcMain.handle("shell:open-external", (_event, url) => {
  shell.openExternal(url);
});

ipcMain.handle("print:to-pdf", async (_event, { filename }) => {
  const pdfData = await mainWindow.webContents.printToPDF({ printBackground: true });

  const result = await dialog.showSaveDialog(mainWindow, {
    title: "Enregistrer le PDF",
    defaultPath: filename,
    filters: [{ name: "Fichiers PDF", extensions: ["pdf"] }]
  });

  if (result.canceled || !result.filePath) return { canceled: true };
  await fs.writeFile(result.filePath, pdfData);
  return { canceled: false, path: result.filePath };
});
