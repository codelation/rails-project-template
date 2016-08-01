export default function(callback) {
  require.ensure(['vue'], function(require) {
    // Register any Vue components that will be used on the page
    Vue.component('jsonapi-table', require('jsonapi-table'));
    Vue.component('jsonapi-column', require('jsonapi-column'));
    Vue.component('user-form', require('user-form'));

    // The callback is needed to create the root Vue after the components are registered
    callback();
  });
}
