<template>
<div class="ranking_wrapper ab_full">
<BScroll 	class="box_wrapper" ref="scroll" :pullup = pullup 
	@scrollToEnd='onscroll'>
<div>
	<div class="ranking_box">
		<div class="box">
			<div class="item" v-if="pro_list.length != 0">
				<div>1</div>
				<div>排 行</div>
			</div>
			<div class="item item2">
				<div class="img_box">
					<i class="iconfont icon-crownfill i1"></i>
					<img :src=c_img width="100" height="100">
					<span class="span1">1</span>
				</div>
			</div>
			<div class="item" v-if="pro_list.length != 0">
				<div>{{pro_list[0].ticket}}</div>
				<div>票 数</div>
			</div>
		</div>
		<div class="title" v-if="pro_list.length != 0">{{pro_list[0].name}}</div>
		<div class="title" v-else>虚位以待</div>
	</div>
	

	<div style="text-align: center;font-size: 18px;">票数排行榜</div>
	
	<div class="ranking_list">
		<div class="for_ul">
			<div class="item" v-for="(item, index) in pro_list">
				<div class="ranking_index">
					<div v-if="index == 0"><img src="./no1.png" width="30" height="30"></div>
					<div v-else-if="index == 1"><img src="./no2.png" width="30" height="30"></div>
					<div v-else-if="index == 2"><img src="./no3.png" width="30" height="30"></div>
					<div v-else class="num">{{index + 1}}</div>
				</div>
				<div class="img_box">
					<img :src="baseurl + item.images[0]" width="48" height="48">
				</div>
				<div class="info">
					<div class="title">{{item.name}}</div>
					<div class="site"><i class="iconfont icon-shouhuodizhi"></i> {{item.address}}</div>
				</div>
				<div class="ticket">
					<div><span>{{item.ticket}}</span> 票</div>
					<!-- <div class="juli" v-if="index !=0">还差<span>{{item.ticket}}</span>票提升排名</div> -->
				</div>
			</div>
		</div>
	</div>

</div></BScroll>
</div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll'
export default {
	name:"ranking",
	data() {
		return {
			baseurl: this.$api.base_img,
			pro_list:[],
			// 上拉加载
      pullup: false,  // 是否开启上拉加载
      start_page:1,   // 起始计数
      sum_page:1,     // 总页数,
		}
	},
	created() {
		this._get_data()
	},
	computed: {
		c_img: function() {
			if(this.pro_list == 0 ) {
				return this.baseurl + "/public/static/module/admin/img/onimg.png"
			}else {
				return this.baseurl + this.pro_list[0].images[0]
			}
		}
	},
	methods: {
		_get_data(startPage) {
			let pagenum = null;
			if(startPage) {
				pagenum = startPage
			}
			this.axios.get(this.$api.pro_list,{
				params: {
					sort:'ticket',
					list_rows: 10,
					page: pagenum
				}
			})
			.then(res => {
				if(res.data.code == 200 && !pagenum) {
					this.pro_list = res.data.data.data
					this.sum_page = res.data.data.last_page
				}else{
					let arr2 = res.data.data.data
					this.pro_list = this.pro_list.concat(arr2)
				}
			})
			.catch(res => {
				this.$toast("网络错误")
				this.pullup = false
			})
		},
		// 上拉加载监听
		onscroll() {
		  if(this.start_page >= this.sum_page){
		    this.$refs.scroll.$emit('infinitescroll.loadedDone'); 
		    return
		  }
		  // this.comment_list.push(
		  //   {},{},{}
		  // )
		  this.start_page ++;
		  this._get_data(this.start_page);
		  this.$refs.scroll.$emit('infinitescroll.finishLoad'); 
		},
	},
	components: {
		BScroll
	}
}
</script>

<style scoped lang="less">
@import url('../../common/less/index.less');
.ranking_wrapper{
	.ranking_box{
		height: 250px;
		width: 100%;
		background: url(./ranking_bg.jpg);
		background-size: 100% 100%;
		.box{
			padding-top: 50px;
			display: flex;
			text-align: center;
			align-items: center;
			.item{
				flex: 1;
				text-align: center;
				color: #fff;
				& div:nth-of-type(1) {
					font-size: 20px;
				}
				.img_box{
					display: inline-block;
					width: 104px;
					height: 104px;
					border-radius: 50%;
					border: 2px solid #fff;
					img {
						border-radius: 50%;
					}
				}
			}
			.item2 {
				position: relative;
				.i1{
					position: absolute;
					top: -36px;
					color: #F9CD36;
					font-size: 36px;
					left: 50%;
					transform: translateX(-50%);
				}
				.span1{
					position: absolute;
					display: inline-block;
					width: 20px;
					height: 20px;
					background: #F9CD36;
					border-radius: 50%;
					font-size: 12px;
					line-height: 20px;
					text-align: center;
					border: 1px solid #fff;
					bottom: -5px;
					left: 50%;
					transform: translateX(-50%);

				}
			}
		}
		.title {
			text-align: center;
			margin-top: 12px;
			color: #fff;
			font-size: 18px;
		}
	}



	.ranking_list {
		.for_ul{
			padding: 6px;
			.item{
				background: #F0ECED;
				padding: 8px 6px;
				display: flex;
				align-items: center;
				margin: 6px 0;
				.ranking_index{
					flex: 0 0 40px;
					width: 40px;
					text-align: center;
					.num {
						display: inline-block;
						width: 30px;
						height: 30px;
						line-height: 32px;
						background: #ccc;
						color: #fff;
						border-radius: 50%;

					}
				}
				.img_box{
					img {
						border-radius: 50%;
					}
				}
				.info{
					flex: 1;
					padding-left: 10px;
					.site{
						font-size: 12px;
						margin-top: 4px;
					}
				}
				.ticket{
					flex: 0 0 120px;
					text-align: right;
					.juli{
						font-size: 12px;
						color: #FF8C4D;
					}
				}
			}
		}
	}
}
</style>
