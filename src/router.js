import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home/home2.vue";
Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {// 测试
      path: "/test",
      meta:{index:1},
      component: () => import("./views/home/home1.vue")
    },
    { path: '*', component: Home, meta:{index:1}},
    {
      path: "/",
      meta:{index:5,title:"首页"},
      component: Home
    },






    // ======= 基本模版 =======
    // {// 案例列表
    //   path: "/caselist",
    //   meta:{index:6},
    //   component: () => import("./views/lists/caselist.vue")
    // },
    // {// 关于我们
    //   path: "/about",
    //   meta:{index:11,login:true},
    //   component: () => import("./views/about/about.vue")
    // },    
    // {// 文章页面
    //   path: "/article",
    //   meta:{index:20},
    //   component: () => import("./views/article/article.vue")
    // },
    // {// 用户中心
    //   path: "/usercenter",
    //   meta:{index:8},
    //   component: () => import("./views/usercenter/usercenter.vue")
    // },
    

    // ======= 工具类 =======
    
    // {// 手机修改
    //   path: "/changephone",
    //   meta:{index:20, login:true},
    //   component: () => import("./views/change_info/change_phone.vue")
    // },
    // {// 登录
    //   path: "/login",
    //   meta:{index:1},
    //   component: () => import("./views/login/login.vue")
    // },
    // {// 注册
    //   path: "/register",
    //   meta:{index:2},
    //   component: () => import("./views/register/register.vue")
    // },
    // {// 找回密码
    //   path: "/findPassword",
    //   meta:{index:2},
    //   component: () => import("./views/register/forget_password.vue")
    // },

    
    // ======= 商城类 =======
    
    // {// 商品详情
    //   path: "/goodsdetaile",
    //   meta:{index:15},
    //   component: () => import("./views/shop/goods_detaile.vue")
    // },
    // {// 购物车
    //   path: "/goodscart",
    //   meta:{index:7},
    //   component: () => import("./views/shop/shop_goodscart.vue")
    // },
    // {// 订单列表
    //   path: "/orderlist",
    //   meta:{index:18, login:true},
    //   component: () => import("./views/shop/order_list.vue")
    // },
    // {// 物流信息
    //   path: "/wuliu",
    //   meta:{index:20, login:true},
    //   component: () => import("./views/shop/wuliu.vue")
    // },

    // ======= 特殊类 =======
    {// 报名
      path: "/apply",
      meta:{index:12,title:"我要报名"},
      component: () => import("./views/login/login2.vue")
    },
    {// 排行榜
      path: "/ranking",
      meta:{index:13,title:"排行榜"},
      component: () => import("@/components/ranking/ranking.vue")
    },
    {// 投票详情
      path: "/votedetail",
      meta:{index:11,title:"商家详情"},
      component: () => import("@/views/prodetaile/prodetaile.vue")
    },
    {// 奖品详情
      path: "/jiangpin",
      meta:{index:24,title:"奖品"},
      component: () => import("@/views/jiangping/jiangping.vue")
    },
    {// 活动详情
      path: "/huodong",
      meta:{index:24,title:"活动"},
      component: () => import("@/views/jiangping/huodong.vue")
    },
    // {// 充值详情
    //   path: "/chongzhi",
    //   meta:{index:24,title:"打赏"},
    //   component: () => import("@/components/k_chongzhi/k_chongzhi.vue")
    // },
  ]
});
