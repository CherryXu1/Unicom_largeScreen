// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import './utils/flexible'
import './assets/css/reset.styl'
import './assets/css/theme_default.styl'
import qs from "qs";
import { notsize } from './assets/js/nowSize'
import { EleResize } from './assets/js/esresize'
import './assets/font/digifacewide.css'
import axios from '@/apis/axios.js'
import echarts from 'echarts'
import store from '@/store/index'
import 'lib-flexible/flexible'
Vue.config.productionTip = false
Vue.prototype.$qs = qs
Vue.prototype.axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$EleResize = EleResize
Vue.prototype.$notsize = notsize
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})