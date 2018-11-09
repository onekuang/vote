<template>
  <div class="k_across_tab_wrapper">
    <div class="k_across_tab">
      <div 
        class="k_grid_cell" 
        v-for="(item, index) in lists" 
        :key="index"
        @click=click_item(item)
      >
        <i class="iconfont" 
          :class=item.icon 
          :style="{
            color: item.icon_color ? item.icon_color : icon_color, 
            fontSize: item.icon_size ? item.icon_size  : icon_size
          }">  
        </i>

        <p :style="{color:item.text_color ? item.text_color : text_color, 
          fontSize: item.text_size ? item.text_size : text_size}">
          {{item.title}}
        </p>

        <!-- 角标 -->
        <span class="dot" 
          v-if="item.dot"
          :style="{background: item.dot_bg ? item.dot_bg : dot_bg, 
            color: item.dot_text_color ? item.dot_text_color : dot_text_color}"
        >
          {{item.dot_text}}
        </span>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    lists: {
      type: Array
    },
    icon_color: {
      type: String,
      default: "rgb(129, 101, 101)"
    },
    icon_size: {
      type: String,
      default: "20px"
    },
    text_color: {
      type: String,
      default: "rgb(129, 101, 101)"
    },
    text_size: {
      type: String,
      default: "12px"
    },
    dot_bg: {
      type: String,
      default: "#e64340"
    },
    dot_text_color: {
      type: String,
      default: "#fff"
    }
  },
  methods: {
    click_item(data) {
      if (data.url) {
        this.$router.push({
          path: data.url
        });
      } else if (data.fn) {
        let fn = data.fn;
        fn();
      } else {
        console.warn("宫格组件传递的数据参数里,必须含有url 或者 fn");
      }
    }
  }
};
</script>
<style scoped lang="less">
@import url("../../common/less/index.less");
.k_across_tab {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  .k_grid_cell {
    flex: 1;
    position: relative;
    box-sizing: border-box;
    padding: 4px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: xx-small;
    border-right: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
    i {
      // font-size: 24px;
      // color: rgb(129, 101, 101);
    }
    .dot {
      display: inline-block;
      padding: 0.15em 0.4em;
      min-width: 8px;
      border-radius: 18px;
      background-color: #e64340;
      color: #fff;
      line-height: 1.2;
      text-align: center;
      font-size: 12px;
      vertical-align: middle;
      position: absolute;
      top: 2px;
      right: 10px;
    }
  }
}
</style>
