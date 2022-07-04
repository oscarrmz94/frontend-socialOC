import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Vue from 'vue'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
