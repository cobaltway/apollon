/*
    This event occurs when client is disconnected
*/

module.exports = function(e) {
    this.error('Client disconnected; killing thread');

    this.destroy().then(() => {
        process.exit(1); // Kill the thread (forever should restart it)
    });
};
