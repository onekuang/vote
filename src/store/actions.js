import * as types from './mutation-types.js'

export const test = function({commit},{name}) {
    commit(SET_CART, name)
}
export const test2 = function({commit,state},{name,index}) {
    console.log(arguments)
    console.log(index)
}