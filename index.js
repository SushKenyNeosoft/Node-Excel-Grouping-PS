/**
 * @module Index
 * @description Group the data and export it to excel sheet
 * @author KenySushant
 */
const fs = require('fs');
const path = require('path');
const parser = require('parse-json');
const xlsx = require('xlsx');

const format = require('./lib/format');

async function main() {
  const rawData = await fs.promises.readFile(path.join(__dirname, 'data.txt'), 'utf-8');
  const organizations = parser(rawData);
  const submissions = format.toOrganizationsToCalculateMonitorUsageSync(organizations);
  console.log(submissions);

  // Add data to spreadsheet
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(submissions);
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Submissions');

  // Write to file
  // Streaming is another option if the date grows bigger
  xlsx.writeFile(workbook, 'Monitors.xlsx');
}

main().then(() => { }).catch((error) => console.error(error));
