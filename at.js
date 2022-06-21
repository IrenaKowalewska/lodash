/**
 * Creates an array of values corresponding to `paths` of `object`.
 *
 * @since 1.0.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Array} Returns the picked values.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }, 4] }
 *
 * at(object, ['a[0].b.c', 'a[1]'])
 * // => [3, 4]
 */
//should work with a falsey `object` when keys are given
const at = (object, ...paths) => {
  const keys = [...paths];
  let result = [];

  if (!object) {
    keys.forEach(item => {
      if (item instanceof Array) {
        item.forEach(keyItem => {
          result.push(object[keyItem]);
        });
      } else {
        result.push(object[item]);
      }
    });
  } else {
    if (object instanceof Array) {
      keys.forEach(item => {
        if (item instanceof Array) {
          item.forEach(el => {
            result.push(object[el]);
          });
        } else if (item instanceof Object && typeof item === 'object') {
          for (let keyItem in item) {
            result.push(object[item[keyItem]]);
          }
        } else {
          result.push(object[item]);
        }
      });
    } else if (object instanceof Object) {
      keys.forEach(item => {
        if (item instanceof Array) {
          if (typeof item[0] === 'number') {
            item.forEach(el => {
              result.push(object[el]);
            });
          } else {
            item.forEach(keyItem => {
              let result2;
              keyItem.split('.').forEach(partOfKeyItem => {
                if (/[0-9]/g.test(partOfKeyItem) && partOfKeyItem.includes('[')) {
                  const arr = partOfKeyItem.split('[');
                  const letterVariable = arr[0];
                  const position = parseInt(arr[1]);
                  if (object[letterVariable][position] instanceof Object) {
                    result2 = Object.assign({}, object[letterVariable][position]);
                  } else {
                    result2 = object[letterVariable][position];
                  }
                } else {
                  result2 = result2[partOfKeyItem];
                }
              });
              result.push(result2)
            });
          }
        } else {
          result.push(object[item]);
        }
      });

    }
  }

  return result;
}

export default at
