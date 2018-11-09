<template>
<div class="header_wrapper">
  <mu-appbar :title=title class="header" popupClass='test'>
    
    <mu-icon-button       
      icon=":iconfont icon-fanhui" 
      slot="left"
      v-if=!is_home
      @click="back()"
    />
    <mu-flat-button 
      class="header_left"
      v-if=is_home
      icon=":iconfont icon-my" 
      slot="left"
      to='/userinfo'
    />
    <mu-icon-menu icon=":iconfont icon-gengduo1" slot="right" @click.native="open('right')">
      <!-- <mu-menu-item title="个人中心" to='userinfo' leftIcon=":iconfont icon-home"/>
      <mu-menu-item title="最新公告" leftIcon=":iconfont icon-home"/>
      <mu-menu-item title="购物车"   leftIcon=":iconfont icon-home"/> -->
    </mu-icon-menu>

    
  </mu-appbar>

  <mu-popup position="right" popupClass="demo-popup-right" :open="rightPopup" @close="close('right')">
     <mu-list>
      <mu-list-item title="个人中心">
        <mu-icon slot="left" value=":iconfont icon-home" to='/userinfo' />
      </mu-list-item>
      <mu-list-item title="最新公告">
        <mu-icon slot="left" value=":iconfont icon-home"/>
      </mu-list-item>
      <mu-list-item title="购物车">
        <mu-icon slot="left" value=":iconfont icon-home"/>
      </mu-list-item>
      <mu-list-item title="Drafts">
        <mu-icon slot="left" value=":iconfont icon-home"/>
      </mu-list-item>
      <mu-list-item title="Drafts">
        <mu-icon slot="left" value=":iconfont icon-home"/>
      </mu-list-item>
      <mu-list-item title="Drafts">
        <mu-icon slot="left" value=":iconfont icon-home"/>
      </mu-list-item>
    </mu-list>
  </mu-popup>
</div>
</template>
<script>
export default {
  props: {
    title :{
      default: 'POS机'
    },
    is_home: {
      default: false
    }
    
  },
  data() {
    return {
      rightPopup: false,
    }
  },
  methods: {
    back() {
      history.go(-1)
    },
    open (position) {
      console.log(123);
      this[position + 'Popup'] = true
    },
    close (position) {
      this[position + 'Popup'] = false
    },
  },
  watch: {
    topPopup (val) {
      if (val) {
        setTimeout(() => {
          this.topPopup = false
        }, 2000)
      }
    }
  }
}
</script>

<style lang="less">
.mu-appbar{
  background: #FF6B01;
}
.header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
}
.mu-appbar-title{
  text-align: center;
}
.header_left{
  padding-left: 8px;
}
.mu-popover{
  // top: 57px !important;
}
.mu-menu-item-left-icon{
  left: 25px;
  margin: 0;
}
.demo-popup-right {
  width: 50%;
  height: 300px;
  max-width: 375px;
}
.demo-popup-right{
  top: 206px;
}
</style>
