import {  ViteSSG} from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts} from 'virtual:generated-layouts'
import App from './App.vue'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import './styles/main.css'
import { createApp} from "vue";
import Protium from "@protium/protium";
import "@protium/protium/dist/protium.css";
import "@protium/protium/dist/protium-full-vars.css";
import FontAwesomeIcon from "./config/icons"
import { createPinia } from 'pinia'




const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
    App, {
        routes,
        //base: 'dist',
    },
    (ctx) => {
        // install all modules under `modules/`
        ctx.app.component("vue-fontawesome", FontAwesomeIcon)
        ctx.app.use(
            Protium,
            {
                iconComponent: "vue-fontawesome",
                iconPack: "fas",
            }
        )
        ctx.app.use(createPinia())
        Object.values(
            import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))
    },
)