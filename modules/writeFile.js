const fs = require('fs');
const {message} = require('../lang/messages/en/en')

function appendToFile(filePath, text, callback) {
    fs.exists(filePath, (exists) => {
        if (exists) {
            fs.appendFile(filePath, text + '\n', (err) => {
                if (err) {
                    return callback(message.fileAppendError);
                }
                callback(null, message.fileAppendSuccess);
            });
        } else {
            fs.writeFile(filePath, text + '\n', (err) => {
                if (err) {
                    return callback(message.fileWriteError);
                }
                callback(null, message.fileWriteSuccess);
            });
        }
    });
}

module.exports = { appendToFile };
