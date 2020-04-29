/**
 * @module Range
 * @description Get dates in different range
 * @author KenySushant
 */
const moment = require('moment');
const normalize = require('./normalize');
const convert = require('./convert');

/**
 * @param {Date} date Date of the month
 * @description Returns the range of dates in MM/DD/YYYY format
 * @returns {Array} Range of dates in MM/DD/YYYY format
 * @example
 * const range = date.range.ofMonth('04/22/2020');
 * console.log(range); // ['04/01/2020', '04/02/2020', '04/03/2020', .....]
 */
const ofMonth = (date) => {
  const startDate = moment(new Date(date)).startOf('month');
  const endDate = moment(new Date(date)).endOf('month');

  const start = new Date(startDate).getDate();
  const end = new Date(endDate).getDate();

  const counterDate = new Date(startDate);
  const range = [];

  for (let i = start; i <= end; i += 1) {
    counterDate.setDate(new Date(startDate).getDate() + i);
    const normalizedDate = normalize.toYYYYMMDD(moment(counterDate).toISOString());
    range.push(convert.toMMDDYYYY(normalizedDate));
  }
  return range;
};

module.exports = { ofMonth };
