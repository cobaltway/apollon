// Setup the updater from github
require('./.gitupdate.js');

const Discord = require('discord.js'),
    fs = require('fs'),
    path = require('path');

global.config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));

const apollon = new Discord.Client();

// Extends bot prototype with util functions
const utils = fs.readdirSync('./_utils');
utils.forEach((u) => {
    apollon[u.replace('.js', '')] = require('./+utils/' + u).bind(apollon);
});

// Extends bot prototype with action functions
const actions = fs.readdirSync('./_actions');
actions.forEach((a) => {
    apollon[a.replace('.js', '')] = require('./+actions/' + a).bind(apollon);
});

// Handle events
const events = fs.readdirSync('./_events');
events.forEach((e) => {
    apollon.on(e.replace('.js', ''), require('./+events/' + e).bind(apollon));
});

const creds = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')));
// Login with token
apollon.login(global.config.mode === 'dev' ? creds.devToken : creds.prodToken)
.then(() => {
    apollon.log('Apollon connected');
})
.catch(() => {
    apollon.error('Apollon failed to connect');
    process.exit(1);
});
