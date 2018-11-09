<template>
	<!-- 投票系统 -->
<div class="home2 ab_full">
<BScroll 	class="box_wrapper" ref="scroll" 
	:pullup = pullup 
	@scrollToEnd='onscroll'>
<div>
	<div class="theme1">
	<!-- 轮播图 -->
	<swipe
	  v-model="index"
	  style="text-align: center;height: 210px;"
	  :autoplayTime = autoplayTime
	>
	  <swipe-item v-for="item in images">
	    <img :src="baseurl + item" width="100%" height=210>
	  </swipe-item>
	  <!-- <swipe-item>
	    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540557274680&di=7998bc27e6c543fbd4261bbc4216c637&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F5d6034a85edf8db10896995d0223dd54564e744b.jpg" width="100%" height="210">
	  </swipe-item> -->
	</swipe>

	
		<div class="showdata">
			<div class="item">
				<div class="num">{{index_data.applynum}}</div>
				<!-- <div class="num">0</div> -->
				<div class="text">参与选手</div>
			</div>
			<div class="item">
				<div class="num">{{index_data.totalticket}}</div>
				<div class="text">累计投票</div>
			</div>
			<div class="item">
				<div class="num">{{index_data.click}}</div>
				<div class="text">访问量</div>
			</div>
		</div>
		<div class="baoming">

			<div class="search_box">
				<Search 
					:placeholder=search_placeholder 
					:iconcolor=search_icon_color 
					@query = on_search_text
					@search = search_data(search_text)
				/>
			</div>

			<div class="time_box theme1_huodong">
				<div class="activity" @click="goto('/huodong')">
					<i class="iconfont icon-text_icon"></i>
					<div>活动介绍</div>
				</div>
				<div class="countdown">
					<CountDown :end_time=end_time @overtime=over_time :text=text />
				</div>
			</div>

			<div class="btn_box">
				<span class="baoming_btn theme1_btn" @click="goto('/apply')" v-if="btn_status == 1">立即报名</span>
				<span class="baoming_btn theme1_btn off" v-if="btn_status == -1">未开始</span>
				<span class="baoming_btn theme1_btn off" v-if="btn_status == -2">已结束</span>
				<!-- <span class="baoming_btn theme1_btn off">报名已结束</span> -->
			</div>
		</div>
		
		<div class="index_tab">
			<div 
				class="item" 
				v-for="(item,index) in tabdata" 
				:class="{border: tabindex == index}"
				@click=toggle_tab(index)
			>{{item}}</div>
		</div>
		<div class="pro_list_wrapper">
			<div class="item" v-for="item in pro_list">
				<div class="img_box" @click="goto_votedetail(item.id)">
					<img :src="baseurl + item.images[0]" width="100%" @load="loadImage" height=120>
					<div class="youhui">
						<div class="l">NO.{{item.applySn}}</div>
						<div class="r">{{item.ticket}}票</div>
					</div>
				</div>
				<div class="info_wrapp">
					<div class="info">
						<span class="title">{{item.name}}</span>
						<!-- <span class="ticket">8000票</span> -->
					</div>
					<div class="site">{{item.address}}</div>
					<span class="btn theme1_btn">查看更多</span>
				</div>
			</div>
		</div>


		




</div> <!-- theme -->
</div></BScroll>
</div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll'
import Search from '@/components/base/search/search'
import CountDown from '@/components/base/countdown/countdown'
import { k_is_login, k_wx_accredit, k_wx_share} from '@/common/js/k_wechat.js'
import { l_storage } from '@/common/js/storage.js'
import { kk } from '@/common/js/k_form.js'
export default {
	name:"home2",
	data() {
		return {
			tt :'',
			text:"距离活动结束还有",
			index: 0, // two way
			autoplayTime: 3000,
			search_placeholder:"搜索名称和编号",
			search_icon_color:"#333",
			search_text: '',
			end_time:0,
			// end_time:1540944000000,

			tabdata: ['票数最高', '最新参与', '人气排行'],
			tabindex: 0,


			index_data: {
				applynum: 0,
				totalticket: 0,
				click: 0,
			},
			btn_status: 1,
			btn_msg: 1,
			images: [],
			pro_list: [],
			baseurl: this.$api.base_img,

			// 上拉加载
      pullup: true,  // 是否开启上拉加载
      start_page:1,   // 起始计数
      sum_page:1,     // 总页数,
      count_tab:'',
		}
	},
	mounted() {
		// this.tt = l_storage.get('voteid')
		this.is_login()
		this._get_data()
		this._get_pro_data('ticket')
	},
	// watch: {
	// 	search_text: function(n, o) {
	// 		this.search_data(n)
	// 	}
	// },
	methods: {
		is_login() {
			this.axios.get(this.$api.is_login,{
				params: {}
			})
			.then(res => {
				if(res.data.code == 205) {
					// window.location.href = res.data.data
				}
			})
			.catch(res => {
				this.$toast("网络错误")
			})
		},
		_get_data() {
			let that = this
			this.axios.get(this.$api.index_data,{
				params: {
					// voteid: 1
				}
			})
			.then(res => {
				if(res.data.code == 200) {
					this.index_data = res.data.data
					this.images = res.data.data.images
					l_storage.set('webname',res.data.data.name)
					l_storage.set('webdesc',res.data.data.description)
					l_storage.set('webimg',that.$api.base_img + res.data.data.thumb)

					let enddate = res.data.data.enddate
					// 兼容ios 时间戳
					var arr = enddate.split(/[- : \/]/)
					var date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
					var time1 = date.valueOf();
					this.end_time = time1
					this.btn_status = res.data.data.timestatus
					if(this.btn_status == -1) {
						this.text = "距离活动开始还有"
					}
					that.wx_share_init()
				}
			})
			.catch(res => {
				this.$toast("网络错误")
			})
		},
		_get_pro_data(sort,startPage,search) {
			let pagenum = null;
			let search2 = null;
			if(startPage) {
				pagenum = startPage
			}
			if(search) {
				search2 = search
			}
			this.axios.get(this.$api.pro_list,{
				params: {
					// voteid: 1,
					sort:sort,
					searchdata:search2,
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
		over_time() {
			this._get_data()
		},
		search_data(text) {
			console.log(text)
			this.tabindex = 0
			this._get_pro_data('ticket',null,text)
		},
		on_search_text(query) {
			this.search_text = query
			this.search_data(query)
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
				let title = 	l_storage.get('webname')
				let desc = 	l_storage.get('webdesc')
				let img = 	l_storage.get('webimg')
				k_wx_share(this, res.data.data,title,desc,img)
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
		  this._get_pro_data(this.count_tab,this.start_page);
		  this.$refs.scroll.$emit('infinitescroll.finishLoad'); 
		},
		goto(url) {
			this.$router.push({
				path: url
			})
		},
		goto_votedetail(id) {
			// window.location.href= 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx145f8a1b01e70740&redirect_uri=http://phptest.xsygood.com/vote/index.html%23/votedetail&response_type=code&state=' + id + '&scope=snsapi_base#wechat_redirect&connect_redirect=1'

			this.$router.push({
				path: `/votedetail?id=${id}`
			})
		},
		toggle_tab(index) {
			this.tabindex = index
			let type;
			if(index == 0) {type = 'ticket'}
			if(index == 1) {type = 'create_time'}
			if(index == 2) {type = 'click'}
			this.count_tab = type
			this.start_page = 1
			this._get_pro_data(type)
		},
		// 让图片加载完,在重新计算scroll的高度
		loadImage() {
		  if (!this.checkLoaded) {
		    this.checkLoaded = true
		    this.$refs.scroll.refresh()
		  }
		},
	},
	filters: {
	  no_null: function (val) {
	  	if(!val) {return 0}
	  }
	},
	components: {
		BScroll,Search,CountDown
	}
}
</script>

<style scoped lang="less">
@import url('../../common/less/index.less');




.showdata{
	display: flex;
	padding: 12px 0;
	.item{
		flex: 1;
		position: relative;
		text-align: center;
		.num{
			font-size: 24px;
		}
		&:nth-of-type(1), &:nth-of-type(2) {
			&::after{
				content: "";
				display: inline-block;
				width: 1px;
				height: 50%;
				// background: rgba(0, 0, 0, .3);
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
}

.baoming{
	margin: 8px;
	border-radius: 8px;
	overflow: hidden;
	.search_box{
		padding: 8px 0;
	}
	.time_box{
		display: flex;
		.activity {
			flex: 0 0 100px;
			width: 100px;
			text-align: center;
			padding: 6px 0;
			i {
				font-size: 28px;
			}
			div {
				font-size: 14px;
			}
		}
		.countdown {
			flex: 1;
			padding: 6px 0;
		}		
	}
	.btn_box{
			text-align: center;
		.baoming_btn{
			display: inline-block;
			margin: 16px auto 16px;
			padding: 6px 30px;
			border-radius: 6px;
			font-size: 16px;
		}
		.off {
			background: #ccc;
		}
	}
}
.index_tab{
	width: 100%;
	text-align: center;
	.item{
		display: inline-block;
		width: 80px;
		height: 32px;
		line-height: 32px;
	}
}
.pro_list_wrapper{
	display: flex;
	flex-wrap: wrap;
	padding: 6px;
	.item{
		flex: 0 0 50%;
		width: 50%;
		margin-bottom: 6px;
		padding: 4px;
		.img_box{
			position: relative;
			img{
				display:block;
				margin: 0;
				padding: 0;
			}
			.youhui{
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(0, 0, 0, .3);
				color: #fff;
				padding-left: 6px;
				font-size: 12px;
				padding:2px 8px;
				display: flex;
				.l {
					flex: 1;
					text-align: left;
				}
				.r {
					flex: 1;
					text-align: right;
				}
			}
		}
		.info_wrapp{
			background: #fff;
			text-align: center;
			padding-top: 4px;
			.info {
				text-align: left;
				font-size: 14px;
				display: flex;
				.title{
					flex: 1;
					padding-left: 4px;
					.ell();
				}
				.ticket{
					text-align: right;
					padding-right: 4px;
					flex: 0 0 50px;
					font-size: 14px;
				}
			}
			.site {
				text-align: left;
				font-size: 12px;
				text-indent: 6px;
				margin-top: 4px;
				height: 20px;
				width: 97%;
				overflow: hidden;
				.ell();
			}
			.btn{
				display: inline-block;
				text-align: center;
				width: 80%;
				padding-top: 2px;
				padding-bottom: 2px;
				border-radius: 6px;
				margin: 12px auto;
			}
		}
	}
}
.theme1{
	background: linear-gradient(left, #FF8F2B,#FF715B );
	padding-bottom: 8px;
	.theme1_btn{
		color: #fff;
		background: linear-gradient(left, #FF8F2B,#FF715B );
	}
	.activity{
		background: #f5f5f5;
	}
	.countdown{
		background: #f9f9f9;
	}
	.showdata{
		.item{
			.num{
				color: #fff;
			}
			.text{
				color: #fff;
			}
			&:nth-of-type(1), &:nth-of-type(2) {
				&::after{
					background: rgba(255, 255, 255, .5);
				}
			}
		}
	}
	.baoming{
		background: #fff;
		.time_box {
			.activity {
				color: #FF8F2B;
			}
		}
	}
	.index_tab{
		border-bottom: 1px solid rgba(255, 255, 255, .5);
		.item{
			color: #fff;
			&.border {
				border-bottom: 1px solid #fff;
			}
		}
	}
}

</style>
