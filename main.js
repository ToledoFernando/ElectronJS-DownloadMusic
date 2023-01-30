const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const { getInfoURL, downloadURL } = require("./download");

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
    width: 1000,
    height: 700,
  });
  win.loadFile("src/index.html");
  win.setMenu(null);
};

app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("downloadMusic", (event, msg) => {
  new Notification({
    title: "Descargando Video",
    body: msg.title,
  }).show();
  downloadURL(msg);
});

ipcMain.on("searchInfo", (event, url) => {
  getInfoURL(url.url);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
