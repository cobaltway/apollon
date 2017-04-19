const express = require('express'),
    httpServer = express(); // Create the http server

const port = global.config.web.port,
    user = global.credentials.user,
    password = global.credentials.password;

httpServer.use(require('express-basic-auth')({ // Lock the http access
    users: { [user]: password },
    challenge: true,
    realm: 'Apollon heart'
}));

httpServer.use(express.static('data')); // Serve log files
httpServer.listen(port, () => { // Make it listen for incoming http requests
    console.log(`Http server is listening on port ${port}!`);
});

module.exports = httpServer;
