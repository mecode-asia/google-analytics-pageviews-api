import { GoogleAnalyticsLogger } from '../loggers/google-analytics.logger';
import path from 'path';
import { EnvError, GoogleAnalyticsConfig } from '../typings';
import { existsSync } from 'fs';

export class ConfigService {
  constructor(
    public config: GoogleAnalyticsConfig,
    private gaLogger: GoogleAnalyticsLogger,
  ) {
    if (!config.gaPropertyID) {
      this.gaLogger.logEnvError(EnvError.MISSING_PROPERTY_ID);
    }

    if (!config.credentialsPath) {
      this.gaLogger.logEnvError(EnvError.MISSING_CREDENTIALS_PATH);
    } else if (!existsSync(config.credentialsPath)) {
      this.gaLogger.logEnvError(EnvError.INCORRECT_CREDENTIALS_PATH);
    }

    process.env['GOOGLE_APPLICATION_CREDENTIALS'] = path.resolve(
      this.config.credentialsPath,
    );
  }
}
