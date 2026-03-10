import { defineConfig } from '@kubb/core';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginTs } from '@kubb/plugin-ts';
import { pluginTanstackQuery } from '@kubb/plugin-tanstack-query';
import { reactPlugin } from '@kubb/react';

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
    pluginOas({}),
    pluginTs({
      output: {
        path: 'types',
      },
    }),
    reactPlugin,
    pluginTanstackQuery({
      framework: 'react',
      output: {
        path: 'hooks',
      },
    }),
  ],
});
