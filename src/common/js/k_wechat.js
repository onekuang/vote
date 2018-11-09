// import { k_wx_login } from '@/common/js/k_wachat.js'
import { l_storage } from '@/common/js/storage.js'

// 判断是否授权
export function k_is_login(vm) {
	let openid = l_storage.get('openid')
	if(openid) {
		return true
	}else{
		return false
	}
}
// 微信登录跳转授权
export function k_wx_accredit(vm) {
	vm.axios.get(vm.$api.wachet_login,{
	})
	.then(res => {
			window.location.href = res.data.data
	})
	.catch(res => {
		vm.$toast("网络错误")
	})
}

export function k_wx_login(vm) {
	console.log(12)
};

// 微信支付
export function k_wx_pay(vm, config,goods_id) {
	var WX = vm.$wx
	WX.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: config.appId, // 必填，公众号的唯一标识
    timestamp: config.timeStamp, // 必填，生成签名的时间戳
    nonceStr: config.nonceStr, // 必填，生成签名的随机串
    signature: config.signature, // 必填，签名，见附录1
    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    // jsApiList: ['getBrandWCPayRequest'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	WX.ready(function(){
    WX.chooseWXPay({
      timestamp: config.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: config.nonceStr, // 支付签名随机串，不长于 32 位
      // package: 'prepay_id=' + packages, 
      package: config.package, 
      // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: config.paySign, // 支付签名
      success: function(res) {
        // 支付成功后的回调函数
        if(res.errMsg == "chooseWXPay:ok" ) {
        	console.log('支付成功')
        	// this.$alert("支付成功").then(success => {
        	// 	this.$router.push({
        	// 		path: `/home`
        	// 	})
        	// })
           // vm.$router.push({
           // 	path: `/votedetail?id=${goods_id}`
           // })
        }
      },
      fail:function(res){
        console.log(res)
      }
    });
  });
  WX.error(function(res) {
  	console.log('config失败')
  	console.log(res)
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    alert("config信息验证失败");
  });
}
export function k_wx_share(vm,data,title,desc,img) {
  var WX = vm.$wx
  var wxTitle = title
  var wxDescription = desc
  var _url = window.location.href + "?voteid=" +l_storage.get('voteid')
  var _img = img
  WX.config({
    dubug: false,
    appId: data.appId,
    timestamp: data.timeStamp,
    nonceStr: data.nonceStr,
    signature: data.signature,
    jsApiList: [
      'onMenuShareAppMessage','onMenuShareTimeline'
    ]
  })
  WX.ready(function() {
    WX.onMenuShareAppMessage({
      title: wxTitle,// 分享标题
      desc :wxDescription, // 分享描述
      link: _url, // 分享链接
      imgUrl: _img, // 分享图标
      success: function () {
        console.log("成功分享给朋友")
      },
      cancel: function () {
        console.log("您取消了分享")
      }

    });
    WX.onMenuShareTimeline({
    	title: wxTitle,// 分享标题
      desc :wxDescription, // 分享描述
      link: _url, // 分享链接
      imgUrl: _img, // 分享图标
    	success: function() {
        console.log("成功分享到朋友圈")
    	},
    	cancel: function() {
        console.log("您取消了分享")
    	}

    });
  })
}