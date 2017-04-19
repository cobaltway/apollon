if (false) {
    const gw = new require('git-remote-update');

    gw.on('ready', gw.watch);
    gw.on('newerCommit', gw.update);
    gw.on('updated', process.exit);
}
