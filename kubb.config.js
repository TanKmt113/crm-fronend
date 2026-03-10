const { defineConfig } = require('@kubb/core');
const { pluginSwagger } = require('@kubb/swagger');
const { pluginSwaggerTs } = require('@kubb/swagger-ts');
const { pluginSwaggerClient } = require('@kubb/swagger-client');
const { pluginSwaggerTanstackQuery } = require('@kubb/swagger-tanstack-query');

module.exports = defineConfig({
  root: '.',
  input: {
    path: './swagger.json',
  },
  output: {
    path: './lib/api/generated',
    clean: true,
  },
  plugins: [
    pluginSwagger({}),
    pluginSwaggerTs({}),
    pluginSwaggerClient({}),
    pluginSwaggerTanstackQuery({
      output: {
        path: './hooks',
      },
      framework: 'react',
    }),
  ],
});
