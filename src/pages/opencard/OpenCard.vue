<template lang="html">
	<div id="openCard">
		<img @click.prevent="show(0)" class="opencardbtn" src="../../common/images/personalcenter/opencardbtn.png" >
		
		<div class="textTab">
			<div class="vip">
				<p>
					<span :class="{active:textDes == 1}" @click="textDes = 1">家庭会员</span>
					<span :class="{active:textDes == 2}" @click="textDes = 2">个人会员</span>
					<i></i>
				</p>
			</div>
			<div class="content">
				<template v-if="textDes == 1">
					<div>
						<h3>会员受益人</h3>
						<p>办卡者可任意绑定共三位受益人(含本人)</p>
					</div>
					<div>
						<h3>会员优惠项目</h3>
						<p>1. 医事服务费会员价</p>
						<p>2. 3日内免挂号费</p>
						<p>3. 耳鼻喉、眼、口腔诊疗整体费用九折（药品、耗材除外）</p>
					</div>
					<div>
						<h3>会员礼赠</h3>
						<p>1. 名医医事服务体验劵1张（第二次挂号生效，可转赠）</p>
						<p>2. 个人健康体检<i>1次/800元</i>（儿童) </p>
						<p>3. 洁牙<i>1次/200元</i>（有效期12个月)</p>
						<p>4. 眼部SPA <i>1次/200元</i>（有效期6个月）</p>
						<p>5. 礼赠仅限首充赠送，后续充值金额可根据您的需要自主决定，后续充值将不享受额外礼赠；</p>
					</div>
					<div>
						<h3>充值金额</h3>
						<p>1. 最低金额5000元</p>
						<p>2. 充值金额即为会员卡内金额，会员可持卡，在北斗星耳鼻喉医院仅限门诊使用；</p>
					</div>
					<div>
						<h3>会员有效期</h3>
						<p>因享受会员优惠，会员充值金额请恕无法办理退费事宜，且有效期限为两年；自办卡之日起，两年后卡内余额将自动失效。</p>
					</div>
				</template>
				<template v-if="textDes == 2">
					<div>
						<h3>会员受益人</h3>
						<p>办卡者本人</p>
					</div>
					<div>
						<h3>会员优惠项目</h3>
						<p>1. 医事服务费会员价</p>
						<p>2. 3日内免挂号费</p>
					</div>
					<div>
						<h3>充值金额</h3>
						<p>1. 最低金额1000元</p>
						<p>2. 充值金额即为会员卡内金额，会员可持卡，在北斗星耳鼻喉医院仅限门诊使用；</p>
					</div>
					<div>
						<h3>会员卡升级</h3>
						<p>个人会员升级成家庭会员，可补缴差额办理。补缴后个人会员权益即时结算并终止，家庭会员权益生效。</p>
					</div>
					<div>
						<h3>会员有效期</h3>
						<p>因享受会员优惠，会员充值金额请恕无法办理退费事宜，且有效期限为两年；自办卡之日起，两年后卡内余额将自动失效。</p>
					</div>
				</template>
			</div>
		</div>

		<div v-show="bottomBox" @click.self="show(1)" class="vipWrap">
			<div class="vipWrapBox">
				<div class="vipCardTab">
					<div>
						<p
						:class="{'active' : personOrfamily == 0 ? true : false }"
						@click="selectVip(0)">
							<img src="../../common/images/personalcenter/personalVipIcon.png" >
							<span>个人会员</span>
						</p>
					</div>
					<div>
						<p
						:class="{ 'active' : personOrfamily == 1 ? true : false }"
						@click="selectVip(1)">
							<img src="../../common/images/personalcenter/familyVipIcon.png" >
							<span>家庭会员</span>
						</p>
					</div>
				</div>

				<div class="vipCardCon">
					<template v-if="personOrfamily == 0 ? true : false">
						<div class="clearfix">
		                    <span>
								<img src="../../common/images/personalcenter/patientPerson.png" >
		                    	<i>就诊人</i>
		                	</span>
		                    <span @click="selectPatient(personOrfamily,'vip1')">
		                        <input ref="patient" readonly="readonly" type="text" name="" placeholder="请选择" :value="personcardInfo.patientName ? personcardInfo.patientName : '' ">
		                        <img src="../../common/images/departmentlist/arrowIcon.png" alt="" />
		                    </span>
	                	</div>
					</template>
					<template v-if="personOrfamily == 1 ? true : false">
						<div class="clearfix">
		                    <span>
								<img src="../../common/images/personalcenter/patientPerson.png" >
		                    	<i>主卡就诊人</i>
		                	</span>
		                    <span @click="selectPatient(personOrfamily,'vip1')">
		                        <input ref="mainCard" readonly="readonly" type="text" name="" placeholder="请填写" :value="mainCard.realname ? mainCard.realname : '' " >
		                        <img src="../../common/images/departmentlist/arrowIcon.png" alt="" />
		                    </span>
	                	</div>
	                	<div class="clearfix">
		                    <span>
								<img src="../../common/images/personalcenter/patientPerson.png" >
		                    	<i>副卡就诊人1</i>
		                	</span>
		                    <span @click="selectPatient(personOrfamily,'vip2')">
		                        <input readonly="readonly" type="text" name="" placeholder="请填写" :value="fuCard1.realname ? fuCard1.realname : '' " >
		                        <img src="../../common/images/departmentlist/arrowIcon.png" alt="" />
		                    </span>
	                	</div>
	                	<div class="clearfix">
		                    <span>
								<img src="../../common/images/personalcenter/patientPerson.png" >
		                    	<i>副卡就诊人2</i>
		                	</span>
		                    <span @click="selectPatient(personOrfamily,'vip3')">
		                        <input readonly="readonly" type="text" name="" placeholder="请填写" :value="fuCard2.realname ? fuCard2.realname : '' ">
		                        <img src="../../common/images/departmentlist/arrowIcon.png" alt="" />
		                    </span>
	                	</div>
	                </template>
	                	<div class="clearfix">
	                		<span>
								<img src="../../common/images/personalcenter/rechargeMoney.png" >
		                    	<i>{{ inputMoney == '' ? "充值金额" : inputMoney }} </i>
		                	</span>
	                	</div>
				</div>

				<div class="vipCardMoney">
					<p
					:class="{active : item == inputMoney ? true : false }"
					v-for="item in rechargeMoney[personOrfamily].money"
					@click="selectRecharge(item)"
					>
					{{ item }}元
					</p>
				</div>

				<div class="protocol">
					<img src="../../common/images/departmentlist/selected.png" >
					<p>我已阅读并同意<router-link tag="span" to="/reservationclause">《 北斗星耳鼻喉医院会员协议 》</router-link></p>
				</div>

				<p @click="buyVipCard" class="payMoney">支付 {{inputMoney}} 元</p>

			</div>
		</div>
		<toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
	</div>
</template>

<script>
import { baseUrl,host } from '@common/js/config';
import { Toast } from 'vux'
import http from '@common/js/http.js';
import { getStore,setStore } from '@common/js/mUtils';
export default {
    created(){
        
        if(window.localStorage.getItem('buycardid')){
        	this.personOrfamily = getStore('buycardid');
        if(this.$route.query){
        	this.personcardInfo = this.$route.query;
        }
        }

        if( this.$route.query.personOrfamily==1 || this.$route.query.personOrfamily==0){
            this.personOrfamily = this.$route.query.personOrfamily;
            this.buyfaimlycard = this.$route.query.cardType;
            this.bottomBox = true;
            if(this.$route.query){
                //个人会员
				if(this.personOrfamily==0){
                    this.personcardInfo = this.$route.query;
				}else if(this.buyfaimlycard=='vip1'){
                    let  mainCard = {
					   id:this.$route.query.patientId,
					   realname:this.$route.query.patientName,
					   is_main:1
					}
                    setStore('mainCard',mainCard);
				}else if(this.buyfaimlycard=='vip2'){
                    let  mainCard = {
                        id:this.$route.query.patientId,
                        realname:this.$route.query.patientName,
                        is_main:0
                    }
                    setStore('fuCard1',mainCard);
				}else if(this.buyfaimlycard=='vip3'){
                    let  mainCard = {
                        id:this.$route.query.patientId,
                        realname:this.$route.query.patientName,
                        is_main:0
                    }
                    setStore('fuCard2',mainCard);
				}
            }
        }else{
            window.localStorage.removeItem('mainCard');
            window.localStorage.removeItem('fuCard1');
            window.localStorage.removeItem('fuCard2');
        }
    },
    data(){
    	return {
    		msg:'',
            showToast:false,
            position:'middle',  //top,middle,bottom
    		textDes:1, //文字描述1是家庭会员
    		inputMoney:'',
    		bottomBox:false,
    		personOrfamily:0, //默认是0个人会员 1家庭会员
    		personcardInfo:{},
            buyfaimlycard:'',
    		mainCard:{},
    		fuCard1:{},
    		fuCard2:{},
    		rechargeMoney:[
    			{
    				type:0,
   					money:[1000,2000,3000]
    			},
    			{
    				type:1,
   					money:[5000,6000,7000]
    			}
    		]
    	}
    },
    mounted(){
    		var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

			if(isAndroid){
				// alert('是安卓');
				document.querySelector('.textTab').style.height = '10rem';
				document.querySelector('.content').style.height = '8rem';

			}else if(isiOS){
				// alert('是苹果');
				document.querySelector('.textTab').style.height = '9rem';
				document.querySelector('.content').style.height = '7rem';
			}

    		this.$nextTick(()=>{
    			setTimeout(()=>{
    				this.mainCard = JSON.parse(getStore('mainCard')) || '';
    				this.fuCard1 = JSON.parse(getStore('fuCard1')) || '';
    				this.fuCard2 = JSON.parse(getStore('fuCard2')) || '';
    			},16)
    		})
    },
    methods:{
    	buyCardMethod(obj={}){
    		let access_token = getStore('access_token');
    		return http.post(`/api/user/buy_card?access_token=${access_token}`,obj);
    	},
    	buyVipCard(){
    		if(this.personOrfamily == 0){
    			if(this.$refs.patient.value == ''){
    				this.msg = '请选择就诊人';
    				this.showToast = true;
    				return false;
    			}
    			if(this.inputMoney == ''){
    				this.msg = '请选择充值金额';
    				this.showToast = true;
    				return false;
    			}

    			let patients = JSON.stringify([{"id":this.personcardInfo.patientId}]);

    			this.buyCardMethod({
    				card_type:0,
    				pay_amount:this.inputMoney,
    				patients
    			}).then((res)=>{
    				let order_id = res.order_id;
		            let url = `${host}#/myvipcards`;
            		let href = encodeURIComponent(url);
            		let access_token = getStore('access_token') || '';

		            window.location.href = `${baseUrl}pay/wxpay/index.html?redirect_uri=${href}&order_id=${order_id}&order_type=card&access_token=${access_token}`;

		    	}).catch((err)=>{
					this.msg = err;
    				this.showToast = true;
    				return false;
		    	})


    		}else if(this.personOrfamily == 1){
    			if(this.$refs.mainCard.value == ''){
    				this.msg = '请选择主卡就诊人';
    				this.showToast = true;
    				return false;
    			}
    			if(!this.fuCard2.id&&!this.fuCard1.id){
                    this.msg = '请选择至少一个副卡就诊人';
                    this.showToast = true;
                    return false;
				}

                if( (this.fuCard1!=''&&this.mainCard!=''&&this.mainCard.id==this.fuCard1.id)
                    || (this.fuCard1!=''&&this.fuCard2!=''&&this.fuCard2.id==this.fuCard1.id)
                    || (this.mainCard!=''&&this.fuCard2!=''&&this.fuCard2.id==this.mainCard.id)){
                    this.msg = '就诊人不能相同';
                    this.showToast = true;
                    return false;
                }

    			if(this.inputMoney == ''){
    				this.msg = '请选择充值金额';
    				this.showToast = true;
    				return false;
    			}

    			let patients = [];

    			if(this.mainCard!=''&&this.mainCard.id){
					patients.push(this.mainCard);

    			}

    			if(this.fuCard1!=''&&this.fuCard1.id){
					patients.push(this.fuCard1);

    			}

    			if(this.fuCard2!=''&&this.fuCard2.id){
					patients.push(this.fuCard2);

    			}

    			patients = JSON.stringify(patients);

    			this.buyCardMethod({
    				card_type:1,
    				pay_amount:this.inputMoney,
    				patients
    			}).then((res)=>{
    				let order_id = res.order_id;

		            let url = `${host}#/myvipcards`;
            		let href = encodeURIComponent(url);
            		let access_token = getStore('access_token') || '';


		            window.localStorage.removeItem('mainCard');
		            window.localStorage.removeItem('fuCard1');
		            window.localStorage.removeItem('fuCard2');

		            window.location.href = `${baseUrl}pay/wxpay/index.html?redirect_uri=${href}&order_id=${order_id}&order_type=card&access_token=${access_token}`;

		    	}).catch((err)=>{
		    		this.msg = err;
    				this.showToast = true;
		    		return false;
		    	})

    		}
    	},
    	selectPatient(_index,status){
    		setStore('buycardid',_index);
    		setStore('familycard',status)

            let buyCardObj = {
                personOrfamily:_index,
                cardType:status
            };
    		this.$router.push({
    			path:'/patientslist',
				query:buyCardObj
    		});
    	},
    	selectVip(_index){ //切换tab
    		this.inputMoney = '';
    		this.personOrfamily = _index;
    	},
    	show(_index){ //显示隐藏充值框
    		if(_index == 0){
    			this.bottomBox = true;
    		}else if(_index == 1){
    			this.bottomBox = false;
    		}
    	},
    	selectRecharge(item){ //选择充值金额
    		this.inputMoney = item;
    	}
    },
    components:{
    	Toast
    }
}
</script>

<style lang="less">
#app{
	width:100%;
	height:100%;
}
#openCard{
	position:relative;
	left:0;
	top:0;
	width:7.5rem;
	height:100%;
	background:#fff url('../../common/images/personalcenter/opencardbg.jpg') no-repeat;
	background-size: 100%;
}

#openCard{
	position:relative;
	.textTab{
		width:6.9rem;
		// height:7.8rem;
		height:10rem;
		background:#fff;
		position:absolute;
		left:0.3rem;
		bottom:0.1rem;
		border-radius:0.09rem;
		box-shadow:0 0 .6rem rgba(30,72,189,.5);
		.vip{
			height:0.76rem;
			line-height:0.76rem;
			box-sizing: border-box;
			border-bottom:0.02rem solid #f5f5f5;
			text-align: center;
			p{
				height:0.75rem;
				display:inline-block;
				width:3.36rem;
				font-size:0;
				position:relative;
				span{
					height:0.75rem;
					display:inline-block;
					width:1.68rem;
					text-align: center;
					font-size:0.28rem;
					font-weight: 500;
					color:#bbb;
				}
				i{
					position:absolute;
					width:0.02rem;
					height:0.35rem;
					background:#f5f5f5;
					top:.24rem;
					left:1.68rem;
				}
				.active{
					color:#479ffb;
					border-bottom:0.04rem solid #479ffb;
				}
			}
		}
		.content{
			width:6.5rem;
			// height:5.5rem;
			height:7.8rem;
			margin:0 auto;
			overflow-y:scroll;
			 -webkit-overflow-scrolling: touch;
			 div{
			 	margin-top:.55rem;
			 	h3{
			 		margin-bottom:.15rem;
  					font-size: .26rem;
  					font-weight: bold;
  					letter-spacing: 0.005rem;
  					color: #000000;
  					padding-left:0.15rem;
  					border-left:0.08rem solid #479ffb;
			 	}
			 	p{
					line-height:.4rem;
				  	font-size: .24rem;
				  	font-weight: 500;
				  	letter-spacing: 0.014rem;
				  	text-align: left;
				  	color: #898989;
					i{
						color:#479ffb;
					}
			 	}
			 }
		}
	}
}

#openCard .opencardbtn{
	width:3.1rem;
	height:1.14rem;
	position:absolute;
	bottom:0.2rem;
	left:50%;
	margin-left:-1.55rem;
	z-index:5;
}

#openCard .vipWrap{
	width:100%;
	height:100%;
	position:fixed;
	z-index:7;
	left:0;
	top:0;
	background:rgba(0,0,0,.2);
}

#openCard .vipWrapBox{
	position:fixed;
	bottom:0;
	left:0;
	width:100%;
	background:#fff;
	border-radius: .1rem .1rem 0 0;
}

#openCard .vipCardTab{
	width:100%;
	height:1.05rem;
	line-height:1.05rem;
	font-size:0;
}
#openCard .vipCardTab div{
	display:inline-block;
	width:50%;
	text-align: center;
}

#openCard .vipCardTab div p{
	display:inline-block;
	padding:0 .3rem 0 .1rem;
}
#openCard .vipCardTab div p.active{
	border-bottom:.06rem solid #66e4cc;
}

#openCard .vipCardTab img{
	display:inline-block;
	vertical-align: middle;
	width:.42rem;
	height:.31rem;
}

#openCard .vipCardTab span{
	display:inline-block;
	vertical-align: middle;
  	font-size: .31rem;
  	font-weight: bold;
  	color: #191919;
  	margin-left:.15rem;
}

#openCard .vipCardCon > div{
	padding:0 .4rem;
}
#openCard .vipCardCon > div {
    height: 1.04rem;
    line-height: 1.04rem;
    border-top:.02rem solid #f5f5f5;
}
#openCard .vipCardCon > div span:nth-of-type(1) {
    float: left;
    font-size: .28rem;
    font-weight: 500;
    letter-spacing: .006rem;
    color: #898989;
}
#openCard .vipCardCon > div span:nth-of-type(1) i{
	display:inline-block;
	vertical-align: middle;
}
#openCard .vipCardCon > div span:nth-of-type(1) img{
	width:.44rem;
	height:.44rem;
	display:inline-block;
	vertical-align: middle;
}
#openCard .vipCardCon > div span:nth-of-type(2) {
    float: right;
}
#openCard .vipCardCon > div span:nth-of-type(2) input {
    height: .8rem;
    width: 4rem;
    margin-right: .3rem;
    text-align: center;
    border: none;
    color: #191919;
    font-weight: 500;
    font-size: .28rem;
    text-align: right;
}
#openCard .vipCardCon > div span:nth-of-type(2) img {
    display: inline-block;
    width: .13rem;
    height: .2rem;
}
#openCard .vipCardMoney{
	width:100%;
	padding-bottom:.32rem;
	display:flex;
	justify-content: space-around;
	border-bottom:.02rem solid #f5f5f5;
}
#openCard .vipCardMoney p{
	width: 2.12rem;
  	height: .89rem;
  	line-height:.89rem;
  	text-align: center;
  	border-radius: .04rem;
  	background-color: #fff;
  	border: solid .02rem #d4d4d4;
  	box-sizing: border-box;
	font-size: .32rem;
	font-weight: bold;
	letter-spacing: 0.006rem;
	color: #191919;
}

#openCard .vipCardMoney p.active{
	border:none;
	background-color:#66e4cc;
	color:#fff;
}
#openCard .protocol{
	padding:.36rem .4rem;
}
#openCard .protocol img{
	width:.5rem;
	height:.5rem;
	display:inline-block;
	vertical-align: middle;
}
#openCard .protocol p{
	display:inline-block;
	vertical-align: middle;
  	font-size: .28rem;
  	font-weight: 500;
  	color:#898989;
}
#openCard .protocol p span{
	color: #66e4cc;
}


#openCard .payMoney{
	width:100%;
  	height: 1.1rem;
  	line-height:1.1rem;
  	background-color: #66e4cc;
  	font-size: .36rem;
  	font-weight: bold;
  	text-align: center;
  	color: #ffffff;
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

</style>
