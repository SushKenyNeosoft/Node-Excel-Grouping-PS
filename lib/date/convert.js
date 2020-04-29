/**
 * @module Convert
 * @description Date converter
 * @author KenySushant
 */

/**
 * Format Date to mm/dd/yyyy format
 *
 * @param {Date} date Date to be formatted
 * @description Format the given date to mm/dd/yyyy format
 * @example
 * const date = new Date(); // 2020-04-28T09:45:24.283Z
 * const formattedDate = formatDate(date);
 *
 * console.log(formattedDate); // 04/28/2020
 */
const toMMDDYYYY = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : `0${month}`;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : `0${day}`;

  return `${month}/${day}/${year}`;
};

module.exports = {
  toMMDDYYYY,
};
