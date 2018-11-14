<template lang="html">
	<div id="rechargeDetail">
		<div class="clearfix rechargeMonth">
			<span @click="selectDate" class="fl">
				<img src="../../common/images/personalcenter/rechargeIcon.png" >
				<i>{{ val }}</i>
			</span>
			<span class="fr">充值 {{ totalMoney }}元</span>
		</div>
		<ul class="rechargeInfo">
			<li class="clearfix" 
				:key="index"
				v-for="item,index in filterTime"
			>
				<div class="fl">
					<p>账户充值</p>
					<p>{{ item['交易时间'] }}</p>
				</div>
				<span class="fr">+ {{ item['金额'] }}</span>
			</li>
			<!-- <li class="clearfix">
				<div class="fl">
					<p>账户充值</p>
					<p>2018-05-28 12:22:03</p>
				</div>
				<span class="fr">+ 1500.00</span>
			</li>
			<li class="clearfix">
				<div class="fl">
					<p>账户充值</p>
					<p>2018-05-28 12:22:03</p>
				</div>
				<span class="fr">+ 1500.00</span>
			</li>
			<li class="clearfix">
				<div class="fl">
					<p>账户充值</p>
					<p>2018-05-28 12:22:03</p>
				</div>
				<span class="fr">+ 1500.00</span>
			</li>
			<li class="clearfix">
				<div class="fl">
					<p>账户充值</p>
					<p>2018-05-28 12:22:03</p>
				</div>
				<span class="fr">+ 1500.00</span>
			</li> -->
		</ul>
		<toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
		<group>
			<calendar 
			@on-change="onChange" 
			v-model="demo3" 
			title="禁止选择今天以后" 
			disable-future>
				
			</calendar>
		</group>
	</div>
</template>

<script>
import http from '@common/js/http.js';
import { Toast,Group,Calendar } from 'vux';

export default {
    data(){
    	return {
    		msg:'弹框提示',
    		showToast:false,
    		position:'middle',
    		demo3:'TODAY',
    		dateStr:'',
    		showGroup:false,
    		val:'',
    		card_num:'470757851',
    		rechargelist:[],
    		filterTime:[],
    		totalMoney:''
    	}
    },
    created(){
    	if(this.$route.query){
    		this.card_num = this.$route.query.card_number;
    	}
    },
    mounted(){
    	this.$nextTick(function(){
    		this.getRechargeList().then((res)=>{
    			this.rechargelist = res;
    			console.log(res);
    			this.getFilterTime();
    		}).catch((err)=>{
    			console.log(err);
    		})
    	})
    },
    methods:{
    	getRechargeList(){
    		return http.fetch('/api/user/card_recharge_record',{
    			card_number:this.card_num
    		})
    	},
    	getFilterTime(){
    		this.filterTime = [];
    		this.filterTime = this.rechargelist.filter((item)=>{
				return item['交易时间'].substring(0,7) == this.dateStr;
			})
			this.totalMoney = 0;
			for(var i=0;i<this.filterTime.length;i++){
				this.totalMoney += Number(this.filterTime[i]['金额']);
			}
    	},
    	selectDate(){
    		this.showGroup = true;
    	},
    	log (str) {
	      console.log(str)
	    },
	    onChange (val) {
	      this.dateStr = val.substring(0,7);

	      let year = new Date().getFullYear();
	      let month = new Date().getMonth()+1 < 10 ? '0'+ (new Date().getMonth()+1) :new Date().getMonth()+1;

	      let yearAndmonth = year+'-'+month;

	      if(yearAndmonth == this.dateStr){
	      	this.val = '本月';
	      }else{
	      	this.val = this.dateStr;
	      }

	      // this.msg = this.dateStr;
    	  // this.showToast = true;

    	  this.getFilterTime();
	    }
	},
    components:{
    	Toast,
    	Group,
    	Calendar
    }
}
</script>

<style lang="less">

#rechargeDetail .rechargeMonth{
	width:100%;
	position:fixed;
	left:0;
	top:0;
	background:#fff;
	height:1.02rem;
	line-height:1.02rem;
	padding:0 .3rem;
	z-index:2;
}
#rechargeDetail .rechargeMonth span:nth-of-type(1) img{
	width:.48rem;
	height:.41rem;
	display:inline-block;
	vertical-align: middle;
}
#rechargeDetail .rechargeMonth span:nth-of-type(1) i{
  	font-size: .32rem;
  	font-weight: 500;
  	color: #191919;
  	display:inline-block;
	vertical-align: middle;
	margin-left:0.1rem;
}
#rechargeDetail .rechargeMonth span:nth-of-type(2){
  	font-size: .28rem;
  	font-weight: 500;
  	color: #898989;
}
#rechargeDetail .rechargeInfo{
	position:absolute;
	overflow-y:scroll;
	width:100%;
	top:1.22rem;
	-webkit-overflow-scrolling : touch;
	background:#fff;
}
#rechargeDetail .rechargeInfo li:nth-of-type(1){
	border-top:none;
}
#rechargeDetail .rechargeInfo li{
	border-top:0.02rem solid #f5f5f5;
	padding:.29rem .3rem;
}
#rechargeDetail .rechargeInfo li div p:nth-of-type(1){
  	font-size: .32rem;
  	font-weight: 500;
  	color: #191919;
}
#rechargeDetail .rechargeInfo li div p:nth-of-type(2){
  	font-size: .26rem;
  	font-weight: 500;
  	color: #bbbbbb;
  	margin-top:.18rem;
}
#rechargeDetail .rechargeInfo li span{
  	font-size: .36rem;
  	font-weight: 500;
  	color: #191919;
  	margin-top:.25rem;
}
#rechargeDetail .vux-calendar{
	position:fixed!important;
	left:0;
	top:0;
	height:1rem;
	width:1.5rem;
	overflow:hidden;
	z-index:3;
	opacity:0;
}
#RechargeDetail .inline-calendar td{
	font-size:.28rem!important;
	font-weight: bold!important;
}
</style>
