<template lang="html">
    <div class="vipcardContent">
        <div class="vip_info">
            <div class="use_logo"><img src="../../common/images/card/logo.png" alt=""></div>
            <p class="title" @click='vipInfo()'>会员信息<em>></em></p>
            <div class="code_img"></div>
        </div>
        <div class="count">我的余额：<span class="mount"><em>¥</em>{{balance}}</span><img src="../../common/images/card/wenhao@2x.png" alt=""  @click='ruleStatuClick'>
            <div class="rule" v-if='ruleStatu'>
                <p>1、会籍卡内余额仅限门诊使用，微信公众号预约可使用会籍卡内余额支付</p>
                <p>2、会籍卡内充值金额100元起充 ，家庭会员卡仅主卡可充值，副卡共用主卡余额支付</p>
                <p>3、会籍卡内余额会员有效期内支持退款（仅限医院线下办理)</p>
            </div>
        </div>
        <div class="button" @click='vipcardRecharge' v-if='card_type != 3'>充值</div>
        <div class="list">
            <ul>
                <li v-for='item in list' :class='item.tag' @click='liClick(item.tag)'>
                    <span></span>
                    <p>{{item.txt}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import http from '@common/js/http.js';
    import { changePageTitle } from '@common/js/mUtils';
    export default{
        mounted(){
            changePageTitle('会员卡详情')
            //获取此id
            this.id = this.$route.query.id;
            //请求会员卡信息
            http.fetch('api/user/card_detail',{id:this.id}).then((res)=>{
                this.balance = res.balance;
                this.card_number = res.card_number;
                this.type = res.type;
                this.balance = res.balance;
                this.qrcode();
                this.realname = res.realname
            }).catch((err)=>{
                
            })
            if(this.$route.query.card_type){
                this.card_type = this.$route.query.card_type
            }
            
        },
        data(){
            return{
                list:[
                    {
                        tag:'li_1',
                        txt:'我的特权'
                    },{
                        tag:'li_2',
                        txt:'缴费明细'
                    },{
                        tag:'li_3',
                        txt:'检查报告'
                    }
                ],
                card_number:'',
                type:'',
                balance:'',
                id:'',
                ruleStatu:false,
                card_type:'',
                realname:''
            }
        },
        methods:{
            vipInfo(){
                this.$router.push({
                    path:'/vipinfo',
                    query:{
                        id:this.id
                    }
                })
            },
            liClick(tag){
                if(tag == 'li_1'){
                    this.$router.push({
                        path:'/MyPrerogative',
                        query:{
                            type:this.type
                        }
                    });
                }else if(tag == 'li_2'){
                    this.$router.push({
                        path:'/transactionrecord',
                        query:{

                        }
                    });
                }else if(tag == 'li_3'){
                    this.$router.push({
                        path:'/tworeports',
                        query:{
                            id:this.id,
                            patientName:this.realname
                        }
                    });
                }
            },
            qrcode(){
                $('.code_img').qrcode({
                    text:this.card_number
                })
            },
            vipcardRecharge(params){
                //event.stopPropagation();
                this.$router.push({
                    path:'/vipcardRecharge',
                    query:{
                        card_number:this.card_number,
                        type:this.type,
                        balance:this.balance,
                        id:this.id
                    }
                })
              
                
            },
            ruleStatuClick(){
                
                this.ruleStatu = !this.ruleStatu
            }
        }
    }
</script>
<style lang='less'>
    .vipcardContent{
        padding:0 .3rem;
        .vip_info{
            position: relative;
            width: 5.71rem;
            height: 5.82rem;
            margin:0 auto;
            margin-top: 1rem;
            border-radius: .24rem;
            box-shadow: 0 0 .27rem 0 rgba(0, 0, 0, 0.16);
            padding-top: .84rem;
            .use_logo{
                position: absolute;
                left: 50%;
                top: -.6rem;
                margin-left: -.6rem;
                width: 1.2rem;
                height: 1.2rem;
                border-radius:100%;
                box-shadow: 0 0 .27rem 0 rgba(0, 0, 0, 0.16);
                background: #fff;
                overflow:hidden;
                img{
                    display: block;
                    width: 100%;
                }
            }
            .title{
                font-size:.28rem;
                color:#5a5a5a;
                text-align:center;
                em{
                    margin-left: .15rem;
                }
            }
            .code_img{
                width: 3.42rem;
                height: 3.42rem;
                margin:0 auto;
                margin-top: .5rem;
                canvas{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        div.count{
            position: relative;
            font-size:.26rem;
            color:#5a5a5a;
            text-align:center;
            margin-top: .5rem;
            .rule{
                position: absolute;
                background: #f5f5f5;
                text-align:left;
                line-height:.56rem;
                padding:.2rem .3rem;
            }
            .mount{
                font-size:.4rem;
                font-weight:bold;
                color:#333;
                em{
                    font-weight:normal;
                    font-size:.26rem;
                    margin-right: .1rem;
                }
            }
            img{
                display: inline-block;
                width: .41rem;
                height: .39rem;
                vertical-align:middle;
                margin-bottom: .14rem;
                margin-left: .23rem;
            }
        }
        .button{
            width: 1.2rem;
            height: .6rem;
            line-height:.6rem;
            margin:0 auto;
            font-size:.28rem;
            color:#48cdbb;
            text-align:center;
            border:.01rem solid #48cdbb;
            border-radius:.3rem;
            margin-top: .42rem;
        }
        .list{
            margin-top: .46rem;
            border-top:.02rem solid #f2f2f2;
            padding:0 .14rem;
            padding-bottom: .52rem;
            padding-top: .54rem;
            li{
                display: inline-block;
                width: 1.84rem;
                height: 1.8rem;
                text-align:center;
                font-size:.28rem;
                color:#5a5a5a;
                border-radius: .24rem;
                margin-left: .43rem;
                background-repeat: no-repeat;
                background-size: 100% auto;
                box-shadow: 0 0 .27rem 0 rgba(0, 0, 0, 0.1);
                span{
                    display: block;
                    width: .62rem;
                    height: .62rem;
                    margin:0 auto;
                    margin-top: .3rem;
                    margin-bottom: .28rem;
                }
            }
            li:first-child{
                margin-left: 0;
            }
            li.li_1{background-image: url('../../common/images/card/li_1@2x.png');}
            li.li_2{background-image: url('../../common/images/card/li_2@2x.png');}
            li.li_3{background-image: url('../../common/images/card/li_3@2x.png');}
        }
    }
</style>