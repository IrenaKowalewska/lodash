/**
 * Pads `string` on the right side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * padEnd('abc', 6)
 * // => 'abc   '
 *
 * padEnd('abc', 6, '_-')
 * // => 'abc_-_'
 *
 * padEnd('abc', 2)
 * // => 'abc'
 */
function padEnd(string, length, chars) {
  if(string.length >= length) {
    return string;
  }
  const padLength = length - string.length;
  let result = '';

  if (!chars) {
    result += string + (" ").repeat(padLength);
  } else {
    const repeatTimes = Math.ceil(padLength / chars.length);
    result += string + chars.repeat(repeatTimes).substr(0, padLength);
  }

  return result;
}

export default padEnd
