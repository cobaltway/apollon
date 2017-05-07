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

function diffuseKeys({guild, name, role, channel, links}) {
    let count = 0;
    const guildObject = this.guilds.get(guild);
    const roleObject = guildObject.roles.find('name', role);
    guildObject.members.forEach((m) => {
        setTimeout(() => {
            this.talk(m, `Voilà ton lien pour le vote \`${name}\` sur ${guildObject.name}.\nPour voter, il te suffit de cliquer et de remplir le formulaire.\nCe lien ne fonctionnera qu'une seule fois, pour ce vote seulement, et il t'est personnel, alors veille à ne pas le diffuser.\n⮕ ${links[count++]}`);
        }, 100);
    });

    this.talk(this.guilds.get(guild).channels.get(channel),
        `Une nouvelle élection a été ouverte.\n\`\`\`${name}\`\`\`\nCette élection est ouverte aux ${roleObject}.\nVous allez recevoir dans les prochaines minutes une clé en message privé pour y participer.`);
}

module.exports = function(app) {
    app.post('/balloter/:basePath/:name/:code/:guild/:channel/:role', (req, res) => {
        if (req.params.code !== code) {
            res.status(403).end();
            return;
        }

        const numbers = getNumberOfUsers.call(this, req.params.guild, req.params.role);
        request.get(`http://${req.params.basePath}/api/getKeys/${code}/${numbers}`)
        .on('response', (response) => {
            const links = JSON.parse(response).links;
            diffuseKeys.call(this, {
                guild: req.params.guild,
                name: req.params.name,
                role: req.params.role,
                channel: req.params.channel,
                links
            });
            res.status(200).end('OK');
        });
    });
};
