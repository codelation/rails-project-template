require('expose?$!expose?jQuery!jquery');

console.log('Turbolinks', Turbolinks);
console.log('Something!');

$(document).ready(function() {
  console.log('jQuery?', $('body'));

  require.ensure(['vue'], function(require) {
    var Vue = require('vue');
    console.log(Vue);
  });
});
