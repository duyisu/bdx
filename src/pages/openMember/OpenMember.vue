<template lang="html">
    <div class="openMember">
        <div class="invite_from" v-if='share'>您好友<span>{{name}}</span>已是北斗星会员，邀请您加入享特权 </div>
        <div class="memberCard owl-carousel">
            <div class="item">
                <input type="text" value="person">
                <img src="../../common/images/opencard/personal_card@2x.png" alt="">
                <span>{{personal_price}}元/年</span>
            </div>
            <div class="item">
                <input type="text" value="family">
                <img src="../../common/images/opencard/family_card@2x.png" alt="">
                <span>{{family_price}}元/年</span>
            </div>
        </div>
        <div class="memberContent">
            <div class="member_privilege">
                <h2 class="title">会员特权<span @click='vip_privilege(0)'>特权明细</span></h2>
                <ul class="clearfix">
                    <li v-for='item in privilege' :class="item.tag" v-if='!(item.text_person == "" && activeType == 8)'>
                        
                        <img  v-if='activeType == 9' :src='item.img_family' alt="">
                        <img  v-if='activeType == 8' :src='item.img_person' alt="">
                        <span v-if='activeType == 8'>{{item.text_person}}</span>
                        <span v-if='activeType == 9'>{{item.text_family}}</span>
                    </li>
                </ul>
                <div class="to_open" @click='toOpen'><span v-if='statu'>{{price}}</span>  {{clickStatu}}</div>
                <p class="open_tip">开通即视为同意<span  @click='vip_privilege(1)'>《北斗星儿童医院会员协议》</span></p>
            </div>
            <!-- 会员评论 -->
            <memberEvalution :memberList='comments.recommends' :commentNum='comments.count'></memberEvalution>

        </div>
        
    </div>    
</template>

<script>
import { baseUrl,host } from '@common/js/config';
import { Toast } from 'vux'
import http from '@common/js/http.js';
import MemberEvalution from '@components/memberEvalution/MemberEvalution';
import { getStore,setStore,changePageTitle,setCookie,saveCookie} from '@common/js/mUtils';
import {s_getIndexInfo} from '@service/service';
export default {
   
    data(){
        return { 
            privilege:[ 
               {
                   tag:'li_1',
                   text_person:'受益人 1人',
                   text_family:'受益人 4人',
                   img_family:require('../../common/images/opencard/family/li_1.png'),
                   img_person:require('../../common/images/opencard/personal/li_1.png')
               },{
                   tag:'li_2',
                   text_person:'名医诊号预约',
                   text_family:'名医诊号预约',
                   img_family:require('../../common/images/opencard/family/li_2.png'),
                   img_person:require('../../common/images/opencard/personal/li_2.png')
               },{
                   tag:'li_3',
                   text_person:'会员挂号优惠',
                   text_family:'会员挂号优惠',
                   img_family:require('../../common/images/opencard/family/li_3.png'),
                   img_person:require('../../common/images/opencard/personal/li_3.png')
               },{
                   tag:'li_4',
                   text_person:'儿童健康档案',
                   text_family:'门诊治疗 9折',
                   img_family:require('../../common/images/opencard/family/li_4.png'),
                   img_person:require('../../common/images/opencard/personal/li_4.png')
               },{
                   tag:'li_5',
                   text_person:'免费停车 1小时',
                   text_family:'儿童健康档案',
                   img_family:require('../../common/images/opencard/family/li_5.png'),
                   img_person:require('../../common/images/opencard/personal/li_5.png')
               },{
                   tag:'li_6',
                   text_person:'会员免费咨询',
                   text_family:'免费停车 1小时',
                   img_family:require('../../common/images/opencard/family/li_6.png'),
                   img_person:require('../../common/images/opencard/personal/li_6.png')
               },{
                   tag:'li_7',
                   text_person:'儿童体检一份',
                   text_family:'会员免费咨询',
                   img_family:require('../../common/images/opencard/family/li_7.png'),
                   img_person:require('../../common/images/opencard/personal/li_7.png')
               },{
                   tag:'li_8',
                   text_person:'名医看诊资格',
                   text_family:'名医看诊资格',
                   img_family:require('../../common/images/opencard/family/li_8.png'),
                   img_person:require('../../common/images/opencard/personal/li_8.png')
               },{
                   tag:'li_9',
                   text_person:'免费亲子活动',
                   text_family:'儿童体检两份',
                   img_family:require('../../common/images/opencard/family/li_9.png'),
                   img_person:require('../../common/images/opencard/personal/li_9.png')
               },{
                   tag:'li_10',
                   text_person:'',
                   text_family:'洁牙 1 次',
                   img_family:require('../../common/images/opencard/family/li_10.png'),
                   img_person:''
               },{
                   tag:'li_11',
                   text_person:'',
                   text_family:'眼部 SPA1次',
                   img_family:require('../../common/images/opencard/family/li_11.png'),
                   img_person:''
               },{
                   tag:'li_12',
                   text_person:'',
                   text_family:'免费亲子活动',
                   img_family:require('../../common/images/opencard/family/li_12.png'),
                   img_person:''
               }
            ],
            comments:{},
            price:'',
            card_type:8,
            personal_price:500,
            family_price:1000,
            clickStatu:'立即开通',
            statu:true,
            activeType:8,
            inviter:'',
            name:'',
            share:false,
            card_type_statu:''
        }
    },
    mounted(){
        changePageTitle('开通会员');
        this.memberCardTogger();
        this.getHomeInfo();
        this.setPrice();
        if(this.$route.query && this.$route.query.statu == 'toactive'){
            this.clickStatu = '立即激活';

            this.statu = false;
        }
        if(this.$route.query.inviter && this.$route.query.inviter != ''){
            this.inviter = this.$route.query.inviter;
            this.name = this.$route.query.name;
            this.share = true;
            http.fetch('api/invite/bind',{inviter:this.$route.query.inviter}).then((res)=>{
                
            })
        }
    },
    methods:{
        memberCardTogger(){
            var that = this
            $('.memberCard').owlCarousel({
                center: true,
                items:1.3,
                loop:false,
                margin:20,
                dots:false,
                lazyLoad: true,
                onDragged: afterMove
            });
            function afterMove(){
                $('.memberCard .item').each(function(){
                    if($(this).parent().hasClass('center')){
                        that.card_type_statu = $(this).children('input').val();

                        that.price = $(this).children('span').text();
                        if(that.card_type_statu == 'person'){
                            that.activeType = 8
                        }else if(that.card_type_statu == 'family'){
                            that.activeType = 9
                        }
                    }
                })
            }
        },
        getHomeInfo(){
            s_getIndexInfo({

            }).then(res =>{
                this.comments = res.comments;
            })

        },
        toOpen(){
            
            if(this.card_type_statu == 'person'){
                this.card_type = 8;
            }else if(this.card_type_statu == 'family'){
                this.card_type = 9;
            }

            if(this.$route.query.statu == 'toactive'){
                this.$router.push({
                    path:'/openPersonalCard',
                    query:{
                        card_type:this.card_type,
                        price:this.price,
                        statu:'bind'

                    }
                })
            }else if(this.$route.query.statu == 'buy'){
                this.$router.push({
                    path:'/openPersonalCard',
                    query:{
                        card_type:this.card_type,
                        price:this.price,
                        statu:'buy'

                    }
                })
            }
            
        },
        setPrice(){
            var that = this;
            $('.memberCard .item').each(function(){
                if($(this).parent().hasClass('center')){
                    that.price = $(this).children('span').text();
                }
            })
        },
        vip_privilege(int){
            this.$router.push({
                path:'/vipPrivilege',
                query:{
                    card_type:this.activeType,
                    int:int
                }
            })
        }
        
    },
    components:{
        Toast,
        MemberEvalution
    }
}
</script>

<style lang="less">
    .openMember{
        
        .invite_from{
            width: 6.32rem;
            height: .7rem;
            border-radius: .35rem;
            box-shadow: 0 0 .27rem 0 rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
            margin:0 auto;
            text-align:center;
            line-height:.7rem;
            font-size:.26rem;
            color:#5a5a5a;
            margin-top: .2rem;
            span{
                color:#48cdbb;
            }
        }
        .memberCard{
            padding-top: .25rem;
            .center .item{
                height: 3.7rem;
                
            }
            .item{
                position: relative;
                
                input{
                    opacity: 0;
                    display: block;
                    width: 0;
                    height: 0;
                }
                img{
                    display: block;
                    height: 100%;
                }
                span{
                    position: absolute;
                    top: .3rem;
                    left: .2rem;
                    display: block;
                    width: 1.68rem;
                    height: .54rem;
                    border-radius:.06rem;
                    background: rgba(0,0,0,.3);
                    text-align:center;
                    line-height:.54rem;
                    color:#fff;
                    font-size:.24rem;
                    letter-spacing:.02rem;
                }
            }
        }
        .memberContent{
            position: relative;
            z-index: 999;
            padding-bottom: .6rem;
            margin-top: -1.2rem;
            background-color:transparent;
            background-image: url('../../common/images/opencard/bg_1.png');
            background-size: 100% auto;
            background-repeat: no-repeat;
            background-position: left top;
            .member_privilege{
                padding-top:1.1rem;
                .title{
                    position: relative;
                    font-size:.36rem;
                    color:#333;
                    text-align:center;
                    margin-bottom:.38rem;
                    span{
                        position: absolute;
                        right: .3rem;
                        top: .04rem;
                        font-size:.26rem;
                        color:#48cdbb;
                        font-weight:normal;
                    }
                }
                ul{
                    padding:0 .3rem;
                    li{
                        float: left;
                        width: 2.12rem;
                        height: 1.85rem;
                        box-shadow: -0.017rem -0.025rem .238rem 0.002rem rgba(0, 0, 0, 0.11);
                        margin-left: .27rem;
                        border-radius:.1rem;
                        margin-bottom:.25rem;
                       position: relative;
                        span{
                            display: block;
                            text-align:center;
                            width: 100%;
                            font-size:.26rem;
                            color:#898989;
                            position: absolute;
                            left: 0;
                            bottom: .25rem;
                        }
                        img{
                            display: block;
                            width: 100%;
                        }
                    }
                    li:nth-child(3n-2){margin-left: 0;}
                }
                .to_open{
                    width: 6.64rem;
                    height: .79rem;
                    margin:0 auto;
                    line-height:.79rem;
                    text-align:center;
                    color:#fff;
                    background: #48cdbb;
                    font-size:.32rem;
                    letter-spacing:.032rem;
                    border-radius:.395rem;
                    margin-top:.08rem
                }
                .open_tip{
                    font-size:.26rem;
                    color:#5a5a5a;
                    letter-spacing:.026rem;
                    text-align:center;
                    margin-top: .3rem;
                    margin-bottom: .38rem;
                    span{
                        color:#48cdbb;
                    }
                }
            }
            .comment .hd{
                width: 6.9rem;
                margin:0 auto;
            }
        }
        
    }

</style>
