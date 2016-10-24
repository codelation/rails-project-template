/* globals Vue */

(function() {
  "use strict"

  var computed = {
    field: function() {
      //Computed field
      return -1;
    }
  }

  App.CustomModel = Vue.extend({
    computed: computed
  })
})();
