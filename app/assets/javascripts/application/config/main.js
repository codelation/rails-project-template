(function() {
  "use strict";

  App.register('config').enter(function() {

    // Displays all available UI options in the warnings
    App.vue.config.main.showInterfaces = true;
    
    // Sets what the default root vue component should attach to
    App.vue.config.main.rootComponentNode = 'body';
    
    // Interfaces included into every vue component
    App.vue.config.main.includedInterfaces = [
      App.vue.interfaces.contentFormatters,
      App.vue.interfaces.string,
      App.vue.interfaces.number,
      App.vue.interfaces.array,
      App.vue.interfaces.date,
      App.vue.interfaces.custom || {}
    ];

    // Components registered globably
    App.vue.globalComponents['vue-info'] = App.vue.components.vueInfo;
    App.vue.globalComponents['vue-transition'] = App.vue.components.vueTransition;
    App.vue.globalComponents['vue-checkmark'] = App.vue.components.vueCheckmark;
    App.vue.globalComponents['vue-input'] = App.vue.components.vueInput;
    App.vue.globalComponents['vue-code'] = App.vue.components.vueCode;
    App.vue.globalComponents['vue-fail'] = App.vue.components.vueFail;
    App.vue.globalComponents['vue-radial-progress-bar'] = App.vue.components.vueRadialProgressBar;
    App.vue.globalComponents['vue-slider'] = App.vue.components.vueSlider;
    App.vue.globalComponents['vue-spinner'] = App.vue.components.vueSpinner;
  });
})();
