<template>
<div class="wuliu ab_full">
<BScroll 	class="box_wrapper" ref="scroll" >
<div>
	<div class="box">
		<div class="container">
		    <div class="top-sec">
		        <div class="a-row">
		            <div class="label">物流单号</div>
		            <div class="text">1234567890987654321</div>
		        </div>
		        <div class="a-row">
		            <div class="label">物流公司</div>
		            <div class="text">顺丰快递</div>
		        </div>
		    </div>
		    <div class="khr"></div>
		    <div class="sec-wrap">
		        <div class="details-info">
		            <div class="line-box"></div>
		            <div class="a-row" v-for="item in 10">
		                <div class="dot">
		                    <div class="default-dot"></div>
		                </div>
		                <div class="info">
		                    <div class="date-box">1972-10-01 12:11:10</div>
		                    <div class="text">东莞市【虎门转运中心】，正发往【东莞南城区二部】</div>
		                </div>
		            </div>
		            <div class="text-center" v-show="lists.lengt">
		            	<ListNull :title="nolist"/>
		            </div>
		        </div>
		    </div>
		</div>
	</div>

</div></BScroll>
</div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll'
import ListNull from '@/components/base/loading/null_list'

export default {
	name:"wuliu",
	data() {
		return {
			nolist:"暂无物流信息",
			lists: []
		}
	},
	components: {
		BScroll,ListNull
	}
}
</script>

<style scoped lang="less">
@import url('../../common/less/index.less');

.top-sec {
  background-color: #fff;
  width: 100%;
  margin-top: 10px;
  box-sizing: border-box;
  padding: 12px 15px;
  .a-row {
  	display: flex;
  	font-size: 14px;
  	line-height: 26px;
  	.label {
			color: #999;
			margin-right: 14px;
  	}
  }
}

.sec-wrap{
    width: 100%;
    background-color: #fff;
    margin-top: 10px;
}
.details-info{
  position: relative;
  width: 100%;
  margin-top: 10px;
  overflow: hidden;
  .a-row{
    margin-left: 20px;
    display: flex;
    margin-right: 15px;
    margin-bottom: 25px;
    position: relative;
    z-index: 4;
    .info{
		  font-size: 14px;
		}
	}
}
.date-box {
    font-size:12px;
    color:#999;
    margin-bottom: 10px;
}
.info .text{
    color: #000;
    line-height: 20px;
}
.dot{
    width: 15px;
    height: 15px;
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}
.default-dot{
    background:#ddd;
    width:8px;
    height:8px;
    border-radius:100%;
}
.active-dot{
    border:1px solid #e64340;
    width:13px;
    height:13px;
    border-radius:50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
}
.active-dot .yuan-red{
    background:#e64340;
    width:8px;
    height:8px;
    border-radius:50%;
}
.line-box{
    position: absolute;
    top:-60px;
    left: 27px;
    background:#dddddd;
    width:1px;
    height:100%;
}
</style>
