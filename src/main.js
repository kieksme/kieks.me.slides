import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import { applyAppSetup } from './setup/main'

const app = createApp(App)
applyAppSetup(app)
app.mount('#app')
