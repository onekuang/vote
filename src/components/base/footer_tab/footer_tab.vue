<template>
<div class="footer_tab">
  <mu-paper>
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
      <mu-bottom-nav-item value="index" to='/' title="首页" icon=":iconfont icon-home1"/>
      <mu-bottom-nav-item value="apply" to='/apply' title="报名" icon=":iconfont icon-baoming"/>
      <!-- <mu-bottom-nav-item value="list" to='/caselist' title="案例" icon=":iconfont icon-home1"/>
      <mu-bottom-nav-item value="goodscart" to='/goodscart' title="购物车" icon=":iconfont icon-home1"/> -->
      <mu-bottom-nav-item value="ranking" to='/ranking' title="排行榜" icon=":iconfont icon-paihang"/>
      <mu-bottom-nav-item value="jiangpin" to='/jiangpin' title="奖品" icon=":iconfont icon-jiangpin"/>
    </mu-bottom-nav>
  </mu-paper>
</div>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: "index"
    };
  },
  methods: {
    handleChange(val) {
      this.bottomNav = val;
    }
  }
};
</script>
<style lang="less">

// 选中时的颜色
.mu-bottom-item-active .mu-bottom-item-text,
.mu-bottom-item-active .mu-icon {
  color: #FF6E5F;
}

.mu-bottom-nav {
  background-color: #f7f7fa !important;
}
.footer_tab {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.mu-bottom-nav-shift {
  background: #000 !important;
}
.mu-buttom-item {
  color: #FF6E5F;
  .mu-icon {
    font-size: 20px;
  }
}

.mu-bottom-item-icon {
  font-size: 18px !important;
}
</style>
