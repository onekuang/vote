<template>
  <div class="usersenter">
    <!-- 用户中心信息卡片 -->
    <UserBox></UserBox>
    
    <!-- 横tab -->
    <k_across_tab :lists=c_across_tab></k_across_tab>
    
    <div class="khr"></div>

    <!-- 宫格 -->
    <Kgrid :lists=c_grid_data ></Kgrid>
    


  </div>
</template>
<script>
import UserBox from "@/components/user_info_box/user_info_box.vue";
import k_across_tab from "@/components/k_across_tab/k_across_tab.vue";
import Kgrid from "@/components/k_grid/k_grid.vue";
export default {
  name: "home",
  data() {
    return {
      dot_num: 2
    };
  },
  created() {
    console.log("usercneter...show..");
  },
  computed: {
    // 横tab -- 组件模版
    c_across_tab() {
      let that = this;
      return [
        {
          id: 1,
          title: "待付款",
          icon: "icon-pay",
          icon_color:"#FF9933",
          dot: true,
          dot_text: this.dot_num,
          fn: that.fff,
        },
        {
          id: 2,
          title: "待发货",
          icon: "icon-send",
          icon_color:"#FF9933",
          url: "/"
        },
        {
          id: 3,
          title: "待收货",
          icon: "icon-deliver",
          icon_color:"#FF9933",
          url: "/"
        },
        {
          id: 4,
          title: "已完成",
          icon: "icon-wodefankui",
          icon_color:"#FF9933",
          url: "/"
        }
      ];
    },
    // 菜单模版 -- 组件模版
    c_grid_data() {
      let that = this;
      return [
        {
          id: 1,
          title: "我的二维码",
          icon: "icon-erweima1688",
          icon_color:"#55b4fe",
          dot: true,
          dot_text: this.dot_num,
          fn: that.fff,
        },
        {
          id: 2,
          title: "我的订单",
          icon: "icon-wodedingdan",
          icon_color:"#55b4fe",
          url: "/"
        },
        {
          id: 3,
          title: "手机绑定",
          icon: "icon-ai-bind-cel",
          icon_color:"#FF6633",
          url: "/"
        },
        {
          id: 4,
          title: "银行卡管理",
          icon: "icon-yinxingqia3",
          icon_color:"#FF6633",
          url: "/"
        },
        {
          id: 5,
          title: "转账",
          icon: "icon-iconset0292",
          icon_color:"#FF6633",
          url: "/"
        },
        {
          id: 6,
          title: "收货地址",
          icon: "icon-dizhi3",
          icon_color:"#FF6633",
          url: "/"
        },
        {
          id: 7,
          title: "系统信息",
          icon: "icon-gonggaoguanli",
          icon_color:"#55b4fe",
          url: "/"
        },
        {
          id: 8,
          title: "在线客服",
          icon: "icon-iconfontfuwushichang",
          icon_color:"#99CC99",
          url: "/"
        },
        {
          id: 9,
          title: "关于我们",
          icon: "icon-emoji",
          icon_color:"#99CC99",
          url: "/"
        },
      ];
    }
  },
  methods: {
    fff() {
      console.log("没有url参数,则执行fn方法");
    }
  },
  components: {
    UserBox,
    Kgrid,
    k_across_tab
  }
};
</script>
<style scoped lang="less">
@import url("../../common/less/index.less");

.usersenter{
  width: 100%;
}
</style>
