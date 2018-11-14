<template>
	<div id="vipdetail">
		<div class="vipdetailTop">
			<div class="vipTop" :class="{'family':vipCard.type == 6}">
				<p class="cardholder" v-if="vipCard.card_type==1">持卡人：{{ vipCard.realname }}</p>
				<p class="cardholder" v-if="vipCard.card_type==2">主卡持卡人：{{ vipCard.realname }}</p>
				<p class="cardholder" v-if="vipCard.card_type==3">副卡持卡人：{{ vipCard.realname }}</p>
				<p class="cardNum">NO.{{cardNum}}</p>
			</div>
			<p @click="setvipcard" class="setVipCard">设置会员卡</p>
		</div>
		<div style="height:.2rem;background:#f5f5f5;"></div>
		<div class="vipdetailBottom">
			<ul class="vipBottom">
				<li @click="checkreport">
					<img src="../../common/images/personalcenter/checkreport.png" >
					<p>检查报告</p>
				</li>
				<li @click="nowRecharge">
					<img src="../../common/images/personalcenter/rechargeLeft.png" >
					<p>充值余额</p>
				</li>
				<li @click="paymentlist">
					<img src="../../common/images/personalcenter/paymentlist.png" >
					<p>缴费清单</p>
				</li>
			</ul>
			<p class="myBalance">我的余额：{{ vipCard.balance }}元</p>
		</div>
		<div class="barcode">
			<img id="barcode"/>
		</div>
	</div>
</template>

<script>

import http from '@common/js/http.js';
import JsBarcode from 'jsbarcode';

export default {
	created(){
		if(this.$route.query){
			this.id = this.$route.query.id;
		}
	},
	data(){
		return {
			id:'',
			vipCard:{},
			cardNum:'',
			status:'',
			patientName:''
		}
	},
	mounted(){
		this.$nextTick(function(){
			setTimeout(()=>{
				this.getVipDetail().then((res)=>{
					this.vipCard = res;
					this.cardNum = res.card_number;
					this.patientName = res.realname;
					this.status = res.type;

					JsBarcode("#barcode", this.cardNum, {
					  lineColor: "#abb7c5",
					  height:70,
					  displayValue: true,
					  fontSize:20
					});
				}).catch((err)=>{
					console.log('error',err);
				})

			},16)

		})
	},
	methods:{
		getVipDetail(){
			return http.fetch('/api/user/card_detail',{
				id:this.id
			})
		},
		paymentlist(){
			this.$router.push({
				path:'paymentlist',
				query:{
					card_number:this.cardNum
				}
			});
		},
		checkreport(){
			this.$router.push({
				path:'/tworeports',
				query:{
					id:this.id,
					patientName:this.patientName
				}
			});
		},
		setvipcard(){
			this.$router.push({
				path:'/setvipcard',
				query:{
					addressId:this.id
				}
			});
		},
		nowRecharge(){
			this.$router.push({
				path:'/viprecharge',
				query:{
					card_number:this.cardNum,
					card_money:this.vipCard.balance,
					id:this.id,
					type:this.status
				}
			});
		}
	}
}

</script>

<style lang="less">
#vipdetail{
	height:100%;
	background:#fff;
}
#vipdetail .vipdetailTop{
	padding-top:.41rem;
	padding-bottom:.36rem;
	background:#fff;
}
#vipdetail .vipTop{
	width: 6.54rem;
	height: 4.2rem;
	box-shadow: -1px 4.5px 10px 0.2px rgba(0, 0, 0, 0.25);
	background: url(../../common/images/personalcenter/bg_vipcard.png) no-repeat center/6.54rem 4.2rem;
	border-radius: .24rem;
	overflow: hidden;
	margin:0 auto;
	margin-bottom: .4rem;
	position:relative;

	&.family{
		background: url(../../common/images/personalcenter/bg_vipcard_family.png) no-repeat center/6.54rem 4.2rem;
	}
	.cardholder{
		position:absolute;
		bottom:.6rem;
		left: 3.8rem;
	    font-size: .26rem;
	    font-weight: 500;
	    color: #ffffff;
	  	height:.4rem;
	  	line-height:.4rem;
		overflow: hidden;
	}
	.cardNum{
		position:absolute;
		left: 3.8rem;
		bottom:.2rem;
		font-size: .28rem;
		color: #ffffff;
		font-weight: 500;
		height:.4rem;
	  	line-height:.4rem;
		overflow: hidden;
	}
}
#vipdetail .setVipCard{
	width: 2.02rem;
  	height: .65rem;
  	line-height:.65rem;
  	border-radius: .08rem;
  	background-color: #fff;
  	border: solid .02rem #66e4cc;
  	text-align:center;
  	font-size: .28rem;
  	font-weight: 500;
  	color: #66e4cc;
	margin:.1rem auto 0;
}

#vipdetail .vipdetailBottom{
	background:#fff;
	padding-top:.35rem;
}
#vipdetail .vipBottom{
	text-align: center;
	font-size:0;
}
#vipdetail .vipBottom li{
	width:33.33%;
	display:inline-block;
	text-align: center;
	vertical-align: middle;
}
#vipdetail .vipBottom li img{
	width:.8rem;
	height:.7rem;
}
#vipdetail .vipBottom li p{
  font-size: .28rem;
  text-align: center;
  color: #191919;
  height:.3rem;
}
#vipdetail .myBalance{
	text-align: center;
	font-size: .24rem;
    font-weight: 500;
    color: #898989;
    margin-top:.14rem;
}
#vipdetail .barcode{
	text-align: center;
	margin-top:.6rem;
}


</style>
