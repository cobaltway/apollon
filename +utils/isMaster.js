/*
    Return true if the user is in the list below...
*/

const masters = global.config.utils.isMaster.masters;

module.exports = function(user) {
    return masters.indexOf(user.username) !== -1;
};
