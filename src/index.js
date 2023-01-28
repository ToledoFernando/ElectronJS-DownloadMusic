const $ = (id) => document.getElementById(id);

const input = $("searchURL");
const button = $("Buscar");
const progreso = $("progres");
const divVideo = $("video");

let url = "";
let dataVideo = "";

input.addEventListener("change", (e) => {
  url = e.target.value;
});

button.addEventListener("click", async (e) => {
  console.log("Buscando informacio....");
  send("searchInfo", { url });
});

received("infoURL", (event, data) => {
  console.log(data);
  dataVideo = data.videoDetails.embed.iframeUrl;
  divVideo.style.display = "block";
});

if (!dataVideo) divVideo.style.display = "none";

// send("downloadMusic", { title: "musicURL", url });

//Barra de progreso de descarga
received("newProgress", (event, progress) => {
  const percent = progress.downloaded / progress.total;
  progreso.style.width = `${percent * 100}%`;
  console.log(percent * 100);
});
