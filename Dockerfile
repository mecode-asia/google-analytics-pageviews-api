FROM maven:3.8.1-openjdk-16-slim AS maven

COPY src /app/src
COPY pom.xml /app

WORKDIR /app

ARG SPRING_APP_NAME
ARG GA_VIEW_ID
ARG GA_PRIVATE_KEY

ENV SPRING_APP_NAME=${SPRING_APP_NAME}
ENV GA_VIEW_ID=${GA_VIEW_ID}
ENV GA_PRIVATE_KEY=${GA_PRIVATE_KEY}

RUN mvn clean package


FROM tomcat:9.0-jdk16-openjdk-slim

ARG SPRING_APP_NAME
ARG GA_VIEW_ID
ARG GA_PRIVATE_KEY

ENV SPRING_APP_NAME=${SPRING_APP_NAME}
ENV GA_VIEW_ID=${GA_VIEW_ID}
ENV GA_PRIVATE_KEY=${GA_PRIVATE_KEY}

COPY --from=maven /app/target/google_analytics_pageviews_api.war /usr/local/tomcat/webapps/google_analytics_pageviews_api.war

EXPOSE 8080

CMD ["catalina.sh", "run"]
