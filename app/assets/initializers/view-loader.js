import ViewLoader from 'view-loader';

let viewLoader = new ViewLoader();

document.addEventListener('turbolinks:load', function() {
  viewLoader.mount();

  // Remove fixed body height
  document.body.style.height = '';
});

document.addEventListener('turbolinks:before-cache', function() {
  viewLoader.unmount();

  // Set the body height to save scroll position
  document.body.style.height = document.body.offsetHeight + 'px';
});
