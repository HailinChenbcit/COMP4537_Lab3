const fs = require('fs');

function appendToFile(filePath, text, callback) {
    fs.exists(filePath, (exists) => {
        if (exists) {
            fs.appendFile(filePath, text + '\n', (err) => {
                if (err) {
                    return callback('Error appending to file');
                }
                callback(null, 'Text appended to file');
            });
        } else {
            fs.writeFile(filePath, text + '\n', (err) => {
                if (err) {
                    return callback('Error writing to file');
                }
                callback(null, 'File created and text stored');
            });
        }
    });
}

module.exports = { appendToFile };
