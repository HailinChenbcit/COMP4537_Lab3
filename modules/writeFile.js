const fs = require("fs");
const path = require("path");

function appendToFile(text, callback) {
  const filePath = path.join(__dirname, "../file.txt");

  fs.appendFile(filePath, text + "\n", (err) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, `Successfully appended text: '${text}' to file.txt.`);
    }
  });
}

module.exports = { appendToFile };
