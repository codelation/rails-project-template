/* globals Vue */

(function() {
  "use strict"

  App.additionalComponent = Vue.extend({
    data: function() {
      return {
        compVar: 1
      }
    },
    props: ['propname'],
    template: '#templateID'
  });
})();
