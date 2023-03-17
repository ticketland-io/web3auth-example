import {defineConfig} from 'vite'
import nodePolyfills from 'vite-plugin-node-stdlib-browser';
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  sourcemap: false,
  server: {
    hmr: true
  },
  plugins: [
    nodePolyfills(),
    // basicSsl(),
    react(),
    EnvironmentPlugin('all'),
  ],
})
