/**
 * Converts `string`, as space separated words, to lower case.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @see camelCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * lowerCase('--Foo-Bar--')
 * // => 'foo bar'
 *
 * lowerCase('fooBar')
 * // => 'foo bar'
 *
 * lowerCase('__FOO_BAR__')
 * // => 'foo bar'
 */
const lowerCase = (string) => {
  const cleanString = string
    .toString()
    // Replaces any - or _ characters with a space
    .replace( /[-_]+/g, ' ')
    // Removes any non alphanumeric characters
    .replace( /[^\w\s]/g, '')

  if (cleanString.split(" ").length === 1) {
    return cleanString
      .trim()
      .split("")
      .map(elem => {
        return elem.toUpperCase() === elem ? ` ${elem.toLowerCase()}` : elem;
      })
      .join("")
      .split(" ")
      .join(" ");
  } else {
    return cleanString
      .toLowerCase()
      .trim()
      .split(" ")
      .join(" ");
  }
}

export default lowerCase
