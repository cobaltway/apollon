const code = global.credentials.devToken,
    bodyParser = require('body-parser');

function getNumberOfUsers(guild, role) {
    let count = 0;
    this.guilds.get(guild).members.forEach((m) => {
        if (m.roles.find('name', role)) {
            count++;
        }
    });
    return count;
}

function diffuseKeys({guild, name, role, channel, tokens, slug, basePath}) {
    let count = 0;
    const guildObject = this.guilds.get(guild);
    const roleObject = guildObject.roles.find('name', role);
    guildObject.members.forEach((m) => {
        let link = basePath + '/election/' + slug + '/' + tokens[count++];
        setTimeout(() => {
            this.talk(m, `Voilà ton lien pour le vote \`${name}\` sur ${guildObject.name}.\nPour voter, il te suffit de cliquer et de remplir le formulaire.\nCe lien ne fonctionnera qu'une seule fois, pour ce vote seulement, et il t'est personnel, alors veille à ne pas le diffuser.\n⮕ ${link}`);
        }, 100);
    });

    this.talk(this.guilds.get(guild).channels.get(channel),
        `Une nouvelle élection a été ouverte.\n\`\`\`${name}\`\`\`\nCette élection est ouverte aux ${roleObject}.\nVous allez recevoir dans les prochaines minutes une clé en message privé pour y participer.`);
}

module.exports = function(app) {
    app.get('/balloter/:code/membersCount/:guild/:role/', (req, res) => {
        if (req.params.code !== code) {
            res.status(403).end();
            return;
        }

        res.status(200).end(String(getNumberOfUsers.call(this, req.params.guild, req.params.role)));
    });

    app.post('/balloter/:code/broadcast/:guild/:channel/:role',
        bodyParser.urlencoded({ extended: false }),
        (req, res) => {
            if (req.params.code !== code) {
                res.status(403).end();
                return;
            }
            console.log('hello',
                {
                    guild: req.params.guild,
                    role: req.params.role,
                    channel: req.params.channel,
                    tokens: JSON.parse(req.body.tokens),
                    name: req.body.name,
                    slug: req.body.slug,
                    basePath: req.body.basePath
                });
            diffuseKeys.call(this, {
                guild: req.params.guild,
                role: req.params.role,
                channel: req.params.channel,
                tokens: JSON.parse(req.body.tokens),
                name: req.body.name,
                slug: req.body.slug,
                basePath: req.body.basePath
            });
            res.status(200).end();
        });
};
