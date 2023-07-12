## Google Analytics API
An API for running core Google Analytics Report from Google Analytics Data API for GA4

## Purpose
This project is created to remove needs of creating Google Analytics API for each individual project.

## Prerequisites
- Node.js

## Features
- Connect to Google Analytics Data API using Property ID and Service Account file path provided upon the instantiation of GoogleAnalyticsClient class

## Installation
- Run the following commands according to your project's npm manager
```
// npm
npm add google-analytics-pageviews-api
// yarn
yarn add google-analytics-pageviews-api
// pnpm
pnpm add google-analytics-pageviews-api
```

## How to use
- Input GA Property ID and Google Service Account File Path as params when instantiating the GoogleAnalyticsClient. (It is advised to set both parameters as ENV variables)
- Access the class method to use the client
```
import { GoogleAnalyticsClient, PageviewsDto } from 'google-analytics-pageviews-api'

const gaPropertyID = '123456789'
const gaCredentialsPath = '/path/to/file'

const gaClient = new GoogleAnalyticsClient(gaPropertyID, gaCredentialsPath)

export async function getPageViews(articleSlug) {
  const pageViewsCount: PageviewsDto = await gaClient.getPageviews(`/articles/${articleSlug}`)
  return pageViewsCount?.viewCount || 0
}
// returned value: {pagePath: provided page path, viewCount: number of page views}
```

## License
Copyright (c) 2023 MeCode
