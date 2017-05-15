const Discord = require('discord.js'),
    fs = require('fs'),
    path = require('path');

global.config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));
global.credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')));

const apollon = new Discord.Client();

apollon.web = require('./+web/http.js').call(apollon); // Start the http server

// CRON tasks
const cron = fs.readdirSync('./+cron');
cron.forEach(c => {
    require('./+cron/' + c).call(apollon);
});

// Extends bot prototype with util functions
const utils = fs.readdirSync('./+utils');
utils.forEach(u => {
    apollon[u.replace('.js', '')] = require('./+utils/' + u).bind(apollon);
});

// Extends bot prototype with action functions
const actions = fs.readdirSync('./+actions');
actions.forEach(a => {
    apollon[a.replace('.js', '')] = require('./+actions/' + a).bind(apollon);
});

// Handle events
const events = fs.readdirSync('./+events');
events.forEach(e => {
    apollon.on(e.replace('.js', ''), require('./+events/' + e).bind(apollon));
});

// Login with token

apollon.login(global.config.mode === 'dev' ? global.credentials.devToken : global.credentials.prodToken)
.then(() => {
    apollon.log('Apollon connected');
})
.catch(() => {
    apollon.error('Apollon failed to connect');
    process.exit();
});
