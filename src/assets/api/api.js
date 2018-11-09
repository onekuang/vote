// var baseUrl = 'http://localhost/shopping/public/index.php';
// var baseUrl = 'http://192.168.4.119';
// var baseUrl = 'http://phptest.xsygood.com';
var baseUrl = 'http://vote.xsygood.com';

var api = {
	base_img 			: '/',
	test 					: '/api/Tools/Upload',

	// ===== 首页 ======
	is_login 			: "/api/User/isLogin",
	index_data		: '/api/Vote/VoteInfo',
	pro_list 			: '/api/Vote/ApplyList',

	// ===== 详情 =====
	goods_detaile : '/api/Vote/ApplyInfo',	
	// 评论列表
	comment_list 	: '/api/Vote/CommentList',
	// 提交评论
	comment_post 	: '/api/Vote/CommentPost',
	// 投票
	ticketpost 		: '/api/Vote/TicketPost',
	// 礼物列表
	gift_list 		: '/api/Vote/GiftList',




	// ===== 报名页面 =====
	// 获取验证码
	get_code 			: '/api/Tools/sendSms',
	baoming 			: '/api/Vote/ApplyPost',

	// ====== 微信 ======
	// 
	// 获取跳转授权的地址
	wachet_login	: '/api/User/Login',
	// 微信支付
	wxpay 				: '/api/Mall/OrderPay',
	// 微信分享
	wxshare 			: '/api/Weixin/JsSdkConfig',
}

for(var i in api ) {
	api[i] = baseUrl + api[i]
}

export default api;