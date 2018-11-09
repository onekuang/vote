<template>
  <div class="search-box">
    <i class="iconfont icon-search" :style="{color: iconcolor}" 
      @click='search'></i>
    <input class="box" v-model='query' :placeholder='placeholder'>
    <i v-show='query' @click='clear' class="iconfont icon-close"></i>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
    iconcolor: {
      type: String,
      default: '#666'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(query) {
      this.query = query
    },
    search() {
      this.$emit('search')
    }
  },
  created() {
    this.$watch('query', (newQuery) => {
      this.$emit('query', newQuery)
    })
  }
}
</script>

<style scoped lang="less">
.search-box{
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background: #fff;
  border-radius: 2px;
  .icon-search{
  	font-size: 24px;
  	color: #666;
  }    
  .box{
  	flex: 1;
  	margin: 0 5px;
  	height: 35px;
  	line-height: 18px;
  	background: #fff;
  	color: #000;
  	font-size: 14px;
    border: none;
    padding-left: 12px;
  	&::placeholder{
  		color: #666;
  		padding-left: 12px;
  	}  	  
  }
  .icon-close{
  	font-size: 16px;
  	color: #666;
  }   
}
</style>
