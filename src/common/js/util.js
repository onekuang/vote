function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// 定时器,调用后会清除定时器
// let test = debounce(fn,1000)
// test();
export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 检测数组是否存在某个值
export function arrHasValue(v, arr) {
    var output = false;
    for (var i in arr) {
        if (v == arr[i]) {
            output = true;
            return output;
        }
    }
    output = false;
    return output;
}
// var arrs = ['1','2','3'];　　   
// console.log(arrHasValue(1,arrs)); //true


export function UrlSearch() {
  var name,value; 

  var str=location.href; //取得整个地址栏
  var num=str.indexOf("?") 
  str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

  var arr=str.split("&"); //各个参数放到数组里
  
  for(var i=0;i < arr.length;i++){ 
    num=arr[i].indexOf("="); 
    if(num>0){ 
      name=arr[i].substring(0,num);
      value=arr[i].substr(num+1);
      this[name]=value;
    } 
  } 
}
// var Request = new UrlSearch(); //实例化
// let code    = Request.code || '';
// let state   = Request.state || '';