<template lang="html">
	<div id="serviceorder">
		<ul class="orderList">
			<li :key="index" v-for="item,index in orderList">
				<p class="clearfix orderNum">
					<span class="fl">订单编号：{{ item.order_id }}</span>

					<span v-if="item.order_status==1" class="fr finished">已完成</span>
					<span v-if="item.order_status==0" class="fr canceled" @click="payOrder(item.order_id)">待支付</span>
					<span v-if="item.order_status==-1" class="fr canceled">已取消</span>
				</p>
				<div class="orderCon">
					<p>
						<template v-if="item.cards[0].type == 6 ? true :false">
							<img src="../../common/images/personalcenter/serviceorderIcon1.png" >
						</template>
						<template v-if="item.cards[0].type != 6 ? true :false">
							<img src="../../common/images/personalcenter/serviceorderIcon2.png" >
						</template>
					</p>
					<div>
						<p class="clearfix">
							<span class="fl">
								{{ item.cards[0].type == 6 ? '北斗星家庭会员服务' : '北斗星个人会员服务' }}
							</span>
							<span class="fr">￥{{ item.amount }}</span>
						</p>
						<p class="clearfix">
							<span class="fl">主卡人：{{item.cards[0].realname}}</span>
						</p>
						<template v-if="item.cards.length > 1">
							<p class="clearfix">
								<span class="fl">副卡人：
									<template  
									v-if="index != 0" 
									v-for="cardname,index in item.cards">
										{{ cardname.realname + ' ' }}
									</template>
								<!-- 张柳丹、张全蛋、李晓光 -->
								</span>
							</p>
						</template>
						<p>会员卡号：{{item.cards[0].card_number}}</p>
					</div>
				</div>
				<p class="clearfix orderTime">
					<span class="fl">{{ item.create_time }}</span>
					<span class="fr">合计：￥{{ item.amount }}</span>
				</p>
			</li>
		</ul>
		<div v-if="!orderList.length" id="myCourseImg">
			<img @click.prevent="" src="../../common/images/personalcenter/nohascontent.png" >
		</div>
	</div>
</template>

<script>
import http from '@common/js/http.js';
import { baseUrl,host } from '@common/js/config';
import { getStore,changePageTitle } from '@common/js/mUtils.js';
// api/user/get_card_order_list
export default {
    data(){
    	return {
    		orderList:[],
    		fuCardPerson:''
    	}
    },
    mounted(){
    	this.$nextTick(()=>{
    		this.getServiceOrder().then((res)=>{
    			this.orderList = res;
    		}).catch((err)=>{
    			console.log(err);
    		})
    	})
    },
    methods:{
    	getServiceOrder(){ //获取订单列表
    		return http.fetch('/api/user/get_card_order_list')
    	},
		payOrder(ordderId){
            let order_id = ordderId;
            let url = `${host}#/serviceorder`;
            let href = encodeURIComponent(url);
            let access_token = getStore('access_token') || '';

            window.location.href = `${baseUrl}pay/wxpay/index.html?redirect_uri=${href}&order_id=${order_id}&order_type=card&access_token=${access_token}`;
		}
    }
}
</script>

<style lang="less">
#serviceorder #myCourseImg img{
	width:4.98rem;
	height:3.34rem;
	position:fixed;
	left:50%;
	top:30%;
	margin-left:-2.49rem;
}

#serviceorder .orderList .finished{
	color:#66e4cc;
}
#serviceorder .orderList .canceled{
	color:#ff4621;
}
#serviceorder .orderList li:nth-of-type(1){
	margin-top:0;
}
#serviceorder .orderList li{
	background:#fff;
	margin-top:.2rem;
}
#serviceorder .orderList .orderNum{
	padding:.3rem .3rem;
}
#serviceorder .orderList .orderNum span:nth-of-type(1){
  	font-size: .28rem;
  	font-weight: 500;
  	color: #898989;
}
#serviceorder .orderList .orderNum span:nth-of-type(2){
  	font-size: .28rem;
  	font-weight: 500;
}
#serviceorder .orderList .orderCon{
	background:#f9f9f9;
	padding:.2rem .3rem;
	font-size:0;
}
#serviceorder .orderList .orderCon>p{
	display:inline-block;
	vertical-align: top;
	width:1.3rem;
	height:1.3rem;
}
#serviceorder .orderList .orderCon>p img{
	width:1.3rem;
	height:1.3rem;
}
#serviceorder .orderList .orderCon>div{
	padding-left:.21rem;
	box-sizing: border-box;
	width:5.6rem;
	display:inline-block;
	vertical-align: top;
}
#serviceorder .orderList .orderCon>div>p:nth-of-type(1){
  	font-size: .26rem;
  	font-weight: 500;
  	color: #191919;
}
#serviceorder .orderList .orderCon>div>p{
	margin-bottom:.1rem;
}
#serviceorder .orderList .orderCon>div>p{
  	font-size: .24rem;
  	font-weight: 500;
  	color: #898989;
}
#serviceorder .orderList .orderTime{
	padding:.3rem .3rem;
}
#serviceorder .orderList .orderTime span:nth-of-type(1){
  	font-size: .24rem;
  	font-weight: 500;
  	color: #bbbbbb;
  	margin-top:.08rem;
  }
#serviceorder .orderList .orderTime span:nth-of-type(2){
  	font-size: .28rem;
  	color: #191919;
  	font-weight: 500;
}

</style>
