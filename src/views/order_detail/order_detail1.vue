<template>
<div class="order_detaile1 ab_full">
<BScroll 	class="box_wrapper" ref="scroll" >
<div>
	<div class="order_wrapper" id="order_info">		
		<div class="order_top">
			<h2>德文制造股份有限公司</h2>
			<div class="cound">￥1000</div>
			<div class="status">交易成功</div>
		</div>

		<div class="order_des">
			<div class="des_item">
				<div class="key">卡号</div>
				<div class="val">123456789</div>
			</div>
			<!-- <div class="des_item">
				<div class="key">支付方式</div>
				<div class="val">微信支付</div> 
			</div> -->
			<div class="hr"></div>
			<div class="des_item">
				<div class="key">创建时间</div>
				<div class="val">2012-12-12</div>
			</div>
			<div class="hr"></div>
			<div class="des_item">
				<div class="key">订单号</div>
				<div class="val">1234567</div>
			</div>          
			<div class="hr"></div>  
		</div>
	</div>

</div></BScroll>
</div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll'
export default {
	name:"order_detaile1",
	data() {
		return {

		}
	},
	components: {
		BScroll
	}
}
</script>

<style scoped lang="less">
@import url('../../common/less/index.less');
.order_wrapper{
    padding: 8px 8px 20px;
    background: #fff;
    .order_top{
    text-align: center;
        h2{
            margin-top: 16px;
            font-size: 24px;
            font-weight: 600;
        }
        .cound{
            font-weight: 700;
            font-size: 28px;
            margin: 16px 0 10px;
        }
        .status{
            font-size: 15px;
            color: #999;
        }
    }
    .order_des{
        margin-top: 20px;
        .des_item{
            display: flex;
            width: 100%;
            height: 40px;
            line-height: 40px;
            .key{
                width: 100px;
                color: #333;
                font-weight: 600;
            }
            .val{
                flex: 1;
                text-align: right;
                font-size: 15px;
            }
        }
    }
}
.hr{
	height: 1px;
	width: 100;
	background: #eee;
}
</style>
