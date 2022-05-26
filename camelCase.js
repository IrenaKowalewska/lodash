/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @see lowerCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * camelCase('Foo Bar')
 * // => 'fooBar'
 *
 * camelCase('--foo-bar--')
 * // => 'fooBar'
 *
 * camelCase('__FOO_BAR__')
 * // => 'fooBar'
 */
const camelCase = (string) => {
  const cleanString = string.toString()
    // Replaces any - or _ characters with a space
    .replace( /[-_]+/g, ' ')
    // Removes any non alphanumeric characters
    .replace( /[^\w\s]/g, '')
    .split("")
    // Add space after number
    .map(elem => {
      return Number(elem) ? `${elem} ` : elem;
    })
    .join("");

  if (cleanString.split(" ").length === 1) {
    const lettersArray = cleanString.split("");

    return lettersArray.map((elem, i) => {
      return (/[A-Z]/g.test(elem) && lettersArray[i - 1] && lettersArray[i + 1] && (
        (!/[A-Z]/g.test(lettersArray[i - 1]) && !/[A-Z]/g.test(lettersArray[i + 1]) ) ||
        (/[A-Z]/g.test(lettersArray[i + 1]) && !/[A-Z]/g.test(lettersArray[i - 1])) ||
        (/[A-Z]/g.test(lettersArray[i - 1]) && !/[A-Z]/g.test(lettersArray[i + 1]))
      )) ? elem.toUpperCase() : elem.toLowerCase();
    }).join("");
  } else {
    return cleanString.trim().split(" ").map((elem, i) => {
      return i === 0 ? elem.toLowerCase() : elem.substr(0, 1).toUpperCase() + elem.substr(1).toLowerCase();
    }).join("");
  }
}

export default camelCase

