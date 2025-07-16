import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({command, mode}) =>{
let env = loadEnv(mode, process.cwd())
return {
plugins: [
vue(),
vueDevTools(),
AutoImport({
    resolvers: [ElementPlusResolver({importStyle : "false"})],
}),
Components({
    resolvers: [ElementPlusResolver({ importStyle: "false" })],
}),
],
resolve: {
    alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
    },
},
css: {
    preprocessorOptions: {
    scss: {
        additionalData: `@use "@/assets/style/variables.scss" as *;`
    },
    },
},
server: {
    proxy: {
    '/v2': {
        target: 'https://ec-course-api.hexschool.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v2/, '/v2'),
    },
    },
},
    base: command === 'serve' ? '/' : '/if-jewelry-vue/',
}
})
