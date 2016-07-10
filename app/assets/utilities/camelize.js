const STRING_CAMELIZE_REGEXP_1 = (/(\-|\_|\.|\s)+(.)?/g);
const STRING_CAMELIZE_REGEXP_2 = (/(^|\/)([A-Z])/g);

/**
  Returns the lowerCamelCase form of a string.
  @see http://emberjs.com/api/classes/Ember.String.html

  ```js
  import camelize from 'camelize';

  let key = camelize('user-name');
  // "userName"
  ```

  @method camelize
  @param {String} string
  @return {String}
*/
export default function(string) {
  return string.replace(STRING_CAMELIZE_REGEXP_1, function(match, separator, chr) {
    return chr ? chr.toUpperCase() : '';
  }).replace(STRING_CAMELIZE_REGEXP_2, function(match, separator, chr) {
    return match.toLowerCase();
  });
}
