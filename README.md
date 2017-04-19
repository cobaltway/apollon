# Apollon

Discord bot for le Herisson bleu and some other servers.
This git repo is also used as a platform to update the production code, using [git-remote-update](https://github.com/cobaltway/git-remote-update).

Sorry, as it is a personal project, no documentation in planned for now.
By the way, the code itself is heavily documented and is probably quite easy to understand.

# Install
`git clone https://github.com/cobaltway/apollon`
`npm install forever -g`
`npm install`
Add a credentials.json file on the root folder.

# Forever
**Start:** `forever start apollon.js`

**Stop:** `forever stopall`

**Restart:** `forever restartall`

**Check uptime:** `forever list`
