<template lang="html">
    <div id="ordersubmit">
        <!-- <div class="countdown">
            <img src="../../common/images/departmentlist/timeIcon.png" alt="" />
            <span>{{ miniteAndSec }}后订单将自动取消</span>
        </div> -->
        <div>
            <div class="order_header">
                
                <div class="order_info">
                    <!-- <p>
                        <span>就诊医院：</span>
                        <i>武汉北斗星耳鼻喉医院</i>
                    </p> -->
                    <p>
                        <span>就诊科室：</span>
                        <i>{{ ks }}</i>
                    </p>
                    <p>
                        <span>医生姓名：</span>
                        <i>{{doctor_name}}</i>
                    </p>
                    <p>
                        <span>门诊时间：</span>
                        <i style="color:#48cdbb">{{ appointTime }}</i>
                    </p>
                    <p>
                        <span>门诊类型：</span>
                        <i>专家门诊</i>
                    </p>
                    <p>
                        <span>挂号费用：</span>
                        <i style="color:#48cdbb;">￥{{ fee }} <em style="color:#898989" v-if='type==8 || type == 9'>（会员）</em><em style="color:#898989" v-else>（非会员）</em></i>
                    </p>
                </div>
                
                <div class="order_info order_bottom">
                    <p>
                        <span>就诊人：</span>
                        <i>{{ patientInfo.realname }}</i>
                    </p>
                    <p>
                        <span>身份证号：</span>
                        <i>{{ patientInfo.ID_no }}</i>
                    </p>
                    <p>
                        <span>手机号：</span>
                        <i>{{ patientInfo.mobile }}</i>
                    </p>
                    <!-- <p>
                        <span>就诊类型：</span>
                        <i>{{ firstOrsecond }}</i>
                    </p> -->
                </div>
                
            </div>
        </div>
        
        <p @click="tjappoint" class="sumbitInfo">提交预约</p>
        
        
    </div>
</template>

<script>
import { baseUrl,host } from '@common/js/config';
import { mapState } from 'vuex'
import { getStore } from '@common/js/mUtils.js';
import http from '@common/js/http.js';
export default {
    beforeRouteEnter(to,from,next){
        next((vm)=>{
            vm.id = to.query.id;
            vm.ks = to.query.ks;
            vm.appointTime = to.query.appointTime;
            vm.fee = to.query.fee;
            vm.order_id = to.query.order_id;
            vm.doctor_name = to.query.doctor_name;
            vm.type = to.query.type;
        })
    },
    data(){
        return {
            id:'',
            ks:'',
            appointTime:'',
            fee:'',
            order_id:'',
            patientInfo:{},
            countNum:15, //15分钟倒计时
            miniteAndSec:'', //显示离15分钟倒计时还有多少秒
            timer:null,
            doctor_name:'', //倒计时对象,
            type:''
        }
    },
    mounted(){
        //订单生成毫秒数时间1526278805964

        setTimeout(()=>{

            this.getPatientlist().then((res)=>{

                let info = res.filter((item)=>{
                    return item.id == this.id
                })[0];

                this.patientInfo = info;


            }).catch((err)=>{
                
            })


            let dateTime = new Date().getTime();
            if(window.localStorage.getItem('dateTime')){
                dateTime = window.localStorage.getItem('dateTime');
            }else{
                window.localStorage.setItem('dateTime',dateTime);
            }

            this.countDown(dateTime);
            this.timer = setInterval(()=>{
                this.countDown(dateTime)
            },1000);
        },16)

        
    },
    computed:{
        ...mapState({
            ID_no:state => state.addPatient.ID_no,
            mobile:state => state.addPatient.mobile,
            realname:state => state.addPatient.realname,
            sex:state => state.addPatient.sex,
            age:state => state.addPatient.age,
            code:state => state.addPatient.code,
            firstOrsecond:state => state.addPatient.firstOrsecond,
            diseaseInfo:state => state.addPatient.diseaseInfo
        })
    },
    methods:{
        getPatientlist(){
            //获取就诊人列表
            return http.fetch('/api/user/patient_list')
        },
        cancelOrder(){
            //取消订单
            return http.fetch('/api/user/cancel_reg_order',{
                order_id:this.order_id
            });
        },
        countDown(dateTime){
            let leftTime = new Date().getTime() - dateTime;
            leftTime = this.countNum*60*1000 - leftTime;
            
            let minite = addZero(parseInt(leftTime/1000/60%60)); //剩余时间换算成分钟
            let sec = addZero(parseInt(leftTime/1000%60)); //剩余时间换算成秒

            this.miniteAndSec = minite+':'+sec;
            
            if(leftTime <= 0){
                clearInterval(this.timer);
                this.cancelOrder();
                setTimeout(()=>{
                    this.$router.push('/departmentlist');
                },16)
            }
            
            function addZero(n){
                return n = n < 10 ? '0'+n : n; 
            }
            
        },
        tjappoint(){

            let url = `${host}#/myappoint?id=1`;
            let href = encodeURIComponent(url);
            let access_token = getStore('access_token') || '';

            window.location.href = `${baseUrl}pay/wxpay/index.html?redirect_uri=${href}&order_id=${this.order_id}&order_type=reg&access_token=${access_token}`;
        }
    }
}
</script>

<style lang="less">


#ordersubmit{
    padding-bottom:.3rem;
    width: 100%;
    height: 100%;
    background: #f2f2f2;
}
#ordersubmit>div{
    width: 100%;
}

#ordersubmit>.countdown{
    width: 100%;
    height: .86rem;
    line-height:.86rem;
    background-color: #fffac8;
    text-align: center;
}

#ordersubmit .countdown>img{
    margin-top:-1px;
    width:.28rem;
    display:inline-block;
    vertical-align: middle;
}
#ordersubmit .countdown>span{
    display:inline-block;
    vertical-align: middle;
    font-size: .28rem;
    font-weight: 500;
    color: #ffb642;
}

#ordersubmit .order_info{
    margin-top: .2rem;
    padding:.25rem .3rem;
    border-bottom:.02rem solid #f5f5f5;
    background: #fff;
}
#ordersubmit .order_info>p{
    line-height:.56rem;
}
#ordersubmit .order_info>p span{
    display:inline-block;
    width: 1.56rem;
    font-size: .28rem;
    font-weight: 500;
    letter-spacing: .006rem;
    text-align: left;
    color: #898989;
}
#ordersubmit .order_info>p i{
    display:inline-block;
    font-size: .28rem;
    font-weight: 500;
    letter-spacing: .006rem;
    text-align: left;
    color: #333333;
}
#ordersubmit .order_info>p:nth-of-type(3) i{
    color: #333333;
}

#ordersubmit .order_bottom>p:nth-of-type(3) i{
    color: #333333;
}

#ordersubmit>.sumbitInfo{
    font-size: .36rem;
    font-weight: 500;
    letter-spacing: .029rem;
    color: #ffffff;
    width: 6.9rem;
    height: .92rem;
    line-height: .92rem;
    position: fixed;
    bottom: .5rem;
    left: 50%;
    margin-left: -3.45rem;
    opacity: 0.99;
    text-align: center;
    border-radius: .46rem;
    background: #48cdbb;
}

</style>
