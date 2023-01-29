const $ = (id) => document.getElementById(id);

const input = $("searchURL");
const button = $("Buscar");
const progreso = $("progres");
const divVideo = $("video");
const eliminar = $("eliminar");
const titulo = $("titleMusic");
const barra = $("barra");
const download = $("downloadMusic");
const span = $("img");
const buscarInfo = $("infoSearch");
const porcentaje = $("porcentaje");

span.addEventListener("click", () =>
  alert(` - - COMO USAR - - 
- Seleccione un video de YouTube y copie el link
- Pegue el link en en apartado "Link (URL)"
- Aprete en buscar para extraer informacion de la URL
- Si el titulo mostrado es el mismo que el de 
su musica aprete en "Descargar"
- Una vez finalizada la descarga, le dejara un archivo 
con el nombre de su musica en la carpeta "Descargas" o 
 "Downloads"
`)
);

let url = "";
let dataVideo = "";
let titleVideo = "";

input.addEventListener("change", (e) => {
  url = e.target.value;
});

button.addEventListener("click", async (e) => {
  try {
    new URL(url);

    const arr = url.split("watch");
    if (arr[0] !== "https://www.youtube.com/") throw Error("URL NO VALIDA");
    buscarInfo.style.display = "block";
    send("searchInfo", { url });
  } catch (error) {
    alert("URL no valida");
  }
});

eliminar.addEventListener("click", (e) => {
  divVideo.style.display = "none";
});

download.addEventListener("click", (e) => {
  download.innerHTML = "Descargando...";
  download.setAttribute("disabled", true);
  barra.style.display = "block";
  send("downloadMusic", { title: titleVideo, url: dataVideo });
});

received("infoURL", (event, data) => {
  buscarInfo.style.display = "none";
  dataVideo = data.videoDetails.embed.iframeUrl;
  titleVideo = data.videoDetails.title;
  titulo.innerHTML = data.videoDetails.title;
  divVideo.style.display = "block";
});

//Barra de progreso de descarga
received("newProgress", (event, progress) => {
  const percent = progress.downloaded / progress.total;
  progreso.style.width = `${percent * 100}%`;
  porcentaje.innerHTML = `${(percent * 100).toFixed(2)}%`;
  if (percent * 100 == 100) {
    download.innerHTML = "Completado";
  }
});
