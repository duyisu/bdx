<template lang="html">
	<div id="clinicindex">
		<div class="box">
			<div class="bg">
			
			</div>
			<div class="pageheader">
				<div class="header">
					<div>
						<img :src="doctorInfo.image" :alt="doctorInfo.name" :onerror="errorImg">
						
					</div>
					<div>
						<h4>{{ doctorInfo.name }}</h4>
					</div>
					<div>
            <span>北斗星儿童医院</span>
						
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
					</div>
					
				</div>
			</div>
		</div>
		<div @click="linkAddress" class="address">
			<span>北斗星儿童医院<em>（执业医院）</em></span>
			<i>|</i>
			<img src="../../common/images/mapIcon.png" alt="" />
		</div>
		<div class="doctorIntro">
			<div>
				<h4>门诊简介</h4>
				<div>
					<p>{{ doctorInfo.description }}</p>
					<!-- <p>擅长：{{ doctorInfo.expertise_area }}</p> -->
				</div>
			</div>
		</div>
		<div class="remark">
			<div>
				<h4>患者评价</h4>
				<evaluation v-if="evaluationFlag" :list="evaluationList" @loadMoreData="loadEvaluations"></evaluation>
				
			</div>
		</div>
		<toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
	</div>
</template>

<script>
import evaluation  from '@components/evaluation/Evaluation';
import axios from 'axios';
import http from '@common/js/http.js';
import { Toast } from 'vux';
import { s_evaluationList } from '@service/service';
export default {
	beforeRouteEnter(to,from,next){
    	window.document.title = '门诊主页';
    	next((vm)=>{
    		vm.doctor_id = to.query.doctor_id;
    		vm.depart_id = to.query.depart_id;
    	});
    },
    data(){
    	return {
    		msg:'',
    		showToast:false,
    		position:'middle',
    		doctor_id:'',
    		depart_id:'',
    		collect:'',
    		defaultImg:require('../../common/images/departmentlist/normal.png'),
    		practice:[],
    		star:5,
    		tag:[],
    		doctorInfo:{},
    		labelList:[],
        evaluationFlag: false,
        evaluationList:[],
        showContactUs: false,
        page: 1,
        row: 3,
            errorImg: 'this.src="' + require('../../common/images/departmentlist/ek.png') + '"'
    	}
    },
    watch:{
    	collect(){
    		//1：已收藏，0：未收藏
    		if(this.collect == 1){
    			this.defaultImg = require('../../common/images/departmentlist/likedoctorIcon.png')
    		}else{
    			this.defaultImg = require('../../common/images/departmentlist/normal.png')
    		}
    	}
    },
    mounted(){
    	this.$nextTick(function(){
    		setTimeout(()=>{
    			// this.getDoctorInfo();
    			this.getEvaluationList();
    			axios.all([this.getClinicInfo()]).then(axios.spread((res1)=>{
    				//获取医生信息
    				this.doctorInfo = res1;
    				// this.practice = res1.practice;
    				this.star = parseInt(res1.star);
    				// this.tag = res1.tag;
    				this.collect = res1.is_collect;


    			})).catch((err)=>{
    				
    			})
    		},16)
    	})
    },
    methods:{
    	getClinicInfo(){
        return http.fetch('/api/doctors/outpatient_detail',{
          depart_id:this.depart_id
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
    	linkAddress(){
    		this.$router.push('/hospitalWay');
    	}
    },
    components:{
    	Toast,
    	evaluation
    }
    
}
</script>

<style lang="less">
#clinicindex .box{
	position:relative;
}
#clinicindex .bg{
	position:relative;
	margin-top:-1px;
	width:7.5rem;
	height:4.19rem;
	background:url(../../common/images/departmentlist/doctorbg.png) no-repeat;
	background-size:cover;
}
#clinicindex .bg img{
	width:0.52rem;
	height:.44rem;
	position:absolute;
	right:.3rem;
	top:.43rem;
	z-index:2;
}
#clinicindex .pageheader{
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
#clinicindex .header{
	position:relative;
	top:-0.77rem;
}
#clinicindex .header>div:nth-of-type(1){
	display:inline-block;
	// width:1.66rem;
	// height:1.66rem;
	// background:#fff;
	// padding:2px;
	// border-radius: 50%;
	// overflow:hidden;
}
#clinicindex .header>div:nth-of-type(1) img{
	width:1.64rem;
	width:1.64rem;
	border-radius: 50%;
}
#clinicindex .header>div:nth-of-type(2){
	margin-top:0.1rem;
}
#clinicindex .header>div:nth-of-type(2) h4{
  font-size: .36rem;
  font-weight: bold;
  color: #191919;
}
#clinicindex .header>div:nth-of-type(3){
	font-size: 0;
	margin-top:.15rem;
}
#clinicindex .header>div:nth-of-type(3) span{
  font-size: .26rem;
  font-weight: 500;
  color: #898989;
  margin:0 .07rem;
  display:inline-block;
  vertical-align: middle;
}
#clinicindex .header>div:nth-of-type(3) i{
  font-size: .26rem;
  color:#f5f5f5;
  font-weight: bold;
  margin:0 .07rem;
  display:inline-block;
  vertical-align: middle;
}
#clinicindex .header>div:nth-of-type(4){
	font-size:0;
	margin-top:.2rem;
}
#clinicindex .header>div:nth-of-type(4)>span{
	width: 44px;
	height: 25px;
	font-size: .32rem;
	font-weight: 500;
	color: #191919;
}
#clinicindex .header>div:nth-of-type(4) ul{
	display:inline-block;
	margin-right:0.11rem;
}
#clinicindex .header>div:nth-of-type(4) ul li{
	width:0.28rem;
	height:0.28rem;
	display:inline-block;
	margin-right:0.11rem;
}
#clinicindex .header>div:nth-of-type(4) ul li img{
	width:0.28rem;
	height:0.28rem;
}
#clinicindex .header>div:nth-of-type(5){
	font-size:0;
	margin-top:.2rem;
}
#clinicindex .header>div:nth-of-type(5) p{
	display:inline-block;
	padding:0.14rem 0.2rem;
	border-radius: .27rem;
	background-color: #ecfcf9;
  	font-size: .26rem;
  	font-weight: 500;
  	color: #66e4cc;
  	margin:0 .08rem;
}
#clinicindex .liopacity{
	opacity:0.35;
}

#clinicindex .address{
	margin:.97rem auto .22rem;
	width: 6.9rem;
  	height: 1.07rem;
  	line-height:1.07rem;
  	border-radius: .08rem;
  	background-color: #ffffff;
  	box-shadow: -0.014rem -0.014rem 0.158rem 0.002rem rgba(0, 0, 0, 0.06);
	font-size:0;
	text-align: center;
}
#clinicindex .address span{
	font-size: .28rem;
	font-weight: 500;
	letter-spacing: 0.6px;
	color: #898989;
	display:inline-block;
	vertical-align: middle;
	margin-left:.19rem;
	margin-right:.19rem;
}
#clinicindex .address span em{
	font-size: .26rem;
	letter-spacing: .005rem;
	color: #bbbbbb;
}
#clinicindex .address i{
  	font-size: .28rem;
  	font-weight: 500;
  	letter-spacing: 0.6px;
  	color: #f5f5f5;
  	display:inline-block;
  	vertical-align: middle;
  	margin-left:.19rem;
  	margin-right:.19rem;
}
#clinicindex .address img{
	width:.34rem;
	height:.4rem;
	display:inline-block;
  	vertical-align: middle;
  	margin-left:.19rem;
    margin-right:.19rem;
}

#clinicindex .doctorIntro{
	width:100%;
  	border-radius: .08rem;
  	background-color: #ffffff;
  	box-shadow: -0.014rem -0.014rem .158rem 0.002rem rgba(0, 0, 0, 0.06);
	padding-bottom:.06rem;
	overflow: hidden;
}
#clinicindex .doctorIntro>div{
	width:6.9rem;
	margin:0 auto;
}
#clinicindex .doctorIntro>div h4{
  	font-size: .36rem;
  	font-weight: bold;
  	text-align: left;
  	color: #191919;
  	margin-top:.4rem;
  	margin-bottom:.2rem;
}
#clinicindex .doctorIntro>div>div p:nth-of-type(1){
	border-top:none;
}
#clinicindex .doctorIntro>div>div p{
	line-height:.48rem;
  	font-size: .281rem;
  	font-weight: 500;
  	letter-spacing: .01rem;
  	color: #898989;
  	padding:.36rem 0;
  	border-top:.02rem solid #F5F5F5;
}

#clinicindex .remark{
	width: 100%;
    border-radius: .08rem;
    background-color: #ffffff;
    -webkit-box-shadow: -0.014rem -0.014rem 0.158rem 0.002rem rgba(0, 0, 0, 0.06);
    box-shadow: -0.014rem -0.014rem 0.158rem 0.002rem rgba(0, 0, 0, 0.06);
    padding-bottom: .06rem;
    overflow: hidden;
    margin-top:.19rem;
}
#clinicindex .remark > div {
    width: 6.9rem;
    margin: 0 auto;
    margin-top:.19rem;
}
#clinicindex .remark > div h4 {
    font-size: .36rem;
    font-weight: bold;
    text-align: left;
    color: #191919;
    margin-top: .4rem;
}

</style>
