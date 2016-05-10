// Inject the page specific styles on page load
function loadCss() {
  let viewPath = document.getElementsByTagName('body')[0].dataset.jsViewPath;
  if (viewPath === window.currentViewPath) {
    return;
  }

  // Remove the style tag from the previous page
  let styleTag = document.head.getElementsByTagName('style')[0];
  if (styleTag) {
    styleTag.remove();
  }

  // Attempt to load the page specific stylesheet if it exists
  window.currentViewPath = viewPath;
  require.ensure([], function loadStylesheet(require) {
    // Load the page specific styles into new page
    try {
      require('../views/' + viewPath + '/main.scss');
    } catch (e) {
      console.warn(`No stylesheet for '${viewPath}'`);
      console.error(e);
    }
  });
}

// Mount the page specific JS views on page load
function loadJs() {
  let viewPath = document.getElementsByTagName('body')[0].dataset.jsViewPath;

  // Attempt to load the page specific view if it exists
  require.ensure([], function loadJavaScriptView(require) {
    try {
      const ViewClass = require('../views/' + viewPath + '/main.js').default;
      let view = new ViewClass();
      window.currentView = view;
    } catch(e) {
      console.warn(`No JS view for '${viewPath}'`);
      console.error(e);
      window.currentView = undefined;
    }

    if (window.currentView) {
      window.currentView.mount();
    }
  });
}

// Unmount the application and page specific JS views on page unload
function unload() {
  if (!window.currentView) { return; }

  try {
    window.currentView.unmount();
  } catch(e) {
    console.warn('window.currentView#unmount', window.currentView, e);
  }
}

document.addEventListener('turbolinks:load', loadCss);
document.addEventListener('turbolinks:load', loadJs);
document.addEventListener('turbolinks:visit', unload);
setTimeout(loadCss, 0);
