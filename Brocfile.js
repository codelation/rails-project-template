/* jshint node:true */
var codelation = require('./node_modules/codelation-asset-pipeline/index');

codelation.css(['active_admin', 'application', 'mailer']);
codelation.js(['active_admin', 'application']);
codelation.static(['images']);

module.exports = codelation.tree();
