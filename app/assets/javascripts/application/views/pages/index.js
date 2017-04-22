/* globals Vue */

(function() {
  "use strict"

  App.register('pages.index').enter(function() {
    App.vue.root = new Vue({
      el: App.vue.config.main.rootComponentNode,
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
