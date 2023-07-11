import { IRunReportResponse } from '@src/typings';
import Logger from 'js-logger';

export class GoogleAnalyticsLogger {
  constructor() {}

  async logPageviews(report: IRunReportResponse) {
    Logger.info('Report result:');
    report.rows.forEach((row) => {
      Logger.info(row.dimensionValues[0], row.metricValues[0]);
    });
  }
}
