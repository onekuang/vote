<template>
<div class="chongzhi ab_full">
<BScroll 	class="box_wrapper" ref="scroll" >
<div>

<div class="chongzhi_box">

	<div class="chongzhi_top">
		<img src="http://vote.xsygood.com//public/static/module/admin/img/onimg.png">
		<div class="text">为
			<span class="span1">43</span>号
			<span class="span2">火锅店</span><br>
			送
			<span class="span3">5钻</span>＝<span class="span4">15</span>
			票
		</div>
	</div>

	<div class="chongzhi_list">
		<div class="item" v-for="item in 11">
			<span class="span1">5000</span> 钻
		</div>
		<div class="item">
			自定义
		</div>
	</div>
	<div class="chongzhi_input">
		<div class="input_box" style="padding: 6px 12px;">
			<div class="label">充值金额：</div>
			<input class="k_input1" type="number" v-model.number="money">
		</div>
	</div>

	<div class="make">
		<span>注: </span> 一元打赏一钻,一钻等于三票
	</div>

	<div class="chongzhi_type">
		 <div class="item">
			 	<div class="img">
			 		<i class="iconfont icon-iconfontweixin"></i>
			 	</div>
			 	<div class="text">使用微信支付</div>
			 	<div class="img2 active">
			 		<i class="iconfont icon-roundcheckfill"></i>
			 	</div>
		 </div>
	</div>

	<div class="btn_box" style="margin-top: 20px;margin-bottom: 30px;">
		<div class="k_lg_btn red_btn">打赏钻石</div>
	</div>
</div>

</div></BScroll>
</div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll'
export default {
	name:"chongzhi",
	data() {
		return {
			money:'123'
		}
	},
	components: {
		BScroll
	}
}
</script>

<style scoped lang="less">
@import url('../../common/less/index.less');
.box_wrapper{
	background: #f9f9f9;
}
.chongzhi_box{
	.chongzhi_top{
		margin-top: 20px;
		text-align: center;
		img {
			border-radius: 50%;
			width: 60px;
			height: 60px;
		}
		.text{
			margin-top: 10px;
			color: #000;
			font-size: 14px;
			.span4{
				color: #FF8F2B;
			}
		}
	}

	.chongzhi_list{
		margin-top: 20px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		.item {
			flex: 0 0 25%;
			width: 25%;
			margin: 8px 12px;
			text-align: center;
			border-radius: 4px;
			border: 1px solid #eee;
			height: 40px;
			line-height: 40px;
			color: #FF8F2B;
			background: #fff;
			.span1{
				font-size: 18px;
			}
		}
	}
	.make{
		margin-top: 20px;
		// text-align: center;
		font-size: 12px;
		color: #666;
		padding-left: 16px;
		span{
			// font-weight: 600;
			// color: #333;
		}
	}
	.chongzhi_type {
		padding: 0 8px;
		.item{
			margin-top: 8px;
			padding: 6px;
			height: 40px;
			background: #fff;
			border: 1px solid #f5f5f5;
			display: flex;
			line-height: 28px;
			.img {
				flex: 0 0 24px;
				width: 24px;
				height: 24px;
				line-height: 24px;
				text-align: center;
				color: #fff;
				font-size: 20px;
				background: #44B54B;
			}
			.text {
				flex: 1;
				font-size: 12px;
				margin-left: 12px;
			}
			.img2 {
				flex: 0 0 24px;
				width: 24px;
				color: #999;
				&.active {
					color: #44B54B;
				}
			}
		}
	}
}
</style>
