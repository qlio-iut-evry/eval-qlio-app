const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openJson: () => ipcRenderer.invoke("json:open"),
  saveFile: (payload) => ipcRenderer.invoke("file:save", payload),
  minimizeWindow: () => ipcRenderer.invoke("window:minimize"),
  maximizeWindow: () => ipcRenderer.invoke("window:maximize"),
  closeWindow: () => ipcRenderer.invoke("window:close"),
  openExternal: (url) => ipcRenderer.invoke("shell:open-external", url),
  printToPdf: (options) => ipcRenderer.invoke("print:to-pdf", options)
});
