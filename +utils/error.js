/*
    Used for errors handling.
    Date the error, display it, and write it into date/error.txt
*/

const fs = require('fs');

module.exports = function(error) {
    console.error(error);
    fs.writeFile('data/errors.txt', (new Date()).toUTCString() + ': ' + error + '\n', {
        flag: 'a'
    }, (errorWriting) => {
        if (errorWriting) {
            console.error(errorWriting);
        }
    });
};
