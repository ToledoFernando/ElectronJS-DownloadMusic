const { contextBridge } = require("electron");
const { ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("require", (module) => {
  return require(module);
});

contextBridge.exposeInMainWorld("send", (event, msg) => {
  return ipcRenderer.send(event, msg);
});

contextBridge.exposeInMainWorld("received", (event, callback) => {
  return ipcRenderer.on(event, callback);
});
