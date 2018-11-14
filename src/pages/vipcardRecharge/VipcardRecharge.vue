<template lang="html">
    <div class="vipcardRecharge">
        <div class="balance clearfix">
            <span>账户余额</span>
            <span>¥ {{balance}}</span>
        </div>
        <div class="lin"></div>
        <div class="recharge">
            <p>
                充值金额
                <input type="text" placeholder="手动输入金额" :value="typeList[idx]" :class='{active : idx >= 0}' ref='recharge'>
            </p>
            <div class="select">
                <ul>
                    <li v-for='(item,index) in typeList' :class='{active:index === idx}' @click='select(index)'>{{item}}元<img src="../../assets/img/selected.png" alt="" v-if='idx === index'></li>
                </ul>
            </div>
        </div>
        <div class="sublime" @click='cardRecharge'>立即充值</div>
        <toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
        
    </div>
</template>
<script>
    import http from '@common/js/http.js';
    import { changePageTitle,getStore,getUrlParam } from '@common/js/mUtils';
    import { Toast } from 'vux';
    import { baseUrl,host } from '@common/js/config';
    export default{
        beforeRouteEnter(to,from,next){
            next((vm)=>{
                vm.card_number = to.query.card_number;
                vm.type = to.query.type;
                vm.balance = to.query.balance;
            })
        },
        mounted(){
            changePageTitle('会员卡充值');
            this.id = this.$route.query.id
        },
        data(){
            return{
                idx:'',
                typeList:['100','300','500','1000','3000','5000','10000'],
                fee:'',
                position:'middle',
                showToast:false,
                msg:'',
                card_number:'',
                type:'',
                balance:'',
                id:''
            }
        },
        methods:{
            select(index){
                
                if(this.idx === index){
                    this.idx = ''
                    return false;
                }
                this.idx = index;
            },
            cardRecharge(){
                var that= this;
                if(this.$refs.recharge.value !== ''){
                    http.fetch('/api/user/member_recharge',{
                        card_number:this.card_number,
                         fee:this.$refs.recharge.value
                    }).then((res)=>{
                
                    if(res){
                        
                        let url = `${host}#/vipcardContent?id=`+that.id;
                        let href = encodeURIComponent(url);
                        let access_token = getStore('access_token') || getUrlParam('access_token');

                        window.location.href = `${baseUrl}pay/wxpay/index.html?redirect_uri=${href}&order_type=card&order_id=`+res.order_id+`&card_type=0&access_token=${access_token}`;
                        
                    }
                }).catch((err)=>{
                    this.showToast = true
                    this.msg = err
                })
                    
                    // http.fetch('/api/user/member_recharge',{
                    //     card_number:this.card_number,
                    //     fee:this.$refs.recharge.value
                    // }).then((res)=>{
                       
                            
                    //     let url = `${host}#/vipcardContent?id=`+that.id;
                    //     let href = encodeURIComponent(url);
                    //     let access_token = getStore('access_token') || getUrlParam('access_token');

                    //     window.location.href = `${baseUrl}pay/wxpay/index.html?redirect_uri=${href}&order_id=`+order_id+`&order_type=card&card_type=0&access_token=${access_token}`;
                     
                    // }).catch((arr) =>{
                    //     this.showToast = true
                    //     this.msg = arr
                    // })
                }else{
                    this.showToast = true
                    this.msg = '请输入充值金额'
                }
            }
        }
    }
</script>
<style lang='less'>
    .vipcardRecharge{
        height: 100%;
        background: #fff;
        .balance{
            height: 1.09rem;
            line-height:1.09rem;
            background: #fff;
            padding:0 .3rem;
            span:nth-of-type(1){
                float: left;
                font-size:.28rem;
                color:#898989;
            }
            span:nth-of-type(2){
                float: right;
                font-size:.32rem;
                color:#5a5a5a;
            }
        }
        .lin{
            width: 100%;
            height: .2rem;
            background: #f2f2f2;
        }
        .recharge{
            padding:0 .3rem;
            p{
                position: relative;
                height: 1.09rem;
                line-height:1.09rem;
                text-align:left;
                font-size:.32rem;
                color:#898989;
                border-bottom:.02rem solid #f2f2f2;
                input{
                    position: absolute;
                    left: 0;
                    top: 0;
                    display: block;
                    width: 100%;
                    height: 100%;
                    text-align:right;
                    font-size:.32rem;
                    color:#d4d4d4;
                    border:none;
                    background: transparent;
                    caret-color:#5a5a5a;
                }
                input.active{
                    color:#5a5a5a;
                }
            }
            .select{
                margin-top: .4rem;
                li{
                    position: relative;
                    display: inline-block;
                    margin-left: .6rem;
                    width: 1.9rem;
                    height: 1.01rem;
                    border:.01rem solid #d4d4d4;
                    color:#5a5a5a;
                    font-size:.32rem;
                    text-align:center;
                    line-height:1.01rem;
                    border-radius:.5rem;
                    margin-bottom: .3rem;
                    img{
                       display: block;
                       width: .4rem;
                       height: .4rem;
                       position: absolute;
                       bottom:0;
                       right: 0;
                    }
                }
                li.active{
                    color:#40cbb7;
                    border:.01rem solid #40cbb7;
                }
                li:nth-child(3n-2){
                    margin-left: 0;
                }
            }
        }
        .sublime{
            position: fixed;
            left: 50%;
            margin-left: -3.32rem;
            bottom: .6rem;
            width: 6.64rem;
            height: .79rem;
            background: #48cdbb;
            color:#fff;
            font-size:.32rem;
            border-radius:.395rem;
            text-align:center;
            line-height:.79rem;
        }
        
    }
</style>