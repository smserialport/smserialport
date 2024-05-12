import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  server: {
    hmr: {
      overlay: false
    }
  },
  plugins: [
    UnoCSS(),
    Components({
      dirs: ['.vitepress/theme/components'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
    })
  ]
})
