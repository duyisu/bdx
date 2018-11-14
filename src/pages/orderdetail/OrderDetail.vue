<template lang="html">
	<div id="orderDetail">
		<div class="orderStatus">
			<p>
				<span>订单状态：</span>
				<span class="badStatus" v-if="item.order_status == 0">待支付</span>
				<span class="badStatus" v-else-if="item.order_status == 1">待就诊</span>
				<span class="badStatus" v-else-if="item.order_status == 2">待就诊</span>
				<span class="badStatus" v-else-if="item.order_status == 3">待就诊</span>
				<span class="badStatus" v-else-if="item.order_status == 4">待评价</span>
				<span v-else class="goodStatus">
					{{this.getstatus(this.item.order_status)}}
				</span>
			</p>
            <p>
                <span>订单编号：</span>
                <span>{{this.item.order_id}}</span>
            </p>
            <p>
                <span>订单时间：</span>
                <span>{{this.item.create_time}}</span>
            </p>
            <p>
                <span>支付时间：</span>
                <span>{{this.item.pay_time}}</span>
            </p>
        </div>
		<div class="orderDetail">
			<p>
				<span>就诊科室：</span>
				<span>{{this.orderitem.depart_name}}</span>
			</p>
			<p>
				<span>医生姓名：</span>
				<span>{{this.orderitem.doctor_name}}</span>
			</p>
			<p>
				<span>门诊时间：</span>
				<span style="color:#48cdbb">{{item.reg_begin_time}}</span>
			</p>
			<p>
				<span>门诊类型：</span>
				<span>专家门诊</span>
			</p>
			<p>
				<span>挂号费用：</span>
				<span style="color:#48cdbb">￥{{this.item.pay_amount}}（挂号费）</span>
			</p>
		</div>
		<div class="orderInfo">
			<p>
				<span>就诊人：</span>
				<span>{{this.item.realname}}</span>
			</p>
			<p>
				<span>身份证号：</span>
				<span>{{this.item.ID_no}} </span>
			</p>
			<p>
				<span>手机号：</span>
				<span>{{this.item.mobile}}</span>
			</p>
			<p>
				<span>会员卡：</span>
				<span>{{this.item.card_number}} </span>
                <span v-if='!this.item.card_number' style="color:#333">暂无</span>
			</p>
		</div>
		<template v-if="item.order_status == 0">
			<div class="ifHasBtn clearfix">
				<span @click="tjappoint(item.order_id)" class="fr">去支付</span>
			</div>
		</template>
		<template v-else-if="item.order_status == 4">
			<div class="ifHasBtn clearfix">
				<span class="fr">去评价</span>
			</div>
		</template>
		
	</div>
</template>

<script>
    import http from '@common/js/http.js';
    import { baseUrl,host } from '@common/js/config';
    import { getStore,setStore,changePageTitle } from '@common/js/mUtils';
    export default {
        created(){
            if(this.$route.query){
                this.orderitem = this.$route.query
            }
        },
        data(){
            return {
                item:{}
            }
        },
        mounted(){

            this.$nextTick(function(){
                setTimeout(()=>{
                    this.getorderinfo().then((res)=>{
                   
                this.item = res

            }).catch((err)=>{
                  
            })
            })
            })
        },
        methods:{
            getorderinfo(){
                //获取列表
                return http.fetch('/api/user/reg_orer_detail?order_id='+this.orderitem.order_id)
            },
            getstatus(id){
                switch(id){

                    case -2:
                        return "已退款"
                        break;

                    case -1:
                        return "已取消"
                        break;

                    case 0:
                        return "待支付"
                        break;

                    case 1:
                        return "待就诊"
                        break;

                    case 2:
                        return "待就诊"
                        break;

                    case 3:
                        return "待就诊"
                        break;

                    case 4:
                        return "待评价"
                        break;

                    case 5:
                        return "已完成"
                        break;
                }
            },
            tjappoint(order_id){
                let url = `${host}#/myappoint`;
                let href = encodeURIComponent(url);
                let access_token = getStore('access_token') || '';

                window.location.href = `${baseUrl}pay/wxpay/index.html?redirect_uri=${href}&order_id=${order_id}&order_type=reg&access_token=${access_token}`;
                
            }
        },

    }
</script>

<style lang="less">
	#orderDetail .ifHasBtn{
		padding:.3rem 0;
		margin-top:.2rem;
	}
	#orderDetail .ifHasBtn span{
		width: 1.66rem;
		height: .6rem;
		line-height:.6rem;
		border-radius: .3rem;
		background-color: #fff;
		border: solid 1px #48cdbb;
		box-sizing: border-box;
		font-size: .28rem;
		font-weight: bold;
		text-align: center;
		color: #48cdbb;
		margin-right:.3rem;
	}
	#orderDetail .goodStatus{
		color:#48cdbb!important;
	}
	#orderDetail .badStatus{
		color:#fe583d!important;
	}
	#orderDetail>div{
		background:#fff;
	}
	#orderDetail>div{
		padding-left:.3rem!important;
	}
	#orderDetail>div p span{
		font-size: .28rem;
		font-weight: 500;
		display:inline-block;
        color:#898989;
	}
	#orderDetail>div p span:nth-of-type(1){
		width:1.5rem;
	}
	#orderDetail>div p span:nth-of-type(2){
		color: #333333;
	}
	#orderDetail .orderDetail{
		padding:.2rem 0;
	}
	#orderDetail .orderDetail{
		border-bottom:.02rem solid #f5f5f5;
	}
    #orderDetail .orderInfo{
        padding-bottom: .15rem;
        padding-top:.2rem;
    }
	#orderDetail .orderDetail p,#orderDetail .orderInfo p,#orderDetail .orderNum p{
		padding:.1rem 0;
	}
    #orderDetail>.orderStatus{
        padding-top: .25rem;;
    }
	#orderDetail>.orderStatus>p{
		line-height:.56rem;
		border:1px solid transparent;
	}
	#orderDetail{
        display: block;
        width: 100%;
        height: 100%;
        background: #f5f5f5;
	}
    .orderDetail{
        margin-top: .2rem;
    }

</style>
