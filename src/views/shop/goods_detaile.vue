<template>
<div class="goods_detaile_wrapper ab_full">
	<span class="back" @click=back>
		<i class="iconfont icon-icon--"></i>
	</span>
<BScroll 	class="box_wrapper" ref="scroll" >
<div>
	<!-- 轮播图 -->
	<swipe
	  v-model="index"
	  style="text-align: center;height: 230px;"
	  :autoplayTime = autoplayTime
	>
	  <swipe-item>
	    <img src="http://tp5test.cms.sppcms.com/img/banner1.jpg" width="100%">
	  </swipe-item>
	  <swipe-item>
	    <img src="http://tp5test.cms.sppcms.com/img/banner1.jpg" width="100%">
	  </swipe-item>
	  <swipe-item>
	    <img src="http://tp5test.cms.sppcms.com/img/banner1.jpg" width="100%">
	  </swipe-item>
	</swipe>
	<!-- 轮播图end -->
	
	<div class="goods_info">
		<div class="goods_head">
			<div class="title">瑞人健康VIP理疗卡</div>
			<div class="img">
				<img src="./qd.png" width=30 height="30"><p class="p1">分享</p>
			</div>
		</div>
		<div class="param">
			<div class="item">￥ 1568</div>
			<div class="item">运费: 14元</div>
			<div class="item">上海</div>
		</div>
	</div>
	<div class="khr"></div>
	
	<div class="goods_detaile">
		<div v-html= "html"></div>
	</div>





	











</div></BScroll>



<ShopCart 
	:selectFoods=shoppingCart 
	@addCart=addCart 
	@pay=pay
/>



</div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll'
import ShopCart from '@/components/base/shopcart/shopcart'
import { mapGetters , mapMutations ,mapActions } from 'vuex'


export default {
	name:"goods_detaile",
	data() {
		return {
			index: 0, // two way
			autoplayTime: 3000,
			html:'goods_detail',
			// 商品信息
			goods:{
				id:1,
				name: 'name',
				price: 22,
			},
	  	selectFoods:[
				{id:1,name:'pos3',price:321,count:1},
			]
		}
	},
	methods: {
		// 后退按钮
		back() {
			this.$router.back()
		},
		// 监听购物车组件 => 点击了`加入购物车`按钮
		addCart() {
			let data = {
				id:this.goods.id,
				name:this.goods.name,
				price:this.goods.price,
				logo: this.goods.logo,
				count:1
			}
			this.add_cart(data)
		},
		// 监听购物车组件 => 点击了`结算`按钮
		pay() {
			this.$router.push({
				path: `/shopcar`
			})
		},
		...mapMutations({
    	add_cart: 'ADD_CART',
    })
	},
	computed: {
		...mapGetters([
			'shoppingCart'
		])
	},
	components: {
		BScroll,ShopCart
	},
	destroyed() {
		console.log('监听页面离开')
	}
}
</script>

<style lang="less">
@import url('../../common/less/config.less');
@import url('../../common/less/theme.less');
.goods_detaile_wrapper{
	.back{
		display: inline-block;
		padding: 12px;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 99;
		i{
			font-size: 20px;
			font-weight: 900;
		}
	}
	.goods_info{
		padding: 12px 8px;
		.goods_head{
			display: flex;
			.title{	
				flex: 1;
				padding-top: 4px;
				font-size: 18px;
				font-weight: 600;
			}
			.img{
				text-align: center;
				flex: 0 0 30px;
				width: 30px;
				.p1{
					margin: 0;
					padding: 0;
					font-size: 12px;
					color: #888;
				}
			}
		}
		.param{
			margin-top: 14px;
			display: flex;
			height: 30px;
			line-height: 30px;
			>div{
				flex: 1;
			}
			.item:nth-of-type(1) {
				font-size: 20px;
				font-weight: 600;
				color: @color_base;
			}
			.item:nth-of-type(2) {
				text-align: center;
			}
			.item:nth-of-type(3) {
				text-align: right;
			}
		}
	}

	.goods_detaile{
		img{
			max-width: 100% !important;
		}
	}
}

</style>
