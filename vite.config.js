import {defineConfig} from 'vite'
import createExternal from 'vite-plugin-external'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  sourcemap: true,
  plugins: [
    react(),
    EnvironmentPlugin('all'),
    createExternal({
      externals: {
        walletconnect_client: '@walletconnect/client'
      }
    }),
  ],
})
