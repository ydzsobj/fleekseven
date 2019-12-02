import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'
import zh from './lang/zh';
import en from './lang/en';
import ind from './lang/indone';


import {Picker, Dialog , Progress , Tag, Sku, NoticeBar, Popup,Rate ,Overlay, Area ,Sidebar, SidebarItem , Loading , RadioGroup, Radio , Divider , SwipeCell , SubmitBar , Card , Checkbox , CheckboxGroup , Image , Icon , GoodsAction, GoodsActionIcon, GoodsActionButton ,Cell, CellGroup ,Tabbar,TabbarItem,PullRefresh,Stepper,Tab,Tabs,Button, Row, Col, Swipe, SwipeItem , Lazyload ,List ,Field, NavBar } from 'vant'
Vue.use(Picker ).use(Dialog ).use(Progress).use(Tag).use(Sku).use(NoticeBar).use(Popup).use(Rate).use(Overlay).use(Area ).use(Sidebar).use(SidebarItem).use(Loading ).use(RadioGroup).use(Radio).use(Divider).use(SwipeCell).use(SubmitBar).use(Card).use(Checkbox).use(CheckboxGroup).use(Image).use(Icon).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Cell).use(CellGroup).use(Tabbar).use(TabbarItem).use(Stepper).use(PullRefresh).use(Tab).use(Tabs).use(Field).use(NavBar).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List)

Vue.config.productionTip = false


Vue.use(VueI18n) // 通过插件的形式挂载
const i18n = new VueI18n({
  locale: 'ind-BA',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': zh,   // 中文语言包
    'en-US': en,    // 英文语言包
    'ind-BA': ind,    // 印尼语言包
    'en-PHP': en    // 菲律宾语言包
  }
})


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
