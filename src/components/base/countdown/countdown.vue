<template>
	<div class="count_down_wrapper">
		<div class="text_box">
		 <i class="iconfont icon-countdown"></i>	{{text}}
		</div>
		<div class="time">
			<span>{{c_day}}</span>天
			<span>{{c_hour}}</span>时
			<span>{{c_mimute}}</span>分
			<span>{{c_second}}</span>秒
		</div>
	</div>
</template>
<script>
	export default {
		props: {
		  text: {
		    type: String,
		    default: '距离活动结束还有'
		  },
		  end_time: {
		    type: Number,
		    default: 1540656000000
		  }
		},
		data() {
			return {
				nowtime: new Date().getTime(),
				endtime: this.end_time
			}
		},
		mounted() {
			let that = this
			if(parseInt(this.nowtime) >= parseInt(this.endtime)) {
				this.endtime = 0
				that._overtime()
				return
			}
			this.countdown();
		},
		methods: {
			countdown: function() {
				let that = this
				var counttime = setInterval(() => {
					if(parseInt(this.nowtime) >= parseInt(this.endtime)) {
						window.clearInterval(counttime)
						this.endtime = 0
						that._overtime()
						return
					}else{
						this.endtime = this.endtime - 1000
					}
				},1000)
			},
			is_endtiem() {
				if(this.endtime == 0) {
					return true
				}else{
					return false
				}
			},
			// 结束计时时,派发
			_overtime() {
				this.$emit('overtime')
			}
		},
		computed: {
			c_day: function() {
				if(this.is_endtiem()) {
					return "00";
				}
				var nowtime = this.nowtime
				// var endtime = new Date(this.endtime)
				// var time    = endtime - nowtime;
				// var endtime = new Date(this.endtime)
				var time    = this.endtime - nowtime;
				var day     = parseInt(time / 1000 / 60 / 60 / 24);
				if(day < 10) {
					return '0' + day
				}else {
					return day;
				}
			},
			c_hour: function () {
				if(this.is_endtiem()) {
					return "00";
				}
				var nowtime = this.nowtime
				var time    = this.endtime - nowtime;
				// var endtime = new Date(this.endtime)
				// var time    = endtime - nowtime;
				var hour    = parseInt(time / 1000 / 60 / 60  % 24);
				if(hour < 10) {
					return '0' + hour
				}else {
					return hour;
				}
		  },
		  c_mimute: function () {
		  	if(this.is_endtiem()) {
		  		return "00";
		  	}
				// var nowtime = this.nowtime
				// var endtime = new Date(this.endtime)
				var nowtime = this.nowtime
				var time    = this.endtime - nowtime;
				var mimute  = parseInt(time / 1000 / 60 % 60);
				if(mimute < 10) {
					return '0' + mimute
				}else {
					return mimute;
				}
		  },
		  c_second: function () {
		  	if(this.is_endtiem()) {
		  		return "00";
		  	}
				var nowtime = this.nowtime
				var time    = this.endtime - nowtime;
				var second  = parseInt(time / 1000 % 60);
				if(second < 10) {
					return '0' + second
				}else {
					return second;
				}
		  },
		},
		watch: {
			end_time(n, o) {
				this.endtime = n
				this.countdown();
			}
		}
	}
</script>
<style scoped lang="less">
.count_down_wrapper{
	.text_box{
		text-align: center;
		font-size: 16px;
	}
	.time {
		text-align: center;
		font-size: 14px;
		margin-top: 6px;
		span {
			font-size: 24px;
			margin-left: 8px;
			margin-right: 4px;
		}
	}
}
</style>