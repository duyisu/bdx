<template lang='html'>
    <div class="reciveCard">
        <div class="img">
            <img src="../../common/images/card/recive_card.png" alt="">
            <span class="date">{{card_detail.card_expire_date}}到期</span>
            <span class="name">{{card_detail.realname}}</span>
            <span class="cardID">{{card_detail.card_number}}</span>
        </div>
        <div class="tequan">你看诊，TA付款，九大会员特权共享  </div>
        <div class="writeInfo">
            <ul class="apInfo">
                <li class="clearfix">
                    <span>姓名</span>
                    <span>
                        <input type="text" name="" placeholder="请填写" ref='patientName'>
                    </span>
                </li>
                <li class="clearfix">
                    <span>身份证</span>
                    <span>
                        <input type="text"  name="" placeholder="请填写" ref='patientID'>
                    </span>
                </li>
                <li class="clearfix">
                    <span>手机号</span>
                    <template>
                        <span>
                            <input  type="tel" name="" placeholder="请填写"  ref='patientMobile'>
                        </span>
                    </template>
                </li>
                <li class="mobileCode clearfix">
                    <span>验证码</span>
                    <span>
                        <input ref="vertifyCode" class="mobileText" placeholder="请输入验证码" type="tel" v-model="messagecode" />
                        <i class="split-line"></i>
                        <i :class="{messageCode:getCode}"
                        @click="getMessgeCode" >获取验证码</i>
                    </span>
                </li>
            </ul>
            <div class="alick_btn" @click='submit'>填写信息,确认领取</div>
        </div>
        <toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
    </div>
</template>
<script>
    import { Toast } from 'vux';
    import http from '@common/js/http.js';
    import { changePageTitle,setCookie,saveCookie} from '@common/js/mUtils';
    let myreg = /^[1][0-9]{10}$/; //手机号验证
    let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证前端简单验证下
    let cardReg = /^[0-9A-Za-z]{8,16}$/; //卡后验证
    export default{
        beforeRouteEnter(to,from,next){
            next((vm)=>{
                saveCookie('beforeLoginUrl',to.fullPath)
            })
        },
        mounted(){
            this.id = this.$route.query.id;
            this.mainCardName = this.$route.query.mainCardName;
            changePageTitle(this.$route.query.mainCardName +'为您开通家庭会籍副卡1');
            http.fetch('api/user/card_detail',{id:this.$route.query.id}).then((res)=>{
                this.card_detail = res
            }).catch((arr)=>{
               
            })
        },
        data(){
            return{
                showToast: false,
                position: 'middle', 
                msg: '提示信息',
                realname:'',
                messagecode:'',
                getCode:true,
                disableSubmit:false,
                mainCardName:'',
                id:'',
                card_detail:{}
            }
        },
        methods:{
            getMessgeCode($event) {
                let myreg = /^[1][0-9]{10}$/; //手机号验证

                if (!myreg.test(this.$refs.patientMobile.value)) {
                    this.msg = '请输入有效的11位手机号码';
                    this.showToast = true;
                    return false;
                }

                if (this.getCode) {
                    this.getCode = false;
                    var seconds = 60;
                    var timer = null;
                    $event.target.innerHTML = seconds + '秒后重新获取';
                    timer = setInterval(() => {
                        seconds--;
                        $event.target.innerHTML = seconds + '秒后重新获取';

                        if (seconds == 0) {
                            clearInterval(timer);
                            $event.target.innerHTML = '获取验证码';
                            this.getCode = true;
                        }
                    }, 1000);
                    http.fetch('/api/user/send_sms_code', {
                            mobile: this.$refs.patientMobile.value,
                        })
                        .then(res => {
                            this.msg = res;
                            this.showToast = true;
                            this.disableSubmit = true
                        })
                        .catch(err => {
                            this.msg = err;
                            this.showToast = true;
                        });
                }
              
            },
            submit(){
                var that = this;
                //保存所有信息
                if (!this.$refs.patientName.value || this.$refs.patientName.value.length > 10) {
                    this.msg = '请填写10位以内姓名';
                    this.showToast = true;
                    return false;
                }

                if (!this.$refs.patientID.value || !regIdNo.test(this.$refs.patientID.value)) {
                    this.msg = '请输入有效的18位身份证号码';
                    this.showToast = true;
                    return false;
                }

                if (!this.$refs.patientMobile.value || !myreg.test(this.$refs.patientMobile.value)) {
                    this.msg = '请输入有效的11位手机号码';
                    this.showToast = true;
                    return false;
                }
                if (!this.$refs.vertifyCode.value) {
                    this.msg = '请输入验证码';
                    this.showToast = true;
                    return false;
                }
                if(!this.disableSubmit){
                    this.msg = '请获取验证码';
                    this.showToast = true;
                    return false;
                }
                http.fetch('api/user/getcard_sub',{
                    card_id:this.id,
                    realname:this.$refs.patientName.value,
                    idcardNo:this.$refs.patientID.value,
                    mobile:this.$refs.patientMobile.value,
                    verifycode:this.$refs.vertifyCode.value
                }).then((res)=>{
                    
                    setTimeout(function(){
                        that.$router.push({
                            path:'/vipcardlist',
                            query:{
                                type:9,
                                mainCardName:this.mainCardName
                            }
                        })
                    },1000)

                    this.msg = res;
                    this.showToast = true;
                    

                }).catch((res)=>{
                    this.showToast = true;
                    this.msg = res;
                })
                
            }
        }
    }
</script>
<style lang='less'>
.reciveCard .apInfo > li:nth-of-type(1) {
    border-top: none;
}
.reciveCard .apInfo > li {
    
    line-height: 1.08rem;
    border-top: 0.03rem solid #f5f5f5;
}

.reciveCard .apInfo > .bindVipCard {
    line-height: inherit;
}

.reciveCard .apInfo > .bindVipCard span:nth-of-type(1) {
    margin-top: 0.3rem;
}

.reciveCard .apInfo > li span:nth-of-type(1) {
    float: left;
    font-size: 0.32rem;
    font-weight: 500;
    letter-spacing: 0.006rem;
    color: #898989;
}
.reciveCard .apInfo > li span:nth-of-type(2) {
    float: right;
}
.reciveCard .apInfo > li span:nth-of-type(2) i {
    display: inline-block;
    font-size: 0.32rem;
    font-weight: 500;
    letter-spacing: 0.006rem;
    color: #d4d4d4;
    margin-right: 0.2rem;
}

.reciveCard .apInfo > li span:nth-of-type(2) input {
    height: 0.8rem;
    width: 4rem;
    margin-right: 0.3rem;
    text-align: center;
    border: none;
    color: #191919;
    font-weight: 500;
    font-size: 0.32rem;
    text-align: right;
}
.reciveCard .apInfo > .mobileCode span:nth-of-type(2) .mobileText {
    height: 0.8rem;
    width: 2.4rem;
    margin-right: 0.3rem;
    text-align: center;
    border: none;
    color: #191919;
    font-weight: 500;
    font-size: 0.32rem;
    text-align: center;
}
.reciveCard .apInfo > .mobileCode  .split-line{
    margin-right: 0.3rem;
    display: inline-block;
    width: .02rem;
    height: .3rem;
    border-radius: 1px;
    background-color: #f5f5f5;
    vertical-align: middle;
}

.reciveCard .apInfo > li span:nth-of-type(2) img {
    display: inline-block;
    width: 0.13rem;
    height: 0.2rem;
}
.reciveCard .apInfo > li span .messageCode{
    color:#48cdbb !important;
}
.reciveCard{
    .img{
        position: relative;
        width: 5.82rem;
        height: 3.7rem;
        margin:0 auto;
        margin-top:.4rem;
        img{
            display: block;
            width: 100%;
            height: 100%;
        }
        span{
            position: absolute;
            right: .3rem;
            color:#fff;
            font-size:.24rem;
        }
        span.date{
            top: .3rem;
        }
        span.name{
            bottom: .54rem;
        }
        span.cardID{
            bottom: .2rem;
        }
    }
    .tequan{
        width: 5.1rem;
        height: .7rem;
        line-height:.7rem;
        margin:0 auto;
        margin-top: .3rem;
        border-radius: .35rem;
        box-shadow: 0 0 .27rem 0 rgba(0, 0, 0, 0.1);
        font-size:.26rem;
        color:#5a5a5a;
        text-align:center;
        margin-bottom: .3rem;
    }
    .alick_btn{
        width: 6.64rem;
        height: .78rem;
        border-radius: .38rem;
        background-color: #48cdbb;
        margin:0 auto;
        text-align:center;
        line-height:.78rem;
        color:#fff;
        font-size:.32rem;
        margin-top: 1rem;
        letter-spacing: .032rem;
    }
    .writeInfo{
        padding:0 .3rem;
    }
}
    
</style>