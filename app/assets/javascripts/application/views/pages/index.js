/* globals Vue */

(function() {
  "use strict"

  App.register('pages.index').enter(function() {
    App.pagesIndexView = new Vue({
      el: '#example-component',
      components: {
        'additional-component': App.additionalComponent // Store in /components
      },
      data: function() {
        return {
          selected: false,
          message: 'hello world!',
          list: [
            { text: 'one' },
            { text: 'two' },
            { text: 'three' }
          ]
        }
      },
      methods: {
        reverseMessage: function () {
          this.message = this.message.split('').reverse().join('')
        }
      }
    });
  }).exit(function() {
    //When page exits

    //uninitialize the vue component
    App.pagesIndexView = null;
  });
})();
