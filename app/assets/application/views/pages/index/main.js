import parseNumber from 'parse-number';

export default class {
  mount() {
    console.log('PagesIndexView mounted');
    // Specific logic here
    console.log('PagesIndexView mounted', parseNumber('$500'));
  }

  unmount() {
    // Specific logic here
    console.log('PagesIndexView unmounted');
  }
}
