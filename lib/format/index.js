/**
 * @module Index
 * @description Index of Format library
 * @author KenySushant
 */
const toOrganizationsToCalculateMonitorUsage = require('./format_organizations_to_calculate_monitor_usage');
const toOrganizationsToCalculateMonitorUsageSync = require('./format_organizations_to_calculate_monitor_usage_sync');

module.exports = {
  toOrganizationsToCalculateMonitorUsage,
  toOrganizationsToCalculateMonitorUsageSync,
};
