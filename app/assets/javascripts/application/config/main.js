(function() {
  "use strict";

  App.register('config').enter(function() {

    // Displays all available UI options in the warnings
    App.ui.config.main.showInterfaces = true;

    // Sets what the default root vue component should attach to
    App.ui.config.main.rootComponentNode = 'main';

    // Interfaces included into every vue component
    App.ui.config.main.includedInterfaces = [
      App.ui.interfaces.std.format,
      App.ui.interfaces.std.string,
      App.ui.interfaces.std.number,
      App.ui.interfaces.std.array,
      App.ui.interfaces.std.date,
      App.ui.interfaces.custom || {}
    ];

    // Components registered globably
    App.ui.globalComponents['vue-info'] = App.ui.components.std.info;
    App.ui.globalComponents['vue-transition'] = App.ui.components.extended.transition;
    App.ui.globalComponents['vue-checkmark'] = App.ui.components.extended.checkmark;
    App.ui.globalComponents['vue-input'] = App.ui.components.forms.input;
    App.ui.globalComponents['vue-code'] = App.ui.components.extended.code;
    App.ui.globalComponents['vue-fail'] = App.ui.components.extended.fail;
    App.ui.globalComponents['vue-radial-progress-bar'] = App.ui.components.extended.radialProgressBar;
    App.ui.globalComponents['vue-slider'] = App.ui.components.extended.slider;
    App.ui.globalComponents['vue-spinner'] = App.ui.components.extended.spinner;
  });
})();
