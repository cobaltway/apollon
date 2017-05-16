const cron = require('node-cron'),
    guilds = global.config.actions.calendrier.guilds;

module.exports = function() {
    cron.schedule('* * 9 * * *', () => {
        guilds.forEach(g => {
            this.calendrier({
                content: 'Quel jour sommes-nous citoyen ?',
                channel: this.guilds.find('name', g.name).channels.get(g.channel)
            });
        });
    });
};
