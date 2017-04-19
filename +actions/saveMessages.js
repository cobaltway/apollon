/*
    Save all messages of the chan from where the command is called in a text file,
    then store it and serve it to the chan itself
*/

const fs = require('fs');

// Recursive function that fetchs messages from the last message to the first one, then write them to > message.guild.name + '_' + message.channel.name + '.txt'
function getMessages(message, messagesChain = '') {
    // Fetch the last 100 messages (max value) before the parameter message
    message.channel.fetchMessages({
        limit: 100,
        before: message.id
    }).then((messages) => {
        let index = 0,
            memberName,
            content;

        messages.forEach((m) => {
            index++;

            // Replace user and channel mentions
            content = this.replaceChannelnames(m, this.replaceUsernames(m, m.content));

            // Add message attachment url (files that are directly sent on discord)
            m.attachments.forEach((a) => {
                content += ' ' + a.url;
            });

            // Sometime behavior of this function is quirky
            // so multiple checks is necessary when fetching a large amount of messages
            memberName = m.author.username;
            if (m.member && m.member.nickname) {
                memberName = m.member.nickname;
            }

            // Maybe for very big logs, storing them entirely in RAM is not the best choice, but that should fit most of time
            messagesChain = (memberName + ' (' + m.createdAt.toLocaleString() + '): ' + content) + '\n' + messagesChain;

            if (index === 100) {
                // Recursive call with the last message fetched and the chain
                getMessages.call(this, m, messagesChain);
            }
        });

        // Terminal case
        if (index !== 100) {
            // Write the chain into a file
            const fileName = message.guild.name + '_' + message.channel.name + '.txt';
            fs.writeFile('data/' + fileName, messagesChain, (error) => {
                if (error) {
                    this.error(error);
                    return;
                }

                this.talk(message.channel, 'It seems that we are done here. All messages stored!');

                // Then serve the file to the channel
                message.channel.sendFile('data/' + fileName, fileName, 'Here they are:', () => {
                    this.log(message.guild.name + '_' + message.channel.name + '.txt sent!');
                });
            });
        }
    }, (error) => {
        if (error) {
            this.error(error);
        }
    });
}

module.exports = function(message) {
    if (this.isIn(message.content, 'please save our messages boy')) {
        this.talk(message.channel, 'Alright you cute little master, I\'m gonna save them now. Could take some time, stay tunned.');
        getMessages.call(this, message);

        return true;
    }

    return false;
};
