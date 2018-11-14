<template lang="html">
    <div class="openMember">
        <div class="memberCard">
            <div class="time_tip">个人会员专享  {{grant_card_time_after_one_month}} 结束  </div>
            <div class="item update">
                <img src="../../common/images/opencard/family_card@2x.png" alt="">
                <span>{{price}}元/年</span>
            </div>
        </div>
        <div class="memberContent">
            <div class="member_privilege">
                <h2 class="title">会员特权<span>特权明细</span></h2>
                <ul class="clearfix">
                    <li v-for='item in privilege' :class='item.tag'>
                        <i></i>
                        <span>{{item.text_family}}</span>
                    </li>
                </ul>
                <!-- <h2 class="quanyi">如何使用权益</h2>
                <div class="quanyi_img"><img src="../../common/images/opencard/use.png" alt=""></div> -->
                <div class="to_open" @click='toOpen'><span>{{price}}元/年</span>  {{clickStatu}}</div>
                <p class="open_tip">开通即视为同意<a href="">《北斗星儿童医院会员协议》</a></p>
            </div>
            <!-- 会员评论 -->
            <memberEvalution :memberList='comments.recommends' :commentNum='comments.count'></memberEvalution>
        </div>
        <div class="alert" v-if='alert'>
            <div class="img">
                <img src="../../common/images/opencard/alert.png" alt="">
                <div class="btn join" @click='price = "500";alert = false'></div>
                <div class="btn no_join" @click='price = "1000";alert = false'></div>
                <div class="close" @click='alert = false'><img src="../../common/images/opencard/close.png" alt=""></div>
            </div>
            
        </div>
        <!-- <toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast> -->
    </div>    
</template>

<script>
import { baseUrl,host } from '@common/js/config';
import { Toast } from 'vux'
import http from '@common/js/http.js';
import MemberEvalution from '@components/memberEvalution/MemberEvalution';
import { getStore,setStore,changePageTitle } from '@common/js/mUtils';
import {s_getIndexInfo} from '@service/service';
export default {
    data(){
        return {
            privilege:[
               {
                   tag:'li_1',
                   text_person:'受益人 1人',
                   text_family:'受益人 4人'
               },{
                   tag:'li_2',
                   text_person:'名医诊号预约',
                   text_family:'名医诊号预约'
               },{
                   tag:'li_3',
                   text_person:'会员挂号优惠',
                   text_family:'会员挂号优惠'
               },{
                   tag:'li_4',
                   text_person:'儿童健康档案',
                   text_family:'门诊治疗 9折'
               },{
                   tag:'li_5',
                   text_person:'免费停车 1小时',
                   text_family:'儿童健康档案'
               },{
                   tag:'li_6',
                   text_person:'会员免费咨询',
                   text_family:'免费停车 1小时'
               },{
                   tag:'li_7',
                   text_person:'儿童体检一份',
                   text_family:'会员免费咨询'
               },{
                   tag:'li_8',
                   text_person:'名医看诊资格',
                   text_family:'名医看诊资格'
               },{
                   tag:'li_9',
                   text_person:'免费亲子活动',
                   text_family:'儿童体检两份'
               },{
                   tag:'li_10',
                   text_person:'',
                   text_family:'洁牙 1 次'
               },{
                   tag:'li_11',
                   text_person:'',
                   text_family:'眼部 SPA1次'
               },{
                   tag:'li_12',
                   text_person:'',
                   text_family:'免费亲子活动'
               }

            ],
            comments:{},
            price:'',
            card_type:'',
            clickStatu:'立即升级',
            price:'',
            showToast:false,
            msg:'',
            position:'middle',
            less_that_one_month:'',
            grant_card_time_after_one_month:'',
            alert:false
        }
    },
    mounted(){
        changePageTitle('开通会员');
        this.getHomeInfo();
        this.less_that_one_month = this.$route.query.less_that_one_month;
        this.grant_card_time_after_one_month = this.$route.query.grant_card_time_after_one_month
        if(this.less_that_one_month == 1){
            this.price = 500
        }else if(this.less_that_one_month == 0){
            this.price = 1000
        }
    },
    methods:{
        getHomeInfo(){
            s_getIndexInfo({

            }).then(res =>{
                this.comments = res.comments;
            })

        },
        toOpen(){
            var that = this;
            http.fetch('api/user/card_rise_level').then((res)=>{
                
                if(res){
                    
                    let url = `${host}#/personalcenter`;
                    let href = encodeURIComponent(url);
                    let access_token = getStore('access_token') || '';

                    window.location.href = `${baseUrl}pay/wxpay/index.html?redirect_uri=${href}&order_type=rise&order_id=`+res.order_id+`&access_token=${access_token}`;
                    
                }
            }).catch((err)=>{

            })
            
            // if(this.less_that_one_month == 0){
            //     if(this.price == '500'){
            //         this.card_type = 1;
            //     }else if(this.price == '1000'){
            //         this.card_type = 2;
            //     }else{
            //         that.$router.push({
            //             path:'/openPersonalCard',
            //             query:{
            //                 card_type:that.card_type,
            //                 price:that.price
            //             }
            //         })
            //     }
            // }
            // else if(this.less_that_one_month == 1){
            //     this.alert = true;
            // }
        }
    },
    components:{
        Toast,
        MemberEvalution
    }
}
</script>

<style lang="less">
    h2.quanyi{
        color:#333;
        font-size:.36rem;
        text-align:center;
        margin-top: .5rem;
    }
    .quanyi_img{
        margin-top: .2rem;
        margin-bottom: .4rem;
        img{
            display: block;
            width: 5.8rem;
            margin:0 auto;
        }
    }
    .openMember{
        .memberCard{
            padding-top: .25rem;

            .item.update{
                width: 5.82rem;
                margin:0 auto;
                position: relative;
                height: 3.7rem;
                img{
                    display: block;
                    width: 100%;
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
            .time_tip{
                width: 5.3rem;
                height: .7rem;
                line-height:.7rem;
                text-align:center;
                font-size:.26rem;
                color:#5a5a5a;
                margin:0 auto;
                margin-bottom: .2rem;
                border-radius: .35rem;
                box-shadow: 0 0 .27rem 0 rgba(0, 0, 0, 0.1);
                background-color: #ffffff;
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
                        background-repeat: no-repeat;
                        background-size: 100% auto;
                        background-position: center center;
                        margin-left: .27rem;
                        border-radius:.1rem;
                        margin-bottom:.25rem;
                        i{
                            display: block;
                            width: .76rem;
                            height: .76rem;
                            margin: 0 auto;
                            margin-top: .3rem;
                            margin-bottom: .2rem;
                        }
                        span{
                            display: block;
                            text-align:center;
                            width: 100%;
                            font-size:.26rem;
                            color:#898989;
                        }
                    }
                    li:nth-child(3n-2){margin-left: 0;}
                    li.li_1{background-image: url('../../common/images/opencard/family/li_1.png');}
                    li.li_2{background-image: url('../../common/images/opencard/family/li_2.png');}
                    li.li_3{background-image: url('../../common/images/opencard/family/li_3.png');}
                    li.li_4{background-image: url('../../common/images/opencard/family/li_4.png');}
                    li.li_5{background-image: url('../../common/images/opencard/family/li_5.png');}
                    li.li_6{background-image: url('../../common/images/opencard/family/li_6.png');}
                    li.li_7{background-image: url('../../common/images/opencard/family/li_7.png');}
                    li.li_8{background-image: url('../../common/images/opencard/family/li_8.png');}
                    li.li_9{background-image: url('../../common/images/opencard/family/li_9.png');}
                    li.li_10{background-image: url('../../common/images/opencard/family/li_10.png');}
                    li.li_11{background-image: url('../../common/images/opencard/family/li_11.png');}
                    li.li_12{background-image: url('../../common/images/opencard/family/li_12.png');}
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
                    a{
                        color:#48cdbb;
                    }
                }
            }
            .comment .hd{
                width: 6.9rem;
                margin:0 auto;
            }
        }
        .alert{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
            z-index: 999;
            .img{
                position: absolute;
                left: 50%;
                margin-left: -2.95rem;
                top: 1.38rem;
                width: 5.9rem;
                img{
                    display: block;
                    width: 100%;
                }
                .close{
                    position: absolute;
                    bottom: -1.36rem;
                    left: 50%;
                    margin-left: -.4rem;
                    img{
                        display: block;
                        width: .8rem;
                    }
                }
                .btn{
                    position: absolute;
                    left: 50%;
                    margin-left: -2.375rem;
                    width: 4.75rem;
                    height: .69rem;
                }
                .join{
                    bottom: 1.56rem;
                }
                .no_join{
                    bottom: .6rem;
                }

            }

        
        }
    }

</style>
