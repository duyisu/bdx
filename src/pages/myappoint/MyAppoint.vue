<template lang="html">
	<div id="myAppoint">
		<ul class="myAppointTitle">
			<li :class="{active:idx == index}" v-for="(item,index) in statusBtn"
				@click="appointHandle(index)"
			>
				{{ item.text }}
			</li>
		</ul>
		<ul class="appointPro">
			<li :key="index" v-for="item,index in currentappointList" v-if='item.order_status == appointStatus || item.order_status == appointStatus2 || item.order_status == appointStatus3'>
				<p class="clearfix appointDoctor">
					<span class="fl" @click='todoctorInfo(item)'>
						<span>
							<i>{{item.doctor_name}} </i>
							<i style="margin-left: .1rem;">{{item.practice[0]}} </i>
						</span>
						<img src="../../common/images/departmentlist/arrowIcon.png" >
					</span>
					<span class="fr" :class="{canceled:item.order_status==0}" v-if='item.order_status==0'>待付款</span>
                    <span class="fr" :class="{canceled:item.order_status==1 || item.order_status==3 || item.order_status==2}" v-if='item.order_status==1 || item.order_status==3 || item.order_status==2'>待就诊</span>
                    <span class="fr" :class="{canceled:item.order_status==4}" v-if='item.order_status==4'>待评价</span>
                    <span class="fr" :class="{canceled:item.order_status==5}" v-if='item.order_status==5'>已完成</span>
                    <span class="fr" :class="{canceled:item.order_status==-1 || item.order_status==-2}" v-if='item.order_status==-1 || item.order_status==-2'>已关闭</span>
				</p>
				<div class="appointCon" @click="goinfo(item)">
					<div class="portrait">
						<img :src='item.doctor_image' :onerror="errorImg">
					</div>
					<div class="info">
						<p class="clearfix">
							<span class="fl">{{item.depart_name}} </span>
							<span class="fr">￥{{item.pay_amount}}</span>
						</p>
						<p class="clearfix">
							<span class="fl">就诊人：{{item.realname}} <!-- {{item.sex == 1?"男":"女"}} --> {{item.age}}岁</span>
							<span class="fr" style="text-decoration: line-through;">￥{{item.normal_price}}</span>
						</p>
						<p>就诊时间：{{item.reg_begin_time.substring(0,10)}} <span style="margin-left:.27rem">{{item.reg_begin_time.substring(11,16)+'~'+item.reg_end_time.substring(11,16)+''}}</span></p>
					</div>
				</div>
				<p class="clearfix appointPrice">
					<span class="fr">
						挂号费用：￥{{item.pay_amount}}<i>
						<template v-if="item.pay_amount < item.normal_price">
							（会员优惠）
						</template>
					</i>
					</span>
				</p>
				<p @click="tjappoint(item.order_id)" class="clearfix btnStatus" v-if='item.order_status==0'>
					<span class="fr">去付款</span>
				</p>
				<router-link tag="p"  v-if='item.order_status==4' :to="{ name: 'evaluations', params: {orderId:item.order_id,type:2,evaluationStatu:1 } }" class="clearfix btnStatus">
					<span class="fr">去评价</span>
				</router-link>
			</li>
           
		</ul>
        <div class="norecord abs-center" v-if='sendInfoStatu'>
            <img src="../../common/images/noInfo/recharge.png" alt="" style="width:4rem;">
            <p style="text-align:center;margin-top:.35rem;font-size:.36rem;color:#898989;">暂无相关信息</p>
        </div>
		
	</div>
</template>

<script>
    import http from '@common/js/http.js';
    import { baseUrl,host } from '@common/js/config';
    import { getStore,changePageTitle } from '@common/js/mUtils.js';
    export default {
        created(){
        	changePageTitle('我的预约');
        },
        data(){
//订单状态,默认0待支付(-1:已取消,-2:已退款,0:挂号登记完，待支付,1:待挂号,2:待预约登记,3.待就诊，4，待评价，5.已完成)
            return {
                statusBtn:[
                    {
                        idx1:0,
                        text:"待付款"
                    },
                    {
                        idx1:1,

                        text:"待就诊"
                    },
                    {
                        idx1:4,
                        text:"待评价"
                    },
                    {
                        idx1:5,
                        text:"已完成"
                    },
                    {
                        idx1:-1,
                        text:"已关闭"
                    }
                ],
                idx:0,
                appointStatus:'',
                appointStatus2:'',
                appointStatus3:'',
                appointList:[],
                currentappointList:[],
                sendInfoStatu:false,
                orderStatu:'',
                errorImg: 'this.src="' + require('../../common/images/avatar.png') + '"'

            }
        },
        mounted(){
            
            this.getappointList().then((res)=>{
                this.currentappointList =  this.appointList = res.list;

                //获取所有状态
                this.getOrderStatu();
               
                this.appointHandle(this.$route.query.id);
                
                
            }).catch((err)=>{
            
            })

            this.idx = this.$route.query.id;
        },
        methods:{
            todoctorInfo(item){
                this.$router.push({
                    path:'/doctorindex',
                    query:{
                        doctor_id:item.doctor_id,
                        depart_id:item.depart_id,
                        vip_price:item.vip_price,
                        normal_price:item.normal_price

                    }
                })
            },
            getOrderStatu(){
                var that = this;
                that.orderStatu = [];
                for(let i=0;i<that.currentappointList.length;i++){
                    that.orderStatu.push(that.currentappointList[i].order_status)
                }
                
            },
            appointHandle(index){
                
                var that = this;
                var inStatus = [];
                that.appointStatus = 100;
                that.appointStatus2 = 100;
                that.appointStatus3 = 100;

                that.sendInfoStatu = false;

                this.idx = index;
                if(index == 0){
                    that.appointStatus = 0;
                    inStatus = [0];
                }
                if(index == 1){
                    that.appointStatus = 3
                    that.appointStatus2 = 1;
                    that.appointStatus3 = 2;
                    inStatus = [1,2,3];
                    
                }
                if(index == 2){
                    that.appointStatus = 4;
                    inStatus = [4];
                }
                if(index == 3){
                    that.appointStatus = 5;
                    inStatus = [5];
                }
                if(index == 4){

                    that.appointStatus = -1;
                    that.appointStatus2 = -2;
                    inStatus = [-1,-2];
                }
                for(var i in that.orderStatu){
                    if($.inArray(that.orderStatu[i], inStatus) != -1){
                        that.sendInfoStatu = false;
                        break;
                    }else{
                        that.sendInfoStatu = true;
                    }
                }

            },
            getappointList(){
                //获取列表
                return http.fetch('/api/user/reg_order_list',{
                	rows:60
                })
            },
            goinfo(item){
                if(this.idx != 4){
                    this.$router.push(
                    {
                        name:"orderdetail",
                        query: item
                    });
                }
                
            },
            tjappoint(order_id){
                let url = `${host}#/personalcenter`;
            	let href = encodeURIComponent(url);
            	let access_token = getStore('access_token') || '';

                window.location.href = `${baseUrl}pay/wxpay/index.html?redirect_uri=${href}&order_id=${order_id}&order_type=reg&access_token=${access_token}`;
            }
        },
        watch:{

        }
    }
</script>

<style lang="less">
    #myAppoint{
        padding:0 .3rem;
    }
	#myAppoint .myAppointTitle{
		position:fixed;
		top:0;
		left:0;
		// height:1.8rem;
		height:0.89rem;
		font-size:0;
		background:#fff;
		width:100%;
	}
	#myAppoint .myAppointTitle li{
		display:inline-block;
		font-size: .32rem;
		height:.89rem;
		line-height:.89rem;
		font-weight: 500;
		color: #191919;
		width:20%;
		text-align: center;
		box-sizing: border-box;
	}
	#myAppoint .myAppointTitle li.active{
		color: #48cdbb;
		border-bottom:.04rem solid #48cdbb;
	}

	#myAppoint .appointPro{
		padding-top:0.89rem;
	}
	#myAppoint .appointPro .finished{
		color:#48cdbb;
	}
	#myAppoint .appointPro .canceled{
		color:#ff4621;
	}

	#myAppoint .appointPro li{
		background:#fff;
		margin-top:.2rem;
        width: 100%;
        height: auto;
        box-shadow: 0 0 27px 0 rgba(0, 0, 0, 0.16);
        border-radius:.1rem;
	}
	#myAppoint .appointPro .appointDoctor{
		padding:.3rem .3rem;
	}
	#myAppoint .appointPro .appointDoctor span:nth-of-type(1) span{
		display:inline-block;
		vertical-align: middle;
	}
	#myAppoint .appointPro .appointDoctor span:nth-of-type(1) span i{

		font-weight: 500;
		color: #191919;
	}
	#myAppoint .appointPro .appointDoctor span:nth-of-type(1) span i:nth-of-type(1){
		font-size: .28rem;
		display:inline-block;
		vertical-align: bottom;
	}
	#myAppoint .appointPro .appointDoctor span:nth-of-type(1) span i:nth-of-type(2){
		font-size: .24rem;
		display:inline-block;
		vertical-align: bottom;

	}
	#myAppoint .appointPro .appointDoctor span:nth-of-type(1) img{
		width:.13rem;
		height:.2rem;
		margin-top:0.1rem;
		margin-left:0.1rem;
		display:inline-block;
		vertical-align: middle;
	}
	#myAppoint .appointPro .appointDoctor span:nth-of-type(2){
		font-size: .28rem;
		font-weight: 500;
	}
	#myAppoint .appointPro .appointCon{
		background:#fff;
		padding:.2rem .3rem;
		font-size:0;
        .portrait{
            display: inline-block;
            vertical-align:top;
            width: 20%;
            height: 1.3rem;

            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .info{
            display: inline-block;
            vertical-align:top;
            margin-left: .2rem;
            width:76%;
        }
	}
	#myAppoint .appointPro .appointCon>p{
		display:inline-block;
		vertical-align: top;
		width:1.3rem;
		height:1.3rem;
	}
	#myAppoint .appointPro .appointCon>p img{
		width:1.3rem;
		height:1.3rem;
	}
	
	#myAppoint .appointPro .appointCon>div>p:nth-of-type(1){
		font-size: .26rem;
		font-weight: 500;
		color: #191919;
        margin-top: 0;
	}
	#myAppoint .appointPro .appointCon>div>p{
		margin-top:.17rem;
	}
	#myAppoint .appointPro .appointCon>div>p{
		font-size: .24rem;
		font-weight: 500;
		color: #898989;
	}
	#myAppoint .appointPro .appointPrice{
		padding:.3rem .3rem;
	}
	#myAppoint .appointPro .appointPrice span{
		font-size: .28rem;
		color: #191919;
		font-weight: 500;
	}
	#myAppoint .appointPro .appointPrice span i{
		font-size: .26rem;
		color: #bbbbbb;
	}
	#myAppoint .appointPro .btnStatus{
		border-top:.02rem solid #f5f5f5;
		padding:.3rem .3rem;
	}
	#myAppoint .appointPro .btnStatus span{
		box-sizing: border-box;
		width: 1.43rem;
		text-align: center;
		height: .6rem;
		line-height:.6rem;
		border-radius: .3rem;
		background-color: #fff;
		border: solid .01rem #48cdbb;
		font-size: .28rem;
		font-weight: bold;
		color: #48cdbb;
	}

	#myAppoint .noAppointPro img{
		width:4.7rem;
		height:3.43rem;
		position:fixed;
		top:30%;
		left:50%;
		margin-left:-2.35rem;
	}
    #myAppoint .noAppointPro.no{
        opacity: 0;
    }
</style>
