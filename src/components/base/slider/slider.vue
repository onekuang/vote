<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>

    <div class="dots">
      <span class="dot"
       v-for="(item, index) in dots"
       :key="index"
       :class="{active:currentPageIndex === index}">         
       </span>
    </div>
  </div>

  
</template>

<script>
import BScroll from 'better-scroll'
// import {addClass} from '../../common/js/dom.js'
import {addClass} from '../../../common/js/dom'
export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    // 当视口发生变化的时候宽度出先问题的解决方法
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      // refresh()是BScroll的接口,重新计算slider.
      this.slider.refresh()
    })
  },
  methods: {
    init() {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    },
    // 获取总宽度
    _setSliderWidth(isRsize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isRsize) {
        // width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        // 滚动方向为 X 轴
        scrollX: true,
        // 滚动方向为 Y 轴
        scrollY: false,
        // 当快速滑动时是否开启滑动惯性
        momentum: false,
        // 该属性是给 slider 组件使用的，普通的列表滚动不需要配置
        snap: true,
        // 是否可以无缝循环轮播
        snapLoop: this.loop,
        // 手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
        snapThreshold: 0.3,
        // 轮播图切换的动画时间
        snapSpeed: 400
      })
      this.slider.on('scrollEnd', () => {
        // scrollend是SBcroll的接口.滚动结束时触发
        // getCurrentPage() 当 snap 为 true 时，获取滚动的当前页，返回的对象结构为 {x, y, pageX, pageY}，其中 x,y 代表滚动横向和纵向的位置；pageX，pageY 表示横向和纵向的页面索引
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          // pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
        // goToPage(x, y, time, easing)
        // 当 snap 为 true，滚动到对应的页面，x 表示横向页面索引，y 表示纵向页面索引， time 表示动画，easing 表示缓动函数
      }, this.interval)
    }
  },
  // 生命周期销毁的时候
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="less">

.slider{
    min-height: 1px;
    .slider-group{
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-item{
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;

        a{
          display: block;
          width: 100%;
          overflow: hidden;
          text-decoration: none;
        }
        img{
          display: block;
          width: 100%;
        }
      }
    }
    .dots{
      position: absolute;
      right: 0;
      left: 0;
      bottom: 12px;
      text-align: center;
      font-size: 0;
      .dot{
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        // background: #fff;
        background: rgba(255, 255, 255, .5);
        &.active{
          width: 20px;
          border-radius: 5px;
          // background: #fff;
          background: rgba(255, 255, 255, .8);
        }
      }
    }
}  
</style>
