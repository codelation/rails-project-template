# Views

Define per page javascript here.  Folder structure is

```
controller ->
  index.js
  show.js
  new.js
  edit.js
  custom.js
  etc...
```

```javascript
(function() {
  "use strict";

  // Define javascript to run when on the controller and action page
  App.register('controller_name.action_name').enter(function() {
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

Or for all actions in the controller

```javascript
(function() {
  "use strict";

  // Define javascript to run when on the controller pages
  App.register('controller_name').enter(function() {
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
