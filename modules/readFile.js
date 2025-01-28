const fs = require("fs");
const path = require("path");

function readFromFile(callback) {
  const filePath = path.join(__dirname, "../file.txt");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        callback(null, "404 Error: File 'file.txt' does not exist.");
      } else {
        callback(err, null);
      }
    } else {
      callback(null, data);
    }
  });
}

module.exports = { readFromFile };
