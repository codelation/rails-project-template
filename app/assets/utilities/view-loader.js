export default class {
  // Mount the page specific JS view
  mount() {
    let viewName = document.body.getAttribute('data-view-name');

    // Attempt to load the page specific view if it exists
    try {
      const ViewClass = require('../views/' + viewName + '/main.js').default;

      let view = new ViewClass();
      window.currentView = view;
    } catch(e) {
      if (e.message.substring(0, 18) === 'Cannot find module') {
        console.warn(`No JS view for '${viewName}'`);
      } else {
        console.error(e);
      }
      window.currentView = undefined;
    }

    if (window.currentView) {
      window.currentView.mount();
    }
  }

  // Unmount the page specific JS views
  unmount() {
    if (!window.currentView) { return; }

    try {
      window.currentView.unmount();
    } catch(e) {
      console.warn('window.currentView#unmount', window.currentView, e);
    }
  }
}
