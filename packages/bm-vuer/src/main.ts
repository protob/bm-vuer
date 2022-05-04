import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import './styles/main.css'
import { createApp } from 'vue'
import Protium from '@protob/protium'
import '@protob/protium/dist/protium.css'
import '@protob/protium/dist/protium-full-vars.css'
import { createPinia } from 'pinia'
import FontAwesomeIcon from './config/icons'
import App from './App.vue'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App, {
    routes,
    // base: 'dist',
  },
  (ctx) => {
    // install all modules under `modules/`
    ctx.app.component('vue-fontawesome', FontAwesomeIcon)
    ctx.app.use(
      Protium,
      {
        iconComponent: 'vue-fontawesome',
        iconPack: 'fas',
      },
    )
    ctx.app.use(createPinia())
    Object.values(
      import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))
  },
)
