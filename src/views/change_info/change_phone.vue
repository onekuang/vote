<template>
<div class="testvue ab_full">
<BScroll 	class="box_wrapper" ref="scroll" >
<div>

<form @submit.prevent="onSubmit">
	<div class="chang_mobile_box">
		<div class="old_mobile_box">
			<div class="item">原号码:</div>
			<div class="item">
				<input type="text" name="old_phone" class="old_mobile" placeholder="请输入原绑定号码" v-model="form_data.old_phone" number>
			</div>
		</div>
		<div class="new_mobile_box">
			<div class="item">新号码:</div>
			<div class="item">
				<input type="text" class="new_mobile" name="new_phone" placeholder="请输入新手机号码" v-model="form_data.new_phone" number>
			</div>
			<div class="get_code on" v-show="!code_disabled" @click="get_code">获取验证码</div>			
			<div class="get_code off" v-show="code_disabled" >已发送({{code_time}})</span>
			</div>			
		</div>
		<div class="code_box">
			<div class="item ">验证码:</div>
			<div class="item">
				<input type="text" class="code" name="code" placeholder="请输入手机验证码" v-model="form_data.code" number>
			</div>
		</div>
	</div>
	<div class="khr"></div>
	<div class="btn_box" style="margin-top: 30px;">
		<button class="theme_btn" type="submit">确认修改</button>
	</div>
</form>





</div></BScroll>
</div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll'
import { kk } from '@/common/js/k_form.js'
var current_time = '';
export default {
	name:"change_phone",
	data() {
		return {
			code_time: 60,
			code_disabled: false,
			form_data:{}
		}
	},
	methods: {

		// 监听表单提交
		onSubmit(e) {
			// 过滤字段
			if(!kk.is_mobile(this.form_data.old_phone,this)){return}
			if(!kk.is_mobile(this.form_data.new_phone,this)){return}
			if(kk.is_null(this.form_data.code,this)){return}
			if(this.form_data.old_phone == this.form_data.new_phone){
				this.$toast('新旧手机不能一样');
			}
			// 调用请求函数
			this.send_request()
		},
		// 发送请求
		send_request() {
			console.log(this.form_data)
		},
		// 获取验证码
		get_code() {
			if(this.code_disabled){
				return
			}
			this._start_code_time();
		},
		// 验证码开始倒计时
		_start_code_time() {
			let that = this
			this.code_disabled = true
			current_time = window.setInterval(() => {
				that.code_time --
				if(that.code_time <= 0) {
					that._stop_code_time()
				}
			},1000)
		},
		// 验证码结束倒计时
		_stop_code_time() {
			if (current_time) {
				clearInterval(current_time)
				this.code_time = 60
				this.code_disabled = false
			}
		}
	},
	components: {
		BScroll
	}
}
</script>

<style scoped lang="less">
@import url('../../common/less/index.less');
.chang_mobile_box {
	input {
		height: 100%;
		width: 100%;
		font-size: 18px;
	}
	.old_mobile_box {
		border-top: 1px solid #eee;
	}
	.old_mobile_box, .new_mobile_box, .code_box {
		box-sizing: border-box;
		display: flex;
		border-bottom: 1px solid #eee;
		padding-top: 8px;
		padding-bottom: 8px;
		height: 50px;
		line-height: 34px;
		.item{
			flex: 1;
			&:nth-of-type(1) {
				flex: 0 0 80px;
				width: 80px;
				font-size: 18px;
				text-indent: 6px;
			}
		}
		.get_code {
			padding: 0 12px;
			border-left: 1px solid #eee;
		}
		.on{
			color: @color_shen;
		}
		.off {
			color: #ccc;
		}
	}

}
</style>
