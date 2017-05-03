/*
    This event occurs when a member joined a guild
*/

module.exports = function(member) {
    // Prevents bot from reacting to it own invitation
    if (member.user.equals(this.user)) {
        return;
    }

    this.log(`${member.displayName} joined the server ${member.guild.name}`);

    if (this.welcomeMessage(member)) {
        return;
    }
};
