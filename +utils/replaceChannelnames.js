/*
    Replace all channel mentions by corresponding channel names
*/

module.exports = function(m, content) {
    let channelID, channelName;
    const channelnames = m.content.match(/<#[0-9]+>/g);
    if (channelnames) {
        channelnames.map((c) => {
            channelID = c.replace(/<#/, '').replace(/>/, '');
            if (m.guild.channels.get(channelID)) {
                channelName = m.guild.channels.get(channelID).name;
            }
            else {
                // Never seen but could probably happend if the channel was deleted
                channelName = 'DeletedChannel';
            }

            content = content.replace(c, '#' + channelName);
        });
    }

    return content;
};
