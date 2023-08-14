// eslint-disable-next-line import/no-extraneous-dependencies
import sonarqubeScanner from 'sonarqube-scanner';

sonarqubeScanner(
  {
    serverUrl: process.env.SONAR_HOST_URL,
    options: {
      'sonar.projectKey': `${process.env.PROJECT_NAME}:${process.env.APP_NAME}`,
      'sonar.projectName': `${process.env.PROJECT_NAME}/${process.env.APP_NAME}`,
      'sonar.login': `${process.env.SONAR_TOKEN}`,
      'sonar.sources': '.',
      'sonar.exclusions': [
        'node_modules/**/*',
        'migrations/**/*',
        'tests/**/*',
      ].join(','),
      'sonar.javascript.lcov.reportPaths': '.nyc_coverage/lcov.info',
    },
  },
  () => {},
);
