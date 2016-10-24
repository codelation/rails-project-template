/* globals Vue */

(function() {
  "use strict"

  App.additionalComponent = Vue.extend({
    data: function() {
      return {
        static: 1
      }
    },
    props: ['msg', 'dynVar'],
    template: '#example-additional-component'
  });
})();
