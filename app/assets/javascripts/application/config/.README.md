# Config

Used to configure the Codelation UI

Refer to the top of any of the interface files in the UI GitHub repo for the config options you can set.


Also you should define anything that should run first or last here.  Do that like this


First

```javascript
(function() {
  "use strict";

  App.register('first').enter(function() {
    // Code gets run before any pages or component registered javascript
  }).exit(function(){
    // Optional exit, runs first on pages exit as well
  });
})();
```

Last

```javascript
(function() {
  "use strict";

  App.register('last').enter(function() {
    // Code gets run after any pages or component registered javascript
  }).exit(function(){
    // Optional exit, runs last on pages exit as well
  });
})();
```
