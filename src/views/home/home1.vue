<template>
  <div class="home ab_full">
    
    

    <BScroll class="box_wrapper" ref="scroll"><div>
    <!-- 轮播图 -->
    <swipe
      v-model="index"
      style="text-align: center;height: 230px;"
      :autoplayTime = autoplayTime
    >
      <swipe-item>
        <img src="http://tp5test.cms.sppcms.com/img/banner1.jpg" width="100%">
      </swipe-item>
      <swipe-item>
        <img src="http://tp5test.cms.sppcms.com/img/banner1.jpg" width="100%">
      </swipe-item>
      <swipe-item>
        <img src="http://tp5test.cms.sppcms.com/img/banner1.jpg" width="100%">
      </swipe-item>
    </swipe>
    
    <!-- 菜单组件 -->
    <HomeMenu :lists=c_grid_data></HomeMenu>

    <div class="khr"></div>
    <p class="p1">test color base1</p>
    <p class="p2">test color qian</p>
    <p class="p3">test color shen</p>
    <p class="p4">test color liang</p>
    <p class="p5">test color an</p>
    <p class="p6">test color hui</p>
    <p class="p7">test color hui</p>
    <p class="p8">test color hui</p>
    <p class="p9">test color hui</p>



    <!-- 产品图 -->
    <div class='pro_box'>
      <div class='item blue'>
        <div class='img_box'>
          <img src='http://tp5test.cms.sppcms.com/img/yuan1.jpg'>
        </div>
        <div class='text_box'>
          <div class='title'>无需手术</div>
          <div class='desc'>
            摆脱手术药物治疗的痛苦，减少对人体的二次伤害，实现家庭式物理化治疗。
          </div>
        </div>
      </div>
      <div class='item blue'>
        <div class='img_box'>
          <img src='http://tp5test.cms.sppcms.com/img/yuan2.jpg'>
        </div>
        <div class='text_box'>
          <div class='title'>针对性强</div>
          <div class='desc'>
            以旋磁的方式，形成强大的能量场，针对糖尿病、糖尿病并发症有显著效果。对26种慢性代谢类疾病有预防和治疗的效果。
          </div>
        </div>
      </div>
      <div class='item blue' @click="test">
        <div class='img_box'>
          <img src='http://tp5test.cms.sppcms.com/img/yuan3.jpg'>
        </div>
        <div class='text_box'>
          <div class='title'>效果显著</div>
          <div class='desc'>
            一次就可以看到血糖的变化，3-7天明显能感觉到仪器对身体的作用及效果，3-6个月恢复胰岛功能。
          </div>
        </div>
      </div>
    </div>
    
    

    

  </div></BScroll>

  </div>
</template>

<script>
import BScroll from '@/components/base/scroll/scroll';
import HomeMenu from '@/components/home_menu/home_menu';
import api from '@/assets/api/api';
export default {
  name: "home",
  data() {
    return {
      red:"red",
      dot_num: "Hot",
      index: 0, // two way
      autoplayTime: 3000
    };
  },
  created() {
    this.test();
  },
  methods: {
    
    test() {

      let arr = ['00','11'];

      let res = Math.floor(Math.random() * (arr.length ));

      console.log(arr[res]);

    },
    tt() {
      this.axios.get(api.test,{
        params: {
          id: 31
        }
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(res => {
        this.$toast("网络错误")
      })
    }
  },
  computed: {
    c_grid_data() {
      let that = this;
      return [
        {
          id: 1,
          title: "title",
          icon: "icon-home1",
          fn: that.fff
        },
        {
          id: 2,
          title: "title",
          icon: "icon-home1",
          dot_text: this.dot_num,
          url: "/"
        },
        {
          id: 3,
          title: "title",
          icon: "icon-home1",
          url: "/"
        },
        {
          id: 4,
          title: "title",
          icon: "icon-home1",
          url: "/about"
        },
      ];
    }
  },
  components: {
    BScroll,HomeMenu
  }
};
</script>

<style scoped lang="less">
@import url("../../common/less/index.less");
.home {
}

.pro_box{
  /* background: #62CF76; */
  width: 90%;  
  margin: 0 auto;
}
.pro_box .item{
  /* background: #fff; */
  color: #fff;
  display: flex;
  border-radius: 12px;
  margin-top: 16px;
  margin-bottom: 16px;
  height: 160px;
}
.pro_box .item .img_box{
  flex: 1;
  padding: 8px;
}
.pro_box .item .img_box img{
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-top: 10px;
}
.pro_box .item .text_box{
  flex: 2;
  padding: 8px;
}
.pro_box .item .text_box .title{
  font-size: 16px;
  display: inline-block;
  min-width: 50%;
  border-bottom: 1px solid #fff;
  padding-bottom: 8px;
  margin-bottom: 10px;
  margin-top: 16px;
}
.pro_box .item .text_box .desc{
  font-size: 12px;
}
.blue{
  background: @jianbian;
}
.p1{ color: @color_base; }
.p2{ color: @color_qian; }
.p3{ color: @color_shen; }
.p4{ color: @color_liang; }
.p5{ color: @color_an; }
.p7{ color: @color_01; }
.p8{ color: @color_02; }
.p9{ color: @color_03; }
</style>
