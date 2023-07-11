import { IRunReportResponse } from '../typings';

export class GoogleAnalyticsLogger {
  constructor() {}

  async logPageviews(report: IRunReportResponse) {
    console.info('Report result:');
    report.rows.forEach((row) => {
      console.info(row.dimensionValues[0], row.metricValues[0]);
    });
  }
}
