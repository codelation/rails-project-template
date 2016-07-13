var environment = 'development';
var loadedEnvironment;

['APPLICATION_ENV', 'ENVIRONMENT', 'MIX_ENV', 'NODE_ENV', 'RACK_ENV', 'RAILS_ENV'].some(function(env) {
  loadedEnvironment = process.env[env];
  if (loadedEnvironment === 'production' || loadedEnvironment === 'prod') {
    environment = 'production';
    return true;
  }
});

module.exports = environment;
