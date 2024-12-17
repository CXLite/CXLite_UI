import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import esbuild from 'rollup-plugin-esbuild'

export default defineConfig({
  base: './', // 确保使用相对路径
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11', 'chrome >= 52'], // 使用正确的浏览器查询
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向旧版浏览器时需要的插件
    }),
    esbuild({
      target: ['chrome52', 'chrome64'], // 替换成你想要的谷歌内核版本
      loaders: {
        '.vue': 'js',
        '.ts': 'js'
      }
    })
  ]
})