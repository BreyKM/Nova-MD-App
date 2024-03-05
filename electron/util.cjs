const { ensureDir, readdir, readJSON, readJSONSync } = require("fs-extra");
const { appDirectoryName, fileEncoding } = require("../shared/constants.cjs");
const { homedir } = require("os");
const { stat } = require("fs-extra");
const { readFile, writeFile } = require("fs-extra");
const { dialog } = require("electron");
const { ipcMain } = require("electron");
let { NotesFolderName } = require('./main.cjs');




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

const getRootDir = () => {
    console.log("getRootDir: ", NotesFolderName);
  return `${NotesFolderName}`;
};

module.exports.getNotes = async () => {
  const rootDir = getRootDir();

  await ensureDir(rootDir);

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false,
  });

  const notes = notesFileNames.filter((filename) => filename.endsWith(".json"));

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
