/**
 * @module FormatOrganizationsToCalculateMonitorUsage
 * @description Format the organizations dataset so that it will calculate the monitor usage by date
 * @author KenySushant
 */
const {
  Worker, isMainThread, parentPort, workerData,
} = require('worker_threads');

const date = require('../date');

if (isMainThread) {
  /**
   * Format Organizations To CalculateMonitorUsage
   * @param {Array} organizations Organizations
   * @description Convert organizations dataset in the form of array of objects
   * @returns {Array} Array of objects; where object has properties Organization Name,
   * No. Of Monitorsand No. of Submissions by date
   */
  module.exports = function toOrganizationsToCalculateMonitorUsage(organizations) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: organizations,
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  };
} else {
  const organizations = workerData;
  const submissions = [];
  const rangeOfDates = date.range.ofMonth('04/01/2020'); // This can be changed depending on the logic

  // Iterate through the Organizations
  for (let i = 0; i < organizations.length; i += 1) {
    const submission = {
      'Organization Name': organizations[i].name,
      'No. Of Monitors': 0,
    };

    for (let x = 0; x < rangeOfDates.length; x += 1) {
      if (!Object.prototype.hasOwnProperty.call(submission, rangeOfDates[x])) {
        submission[rangeOfDates[x]] = 0;
      }
    }

    // Iterate through the Users
    for (let j = 0; j < organizations[i].Users.length; j += 1) {
      // Sum the number of Monitors of j-th User
      submission['No. Of Monitors'] += organizations[i].Users[j].Monitors.length;

      // Iterate through the Monitors
      for (let k = 0; k < organizations[i].Users[j].Monitors.length; k += 1) {
        // Iterate through the OAuthMonitorTokens
        for (
          let l = 0;
          l < organizations[i].Users[j].Monitors[k].OauthMonitorTokens.length;
          l += 1
        ) {
          // Save raw OAuth Data in a seperate variable for readability
          const rawOAuthData = organizations[i]
            .Users[j]
            .Monitors[k]
            .OauthMonitorTokens[l]
            .oauth_data;

          // Parse the raw OAuth Data
          const oAuthData = JSON.parse(rawOAuthData);

          /**
           * Iterate through the keys of OAuth Data as it's an Object and
           * it's assumed that it could have multiple keys
           */
          /* eslint-disable */
          Object.keys(oAuthData).forEach((key) => {
            if (Array.isArray(oAuthData[key])) {
              oAuthData[key].forEach((x) => {
                if (x.endDate) {
                  /**
                   * If submission has the property/key of the date then create one and
                   * initialize it to 0 else add 1 to its previous value
                   */
                  const endDate = date.convert.toMMDDYYYY(date.normalize.toYYYYMMDD(x.endDate));
                  if (!Object.prototype.hasOwnProperty.call(submission, endDate)) {
                    submission[endDate] = 1;
                  } else {
                    submission[endDate] += 1;
                  }
                }
              });
            }
          });
          /* eslint-enable */
        }
      }
    }
    submissions.push(submission);
  }
  parentPort.postMessage(submissions);
}
