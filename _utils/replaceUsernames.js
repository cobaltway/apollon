/*
    Replace all user mentions by their nickname (or username if they don't have one)
*/

module.exports = function(m, content) {
    let userID, memberName;
    const usernames = m.content.match(/<@!?[0-9]+>/g);
    if (usernames) {
        usernames.map((u) => {
            userID = u.replace(/<@!?/, '').replace(/>/, '');
            if (m.guild && m.guild.member(userID)) {
                memberName = m.guild.member(userID).nickname || m.guild.member(userID).user.username;
            }
            else {
                // Never seen it but could probably happend if the user has left the server
                memberName = 'Unknown';
            }

            content = content.replace(u, '@' + memberName);
        });
    }

    return content;
};
