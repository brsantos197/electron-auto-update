import { app, BrowserWindow } from 'electron'
import log from "electron-log";
import pkg from "electron-updater";
const { autoUpdater } = pkg;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: `App ${app.getVersion()}`,
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  setInterval(() => {
    autoUpdater.checkForUpdatesAndNotify();
  }, 1000 * 10)
});

// Configurando logs
autoUpdater.logger = log;
log.transports.file.level = "info";

// Eventos do autoUpdater
autoUpdater.on("update-available", () => {
  log.info("Nova atualização disponível.");
});

autoUpdater.on("update-downloaded", () => {
  log.info("Atualização baixada. Aplicando...");
  autoUpdater.quitAndInstall();
});