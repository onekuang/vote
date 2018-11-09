<template>
<!-- <div class="k-article ab_full"> -->
<div class="k-article">
<!-- <BScroll 	class="box_wrapper" ref="scroll" > -->
<!-- <div> -->

	<div class="article_box">
		<div v-html=huodong_data></div>
	</div>


<!-- </div></BScroll> -->
</div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll';
import api from '@/assets/api/api.js'
export default {
	name:"k_article1",
	data() {
		return {
			id:'',
			huodong_data: '',
		}
	},
	created() {
		this._getdata()
	},
	// watch: {
	// 	huodong_data: function () {
	// 		setTimeout(() => {
	// 			if (!this.checkLoaded) {
	// 			  this.checkLoaded = true
	// 			  this.$refs.scroll.refresh()
	// 			}
	// 		},1000)
	// 	}
	// },
	methods: {
		_getdata() {
			this.axios.get(this.$api.index_data,{
				params: {
					// voteid: 1
				}
			})
			.then(res => {
				this.huodong_data = res.data.data.prizecontent
			})
			.catch(res => {
				this.$toast("网络错误")
			})
		}
	},
	filters: {
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
		BScroll
	}
}
</script>

<style lang="less">
@import url('../../common/less/config.less');
.k-article{
	padding: 8px;
	padding-bottom: @footer_height;
	html,body,p,h1,h2,h3,h4,h5,h6{
		padding: 0;
		margin: 0;
	}
	.article_box{
		background: #fff;
		padding: 2px;
		img{
			max-width: 100% !important;
		}
	}
	.title{
		font-size: 24px;
		font-weight: 600;
		margin-bottom: 16px;
	}
	.time{
		font-size: 14px;
		color: #666;
		margin-bottom: 14px;
	}
	.content{
		text-indent: 1em;
		font-size: 18px;
		img{
			max-width: 100% !important;
		}
	}
	a {
	  color: #7e8c8d;
	  -webkit-backface-visibility: hidden;
	  text-decoration: none;
	}
}

</style>
