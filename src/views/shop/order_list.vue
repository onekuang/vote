<template>
<div class="show_order_list ab_full">
<BScroll 	class="box_wrapper" ref="scroll" >
<div>
	<mu-container>
	  <mu-tabs :value.sync="active" indicator-color="#55b4fe" inverse color="#000" text-color="rgba(0, 0, 0, .54)"  full-width>
	      <mu-tab>未付款</mu-tab>
	      <mu-tab>待发货</mu-tab>
	      <mu-tab>待收货</mu-tab>
	      <mu-tab>已完成</mu-tab>
	    </mu-tabs>
	  <div class="demo-text">
	    <!-- <div class="for_items" v-for="i in 3">
	    	<div>
	    		<div class="khr"></div>
		    	<div class="item">
		    		
		    		<div class="item_herd">
		    			<div>下单时间：1999-11-09 12:12:12</div>
		    			<div>未付款</div>
		    		</div>
						
						<div class="item_top">
							<div>订单编号：1234567890123456789</div>
						</div>

		    		<div class="item_content">
		    			<div class="for_goods_item">
		    				<div class="img">
		    					<img v-holder="'img=80x80?&bg=C7E1FF&text=80x80'">
		    				</div>
		    				<div class="info">
		    					<div class="title">title</div>
		    					<div class="num">x 3</div>
		    				</div>
		    			</div>
		    			<div class="right">
		    				
		    			</div>
		    		</div>

		    		<div class="expbox">
		    			<table>
		    				<tr>
		    					<td><div>运费：</div></td>
		    					<td><span class="money">12元</span></td>
		    				</tr>
		    				<tr>
		    					<td><div>积分兑换：</div></td>
		    					<td><span class="money">-8元</span></td>
		    				</tr>
		    			</table>
		    			<div class="clearfix"></div>
		    		</div>


		    		<div class="item_foot">
		    			<div>￥300</div>
		    			<div>
		    				<span class="span1" @click="cancel_order(1)">取消订单</span>
		    				<span class="span2">立即付款</span>
		    			</div>
		    		</div>
		    	</div>
		    	
		    </div>
	    </div> -->
			
	    <div class="for_items" v-for="item in order_data" :key="item.id">
	    	<div v-show="active + 1 == item.status">
		    	<div class="khr"></div>
		    	<div class="item">
		    		<div class="item_herd">
		    			<div>下单时间：1999-11-09 12:12:12</div>
		    			<div>{{item.status | f_status}}</div>
		    		</div>
						
						<div class="item_top">
							<div>订单编号：1234567890123456789</div>
						</div>

		    		<div class="item_content">

		    			<div class="for_goods_item">
		    				<div class="img">
		    					<img v-holder="'img=80x80?&bg=C7E1FF&text=80x80'">
		    				</div>
		    				<div class="info">
		    					<div class="title">产品名称</div>
		    					<div class="num">x 3</div>
		    				</div>
		    			</div>

		    		</div>
						
						<div class="expbox">
							<table>
								<tr>
									<td><div>快递运费：</div></td>
									<td><span class="money">12元</span></td>
								</tr>
								<tr>
									<td><div>满减红包：</div></td>
									<td><span class="money">-8元</span></td>
								</tr>
							</table>
							<div class="clearfix"></div>
						</div>

		    		<div class="item_foot">
		    			<div>￥300</div>
		    			<div>
		    				<span class="span1" v-show="item.status == 1" @click="cancel_order(1)">取消订单</span>
		    				<span class="span2" v-show="item.status == 1" @click="pay_order(1)">立即付款</span>

		    				<span class="span2" v-show="item.status == 2" @click="select_wuliu(1)">物流信息</span>

		    				<span class="span1" v-show="item.status == 3" @click="select_wuliu(1)">物流信息</span>
		    				<span class="span2" v-show="item.status == 3" @click="confirm(123)">确认收货</span>
		    				<!-- <span class="span2" v-show="item.status == 4">已完成</span> -->
		    			</div>
		    		</div>
		    	</div>
	    		
	    	</div>
	    </div>
	  </div>
	</mu-container>

	<div class="no_data" style="margin-top: 30px;">
		<ListNull/>
	</div>

</div></BScroll>
</div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll'
import ListNull from '@/components/base/loading/null_list'
export default {
	name:"show_order_list",
	data() {
		return {
			active: 0,
			order_data:[
				{
					id:1,
					status: 1
				},
				{
					id:2,
					status: 2
				},
				{
					id:3,
					status: 3
				},
				{
					id:4,
					status: 4
				},
				{
					id:5,
					status: 4
				},
			]
		}
	},
	methods: {
		// 立即购买
		pay_order() {
			console.log('立即购买')
		},
		// 取消订单
		cancel_order(id) {
			this.$confirm({
				title: '确认取消该订单?'
			})
			.then(res => {
				console.log(id)
			})
			.catch(fail => {
				console.log('取消')
			})
		},
		// 确认收货
		confirm(id) {
			this.$confirm({
				title: '确认收货?'
			})
			.then(res => {
				console.log(id)
			})
			.catch(fail => {
				console.log('取消')
			})
		},
		// 物流信息
		select_wuliu(id) {
			console.log('查看物流')
			this.$router.push({
				path: `/wuliu?id=${id}`
			})
		}
	},
	filters: {
		f_status :function(input) {
			if(input == 1){return "未付款"}
			if(input == 2){return "待发货"}
			if(input == 3){return "待收货"}
			if(input == 4){return "已完成"}
		},
	  time: function (input) {
	    var d       = new Date(input)
	    var year    = d.getFullYear()
	    var month   = d.getMonth()    + 1
	    var day     = d.getDate()     < 10 ? '0' + d.getDate()    : '' + d.getDate()
	    var hour    = d.getHours()    < 10 ? '0' + d.getHours()   : '' + d.getHours()
	    var minutes = d.getMinutes()  < 10 ? '0' + d.getMinutes() : '' + d.getMinutes()
	    var seconds = d.getSeconds()  < 10 ? '0' + d.getSeconds() : '' + d.getSeconds()
	
	    return year + '-' 
	      + month   + '-' 
	      + day     + ' ' 
	      + hour    + ':' 
	      + minutes + ':' 
	      + seconds;
	  }
	},
	components: {
		BScroll,ListNull
	}
}
</script>

<style scoped lang="less">
@import url('../../common/less/index.less');
.show_order_list{
	position: relative;
	.no_data{
		position: absolute;
		top: 100px;
		left: 50%;
		transform: translateX(-50%);
		z-index: -1;
	}
	.for_items{
		.item{
			padding: 8px;
			background: #fff;
			.item_herd{
				display: flex;
				font-size: 12px;
				padding-bottom: 6px;
				padding-top: 6px;
				border-bottom: 1px solid rgba(0, 0, 0, 0.1);
				>div{
					flex: 1;
					&:nth-of-type(2) {
						text-align: right;
					};
				}
			}
			.item_top{
				>div{
					font-size: 12px;
					padding: 6px 0;
				}
			}

			.item_content{				
				.for_goods_item{
					padding: 8px 0;
					display: flex;
					>div{
						flex: 1;
					}
					.img {
						flex: 0 0 90px;
						text-align: center;
					}
					.info {
						text-align: right;
						margin-right: 8px;
					}
				}
			}

			.item_foot{
				display: flex;
				border-top: 1px solid rgba(0, 0, 0, 0.1);
				padding-top: 8px;
				>div{
					flex: 1;
					&:nth-of-type(1) {
						font-size: 18px;
						font-weight: 600;
						color: @color_shen;
					}
					&:nth-of-type(2) {
						text-align: right;
						.span1,.span2{
							display: inline-block;
							text-align: center;
							border-radius: 6px;
							font-size: 12px;
							padding: 4px 12px;							
						}
						.span1{
							background: #eee;
						}
						.span2{
							margin-left: 8px;
							color: #fff;
							.blue_btn();
						}
					};
				}
			}
			.expbox{
				table{
					width: 100%;
					tr{
						font-size: 12px;
						td:nth-of-type(1) {
							width: 100px;
							>div{							
								margin-bottom: 8px;
							}
						}
						td:nth-of-type(2) {
							text-align: right;
							.money{
								color: @color_shen;
								font-weight: 600;
							}
						}
					}
				}	
			}
		}
	}
}
</style>
