<template>
  <div class="user_info_box_wrapper">
    <div class='user_info_box'>
            <div class='left_box'>
              <div>等级</div>
              <div class='text'><i class="iconfont icon-crownfill"></i> 普通会员</div>
              <div class='shengji'>如何升级</div>
            </div>


            <div class='right_box' >
            
              <div>代理</div>
              <div><i class="iconfont icon-leijishouru"></i> 区代</div>
              <div class='shengji'>如何升级</div>
            </div>
            
            <div class="userinfo-avatar">
              <!-- <img src="" width="80" height="80"> -->
              <img v-holder="'img=80x80?&bg=C7E1FF&text=80x80'">
            </div>

            <div class='user_info_nickname'>
              <p>username</p>
              <!-- <div style="font-size:12px;">我的推荐人:username</div> -->
            </div>
            <div class='user_info_tab'>
              <div class='item'>
                <p>直推数量</p>
                <p>123元</p>
              </div>
              <div class='item'>
                <p>团队数量</p>
                <p>123元</p>
              </div>
              <div class='item'>
                <p>直推奖励</p>
                <p>123元</p> 
              </div>
              <div class='item'>
                <p>等待领取</p>
                <p>123元</p>
              </div>              
            </div>            
          </div> 
  </div>
</template>
<style scoped lang="less">
@import url("../../common/less/index.less");
.user_info_box {
  text-align: center;
  height: 250px;
  padding-top: 40px;
  /* background: #50B3E4; */
  /* background: url(http://image1.sansancloud.com/jianzhan/2017_09/24/16/07/23_193.jpg); */
  background: linear-gradient(#55b4fe, #0f95ff);
  /* background: linear-gradient(#FA4660,#fd2145); */
  position: relative;
}
.user_info_avatar {
  width: 80px;
  height: 80px;
  display: inline-block;
  border-radius: 50%;
  border: 1px solid #eee;
}
.user_info_nickname {
  color: #fff;
  font-size: 18px;
}
.userinfo-avatar {
  overflow: hidden;
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}
.userinfo text {
  /* color: #fff; */
  font-size: 14px;
  background-color: #c0c0c0;
  border-radius: 40%;
}
.left_box {
  position: absolute;
  color: #f3e55f;
  font-size: 14px;
  left: 6%;
  top: 25%;
}
.left_box .shengji,
.right_box .shengji {
  margin-top: 4px;
  display: inline-block;
  padding: 4px 8px;
  border: 1px solid #fff;
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
}
.right_box {
  position: absolute;
  right: 6%;
  top: 25%;
  color: #f3e55f;
  font-size: 14px;
}
.right_box .iconfont,
.left_box .iconfont {
  color: #f3e55f;
  font-size: 18px;
}
.text {
  color: #f3e55f;
}
.user_info_tab {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
  z-index: 3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: small;
  color: #fff;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  .item {
    flex: 1;
    color: rgba(255, 255, 255, 0.95);
    border-right: 1px solid rgba(255, 255, 255, 0.7);
    &:last-of-type {
      border-right: none;
    }
  }
}
</style>
