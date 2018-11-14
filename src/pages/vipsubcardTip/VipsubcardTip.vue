<template lang="html">
    <div class="vipsubcardTip">
        <div class="img"><img src="../../common/images/card/opensucess.png" alt=""></div>
        <h2>副卡开通成功</h2>
        <p>TA看诊，我付款</p>
        <div class="btn" @click='toShareStatu = true'>告诉  TA</div>
        <div class="btn" style="margin-top:.3rem;" @click='to_card_list'>关闭</div>
        <div class="invite_share_tip" v-if='toShareStatu'>
            <img class="img1" src="../../common/images/invite/know.png" alt="" @click='toShareStatu = false'>
            <img class="img3" src="../../common/images/invite/share_row.png" alt="">
            <img class="img2" src="../../common/images/invite/share_text.png" alt="">
        </div>
    </div>
</template>
<script>
    import {baseUrl} from '@common/js/config';
    import wxShare from '@common/js/wxapi';
    export default{
        mounted(){
           
            let params = {
                title: this.$route.query.mainCardName+'为您开通了家庭会员副卡，确认领取', 
                desc: '', 
                link: baseUrl+'m/#/reciveCard?id='+this.$route.query.card_id +'&mainCardName='+this.$route.query.mainCardName,
                img: 'http://bdx.bdxdoctor.com/m/static/img/logo.png',
            }
            wxShare.share(params);
        },
        data(){
            return{
              
                toShareStatu:false

            }
        },
        methods:{
            to_card_list(){
                this.$router.push({
                    path:'/vipcardlist',
                    query:{
                        type:9
                    }
                })
            }
        }
    }
</script>
<style lang='less'>
    .vipsubcardTip{
        .invite_share_tip{
            position: fixed;
            display: block;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background:rgba(0,0,0,.7);
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
        width: 100%;
        height: 100%;
        background: #f2f2f2;
        padding-top: .7rem;
        .img{
            width: 1.2rem;
            height: 1.2rem;
            margin:0 auto;
            img{
                display: block;
                width: 100%;
            }
        }
        h2{
            font-size:.36rem;
            color:#48cdbb;
            font-weight:normal;
            text-align:center;
            margin:.35rem 0;
        }
        p{
            font-size:.26rem;
            color:#b3b3b3;
            text-align:center;
        }
        .btn{
            width: 2.77rem;
            height: .8rem;
            border-radius: .4rem;
            border: solid .02rem #48cdbb;
            font-size:.32rem;
            color:#48cdbb;
            line-height:.8rem;
            text-align:center;
            margin:0 auto;
            margin-top: 1.3rem;
        }
    }
    
</style>