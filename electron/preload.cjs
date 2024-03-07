const { contextBridge, ipcRenderer } = require("electron");

const api = {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
};

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("minimize"),
  maximize: () => ipcRenderer.send("maximize"),
  close: () => ipcRenderer.send("close"),
  locale: navigator.language,
  getNotes: (...args) => ipcRenderer.invoke("getNotes", ...args),
  readNote: (...args) => ipcRenderer.invoke("readNote", ...args),
  writeNote: (...args) => ipcRenderer.invoke("writeNote", ...args),
  openFolder: () => ipcRenderer.send("openFolder"),
  getFolderName: () =>
    ipcRenderer.on("folderSelected", (event, NotesFolderName) => {
      console.log("folderSelected: ", NotesFolderName);
      return NotesFolderName;
    }),

  folderSelectedLoad: (callback) => {
    ipcRenderer.on("folderSelected", () => {
      callback();
    });
  },
});

contextBridge.exposeInMainWorld('starter', {
    newNotebookDir: () => ipcRenderer.send("newNotebookDir"),
    getNewNotebookDirName: () => {
        return new Promise((resolve) => {
          ipcRenderer.once(
            "newNotebookDirSelected",
            (event, NewnotebookDirName) => {
              resolve(NewnotebookDirName);
            }
          );
        });
      },
      createNewNotebookDir: (...args) => ipcRenderer.invoke('createNewNotebookDir', ...args),

      closeStarterWin: () => ipcRenderer.send('closeStarterWin')
})

contextBridge.exposeInMainWorld("api", api);
