export const kk = {
	is_username: function(text, vue) {
		if(!text){
			vue.$toast('用户名不能为空');return false;
		}
		if(this.checkSpecificKey(text, vue)){
			return false;
		}
		return true
	},
	is_mobile: function (num, vue) {
		if(!num || !/^[1][3,4,5,7,8][0-9]{9}$/.test(num) ){
			vue.$toast("请输入正确手机号")
			return false
		}else{
			return true
		}
	},
	is_password: function(val, vue) {
		if(!val || val.length < 6 || val.length > 18){
			vue.$toast('密码不能小于6位数');
			return false
		}else{
			return true
		}
	},
	is_null: function(val, vue, msg) {
		if(!val) {
			let text = msg ? msg : "字段不能为空"
			vue.$toast(text);
			return true
		}else{
			return false
		}
	},
	// 检查是否有特殊符号
	checkSpecificKey: function (keyCode, vue) {  
	    var specialKey = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
	    if(specialKey.test(keyCode)){
	    	vue.$toast('不能含有特殊字符');
	    	return true
	    }else{
	    	return false
	    }
	},

	//检测字符串
	//checkType('165226226326','phone')
	//result：false
	checkType: function(str, type) {
    switch (type) {
      case 'email':
          return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      case 'phone':
          return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
      case 'tel':
          return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      case 'number':
          return /^[0-9]$/.test(str);
      case 'english':
          return /^[a-zA-Z]+$/.test(str);
      case 'text':
          return /^\w+$/.test(str);
      case 'chinese':
          return /^[\u4E00-\u9FA5]+$/.test(str);
      case 'lower':
          return /^[a-z]+$/.test(str);
      case 'upper':
          return /^[A-Z]+$/.test(str);
      default:
          return true;
    }
	},

	//cookie
	//设置cookie
	setCookie: function(name, value, iDay) {
	    var oDate = new Date();
	    oDate.setDate(oDate.getDate() + iDay);
	    document.cookie = name + '=' + value + ';expires=' + oDate;
	},
	//获取cookie
	getCookie: function(name) {
	    var arr = document.cookie.split('; ');
	    for (var i = 0; i < arr.length; i++) {
	        var arr2 = arr[i].split('=');
	        if (arr2[0] == name) {
	            return arr2[1];
	        }
	    }
	    return '';
	},
	//删除cookie
	removeCookie: function(name) {
	    this.setCookie(name, 1, -1);
	},


	// ======================
	is_login: function(sessionID,vue) {
		if(!sessionID){
			vue.$toast('请先登录')
			vue.$router.push({
				path: '/login'
			})
		}
	}
}
