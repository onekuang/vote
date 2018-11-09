<template>
<div class="login ab_full">
<BScroll 	class="box_wrapper" ref="scroll" style="background:transparent;">
<div>
	<div class= "login_container">
	  <!-- <img src='@/assets/img/logo.png' class='logo'> -->
		<img v-holder="'img=98x98?&bg=C7E1FF&text=LOGO'" class='logo'>

	  <form class='form' @submit.prevent="onSubmit">
	    <div class='input_box'>
	      <img src='http://image1.sansancloud.com/taoditongzhuang/2017_04/05/12/39/10_629.jpg'>
	      <input name="username"  placeholder="手机号" v-model="form_data.username">
	    </div>

	    <div class='input_box'>
	      <img src='http://image1.sansancloud.com/taoditongzhuang/2017_04/05/12/39/09_710.jpg'>
	      <input name="password" type='password' placeholder="密码" v-model="form_data.password">
	    </div>
			
			<div class="btn_box">
	    	<button class='theme_btn login_btn' type="submit">登录</button>
	    </div>	    
	 </form>

	 		<!-- 注册类 -->
	 		<div class="register_type_1" v-if="sign_type == 1">
	 		<div class="sign_box">
	 			<div class="sign1 pull-left">没有帐号?<span @click="goto_sign">点击注册</span></div>
	 			<div class="forget_password pull-right" @click="goto_forget_password">找回密码</div>
	 			<div class="clearfix"></div>
	 		</div>
			</div>
			
	 		<div class="register_type_2" v-if="sign_type == 2">
		 		<div class="btn_box" v-if="sign_type == 2">
		 			<button class='theme_btn sign_btn' @click="goto_sign">注册</button>
		 		</div>
		 		<div class="sign_box" v-if="sign_type == 2">
		 			<div class="forget_password pull-right" @click="goto_forget_password">找回密码</div>
		 			<div class="clearfix"></div>
		 		</div>
	 		</div>

	  
	</div>



</div></BScroll>
</div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll'
import { kk } from '@/common/js/k_form.js'
export default {
	name:"login",
	data() {
		return {
			sign_type: 1, // 配置注册的样式
			form_data:{}
		}
	},
	methods: {
		onSubmit() {
			// 过滤字段
			if(kk.is_null(this.form_data.username,this,'用户名不能为空')){return}
			if(kk.is_null(this.form_data.password,this,'密码不能为空')){return}
			this.send_request();
		},
		// 登录请求
		send_request() {
			console.log(this.form_data)
		},
		// 跳转到注册页面
		goto_sign() {
			this.$router.push({
				path: `/register`
			})
		},
		goto_forget_password() {
			this.$router.push({
				path: `/findPassword`
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
.login{
	background-size: 100% 100%;
	background-image: url(http://image1.sansancloud.com/taoditongzhuang/2017_04/05/12/20/51_422.jpg);
}
.login_container {
  text-align: center;
  .logo {
    width: 98px;
    height: 98px;
    margin: 32px auto 24px;
  }
  .form {
    width: 100%;
    .input_box {
        position: relative;
        width: 100%;
        height: 65px;
        border-bottom: 1px solid #dddddd;
        display: flex;
        flex-direction: row;
    }
    img {
    	position: absolute;
    	left: 20px;
    	top: 21px;
    	width: 25px;
    	height: 25px;
    }
    input {
			height: 100%;
			font-size: 14px;
			padding-left: 80px;
			width: 70%;
			background: transparent;
    }
  }
  .login_btn{
  	margin: 18px 0 14px;
  }

  // 注册样式1
  .sign_box{
  	padding: 0 16px;
  	height: 20px;
  	line-height: 20px;
  	.sign1{
			span{
				color: @color_shen;
				margin-left: 6px;
			}
  	}
  	.forget_password {
  		color: @color_shen
  	}
  }
}

</style>
