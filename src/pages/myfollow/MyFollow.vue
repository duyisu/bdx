<template lang="html">
	<div id="myFollow">
		<ul class="followList">
			<li :key="index" v-for="item,index in followArr">
				<div class="followDoctor" @click="linkDoctor(item.depart_id,item.doctor_id)">
					<img :src="item.image" :onerror="errorImg"/>
				</div>
				<div class="followInfo" @click="linkDoctor(item.depart_id,item.doctor_id)">
					<div class="followName">
						<h4>{{ item.name }}</h4>
						<img src="../../common/images/departmentlist/starIcon.png">
						<span>
							<!-- <i>9</i><i>.7</i> -->
							<i>{{ parseInt(item.star) * 2 }}</i>
						</span>
					</div>
					<div class="followDes">
						<span>{{ item.depart_name }}</span>
						<span>{{ item.job }}</span>
					</div>
				</div>
				<p @click.self="cancelFollow(item.doctor_id)" class="cancelFollow">取消关注</p>
			</li>
		</ul>
		<img @click.prevent="" v-if="followArr.length == 0" class="nocontent" src="../../common/images/personalcenter/nohascontent.png" >
	</div>
</template>

<script>
import http from '@common/js/http.js';
import { changePageTitle } from '@common/js/mUtils'
export default {
    data(){
    	return {
    		followArr:[],
            errorImg: 'this.src="' + require('../../common/images/avatar.png') + '"'
    	}
    },
    mounted(){
    	changePageTitle('我的关注');
    	setTimeout(()=>{
    		this.getFollows().then((res)=>{
	    		this.followArr = res;
	    		// console.log(this.followArr);
	    	}).catch((err)=>{
	    		console.log(err);
	    	});
    	},16)
    },
    methods:{
    	getFollows(){
    		return http.fetch('/api/user/doctor_mark_list');
    	},
    	linkDoctor(depart_id,doctor_id){
    		this.$router.push({
    			path:'/doctorinfo',
    			query:{
    				depart_id:depart_id,
    				doctor_id:doctor_id,
    				type:0
    			}
    		})
    	},
    	cancelFollow(id){
    		http.fetch('/api/user/mark_doctor',{
    			doctor_id:id
    		}).then((res)=>{
    			window.location.reload(true);
    		}).catch((err)=>{
    			console.log(err);
    		})
    	}
    }

}
</script>

<style lang="less">
#myFollow .followList{
	background:#fff;
}

#myFollow .followList li{
	padding-top:.4rem;
	box-sizing: border-box;
	height:1.9rem;
	width:6.9rem;
	margin:0 auto;
	position:relative;
	border-bottom:.02rem solid #f5f5f5;
}

#myFollow .followDoctor{
	width:1.1rem;
	height:1.1rem;
	display:inline-block;
	vertical-align: middle;
}
#myFollow .followDoctor>img{
	width:1.1rem;
	height:1.1rem;
	border-radius: 50%;
}
#myFollow .followInfo{
	display:inline-block;
	vertical-align: middle;
	margin-left:.32rem;
}
#myFollow .followName{
	font-size:0;
}
#myFollow .followName *{
	display:inline-block;
}

#myFollow .followInfo .followName *{
	display:inline-block;
	vertical-align: middle;
}
#myFollow .followInfo .followName h4{
  font-size: .32rem;
  font-weight: 500;
  letter-spacing: 0.006rem;
  color: #191919;
}
#myFollow .followInfo .followName img{
	width:.29rem;
	height:.29rem;
	margin-left:.24rem;
	margin-right:.12rem;
}

#myFollow .followInfo .followName span{
   font-size: .325rem;
   font-weight: bold;
   letter-spacing: 0.007rem;
   color: #ffc001;
   margin-top:.05rem;
}
#myFollow .followInfo .followName span i{
	display:inline-block;
	vertical-align: bottom;
}
#myFollow .followInfo .followName span i:nth-of-type(2){
	font-size: .285rem;
    letter-spacing: 0.006rem;
}
#myFollow .followDes{
	margin-top:.1rem;
}

#myFollow .followDes span:nth-of-type(2){
  font-size: .28rem;
  font-weight: 500;
  letter-spacing: 0.006rem;
  color: #bbbbbb;
  border-left:.02rem solid #f5f5f5;
  padding-left:0.16rem;
  margin-left:.16rem;
}

#myFollow .cancelFollow{
	width: 1.7rem;
    height: .59rem;
    line-height:.59rem;
    text-align:center;
    opacity: 0.99;
    border-radius: .3rem;
    background:url(../../common/images/btn_bg_base.png) no-repeat center/1.7rem .59rem;
  	font-size: .28rem;
  	font-weight: 500;
  	letter-spacing: .017rem;
  	color: #ffffff;
  	position:absolute;
  	right:0;
  	top:.5rem;
  	box-sizing: border-box;
}


#myFollow .nocontent{
	width:4.7rem;
	height:3.43rem;
	position:fixed;
	top:30%;
	left:50%;
	margin-left:-2.35rem;
}

</style>
