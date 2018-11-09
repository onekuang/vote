<template>
   <div class="null_list">
    <img src="./null.png" width="48" height="48">
    <p class="desc">{{title}}</p>
   </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>

<style scoped lang="less">

.null_list{
  width: 100%;
  text-align: center;
  .desc{
    margin: 0 auto;
    padding: 0;
    // display: inline-block;
    width: 100px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #999;
    position: relative;
    // &::before{
    //   content:'';
    //   display: inline-block;
    //   width: 50px;
    //   height: 1px; 
    //   background: #ccc;
    //   position: absolute;
    //   left:-50px;
    //   top: 10px;
    // };
    // &::after{
    //   content: '';
    //   width: 50px;
    //   display: inline-block;
    //   height: 1px;
    //   background: #ccc;
    //   position: absolute;
    //   left:100px;
    //   top: 10px;
    // };
  }
}
    
    
</style>
