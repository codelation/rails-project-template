/* globals Vue */

(function() {
  "use strict"

  App.register('pages.index').enter(function() {
    App.ui.root = new Vue({
      el: App.ui.config.main.rootComponentNode,
      data: function() {
        return {

        }
      },
      methods: {

      }
    });
  }).exit(function() {
    //When page exits
  });
})();
