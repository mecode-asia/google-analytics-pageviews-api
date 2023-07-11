import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { IRunReportResponse } from './typings';
import { GoogleAnalyticsClient } from './google-analytics-client';

describe('GoogleAnalyticsClient', () => {
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

    const gaClient = new GoogleAnalyticsClient(
      '123456789',
      './credentials.json',
    );

    const pageviews = await gaClient.getPageviews('/articles/hungry-birds');

    expect(pageviews.pagePath).toBe('/articles/hungry-birds');
    expect(pageviews.viewCount).toBe(18);
  });
});
