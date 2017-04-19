if (true) {
    const GitWatch = require('git-remote-update');

    const gw = new GitWatch();

    gw.on('ready', gw.watch);
    gw.on('newerCommit', gw.update);
    gw.on('updated', process.exit);
}
