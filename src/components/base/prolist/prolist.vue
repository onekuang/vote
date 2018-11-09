<template>
<div class="prolist_wrapper">
	<div class="prolist">

		<div 
			class="item" 
			v-for='n in data'
			@click="proClick(n.toKenId)"
		>
			<div class="img">
				<!-- <img src="/static/images/pos.png" width=100 height=100> -->
				<img :src="'http://www.fushuaxx.com/' + n.logo" width=100 height=100>
			</div>
			<div class="info">
				<div class="title">{{n.name}}</div>
				<div class="description">{{n.brandName}}</div>
				<div class="money_box">
					<span class="money">￥{{n.price}}元</span>
					<!-- <span class="shopBtn"><i class="fa fa-shopping-cart"></i></span> -->
					<span class="shopBtn2">了解详情</span>
					<div class="clearfix"></div>
				</div>
			</div>
		</div>

	</div>
</div>
</template>

<script>
export default {
	props: {
		data: {
			type:Array
		}
	},
	methods: {
		proClick(id) {
			this.$emit('proClick',id)
		}
	}
}
</script>

<style scoped lang="less">
.prolist_wrapper{
	.prolist{
		background: #fff;
		.item{
			display: flex;
			padding-top: 8px;
			padding-bottom: 8px;
			border-bottom: 1px solid #ccc;
			.img{
				width: 120px;
				flex: 0 0 120px;
				height: 120px;
				padding-top: 10px;
				text-align: center;
				img{
					border-radius: 6px;
				}
			}
			.info{
				flex: 1;
				height: 120px;
				max-width: 70%;
				overflow: hidden;
				.title{
					font-size: 18px;
					font-weight: 600;
					color: #333;
					word-wrap: normal;
					overflow: hidden;
					text-overflow: ellipsis;
					height: 24px;
					margin-top: 10px;
				}
				.description{
					font-size: 16px;
					text-indent: 12px;
					overflow: hidden;
					font-size: 16px;
					line-height: 26px;
					height: 44px;
					// height: 40px;
					margin-top: 8px;
					color: #666;
				}
				.money_box{
					.money{
						display: inline-block;
						height: 30px;
						line-height: 30px;
						font-size: 20px;
						float: left;
						font-weight: 600;
						color: #f00;
						// float: right;
						// margin-right: 12px;
					}
					.shopBtn{
						float: right;
						margin-right: 12px;
						border-radius: 50%;
						display: inline-block;
						background: #f00;
						width: 30px;
						height: 30px;
						text-align: center;
						line-height: 30px;
						i{
							color: #fff;
						}
					}
					.shopBtn2{
						float: right;
						margin-right: 12px;
						display: inline-block;
						border: 1px solid #FCA218;
						border-radius: 12px;
						text-align: center;
						color: #FCA218;
						font-size: 12px;
						padding: 2px 10px;
						margin-top: 4px;
					}
				}
			}
		}
	}
}
.clearfix{
	clear: both;
}
</style>
