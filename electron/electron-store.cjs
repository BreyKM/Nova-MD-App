// Node.js 'fs' and 'path' modules are built-in for file operations
const fs = require('fs');
const path = require('path');
const { app } = require("electron");

class ElectronStore {
  constructor(fileName = 'store.json') {
    const userDataPath = app.getPath('userData'); // or app.getPath('userData') 
    this.filePath = path.join(userDataPath, fileName);

    try {
      // Try to read the file and parse it as JSON
      this.data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
      console.log(app.getPath('userData'))
    } catch (error) {
      // If file read or parse fails, start with an empty object
      this.data = {};
    }
  }

  // Get a value from the store
  get(key) {
    return this.data[key];
  }

  // Set a value in the store
  set(key, value) {
    this.data[key] = value;
    console.log(app.getPath('userData'))
    this.save();
  }

  // Delete a value from the store
  delete(key) {
    delete this.data[key];
    this.save();
  }

  // Save the current state to disk
  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data));
    console.log(app.getPath('userData'))
  }
}

module.exports = ElectronStore;