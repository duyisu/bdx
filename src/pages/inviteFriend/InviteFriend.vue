<template lang="html">
    <div class="inviteFriend">
        <div class="info" @click='recordLink'>已成功邀请<span>{{info.num}}</span>人成为会员，得到<span>{{info.money}}</span>元奖励<img src="../../common/images/right.png" alt="" style="width:.14rem;margin-left:.08rem;"></div>
        <div class="btn" @click='invite_share' ><img src="../../common/images/invite/btn.png" alt=""></div>
        <div class="invite_share_tip" v-if='invite_share_tip'>
            <img class="img1" src="../../common/images/invite/know.png" alt="" @click='invite_share_tip = false'>
            <img class="img3" src="../../common/images/invite/share_row.png" alt="">
            <img class="img2" src="../../common/images/invite/share_text.png" alt="">
        </div>
    </div>
</template>
<script>
    import { changePageTitle,setStore,getStore,removeStore } from '@common/js/mUtils';
    import http from '@common/js/http.js';
    import {baseUrl} from '@common/js/config';
    import wxShare from '@common/js/wxapi';
    export default{
        mounted(){
            changePageTitle('邀请好友');
            http.fetch('api/invite/index').then((res)=>{
                this.info = res;
                this.inviter = res.inviter;
                this.name = res.name;

                let params = {
                    title: res.name+'邀请你开通北斗星会员卡',
                    desc: '北斗星会员卡开通', 
                    link: baseUrl+'m/#/openMember?name='+encodeURIComponent(res.name) +'&inviter='+encodeURIComponent(res.inviter)+'&statu=buy',
                    img:'http://bdx.bdxdoctor.com/m/static/img/invite_img.jpg',
                }
              
                wxShare.share(params);
                
            }).catch((arr)=>{

            })
           

        },
        data(){
            return{
                info:[],
                inviter:'',
                invite_share_tip:false,
                name:''
            }
        },
        methods:{
           recordLink(){
              this.$router.push({
                path:'/inviteRecord'
              })
           },
           invite_share() {
                let name = this.name;
                let inviter = this.inviter;
                this.invite_share_tip = true;
                // let params = {
                //     title: name+'邀请你开通北斗星会员卡',
                //     desc: '北斗星会员卡开通', 
                //     link: baseUrl+'m/#/openMember?name='+name +'&inviter='+inviter+'&statu=buy',
                //     img:'http://bdx.bdxdoctor.com/m/static/img/logo.png',
                // }
              
                // wxShare.share(params);
                
           }
        }
    }
</script>
<style lang='less'>
    .inviteFriend{
        .invite_share_tip{
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            background:rgba(0,0,0,.7);
            img{
                position: absolute;
                display: block;
            }
            .img1{
                width: 2.05rem;
                left: 50%;
                margin-left: -1.025rem;
                top: 5rem;
            }
            .img2{
                width: 3rem;
                left:50%;
                margin-left: -1.5rem;
                top:2rem;
            }
            .img3{
                width: 2rem;
                top: 0;
                right: .4rem;
            }
        }
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url('../../common/images/invite/index_bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .info{
            position: absolute;
            left: .3rem;
            top: .3rem;
            width: 5.85rem;
            height: .58rem;
            line-height:.58rem;
            text-align:center;
            border-radius: .29rem;
            box-shadow: 0px .02rem .307rem .013rem rgba(140, 3, 13, 0.46);
            color:#ffeb50;
            font-size:.26rem;
            span{
                color:#fff;
            }
        }
        .btn{
            position: absolute;
            left: 50%;
            margin-left: -2.48rem;
            bottom: .8rem;
            width: 4.96rem;
            img{
                display: block;
                width: 100%;
            }
        }
    }
</style>