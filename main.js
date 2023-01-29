const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  webContents,
} = require("electron");
const path = require("path");

const fs = require("fs");
const ytdl = require("ytdl-core");
console.log(ytdl);

function downloadURL(msg) {
  const xd = ytdl(msg.url, {
    filter: "audioonly",
    quality: "highestaudio",
  })
    .on("progress", (chunkLength, downloaded, total) => {
      webContents.getAllWebContents().forEach((webContent) => {
        webContent.send("newProgress", {
          chunkLength,
          downloaded,
          total,
        });
      });
    })
    .pipe(
      fs.createWriteStream(
        `C:\\Users\\${process.env.USERNAME}\\Downloads\\${msg.title}.mp3`
      )
    );

  xd.on("finish", () => {
    new Notification({
      title: "Descarga Completa",
      body: msg.title,
    }).show();
  });
}

function getInfoURL(url) {
  ytdl
    .getInfo(url)
    .then((info) => {
      webContents.getAllWebContents().forEach((webContent) => {
        webContent.send("infoURL", info);
      });
    })
    .catch((err) => console.log("OAWIDNAOWIND"));
}

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
