'use strict';

/**
 * SSH Configuration
 * 
 */
const password = "mystrongpassword";
let config = {user: 'user', host: 'my.host.name', password: password};
let command = 'python /path/to/launchme.py';

module.exports = {config: config, command: command};