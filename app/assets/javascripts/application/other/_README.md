# Other

Define other javascript here.  Generally this is bad form to add stuff here.  Look at adding them to the other directories first.

Here is how to add



```javascript
(function() {
  "use strict";

  App.register('component').enter(function() {
    // Your code on page load
  }).exit(function(){
    // Your code on page exit (won't stop the page from leaving, just for cleaning up)
  });
})();
```
