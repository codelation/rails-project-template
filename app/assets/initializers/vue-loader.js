let view;

document.addEventListener('turbolinks:load', function() {
  let loadView;
  let viewName = document.body.getAttribute('data-view-name');

  // Attempt to load the page specific view if it exists
  try {
    loadView = require('../views/' + viewName + '/main.js').default;
  } catch(e) {
    if (e.message.substring(0, 18) === 'Cannot find module') {
      console.warn(`No JS view for '${viewName}'`);
    } else {
      console.error(e);
    }
    loadView = undefined;
  }

  if (typeof loadView === 'function') {
    // Create the root Vue after registering components via code splitting
    loadView(function() {
      view = new Vue({ el: document.body });
      document.body.style.height = '';
    });
  } else {
    // Create the root Vue immediately if only global components are used
    view = new Vue({ el: document.body });
    document.body.style.height = '';
  }
});

document.addEventListener('turbolinks:before-cache', function() {
  // Set the body height to save scroll position
  document.body.style.height = document.body.offsetHeight + 'px';
  view.$destroy();
});
