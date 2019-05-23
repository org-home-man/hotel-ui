import Vue from 'vue'
import App from './App'
import router from './router'
import api from './http'
import i18n from './i18n'
import store from './store'
import global from '@/utils/global'
import { getTypeValue,resolveRoomTypeName } from "@/utils/dictType"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/iconfont/iconfont.css'

Vue.use(ElementUI);
Vue.use(api);

Vue.config.devtools = true
Vue.prototype.global = global;
Vue.prototype.getTypeValue = getTypeValue;
Vue.prototype.resolveRoomTypeName = resolveRoomTypeName;

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
});
