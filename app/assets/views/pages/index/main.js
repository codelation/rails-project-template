export default function(callback) {
  require.ensure(['vue'], function(require) {
    // Register any Vue components that will be used on the page
    // Vue.component('example', require('example-component'));

    // The callback is needed to create the root Vue after the components are registered
    callback();
  });
}
