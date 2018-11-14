<template lang="html">
	<div id="department">
		<h2 class="tab">
			<p>
				<span @click="doctorTab" :class="{leftactive:!tab}">专家</span>
				<span @click="timeTab" :class="{rightactive:tab}">时间</span>
			</p>
		</h2>
		<div v-show="tab" class="doctor">
		</div>
		<div v-show="!tab" class="pretime">
			<div class="scrollbox">
				<span
					@click="selectTime(index)"
					:key="index"
					:class="{scrollactive:item.day == timeall[isActive].day}"
					v-for="item,index in timeall">
					{{ item.weekday }} {{ item.day }}
				</span>
				<!--<span class="scrollactive">明天 4.29</span>-->
			</div>
		</div>
		<ul class="doctorList">
			<li :key="index" v-for="item,index in doctorList"   @click="appointment(item.doctor_id,index)">
				<div class="clearfix">
					<div class="doctorLeft">
						<img :src="item.image" :onerror="errorImg">
						
					</div>
					<div class="doctorRight">
						<p class="doctorInfo"><span>{{item.name}}</span><span>{{ item.practice[0] }}</span></p>
						<p class="available">
							<span>
								<img src="../../common/images/departmentlist/starIcon.png" alt="" />
								<!-- <i><em>9</em><em>.7</em></i> -->
								<i><em>
									{{ Number(item.star)*2 }}
								</em></i>
							</span>
							<em>问诊量：{{ item.check_count }}</em>
						</p>
						<p class="des">擅长：{{ item.expertise_disease }}</p>
						
                        <priceAbout :priceData='item'></priceAbout>
					</div>
					<p  class="appointment">预约</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import http from '@common/js/http.js';
import PriceAbout from '@components/priceAbout/PriceAbout';
export default {
    components:{
        PriceAbout
    },
    data(){
    	return {
    		year:new Date().getFullYear(),
    		type:'',
    		isActive:0,
    		tab:true,
    		depart_id:'',
    		doctorList:[],
    		timeall:[],
            errorImg: 'this.src="' + require('../../common/images/avatar.png') + '"'
    	}
    },
    beforeRouteEnter(to,from,next){
    	window.document.title = to.query.text;
    	next((vm)=>{
    		vm.depart_id = to.query.depart_id;
    		vm.type = to.query.type;
    	});
    },
	created(){
		if(this.$route.query){
            this.depart_id = this.$route.query.depart_id;
        }
	},
    mounted(){

    	this.$nextTick(function(){

    		setTimeout(()=>{
    			this.getDoctorList();
    		},16)

    		var weekArr = ['周日','周一','周二','周三','周四','周五','周六']
	    	var d = new Date();
	    	for(var i=0;i<=21;i++){ //设置今天往后21天
				var day = d.getDate();//得到今天是那一天
				d.setDate(day + 1); //每次循环得到天数往前加1
				var perDay = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
				perDay = perDay.substring(5).split('-').join('.');
				var week = d.getDay();
				this.timeall.push({day:perDay,weekday:weekArr[week]});
			};
    	})
    },
    methods:{
    	getDoctorList(){
            //获取医生列表
            http.fetch('/api/doctors',{depart_id:this.depart_id}).then((res)=>{
                    this.doctorList = res;
                    
            }).catch((err)=>{
                
            })
        },
        getTimeList(appointTime){
        	//根据时间获取医生列表
            http.fetch('/api/doctors',{
            	depart_id:this.depart_id,
            	visit_date:appointTime
            }).then((res)=>{
                    this.doctorList = res;
                    

            }).catch((err)=>{
                
            })
        },
    	doctorTab(){
    		this.tab = true;
    		this.getDoctorList();
    	},
    	timeTab(){
    		this.tab = false;
    		this.getTimeList(this.year+'.'+this.timeall[0].day);
    	},
    	selectTime(index){
    		this.isActive = index;
    		this.getTimeList(this.year+'.'+this.timeall[index].day);
    	},
    	appointment(id,index){
    		this.$router.push({
    			path:'/doctorinfo',
    			query:{
    				depart_id:this.depart_id,
    				doctor_id:id,
    				type:this.type,
                    normal_price:this.normal_price,
                    index:index
    			}
    		});
    	}
    }
}
</script>

<style lang="less">
#department .tab{
	width:100%;
	height:1.1rem;
	background:#fff;
	text-align: center;
	font-weight: normal;
	box-shadow: 2px 0 30.7px 1.3px rgba(207, 207, 207, 0.25);
	position:relative;
}
#department .tab p{
	width:3.1rem;
	height:0.66rem;
	background:#48cdbb;
	position:relative;
	margin:0 auto;
	top:0.23rem;
	border-radius: .1rem;
}
#department .tab p span{
	font-weight: bold;
	font-size:0.32rem;
	position:absolute;
	left:1px;
	top:1px;
	width:1.54rem;
	height:0.62rem;
	line-height:0.62rem;
	text-align: center;
	color:#fff;
	letter-spacing: 0.006rem;
}
#department .tab p span:nth-of-type(2){
	left:1.54rem;
}
#department .tab p span.rightactive{
	background:#fff;
	color:#48cdbb;
	border-radius:0 0.1rem 0.1rem 0;
}
#department .tab p span.leftactive{
	background:#fff;
	color:#48cdbb;
	border-radius:0.1rem 0 0 0.1rem;
}
#department .doctor{
	margin-top:0.24rem;
}
#department .doctorList{
	background:#fff;
    padding:0 .3rem;
}
#department .doctorList li{
	position:relative;
    margin-bottom: .3rem;
}
#department .doctorList li>div{
	width:6.9rem;
	margin:0 auto;
	padding:.4rem 0.3rem;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 0 27px 0 rgba(0, 0, 0, 0.09);
}
#department .doctorLeft{
	width:1.9rem;
    height: 2.82rem;
	float:left;
    border-radius:.08rem;
    overflow:hidden;
}
#department .doctorLeft>img{
    display: block;
	width:100%;
	height:100%;
}
#department .doctorRight{
	float:right;
    width: 3.98rem;
}
#department .doctorInfo{
	font-size:0;
	padding-top:0.14rem;
}
#department .doctorInfo span:nth-of-type(1){
	color:#191919;
	font-size:0.32rem;
	display: inline-block;
	vertical-align: bottom;

}
#department .doctorInfo span:nth-of-type(2){
	display: inline-block;
	vertical-align: bottom;
	font-size:.26rem;
	color:#898989;
	margin-left:.21rem;
}

#department .scrollbox{
	height:.86rem;
	display:-webkit-box;
	display:-webkit-flex;
	display:-ms-flexbox;
	display:flex;
	-webkit-flex-wrap:nowrap;
	-ms-flex-wrap:nowrap;
	flex-wrap:nowrap;
	-webkit-box-pack:justify;
	-webkit-justify-content:space-between;
	-ms-flex-pack:justify;
	justify-content:space-between;
	overflow:auto;
    margin-bottom: .3rem;
}
#department .scrollbox>span{
	-webkit-box-flex:1;
	-webkit-flex:1 0 auto;
	-ms-flex:1 0 auto;
	flex:1 0 auto;
	color:#191919;
	width: 2.08rem;
  	height:.86rem;
  	font-size: .28rem;
  	line-height:.86rem;
  	letter-spacing: .006rem;
  	text-align: center;
  	font-weight: 500;
}
#department .scrollbox>span.scrollactive{
	color:#48cdbb;
	border-bottom:0.04rem solid #48cdbb;
}
#department .available{
	font-size:0;
	padding-top:0.2rem;
}
#department .available span{
	color:#ffc001;
}
#department .available span i{
	font-weight: bold;
}
#department .available span em:nth-of-type(1){
	font-size:.32rem;
	margin-left:.13rem;
}
#department .available span em:nth-of-type(2){
	font-size:.28rem;
}
#department .available span img{
	width:0.28rem;
	height:0.28rem;
}
#department .available>em{
	font-size:.24rem;
	color:#bbb;
	margin-left:0.31rem;
	font-weight: 500;
}
#department .des{
    display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 2;
    overflow: hidden;
	color:#898989;
	font-size:0.24rem;
    line-height:1.33;
    margin-top: .3rem;
    margin-bottom:.2rem;
}

#department .appointment{
	z-index:2;
	touch-action: none;
	width: 1rem;
  	height:.46rem;
  	opacity: 0.99;
  	line-height:.46rem;
  	text-align: center;
  	font-size: .26rem;
  	letter-spacing: .019rem;
	position:absolute;
	color:#48cdbb;
	right:.2rem;
	top:.5rem;
	border-radius: .23rem;
	background-color: #fff;
    border:.02rem solid #48cdbb;
}
</style>
