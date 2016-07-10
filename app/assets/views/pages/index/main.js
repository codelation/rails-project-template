let view;

export default class {
  mount() {
    require.ensure(['vue'], function(require) {
      // Register any Vue components that will be used on the page
      // Vue.component('example', require('example-component'));
      view = new Vue({ el: document.body });
    });
  }

  unmount() {
    view.$destroy();
  }
}
