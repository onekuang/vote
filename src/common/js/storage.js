// sessionStorage关闭页面或浏览器后被清除
var s_storage = (function s_storage(){
    var ms = "mystorage";
    // var storage=window.localStorage;
    // if(!window.localStorage){
    //     alert("浏览器支持localstorage");
    //     return false;
    // }
    var storage=window.sessionStorage;
    if(!window.sessionStorage){
        alert("浏览器支持sessionStorage");
        return false;
    }

    var set = function(key,value){
        //存储
        var mydata = storage.getItem(ms);
        if(!mydata){
            this.init();
            mydata = storage.getItem(ms);
        }
        mydata = JSON.parse(mydata);
        mydata.data[key] = value;
        storage.setItem(ms,JSON.stringify(mydata));
        return mydata.data;

    };

    var get = function(key){
        //读取
        var mydata = storage.getItem(ms);
        if(!mydata){
            return false;
        }
        mydata = JSON.parse(mydata);

        return mydata.data[key];
    };

    var remove = function(key){
        //读取
        var mydata = storage.getItem(ms);
        if(!mydata){
            return false;
        }

        mydata = JSON.parse(mydata);
        delete mydata.data[key];
        storage.setItem(ms,JSON.stringify(mydata));
        return mydata.data;
    };

    var clear = function(){
        //清除对象
        storage.removeItem(ms);
    };

    var init = function(){
        storage.setItem(ms,'{"data":{}}');
    };

    return {
        set : set,
        get : get,
        remove : remove,
        init : init,
        clear : clear
    };



})();

// localStorage永久
var l_storage = (function l_storage(){
    var ms = "mystorage";
    // var storage=window.localStorage;
    // if(!window.localStorage){
    //     alert("浏览器支持localstorage");
    //     return false;
    // }
    var storage=window.localStorage;
    if(!window.localStorage){
        alert("浏览器支持localStorage");
        return false;
    }

    var set = function(key,value){
        //存储
        var mydata = storage.getItem(ms);
        if(!mydata){
            this.init();
            mydata = storage.getItem(ms);
        }
        mydata = JSON.parse(mydata);
        mydata.data[key] = value;
        storage.setItem(ms,JSON.stringify(mydata));
        return mydata.data;

    };

    var get = function(key){
        //读取
        var mydata = storage.getItem(ms);
        if(!mydata){
            return false;
        }
        mydata = JSON.parse(mydata);

        return mydata.data[key];
    };

    var remove = function(key){
        //读取
        var mydata = storage.getItem(ms);
        if(!mydata){
            return false;
        }

        mydata = JSON.parse(mydata);
        delete mydata.data[key];
        storage.setItem(ms,JSON.stringify(mydata));
        return mydata.data;
    };

    var clear = function(){
        //清除对象
        storage.removeItem(ms);
    };

    var init = function(){
        storage.setItem(ms,'{"data":{}}');
    };

    return {
        set : set,
        get : get,
        remove : remove,
        init : init,
        clear : clear
    };



})();

export { s_storage , l_storage}
// import { s_storage } from '@/common/js/storage.js'
// mystorage.set('tqtest','tqtestcontent');//存储
// mystorage.set('tqtest1','tqtestcontent1');//存储
// mystorage.set('tqtest1','newtqtestcontent1');//修改
// mystorage.get('tqtest');//读取
// mystorage.remove('tqtest');//删除
// mystorage.clear();//整体清除
