/* jshint node:true */
var callaway = require('./node_modules/callaway/index');

callaway.css(['active_admin', 'application', 'mailer']);
callaway.js(['active_admin', 'application']);
callaway.static(['images']);

module.exports = callaway.tree();
