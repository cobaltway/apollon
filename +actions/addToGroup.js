/*
    Allow the bot to add roles to members of listed guilds
    User should ask their role to the bot in private chat, using a defined word
    Should probably be paired with a welcome message to indicate users what to order
*/

const guilds = global.config.actions.addToGroup.guilds,
    words = [];
guilds.forEach((guild) => {
    guild.roles.forEach((role) => {
        if (words.indexOf(role.word.toLowerCase()) === -1) {
            words.push(role.word.toLocaleLowerCase());
        }
    });
});

module.exports = function(message) {
    if (this.isIn(message.content, words)) {
        this.log('addToGroup(' + message.channel.recipient.username + ', ' + message.content + ')');

        // Get all mutual guilds with the user
        message.channel.recipient.client.guilds.forEach((mutualGuild) => {
            // For each guild configured above
            guilds.forEach((guild) => {
                // Get intersection between those two
                if (this.equals(mutualGuild.name, guild.name)) {
                    // For each roles configured above
                    guild.roles.forEach((guildRole) => {
                        // Check if the word associated with the role is in the message
                        if (this.isIn(message.content, guildRole.word)) {
                            // Get the role object in the guild objet from the name
                            mutualGuild.roles.forEach((mutualGuildRole) => {
                                if (this.equals(mutualGuildRole.name, guildRole.name)) {
                                    // Finally add the role to the guild member
                                    this.log('trying to add the role ' + guildRole.name + ' on the server ' + guild.name);
                                    mutualGuild.member(message.channel.recipient).addRole(mutualGuildRole).then(() => {
                                        this.talk(message.channel, 'Vous avez été ajouté avec succès au groupe ' + guildRole.name +
                                            ' sur le serveur ' + guild.name + ' !');
                                    }, (error) => {
                                        this.log('Add operation rejected');
                                        this.error(error);
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });

        return true;
    }
    return false;
};
