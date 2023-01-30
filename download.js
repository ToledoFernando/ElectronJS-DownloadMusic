const { webContents, Notification } = require("electron");
const fs = require("fs");
const ytdl = require("ytdl-core");

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

module.exports = { downloadURL, getInfoURL };
