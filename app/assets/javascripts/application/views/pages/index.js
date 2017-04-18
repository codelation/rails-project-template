/* globals Vue */

(function() {
  "use strict"

  App.register('pages.index').enter(function() {
    App.vue.root = new Vue({
      el: '#v-page',
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
