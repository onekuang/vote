import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import store from "./store/index";


import { l_storage } from './common/js/storage.js'
// l_storage.set('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJYQ29yZSBKV1QiLCJpYXQiOjE1NDE0MDMwNzcsImV4cCI6MzA4MjgwNjE1NCwiYXVkIjoiWENvcmUiLCJzdWIiOiJYQ29yZSIsImRhdGEiOnsidXNlcmlkIjozLCJvcGVuaWQiOiJvVlowbDV6enZvSWxwX2pJWEhtbDdYN0drQlBnIn19.vA5hiK9vmN-yEdTkcl5q6zDd0ynwC93XEHQm7I3ZOXE#/votedetail')
function getUrlKey(name){
  return decodeURIComponent((
    new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)')
    .exec(location.href)||[,""])[1]
    .replace(/\+/g,'%20'))||null;
}

let voteid = getUrlKey("voteid")
console.log("活动id:" + voteid)
if(voteid) {
  l_storage.set('voteid',voteid)
}else{
  if(!l_storage.get('voteid')) {
    l_storage.set('voteid',1)
  }
}
// l_storage.set('voteid',voteid)
// console.log(l_storage.get('voteid'))
// console.log(!l_storage.get('voteid'))
// if(!l_storage.get('voteid')) {
//   l_storage.set('voteid',1)
// }

// let userid = l_storage.get('openid')

// # 创建一个axios实例
var axios_instance = axios.create({
// # config里面有这个transformRquest，这个选项会在发送参数前进行处理。
// # 通过Qs.stringify转换为表单查询参数
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
// # 设置Content-Type
    headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
    params: {
      access_token: 'a1af2efa8004ceb4710867a14684b838',
      voteid: l_storage.get('voteid')
    },
})

Vue.use(VueAxios, axios_instance)

// 引入字体
import "./assets/fonts/iconfont.css";

// 引入ui
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";

Vue.use(MuseUI);

// 弹窗组件
import { Alert, Confirm, Toast, Loading} from "wc-messagebox";
import "wc-messagebox/style.css";
Vue.use(Alert, {});
Vue.use(Confirm, {});
Vue.use(Toast);
Vue.use(Loading);

// 引入 c-swipe 轮播
import "c-swipe/dist/swipe.css";
import { Swipe, SwipeItem } from "c-swipe";
// 全局注册 c-swipe 轮播组件
Vue.component("swipe", Swipe);
Vue.component("swipe-item", SwipeItem);

// 引入holder 图片占位
import VueHolder from 'vue-holderjs';
Vue.use(VueHolder);

// 浏览器标题
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

// api
import api from './assets/api/api.js'
Vue.prototype.$api = api

// 微信SDK
import wechat from 'weixin-js-sdk'
Vue.prototype.$wx = wechat;



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
