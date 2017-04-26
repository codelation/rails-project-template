# Mixins

Define functions/methods/workflows etc here to be pulled into your vue components.  Here is how to do that.

```javascript
(function() {
  "use strict";

  App.ui.interfaces.printer = {
    methods: {
      printer: function(msg) {
        console.log(msg);
      }
    }
  };
})();
```

And use it like this

```javascript
(function() {
  "use strict";

  App.register('controller.action').enter(function() {
    App.ui.root = new Vue({
      mixins: [App.ui.interfaces.printer],
      el: '#example-component',
      methods: {
        callPrint: function(){
          this.printer("Hey!");
        }
      }
    });
  });
})();
```
