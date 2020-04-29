/**
 * @module Normalize
 * @description Utils for normalizing date
 * @author KenySushant
 */

/**
  * @param {String} date Date in form of String
  * @description Normalize the date by removing extra characters
  * @returns {String} in YYYY-MM-DD format
  * @example
  * const date = '2020-04-22T18:33:37+00:00';
  * const normalizedDate = date.normalize.toYYYYMMDD(date);
  *
  * console.log(normalizedDate); // '2020-04-22';
  */
const toYYYYMMDD = (date) => date.substr(0, date.indexOf('T'));

module.exports = {
  toYYYYMMDD,
};
