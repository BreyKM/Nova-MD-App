const {
  getNotes,
  readNote,
  writeNote,
  handleFolderSelection,
  newNotebookDirSelection,
  createNewNotebookDir,
} = require("./util.cjs");

// Modules to control application life and create native browser window
const { log } = require("console");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { electronApp, optimizer } = require("@electron-toolkit/utils");
const fse = require("fs-extra");
const ElectronStore = require("./electron-store.cjs");

const ElectronStoreRef = new ElectronStore();

// const Walk = require("@root/walk");

// Walk.walk("src", walkFunc).then(function () {
//   console.log("Done");
// });

// // walkFunc must be async, or return a Promise
// function walkFunc(err, pathname, dirent) {
//   if (err) {
//     // throw an error to stop walking
//     // (or return to ignore and keep going)
//     console.warn("fs stat error for %s: %s", pathname, err.message);
//     return Promise.resolve();
//   }

//   // return false to skip a directory
//   // (ex: skipping "dot file" directories)
//   if (dirent.isDirectory() && dirent.name.startsWith(".")) {
//     return Promise.resolve(false);
//   }

//   // fs.Dirent is a slimmed-down, faster version of fs.Stats
//   console.log("name:", dirent.name, "in", path.dirname(pathname));
//   // (only one of these will be true)
//   console.log("is file?", dirent.isFile());
//   console.log("is link?", dirent.isSymbolicLink());

//   return Promise.resolve();
// }

if (require("electron-squirrel-startup")) app.quit();

const isDevEnvironment = process.env.DEV_ENV === "true";

// enable live reload for electron in dev mode
if (isDevEnvironment) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
  });
}

let mainWindow;
let starterWindow;
let NotesFolderName;
let NewNotebookDirName;
let newNotebookDirNameInputMain;
let NewNotebookDirPath;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    autoHideMenuBar: true,
    center: true,
    show: false,
    backgroundColor: "#1F1F1F",
    title: "Nova",
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  starterWindow = new BrowserWindow({
    width: 800,
    height: 650,
    autoHideMenuBar: true,
    center: true,
    show: false,
    backgroundColor: "#1F1F1F",
    title: "Nova Starter Page",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // define how electron will load the app
  if (isDevEnvironment) {
    // if your vite app is running on a different port, change it here
    mainWindow.loadURL("http://localhost:5173/index");
    starterWindow.loadURL("http://localhost:5173/starter");
    log("Electron running in dev mode: 🧪");
  } else {
    // when not in dev mode, load the build file instead
    mainWindow.loadFile(path.join(__dirname, "build", "index.html"));
    log("Electron running in prod mode: 🚀");
  }

  let activeFolderPath;

  if (ElectronStoreRef.get("ActiveFolder") != undefined) {
    fse.access(ElectronStoreRef.get("ActiveFolder"), (error) => {
      if (!error && ElectronStoreRef.get("ActiveFolder") != {}) {
        mainWindow.show();
        activeFolderPath = ElectronStoreRef.get("ActiveFolder")
        require("./util.cjs").updateActiveFolderPath(activeFolderPath);
        if (app.isReady()) {
          mainWindow.webContents.send("loadNotesFromActiveFolder");
        console.log("Folder exists");
        }
      } else {
        starterWindow.show();
        console.log("Folder does not exist");
        console.log("ActiveFolder: ", ElectronStoreRef.get("ActiveFolder"));
        ElectronStoreRef.delete("ActiveFolder");
        console.log("ActiveFolder: ", ElectronStoreRef.get("ActiveFolder"));
      }
    });
  } else {
    starterWindow.show();
  }

  // if (ElectronStoreRef.get("ActiveFolder") === undefined) {
  //   starterWindow.show();
  // } else {
  //   mainWindow.show();
  //   console.log("ActiveFolder: ", ElectronStoreRef.get("ActiveFolder"));
  // }

  let maximizeToggle = false;
  ipcMain.on("minimize", () => {
    mainWindow.minimize();
  });

  ipcMain.on("maximize", () => {
    if (maximizeToggle) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
    maximizeToggle = !maximizeToggle;
    console.log(maximizeToggle);
  });

  ipcMain.on("close", () => {
    app.quit();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on("ready", createWindow);

app.whenReady().then(() => {
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.handle("getNotes", (_, ...args) => getNotes(...args));
  ipcMain.handle("readNote", (_, ...args) => readNote(...args));
  ipcMain.handle("writeNote", (_, ...args) => writeNote(...args));

  createWindow();

  ipcMain.on("openFolder", (event) => {
    handleFolderSelection().then((result) => {
      NotesFolderName = result;
      ElectronStoreRef.set("ActiveFolder", NotesFolderName);
      console.log("mainProcessFolderName: ", NotesFolderName);
      event.reply("folderSelected", NotesFolderName);
    });
  });

  //starter page functions

  ipcMain.handle("createNewNotebookDir", async (_, ...args) => {
    NewNotebookDirPath = createNewNotebookDir(...args);
    console.log("path: ", await NewNotebookDirPath);
    require("./util.cjs").updateNewNotebookDirPathMain(NewNotebookDirPath);
    return NewNotebookDirPath;
  });

  ipcMain.on("newNotebookDir", (event) => {
    newNotebookDirSelection().then((result) => {
      NewNotebookDirName = result;
      console.log("mainNewNoteBookDirName: ", NewNotebookDirName);
      event.reply("newNotebookDirSelected", NewNotebookDirName);
    });
  });

  ipcMain.on("closeStarterWin", () => {
    mainWindow.show();
    starterWindow.close();
  });

  ipcMain.on("activeFolderSet", async () => {
    ElectronStoreRef.set(
      "ActiveFolder",
      await Promise.resolve(NewNotebookDirPath)
    );
    console.log("ActiveFolder: ", ElectronStoreRef.get("ActiveFolder"));
  });

  ipcMain.on("loadNewDir", () => {
    getNotes();
  });

  ipcMain.on("loadNotesInMainWin", () => {
    // Send a message to the mainWindow to load notes
    mainWindow.webContents.send("loadNotesMain");
    console.log("loadNotesInMainWin");
  });

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});


