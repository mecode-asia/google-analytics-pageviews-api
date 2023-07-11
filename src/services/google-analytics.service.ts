import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { GoogleAnalyticsLogger } from '@src/loggers';
import { FilterMatchType } from '@src/typings/filters';
import { PageviewsDto } from '../typings';

export class GoogleAnalyticsService {
  private gaLogger: GoogleAnalyticsLogger;
  constructor() {
    this.gaLogger = new GoogleAnalyticsLogger();
  }

  async getPageviews(pathname: string = ''): Promise<PageviewsDto> {
    const gaPropertyId = process.env.GA_PROPERTY_ID;
    const analyticsDataClient = new BetaAnalyticsDataClient();

    const property = `properties/${gaPropertyId}`;
    const dateRanges = [{ startDate: '2020-01-01', endDate: 'today' }];
    const dimensions = [{ name: 'pagePath' }];
    const metrics = [{ name: 'screenPageViews' }];
    const pagePathMatchFilter = {
      filter: {
        fieldName: 'pagePath',
        stringFilter: {
          matchType: FilterMatchType.BEGINS_WITH,
          value: pathname,
          caseSensitive: false,
        },
      },
    };

    const [response] = await analyticsDataClient.runReport({
      property,
      dateRanges,
      dimensions,
      metrics,
      dimensionFilter: {
        orGroup: {
          expressions: [pagePathMatchFilter],
        },
      },
    });

    this.gaLogger.logPageviews(response);
    const totalPageviewsDto: PageviewsDto = response.rows.reduce(
      (prev, row) => {
        prev.viewCount += parseInt(row?.metricValues[0]?.value) || 0;
        return prev;
      },
      { pagePath: pathname, viewCount: 0 },
    );
    return totalPageviewsDto;
  }
}
