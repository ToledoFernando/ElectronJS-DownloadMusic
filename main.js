const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const { downloadURL, getInfoURL } = require("./download");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });
  win.loadFile("src/index.html");
  // win.setMenu(null);
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
