/**
 * This method is like `clone` except that it recursively clones `value`.
 * Object inheritance is preserved.
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see clone
 * @example
 *
 * const objects = [{ 'a': 1 }, { 'b': 2 }]
 *
 * const deep = cloneDeep(objects)
 * console.log(deep[0] === objects[0])
 * // => false
 */
function cloneDeep(value) {
  if (value === null || typeof value !== 'object' || value instanceof Date) {
    return value
  } else if (value instanceof Array) {
    return value.map((elem) => cloneDeep(elem))
  } else if (value instanceof Object) {
    const copy = {}
    for (const prop in value) {
      copy[prop] = cloneDeep(value[prop])
    }
    return copy
  }
}

export default cloneDeep
