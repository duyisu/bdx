<template lang="html">
	<div id="myvipcards">
		<ul class="mycards">
			<li class="item"
			@click.prevent="goToVipDetail(item.id)"
			:key = "index"
			v-for="item,index in vipCardList"
			>
				<div class="vipTop" :class="{'family':item.type == 6}">
					<p class="cardholder" v-if="item.card_type==1">持卡人：{{ item.realname }}</p>
					<p class="cardholder" v-if="item.card_type==2">主卡持卡人：{{ item.realname }}</p>
					<p class="cardholder" v-if="item.card_type==3">副卡持卡人：{{ item.realname }}</p>
					<p class="cardNum">NO.{{item.card_number}}</p>
				</div>
			</li>
		</ul>
		<div ref="addVipCardBtn" class="addVipCard">
			<p @click="openVipCard">添加会员卡</p>
		</div>
		<div v-if="!vipCardList.length" id="myCourseImg">
			<img @click.prevent="" src="../../common/images/personalcenter/nohascontent.png" >
		</div>
	</div>
</template>

<script>
import http from '@common/js/http.js';
import { changePageTitle } from '@common/js/mUtils'
export default {
	data(){
		return {
			vipCardList:[]
		}
	},
	mounted(){
		changePageTitle('我的会员卡');
		this.$nextTick(function(){
			this.getVipCards().then((res)=>{
				
				this.vipCardList = res;
				this.ifHasShadow();
			}).catch((err)=>{
				
			})

		})
	},
	methods:{
		getVipCards(){
			return http.fetch('/api/user/card_list');
		},
		ifHasShadow(){
			if(this.vipCardList.length > 2){
				this.$refs.addVipCardBtn.style.boxShadow = '0.007rem 0.007rem .158rem 000.2rem rgba(0, 0, 0, 0.05)';
			}else{
				this.$refs.addVipCardBtn.style.boxShadow = 'none';
			}
		},
		goToVipDetail(id){
			this.$router.push({
				path:'/vipdetail',
				query:{
					id
				}
			});
		},
		openVipCard(){
			this.$router.push('/opencard');
		}
	}
}
</script>

<style lang="less">

#myvipcards{
	height:100%;
	background:#fff;
}
#myvipcards .mycards{
	padding-top:.28rem;
	height:calc(100% - 1.92rem);
	overflow-y:scroll;
	-webkit-overflow-scrolling : touch;
}
#myvipcards .item{
	margin-bottom: .4rem;
}
#myvipcards .vipTop{
	width: 6.54rem;
	height: 4.2rem;
	box-shadow: -1px 4.5px 10px 0.2px rgba(0, 0, 0, 0.25);
	background: url(../../common/images/personalcenter/bg_vipcard.png) no-repeat center/6.54rem 4.2rem;
	border-radius: .24rem;
	overflow: hidden;
	margin:0 auto;
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
#myvipcards .addVipCard{
	position:fixed;
	bottom:0;
	left:0;
	width: 100%;
  	height: 1.92rem;
  	background-color: #ffffff;
  	box-shadow: 0.007rem 0.007rem .158rem 000.2rem rgba(0, 0, 0, 0.05);
}
#myvipcards .addVipCard p{
	position:absolute;
	left:50%;
	top:50%;
	transform: translate(-50%,-50%);
	text-align: center;
	width: 6.9rem;
  	height: .92rem;
  	line-height:.92rem;
  	opacity: 0.99;
  	border-radius: .46rem;
    background-image: -webkit-linear-gradient(229deg, #53dfc6, #c3ffe4);
    background-image: -o-linear-gradient(229deg, #53dfc6, #c3ffe4);
    background-image: linear-gradient(319deg, #53dfc6, #c3ffe4);
    font-size: .36rem;
    font-weight: 500;
    font-style: normal;
    letter-spacing: .029rem;
    color: #ffffff;
}

#myvipcards #myCourseImg img{
	width:4.98rem;
	height:3.34rem;
	position:fixed;
	left:50%;
	top:30%;
	margin-left:-2.49rem;
}
</style>
