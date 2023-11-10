import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-ssg-sitemap'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { VitePWA } from 'vite-plugin-pwa'
import VueDevTools from 'vite-plugin-vue-devtools'
import LinkAttributes from 'markdown-it-link-attributes'
import Unocss from 'unocss/vite'
import Shiki from 'markdown-it-shikiji'
import WebfontDownload from 'vite-plugin-webfont-dl'

export default ({ mode }: any) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
    VITE_MODE: mode,
  }

  return defineConfig({
    base: process.env.VITE_BASE,
    define: {
      'process.env': {},
    },
    server: {
      host: '0.0.0.0',
      port: Number.parseInt((process.env.VITE_DEV_PORT as string) || '3333', 10),
      proxy: {
        [process.env.VITE_API_BASE as string]: {
          target: process.env.VITE_DEV_PROXY_TARGET,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${process.env.VITE_API_BASE}`), ''),
        },
      },
    },

    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [
      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/],
          }),
        },
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ['vue', 'md'],
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          '@vueuse/head',
          '@vueuse/core',
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/constants',
        ],
        vueTemplate: true,
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/components.d.ts',
      }),

      // https://github.com/antfu/unocss
      // see uno.config.ts for config
      Unocss(),

      // https://github.com/unplugin/unplugin-vue-markdown
      // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
      Markdown({
        wrapperClasses: 'prose prose-sm m-auto text-left',
        headEnabled: true,
        async markdownItSetup(md) {
          md.use(LinkAttributes, {
            matcher: (link: string) => /^https?:\/\//.test(link),
            attrs: {
              target: '_blank',
              rel: 'noopener',
            },
          })
          md.use(await Shiki({
            defaultColor: false,
            themes: {
              light: 'vitesse-light',
              dark: 'vitesse-dark',
            },
          }))
        },
      }),

      // https://github.com/antfu/vite-plugin-pwa
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [process.env.VITE_APP_LOGO as string],
        manifest: {
          name: process.env.VITE_APP_NAME,
          theme_color: '#ffffff',
          icons: [
            {
              src: process.env.VITE_APP_LOGO as string,
            },
          ],
        },
      }),

      // https://github.com/feat-agency/vite-plugin-webfont-dl
      WebfontDownload(),

      // https://github.com/webfansplz/vite-plugin-vue-devtools
      VueDevTools(),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
      deps: {
        inline: ['@vue', '@vueuse', 'vue-demi'],
      },
    },

    // https://github.com/antfu/vite-ssg
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      crittersOptions: {
        reduceInlineStyles: false,
      },
      onFinished() {
        generateSitemap()
      },
    },

    ssr: {
      // TODO: workaround until they support native ESM
      noExternal: ['workbox-window'],
    },
  })
}
