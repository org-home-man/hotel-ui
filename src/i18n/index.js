import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

let l = 'zh_cn'
let locale = sessionStorage.getItem('locale');
if(null!==locale && l!==locale){
    l = locale;
}

// 注册i18n实例并引入语言文件，文件格式等下解析
const i18n = new VueI18n({
  locale: l,
  messages: {
    'zh_cn': require('@/assets/languages/zh_cn.json'),
    'en_us': require('@/assets/languages/en_us.json')
  }
})

export default i18n
