import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['full', 'w-full h-full'],
    ['flex-center', 'flex items-center justify-center'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({}),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose m-auto text-left'.split(' '),
  theme: {
    colors: {
      primary: {
        1: '#406E52',
        2: '#415248',
        3: '#A5B675',
      },
      grey: {
        1: '#FFFFFF',
        2: '#F7F7F8',
        3: '#E4E5EB',
        4: '#636369',
        5: '#12161E',
      },
      gray: {
        1: '#FFFFFF',
        2: '#F7F7F8',
        3: '#E4E5EB',
        4: '#636369',
        5: '#12161E',
      },
      transparency: {
        1: 'rgba(255,255,255,0.2)',
      },
    },
    breakpoints: {
      xs: '500px',
      sm: '760px',
      lg: '900px',
      xl: '1360px',
    },
  },
})
