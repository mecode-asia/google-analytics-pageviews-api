import path from 'path';
import { GoogleAnalyticsService } from './services';

export class GoogleAnalyticsClient {
  private gaService: GoogleAnalyticsService;
  constructor(private gaPropertyID: string, private credentialsPath: string) {
    this.gaService = new GoogleAnalyticsService(this.gaPropertyID);
    process.env['GOOGLE_APPLICATION_CREDENTIALS'] = path.resolve(
      this.credentialsPath,
    );
  }

  async getPageviews(pathname: string) {
    return await this.gaService.getPageviewsFromPagePath(pathname);
  }
}
