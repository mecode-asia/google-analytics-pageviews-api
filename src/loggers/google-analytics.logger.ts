import { EnvError, IRunReportResponse } from '../typings';
import clc from 'cli-color';

export class GoogleAnalyticsLogger {
  constructor() {}

  async warn(...text: unknown[]) {
    console.warn(clc.yellow('WARNING:', text));
  }

  async info(...text: unknown[]) {
    console.info(clc.blue(text));
  }

  async logEnvError(envError: EnvError) {
    switch (envError) {
      case EnvError.MISSING_PROPERTY_ID:
        this.warn(
          'Google Analytics Property ID is missing! Please input the ID when instantiating the GoogleAnalyticsClient.',
        );
        break;
      case EnvError.MISSING_CREDENTIALS_PATH:
        this.warn(
          'Path to service account credentials file is missing! Please input the path when instantiating the GoogleAnalyticsClient.',
        );
        break;
      case EnvError.INCORRECT_CREDENTIALS_PATH:
        this.warn(
          'Path to service account credentials file is incorrect! Please input the correct path when instantiating the GoogleAnalyticsClient.',
        );
        break;
      default:
        this.warn(
          'There is an error due to misconfiguration of GA Pageviews API.',
        );
    }
  }

  async logPageviews(report: IRunReportResponse) {
    this.info('Report result:');
    report.rows.forEach((row) => {
      this.info(
        `${row.dimensionValues[0].value} => ${row.metricValues[0].value}`,
      );
    });
  }
}
