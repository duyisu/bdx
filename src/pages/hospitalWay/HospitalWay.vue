<template lang="html">
    <div id="map-container" class="amap-hospital"> </div>
</template>

<script>
//[114.312468, 30.567709]
import { changePageTitle } from '@common/js/mUtils'
import AMap from 'AMap'
 var map
 export default {
    mounted: function () {
        changePageTitle('来院路线');
        this.init()
    },
    methods: {
        init: function () {
            var content = [
                "<div class='tipsInfo'><h3>北斗星儿童医院（武汉院区）</h3>",
                "<p>地址 : 武汉市武昌区和平大道219号白云边大厦附楼1-5层</p></div>"
            ];
            map = new AMap.Map('map-container', {
                center: [114.312468, 30.567709],
                zoom: 14,
                resizeEnable: true
            })
            var marker = new AMap.Marker({
                position: [114.312468, 30.567709]
                // label: {
                //     offset: new AMap.Pixel(-140, -40),//修改label相对于maker的位置
                //     content: "<div>北斗星耳鼻喉医院（武汉院区）<br/>地址:武汉市武昌区和平大道219号白云边大厦附楼1-5层"
                // },
                // title: '武汉市武昌区和平大道219号白云边大厦附楼1-5层'
            });
            map.add(marker);
            marker.on('click',function(e){
               marker.markOnAMAP({
                   name:'北斗星儿童医院',
                   position:marker.getPosition()
               })
            })
            var infoWindow = new AMap.InfoWindow({
                content: content.join("")
            });

            // 打开信息窗体
            infoWindow.open(map, map.getCenter());

            map.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
                map.addControl(new AMap.ToolBar())
                map.addControl(new AMap.Scale())
            })
        }
    }
 }
</script>

<style lang="less">
.amap-hospital {
    width: 7.5rem;
    height: 14rem;
}
.amap-info div{
    bottom: 30px !important;
}
</style>
