# Components

Define custom Vue Components here.

Here is the general way how to do that.

*copy of vue-info from standard library*

```javascript
(function() {
  "use strict";

  App.register('component').enter(function() {

    var template = '<div class="vue-info" :style="{\'font-size\': size + \'px\'}">\
                      <i class=\"fa fa-question vue-info-hint\"></i>\
                      <span class="vue-info-message" :class="[direction]">\
                        <slot></slot>\
                      </span>\
                    </div>';

    App.ui.components.vueInfo = Vue.extend({
      template: template,
      props: {
        'size': {
          default: '12'
        },
        'direction': {
          default: ''
        }
      }
    });
  });
})();
```


This will expose the component in the **App.ui.components.vueInfo** object.
Use it like this in your other Vue components

```javascript
(function() {
  "use strict";

  App.register('component').enter(function() {
    App.ui.root = new Vue({
      el: '#page-name',
      components: {
        'vue-info': App.ui.components.vueInfo
      }
    });
  });
})();
```
