/* globals Vue */

/**
  Create a template in the view directory by creating a folder in the view folder (example /views/pages/templates)
  Create the file (filename.html.erb)
  Wrap the contents in the following:

  ```
  <script type="x-template" id="template-name">
    <!-- Vue Template contents -->
  </script>
  ```
  Include the template by: <%= render "path/to/template" %>
  This can be done anywhere (prefereably at the end of the file)

  Populate a node with the template by:

  <div is="component-name" :propname="value" v-ref:template-name></div>

  See the index page for example
*/

(function() {
  "use strict"

  App.register('pages.index').enter(function() {
    App.pagesIndexView = new Vue({
      el: '#componentID',

      components: {
        'additional-component': App.additionalComponent // Store in /components
      },

      computed: {
        customVar: function() {
          //Do something and return value.  Will get calculated anytime any of the variables used changes
          //Access data via this.varName

          return this.dataVar + 2;
        },
        customWithModel: function() {
          // Store in /models
          var cusModel = new App.CustomModel({
            data: {
              name: 'example'
            }
          });
          return cusModel;
        }
      },

      data: function() {
        return {
          dataVar: 1,
          dataArr: []
        }
      },

      methods: {
        customFunction: function(parameters) {
          //do something and return
          return -1;
        }
      }
    });
  }).exit(function() {
    //When page exits

    //uninitialize the vue component
    App.pagesIndexView = null;
  });
})();
