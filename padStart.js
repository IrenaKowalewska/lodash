/**
 * Pads `string` on the left side if it's shorter than `length`. Padding
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
 * padStart('abc', 6)
 * // => '   abc'
 *
 * padStart('abc', 6, '_-')
 * // => '_-_abc'
 *
 * padStart('abc', 2)
 * // => 'abc'
 */
function padStart(string, length, chars) {
  if(string.length >= length) {
    return string;
  }
  const padLength = length - string.length;
  let result = '';

  if (!chars) {
    result += (" ").repeat(padLength) + string;
  } else {
    const repeatTimes = Math.ceil(padLength / chars.length);
    result += chars.repeat(repeatTimes).substr(0, padLength) + string;
  }

  return result;
}

export default padStart
