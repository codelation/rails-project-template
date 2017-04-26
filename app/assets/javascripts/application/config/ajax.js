(function() {
  "use strict";

  // Ajax Config,
  // see https://github.com/codelation/codelation_ui/blob/master/app/assets/javascripts/codelation_ui/std/interfaces/ajax.js

  App.register('config').enter(function() {
    App.ui.config.std.ajax.version = 1;
  // App.ui.config.std.ajax.url = '/api';
  });
})();
