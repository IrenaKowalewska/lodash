/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @see camelCase, lowerCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * kebabCase('Foo Bar')
 * // => 'foo-bar'
 *
 * kebabCase('fooBar')
 * // => 'foo-bar'
 *
 * kebabCase('__FOO_BAR__')
 * // => 'foo-bar'
 */
const kebabCase = (string) => {
  const cleanString = string.toString()
    // Replaces any - or _ characters with a space
    .replace( /[-_]+/g, ' ')
    // Removes any non alphanumeric characters
    .replace( /[^\w\s]/g, '')

  if(cleanString.split(" ").length === 1) {
    return cleanString
      .split("")
      .map(elem => {
        return elem.toUpperCase() === elem ? ` ${elem.toLowerCase()}` : elem;
      })
      .join("")
      .split(" ")
      .join("-");
  } else {
    return cleanString
      .toLowerCase()
      .trim()
      .split(" ")
      .map((elem, i) => {
        return elem.trim();
      })
      .join("-");
  }
}

export default kebabCase
