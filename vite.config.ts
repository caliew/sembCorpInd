import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import WebpackShellPlugin from 'webpack-shell-plugin';
// https://vitejs.dev/config/
export default defineConfig({
  server : {
    port : 3000,
    host : '0.0.0.0'
  },
  plugins: [
    react()
  ]
})
