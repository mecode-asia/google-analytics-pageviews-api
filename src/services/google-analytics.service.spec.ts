import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { IRunReportResponse } from '../typings';
import { GoogleAnalyticsService } from './google-analytics.service';

describe('GoogleAnalyticsService', () => {
  beforeAll(() => {
    jest.mock('@google-analytics/data');
  });

  it('can combine view counts of matching pathnames and return correct view counts', async () => {
    jest
      .spyOn(BetaAnalyticsDataClient.prototype, 'runReport')
      .mockImplementation(({}) => [
        {
          rows: [
            {
              dimensionValues: [{ value: '/articles/hungry-birds' }],
              metricValues: [{ value: '10' }],
            },
            {
              dimensionValues: [{ value: '/articles/hungry-birds/' }],
              metricValues: [{ value: '8' }],
            },
          ],
        } as IRunReportResponse,
      ]);

    const gaService = new GoogleAnalyticsService('123456789');

    const pageviews = await gaService.getPageviews('/articles/hungry-birds');

    expect(pageviews.pagePath).toBe('/articles/hungry-birds');
    expect(pageviews.viewCount).toBe(18);
  });
});
