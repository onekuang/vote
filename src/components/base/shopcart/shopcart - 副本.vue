<template>
<div>
   <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper" @click="toggleList">
          <div class="logo">
            <i class="fa fa-shopping-cart"  :class="{'highlight':totalCount>0}">
              <!-- <img src="./shopcart.png" width=40 height=40> -->
            </i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
 
        <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}元</div>
        <!-- <div class="desc">另需配送费￥{{deliveryPrice}}元</div> -->
        <div class="addcart" @click="add_cart">加入购物车</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>

    <!-- 弹出的详情页 -->
    <transition name="fold">
      <div class="shopcart-list" v-show='listShow'>
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(food,index) in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food='food' :index=index @foodEmpty=foodEmpty />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
   </div>
    
    <!-- 遮罩层 -->
    <transition name="fade">   
      <div class="list-mask"
       v-show="listShow"
       @click="hideList"
       >
         
       </div>
    </transition>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
import { mapGetters , mapMutations ,mapActions } from 'vuex'

  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 4
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        fold: true
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        // if (this.totalPrice === 0) {
        //   return `￥${this.minPrice} 购买`
        // } else if (this.totalPrice < this.minPrice) {
        //   let diff = this.minPrice - this.totalPrice
        //   return `还差￥${diff}元起送`
        // } else {
        //   return `去结算`
        // }
        return `去结算`
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
                })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      },
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
        this.$emit('clearCrat')
      },
      hideList () {
        this.fold = true
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return
        }
        console.log(this.selectFoods)
        // alert(`需要支付${this.totalPrice}元`)
      },      
      add_cart() {
        this.$emit("addCart")
      },
      // 监听子组件,数量时候为0
      foodEmpty(index){
        this.$emit('foodEmpty', index)
      },
      ...mapMutations({
        set_cart: 'SET_CART',
        clear_cart: 'CLEAR_CART',
      })
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang="less">

// 加入购物车按钮背景
@add_cart_color:#212d3a;
// `去结算`背景
@add_cart_play:#ff5252;
  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 56px;
    background: #000;
    .content{
      display: flex;
      background: #141d27;
      font-size: 0;
      .content-left{
        flex: 1;
        .logo-wrapper{
          display: inline-block;
          vertical-align: top;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          border-radius: 50%;
          background: #141d27;
          .logo{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            // background: #2b343c;
            text-align: center;
            &.highlight{
              background: rgb(0,160,220);
            }
            i{
              line-height: 54px;
              font-size: 24px;
              color: rgba(255,255,255,0.4);
              &.highlight{
                color: #fff;
              }
              img{
                margin-top: 2px;
              }
            }
          }
          .num{
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: #fff;
            background: rgb(240,20,20);
            box-shadow: 0 4px 8px 0 rgba(0,0,0,.4)
          }
        }
        .price{
          display: inline-block;
          vertical-align: top;
          margin-top: 12px;
          line-height: 24px;
          padding-right: 12px;
          box-sizing: border-box;
          border-right: 1px solid rgba(255,255,255,0.1);
          font-size: 16px;
          font-weight: 700;
          color: rgba(255, 255, 255, .4);
          &.highlight{
            color: #fff;
          }
        }
        .desc{
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          margin: 12px 0 0 12px;
          line-height: 24px;
          color: rgba(255, 255, 255, .4);
          font-size: 10px;
        }
        .addcart{
          display: inline-block;
          vertical-align: top;
          line-height: 56px;
          height: 56px;
          width: 90px;
          text-align: center;
          // margin: 12px 0 0 12px;
          // line-height: 24px;
          color: #fff;
          background: @add_cart_color;
          font-size: 10px;
          float: right;
        }
      }
      .content-right{
        flex: 0 0 90px;
        width: 90px;
        .pay{
          height: 56px;
          line-height: 56px;
          text-align: center;
          font-size: 12px;
          color: rgba(255, 255, 255, .4);
          font-weight: 700;
          background: #2b333b;
          &.not-enough{
            background: #5cb85c;
          }
          &.enough{
            // background: #00b43c;
            background: @add_cart_play;
            color: #fff;
          }
        }
      }
    }
    .shopcart-list{
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      transform: translate3d(0,-100%,0);
      &.fold-enter-active, &.fold-leave-active{
        transition: all .5s
      }
      &.fold-enter, &.fold-leave-active{
        transform: translate3d(0,0,0);
      }

      .list-header{
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7,17,27,.1);
        .title{
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
          margin: 0;
        }
        .empty{
          float: right;
          font-size: 12px;
          color: rgb(0, 160,220);
        }
      }
      .list-content{
        // padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
        .food{
          position: relative;
          padding: 12px 12px;
          box-sizing: border-box;
          // border-1px(rgba(7,17,27,0.1));
          border: 1px solid rgba(7,17,27,0.1);
          .name{
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price{
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper{
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }
  }
  .list-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    backdrop-filter: blur(10px);
    opacity: 1;
    background: rgba(7,17,27,.6);
    &.fade-enter-active, &.fade-leave-active{
      transition: all .5s;
    }
    &.fade-enter, &.fade-leave-active{
      opacity: 0;
      background: rgba(7,17,27,0);
    }
  }
</style>
