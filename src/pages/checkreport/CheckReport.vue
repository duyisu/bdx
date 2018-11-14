
<template lang="html">
    <div id="checkReport">
        <!-- <img src="../../common/images/personalcenter/checkReportImg.jpg" > -->
        <img :src="imgurl" alt="检查报告图片">
    </div>
</template>

<script>
import http from '@common/js/http.js';
export default {
    data(){
        return {
            checkid:'',
            imgurl:''
        }
    },
    created(){
        if(this.$route.query){
            this.checkid = this.$route.query.checkid
        }
    },
    mounted(){
        this.$nextTick(()=>{

            this.getReport().then((res)=>{
                this.imgurl = res.url;
            }).catch((err)=>{
                
            }) 


            // let count = 0;
            // for(var i=0;i<res.length;i++){
            //  var oImg = new Image();
            //  oImg.src = res[i];

            //  oImg.onload = function(){
            //      count++;
            //      if(count == res.length){
            //          complete();
            //      }
            //  }

            //  oImg.onerror = function(){
            //      count++;
            //      if(count == res.length){
            //          complete();
            //      }
            //  }
            // }

            // function complete(){
            //  //完成后执行
            // }

        })
    },
    methods:{
        getReport(){
            return http.fetch('/api/user/instrument_report_detail',{
                id:this.checkid
            })
        }
    }
}
</script>

<style lang="less">
#checkReport img{
    width:100%;
}
</style>
