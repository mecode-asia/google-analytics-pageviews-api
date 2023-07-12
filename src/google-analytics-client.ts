import path from 'path';
import { GoogleAnalyticsLogger } from './loggers';
import { GoogleAnalyticsService, ConfigService } from './services';

export class GoogleAnalyticsClient {
  private configService: ConfigService;
  private gaService: GoogleAnalyticsService;
  private gaLogger: GoogleAnalyticsLogger;
  constructor(gaPropertyID: string = '', credentialsPath: string = '') {
    this.gaLogger = new GoogleAnalyticsLogger();

    this.configService = new ConfigService(
      { gaPropertyID, credentialsPath },
      this.gaLogger,
    );
    this.gaService = new GoogleAnalyticsService(
      this.configService,
      this.gaLogger,
    );
  }

  async getPageviews(pathname: string) {
    return await this.gaService.getPageviewsFromPagePath(pathname);
  }
}
