const STRING_DASHERIZE_REGEXP = (/[ _]/g);
const STRING_DECAMELIZE_REGEXP = (/([a-z\d])([A-Z])/g);

/**
  Returns the lowerCamelCase form of a string.
  @see http://emberjs.com/api/classes/Ember.String.html

  ```js
  import camelize from 'camelize';

  let key = camelize('user-name');
  // "userName"
  ```

  @method dasherize
  @param {String} string
  @return {String}
*/
export default function(string) {
  return string.replace(STRING_DECAMELIZE_REGEXP, '$1_$2')
               .toLowerCase()
               .replace(STRING_DASHERIZE_REGEXP, '-');
}
