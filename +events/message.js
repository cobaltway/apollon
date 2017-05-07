/*
    This event occurs when a message from any source is received
*/

module.exports = function(message) {
    // Prevents bot from reacting to it own messages
    if (message.author.equals(this.user)) {
        return;
    }
    // Private chat only functions go here
    if (message.channel.constructor.name === 'DMChannel') {
        if (this.addToGroup(message)) {
            return;
        }
    }
    if (this.isMaster(message.author)) {
        if (this.saveMessages(message)) {
            return;
        }

        if (this.deleteMessages(message)) {
            return;
        }
        console.log(message.guild.memberCount, message.guild.members.keys().length);
    }

    if (this.lmgtfy(message)) {
        return;
    }
};
