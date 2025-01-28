const fs = require("fs");
const {message} = require('../lang/messages/en/en')

function readFromFile(filePath, callback) {
  fs.exists(filePath, (exists) => {
    if (!exists) {
      return callback(message.fileNotFound);
    }

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return callback(message.fileReadError);
      }
      callback(null, data);
    });
  });
}

module.exports = { readFromFile };
