/*
    Delete all the messages in the channel
    The action must be performed one message by one, so it's pretty slow
*/

// Recursive function that delete chunks of messages, from bottom to top
const deleteMessages = function(message) {
    message.channel.fetchMessages({
        limit: 100,
        before: message.id
    }).then((messages) => {
        if (messages.size) {
            deleteMessages(messages.last());
            messages.deleteAll();
        }
    }, (error) => {
        if (error) {
            this.error(error);
        }
    });
};

module.exports = function(message) {
    if (this.isIn(message.content, 'code red, password: omega-XT23191-sassycatboys, nuke everything')) {
        this.talk(message.channel, 'Roger that Mr.Trump. This will be epic.');
        deleteMessages.call(this, message);

        return true;
    }

    return false;
};
