/*
    Check if words (array of string or a single string) are in message.
    That's an OR based test.
*/

module.exports = function(message, words) {
    message = message.toLowerCase();
    if (words.some === undefined) {
        return message.indexOf(words.toLowerCase()) !== -1;
    }
    else {
        return words.some((w) => {
            return message.indexOf(w.toLowerCase()) !== -1;
        });
    }
};
