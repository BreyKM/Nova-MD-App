const { ensureDir, readdir, readJSON, writeFile, stat } = require("fs-extra");
const { appDirectoryName, fileEncoding } = require("../shared/constants.cjs");
const { dialog } = require("electron");
const { ipcMain } = require("electron");
let { NotesFolderName, NewNoteBookDirName, newNotebookDirNameInputMain, NewNotebookDirPathMain, activeFolderPath } = require('./main.cjs');




module.exports.handleFolderSelection = async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (!result.canceled) {
    NotesFolderName = result.filePaths[0];
  } else {
    NotesFolderName = result.filePaths[0];
  }

  return NotesFolderName;
};

module.exports.newNotebookDirSelection = async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (!result.canceled) {
    NewNoteBookDirName = result.filePaths[0];
  } else {
    NewNoteBookDirName = result.filePaths[0];
  }

  return NewNoteBookDirName;
}

module.exports.updateNewNotebookDirPathMain = async (newPath) => {
  NewNotebookDirPathMain = await Promise.resolve(newPath);
}

module.exports.updateActiveFolderPath = async (newPath) => {
  activeFolderPath = await Promise.resolve(newPath);
}


const getRootDir = () => {
  if (!activeFolderPath) {
    return
  } else {
  if (Object.keys(activeFolderPath).length == 0 || !activeFolderPath) {
    console.log("getRootDir: ", NewNotebookDirPathMain);
    return `${NewNotebookDirPathMain}`;
  } else {
    console.log("getRootDir: ", activeFolderPath);
    return `${activeFolderPath}`;
};  
  }
  
}

module.exports.createNewNotebookDir = async (input) => {
  if (input === '') {
    console.log("input is null");
  } else {
    const path = `${NewNoteBookDirName}\\${input}`
  console.log("createNewNotebookDir: ", path);
   ensureDir(path, function(err) {
    if (err) {
      console.log("Error in creating directory: ", err);
    }
    console.log("Directory created successfully");
  }); 
  return Promise.resolve(path);
  }
 
}

module.exports.getNotes = async () => {
  const rootDir = getRootDir();
  console.log("getNotes RootDir: ", rootDir);

  await ensureDir(rootDir);
  console.log("rootDir: ", rootDir);

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false,
  });

  const notes = notesFileNames.filter((filename) => filename.endsWith(".json"));
  console.log("notes: ", notes);

  return Promise.all(notes.map(getNoteInfoFromFilename));
};

const getNoteInfoFromFilename = async (filename) => {
  const fileStats = await stat(`${getRootDir()}/${filename}`);

  return {
    title: filename.replace(/\.json$/, ""),
    lastEditTime: fileStats.mtimeMs,
  };
};

module.exports.readNote = async (filename) => {
  const rootDir = getRootDir();

  return readJSON(`${rootDir}/${filename}.json`, { encoding: fileEncoding });
};

module.exports.writeNote = (filename, content) => {
  const rootDir = getRootDir();
  console.log("writing file");

  return writeFile(`${rootDir}/${filename}.json`, content, {
    encoding: fileEncoding,
  });
};
