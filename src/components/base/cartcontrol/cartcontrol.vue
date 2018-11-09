<template>
   <div class="cartcontrol">
    
   <transition name="move">
    <div class="cart-decrease"
     v-show="food.count>0"
     @click.stop.prevent="decreaseCart">
     <span class="inner iconfont icon-move"></span>
    </div>
    </transition>

    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>

    <div class="cart-add">
      <span class="iconfont icon-add1" @click.stop.prevent="addCart"></span>
    </div>
   </div>
</template>

<script>
import Vue from 'vue'
import {mapMutations} from 'vuex'
  export default {
    props: {
      food: {
        type: Object
      },
      index: {
        type: Number
      },
      // 是否开启自减时的最小数量
      isMin: {
        type: Boolean,
        default: false
      },
      // 最小数量
      minNum: {
        type:Number,
        default:1
      },
      // 按钮颜色
      color: {
        type: String,
        default: '#fff'
      }
    },
    methods: {
      // addCart(event) {
      //   if (!event._constructed) {
      //     return
      //   }
      //   if (!this.food.count) {
      //     Vue.set(this.food, 'count', 1)
      //   } else {
      //     this.food.count++
      //   }
      // },
      // decreaseCart(e) {
      //   if (!e._constructed) {
      //     return
      //   }
      //   if (this.food.count) {
      //     this.food.count--
      //     // 如果数量为0时,派发事件
      //     if(this.food.count == 0 ){
      //       this.$emit('foodEmpty', this.index)
      //     }
      //   }
      // },
      addCart(event) {
        if (!event._constructed) {
          return
        }
        this.ADD_ONE_GOODS(this.index)
      },
      decreaseCart(e) {
        if (!e._constructed) {
          return
        }
        if(this.isMin && this.food.count == this.minNum){
          this.$toast(`数量不能小于${this.minNum}`)
          return
        }
        this.DECREASE_ONE_GOODS(this.index)
      },
      ...mapMutations({
        ADD_ONE_GOODS: 'ADD_ONE_GOODS',
        DECREASE_ONE_GOODS: 'DECREASE_ONE_GOODS',
      })
    }
  }
</script>

<style lang="less">
// 加减号按钮颜色
@btn_color: #666;
@btn_bg: #fff;

.box_shadow {
  box-shadow: 2px 2px 10px #999;
}
  .cartcontrol{
    font-size: 0;
    padding: 0 6px !important;
    .cart-decrease{
      display: inline-block;
      padding: 6px;
      opacity: 1;
      transform: translate3D(0,0,0);
      text-align: center;
      .inner{
        display: inline-block;
        width: 16px;
        height: 16px;
        font-size: 12px;
        color: @btn_color;
        background: @btn_bg;
        transition: all .4s linear;
        border-radius: 50%;        
        margin-right: 8px;
        .box_shadow();
      }
      &.move-enter-active, &.move-leave-active{
        transition:  all .4s linear;
      }
      &.move-enter, &.move-leave-active{
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner{
          transform: rotate(180deg);
        }
      }
    }
    .cart-count{
      display: inline-block;
      vertical-align: center;
      width: 12px;
      // padding-top: 6px;
      // line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: #666;
    }
    .cart-add {
      display: inline-block;
      padding: 6px;
      opacity: 1;
      transform: trans;
      .iconfont {
        display: inline-block;
        width: 16px;
        height: 16px;
        text-align: center;
        margin-left: 8px;
        background: @btn_bg;
        font-size: 12px;
        color: @btn_color;
        border-radius: 50%;
        .box_shadow();
      }
    }
  }
</style>
