<template lang="html">
    <div id="addpatient">
        <div>
            <ul class="apInfo">
                <li class="clearfix">
                    <span>医院</span>
                    <span>
                        <input readonly="readonly" type="text" name="" placeholder="请填写" value="北斗星耳鼻喉医院">
                    </span>
                </li>
                <li class="clearfix">
                    <span>姓名</span>
                    <span>
                        <input readonly="readonly" type="text" name="" placeholder="请填写" :value="realname">
                        <img src="../../common/images/departmentlist/arrowIcon.png" alt="" />
                    </span>
                </li>
                <li class="clearfix">
                    <span>身份证</span>
                    <span>
                        <input readonly="readonly" type="text" name="" placeholder="请填写" :value="ID_no">
                    </span>
                </li>
                <li class="clearfix">
                    <span>手机号</span>
                    <span>
                        <input readonly="readonly" type="text" name="" placeholder="请填写" :value="mobile">
                    </span>
                </li>
                <li class="mobileCode clearfix">
                    <span>验证码</span>
                    <span>
                        <input ref="vertifyCode" class="mobileText" placeholder="请输入验证码" type="tel" v-model="messagecode" />
                        <i :class="{messageCode:getCode}"
                        @click="getMessgeCode" >获取验证码</i>
                    </span>
                </li>
            </ul>
        </div>
        <div>
            <ul class="apInfo">
                <li class="clearfix">
                    <span>卡号</span>
                    <span @click="goInput(5)">
                        <input ref="vipcard" readonly="readonly" type="text" name="" placeholder="请填写" :value="card_number">
                        <img src="../../common/images/departmentlist/arrowIcon.png" alt="" />
                    </span>
                </li>
            </ul>
            <div class="cardDemo">
                <div>
                    <img @click.prevent="" src="../../common/images/departmentlist/democard.png">
                </div>
                <p @click="openCard">暂无会员卡？立即开通</p>
            </div>
        </div>
        <p @click="saveInfo" class="sumbitInfo">保存</p>
        <toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import http from '@common/js/http.js';
import { Toast } from 'vux'
import { getStore,setStore,changePageTitle } from '@common/js/mUtils';

export default {
    // beforeRouteEnter(to,from,next){
    // },
    data(){
        return {
            showToast:false,
            position:'middle',  //top,middle,bottom
            msg:'提示信息',
            getCode:true,
            messagecode:''
            // doctor_id:'',
            // depart_id:'',
            // type:'',
            // s_date:'',
            // s_time:''
        }
    },
    computed:{
        ...mapState({
            patientId:state => state.addPatient.patientId,
            ID_no:state => state.addPatient.ID_no,
            mobile:state => state.addPatient.mobile,
            realname:state => state.addPatient.realname,
            sex:state => state.addPatient.sex,
            age:state => state.addPatient.age,
            code:state => state.addPatient.code,
            card_number:state => state.addPatient.card_number 
        })
    },
    mounted(){
        
        this.messagecode = this.code;
    },
    watch:{
        messagecode(){ //短信验证码
            this.$store.commit('changeVal',{
                field:'code',
                val:this.messagecode
            });
        }
    },
    methods:{
        saveInfo(){//保存所有信息
            if(!this.realname){
                this.msg = '请填写姓名';
                this.showToast = true;
                return false;
            }

            if(!this.ID_no){
                this.msg = '请输入身份证号';
                this.showToast = true;
                return false;
            }

            if(!this.mobile){
                this.msg = '请输入手机号码';
                this.showToast = true;
                return false;
            }
            
            if(!this.messagecode){
                this.msg = '请验证验证码';
                this.showToast = true;
                return false;
            }

            if(!this.$refs.vipcard.value){
                this.msg = '请填写会员卡号';
                this.showToast = true;
                return false;
            }

            var access_token = getStore('access_token') || '';
            if(this.patientId != ''){ //如果有病人id就是修改
                http.post(`/api/user/patient_save?access_token=${access_token}`,{
                    id:this.patientId,
                    ID_no:this.ID_no,
                    mobile:this.mobile,
                    realname:this.realname,
                    code:this.code,
                    bind_card:1,
                    card_number:this.$refs.vipcard.value
                }).then((res)=>{
                   
                    this.$router.push('/patientslist');
                }).catch((err)=>{
                    this.msg = err;
                    this.showToast = true;
                    
                })
            }else{
                http.post(`/api/user/add_patient?access_token=${access_token}`,{
                    ID_no:this.ID_no,
                    mobile:this.mobile,
                    realname:this.realname,
                    code:this.code,
                    bind_card:1,
                    card_number:this.$refs.vipcard.value
                }).then((res)=>{
                    this.$router.push('/patientslist');
                }).catch((err)=>{
                    this.msg = err;
                    this.showToast = true;
                    
                })
            }

        },
        getMessgeCode($event){
            let myreg=/^[1][0-9]{10}$/; //手机号验证

            if(!myreg.test(this.mobile)){
                this.msg = '请输入有效的11位手机号码';
                this.showToast = true;
                return false;
            }

            if(this.patientId != ''){
                
                if(this.getCode){
                    this.getCode = false;
                    var seconds = 60;
                    var timer = null;
                    $event.target.innerHTML = seconds+'秒后重新获取';
                    timer = setInterval(()=>{
                        seconds--;
                        $event.target.innerHTML = seconds+'秒后重新获取';

                        if(seconds == 0){
                            clearInterval(timer)
                            $event.target.innerHTML = '获取验证码';
                            this.getCode = true;
                        }

                    },1000)

                    http.fetch('/api/user/send_sms_code_by_id',{
                        id:this.patientId
                    }).then((res)=>{
                        this.msg = res;
                        this.showToast = true;
                    }).catch((err)=>{
                        this.msg = res;
                        this.showToast = true;
                        return false;
                    })

                }

            }else{
                
                if(this.getCode){
                    this.getCode = false;
                    var seconds = 60;
                    var timer = null;
                    $event.target.innerHTML = seconds+'秒后重新获取';
                    timer = setInterval(()=>{
                        seconds--;
                        $event.target.innerHTML = seconds+'秒后重新获取';

                        if(seconds == 0){
                            clearInterval(timer)
                            $event.target.innerHTML = '获取验证码';
                            this.getCode = true;
                        }

                    },1000)

                    http.fetch('/api/user/send_sms_code',{
                        mobile:this.mobile
                    }).then((res)=>{
                        this.msg = res;
                        this.showToast = true;
                    }).catch((err)=>{
                        this.msg = res;
                        this.showToast = true;
                       
                    })

                }
            }
            
        },
        goInput(_index){
            
            this.$router.push({
                path:'/inputinfo',
                query:{
                    val:_index,
                    // doctor_id:this.doctor_id,
                    // depart_id:this.depart_id,
                    // s_date:this.s_date,
                    // s_time:this.s_time,
                    // type:this.type
                }
            });
        },
        openCard(){
            this.$router.push('/opencard');
        }
    },
    components:{
        Toast
    }
}
</script>

<style lang="less">
#addpatient>div{
    width: 100%;
    padding: 0 .3rem;
    background-color: #ffffff;
}
#addpatient>div:nth-of-type(2){
    margin-top:.2rem;
}
#addpatient .apInfo>li:nth-of-type(1){
    border-top:none;
}
#addpatient .apInfo>li{
    height:.86rem;
    line-height:.86rem;
    border-top:.03rem solid #F5F5F5;
}

#addpatient .apInfo > .bindVipCard{
    line-height:inherit;
}

#addpatient .apInfo > .bindVipCard span:nth-of-type(1){
    margin-top:.3rem;
}

#addpatient .messageCode{
    color:#66e4cc!important;
}

#addpatient .apInfo>li span:nth-of-type(1){
    float:left;
    font-size: .28rem;
    font-weight: 500;
    letter-spacing: .006rem;
    color: #bbbbbb;
}
#addpatient .apInfo>li span:nth-of-type(2){
    float:right;
}
#addpatient .apInfo>li span:nth-of-type(2) i{
    display:inline-block;
    font-size: .28rem;
    font-weight: 500;
    letter-spacing: .006rem;
    color: #d4d4d4;
    margin-right:.2rem;
}

#addpatient .apInfo>li span:nth-of-type(2) input{
    height:.8rem;
    width:4rem;
    margin-right:.3rem;
    text-align: center;
    border:none;
    color: #191919;
    font-weight: 500;
    font-size: .28rem;
    text-align: right;
}

#addpatient .apInfo>.mobileCode span:nth-of-type(2) .mobileText{
    height:.8rem;
    width:2rem;
    margin-right:.3rem;
    text-align: center;
    border:none;
    color: #191919;
    font-weight: 500;
    font-size: .28rem;
    text-align: center;
}

#addpatient .apInfo>li span:nth-of-type(2) img{
    display:inline-block;
    width:.13rem;
    height:.2rem;
}


#addpatient .vipCardImg>img{
    width:.4rem;
    height:.32rem;
    display:inline-block;
    vertical-align: middle;
}

#addpatient .apInfo > .vipCardImg span:nth-of-type(1){
    float:none;
    display:inline-block;
    vertical-align: middle;
    margin-left:.18rem;
}


#addpatient>.sumbitInfo{
    position: fixed;
    bottom: .5rem;
    left: 50%;
    margin-left: -3.45rem;
    width: 6.9rem;
    height: .92rem;
    line-height: .92rem;
    font-size: .36rem;
    font-weight: 500;
    letter-spacing: 0.029rem;
    text-align: center;
    color: #ffffff;
    opacity: 0.99;
    border-radius: .46rem;
    background-image: linear-gradient(319deg, #53dfc6, #c3ffe4);
    background-image: -moz-linear-gradient(319deg, #53dfc6, #c3ffe4);
    background-image: -o-linear-gradient(319deg, #53dfc6, #c3ffe4);
    background-image: -webkit-linear-gradient(319deg, #53dfc6, #c3ffe4);
    background-image: linear-gradient(319deg, #53dfc6, #c3ffe4);
}


input::-webkit-input-placeholder{
    color:#d4d4d4;
}
input:-moz-placeholder{
    color:#d4d4d4;
}
input::-moz-placeholder{
    color:#d4d4d4;
}
input:-ms-input-placeholder{
    color:#d4d4d4;
}


#addpatient .weui-cell__bd{
    display:none;
}
#addpatient .weui-switch:checked, #addpatient .weui-switch-cp__input:checked ~ .weui-switch-cp__box{
    border-color: #66e4cc;
    background-color: #66e4cc;

}


#addpatient .cardDemo{
    border-top: .03rem solid #F5F5F5;
    padding-bottom:.47rem;
}
#addpatient .cardDemo div{
    margin:0 auto;
    width:6.33rem;
    height:4.28rem;
    overflow: hidden;
}
#addpatient .cardDemo div img{
    width:100%;
}
#addpatient .cardDemo p{
  font-size: .279rem;
  font-weight: 500;
  font-style: normal;
  line-height: normal;
  letter-spacing: .006rem;
  text-align: center;
  color: #66e4cc;
}

</style>
