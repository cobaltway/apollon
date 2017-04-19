/*
    Send a text message to a channel
    Also log the message sent
*/

module.exports = function(channel, text) {
    let location;
    if (channel.guild) {
        // The message is sent into a guild
        location = channel.guild.name + ' (#' + channel.name + ')';
    }
    else if (channel.recipient) {
        // The message is sent privately
        location = '@' + channel.recipient.username + ' (private)';
    }
    else {
        // The message is sent privately from an user object
        location = '@' + channel.username + ' (private)';
    }

    channel.sendMessage(text).then(() => {
        this.log('TALK to ' + location + ': ' + text);
    }, (error) => {
        this.error(error);
    });
};
