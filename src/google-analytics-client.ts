import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';

import { GoogleAnalyticsLogger } from './loggers';
import { GoogleAnalyticsService, ConfigService } from './services';

const pageviewsCache = new CacheContainer(new MemoryStorage());

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

  //Cache lives for 6 hours
  @Cache(pageviewsCache, { ttl: 21600000 })
  async getPageviews(pathname: string) {
    return await this.gaService.getPageviewsFromPagePath(pathname);
  }
}
