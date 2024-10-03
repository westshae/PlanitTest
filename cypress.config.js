const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://jupiter.cloud.planittesting.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
    },
    specPattern: 'src/*.js',
    supportFile: false,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});
