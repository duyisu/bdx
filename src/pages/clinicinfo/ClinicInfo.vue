<template lang="html">
    <div id="clinicinfo">
        <div class="box">
            <div class="bg">
                <!-- <img src="../../common/images/departmentlist/normal.png" alt="" /> -->
            </div>
            <div class="pageheader">
                <p @click="toClinicIndex" class="doctorIndex">
                    <span>门诊主页</span>
                    <img src="../../common/images/departmentlist/rightArrow.png" alt="" />
                </p>
                <div class="header">
                    <div>
                        <img :src="clinicInfo.image" :onerror="errorImg"/>
                        <!-- <img src="../../common/images/departmentlist/doctor.jpg" alt="" /> -->
                    </div>
                    <div>
                        <h4>{{ clinicInfo.name }}</h4>
                    </div>
                    <div>
                        <!-- <span style="display:block;">门诊详情</span> -->
                        <span style="color:#bbb;display:block;margin-top:.16rem;">北斗星耳鼻喉医院</span>
                    </div>
                    <div>
                        <ul>
                            <li v-for="item in star">
                                <img src="../../common/images/departmentlist/starIcon.png" alt="" />
                            </li>
                            <li class="liopacity" v-for="item in (5 - star)">
                                <img src="../../common/images/departmentlist/starIcon.png" alt="" />
                            </li>
                        </ul>
                        <span>
                            {{ star*2 }}
                        </span>
                        <!-- <ul>
                            <li><img src="../../common/images/departmentlist/starIcon.png" alt="" /></li>
                            <li><img src="../../common/images/departmentlist/starIcon.png" alt="" /></li>
                            <li><img src="../../common/images/departmentlist/starIcon.png" alt="" /></li>
                            <li><img src="../../common/images/departmentlist/starIcon.png" alt="" /></li>
                            <li class="liopacity"><img src="../../common/images/departmentlist/starIcon.png" alt="" /></li>
                        </ul>
                        <span>8.0</span> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="appointmenttime">
            <div>
                <h4>预约挂号</h4>
                <div class="month"><span :class='{active: tab}' @click='mounthTrue'>{{date+1}}月</span><span :class='{active: !tab}' @click='mounthFalse'>{{date + 2}}月</span></div>
                <div class="timeall">
                    <div class="date">
                        <span>周日</span>
                        <span>周一</span>
                        <span>周二</span>
                        <span>周三</span>
                        <span>周四</span>
                        <span>周五</span>
                        <span>周六</span>
                    </div>
                    <ul class="perday">
                        <!-- 0：约满，1：可约，2：已约，3：未排班 10：补日期 -->
                        <template v-for="item in schedule[nowDate +'月']">
                            <li v-if='item.week_f == -1' style="opacity:0"></li>
                            <li v-if="item.s_status == 10"></li>
                            <li @click="showBox(item.s_status)" v-if="item.s_status == 0" :class="{gray:item.s_status == 0}">
                                <p>{{item.s_date}}</p>
                                <p>约满</p>
                            </li>
                            <li @click="showBox(item.s_status,item.s_date)" v-if="item.s_status == 1" class="keyue">
                                <p>{{item.s_date}}</p>
                                <p>可约</p>
                            </li>
                            <li @click="showBox(item.s_status)" v-if="item.s_status == 2" :class="{finish:item.s_status == 2}">
                                <p>{{item.s_date}}</p>
                                <p>已约</p>
                            </li>
                            <li @click="showBox(item.s_status)" v-if="item.s_status == 3" :class="{gray_3:item.s_status == 3}">
                                <p>{{item.s_date}}</p>
                                <p>待开诊</p>
                            </li>
                        </template>
                        <!--<li><p>4.21</p><p>预约</p></li>
                        <li class="finish"><p>4.21</p><p>已约</p></li>
                        <li class="gray"><p>4.21</p><p>已满</p></li>-->
                    </ul>
                </div>
            </div>
        </div>
        <div class="remark">
            <div>
                <h4>患者评价</h4>
                <evaluation v-if="evaluationFlag" :list="evaluationList" @loadMoreData="loadEvaluations"></evaluation>
            </div>
        </div>
     <popup-picker
        :data="list1"
        v-model="value1"
        @on-show="onShow"
        @on-hide="onHide"
        @on-change="changeValue"
        placeholder=""
        :show.sync="box"
        >
     </popup-picker>
     <toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
    </div>
</template>

<script>
import evaluation  from '@components/evaluation/Evaluation';
import { PopupPicker,Toast } from 'vux';
import http from '@common/js/http.js';
import { s_evaluationList } from '@service/service';

export default {
    beforeRouteEnter(to,from,next){
        window.document.title = '门诊详情';
        next((vm)=>{
            vm.depart_id = to.query.depart_id;
            vm.type = to.query.type;
        });
    },
    data(){
        return {
            msg:'',
            showToast:false,
            position:'middle',
            list1: [['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00','15:30','16:00','16:30','17:00']],
            value1:[],
            dateTime:'',
            type:'',
            box:false,
            timeall:[],
            depart_id:'',
            doctor_id:'',
            clinicInfo:{},
            star:0,
            schedule:[],
            labelList:[],
            evaluationFlag: false,
            evaluationList:[],
            showContactUs: false,
            page: 1,
            row: 3,
            errorImg: 'this.src="' + require('../../common/images/departmentlist/ek.png') + '"',
            nowDate:"",
            tab:true,
            date:''
        }
    },
    computed:{
        getWeek(){
            if(new Date().getDay() == 6){
                return 0;
            }else{
                return new Date().getDay()+1;
            }
        }
    },
    mounted(){
        this.$nextTick(()=>{
            setTimeout(()=>{
                this.getClinicInfo().then((res)=>{
                    
                    this.clinicInfo = res;
                    this.doctor_id = res.doctor_id;
                    this.star = parseInt(res.star);
                    this.getEvaluationList();
                    this.getScheduleInfo().then((res2)=>{
                        
                        //获取医生排班
                        this.schedule = res2;
                        this.week(res2[this.nowDate +'月'][0].week_f);
                        if(this.schedule[0].week_f != 0){
                            let week_f = this.schedule[0].week_f;
                            
                            for(let i=0;i<week_f;i++){
                                this.schedule.unshift({
                                    s_status:10
                                });
                            }
                        }

                    }).catch((err)=>{
                        
                    })

                    
                }).catch((err)=>{
                   
                });
            })

        })
         this.getNowMonth();

    },
    methods:{
        week(week_f){
            var that = this;
            if(week_f == 0){
                return false
            }else if(week_f == 1){
                this.schedule[that.nowDate +'月'].unshift({week_f:-1})
            }else if(week_f == 2){
                this.schedule[that.nowDate +'月'].unshift({week_f:-1},{week_f:-1})
            }else if(week_f == 3){
                this.schedule[that.nowDate +'月'].unshift({week_f:-1},{week_f:-1},{week_f:-1})
            }else if(week_f == 4){
                this.schedule[that.nowDate +'月'].unshift({week_f:-1},{week_f:-1},{week_f:-1},{week_f:-1})
            }else if(week_f == 5){
                this.schedule[that.nowDate +'月'].unshift({week_f:-1},{week_f:-1},{week_f:-1},{week_f:-1},{week_f:-1})
            }else if(week_f == 6){
                this.schedule[that.nowDate +'月'].unshift({week_f:-1},{week_f:-1},{week_f:-1},{week_f:-1},{week_f:-1},{week_f:-1})
            }
        },
        getNowMonth(){
            var nowDate = new Date().getMonth();
            this.nowDate = nowDate + 1;
            this.date = nowDate;
           
        },
        getClinicInfo(){
            return http.fetch('/api/doctors/outpatient_detail',{
                depart_id:this.depart_id
            });
        },
        getScheduleInfo(){
            //获取医生排班
            return http.fetch('/api/doctors/schedule',{
                doctor_id:this.doctor_id
            });
        },
        showBox(_index,dateInfo){
            // 0：约满，1：可约，2：已约，3：未排班
            if(_index == 0){
                this.msg = '今天已约满了';
                this.showToast = true;
            }else if(_index == 1){
                let info = this.schedule[this.nowDate +'月'].filter((item)=>{
                    return item.s_date == dateInfo
                })[0];
                this.dateTime = info.date_f;
                this.list1 = [];
                this.list1.push(info.s_time);
                this.box = true;
            }else if(_index == 2){
                this.msg = '您今天已经预约过了';
                this.showToast = true;
            }else if(_index == 3){
                this.msg = '今天没有排班信息，请选择其他日期';
                this.showToast = true;
            }
        },
        changeValue(){
            
        },
        onShow(){
            
        },
        onHide(closeType){
            
            if(closeType){
              
                this.$router.push({
                    path:'/appointinfo',
                    query:{
                        doctor_id:this.doctor_id,
                        depart_id:this.depart_id,
                        s_date:this.dateTime,
                        s_time:this.value1[0],
                        type:this.type
                    }
                })
            }else{
                // alert('点击了取消');
            }
        },
        getEvaluationList(){
            s_evaluationList({
                depart_id: this.depart_id,
                page: this.page,
                rows: this.row
            }).then(res => {
                this.evaluationList = res;
                if(res.total > 0){
                    this.evaluationFlag = true;
                }else{
                    this.evaluationFlag = false;
                }
            });
        },
        loadEvaluations(data){
            this.page = data.page;
            this.getEvaluationList();
        },
        //跳到门诊主页
        toClinicIndex(){
            this.$router.push({
                path:'/clinicindex',
                query:{
                    doctor_id:this.doctor_id,
                    depart_id:this.depart_id
                }
            });
        },
        mounthTrue(){
            this.tab = true;
            this.nowDate = new Date().getMonth() + 1;
        },
        mounthFalse(){
            this.tab = false;
            this.nowDate = new Date().getMonth() + 2;
            this.week(this.schedule[this.nowDate +'月'][0].week_f);
        }
    },
    components:{
        PopupPicker,
        Toast,
        evaluation
    }
}
</script>

<style lang="less">
#clinicinfo{
    width:7.5rem;
    overflow:hidden;
}
#clinicinfo .box{
    position:relative;
}
#clinicinfo .bg{
    position:relative;
    margin-top:-1px;
    width:7.5rem;
    height:4.19rem;
    background:url(../../common/images/departmentlist/doctorbg.png) no-repeat;
    background-size:cover;
}
#clinicinfo .bg img{
    width:0.52rem;
    height:.44rem;
    position:absolute;
    right:.3rem;
    top:.43rem;
}
#clinicinfo .pageheader{
    position:absolute;
    left:.3rem;
    top:1.19rem;
    width: 6.9rem;
    height: 3.62rem;
    border-radius: .08rem;
    background-color: #ffffff;
    box-shadow: -0.014rem -0.014rem .158rem 0.002rem rgba(0, 0, 0, 0.1);
    text-align: center;
}
#clinicinfo .header{
    position:relative;
    top:-0.77rem;
}
#clinicinfo .header>div:nth-of-type(1){
    display:inline-block;
    width:1.66rem;
    height:1.66rem;
    background:#fff;
    padding:2px;
    border-radius: 50%;
    overflow:hidden;
}
#clinicinfo .header>div:nth-of-type(1) img{
    width:1.64rem;
    width:1.64rem;
}
#clinicinfo .header>div:nth-of-type(2){
    margin-top:0.1rem;
}
#clinicinfo .header>div:nth-of-type(2) h4{
  font-size: .36rem;
  font-weight: bold;
  color: #191919;
}
#clinicinfo .header>div:nth-of-type(3){
    font-size: 0;
    margin-top:.15rem;
}
#clinicinfo .header>div:nth-of-type(3) span{
  font-size: .26rem;
  font-weight: 500;
  color: #898989;
  margin:0 .07rem;
  display:inline-block;
  vertical-align: middle;
}
#clinicinfo .header>div:nth-of-type(3) i{
  font-size: .26rem;
  color:#f5f5f5;
  font-weight: bold;
  margin:0 .07rem;
  display:inline-block;
  vertical-align: middle;
}
#clinicinfo .header>div:nth-of-type(4){
    font-size:0;
    margin-top:.2rem;
}
#clinicinfo .header>div:nth-of-type(4)>span{
    width: 44px;
    height: 25px;
    font-size: .32rem;
    font-weight: 500;
    color: #191919;
}
#clinicinfo .header>div:nth-of-type(4) ul{
    display:inline-block;
    margin-right:0.11rem;
}
#clinicinfo .header>div:nth-of-type(4) ul li{
    width:0.28rem;
    height:0.28rem;
    display:inline-block;
    margin-right:0.11rem;
}
#clinicinfo .header>div:nth-of-type(4) ul li img{
    width:0.28rem;
    height:0.28rem;
}
/*.header>div:nth-of-type(5){
    font-size:0;
    margin-top:.2rem;
}
.header>div:nth-of-type(5) p{
    display:inline-block;
    padding:0.14rem 0.2rem;
    border-radius: .27rem;
    background-color: #ecfcf9;
    font-size: .26rem;
    font-weight: 500;
    color: #66e4cc;
    margin:0 .08rem;
}*/
#clinicinfo .doctorIndex{
    position:absolute;
    z-index:2;
    top:.52rem;
    right:-.06rem;
    width: 2rem;
    height: .54rem;
    border-radius: .27rem 0 0 .27rem;
    line-height:.54rem;
    text-align: center;
    opacity: 0.99;
    background: #4ad0be;
    box-shadow: .06rem 0 .13rem 0 rgba(36, 168, 150, 0.27);
}
#clinicinfo .doctorIndex>span{
  font-size: .28rem;
  font-weight: 500;
  color: #ffffff;
  display:inline-block;
  height: 100%;
}
#clinicinfo .doctorIndex>img{
    width:.12rem;
    height:.2rem;
    vertical-align: middle;
    margin-left:.1rem;
    margin-top:-1px;
}
#clinicinfo .liopacity{
    opacity:0.35;
}

#clinicinfo .appointmenttime{
    width:100%;
    border-radius: .08rem;
    background-color: #ffffff;
    box-shadow: -0.014rem -0.014rem .158rem 0.002rem rgba(0, 0, 0, 0.06);
    overflow: hidden;
    margin:.97rem auto .22rem;
    padding-bottom:.53rem;

}
#clinicinfo .appointmenttime>div{
    position: relative;
    width:6.9rem;
    margin:0 auto;
    .month{
        position: absolute;
        right: .36rem;
        top: 0;
        width: 1.53rem;
        height: .48rem;
        border-radius: .08rem;
        background-color: #ffffff;
        border: solid .02rem #b3b3b3;
        span{
            display: inline-block;
            color: #b3b3b3;
            font-size:.24rem;
            width: 50%;
            height: 100%;
            text-align:center;
            vertical-align:top;
            line-height:.42rem;
        }
        span.active{
            background: #b3b3b3;
            color:#fff;
        }
    }
}
#clinicinfo .appointmenttime>div h4{
    font-size: .36rem;
    font-weight: bold;
    text-align: left;
    color: #191919;
    margin-top:.4rem;
    margin-bottom:.42rem;
}
#clinicinfo .timeall{
    width:6.72rem;
    margin:0 auto;
}
#clinicinfo .timeall>.date{
    font-size:0;
    border-radius: .365rem;
    background-color: #f2f2f2;
    height: .74rem;
    padding:0 .32rem;
    margin-bottom: .1rem;
}
#clinicinfo .timeall>.date>span{
    display:inline-block;
    margin-left: .4rem;
    height:100%;
    line-height:.74rem;
    text-align: center;
    font-size: .26rem;
    font-weight: 500;
    color: #b3b3b3;
}
#clinicinfo .timeall>.date>span:first-child{
    margin-left: 0;
}
#clinicinfo .perday>li{
    display:inline-block;
    width:.83rem;
    height:.97rem;
    text-align: center;
    font-weight: 500;
    margin-top:.19rem;
    border-radius:.08rem;
    margin-left: .05rem;
    //margin-right: .08rem;
    box-shadow: 0.007rem 0.007rem .13rem 0 rgba(179, 179, 179, 0.38);

}
#clinicinfo .perday>li p{
    text-align:center;
}
#clinicinfo .perday>li.keyue{
    p:nth-of-type(1){
        color:#898989;
        font-size:.32rem;
    }
    p:nth-of-type(2){
        color:#48cdbb;
        font-size:.24rem;
    }
}
#clinicinfo .perday>li p:nth-of-type(1){
    margin-top:.10rem;
    margin-bottom:.05rem;
    font-size:.32rem;
    color:#898989;
    font-weight: 500;
}
#clinicinfo .perday>li p:nth-of-type(2){
    font-size:.22rem;
    color:#b3b3b3;
    letter-spacing:.035rem;
}
#clinicinfo .perday>li.gray{
    background:#f2f2f2;
}
#clinicinfo .perday>li.gray_3{
    background: #f2f2f2;
    p:nth-of-type(2){
        color:#b3b3b3;
        font-size:.20rem;
    }
    box-shadow:none;
}
#clinicinfo .perday>li.gray p{
    
}
#clinicinfo .perday>li.finish{
    opacity: 0.99;
    background: #47cbba;
    box-shadow:none;
}
#clinicinfo .perday>li.finish p{
    color: #fff;
}

#clinicinfo .remark{
    width: 100%;
    border-radius: .08rem;
    background-color: #ffffff;
    -webkit-box-shadow: -0.014rem -0.014rem 0.158rem 0.002rem rgba(0, 0, 0, 0.06);
    box-shadow: -0.014rem -0.014rem 0.158rem 0.002rem rgba(0, 0, 0, 0.06);
    padding-bottom: .06rem;
    overflow: hidden;
    margin-top:.19rem;
}
#clinicinfo .remark > div {
    width: 6.9rem;
    margin: 0 auto;
    margin-top:.19rem;
}
#clinicinfo .remark > div h4 {
    font-size: .36rem;
    font-weight: bold;
    text-align: left;
    color: #191919;
    margin-top: .4rem;
}

#clinicinfo .weui-cell{
    display:none;
}
</style>
