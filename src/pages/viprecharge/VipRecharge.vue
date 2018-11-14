<template lang="html">
	<div id="viprecharge">
		<p class="countLeft clearfix">
			<span class="fl">账户余额</span>
			<span class="fr">{{ countleft }}</span>
		</p>
		<div class="rechargeMoney">
			<p class="rechargeInfo clearfix">
				<span class="fl">充值金额</span>
				<span @click="rechageDetail" class="fr">充值明细</span>
			</p>
			<input v-model="rechargeMoney" class="whatMoney" type="number" placeholder="请输入充值金额">
			<p class="rechargeNotice">根据您的会员卡等级最少充值{{ type==2?1000:5000 }}元哟</p>
			<div class="chooseMoney clearfix">
        <!-- 个人会员卡 -->
        <template v-if="type == 2 ? true : false">
            <p 
              @click="selectMoney(item,index)" 
              v-for="item,index in moneyNum1"
              :class="{active:index == isActive}"
              >
                <span>{{ item }}</span>
                <img src='../../common/images/personalcenter/rightBottomIcon.png' >
            </p>
        </template>
        <!-- 家庭会员卡 -->
        <template v-if="type == 6 ? true : false">
            <p 
              @click="selectMoney(item,index)" 
              v-for="item,index in moneyNum2"
              :class="{active:index == isActive}"
              >
                <span>{{ item }}</span>
                <img src='../../common/images/personalcenter/rightBottomIcon.png' >
            </p>
        </template>
				
			</div>
		</div>
		<p @click="nowRecharge" class="nowRecharge">立即充值</p>
    <toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
	</div>
</template>

<script>
import { baseUrl,host } from '@common/js/config';
import http from '@common/js/http.js';
import { Toast } from 'vux'
import { getStore } from '@common/js/mUtils';
export default {
    data(){
    	return {
        showToast:false,
        position:'middle',  //top,middle,bottom
        msg:'提示信息',
    		isActive:-1,
    		rechargeMoney:'',
        countleft:'',
        id:'',
        type:'', //2是普通会员  6是家庭会员
        cardNum:'',
        moneyNum1:[1000,1500,2000,2500,3000,3500,4000,4500,5000],
    		moneyNum2:[5000,5500,6000,6500,7000,7500,8000,8500,9000]
    	}
    },
    created(){
      if(this.$route.query){
        this.countleft = this.$route.query.card_money;
        this.cardNum = this.$route.query.card_number;
        this.id = this.$route.query.id;
        this.type = this.$route.query.type;
      }else{
        this.countLeft = 0;
      }
    },
    methods:{
      rechargeMoneyMethod(){
        var access_token = getStore('access_token');
        return http.post(`/api/user/member_recharge?access_token=${access_token}`,{
            fee:this.rechargeMoney,
            card_number:this.cardNum
        });
      },
    	selectMoney(money,_index){
    		this.rechargeMoney = money;
    		this.isActive = _index;
    	},
      nowRecharge(){
        if(!Number(this.rechargeMoney)){
            this.msg = '请输入合法充值金额';
            this.showToast = true;
        }else{
            
            if(this.type == 2 && Number(this.rechargeMoney) >= 1000){
              //如果是普通会员卡
              this.payPageMethod();
            }else if(this.type == 6 && Number(this.rechargeMoney) >= 5000){
              //如果是家庭会员卡
              this.payPageMethod();
            }else{
              let money = this.type == 2 ? 1000 : 5000;
              this.msg = '根据您的会员卡等级最少充值'+money+'元哟';
              this.showToast = true;
              return false;
            }
            
        }
      },
      payPageMethod(){
        
          this.rechargeMoneyMethod().then((res)=>{

              let id = this.id;
              let order_id = res.order_id;

              let url = `${host}#/myvipcards?id=${id}`;
              let href = encodeURIComponent(url);
              let access_token = getStore('access_token') || '';

              window.location.href = `${baseUrl}pay/wxpay/index.html?redirect_uri=${href}&order_id=`+order_id+`&order_type=card&card_type=0&access_token=${access_token}`;


          }).catch((err)=>{ 
              
          })
      },
      rechageDetail(){
        this.$router.push({
          path:'/rechargedetail',
          query:{
            card_number:this.cardNum
          }
        });
      }
    }
}

</script>

<style lang="less">

#viprecharge .countLeft{
	background:#fff;
	padding:.4rem .3rem;
}
#viprecharge .countLeft span:nth-of-type(1){
  	font-size: .325rem;
  	font-weight: 500;
  	font-style: normal;
  	color: #898989;
  	margin-top:-0.05rem;
}
#viprecharge .countLeft span:nth-of-type(2){
  	font-size: .325rem;
  	font-weight: 500;
  	font-style: normal;
  	color: #191919;
}

#viprecharge .rechargeMoney{
	margin-top:.2rem;
	background:#fff;
	padding:.4rem .3rem;
}

#viprecharge .rechargeInfo span:nth-of-type(1){
  	font-size: .325rem;
  	font-weight: 500;
  	font-style: normal;
  	color: #898989;
}

#viprecharge .rechargeInfo span:nth-of-type(2){
	font-size: .28rem;
	font-weight: 500;
	font-style: normal;
	color: #66e4cc;
}

#viprecharge .whatMoney{
	box-sizing: border-box;
	margin-top:.41rem;
	width: 100%;
    height: .84rem;
    border-radius: .06rem;
    background-color: #ffffff;
    border: solid .02rem #d4d4d4;
	padding-left:.31rem;
  	font-size: .32rem;
  	font-weight: 500;
  	font-style: normal;
  	color: #191919;
}

.whatMoney::-webkit-input-placeholder{
    color:#d4d4d4;
}
.whatMoney:-moz-placeholder{
    color:#d4d4d4;
}
.whatMoney::-moz-placeholder{
    color:#d4d4d4;
}
.whatMoney:-ms-input-placeholder{
    color:#d4d4d4;
}

#viprecharge .rechargeNotice{
  	font-size: .24rem;
  	font-weight: normal;
  	font-style: normal;
  	color: #898989;
  	margin-top:.2rem;
  	margin-bottom:.29rem;
}
#viprecharge .chooseMoney{
	margin-left:.1rem;
	margin-right:-0.26rem;
}
#viprecharge .chooseMoney p{
	margin-right:.26rem;
	box-sizing:border-box;
	float:left;
	width:2.06rem;
    height: 1.2rem;
  	border-radius: .1rem;
  	background-color: #fff;
  	border: solid .02rem #d4d4d4;
  	position:relative;
  	text-align: center;
  	line-height:1.2rem;
  	font-weight: 500;
  	margin-top:.2rem;
}
#viprecharge .chooseMoney p span{
  font-size: .36rem;
  font-weight: 500;
  font-style: normal;
  color: #191919;
}
#viprecharge .chooseMoney p img{
	width:.5rem;
	height:.5rem;
	position:absolute;
	right:0;
	bottom:0;
	display:none;
}
#viprecharge .chooseMoney .active{
	color:#66e4cc;
	border: solid .02rem #66e4cc;
} 
#viprecharge .chooseMoney .active img{
	display:block;
}

#viprecharge .nowRecharge{
	position:absolute;
	bottom:.5rem;
	left:50%;
	margin-left:-3.45rem;
	width: 6.9rem;
  	height: .92rem;
  	line-height:.92rem;
  	font-size: .36rem;
  	font-weight: 500;
  	letter-spacing: 0.029rem;
  	text-align: center;
  	color: #ffffff;
  	opacity: 0.99;
  	border-radius: .46rem;
    background-image: -moz-linear-gradient(319deg, #53dfc6, #c3ffe4);
    background-image: -o-linear-gradient(319deg, #53dfc6, #c3ffe4);
    background-image: -webkit-linear-gradient(319deg, #53dfc6, #c3ffe4);
    background-image: linear-gradient(319deg, #53dfc6, #c3ffe4);
}
</style>
