<template lang="html">
    <div class="openPersonalCard">
        <div class="card" v-if="card_type == 8" >
            <img src="../../common/images/opencard/personal_card@2x.png" alt="">
            <span>500元/年</span>
        </div>
        <div class="card" v-if="card_type == 9" >
            <img src="../../common/images/opencard/family_card@2x.png" alt="">
            <span>1000元/年</span>
        </div>
        <div class="add_patient">
            <ul>
                <li class="add" :class='{haveInfo : infoStatu == 1}'>主卡就诊人<span @click='addPatient'>{{patientName}}<em style="margin-left:.3rem">></em></span></li>
                <li class="add" v-if='infoStatu == 1' :class='{haveInfo : infoStatu == 1}'>手机号<span @click='addPatient'>{{mobile}}<em style="margin-left:.3rem">></em></span></li>
                <li class="add" v-if='infoStatu == 1' :class='{haveInfo : infoStatu == 1}'>身份证号<span @click='addPatient'>{{ID_no}}<em style="margin-left:.3rem">></em></span></li>
            </ul>
            <p class="add_tip">1.就诊人购买成功后信息不可更改</p>
            <p class="add_tip" v-if="card_type == '9'" >2.开通会员后，主卡就诊人可为亲友开通三张亲情副卡</p>
        </div>
        <UseVip></UseVip>
        <div class="openBtn" @click='toOpen'>{{price}}  立即开通</div>
        <toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
    </div> 
</template>

<script>
import { baseUrl,host } from '@common/js/config';
import { Toast } from 'vux'
import http from '@common/js/http.js';
import { getStore,setStore,changePageTitle,removeStore } from '@common/js/mUtils';
import UseVip from '@components/useVip/UseVip';
export default {
   
    data(){
        return {
            infoStatu:'',
            patientName:'必填添加',
            mobile:'',
            ID_no:'',
            card_type:'',
            price:'',
            disableClick:false,
            msg:'',
            showToast:false,
            position:'middle',
            patientId:'',
            toactive:''
        }
    },
    mounted(){


        if(this.$route.query.statu){
            
            this.toactive = this.$route.query.statu
            setStore('statu',this.$route.query.statu)
            
        }else{
            this.toactive = getStore('statu')
        }

        if(this.$route.query.card_type){
            this.card_type = this.$route.query.card_type;
            this.price = this.$route.query.price;
            if(this.$route.query.card_type == 8){
                changePageTitle('开通个人会员')
            }else if(this.$route.query.card_type == 9){
                changePageTitle('开通家庭会员')
            }
            setStore('card_type',this.$route.query.card_type)
            setStore('price',this.$route.query.price)
        }else{
            this.card_type = getStore('card_type');
            this.price = getStore('price');
        }

        if(this.$route.query.ID_no){
            this.infoStatu = 1;
            this.ID_no = this.$route.query.ID_no;
            this.mobile = this.$route.query.mobile;
            this.patientName = this.$route.query.patientName;
            this.id = this.$route.query.id;
        }else{
            this.infoStatu = 0;
        }

       

    },
    methods:{
        addPatient(){
            this.$router.push({
                path:'/patientslist',
                query:{
                    cardType:1,
                    personOrfamily:0,
                    card_type:this.card_type,
                    price:this.price,
                    id:''
                }
            })
        },
        toOpen(){
            
            var that = this
            if(this.mobile !== "" && this.patientName !== '' && this.ID_no !== ''){
                
               if(this.toactive== 'bind'){

                    //请求绑定会员卡接口
                    http.fetch('api/user/bindCard',{
                        patient_id:this.id,
                        card_type:this.card_type
                    }).then((res)=>{
                        removeStore('card_type')
                        removeStore('statu')
                        that.showToast = true;
                        that.msg = res
                        setTimeout(function(){
                            that.$router.push({
                                path:'/vipcardlist',
                                query:{
                                    type:that.card_type
                                }
                            })
                        })
                    }).catch((arr)=>{
                        that.showToast = true;
                        that.msg = arr
                    })
               }else if(this.toactive== 'buy'){
                    //请求开通会员卡接口
                   
                    http.fetch('api/user/buy_card',{
                        patients:'[{"id":'+that.id+','+'"is_main":1}]',
                        card_type:this.card_type
                    }).then((res)=>{
                        if(res){
                           
                            let card_type = '';
                            if(this.card_type == 8){
                                card_type = 1
                            }else if(this.card_type == 9){
                                card_type = 2
                            }

                            let url = `${host}#/personalcenter`;
                            let href = encodeURIComponent(url);
                            let access_token = getStore('access_token') || getUrlParam('access_token');

                            window.location.href = `${baseUrl}pay/wxpay/index.html?redirect_uri=${href}&card_type=`+card_type+`&order_id=`+res.order_id+`&order_type=card&access_token=${access_token}`;
                        }
                        
                    }).catch((arr)=>{
                        that.msg = arr;
                        that.showToast = true;
                    })
               }
            }else{
                this.msg = '请添加就诊人信息';
                this.showToast = true;
                return false
            }
            
        }
        
    },
    components:{
        Toast,
        UseVip
    }
}
</script>

<style lang="less">
    .openPersonalCard{
        .card{
            position: relative;
            width: 5.82rem;
            height: 3.7rem;
            margin:0 auto;
            margin-top: .4rem;
            img{
                display: block;
                width: 100%;
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
        .add_patient{
            margin-top: .3rem;
            padding:0 .3rem;
            ul{margin-bottom: .38rem;}
            .add{
                position: relative;
                font-size:.32rem;
                color:#898989;
                line-height:1.2rem;
                border-bottom: solid .03rem #f2f2f2;
                span{
                    color:#d4d4d4;
                    float: right;
                }
            }
            .haveInfo span{
                color:#5a5a5a;
                em{
                    color:#898989;
                }
            }
            p.add_tip{
                color:#b3b3b3;
                font-size:.24rem;
                text-align:left;
                margin-bottom: .08rem;
            }
        }
        .openBtn{
            width: 6.64rem;
            height: .79rem;
            line-height:.79rem;
            border-radius: .395rem;
            background-color: #48cdbb;
            margin:0 auto;
            text-align:center;
            color:#fff;
            font-size:.32rem;
            font-weight:bold;
            margin-top: .76rem;
            letter-spacing:.032rem;
        }
    }
</style>
