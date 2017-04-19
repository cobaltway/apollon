/*
    Welcome privately all users entering the listed servers with a defined message
*/

const guilds = global.config.actions.welcomeMessage.guilds;

module.exports = function(member) {
    guilds.forEach((guild) => {
        // If current guild is in the config, send the welcome message to the member
        if (guild.name === member.guild.name) {
            this.talk(member.user, guild.message);
            return true;
        }
    });

    return false;
};
