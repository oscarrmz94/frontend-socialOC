import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VuejsDialog from 'vuejs-dialog';
//import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import VueToastify from "vue-toastify";
// include the default style

// Tell Vue to install the plugin.
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VuejsDialog);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueToastify);
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
