<template lang="html">
	<div id="paymentList">
		<div class="clearfix rechargeMonth">
			<span @click="selectDate" class="fl">
				<img src="../../common/images/personalcenter/rechargeIcon.png" >
				<i>{{ val }}</i>
			</span>
			<span class="fr">支出 {{ totalMoney }}元</span>
		</div>
		<ul class="rechargeInfo">
			<li 
				class="clearfix" 
				:key="index"
				v-for="item,index in filterTime">
				<div class="fl">
					<template v-if="item.vak06 == 1?true:false">
						<p>门诊挂号</p>
					</template>
					<template v-if="item.vak06 == 2?true:false">
						<p>门诊收费</p>
					</template>
					<template v-if="item.vak06 == 4?true:false">
						<p>住院收费</p>
					</template>
					<p>{{ item.vak13 }}</p>
				</div>
				<span class="fr">- {{ '￥'+item.vak24 }}</span>
			</li>
			<!-- <li class="clearfix">
				<div class="fl">
					<p>挂号扣费</p>
					<p>2018-05-28 12:22:03</p>
				</div>
				<span class="fr">- 40.00</span>
			</li>
			<li class="clearfix">
				<div class="fl">
					<p>门诊扣费</p>
					<p>2018-05-28 12:22:03</p>
				</div>
				<span class="fr">- 200.00</span>
			</li>
			<li class="clearfix">
				<div class="fl">
					<p>住院扣费</p>
					<p>2018-05-28 12:22:03</p>
				</div>
				<span class="fr">- 1000.00</span>
			</li>
			<li class="clearfix">
				<div class="fl">
					<p>住院扣费</p>
					<p>2018-05-28 12:22:03</p>
				</div>
				<span class="fr">- 1000.00</span>
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
    		card_num:'',
    		val:'',
    		paymentlist:[],
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
    		this.getPaymentList().then((res)=>{
    			this.paymentlist = res;
    			this.getFilterTime();
    		}).catch((err)=>{
    			
    		})
    	})
    },
    methods:{
    	getPaymentList(){
    		return http.fetch('/api/user/card_consume_record',{
    			card_number:this.card_num
    		})
    	},
    	getFilterTime(){
    		this.filterTime = [];
    		this.filterTime = this.paymentlist.filter((item)=>{
				return item.vak13.substring(0,this.dateStr.length) == this.dateStr;
			})
			this.totalMoney = 0;
			for(var i=0;i<this.filterTime.length;i++){
				this.totalMoney += Number(this.filterTime[i].vak24);
			}
    	},
    	selectDate(){
    		this.showGroup = true;
    	},
    	log (str) {
	     
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

#paymentList .rechargeMonth{
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
#paymentList .rechargeMonth span:nth-of-type(1) img{
	width:.48rem;
	height:.41rem;
	display:inline-block;
	vertical-align: middle;
}
#paymentList .rechargeMonth span:nth-of-type(1) i{
  	font-size: .32rem;
  	font-weight: 500;
  	color: #191919;
  	display:inline-block;
	vertical-align: middle;
	margin-left:0.1rem;
}
#paymentList .rechargeMonth span:nth-of-type(2){
  	font-size: .28rem;
  	font-weight: 500;
  	color: #898989;
}
#paymentList .rechargeInfo{
	position:absolute;
	overflow-y:scroll;
	width:100%;
	top:1.22rem;
	-webkit-overflow-scrolling : touch;
	background:#fff;
}
#paymentList .rechargeInfo li:nth-of-type(1){
	border-top:none;
}
#paymentList .rechargeInfo li{
	border-top:0.02rem solid #f5f5f5;
	padding:.29rem .3rem;
}
#paymentList .rechargeInfo li div p:nth-of-type(1){
  	font-size: .32rem;
  	font-weight: 500;
  	color: #191919;
}
#paymentList .rechargeInfo li div p:nth-of-type(2){
  	font-size: .26rem;
  	font-weight: 500;
  	color: #bbbbbb;
  	margin-top:.18rem;
}
#paymentList .rechargeInfo li span{
  	font-size: .36rem;
  	font-weight: 500;
  	color: #191919;
  	margin-top:.25rem;
}
#paymentList .vux-calendar{
	position:fixed!important;
	left:0;
	top:0;
	height:1rem;
	width:1.5rem;
	overflow:hidden;
	z-index:3;
	opacity:0;
}
#paymentList .inline-calendar td{
	font-size:.28rem!important;
	font-weight: bold!important;
}
</style>
