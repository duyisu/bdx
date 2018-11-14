<template lang="html">
	<div id="orderpay">
		<div class="countdown">
			<img src="../../common/images/departmentlist/timeIcon.png" alt="" />
			<span>{{ miniteAndSec }}后订单支付将自动取消</span>
		</div>
		
		<div class="vipPayBox">
			<div class="vipPay clearfix">
				<img src="../../common/images/departmentlist/vipCardPay.png" alt="" />
				<div class="rightVipPay">
					<p class="clearfix">
						<span class="fl">会员卡支付</span>
						<img @click="chooseVipMethod" class="fr" :src="payPic[vipPay]" alt="" />
					</p>
					<p class="clearfix">
						<span class="fl">北斗星会员卡充值后付款更便捷</span>
						<img class="fr" src="../../common/images/departmentlist/arrowIcon.png" alt="" />
					</p>
				</div>
			</div>
		</div>
		
		<div class="wxPayBox">
			<div class="wxPay clearfix">
				<img class="fl" src="../../common/images/departmentlist/WXpay.png" alt="" />
				<div class="fr wxPayRight">
					<div class="fl">
						<p>微信支付</p>
						<p>推荐安装微信5.0及以上版本使用</p>
					</div>
					<img @click="chooseWxMethod" class="fr" :src="payPic[wxPay]" alt="" />
				</div>
			</div>
		</div>
		
		<p @click="submitPay" class="sumbitInfo">确认支付32元</p>
	</div>
</template>

<script>

export default {
    data(){
    	return {
    		vipPay:0, //0代表默认支付方式vip支付
    		wxPay:1, //1代表微信支付
    		payPic:[require('../../common/images/departmentlist/selected.png'),require('../../common/images/departmentlist/noselect.png')],
    		countNum:15, //15分钟倒计时
    		miniteAndSec:'', //显示离15分钟倒计时还有多少秒
//  		timer:null	//倒计时对象
    	}
    },
    mounted(){
    	//订单生成毫秒数时间1526278805964
    	let dateTime = 1526350078443;
    	this.countDown(dateTime);
    	this.timer = setInterval(()=>{
    		this.countDown(dateTime)
    	},1000);
    },
    methods:{
    	chooseVipMethod(){
    		//选择会员卡支付
    		if(this.vipPay != 0){
    			this.vipPay = 0;
    			this.wxPay = 1;
    		}
    	},
    	chooseWxMethod(){
    		//选择微信支付
    		if(this.wxPay == 1){
    			this.wxPay = 0;
    			this.vipPay = 1;
    		}
    	},
    	submitPay(){
    		//提交支付
    		if(this.vipPay == 0){
    			alert('你选择的是会员卡支付');
    		}
    		
    		if(this.wxPay == 0){
    			alert('你选择的是微信支付');
    		}
    	},
    	countDown(dateTime){
    		let leftTime = new Date().getTime() - dateTime;
    		leftTime = this.countNum*60*1000 - leftTime;
    		
    		let minite = addZero(parseInt(leftTime/1000/60%60)); //剩余时间换算成分钟
    		let sec = addZero(parseInt(leftTime/1000%60)); //剩余时间换算成秒

    		this.miniteAndSec = minite+':'+sec;
    		
    		if(leftTime <= 0){
    			clearInterval(this.timer);
    			this.miniteAndSec = '00:00';
    		}
    		
    		function addZero(n){
    			return n = n < 10 ? '0'+n : n; 
    		}
    		
    	}
    }
}
</script>

<style lang="less">


#orderpay{
	padding-bottom:.3rem;
}
#orderpay>div{
	width: 100%;
	padding:0 .3rem;
    background-color: #ffffff;
}

#orderpay>.countdown{
	width: 100%;
  	height: .86rem;
  	line-height:.86rem;
  	background-color: #fffac8;
  	text-align: center;
}

.countdown>img{
	margin-top:-1px;
	width:.28rem;
	display:inline-block;
	vertical-align: middle;
}
.countdown>span{
	display:inline-block;
	vertical-align: middle;
  	font-size: .28rem;
  	font-weight: 500;
  	color: #ffb642;
}


.vipPay>img{
	width:.6rem;
	float:left;
	margin-top:.59rem;
}

.vipPay .rightVipPay,.wxPay .wxPayRight{
	width:6.01rem;
	float:right;
}

.rightVipPay>p:nth-of-type(1){
	padding:.56rem 0 .39rem;
	border-bottom:.03rem solid #F5F5F5;
}

.rightVipPay>p:nth-of-type(1) span{
  	font-size: .38rem;
  	color: #191919;
  	font-weight: bold;
}

.rightVipPay>p:nth-of-type(1) img{
	width:.5rem;
}

.rightVipPay>p:nth-of-type(2){
	padding:.28rem 0;
}
.rightVipPay>p:nth-of-type(2) span{
  	font-size: .26rem;
  	color: #191919;
}
.rightVipPay>p:nth-of-type(2) img{
	width:.13rem;
}


#orderpay > div.wxPayBox{
	margin-top:.2rem;
	padding-top:.14rem;
	padding-bottom:.5rem;
}

.wxPay>img{
	width:.5rem;
	margin-top:.54rem;
}

.wxPayRight>img{
	width:.5rem;
	margin-top:.5rem;
}

.wxPayRight>div>p:nth-of-type(1){
  	font-size: .32rem;
  	font-weight: 500;
  	color: #191919;
  	padding:.25rem 0;
}
.wxPayRight>div>p:nth-of-type(2){
  	font-size: .24rem;
  	color: #898989;
  	font-weight: 500;
}



#orderpay>.sumbitInfo{
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
    background-image: -moz-linear-gradient(319deg, #53dfc6, #c3ffe4);
    background-image: -o-linear-gradient(319deg, #53dfc6, #c3ffe4);
    background-image: -webkit-linear-gradient(319deg, #53dfc6, #c3ffe4);
    background-image: linear-gradient(319deg, #53dfc6, #c3ffe4);
}

</style>
