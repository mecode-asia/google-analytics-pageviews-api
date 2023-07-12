import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { GoogleAnalyticsLogger } from '../loggers/google-analytics.logger';

import { FilterMatchType } from '../typings/filters';
import { PageviewsDto } from '../typings';
import { ConfigService } from './config.service';

export class GoogleAnalyticsService {
  private analyticsDataClient;
  private configService: ConfigService;
  constructor(
    configService: ConfigService,
    private gaLogger: GoogleAnalyticsLogger,
  ) {
    this.configService = configService;
    this.analyticsDataClient = new BetaAnalyticsDataClient();
  }

  async getPageviewsFromPagePath(pathname: string = ''): Promise<PageviewsDto> {
    const { gaPropertyID } = this.configService.config;
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

    const [response] = await this.analyticsDataClient.runReport({
      property: `properties/${gaPropertyID}`,
      dateRanges: [{ startDate: '2020-01-01', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      dimensionFilter: pagePathMatchFilter,
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
