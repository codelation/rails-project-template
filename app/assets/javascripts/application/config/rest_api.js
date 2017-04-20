(function() {
  "use strict";

  // Rest API Config,
  // see https://github.com/codelation/codelation_ui/blob/master/app/assets/javascripts/codelation_ui/std/interfaces/rest_api.js#L5

  App.register('config').enter(function() {
    App.vue.config.restApi.version = 1;
  });
})();
