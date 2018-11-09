// mutation.js
// import  * as types from "./mutation-types";

const mutations = {

    ////////////////////
    // === 购物车 === //
    ///////////////////
    
    // 写入
	SET_CART(state, data) {
		state.shoppingCart = data;
	},
    // 加入商品到购物车
    ADD_CART(state, data) {

    	let has_obj = false
        /* 如果数据为空,直接新增条商品对象加入购物车数组 */
    	if(state.shoppingCart.length == 0) {
    		state.shoppingCart.push(data)
    		return
    	}
        /* 过滤,如果该商品已在购物车,只增加数量 */
    	state.shoppingCart.forEach((item, index) => {
			  if(item.id == data.id) {
			  	item.count = item.count + 1
			  	has_obj = true
			  }
		})
        /* 否则新增一个商品对象 */		
    	if(!has_obj){
    		state.shoppingCart.push(data)
    	}
    },
    // 清空购物车数据
    CLEAR_CART_DATA(state) {
    	state.shoppingCart.forEach((food) => {
    		food.count = 0; 
    	})
    	state.shoppingCart = [];
    },
    // 单个商品数量自增
    ADD_ONE_GOODS(state,index) {
    	let item = state.shoppingCart[index];
    	if(!item.count) {
    		item.count = 1
    	}else{
    		item.count ++;
    	}
    },
    // 单个商品数量自减
    DECREASE_ONE_GOODS(state,index) {
    	let item = state.shoppingCart[index];
    	if(item.count) {
    		item.count --
    		//如果数量为0时, 删除购物车的该商品
    		if(item.count ==0) {
    		 state.shoppingCart.splice(index,1)
    		}
    	}
    },
    // 购物列表里,删除所选商品
    DELETE_CHECK_GOODS(state,indexArr) {
        let data = state.shoppingCart;

        for (var i = indexArr.length - 1; i >= 0; i--) {
            let j = indexArr[i];
            delete data[j]
        }

        state.shoppingCart = [];
        data.forEach((item,index) => {
            if(item) {
                state.shoppingCart.push(item)
            }
        });
    },

    ////////////////////
    //=== 选中的商品===//
    ////////////////////
    
    // 写入
    SET_CHECKGOODS(state,data) {
        state.checkGoods = data
    },
    // 清空
    CLEAR_CHECKGOODS(state) {
        state.checkGoods = []
    }
}

export default mutations