## Google Analytics Pageviews API
An API for requesting number of visits on each page from Google Analytics Reporting API v4

## Purpose
This project is created to remove needs of creating Google Analytics API for each individual project.
The structure of this project is referenced from [Konthong Web App](https://github.com/mecode-asia/konthong-web-app)

## Prerequisites
- [OpenJDK 16](https://jdk.java.net/16/)
- [Spring Boot 2.5.2](https://spring.io/projects/spring-boot)
- [Apache Maven 3.8.1](https://maven.apache.org/download.cgi)
- [Apache Tomcat 9](https://tomcat.apache.org/download-90.cgi)

## Features
- Connect to Google Analytics Reporting API using View ID and Service Account provided in Environment Variable

## Installation
1. Install Maven and OpenJDK 16
2. To create war package to be deployed, define environment variable in the following template
```
SPRING_APP_NAME=Google Analytics Reporting
GA_VIEW_ID=123456789 # Google Analytics View ID
GA_PRIVATE_KEY={"example":{"json":"file"}} # Google Analytics Service Account Private Key
```
3. run ` mvn clean package ` for Linux and `./mvnw clean package` for Windows
4. To deploy the package in Apache Tomcat, setup Apache Tomcat Version 9.0.48
5. Define environment variable in tomcat/conf/catalina.properties in the same template
```
SPRING_APP_NAME=Google Analytics Reporting
GA_VIEW_ID=123456789 # Google Analytics View ID
GA_PRIVATE_KEY={"example":{"json":"file"}} # Google Analytics Service Account Private Key
```
6. Copy war package from folder "target" created by running `mvn clean package` from step 2 to tomcat/webapps/
7. Run Tomcat by running catalina.sh in tomcat/bin/ `./tomcat/bin/catalina.sh start`

## API Reference

This API has single endpoint: 
- /api/pageviews
  - Parameters
    - pathname: used to request pageviews of that pathname
  - Response
    - Code 200: Return pathname along with pageviews in the following formats
      - {"pagePath":"/some/path/name","viewCount":12345}
  - Example with Axios
    ```
    const instance = axios.create({
      baseURL: 'http://localhost:8080/google_analytics_pageviews_api',
    }); 
    axios.get('/api/pageviews?pathname=/articles/how-to-use-api');
    //Response: {"pagePath":"/articles/how-to-use-api","viewCount":98765}
    ```


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


## How to use?
- Deploy the war package in /webapps folder of Apache Tomcat
- Call pageviews endpoint with base URL of http://localhost:8080/google_analytics_pageviews_api/ when using tomcat

## License
Copyright (c) 2021 MeCode
