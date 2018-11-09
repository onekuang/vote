<template id="child-map">
  <div id="map" :style="map_style">
    
  </div>
</template>

<script>
  export default{
    props: {
      site: {
        type: String,
        default: '地点'
      },
      // 经度
      longitude: { 
        type: Number,
      },
      // 纬度
      latitude: {  
        type: Number,
      },
      map_style: {
        type: Object,
        default: function() {
          return {
            width:'100%',
            height:'350px'
          }
        }
      }
    },
    mounted(){
      var self = this
      var map = new BMap.Map("map");          // 创建地图实例  
      var point = new BMap.Point(self.longitude,self.latitude);  // 创建点坐标  
      map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别 
      map.enableScrollWheelZoom(false);     //开启鼠标滚轮缩放
      var marker = new BMap.Marker(point);  // 创建标注
      map.addOverlay(marker);               // 将标注添加到地图中
      marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      map.setCurrentCity("深圳");
      var opts = {    
        width : 200,     // 信息窗口宽度    
        height: 20,     // 信息窗口高度    
        title : "地址:"  // 信息窗口标题   
      }    
      var infoWindow = new BMap.InfoWindow(self.site, opts);  // 创建信息窗口对象    
      map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口
    }
  }
</script>