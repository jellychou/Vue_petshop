import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VeeValidate from 'vee-validate'
import VueI18n from 'vue-i18n'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import MarqueeText from 'vue-marquee-text-component'

import App from './App.vue'
import router from './router'
import store from './store'
import currencyFilter from './filters/Currency'
import './bus'

library.add(fas, fab)
Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('Loading', Loading)
Vue.component('marquee-text', MarqueeText)
Vue.filter('currency', currencyFilter)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log('to', to, 'form', from, 'next', next)
  if (to.meta.requiresAuth) {
    console.log('這裡需要驗證')
    const api = `${process.env.VUE_APP_APIPATH}api/user/check`
    axios.post(api).then(response => {
      console.log(response.data)
      if (response.data.success) {
        next()
      } else {
        alert('請重新登入！')
        next({
          path: '/'
        })
      }
    })
  } else {
    next()
  }
})
