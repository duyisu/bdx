<template lang="html">
    <div class="mysendRecive">
        <div class="bd">
            <div class="img">
                <img :src="info.image" alt="">
                <span class="li_log">{{info.fromScene}}</span>
                <p class="card_info"><span>{{info.code}}</span><span>有效期至：{{info.endDate}}</span></p>
            </div>
            <div class="content">
                <div class="text" v-html='info.description'></div>
            </div>
        </div>
        <div class="recive_tip">好友领取，免费体检  </div>
        <div class="writeInfo">
            <ul class="apInfo">
                <li class="clearfix">
                    <span>姓名</span>
                    <span>
                        <input type="text" name="" placeholder="请填写" ref='Name'>
                    </span>
                </li>
                <li class="clearfix">
                    <span>手机号</span>
                    <template>
                        <span>
                            <input  type="tel" name="" placeholder="请填写"  ref='Mobile'>
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
        <div class="white" style="width:100%;height:.6rem;opacity:0"></div>
        <toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
    </div>
</template>
<script>
    import http from '@common/js/http.js';
    import { changePageTitle,isMobile } from '@common/js/mUtils';
    import { Toast } from 'vux';
    let myreg = /^[1][0-9]{10}$/; //手机号验证
    let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证前端简单验证下
    let cardReg = /^[0-9A-Za-z]{8,16}$/; //卡后验证
    export default{
       
        mounted(){
            
            this.code = this.$route.query.id;
            
            http.fetch('api/coupon/coupon_info',{code:this.$route.query.id}).then((res)=>{
                this.info = res;
                changePageTitle('给好友送'+res.title)
            })
        },
        data(){
            return{
                getCode:true,
                disableSubmit:false,
                showToast: false,
                position: 'middle', //top,middle,bottom
                msg: '提示信息',
                id:'',
                messagecode:'',
                info:{},
                code:''

            }
        },
        methods:{
            getMessgeCode($event) {
                let myreg = /^[1][0-9]{10}$/; //手机号验证

                if (!myreg.test(this.$refs.Mobile.value)) {
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
                            mobile: this.$refs.Mobile.value,
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
                if (!this.$refs.Name.value || this.$refs.Name.value.length > 10) {
                    this.msg = '请填写10位以内姓名';
                    this.showToast = true;
                    return false;
                }

                if (!this.$refs.Mobile.value || !myreg.test(this.$refs.Mobile.value)) {
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
                http.fetch('api/coupon/send_friend',{
                    code:this.code,
                    name:this.$refs.Name.value,
                    mobile:this.$refs.Mobile.value,
                    verifycode:this.$refs.vertifyCode.value
                }).then((res)=>{
                    this.showToast = true;
                    this.msg = '领取成功';
                    setTimeout(function(){
                        that.$router.push({
                            path:'/mysend'
                        })
                    },1000)
                }).catch((res)=>{
                    this.showToast = true;
                    this.msg = res;
                })
                
            }
          
        },
        
    }
</script>
<style lang='less'>
.mysendRecive .apInfo > li:nth-of-type(1) {
    border-top: none;
}
.mysendRecive .apInfo > li {
    
    line-height: 1.08rem;
    border-top: 0.03rem solid #f5f5f5;
}

.mysendRecive .apInfo > .bindVipCard {
    line-height: inherit;
}

.mysendRecive .apInfo > .bindVipCard span:nth-of-type(1) {
    margin-top: 0.3rem;
}

.mysendRecive .apInfo > li span:nth-of-type(1) {
    float: left;
    font-size: 0.32rem;
    font-weight: 500;
    letter-spacing: 0.006rem;
    color: #898989;
}
.mysendRecive .apInfo > li span:nth-of-type(2) {
    float: right;
}
.mysendRecive .apInfo > li span:nth-of-type(2) i {
    display: inline-block;
    font-size: 0.32rem;
    font-weight: 500;
    letter-spacing: 0.006rem;
    color: #d4d4d4;
    margin-right: 0.2rem;
}

.mysendRecive .apInfo > li span:nth-of-type(2) input {
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
.mysendRecive .apInfo > .mobileCode span:nth-of-type(2) .mobileText {
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
.mysendRecive .apInfo > .mobileCode  .split-line{
    margin-right: 0.3rem;
    display: inline-block;
    width: .02rem;
    height: .3rem;
    border-radius: 1px;
    background-color: #f5f5f5;
    vertical-align: middle;
}

.mysendRecive .apInfo > li span:nth-of-type(2) img {
    display: inline-block;
    width: 0.13rem;
    height: 0.2rem;
}
.mysendRecive .apInfo > li span .messageCode{
    color:#48cdbb !important;
}
    .mysendRecive{
        .writeInfo{
            padding:0 .3rem;
        }
        display: block;
        width: 100%;
        overflow:hidden;
        .bd{
            padding: 0 .3rem;
            margin-top: .4rem;
            .img{
                position: relative;
                display: block;
                img{
                    display: block;
                    width: 100%;
                }
                .li_log{
                    position: absolute;
                    right: .09rem;
                    top: .28rem;
                    line-height:.45rem;
                    padding:0 .2rem;
                    font-size:.22rem;
                    color:#fff;
                    opacity:0.8;
                    background: rgba(0,0,0,.4);
                    border-radius:.1rem;
                }
                p.card_info{
                    position: absolute;
                    color:#fff;
                    font-size:.22rem;
                    left:.39rem;
                    bottom:.2rem;
                    text-align:left;
                    letter-spacing: .011rem;
                    span{
                        margin-right: .28rem;
                    }
                }
            }
            .content{
                box-shadow: 0 0 .57rem 0 rgba(0, 0, 0, 0.18);
                padding:.4rem .3rem;
                border-bottom-right-radius:0.1rem;
                border-bottom-left-radius:0.1rem;
                min-height:3rem;
                p{
                    font-size:.24rem;
                    color:rgba(90,90,90,.8);
                    line-height:.4rem;
                    letter-spacing:.014rem;
                    margin-bottom: .08rem;
                }
                p.tel,p.adr{
                    color:#898989;
                }
                p.tel{
                    margin-top: .3rem;
                }
            }
            .send_tip{
                position: absolute;
                right: .44rem;
                bottom: .5rem;
                z-index: 999;
                img{
                    display: block;
                    width: 1.86rem;
                }
            }
        }
        .recive_tip{
            width: 3.5rem;
            height: .7rem;
            border-radius: .35rem;
            box-shadow: 0 0 .27rem 0 rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
            text-align:center;
            line-height:.7rem;
            font-size:.26rem;
            color:#5a5a5a;
            margin:0 auto;
            margin-top:.25rem;
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
    }
</style>