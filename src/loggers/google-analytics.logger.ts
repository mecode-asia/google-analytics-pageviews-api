import { EnvError, IRunReportResponse } from '../typings';
import Logger from 'js-logger';

export class GoogleAnalyticsLogger {
  constructor() {}

  async logEnvError(envError: EnvError) {
    if (envError === EnvError.MISSING_PROPERTY_ID) {
      Logger.warn(
        'Google Analytics Property ID is missing! Please input the ID when instantiating the GoogleAnalyticsClient.',
      );
    }
    if (envError === EnvError.MISSING_CREDENTIALS_PATH) {
      Logger.warn(
        'Path to service account credentials file is missing! Please input the path when instantiating the GoogleAnalyticsClient.',
      );
    }
  }

  async logPageviews(report: IRunReportResponse) {
    Logger.info('Report result:');
    report.rows.forEach((row) => {
      Logger.info(row.dimensionValues[0], row.metricValues[0]);
    });
  }
}
