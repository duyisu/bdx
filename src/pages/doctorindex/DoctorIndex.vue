<template lang="html">
	<div id="doctorindex">
	
        <doctorInfoHead :doctorInfo='doctorInfo' :practice='practice' :star='star' :tag='tag' :normalPrice ='normal_price' :vipPrice='vip_price' :doctorId='doctor_id' :departId='depart_id'></doctorInfoHead>
		<div @click="linkAddress" class="address">
			<span>武汉北斗星儿童医院<em>（执业医院）</em></span>
			<i>|</i>
			<img src="../../common/images/mapIcon.png" alt="" />
		</div>
		<div class="doctorIntro">
			<div>
				<h4>医生简介</h4>
				<div>
					<p>{{ doctorInfo.description }}</p>
					<p>擅长：{{ doctorInfo.expertise_area }}</p>
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
import DoctorInfoHead  from '@components/doctorInfoHead/DoctorInfoHead';
import axios from 'axios';
import http from '@common/js/http.js';
import { Toast } from 'vux';
import { s_evaluationList } from '@service/service';
import wxshare from '@common/js/wxapi';
export default {
	  beforeRouteEnter(to,from,next){
    	window.document.title = '医生主页';
    	next((vm)=>{
    		vm.doctor_id = to.query.doctor_id;
    		vm.depart_id = to.query.depart_id;
        vm.index = to.query.index;
        vm.normal_price = to.query.normal_price;
        vm.vip_price = to.query.vip_price
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
    		star:0,
    		tag:[],
    		doctorInfo:{},
    		labelList:[],
      	evaluationFlag: false,
      	evaluationList:[],
      	showContactUs: false,
      	page: 1,
      	row: 3,
        errorImg: 'this.src="' + require('../../common/images/avatar.png') + '"',
        doctorList:[],
        index:'',
        normal_price:'',
        vip_price:''
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
                this.getDoctorList();
    			this.getEvaluationList();
    			axios.all([this.getDoctorInfo()]).then(axios.spread((res1)=>{
    				//获取医生信息
    				this.doctorInfo = res1;
    				this.practice = res1.practice;
    				this.star = parseInt(res1.star);
    				this.tag = res1.tag;
    				this.collect = res1.is_collect;
            let params = {
                title: '北斗星儿童医院'+res1.job[0]+res1.name, 
                desc: res1.expertise_area, 
                link: baseUrl+'m/#/doctorinfo?depart_id='+that.depart_id +'&doctor_id='+that.doctor_id+'&index='+that.index,
                img: res1.image,
            }
            wxshare.share(params)

    			})).catch((err)=>{
    				
    			})
    		},16)
    	})
    },
    methods:{
    	getDoctorInfo(){
            //获取医生信息
            return http.fetch('/api/doctors/detail',{
            	doctor_id:this.doctor_id,
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
    	linkAddress(){
    		this.$router.push('/hospitalWay');
    	},
        getDoctorList(){
            //获取医生列表
            http.fetch('/api/doctors',{depart_id:this.depart_id}).then((res)=>{
                    this.doctorList = res;
                    this.normal_price = res[this.index].normal_price;
                    this.vip_price = res[this.index].vip_price;
                   
            }).catch((err)=>{
                
            })
        },
    },
    components:{
    	Toast,
    	evaluation,
        DoctorInfoHead
    }

}
</script>

<style lang="less">
#doctorindex{
    background: #f2f2f2;
}
#doctorindex .liopacity{
	opacity:0.35;
}
#doctorindex .doctorIndex{
    display: none;
}
#doctorindex .address{
	margin:1.4rem auto .22rem;
	width: 6.9rem;
  	height: 1.07rem;
  	line-height:1.07rem;
  	border-radius: .08rem;
  	background-color: #ffffff;
  	box-shadow: -0.014rem -0.014rem 0.158rem 0.002rem rgba(0, 0, 0, 0.06);
	font-size:0;
	text-align: center;
}
#doctorindex .address span{
	font-size: .28rem;
	font-weight: 500;
	letter-spacing: 0.6px;
	color: #898989;
	display:inline-block;
	vertical-align: middle;
	margin-left:.19rem;
	margin-right:.19rem;
}
#doctorindex .address span em{
	font-size: .26rem;
	letter-spacing: .005rem;
	color: #bbbbbb;
}
#doctorindex .address i{
  	font-size: .28rem;
  	font-weight: 500;
  	letter-spacing: 0.6px;
  	color: #f5f5f5;
  	display:inline-block;
  	vertical-align: middle;
  	margin-left:.19rem;
  	margin-right:.19rem;
}
#doctorindex .address img{
	width:.34rem;
	height:.4rem;
	display:inline-block;
  	vertical-align: middle;
  	margin-left:.19rem;
    margin-right:.19rem;
}

#doctorindex .doctorIntro{
	width:100%;
  	border-radius: .08rem;
  	background-color: #ffffff;
  	box-shadow: -0.014rem -0.014rem .158rem 0.002rem rgba(0, 0, 0, 0.06);
	padding-bottom:.06rem;
	overflow: hidden;
}
#doctorindex .doctorIntro>div{
	width:6.9rem;
	margin:0 auto;
}
#doctorindex .doctorIntro>div h4{
  	font-size: .36rem;
  	font-weight: bold;
  	text-align: left;
  	color: #191919;
  	margin-top:.4rem;
  	margin-bottom:.2rem;
}
#doctorindex .doctorIntro>div>div p:nth-of-type(1){
	border-top:none;
}
#doctorindex .doctorIntro>div>div p{
	line-height:.48rem;
  	font-size: .281rem;
  	font-weight: 500;
  	letter-spacing: .01rem;
  	color: #898989;
  	padding:.36rem 0;
  	border-top:.02rem solid #F5F5F5;
}

#doctorindex .remark{
	width: 100%;
    border-radius: .08rem;
    background-color: #ffffff;
    -webkit-box-shadow: -0.014rem -0.014rem 0.158rem 0.002rem rgba(0, 0, 0, 0.06);
    box-shadow: -0.014rem -0.014rem 0.158rem 0.002rem rgba(0, 0, 0, 0.06);
    padding-bottom: .06rem;
    overflow: hidden;
    margin-top:.19rem;
}
#doctorindex .remark > div {
    width: 6.9rem;
    margin: 0 auto;
    margin-top:.19rem;
}
#doctorindex .remark > div h4 {
    font-size: .36rem;
    font-weight: bold;
    text-align: left;
    color: #191919;
    margin-top: .4rem;
}

</style>
