/*
    Return a link on lmgtfy on 'lmgtfy ' + query
*/

module.exports = function(message) {
    if (message.content.indexOf('lmgtfy') === 0 && message.content.substring(6).trim()) {
        this.talk(message.channel, 'http://fr.lmgtfy.com/?q=' +
            message.content.substring(6, message.content.length).trim().replace(/\s/g, '+'));
        return true;
    }

    return false;
};
