/**
 * @module Find
 * @description Find date utilities
 * @author KenySushant
 */

/**
 * @param {Array} array Containing Date
 * @description Returns a date found in the array
 * @returns {String} Date otherwise returns null
 * @example
 * const array = ['foo', 'xoo', '04/20/2020'];
 * const date = date.find.firstDateFromArray(array); // 04/20/2020
 */
const firstDateFromArray = (array) => {
  const date = array.find((e) => { // eslint-disable-line
    if (new Date(e) !== 'Invalid Date') {
      return true;
    }
    return false;
  });
  return date || null;
};

module.exports = { firstDateFromArray };
