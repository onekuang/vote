<template>
<div class="login2 ab_full">
<BScroll 	class="box_wrapper" ref="scroll" >
<div>

<div class="login_bg" style="padding-top: 55px;">
	<!-- <div class="img_box">
		<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540557274680&di=7998bc27e6c543fbd4261bbc4216c637&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F5d6034a85edf8db10896995d0223dd54564e744b.jpg" width="64" height="64">
	</div> -->

	<form @submit.prevent="onSubmit">
		<div class="form_box">
				<div class="item">
					<div class="label">名称：</div>
					<input type="text" name="username" v-model="form_data.username">
				</div>
				<div class="item">
					<div class="label">手机：</div>
					<input type="text" name="mobile" v-model="form_data.mobile" number>
					<div class="get_code hui_btn" style="color: #777;" v-show="!code_disabled" @click="get_code">获取</div>
					<div class="get_code hui_btn off" v-show="code_disabled">({{code_time}})</div>
				</div>
				<div class="item">
					<div class="label">验证码:</div>
					<input type="text" name="code" v-model="form_data.code">
				</div>
				<div class="item">
					<div class="label">地址：</div>
					<input type="text" name="site" v-model="form_data.site">
				</div>

				<div class="item" style="border-bottom: none;">
						<textarea name="textarea" rows="5" placeholder="请输入商家简介"v-model="form_data.textarea"></textarea>
				</div>
		</div>

		<div class="uploadimg_box">
			<label for="">图片上传</label>
			<input type="file" @change="upload($event)" style="display: none;" ref="upload" id='upload' accept="image/*">
			<div>
				<div class="item">
					
					<div class="add_img" @click="addPicFront" ><i class="iconfont icon-add1"></i></div>

					<div class="for_img" v-for="(item, index) in uploadimg" :key=index>
						<img :src="item.src" width="48" height="48">
						<span class="delx extend-click" @click="delete_img(index)">
							<i class="iconfont icon-icon-"></i>
						</span>
					</div>
					
					<div class="clearfix"></div>
				</div>
			</div>
		</div>

		<div class="btn_box" style="margin-top: 26px;">
			<button class="theme1_bg login_btn">
				点击确认
			</button>
		</div>
	</form>
</div>


</div></BScroll>
</div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll'
import { kk } from '@/common/js/k_form.js'
import { Url_param } from '@/common/js/util.js'
import { l_storage } from '@/common/js/storage.js'
import Exif from 'exif-js'  

var current_time = '';

export default {
	name:"login2",
	data() {
		return {
			uploadimg: [
				// {src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540557274680&di=7998bc27e6c543fbd4261bbc4216c637&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F5d6034a85edf8db10896995d0223dd54564e744b.jpg"},
				// {src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540557274680&di=7998bc27e6c543fbd4261bbc4216c637&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F5d6034a85edf8db10896995d0223dd54564e744b.jpg"}
			],
			code_time: 60,
			code_disabled: false,
			form_data:{},

			arvatar:'',
			picValue:'' ,
		}
	},
	created() {
	},
	methods: {
		onSubmit() {
			if(kk.is_null(this.form_data.username,this,'用户名不能为空')){return}
			if(kk.is_null(this.form_data.code,this,'验证码不能为空')){return}
			if(!kk.is_mobile(this.form_data.mobile,this)){return}
			if(kk.is_null(this.form_data.site,this,'地址不能为空')){return}
			if(kk.is_null(this.form_data.textarea,this,'简介不能为空')){return}
			this.send_data()
		},
		send_data() {
			this.axios.post(this.$api.baoming,{
				// voteid: 1,
				// user_token:l_storage.get('openid'),
				name: this.form_data.username,
				mobile: this.form_data.mobile,
				code: this.form_data.code,
				content: this.form_data.textarea,
				address:this.form_data.site,
				images:this.uploadimg,
			})
			.then(res => {
				if(res.data.code == 200) {
					this.$alert(res.data.msg).then(success => {
						this.$router.push({
							path: `/home`
						})
					})
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
		delete_img(index) {
			console.log("删除上传的图片")
			this.uploadimg.splice(index, 1)
		},
		// 点击添加图片
		addPicFront(e){
			if(this.uploadimg.length > 2) {
				this.$alert("图片最多上传3张")
				return
			}
			e.preventDefault();
			this.$refs.upload.click();
			return false;
		},
		upload (e) {  
	    let files = e.target.files || e.dataTransfer.files;  
	    if (!files.length) return;  
	    this.picValue = files[0];  
	    this.imgPreview(this.picValue);  
	  },

	  imgPreview (file) {  
	    let self = this;  
	    let Orientation;  
	    //去获取拍照时的信息，解决拍出来的照片旋转问题  
	    Exif.getData(file, function(){  
	        Orientation = Exif.getTag(this, 'Orientation');  
	    });  
	    // 看支持不支持FileReader  
	    if (!file || !window.FileReader) return;  
	
	    if (/^image/.test(file.type)) {  
	        // 创建一个reader  
	        let reader = new FileReader();  
	        // 将图片2将转成 base64 格式  
	        reader.readAsDataURL(file);  
	        // 读取成功后的回调  
	        reader.onloadend = function () {  
	          let result = this.result;  
	          let img = new Image();  
	          img.src = result;  
	          //判断图片是否大于100K,是就直接上传，反之压缩图片  
	          if (this.result.length <= (100 * 1024)) {  
	            self.arvatar = this.result;  
	            self.postImg(self.arvatar);  
	          }else {  
	            img.onload = function () {  
	              let data = self.compress(img,Orientation);  
	              self.arvatar = data;  
	              self.postImg(self.arvatar);  
	            }  
	          }  
	        }   
	      }  
	  },  
    postImg (img) {  
      //这里写接口  
      // console.log(img)
      // console.log(this)
      this._up_img(img)
    },  
    rotateImg (img, direction,canvas) {  
      //最小与最大旋转方向，图片旋转4次后回到原方向      
      const min_step = 0;      
      const max_step = 3;        
      if (img == null)return;      
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错      
      let height = img.height;      
      let width = img.width;        
      let step = 2;      
      if (step == null) {      
          step = min_step;      
      }      
      if (direction == 'right') {      
          step++;      
          //旋转到原位置，即超过最大值      
          step > max_step && (step = min_step);      
      } else {      
          step--;      
          step < min_step && (step = max_step);      
      }       
      //旋转角度以弧度值为参数      
      let degree = step * 90 * Math.PI / 180;      
      let ctx = canvas.getContext('2d');      
      switch (step) {      
        case 0:      
            canvas.width = width;      
            canvas.height = height;      
            ctx.drawImage(img, 0, 0);      
            break;      
        case 1:      
            canvas.width = height;      
            canvas.height = width;      
            ctx.rotate(degree);      
            ctx.drawImage(img, 0, -height);      
            break;      
        case 2:      
            canvas.width = width;      
            canvas.height = height;      
            ctx.rotate(degree);      
            ctx.drawImage(img, -width, -height);      
            break;      
        case 3:      
            canvas.width = height;      
            canvas.height = width;      
            ctx.rotate(degree);      
            ctx.drawImage(img, -width, 0);      
            break;  
      }      
  	},  
	  compress(img,Orientation) {  
	    let canvas = document.createElement("canvas");  
	    let ctx = canvas.getContext('2d');  
	      //瓦片canvas  
	    let tCanvas = document.createElement("canvas");  
	    let tctx = tCanvas.getContext("2d");  
	    let initSize = img.src.length;  
	    let width = img.width;  
	    let height = img.height;  
	    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下  
	    let ratio;  
	    if ((ratio = width * height / 4000000) > 1) {  
	      console.log("大于400万像素")  
	      ratio = Math.sqrt(ratio);  
	      width /= ratio;  
	      height /= ratio;  
	    } else {  
	      ratio = 1;  
	    }  
	    canvas.width = width;  
	    canvas.height = height;  
			// 铺底色  
	    ctx.fillStyle = "#fff";  
	    ctx.fillRect(0, 0, canvas.width, canvas.height);  
	    //如果图片像素大于100万则使用瓦片绘制  
	    let count;  
	    if ((count = width * height / 1000000) > 1) {  
	      console.log("超过100W像素");  
	      count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片  
				// 计算每块瓦片的宽和高  
	      let nw = ~~(width / count);  
	      let nh = ~~(height / count);  
	      tCanvas.width = nw;  
	      tCanvas.height = nh;  
	      for (let i = 0; i < count; i++) {  
	        for (let j = 0; j < count; j++) {  
	          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);  
	          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);  
	        }  
	      }  
	    } else {  
	      ctx.drawImage(img, 0, 0, width, height);  
	    }  
	    //修复ios上传图片的时候 被旋转的问题  
	    if(Orientation != "" && Orientation != 1){  
	      switch(Orientation){  
	        case 6://需要顺时针（向左）90度旋转  
	            this.rotateImg(img,'left',canvas);  
	            break;  
	        case 8://需要逆时针（向右）90度旋转  
	            this.rotateImg(img,'right',canvas);  
	            break;  
	        case 3://需要180度旋转  
	            this.rotateImg(img,'right',canvas);//转两次  
	            this.rotateImg(img,'right',canvas);  
	            break;  
	      }  
	    }  
	    //进行最小压缩  
	    let ndata = canvas.toDataURL('image/jpeg', 0.1);  
	    console.log('压缩前：' + initSize);  
	    console.log('压缩后：' + ndata.length);  
	    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");  
	    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;  
	    return ndata;  
	  }, 
	  // 验证码状态
		get_code() {
			if(this.code_disabled){
				return
			}

			if(!kk.is_mobile(this.form_data.mobile,this)){return}

			this._start_code_time();
			this.verify_code();
		},
		// 获取验证码
		verify_code() {
			

			this.axios.get(this.$api.get_code,{
				params: {
					mobile: this.form_data.mobile,
					type : 1
				}
			})
			.then(res => {
				this.$toast(res.data.msg)
			})
			.catch(res => {
				this.$toast("网络错误")
			})
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
	  // 头像上传
	  _up_img(dataimg) {
	  	let obj = {src: dataimg}
	  	this.uploadimg.push(obj)
	  	// this.axios.post(api.edit_avatar,{
	  	// 	sessionID  : s_storage.get('sessionID'),
	  	// 	base64Data :dataimg
	  	// })
	  	// .then(res => {
	  	// 	console.log(res.data)
	  	// })
	  	// .catch(res => {
	  	// 	this.$toast("网络错误")
	  	// })
	  }
	},
	components: {
		BScroll
	}
}
</script>

<style scoped lang="less">
@import url('../../common/less/index.less');
.theme1_bg{
	background: linear-gradient(left, #FF8F2B,#FF715B );
}

.login2 {
	.login_bg{
		height: 700px;
		background-image: url(./login2bg.jpg);
		background-size: 100% 250px;
		background-repeat: no-repeat;
		text-align: center;
		.login_btn{
			display: inline-block;
			border-radius: 18px;
			padding: 6px 60px;
			color: #fff;
		}
		.img_box{
			margin-top: 40px;
			border-radius: 50%;
			line-height: 80px;
			height: 80px;
			width: 80px;
			border: 1px solid #fff;
			display: inline-block;
			text-align: center;
			img{
				margin-top: 8px;
				border-radius: 50%;
			}
		}

		.form_box {
			background: #fff;
			width: 70%;
			border-radius: 8px;
			padding: 12px 8px 0px;
			margin: 30px auto 0;
			border: 1px solid #eee;
			.item{
				display: flex;
				padding-bottom: 6px;
				border-bottom: 1px solid #eee;
				margin-bottom: 14px;
				.label {
					color: #aaa;
					font-size: 12px;
					flex: 0 0 40px;
				}
				input {
					flex: 1;
				}
				textarea {
					width: 100%;
					border-color: #eee;
					background: #f5f5f5;
				}
				.get_code{
					flex: 0 0 50px;
					width: 50px;
					border-radius: 4px;
					color: #777;
					&.off {
						color: #ccc;
					}
				}
			}
			margin-bottom: 8px;
		}
	}
@media (device-height:568px) and (-webkit-min-device-pixel-ratio:2){/* 兼容iphone5 */
	.form_box {
		.item{
			input {
				flex: 0 0 100px;
				width: 100px;
			}
		}
	}
}
	


	.uploadimg_box{
		width: 70%;
		margin: 0 auto;
		text-align: left;
		label {
			color: #aaa;
			font-size: 12px;
		}
		.item {
			.for_img{
				float: left;	
				margin-right: 14px;
				position: relative;
				margin-bottom: 12px;
				img {
					border-radius: 2px;
				}
				.delx{
					display: inline-block;
					width: 16px;
					height: 16px;
					position: absolute;
					right: -8px;
					top: -8px;
					background: #f44336;
					border-radius: 50%;
					text-align: center;
					line-height: 16px;
					i {
						color: #fff;
						font-size: 12px;
					}
				}
			}
			
			.add_img{
				height: 48px;
				width: 48px;
				float: left;
				margin-right: 14px;
				text-align: center;
				border: 1px dashed #eee;
				i {
					line-height: 48px;
					font-size: 32px;
					color: #eee;
				}
			}
		}
	}
}
</style>
