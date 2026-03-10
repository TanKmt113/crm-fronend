import { defineConfig } from '@kubb/core';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginTs } from '@kubb/plugin-ts';
import { pluginClient } from '@kubb/plugin-client';
import { pluginTanstackQuery } from '@kubb/plugin-tanstack-query';

export default defineConfig({
  root: '.',
  input: {
    path: './swagger.json',
  },
  output: {
    path: './lib/api/generated',
    clean: true,
  },
  plugins: [
    pluginOas({
      validate: false,
    }),
    pluginTs({
      output: {
        path: './types',
      },
      group: {
        type: 'tag',
      },
    }),
    pluginClient({
      output: {
        path: './clients',
      },
      group: {
        type: 'tag',
      },
      dataReturnType: 'data',
      pathParamsType: 'object',
      importPath: '@/lib/axios-client',
    }),
    pluginTanstackQuery({
      output: {
        path: './hooks',
      },
      group: {
        type: 'tag',
      },
      client: {
        importPath: '@/lib/api-client',
      },
    }),
  ],
});
