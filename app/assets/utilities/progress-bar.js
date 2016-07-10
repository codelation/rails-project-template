import Turbolinks from 'turbolinks';
const progressBar = new Turbolinks.ProgressBar();

export default {
  hide() {
    progressBar.setValue(1);
    progressBar.hide();
  },

  show() {
    progressBar.setValue(0);
    progressBar.show();
  }
};
