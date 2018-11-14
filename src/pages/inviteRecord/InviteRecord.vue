<template lang="html">
    <div class="inviteRecord">
        <div class="info">已成功邀请<span>{{info.num}}</span>人成为会员，得到<span>{{info.money}}</span>元奖励</div>
        <div class="rule">
            <div class="bg"><img src="../../common/images/invite/record_bg.png" alt=""></div>
            <span class="tit" @click='togger'>查看奖励规则<img :src="rule_statu === false?imgSrc_up:imgSrc_down" alt=""></span>
            <div class="con">
                <p>1、成为北斗星儿童医院会员后即可邀请好友。</p>
                <p>2、进入北斗星儿童医院公众号-个人中心-邀请好友，发送你的活动邀请链接给好友。</p>
                <p>3、好友通过您邀请链接购买北斗星儿童医院会员成功双方各得50元奖励。</p>
                <p>4、50元奖励实时发放到您的北斗星儿童医院会员账号余额中。</p>
            </div>
            <div class="list">
                <table>
                    <tr class="title">
                        <th>好友</th>
                        <th>状态</th>
                        <th>奖励</th>
                    </tr>
                    <tr v-for='item in info.list' :class='item.status == "已购买" ? "on" : ""'>
                        <td>{{item.name}}</td>
                        <td>{{item.status}}</td>
                        <td>{{item.money}}</td>
                    </tr>
                </table>
            </div>
        </div>
        
    </div>
</template>
<script>
    import { changePageTitle } from '@common/js/mUtils';
    import http from '@common/js/http.js';
    export default{
        mounted(){
            changePageTitle('邀请好友赢奖励');
            http.fetch('api/invite/log').then((res)=>{
                this.info = res
            }).catch((arr)=>{

            })
        },
        data(){
            return{
                imgSrc_up:require('../../common/images/invite/up.png'),
                imgSrc_down:require('../../common/images/invite/down.png'),
                rule_statu:false,
                info:[]
            }
        },
        methods:{
            togger(){
                if(this.rule_statu === false){
                    $('.inviteRecord .con').slideDown()
                    this.rule_statu = !this.rule_statu;
                }else{
                    $('.inviteRecord .con').slideUp()
                    this.rule_statu = !this.rule_statu;
                }
                
            }
        }
    }
</script>
<style lang='less'>
    .inviteRecord{
        
        position: relative;
        width: 100%;
        min-height: 100%;
        background-image: url('../../common/images/invite/bg.png');
        background-size: 100% auto;
        background-color:rgb(254,97,81);
        background-repeat: no-repeat;
        padding-top: 1.8rem;
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
        .rule{
            position: relative;
            width: 6.7rem;
            min-height:10.25rem;
            padding:0 .3rem;
            padding-top: 1.14rem;
            text-align:center;
            background: #fff;
            margin: 0 auto;
            .bg{
                position: absolute;
                height: .8rem;
                left: 50%;
                margin-left: -2rem;
                top:-.36rem;
                img{
                    display: block;
                    height: 100%;
                }
            }
            .tit{
                display: inline-block;
                font-size:.26rem;
                color:#ff8448;
                img{
                    display: inline-block;
                    width: .3rem;
                    height: .3rem;
                    vertical-align:middle;
                    margin-left: .2rem;
                    margin-bottom: .02rem;
                }
            }
            .con{
                display: none;
                border-radius: .11rem;
                border: solid .02rem #ffe9de;
                margin-top: .28rem;
                padding:.25rem .3rem;
                p{
                    font-size:.24rem;
                    color:#898989;
                    line-height:.44rem;
                    text-align:left;
                    margin-top: .08rem;
                    letter-spacing:.005rem;
                }
            }
            .list{
                border: solid .02rem #ffe4d7;
                margin-top: .3rem;
                border-radius: .11rem;
                overflow:hidden;
                table{
                    width: 100%;
                    tr{
                        width: 100%;
                        padding:0 .35rem;
                        font-size:.26rem;
                        color:#898989;
                        line-height:.56rem;
                    }
                    tr.on{
                        color:#ff8448;
                    }
                    tr.title{
                        height: .77rem;
                        line-height:.77rem;
                        background-color: rgba(255,234,223,1);
                        font-size:.28rem;
                        color:#ff8448;
                    }
                }
            }
        }
    }
</style>