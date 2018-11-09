<template>
<div class="prodetaile ab_full">
<BScroll 	class="box_wrapper" ref="scroll" :pullup = pullup
  @scrollToEnd='onscroll' :bounce=false>
<div style="padding-bottom: 60px;">
	<!-- 轮播图 -->
	<swipe
	  v-model="index"
	  style="text-align: center;height: 250px;"
	  :autoplayTime = autoplayTime
	>
	  <swipe-item v-for="item in images">
	    <img :src="baseurl + item" width="100%" height="250">
	  </swipe-item>
	  <!-- <swipe-item>
	    <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1540516795&di=ffdcdba1dc6c46089a23dbe04d7f0040&src=http://img4.duitang.com/uploads/item/201605/20/20160520091727_ewYMQ.jpeg" width="100%" height="250">
	  </swipe-item> -->
	</swipe>

	
	<div class="detaile">
		<div class="info_top">
			<div class="title">{{detaile_data.name}}</div>
			<div class="site"><i class="iconfont icon-shouhuodizhi"></i> {{detaile_data.address}}</div>
			<div class="desc">
				{{detaile_data.content}}
			</div>
		</div>
		
		<div class="khr"></div>
		<div class="comment_list_wrapper">
			<div class="comment_box">
				<div class="title">
					评论列表
				</div>
				<div class="item" v-for="item in comment_list">
					<div class="userinfo">
						<div class="img">
							<img :src="item.headimgurl" width="32" height="32" >
						</div>
						<div class="name">
							{{item.nickname}}
						</div>
						<div class="time">
							{{item.create_time}}
						</div>
					</div>
					<div class="comment">
						{{item.content}}
					</div>
				</div>
				<div v-show="comment_list == 0" style="padding-top: 30px;">
					<Null_list title="暂无评论" />
				</div>

			</div>
		</div>
	</div>
</div></BScroll>

<div class="tab_wrapper">
	<div class="tab_box">
		<div class="pinglun" @click="toggle_model(1)" :class="{chen: comment_show}">
			<i class="iconfont icon-message_light"></i>
			<span >评论</span>
		</div>
		<div class="liwu" @click="toggle_model(2)"  :class="{chen: liwu_show}">
			<!-- <i class="iconfont icon-jiangpin"></i> -->
			<img src="./dasang.png" width="28" height="28">
			<span style="color: #FA4660;">打赏</span>
		</div>
		<div class="vote">
			<div @click="vote_post">投TA一票</div>
		</div>
	</div>

	<!-- 评论弹出 -->
	<transition name="slide-bottom"> 
	<div class="pinglun_text" v-show="comment_show">
		<textarea name="textarea" rows="3" placeholder="请输入评论内容"v-model="textarea"></textarea>
		<div class="btn_box text-right">
			<span @click="push_comment">评论</span>
		</div>
	</div>
	</transition>

	<!-- 礼物弹出 -->
	<transition name="slide-bottom"> 
	<div class="liwu_text" v-show="liwu_show">
		<div class="item_box">
			<div class="item" 
				:class="{active:liwu_index == index}"
				v-for="(item, index) in liwu_list" 
				:key="item.id" 
				@click="select_liwu(index,item.id)"
			>
				<p>{{item.name}}</p>
				<!-- <p>{{item.price}}元</p> -->
			</div>
		</div>
		
		<div class="btn_wrapper">
			<span class="pull-left zhuyi">注: 1元打赏1钻,1钻等于3票</span>
			<div class="pull-right" @click="wx_pay" style="line-height: 40px;">
				<span class="span">立即支付</span>
			</div>
		</div>
	</div>
	</transition>
</div>
</div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll'
import Null_list from '@/components/base/loading/null_list'
import { l_storage } from '@/common/js/storage.js'
import { k_wx_pay, k_wx_share } from '@/common/js/k_wechat.js'
import { UrlSearch } from '@/common/js/util.js'
export default {
	name:"prodetaile",
	data() {
		return {
			goods_id : '',
			wx_title:'',
			wx_desc:'',
			code: '',
			detaile_data: {},
			baseurl: this.$api.base_img,

			index: 0, // two way
			autoplayTime: 3000,
			images: [], // 轮播

			comment_show: false,
			textarea:"",
			liwu_show: true,
			liwu_index: 0,
			liwu_list : [],

			comment_list:[],
			// 上拉加载
      pullup: true,  // 是否开启上拉加载
      start_page:1,   // 起始计数
      sum_page:1,     // 总页数
      gift_id:'',
		}
	},
	created() {
		this.goods_id = this.$route.query.id
		// var Request = new UrlSearch(); //实例化
		// this.code    = Request.code || '';
		// let state   = Request.state || '';
		// let id    = state.split('#') 
		// this.goods_id = id[0]


		this.all_hide()
		this._get_data(this.goods_id)
		this._get_liwu();
		this.wx_share_init();
		// alert(l_storage.get('openid'))
	},
	methods: {
		_get_data(id) {			
			this.axios.get(this.$api.goods_detaile,{
				params: {
					applyid: id,
					// voteid: 1,
				}
			})
			.then(res => {
				if(res.data.code == 200) {
					this.detaile_data = res.data.data
					this.images = res.data.data.images
					this.wx_title = res.data.data.name
					this.wx_desc = res.data.data.content
					this._get_commentlist(id)
				}else if (res.data.code == 400) {
					this.$alert(res.data.msg).then(success => {
						this.$router.push({
							path: `/home`
						})
					})
					this.pullup = false
				}
				else {
					this.pullup = false
				}
			})
			.catch(res => {
				this.$toast("获取商品信息失败")
			})
		},
		// 礼物列表
		_get_liwu() {
			this.axios.get(this.$api.gift_list,{
				params: {
					// voteid: 1
				}
			})
			.then(res => {
				this.liwu_list = res.data.data
				this.gift_id = res.data.data[0].id || null 
			})
			.catch(res => {
				this.$toast("获取礼物列表失败")
			})
		},
		// 获取评论列表
		_get_commentlist(id,page) {
			let pagenum = null;
			if(page) {
				pagenum = page
			}
			this.axios.get(this.$api.comment_list,{
				params: {
					// voteid: 1,
					applyid: id,
					page: pagenum
				}
			})
			.then(res => {
				if(res.data.code == 200 && !pagenum) {
					this.start_page = 1
					this.sum_page = res.data.data.last_page
					// if(this.sum_page == 0) {
					// 	this.sum_page = 1
					// }
					this.comment_list = res.data.data.data	

					if(this.comment_list.length == 0) {
						this.pullup = false
					}				
				}else if(res.data.code == 200 && pagenum){
					let arr2 = res.data.data.data
					this.comment_list = this.comment_list.concat(arr2)
					if(this.comment_list.length == 0) {
						this.pullup = false
					}
				}else{
						this.pullup = false
				}
			})
			.catch(res => {
				this.$toast("获取评论失败")
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
		  this._get_commentlist(this.goods_id,this.start_page);
		  this.$refs.scroll.$emit('infinitescroll.finishLoad'); 
		},
		// 投票
		vote_post() {
			this.axios.get(this.$api.ticketpost,{
				params: {
					// voteid: 1,
					applyid: this.goods_id,
					// user_token:l_storage.get('openid'),
				}
			})
			.then(res => {
				this.$toast(res.data.msg)
				if(res.data.code == 205) {
					window.location.href = res.data.data
				}
			})
			.catch(res => {
				this.$toast("网络错误")
			})
		},
		// 发表评论
		push_comment() {
			this.axios.post(this.$api.comment_post,{
				// voteid: 1,
				applyid: this.goods_id,
				content:this.textarea,
				// user_token:l_storage.get('openid'),
			})
			.then(res => {
				if(res.data.code == 200 ) {
					this.textarea = ''
					this.all_hide()					
					this.$toast(res.data.msg)
					this._get_commentlist(this.goods_id)
				}else if(res.data.code == 205) {
					window.location.href = res.data.data
				}else{
					this.$toast(res.data.msg)
				}
			})
			.catch(res => {
				this.$toast("网络错误")
			})
		},
		// 支付
		wx_pay() {
			let that = this;
			this.axios.post(this.$api.wxpay,{
				// user_token:l_storage.get('openid'),
				giftid: this.gift_id,
				// voteid: 1,
				applyid: this.goods_id,
				// code:this.code,
				url: window.location.href.split('#')[0]
			})
			.then(res => {
				if(res.data.code == 200 ) {
					that.pay(res.data.data)			
				}else if(res.data.code == 205) {
					window.location.href = res.data.data
				}else{
					this.$toast(res.data.msg)
				}
			})
			.catch(res => {
				this.$toast("网络错误")
			})			
		},
		pay(data) {
			k_wx_pay(this, data,this.goods_id)
		},
		// 微信分享
		wx_share_init() {
			let that = this
			this.axios.get(this.$api.wxshare,{
				params: {
					url: window.location.href.split('#')[0]
				}
			})
			.then(res => {			
				let desc = 	that.wx_desc ? that.wx_desc : l_storage.get('webdesc')
				k_wx_share(this, res.data.data,that.wx_title,desc,this.baseurl + this.images[0])
			})
		},
		all_hide() {
			this.comment_show = false
			this.liwu_show = false
		},
		toggle_model(num) {
			if(num == 1) {
				this.liwu_show = false
				this.comment_show = !this.comment_show
				return
			}
			if(num == 2) {
				this.comment_show = false
				this.liwu_show = !this.liwu_show
				return
			}
		},
		select_liwu(index, id) {
			this.liwu_index = index
			this.gift_id = id
		}
	},
	components: {
		BScroll,Null_list
	}
}
</script>

<style scoped lang="less">
@import url('../../common/less/index.less');
.prodetaile{
	.tab_wrapper{
		position: fixed;
		background: #fff;
		bottom: @footer_height;
		left: 0;
		right: 0;
		height: 50px;
		border-top: 1px solid #eee;
		text-align: center;
		.tab_box{
			display: flex;
			.pinglun, .liwu {
				flex: 0 0 80px;
				width: 80px;
				font-size: 12px;
				color: #666;
				i {
					font-size: 24px;
				}
				span {
					display: block;
					line-height: 2px;
				}
			}
			.liwu{
				padding-top: 2px;
			}
			.vote {
				flex: 1;
				line-height: 50px;
				margin-left: 20px;
				color: #fff;
				background: linear-gradient(left, #FF8F2B,#FF715B );
			}
		}
		.pinglun_text{
			// z-index: 3;
			position: absolute;
			bottom: 50px;
			left: 0;
			right: 0;
			height: 160px;
			padding: 8px;
			background: #fff;
			border-top: 1px solid #ccc;
			textarea{
				width: 100%;
				height: 100px;
			}
			span {
				display: inline-block;
				width: 50px;
				border-radius: 8px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				color: #fff;
				background: linear-gradient(left, #FF8F2B,#FF715B );
			}
		}
		.liwu_text{
			z-index: 3;
			position: absolute;
			bottom: 50px;
			left: 0;
			right: 0;
			padding: 8px;
			background: #fff;
			border-top: 1px solid #ccc;
			.item_box{
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				.item{
					flex: 0 0 23%;
					width: 23%;
					height: 50px;
					background: #eee;
					margin: 8px 1%;		
					// padding-top: 4px;			
					line-height: 50px;
					color: #fff;
					border-radius: 4px;
					p {
						color: #FF715B;
						&:nth-of-type(2) {
							font-size: 12px;
						}
					}
					&.active {
						background: #FF715B;
						p {
						color: #fff;
					}
					}
				}
			}
			.btn_wrapper{
				.zhuyi {
					line-height: 40px;
					color: #666;
					padding-left: 6px;
					font-size: 12px;
				}
				.span {
					display: inline-block;
					width: 80px;
					border-radius: 8px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					color: #fff;
					background: linear-gradient(left, #FF8F2B,#FF715B );
				}
			}			
		}
	}
}
.info_top{
	padding: 8px;
	.title{
		font-size: 18px;
		font-weight: 600;
	}
	.site {
		color: #666;
		font-size: 14px;
		margin-top: 6px;
		margin-bottom: 12px;
	}
	.desc {
		color: #666;
		font-size: 14px;
	}
}

.comment_list_wrapper{
	.comment_box{
		padding: 8px;
		.title{
			border-left: 4px solid #FF8110;
			text-indent: 8px;
		}
		.item {
			margin-bottom: 20px;
			margin-top: 20px;
			padding-bottom: 6px;
			border-bottom: 1px solid #eee;
			.userinfo{
				display: flex;
				align-items: center;
				margin-bottom: 8px;
				.img{
					flex: 0 0 40px;
					width: 40px;
					img{
						border-radius: 50%;
					}
				}
				.name {
					flex: 1;
					font-size: 14px;
				}
				.time{
					flex: 0 0 130px;
					width: 130px;
					font-size: 12px;
					padding-right: 12px;
				}
			}
			.comment {
				font-size: 14px;
				text-indent: 1em;
				color: #666;
			}
		}
	}
}
.chen {
	color: #FF8F2B !important;
}
</style>
