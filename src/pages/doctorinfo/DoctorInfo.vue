<template lang="html">
	<div id="doctorinfo">
		
        <doctorInfoHead :doctorInfo='doctorInfo' :normalPrice ='normal_price' :vipPrice='vip_price' :index='index' :star='star'></doctorInfoHead>
		<div class="appointmenttime">
			<div>
				<h4>挂号预约</h4>
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
                            <li @click="showBox(item.s_status)" v-if="item.s_status == 4" :class="{gray_3:item.s_status == 4}">
                                <p>{{item.s_date}}</p>
                                <p>休诊</p>
                            </li>
							<li @click="showBox(item.s_status)" v-if="item.s_status == 3" :class="{gray_3:item.s_status == 3}">
								<p>{{item.s_date}}</p>
								<p>待开诊</p>
							</li>
						</template>
						
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
import DoctorInfoHead  from '@components/doctorInfoHead/DoctorInfoHead';
import axios from 'axios';
import http from '@common/js/http.js';
import { PopupPicker,Toast,InlineCalendar,XButton } from 'vux';
import { s_evaluationList } from '@service/service';
import { removeStore } from '@common/js/mUtils.js';
import {baseUrl} from '@common/js/config';
import wxshare from '@common/js/wxapi';

export default {
	beforeRouteEnter(to,from,next){
    	window.document.title = '医生详情';
    	next((vm)=>{
    		vm.doctor_id = to.query.doctor_id;
    		vm.depart_id = to.query.depart_id;
    		vm.type = to.query.type;
            vm.index = to.query.index;
    	});
    },
    data(){
    	return {
    		msg:'',
    		showToast:false,
    		position:'middle',
    		list1: [],
    		type:'',
    		value1:[],
    		dateTime:'',
    		doctorInfo:[],
    		schedule:[],
    		doctor_id:'',
    		depart_id:'',
    		box:false,
    		timeall:[],
            labelList:[],
            evaluationFlag: false,
            evaluationList:[],
            showContactUs: false,
            page: 1,
            row: 3,
            errorImg: 'this.src="' + require('../../common/images/avatar.png') + '"',
            tab:true,
            index:'',
            normal_price:'',
            vip_price:'',
            nowDate:"",
            date:'',
            doctor_name:'',
            star:''
    	}
    },
    mounted(){
        var that = this
        this.$nextTick(function(){

            setTimeout(()=>{
                this.getDoctorList();

            },16)

            
        })
        
    	this.$nextTick(function(){

    		setTimeout(()=>{
    			this.getDoctorInfo();
    			this.getEvaluationList();
    			axios.all([this.getDoctorInfo(),this.getScheduleInfo()]).then(axios.spread((res1,res2)=>{
                    //获取医生信息成功后创建分享
                    let params = {
                        title: '北斗星儿童医院'+res1.job[0]+res1.name, 
                        desc: res1.expertise_area, 
                        link: baseUrl+'m/#/doctorinfo?depart_id='+that.depart_id +'&doctor_id='+that.doctor_id+'&type='+that.type+'&index='+that.index,
                        img: res1.image,
                    }
                    wxshare.share(params)

    				//获取医生信息
    				that.doctorInfo = res1;
    				that.star = parseInt(res1.star);

    				//获取医生排班
    				that.schedule = res2;
                    that.week(res2[that.nowDate +'月'][0].week_f);
    				// if(this.schedule[0].week_f != 0){
    				// 	let week_f = this.schedule[0].week_f;
    				// 	for(let i=0;i<week_f;i++){
    				// 		this.schedule.unshift({
    				// 			s_status:10
    				// 		});
    				// 	}
    				// }
    			})).catch((err)=>{
    			})
    		},16)
    	})

        this.getNowMonth();
        //this.markDoctor();
        

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
        markDoctor(){
            var that = this;
            http.fetch('/api/user/mark_doctor',{
               doctor_id:that.doctor_id
            }).then((res)=>{
               that.msg = res;
               that.showToast = true;
               setTimeout(function(){
                   that.showToast = false
               },1000)
            }).catch((err)=>{
            });
            
        },
        getNowMonth(){
            var nowDate = new Date().getMonth();
            this.nowDate = nowDate + 1;
            this.date = nowDate;
           
        },
    	getDoctorInfo(){
            //获取医生信息
            return http.fetch('/api/doctors/detail',{
            	doctor_id:this.doctor_id,
            	depart_id:this.depart_id
            });
        },
        getDoctorList(){
            //获取医生列表
            http.fetch('/api/doctors',{depart_id:this.depart_id}).then((res)=>{
                    this.normal_price = res[this.index].normal_price;
                    this.vip_price = res[this.index].vip_price;
                    this.doctor_name = res[this.index].name
            }).catch((err)=>{
            })
        },
        getScheduleInfo(){
        	//获取医生排班
        	return http.fetch('/api/doctors/schedule',{
            	doctor_id:this.doctor_id,
                depart_id:this.depart_id
                
            });
        },
        getEvaluationList(){
		  s_evaluationList({
			  depart_id: this.depart_id,
			  doctor_id:this.doctor_id,
			  //is_best: 1,
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
        submitAppointInfo(){
        	//提交预约信息  type预约类型（0-科室预约 1-门诊预约）
        	return http.fetch('/api/doctors/registerInfo',{
        		doctor_id:this.doctor_id,
        		depart_id:this.depart_id,
        		s_date:this.dateTime,
        		s_time:this.value1[0],
        		type:this.type
        	})
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
    	//
    	onHide(closeType){
            removeStore('isAgree');
            removeStore('sayContent');
    		//(closeType) true表示confirm(选择确认), false表示其他情况的关闭
    		if(closeType){
    			this.$router.push({
					path:'/appointinfo',
					query:{
						  doctor_id:this.doctor_id,
		        	      depart_id:this.depart_id,
		        	      s_date:this.dateTime,
		        	      //type:this.type,
                          doctor_name:this.doctor_name,
                          s_time:this.value1[0]
					}
				})
                

    		}else{
    		}
    	},
    	//跳到医生主页
    	toDoctorIndex(){
    		this.$router.push({
    			path:'/doctorindex',
    			query:{
    				doctor_id:this.doctor_id,
    				depart_id:this.depart_id
    			}
    		});
    	},
    	//是否收藏
    	collectHandle(){
    		if(this.collect == 0){
    			this.collect = 1;
    		}else{
    			this.collect = 0;
    		}
    		this.markDoctor();
    	},
    	markDoctor(){
    		http.fetch('/api/user/mark_doctor',{
            	doctor_id:this.doctor_id
            }).then((res)=>{
            	this.msg = res;
            	this.showToast = true;
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
        },
        thisMounth(year,month){
            year = 2018;
            month = 12
        }
    },
    components:{
    	PopupPicker,
    	Toast,
    	evaluation,
        DoctorInfoHead,
        InlineCalendar,
        XButton
    }
}
</script>

<style lang="less">
#haha{
    width: 100%;
    height: .5rem;
    color:#000;
    button{
        display: block;
        width: .8rem;
        height: .5rem;
    }
}
#doctorinfo{
	width:7.5rem;
	overflow:hidden;
    background: #f2f2f2;
    
}

#doctorinfo .liopacity{
	opacity:0.35;
}

#doctorinfo .appointmenttime{
	width:100%;
  	border-radius: .08rem;
  	background-color: #ffffff;
  	box-shadow: -0.014rem -0.014rem .158rem 0.002rem rgba(0, 0, 0, 0.06);
	overflow: hidden;
	margin:1.5rem auto .22rem;
	padding-bottom:.53rem;
}
#doctorinfo .appointmenttime>div{
	width:100%;
    padding:0 .2rem;
    position: relative;
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
#doctorinfo .appointmenttime>div h4{
  	font-size: .36rem;
  	font-weight: bold;
  	text-align: left;
  	color: #333;
  	margin-top:.49rem;
  	margin-bottom:.4rem;
    padding:0 .2rem;
}
#doctorinfo .timeall{
	width:100%;
}
#doctorinfo .timeall>.date{
	font-size:0;
    border-radius: .365rem;
    background-color: #f2f2f2;
    height: .74rem;
    padding:0 .32rem;
}
#doctorinfo .timeall>.date>span{
	display:inline-block;
	margin-left: .46rem;
	height:100%;
	line-height:.74rem;
	text-align: center;
  	font-size: .26rem;
  	font-weight: 500;
  	color: #b3b3b3;
}
#doctorinfo .timeall>.date>span:first-child{
    margin-left: 0;
}
#doctorinfo .perday{
	font-size:0;
    margin-top: .13rem;
}
#doctorinfo .perday>li{
	display:inline-block;
	width:.84rem;
	height:.97rem;
	text-align: center;
  	font-weight: 500;
  	margin-top:.19rem;
    border-radius:.08rem;
    margin-left: .08rem;
    margin-right: .08rem;
    box-shadow: 0.007rem 0.007rem .13rem 0 rgba(179, 179, 179, 0.38);

}
#doctorinfo .perday>li p{
    text-align:center;
}
#doctorinfo .perday>li.keyue{
    p:nth-of-type(1){
        color:#898989;
        font-size:.32rem;
    }
    p:nth-of-type(2){
        color:#48cdbb;
        font-size:.24rem;
        line-height:.24rem;
    }
}
#doctorinfo .perday>li p:nth-of-type(1){
	margin-top:.10rem;
	margin-bottom:.05rem;
	font-size:.32rem;
	color:#898989;
	font-weight: 500;
}
#doctorinfo .perday>li p:nth-of-type(2){
	font-size:.22rem;
	color:#b3b3b3;
    letter-spacing:.035rem;
    line-height:.24rem;
}
#doctorinfo .perday>li.gray{
	background:#f2f2f2;
    box-shadow:none;
}
#doctorinfo .perday>li.gray_3{
    background: #f2f2f2;
    p:nth-of-type(2){
        color:#b3b3b3;
        font-size:.20rem;
        line-height:.24rem;
    }
    box-shadow:none;
}
#doctorinfo .perday>li.gray p{
	
}
#doctorinfo .perday>li.finish{
  	opacity: 0.99;
    background: #47cbba;
    box-shadow:none;
}
#doctorinfo .perday>li.finish p{
	color: #fff;
}

#doctorinfo .remark{
	width: 100%;
    border-radius: .08rem;
    background-color: #ffffff;
    -webkit-box-shadow: -0.014rem -0.014rem 0.158rem 0.002rem rgba(0, 0, 0, 0.06);
    box-shadow: -0.014rem -0.014rem 0.158rem 0.002rem rgba(0, 0, 0, 0.06);
    padding-bottom: .06rem;
    overflow: hidden;
    margin-top:.19rem;
}
#doctorinfo .remark > div {
    width: 6.9rem;
    margin: 0 auto;
    margin-top:.19rem;
}
#doctorinfo .remark > div h4 {
    font-size: .36rem;
    font-weight: bold;
    text-align: left;
    color: #191919;
    margin-top: .4rem;
}
#doctorinfo .weui-cell{
	display:none;
}
#doctorinfo_head .pageheader .header{
    .price{
    margin-top: .34rem;
    padding-top:.24rem;
    padding-bottom: .3rem;
    border-top:.02rem dotted #f2f2f2;
    span{
        display: inline-block;
    }
    .split-line{
        margin: 0 .08rem;
        display: inline-block;
        width: .03rem;
        height: .29rem;
        border-radius: .01rem;
        background-color: #f2f2f2;
        vertical-align:middle;
    }
}
.price span i{
    font-size:0.28rem;
    color: #898989;
    font-weight: bold;
    display: inline-block;
    vertical-align:middle;
}
.price span em{
    font-size:.22rem;
    display: inline-block;
    margin-left:0rem;
    vertical-align:middle;
    img{
        display: block;
        width: 100%;
        height: 100%;
    }
}
.price span em.not-vip{
    width: 1.05rem;
    height: .46rem;
}
.price span em.vip{
    width: .81rem;
    height: .46rem;
}
}

</style>
