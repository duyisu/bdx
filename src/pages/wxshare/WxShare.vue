<template lang="html">
    <div class="wxshare">
        <div class="bootPage" v-if='bootPage'>
            <img class="img1" src="../../common/images/invite/know.png" alt="">
            <img class="img3" src="../../common/images/invite/share_row.png" alt="">
            <img class="img2" src="../../common/images/invite/share_text.png" alt="">
        </div>
    </div>
</template>
<script>
import http from '@common/js/http.js';
import { baseUrl,host } from '@common/js/config';
import { changePageTitle,getStore } from '@common/js/mUtils';
import wxshare from '@common/js/wxapi';
    export default{
        mounted(){
            //this.$route.query.mainCardName+'
            //?id='+this.$route.query.id +'&mainCardName='+this.$route.query.mainCardName
            let params = {
                title: '为您开通了家庭会员副卡，确认领取', 
                desc: '', 
                link: baseUrl+'m/#/reciveCard',
                imgUrl: '',
            }
            wxshare.invite(params);
        },
        data(){
            return{
                bootPage:true
            }
        }
    }
</script>
<style lang='less'> 
    .wxshare{
        .bootPage{
            position: fixed;
            left: 0;
            top: 0;
            display: block;
            width: 100%;
            height: 100%;
            background:rgba(0,0,0,.7);
            z-index: 999;
            img{
                position: absolute;
                display: block;
            }
            .img1{
                width: 2.05rem;
                left: 50%;
                margin-left: -1.025rem;
                top: 7rem;
            }
            .img2{
                width: 4.23rem;
                left:50%;
                margin-left: -2.115rem;
                top:3.7rem;
            }
            .img3{
                width: 2rem;
                top: 0;
                right: .4rem;
            }
        }
    }
</style>