const request = require('request'),
    code = global.credentials.devToken;

function getNumberOfUsers(guild, role) {
    let count = 0;
    this.guilds.get(guild).members.forEach((m) => {
        if (m.roles.find('name', role)) {
            count++;
        }
    });
    return count;
}

module.exports = function(app) {
    app.post('/balloter/:basePath/:code/:guild/:channel/:role', (req, res) => {
        const numbers = getNumberOfUsers.call(this, req.params.guild, req.params.role);
        request.get(`http://${req.params.basePath}/api/getKeys/${code}/${numbers}`)
        .on('response', function(response) {
            console.log(response, 'OK!');
        });
    });
};
