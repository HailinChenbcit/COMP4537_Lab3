const fs = require("fs");

function readFromFile(filePath, callback) {
  fs.exists(filePath, (exists) => {
    if (!exists) {
      return callback("File not found");
    }

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return callback("Error reading the file");
      }
      callback(null, data);
    });
  });
}

module.exports = { readFromFile };
