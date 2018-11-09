<template>
<div class="list_wrapper ab_full bg_fff">
<BScroll  
  class="box_wrapper" 
  ref="scroll" 
  :pullup = pullup
  @scrollToEnd='onscroll'>
  <div>

  <div class="banner">
    <img src="" width="100%" @load="imgload" v-holder="'img=100px200?&bg=C7E1FF&text=100px200'">
  </div>

  <div class="khr"></div>


  <div class="box" v-for='(item, index) in list_data' @click='goto_article(111)'>
    <div class="img">
      <img src="" width="100" height="100" v-holder="'img=100x100?&bg=C7E1FF&text=100x100'">
    </div>
    <div class="infobox">
      <h3 class="title">title_ell</h3>
      <p class="time">{{"Oct 11, 2018 2:01:06 PM" | time}}</p>
      <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam esse laboriosam, tenetur totam culpa, repellendus porro quisquam necessitatibus, recusandae odio ullam similique. Itaque ducimus perferendis, consectetur architecto debitis, explicabo voluptate.</p>
    </div>
  </div>



</div></BScroll>
</div>
</template>
<script>
import BScroll from '@/components/base/scroll/scroll';
import { kk } from '@/common/js/k_form';
export default {
  name: "list",
  data() {
    return {
      // 上拉加载
      pullup: false,  // 是否开启上拉加载
      start_page:1,   // 起始计数
      sum_page:1,     // 总页数

      list_data:[{}],
    };
  },
  created() {   
    this._inti_pullup();
  },
  mounted() {
    if(this.start_page == this.sum_page){
      this.$refs.scroll.$emit('infinitescroll.loadedDone'); 
      return
    }
  },
  methods: {
    goto_article(id) {
      this.$router.push({
        path: `/article?id=${id}`
      })
    },

    imgload() {
      this.$refs.scroll.refresh()
    },

    // 如果数据太少的时候,就直接不开启上拉加载.
    _inti_pullup() {
      if(this.start_page == this.sum_page){
        this.pullup = false
      }else{
        this.pullup = true
      } 
    },
    // 上拉加载监听
    onscroll() {
      if(this.start_page == this.sum_page){
        this.$refs.scroll.$emit('infinitescroll.loadedDone'); 
        return
      }
      this.list_data.push(
        {},{},{}
      )
      this.start_page ++;
      this.$refs.scroll.$emit('infinitescroll.finishLoad'); 
    }
  },
  filters: {
    time: function (input) {
      var d       = new Date(input)
      var year    = d.getFullYear()
      var month   = d.getMonth()+ 1 < 10 ? '0' + (d.getMonth()+1) : '' + (d.getMonth()+ 1)
      var day     = d.getDate()     < 10 ? '0' + d.getDate()      : '' + d.getDate()
      var hour    = d.getHours()    < 10 ? '0' + d.getHours()     : '' + d.getHours()
      var minutes = d.getMinutes()  < 10 ? '0' + d.getMinutes()   : '' + d.getMinutes()
      var seconds = d.getSeconds()  < 10 ? '0' + d.getSeconds()   : '' + d.getSeconds()

      return year + '-' 
        + month   + '-' 
        + day     + ' ' 
        + hour    + ':' 
        + minutes + ':' 
        + seconds;
    }
  },
  components: {
    BScroll
  }
};
</script>
<style scoped lang="less">
@import url("../../common/less/index.less");
.list_wrapper {
  .banner{
    // padding: 8px;
    img{
      border-radius:0 0 2px 2px;
      // box-shadow: 1px 1px 4px 2px rgba(0,0,0,.5);
    }
  }
  .box{
    background: #fff;
    margin-bottom: 8px;
    padding: 6px;
    display: flex;
    border-bottom: 1px solid #f4f4f4;
    .img{
      width: 120px;
      flex: 0 0 120px;
      text-align: center;
      padding-top: 10px;
      img {
        border-radius: 4px;
      }
    }
    .infobox{
      flex: 1;
      min-width: 60%;
      .title{
        margin-top: 6px;
        .ell();
      }
      .time{
        margin: 8px 0;
        color: #888;
        font-size: 12px;
      }
      .description{
        font-size: 14px;
        text-indent: 1em;
        line-height: 24px;
        height: 48px;
        text-overflow:ellipsis; 
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>
