import path from "path";
import {defineConfig, splitVendorChunkPlugin} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

// export default defineConfig({
//   plugins: [react()],
//   server:{
//     host:'127.0.0.1'
//   }
// })


export default defineConfig({

  //un-comment for Production debugging
  // build: {
  //   emptyOutDir: true,
  //   manifest: true,
  //   minify: false,
  //   sourcemap: true,
  //   ssr: false,
  // },

  resolve: {
    alias: {
      '@': path.resolve('./src')
    },

  },
  plugins: [react(),  splitVendorChunkPlugin()],
    server:{
    host:'127.0.0.1'
  },

});
