if (true) {
    const GitWatcher = require('git-remote-update');

    const gw = new GitWatcher({
        git: './.git'
    });

    gw.on('ready', () => gw.watch(120000));
    gw.on('newerCommit', () => gw.update());
    gw.on('updated', () => process.exit());
}
