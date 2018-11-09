<template>
<div class="goods_cart ab_full">
<BScroll 	class="box_wrapper" ref="scroll" style="bottom:100px;">
<div style="padding-bottom: 16px;">

<div class="shop_cart_list_wrapper">
	<div class="shop_cart_list">
		<div class="item" v-for="(item, index) in shoppingCart">
			<div class="checkbox">
				<label :for="'shopcart-' + index"></label>
				<input 
					:id="'shopcart-' + index"
					type="checkbox"
					:value="index"
					v-model='checkName'
					:checkbox=false					
					@change=setvuex
				>
			</div>
			<div class="img_box">
				<img :src="item.logo" width="64" height="64">
			</div>
			<div class="info">
				<div class="title">{{item.name}}</div>
				<div class="info_footer">
					<div class="money">￥{{item.count * item.price}}元</div>
					<div class="controll">
						<CartControl :food='item' :index=index :isMin=true />
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
	
	<div class="no_data" style="margin-top: 30px;" v-show="shoppingCart.length == 0">
		<ListNull :title="title"/>
	</div>
</div>

</div></BScroll>

	<!-- 购买汇总 -->
	<div class="pay_box" v-show=shoppingCart.length>
		<div class="money">合计：<span>￥{{vuex_checkData_money}}</span></div>
		<div class="paybtn_box">
			<span class="k_md_btn hui_btn" style="margin-right: 12px;" @click=deleteGoods>删除选中</span>
			<span class="k_md_btn blue_btn" @click=pay>创建订单</span>
		</div>
	</div>

</div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll'
import CartControl from '@/components/base/cartcontrol/cartcontrol.vue'
import ListNull from '@/components/base/loading/null_list'

import {mapMutations,mapGetters} from 'vuex'
export default {

	data() {
		return {
			lists: [],
			title: "购物车空空如也~",
			// 加减按钮的颜色
			color: "#f00",
			checkName: []
		}
	},
	computed: {
		sum_money:function() {
			let sum = 0
			if(this.data.length == 0) {
				return sum
			}else{
				this.data.forEach((item, index) => {
					sum += item.price * item.count
				})
			}
			return sum
		},
		vuex_checkData_money: function() {
			let sum = 0
			if(this.checkGoods.length == 0) {
				return sum
			}else{
				this.checkGoods.forEach((item, index) => {
					sum += item.price * item.count
				})
			}
			return sum
		},
		...mapGetters([
      'shoppingCart',
      'checkGoods'
    ])
	},
	methods: {
		pay() {
			if(!this.checkName.length){
				this.$toast('请勾选需要购买的商品')
				return
			}else{				
				// this.setvuex();
				// this.$emit('pay')
				console.log(this.checkGoods)				
				this.$router.push({
					path: `/orderlist`
				})
			}
		},
		deleteGoods() {
			if(!this.checkName.length){
				this.$toast('请勾选需要删除的商品')
			}else{
				this.$confirm({
				  title: '确认删除所选商品?'
				})
				.then(res=> {
				  this.vuex_delete_check_goods(this.checkName)
				  this.vuex_clear_checkgoods()
				  this.checkName = [];
				})
				.catch(fail => {
	        console.log('取消')
	      })			
			}
		},
		setvuex() {
			let shopCartData = this.shoppingCart
			let ckData = this.checkName
			let payData = [];
			for (var i =0 ; i < ckData.length; i++) {
				let j = ckData[i]
				payData.push(shopCartData[j])
			}
			// 写入vuex
			this.vuex_set_checkgoods(payData)
		},
		...mapMutations({
		  vuex_delete_check_goods: 'DELETE_CHECK_GOODS',
		  vuex_set_checkgoods: 'SET_CHECKGOODS',
		  vuex_clear_checkgoods: 'CLEAR_CHECKGOODS'
		})
	},
	components: {
		BScroll,CartControl,ListNull
	}
}
</script>

<style scoped lang="less">
@import url('../../common/less/index.less');
.shop_cart_list_wrapper{
	background: #fff;	
	.shop_cart_list{
		.item{
			padding: 2px 12px;
			display: flex;
			border-bottom: 1px solid #eee;
			.checkbox{
				flex:  0 0 30px;
				width: 30px;
				height: 80px;
				line-height: 90px;
				position: relative;
				i{
					font-size: 20px;
				}
				label{
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
					overflow: hidden;
				}
				input[type='checkbox']{
				    width: 12px;
				    height: 12px;
				    background-color: #fff;
				    -webkit-appearance:none;
				    border: 1px solid #c5c5c5;
				    border-radius: 50%;
				    outline: none;
				    position: absolute;
				    top: 50%;
				    left: 50%;
				    transform: translate(-50%,-50%);
				    transition: all 0.3s;
				}
				input[type=checkbox]:checked{
					transition: all 0.5s;
				   border: none;
				   background: @color_liang;

				}
			}
			.img_box{
				flex: 0 0 80px;
				width: 80px;
				height: 80px;
				padding: 0 10px;
				padding-top: 10px;
				img{
					border-radius: 6px;
				}
			}
			.info{
				flex: 1;
				// max-width: 60%;
				overflow: hidden;
				padding-top: 8px;
				.title{
					word-wrap: normal;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 14px;
					line-height: 24px;
					color: #333;
					// font-weight: 600;
				}
				.info_footer{
					margin-top: 12px;
					.money{
						float: left;
						color: #333;
						font-size: 14px;
						margin-top: 6px;
					}
					.controll{
						float: right;
						// margin-top: 20px;
					}	
				}
				
			}
		}
	}
	
}
.pay_box{
		position: fixed;
		bottom: @footer_height;
		left: 0;
		right: 0;
		display: flex;
		padding: 12px 8px;
		background: #fff;
		box-shadow: 2px 2px 10px #ccc;
		.money{
			flex: 1;
			text-align: left;
			color: #333;			
			font-size: 16px;
			padding-top: 4px;
			span{
				color: @color_shen;
				// font-weight: 600;
				font-size: 16px;
			}
		}
		.paybtn_box{
			// flex: 1;
			text-align: right;
		}
	}
</style>
