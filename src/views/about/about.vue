<template>
 <div class="about ab_full">
 <BScroll 	class="box_wrapper" ref="scroll" >
 <div>
		<div class="article_box">
		 <h1 class="title">about us title</h1>
		 <p class="p1">&nbsp;&nbsp;about us content...
		 </p>

		</div>

		<div class="content">
				<h4><i class="iconfont icon-ticket_fill"></i>主营：</h4>
				<p>{{scope}}</p>
				<h4><i class="iconfont icon-dizhi3"></i>地址：</h4>
				<p>{{map_data.site}}</p>
				<h4><i class="iconfont icon-peoplefill"></i>联系人：</h4>
				<p>{{contact}}</p>
				<h4><i class="iconfont icon-dianhua"></i>联系电话：</h4>
				<p><a :href="'tel:' + tel">{{tel}}</a></p>
				<h4><i class="iconfont icon-shouji"></i>电子邮箱：</h4>
				<p><a :href="'mailto:' + eamil">{{eamil}}</a></p>
		</div>

     <!-- map -->
    	<k_map 
    		:site="map_data.site"
    		:longitude = "map_data.longitude"
    		:latitude = "map_data.latitude"
    		:map_style = "map_data.map_style"
    	/>
 </div></BScroll>
 </div>
</template>
<script>
import BScroll from '@/components/base/scroll/scroll';
import k_map from '@/components/base/map/map';

export default {
  name: "about",
  data() {
    return {
      map_data: {
      	longitude: 114.016299, 	// 经度
      	latitude: 22.660434, 		// 纬度
      	site:'详细地址',
      	map_style: {
      			width: '100%',
      			height: '300px'
      	}
      },
      scope:"description",
      contact: 'username',
      tel : '0769-xxxxxxxx',
      eamil: 'xxxxxx@xx.com',
    };
  },
  created() {
    console.log(123);
  },
  components: {
    BScroll,k_map
  }
};
</script>

<style scoped lang="less">
@import url("../../common/less/index.less");
.article_box{
	background: #fff;
	padding: 12px;
	.p1{
		font-size: 16px;
		line-height: 26px;
		color: #777;
	}
}
.title{
	font-size: 22px;
	font-weight: 600;
	margin-bottom: 16px;
}
.time{
	font-size: 16px;
	margin-bottom: 14px;
}

.content{
	font-size: 16px;
	padding: 0 8px;
	h4{
		margin-top: 20px;
		margin-bottom: 8px;
		i{
			margin-right: 8px;
		}
	}
	p{
		text-indent: 20px;
		margin-bottom: 16px;
	}
}
</style>