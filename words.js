/**
 * Splits `string` into an array of its words.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * words('fred, barney, & pebbles')
 * // => ['fred', 'barney', 'pebbles']
 *
 * words('fred, barney, & pebbles', /[^, ]+/g)
 * // => ['fred', 'barney', '&', 'pebbles']
 */
const diacriticalMarks = [
  '\xc0', '\xc1', '\xc2', '\xc3', '\xc4', '\xc5', '\xc6', '\xc7', '\xc8', '\xc9', '\xca', '\xcb', '\xcc', '\xcd', '\xce', '\xcf',
  '\xd0', '\xd1', '\xd2', '\xd3', '\xd4', '\xd5', '\xd6',         '\xd8', '\xd9', '\xda', '\xdb', '\xdc', '\xdd', '\xde', '\xdf',
  '\xe0', '\xe1', '\xe2', '\xe3', '\xe4', '\xe5', '\xe6', '\xe7', '\xe8', '\xe9', '\xea', '\xeb', '\xec', '\xed', '\xee', '\xef',
  '\xf0', '\xf1', '\xf2', '\xf3', '\xf4', '\xf5', '\xf6',         '\xf8', '\xf9', '\xfa', '\xfb', '\xfc', '\xfd', '\xfe', '\xff',
  '\u0100', '\u0101', '\u0102', '\u0103', '\u0104', '\u0105', '\u0106', '\u0107', '\u0108', '\u0109', '\u010a', '\u010b', '\u010c', '\u010d', '\u010e', '\u010f',
  '\u0110', '\u0111', '\u0112', '\u0113', '\u0114', '\u0115', '\u0116', '\u0117', '\u0118', '\u0119', '\u011a', '\u011b', '\u011c', '\u011d', '\u011e', '\u011f',
  '\u0120', '\u0121', '\u0122', '\u0123', '\u0124', '\u0125', '\u0126', '\u0127', '\u0128', '\u0129', '\u012a', '\u012b', '\u012c', '\u012d', '\u012e', '\u012f',
  '\u0130', '\u0131', '\u0132', '\u0133', '\u0134', '\u0135', '\u0136', '\u0137', '\u0138', '\u0139', '\u013a', '\u013b', '\u013c', '\u013d', '\u013e', '\u013f',
  '\u0140', '\u0141', '\u0142', '\u0143', '\u0144', '\u0145', '\u0146', '\u0147', '\u0148', '\u0149', '\u014a', '\u014b', '\u014c', '\u014d', '\u014e', '\u014f',
  '\u0150', '\u0151', '\u0152', '\u0153', '\u0154', '\u0155', '\u0156', '\u0157', '\u0158', '\u0159', '\u015a', '\u015b', '\u015c', '\u015d', '\u015e', '\u015f',
  '\u0160', '\u0161', '\u0162', '\u0163', '\u0164', '\u0165', '\u0166', '\u0167', '\u0168', '\u0169', '\u016a', '\u016b', '\u016c', '\u016d', '\u016e', '\u016f',
  '\u0170', '\u0171', '\u0172', '\u0173', '\u0174', '\u0175', '\u0176', '\u0177', '\u0178', '\u0179', '\u017a', '\u017b', '\u017c', '\u017d', '\u017e', '\u017f'
];

function addSpacesBetweenUpperLowerLetters(string) {
  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (
      /[A-Z]/g.test(string[i]) && !/[A-Z]/g.test(string[i+1]) && !/[A-Z]/g.test(string[i-1]) ||
      /[A-Z]/g.test(string[i]) && /[A-Z]/g.test(string[i+1]) && !/[A-Z]/g.test(string[i-1]) ||
      /[A-Z]/g.test(string[i]) && !/[A-Z]/g.test(string[i+1]) && string[i+1] !== " " && /[A-Z]/g.test(string[i-1]) && string[i+1]
    ) {
      result += ` ${string[i]}`
    } else {
      result += string[i];
    }
  }

  return result;
}

function formatCompoundWords(string, hasNumber) {
  let result = '';
  const datePrefixes = ['th','st','nd','rd','TH','ST','ND','RD'];

  if (hasNumber) {
    const stringWithNumbers = string.replace(/(\d+)/g, ' $1 ');
    const hasDate = stringWithNumbers.split(' ').some(elem => datePrefixes.includes(elem));
    if (hasDate) {
      result = string;
    } else {
      result = addSpacesBetweenUpperLowerLetters(stringWithNumbers);
    }
  } else {
    const stringWithDiacriticalMarks = string.split('').map(elem => {
      if(diacriticalMarks.includes(elem)) {
        return ` ${elem}`;
      }
      return elem;
    }).join('');
    result = addSpacesBetweenUpperLowerLetters(stringWithDiacriticalMarks);
  }
  return result;
}

function words(string, pattern) {
  let result = [];
  const numbers = ['1','2','3','4','5','6','7','8','9','0'];
  const hasNumber = string.split('').some(elem => numbers.includes(elem));

  if(pattern) {
    const str = string.replace(/[\u2012-\u2015\u2024-\u2026\u205d\u205e\xac\xb1\xd7\xf7\\]/g,"");
    if (!str.length) {
      return [];
    }

    return string.match(pattern);
  }

  if (hasNumber) {
    result = formatCompoundWords(string, true).trim().replace(/ {1,}/g," ").split(' ');
  } else {
    const str = string.replace(/[\u2012-\u2015\u2024-\u2026\u205d\u205e\xac\xb1\xd7\xf7\\]/g,"");
    if (!str.length) {
      return [];
    }
    if (str.split(' ').length > 1) {
      result = str.split(' ')
    } else {
      const res = formatCompoundWords(str, false).trim().replace(/ {1,}/g," ").split(' ');
      result = res;
    }

  }

  return result;
}

export default words
