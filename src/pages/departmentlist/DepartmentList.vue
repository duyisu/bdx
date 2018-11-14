<template lang="html">
	<div id="departmentList">
		<h2 class="tab">
			<p>
				<span @click="departmentTab" :class="{leftactive:!tab}">门诊科室</span>
				<span @click="clinicTab" :class="{rightactive:tab}">特色专科</span>
			</p>
		</h2>
		<div v-show="tab">
            <p class="tab-name"><span v-for="group,gindex in departmentList" :class="{active: tabIdx == gindex }" @click='selectTabIdx(gindex)'>{{ group.group_name }}</span></p>
			<div  class="group" :key="gindex" v-for="group,gindex in departmentList" v-if='tabIdx == gindex'>
				<ul class="keshiList clearfix">
					<router-link
							tag = 'li'
							class= "item"
							:key="index"
							v-for="item,index in group.departs"
							:to = "{path:'/department',query:{
					depart_id:item.depart_id,
					type:0,
					text:item.name
					}
				}">

						<div class="img-box"><img :src="item.image" :alt="item.description" :onerror="errorImg"/></div>
						<!-- <img src="../../common/images/departmentlist/kqk.png" :alt="item.description" /> -->
						<div class="txt-box">
                            <p class="tab-type">{{group.group_name}}</p>
                            <p class="type">{{ item.name }}</p>                  
                        </div>

					</router-link>

					<!--<li>
						<img src="../../common/images/departmentlist/kqk.png" alt="" />
						<p>口腔科</p>
					</li>-->
				</ul>

			</div>

		</div>
		<div class="clinicBox" v-show="!tab">
			<ul>
				<li :key="index" v-for="item,index in mzList" class="clearfix"    @click="appointmentHandle(item.depart_id,item.type)">
					<div>
                        <img :src="item.image" :onerror="errorImg"/>
						<!-- <img src="../../common/images/departmentlist/ykmz.png" alt="" /> -->
					</div>
					<div>
						<div class="cliniLeft">
							<h4>{{ item.name }}</h4>
							<p>{{ item.description }}</p>
						</div>
						
					</div>
                    <div class="cliniRight"><p>预约</p></div>
				</li>
			</ul>
            <div style="width:100%;height:1.4rem"></div>
		</div>
        <div class="department-foot"><span>儿童医疗团队均具有三甲医院临床背景</span></div>
	</div>

</template>

<script>
import axios from 'axios';
import http from '@common/js/http.js';
import { changePageTitle } from '@common/js/mUtils'
export default {
	beforeRouteEnter(to,from,next){
    	next((vm)=>{
    		vm.tab = (from.path == '/clinicinfo') ? false : true;
    	});
   	},
    data(){
    	return {
            tabIdx:0,
            tab:true,
    		mzList:[],
    		departmentList:[],
            errorImg: 'this.src="' + require('../../common/images/departmentlist/ek.png') + '"'
    	}
    },
    mounted(){
    	changePageTitle('预约挂号');
        this.$nextTick(function(){
            axios.all([this.getDepartmentList(),this.getClinicList()]).then(axios.spread((res1,res2)=>{
                this.departmentList = res1;
                this.mzList = res2;
            })).catch((err)=>{
                
            })
        })
    },
    methods:{
        getDepartmentList(){
            //获取科室列表
            return http.fetch('/api/departs?type=0');
        },
        getClinicList(){
            //获取门诊列表
            return http.fetch('/api/departs?type=1');
        },
    	departmentTab(){
    		this.tab = true;
            this.tabIdx = 0
    	},
    	clinicTab(){
    		this.tab = false;
    	},
    	appointmentHandle(clinicId,_type){
    		this.$router.push({
    			path:'/clinicinfo',
    			query:{
    				depart_id:clinicId,
    				
    			}
    		})
    	},
        selectTabIdx(gindex){
            this.tabIdx = gindex;
        }
    }
}
</script>

<style lang="less">
@import '../../common/styles/mixin';
#departmentList {
	//position: fixed;
	top: 0;
	bottom: 0;
	background-color: #fff;
}

#departmentList .tab{
	width:100%;
	height:1.1rem;
	background:#fff;
	text-align: center;
	font-weight: normal;
	margin-bottom:0.1rem;
	box-shadow: .02rem 0 .307rem .013rem rgba(207, 207, 207, 0.25);
	position:relative;
}
#departmentList .tab p{
	width:3.1rem;
	height:0.66rem;
	background:#48cdbb;
	position:relative;
	margin:0 auto;
	top:0.23rem;
	border-radius: .1rem;
}
#departmentList .tab p span{
	font-size:0.32rem;
	position:absolute;
	left:1px;
	top:1px;
	width:1.54rem;
	height:0.62rem;
	line-height:0.62rem;
	text-align: center;
	color:#fff;
	letter-spacing: 0.006rem;
}
#departmentList .tab p span:nth-of-type(2){
	left:1.54rem;
}
#departmentList .tab p span.rightactive{
	background:#fff;
	color:#48cdbb;
	border-radius:0 0.1rem 0.1rem 0;
}
#departmentList .tab p span.leftactive{
	background:#fff;
	color:#48cdbb;
	border-radius:0.1rem 0 0 0.1rem;
}
#departmentList {
    .tab-name{
        margin-top: .68rem;
        font-size:.32rem;
        color:#b3b3b3;
        text-align:center;
        span:first-child{margin-left: 0;}
        span{
           position: relative;
           margin-left: .97rem;
           padding-bottom: .24rem;
        }
        span.active{
            font-weight:bold;
            color:#333;
        }
        span.active:after{
            content:'';
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -.24rem;
            width: .48rem;
            height: .06rem;
            border-radius: .03rem;
            background-color: #48cdbb;
        }
    }
	.group{
        margin-top: .54rem;
	}
    .department-foot{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: .96rem;
        line-height:.96rem;
        font-size:.28rem;
        letter-spacing:.083rem;
        color: #b3b3b3;
        text-align:center;
        background-color: #f5f5f5;
        span{
            padding:0 .36rem;
            position: relative;
        }
        span:after,span:before{
            content:'';
            width: .06rem;
            height: .06rem;
            background-color: #b3b3b3;
            position: absolute;
            top: 50%;
            margin-top: -.03rem;
            border-radius:100%;
        }
        span:after{right: 0;}
        span:before{left: 0;}
    }
	
}
#departmentList .keshiList{
	margin: 0 auto;
	font-size: 0;
	padding: 0 0.19rem;
}
#departmentList .keshiList .item{
    display:flex;
    width: 3.24rem;
    border-radius:.24rem;
    box-shadow: 0 0 .27rem 0 rgba(0, 0, 0, 0.09);
	float: left;
	text-align: center;
	margin: 0 0.16rem;
    margin-bottom: .25rem;
    padding:.2rem .3rem; 
}
#departmentList .keshiList .item{
	.img-box{
		width: .9rem;
        height: .9rem;
		img{
			width: 100%;
			height: 100%;
			border-radius: 50%;
			overflow: hidden;
		}

	}
    .txt-box{
        text-align:left;
        width: 1.46rem;
        margin-left: .28rem;
        padding:.14rem 0;
        .tab-type{
            color:#b3b3b3;
            font-size:.24rem;
            line-height:.24rem;
            margin-bottom: .13rem;
        }
        .type{
            color:#333;
            font-size:.28rem;
            line-height: .38rem;
            letter-spacing:.017rem;
            overflow:hidden;
            white-space:nowrap;
            font-weight:500;
        }
    }
}
#departmentList .clinicBox{
	background:#fff;
	padding:0 .3rem;
}
#departmentList .clinicBox>ul>li{
    position: relative;
    width: 6.9rem;
    margin:0 auto;
   
    border-radius: .24rem;
    box-shadow: 0 0 0.27rem 0 rgba(0, 0, 0, 0.09);
    margin-top: .3rem;
    padding:0 .3rem;
    padding-top: .4rem;
    padding-bottom: .43rem;
}
#departmentList .clinicBox>ul>li>div:nth-of-type(1){
	width:.9rem;
	height:.9rem;
	float:left;
}
#departmentList .clinicBox>ul>li>div:nth-of-type(1) img{
    display: block;
    width: 100%;
}

#departmentList .clinicBox>ul>li>div:nth-of-type(2){
    position: relative;
	width:3.7rem;
	float:left;
	margin-left: 0.3rem;
}
#departmentList .clinicBox>ul>li>div:nth-of-type(2) .cliniLeft{
	width:3.94rem;
	float:left;
}
#departmentList .clinicBox>ul>li>div:nth-of-type(2) .cliniLeft h4{
   	font-size: .28rem;
   	font-weight: 500;
   	text-align: left;
   	color: #191919;
   	margin-bottom:.2rem;
}
#departmentList .clinicBox>ul>li>div:nth-of-type(2) .cliniLeft p{
    font-size: .26rem;
    font-weight: 500;
    text-align: left;
    color: #898989;
    width: 3.94rem;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

#departmentList .clinicBox>ul>li> .cliniRight{
    position: absolute;
    right: .30rem;
	width:1.02rem;
    height:.6rem;
    line-height:.6rem;
    text-align:center;
    background: #fff;
    border:.02rem solid #48cdbb;
    border-radius:.3rem;
    font-size:.28rem;
    color:#48cdbb;
    top:50%;
    margin-top:-.3rem;
}
</style>
