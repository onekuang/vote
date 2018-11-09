<template>
<!-- 优惠劵列表 -->
<div class="coupon ab_full">
<BScroll 	class="box_wrapper" ref="scroll" >
<div>

	<div class="card_box">
		<div class="item_wrapper">
			<div class="card_item">
				<div class="money">
					<p class="p2">礼品卷</p>
				</div>
				<div class="dsc">
					<div class="title">卡劵号码</div>
					<div class="text">满99元可用,APP下单使用满99元可用</div>
					<div class="time">2012/12/12 - 2012/12/12</div>
				</div>							
			</div>
		</div>
	</div>

	<div class="card_box">
		<div class="item_wrapper">
			<div class="card_item">
				<div class="money _not_money">
					<p class="p2">已失效</p>
				</div>
				<div class="dsc _not_dsc">
					<div class="title">卡劵号码</div>
					<div class="text">满99元可用,APP下单使用满99元可用</div>
					<div class="time">2012/12/12 - 2012/12/12</div>
					<div class="shixiao">
						<img src="./shixiao.png" height="48" width="84">
					</div>
				</div>							
			</div>
		</div>
	</div>
</div></BScroll>
	<div class="foot">
		<div class='foot_box'>
			<span class="span1">没有更多可用劵了 </span>
			<span class="span2">查看失效劵</span>
		</div>
	</div>
</div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll'
export default {
	name:"coupon",
	data() {
		return {

		}
	},
	computed: {
	},
	components: {
		BScroll,
	}
}
</script>

<style scoped lang="less">
@import url('../../common/less/index.less');
@card_height: 90px; // 卡劵的高度
@card_bg_status: 0; // 是否开启背景渐变,1 开启, 0 不开启

.card_bg (@a) when (@a = 1) {background: @jianbian;}
.card_text_color (@a) when (@a = 1) {color: #fff;}

.coupon{
	.card_box{
		padding: 0 8px;
		margin-top: 16px;
		.card_item{
			margin-bottom: 16px;
			display: flex;
			width: 100%;
			.money{
				// width: @card_height;
				height: @card_height;
				padding: 0 12px;
				text-align: center;
				border: 1px solid @color_base ;
				border-radius:12px 6px 6px 12px;
				border-right: 0;
				position: relative;
				.card_bg(@card_bg_status);
				&._not_money{
					border-color: #ccc !important;
					background: #fff !important;
					.p1,.p2{
						color: #ccc;
					}
				}
				.p1{
					margin-top: 8px;
					height: 24px;
					font-size: 12px;
					color: @color_base;
					span{
						margin-top: 2px;
						font-size: 20px;
						font-weight: 700;
					}
				}
				.p2{
					font-size: 14px;
					font-weight: 600;
					color: @color_base;
					line-height: @card_height;
					.card_text_color(@card_bg_status);
				}
			}
			.dsc{
				flex: 1;
				border: 1px solid @color_base ;
				border-radius:6px 8px 8px 6px;
				border-left: 1px dashed @color_base ;
				padding-left: 16px;
				height: @card_height;
				overflow: hidden;
				position: relative;
				.card_bg(@card_bg_status);
				.title{
					margin-top: 10px;
					font-size: 14px;
					height: 20px;
					color: @color_shen;
					.card_text_color(@card_bg_status);
				}
				.text{
					margin-top: 6px;
					font-size: 12px;
					color: @color_shen;
					.card_text_color(@card_bg_status);
					line-height: 24px;
				}
				.time{
					font-size: 12px;
					margin-top: 6px;
					padding-right: 6px;
					text-align: right;
					color: #999;
					.card_text_color(@card_bg_status);
				}
				.shixiao{
					position: absolute;
					top: 6px;
					left: 70%;
				}
				&._not_dsc{
					border-color: #ccc;
					background: #fff !important;
					.title,.text,.time{
						color: #ccc;
					}
				}
			}
		}
	}

	.foot{
		position: fixed;
		left: 0;
		right: 0;
		bottom: @footer_height;
		height: 40px;
		text-align: center;
		font-size: 12px;
		line-height: 40px;
		.foot_box{
			.span1{
				height: 40px;
				display: inline-block;
			}
			.span2{
				height: 40px;
				color: @color_base;
				display: inline-block;
			}
		}
	}
}
</style>
