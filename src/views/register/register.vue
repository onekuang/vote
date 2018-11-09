<template>
<div class="sign ab_full">
<BScroll 	class="box_wrapper" ref="scroll" >
<div>
	<!-- <div class="logo_box">
		<img v-holder="'img=98x98?&bg=C7E1FF&text=LOGO'" class='logo'>
	</div> -->

	<form @submit.prevent="onSubmit">
		<div class="register_box">
			<div class="username_box">
				<div class="item">设置姓名:</div>
				<div class="item">
					<input type="text" name="username" placeholder="请输入您的姓名" v-model="form_data.username">
				</div>
			</div>
			<div class="username_box">
				<div class="item">设置密码:</div>
				<div class="item">
					<input type="password" name="password1" placeholder="请输入您的密码" v-model="form_data.password1">
				</div>
			</div>
			<div class="username_box">
				<div class="item">重复密码:</div>
				<div class="item">
					<input type="password" name="password2" placeholder="请重复您的密码" v-model="form_data.password2">
				</div>
			</div>
			<div class="khr"></div>
			<div class="new_mobile_box">
				<div class="item">绑定手机:</div>
				<div class="item">
					<input type="text" class="new_mobile" name="new_phone" placeholder="请输入新手机号码" v-model="form_data.new_phone" number>
				</div>
				<div class="get_code on" v-show="!code_disabled" @click="get_code">获取验证码</div>			
				<div class="get_code off" v-show="code_disabled" >已发送({{code_time}})</span>
				</div>			
			</div>
			<div class="code_box">
				<div class="item ">验 证 码:</div>
				<div class="item">
					<input type="text" class="code" name="code" placeholder="请输入手机验证码" v-model="form_data.code" number>
				</div>
			</div>
		</div>
		<div class="khr"></div>
		<div class="btn_box" style="margin-top: 30px;">
			<button class="theme_btn" type="submit">确认注册</button>
		</div>
	</form>
		<div class="btn_box" style="margin-top: 16px;">
			<button class="theme_btn" @click="goto_login">返回登录</button>
		</div>
</div></BScroll>
</div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll'
import { kk } from '@/common/js/k_form.js'
var current_time = '';
export default {
	name:"sign",
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
			if(!kk.is_username(this.form_data.username,this)){return}
			if(!kk.is_password(this.form_data.password1,this)){return}
			if(this.form_data.password1 != this.form_data.password2 ){
				this.$toast('两次密码不一致');
			}
			if(!kk.is_mobile(this.form_data.new_phone,this)){return}
			if(kk.is_null(this.form_data.code,this)){return}
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
		},
		// 返回登录页面
		goto_login() {
			this.$router.push({
				path: `/login`
			})
		}
	},
	components: {
		BScroll
	}
}
</script>

<style scoped lang="less">
@import url('../../common/less/index.less');
.sign{
	.logo_box{
		text-align: center;
		.logo {
		  width: 98px;
		  height: 98px;
		  margin: 32px auto 24px;
		}
	}	
}
.register_box {
	
	input {
		height: 100%;
		width: 100%;
		font-size: 18px;
	}
	.username_box {
		border-top: 1px solid #eee;
	}
	.username_box, .new_mobile_box, .code_box {
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
				flex: 0 0 100px;
				width: 100px;
				font-size: 18px;
				text-indent: 6px;
				// color: #666;
				letter-spacing: 1px;
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
