<template lang="html">
	<div id="twoReports">
		<template v-if="reportIndex==1 ? true : false">
			<div class="reportInfo">
				<p class="clearfix">
					<span class="fl">
						<i>就诊人：</i>
						<i>{{ patientName }}</i>
					</span>
					<span class="fr">
						<i>初诊日期：</i>
						<template v-if="jyReport.length>0?true:false">
							<i>
							{{
								jyReport[jyReport.length-1].cate_name ?
								jyReport[jyReport.length-1].cate_name.substring(0,10) : '' }}
							</i>
						</template>
					</span>
				</p>
				<p class="clearfix">
					<span class="fl">
						<i>就诊医院：</i>
						<i>北斗星耳鼻喉医院</i>
					</span>
					<span class="fr">
						<i>结束日期：</i>
						<template v-if="jyReport.length>0?true:false">
							<i>{{ jyReport[0].cate_name ? jyReport[0].cate_name.substring(0,10) : '' }}</i>
						</template>
					</span>
				</p>
			</div>
		</template>

		<template v-if="reportIndex==2 ? true : false">
			<div class="reportInfo">
				<p class="clearfix">
					<span class="fl">
						<i>就诊人：</i>
						<i>{{ patientName }}</i>
					</span>
					<span class="fr">
						<i>初诊日期：</i>
						<template v-if="jcReport.length>0?true:false">
							<i>
							{{
								jcReport[jcReport.length-1].check_date ?
								jcReport[jcReport.length-1].check_date : '' }}
							</i>
						</template>
					</span>
				</p>
				<p class="clearfix">
					<span class="fl">
						<i>就诊医院：</i>
						<i>北斗星耳鼻喉医院</i>
					</span>
					<span class="fr">
						<i>结束日期：</i>
						<template v-if="jcReport.length>0?true:false">
							<i>{{ jcReport[0].check_date ? jcReport[0].check_date : '' }}</i>
						</template>
					</span>
				</p>
			</div>
		</template>

		<div class="reportTab">
			<p>
				<span :class="{active:reportIndex==1}" @click="selectReport(1)">检验报告</span>
			</p>
			<p>
				<span :class="{active:reportIndex==2}" @click="selectReport(2)">检查报告</span>
			</p>
		</div>
		<div class="reportItem">
			<template v-if="reportIndex==1 ? true : false">
				<div
				class="perItem"
				:key = "index"
				v-for="item,index in jyReport">
					<i class="line"></i>
					<div>
						<h4>
							<span class="bigCircle"></span>
							<span class="bigTime">{{ item.cate_name.substring(0,10) }}</span>
						</h4>
						<div>
							<span class="smallCircle"></span>
							<span class="smallTime">{{ item.cate_name.substring(11,16) }}</span>
							<div @click="inspectReport(index)">
								<p>{{ item.name }}</p>
								<p>检验项目：{{ item.check_name }}</p>
							</div>
						</div>
					</div>
				</div>
			</template>
			<template v-if="reportIndex==2 ? true : false">
				<div class="perItem"
				:key = "index"
				v-for = "item,index in jcReport"
				>
					<i class="line"></i>
					<div>
						<h4>
							<span class="bigCircle"></span>
							<span class="bigTime">{{ item.check_date }}</span>
						</h4>
						<div
							@click="checkReport(checkitem.id)"
							:key="checkindex"
						 	v-for="checkitem,checkindex in item.list"
						 >
							<span class="smallCircle"></span>
							<span class="smallTime">{{ checkitem.check_time.substring(11,16) }}</span>
							<div>
								<p>{{ checkitem.check_name }}</p>
								<p>检查项目：{{ checkitem.vt_content }}</p>
							</div>
						</div>
					</div>
				</div>
			</template>
			<!-- <div class="perItem">
				<i class="line"></i>
				<div>
					<h4>
						<span class="bigCircle"></span>
						<span class="bigTime">2018.05.22</span>
					</h4>
					<div>
						<span class="smallCircle"></span>
						<span class="smallTime">06:00</span>
						<div>
							<p>术前四项</p>
							<p>检验项目：术前检验四项</p>
						</div>
					</div>
					<div>
						<span class="smallCircle"></span>
						<span class="smallTime">06:00</span>
						<div>
							<p>术前四项</p>
							<p>检验项目：术前检验四项</p>
						</div>
					</div>
					<div>
						<span class="smallCircle"></span>
						<span class="smallTime">06:00</span>
						<div>
							<p>术前四项</p>
							<p>检验项目：术前检验四项检验项目：术前检验四项</p>
						</div>
					</div>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
import { getStore,setStore } from '@common/js/mUtils';
import axios from 'axios';
import http from '@common/js/http.js';
export default {
    data(){
    	return {
    		id:'',
    		reportIndex:1,
    		jyReport:[],
    		jcReport:[],
    		patientName:''
    	}
    },
    created(){
    	window.localStorage.removeItem('checkReport');
    	if(this.$route.query){
    		this.patientName = this.$route.query.patientName;
    		this.id = this.$route.query.id;
    	}
    },
    mounted(){
    	this.$nextTick(()=>{
    		axios.all([this.getJYreport(),this.getJCreport()]).then(axios.spread((res1,res2)=>{
    			this.jyReport = res1;
    			this.jcReport = res2;
    			
    		})).catch((err)=>{
    			
    		})
    	})
    },
    methods:{
    	getJYreport(){	//检验报告
    		return http.fetch('/api/user/instrument_report',{
    			id:this.id
    		})
    	},
    	getJCreport(){	//检查报告
    		return http.fetch('/api/user/inspection_report',{
    			id:this.id
                //id:211
    		})
    	},
    	selectReport(_index){
    		this.reportIndex = _index;
    		
    	},
    	inspectReport(_index){ //检验报告详情页面
    		setStore('checkReport',this.jyReport[_index].list);
    		this.$router.push({
    			path:'/inspectreport'
    		})
    	},
    	checkReport(_id){ //检查报告详情页面
    		this.$router.push({
    			path:'/checkreport',
    			query:{
    				checkid:_id
    			}
    		})
    	}
    }
}
</script>

<style lang="less" scoped>
#twoReports .reportInfo{
	background:#fff;
	z-index:5;
	position:fixed;
	left:0;
	top:0;
	width:100%;
	padding:0.2rem .3rem;
}
#twoReports .reportInfo>p{
	padding:.11rem 0;
}

#twoReports .reportInfo>p span i:nth-of-type(1){
	color:#bbbbbb;
	font-weight: 500;
}

#twoReports .reportInfo>p span i:nth-of-type(2){
	color:#898989;
	font-weight: 500;
}

#twoReports .reportTab{
	z-index:5;
	position:fixed;
	left:0;
	top:1.54rem;
	width:100%;
	height:.86rem;
	font-size:0;
	background:#f9f9f9;
}
#twoReports .reportTab p{
	height:.86rem;
	line-height:.86rem;
	width:50%;
	text-align:center;
	display:inline-block;
	box-sizing: border-box;
}
#twoReports .reportTab span.active{
	border-bottom:.05rem solid #66e4cc;
}
#twoReports .reportTab span{
	display:inline-block;
	width:50%;
	font-size:.28rem;
}

#twoReports .reportItem{
	width:100%;
	position:absolute;
	top:2.4rem;
	overflow-y:scroll;
	background:#fff;

}

#twoReports .perItem{
	position:relative;
	overflow:hidden;
	padding-top:.35rem;
}
#twoReports .perItem .line{
	position:absolute;
	width:.04rem;
	height:100%;
	background:#f5f5f5;
	left:.78rem;
}
#twoReports .perItem>div{
	margin-left:.67rem;

}
#twoReports .perItem>div>h4{
	padding-bottom:.35rem;
}
#twoReports .perItem>div>h4 .bigCircle{
	position:relative;
	z-index:2;
	width:.34rem;
	height:.34rem;
	border-radius: 50%;
	box-sizing: border-box;
	border:2px solid #66e4cc;
	display:inline-block;
	vertical-align: middle;
	background:#fff;
	margin-left:-.05rem;
}
#twoReports .perItem>div>h4 .bigTime{
	display:inline-block;
  	font-size: .32rem;
  	font-weight: bold;
  	color: #191919;
  	vertical-align:middle;
  	margin-left:.2rem;
}
#twoReports .perItem>div>div{
	margin-top:.35rem;
}
#twoReports .perItem>div>div .smallCircle{
	position:relative;
	z-index:2;
	display:inline-block;
	width: .26rem;
  	height: .26rem;
  	border-radius: 50%;
  	border: solid .04rem #d4d4d4;
  	box-sizing: border-box;
  	vertical-align:top;
  	background:#fff;
}

#twoReports .perItem>div>div .smallTime{
	display:inline-block;
  	font-size: .28rem;
  	font-weight: 500;
  	color: #898989;
  	vertical-align:top;
  	margin-left:.29rem;
}

#twoReports .perItem>div>div div{
	margin-left:.42rem;
	width:4.39rem;
	height:1.42rem;
	box-sizing: border-box;
	border-radius: 0 .15rem .15rem .15rem;
	display:inline-block;
	background-color: #66e4cc;
	padding:0 .3rem;
	vertical-align:top;
	margin-top:-0.18rem;
}
#twoReports .perItem>div>div div p:nth-of-type(1){
	border-bottom:.02rem solid #fff;
}
#twoReports .perItem>div>div div p{
  	font-size: .28rem;
  	font-weight: 500;
  	color: #fffefe;
  	height:.71rem;
  	line-height:.71rem;
  	box-sizing: border-box;
  	width:100%;
  	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}


</style>
