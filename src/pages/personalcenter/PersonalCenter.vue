<template lang="html">
	<div id="personalcenter">
        <div class="shengji" v-if='card_nums > 0 && type == 8' @click='vipUpdate()'>
            <img v-if='less_that_one_month == 1' src="../../common/images/personalcenter/shengji_1.png" alt="">
            <img v-if='less_that_one_month == 0' src="../../common/images/personalcenter/shengji_2.png" alt="">
        </div>
		<div class="personalHeader">
			<div class="personalBg clearfix">
				<div class="personalLeft">
					<img :src="userInfo.image" :onerror="errorImg" class="head">
				</div>
                <div class="personalRight">
                    <h4>{{ userInfo.name }}</h4>
                        <div class="aboutMember">
                            <span @click="openVipCard()" v-if='card_nums === 0'>
                                <img src="../../common/images/personalcenter/openMember@2x.png">开通会员<img src="../../common/images/departmentlist/rightArrow.png" class="rightArrow">
                            </span>
                            <span @click="activeVipCard()" v-if='card_nums === 0'>
                                <img src="../../common/images/personalcenter/activityMember@2x.png" alt="">激活会员<img src="../../common/images/departmentlist/rightArrow.png" alt="" class="rightArrow">
                            </span>
                            <span @click="vipcardList" v-if='card_nums > 0'><img src="../../common/images/personalcenter/vip@2x.png"><em v-if='card_nums > 0 && type == 9'>家庭会员</em><em v-if='card_nums > 0 && type == 8'>个人会员</em><img src="../../common/images/departmentlist/rightArrow.png" class="rightArrow">
                            </span>

                            
                        </div>
                        
                </div>
				<!-- <img @click="showCode = 1"  class="personalRight" src="../../common/images/personalcenter/personalCode.png"> -->
			</div>
            <div class="myInfo">
                <div class="title">
                    <h2 class="clearfix" @click = 'myAppoint'>我的预约<span>全部<em><img src="../../common/images/to_right.png" alt="" style="width:.11rem"></em></span></h2>
                </div>
                <div class="myInfo_list">
                    <ul class="clearfix">
                        <li v-for='(item,index) in myInfoList' @click='myInfoLink(index)'>
                            <i :class='item.tag'><em v-if='statuArray[index] > 0'>{{statuArray[index]}}</em></i>
                            <span>{{item.text}}</span>
                        </li>
                    </ul>
                </div>
            </div>
		</div>
		<ul class="personalItem">
			<li v-for='item in personalItem' @click = 'personalItemClick(item.tag)'>
                <i :class="item.tag"></i>
				<!-- <img src="../../common/images/personalcenter/li_1@2x.png" > -->
				<p>{{item.text}}</p>
			</li>
            
		</ul>
		<div v-show="showCode == 1 ? true : false" @click.self="showCode = 2" class="hospitalCodeImg">
			<img src="../../common/images/hospitalCode.jpg" >
		</div>
        <footerPage :footIndex = 'footIndex'></footerPage>
	</div>
</template>

<script>
import http from '@common/js/http.js';
import { changePageTitle } from '@common/js/mUtils';
import FooterPage from '@components/footerPage/FooterPage';
export default {
    components:{
        FooterPage
    },
    beforeRouteEnter(to,from,next){
        next((vm) => {
            vm.footIndex = to.query.index
        })
    },
	data(){
		return {
            footIndex:"",
			showCode:2,
			allCard:{},
			userInfo: {},
            errorImg: 'this.src="' + require('../../common/images/avatar.png') + '"',
            myInfoList:[
                {
                    num:'',
                    text:'待付款',
                    tag:'list_1'
                },{
                    num:'',
                    text:'待就诊',
                    tag:'list_2'
                },{
                    num:'',
                    text:'待评价',
                    tag:'list_3'
                },{
                    num:'',
                    text:'已完成',
                    tag:'list_4'
                }
            ],
            personalItem:[
               {
                  tag:'li_1',
                  text:'就诊人'
               },{
                  tag:'li_2',
                  text:'我的问诊'
               },{
                  tag:'li_3',
                  text:'检查报告'
               },{
                  tag:'li_4',
                  text:'交易记录'
               },{
                  tag:'li_5',
                  text:'邀请好友'
               },{
                  tag:'li_6',
                  text:'我的赠送'
               },{
                  tag:'li_7',
                  text:'我的收藏'
               },{
                  tag:'li_8',
                  text:'医院活动'
               }
            ],
            card_nums:'',
            order_status:[],
            type:'',
            less_that_one_month:'',
            grant_card_time_after_one_month:'',
            statuArray:[]
		}
	},
	mounted(){
		changePageTitle('个人中心');
		this.getCardNum().then((res)=>{
			this.allCard = res;
			this.userInfo = res.userInfo;
            this.card_nums = res.card_nums;
            this.type = res.type;
            this.less_that_one_month = res.less_that_one_month;
            this.grant_card_time_after_one_month = res.grant_card_time_after_one_month
		}).catch((err)=>{
			
		});

        //我的预约列表
        this.getappointList().then((res)=>{
            this.currentappointList  = res.list;
          
            //待付款
            let daifu =  res.list.filter((item)=>{
                return item.order_status == 0;
            }).length

            //待就诊
            let jiuzhen =  res.list.filter((item)=>{
                return item.order_status == 1 || item.order_status == 2 || item.order_status == 3;
            }).length

            //待评价
            let pingjia =  res.list.filter((item)=>{
                return item.order_status == 4;
            }).length

            //已完成
            let wancheng =  res.list.filter((item)=>{
                return item.order_status == 5;
            }).length
            

            this.statuArray.push(daifu,jiuzhen,pingjia,wancheng);
        }).catch((err)=>{
            
        })
	},
	methods:{
        vipUpdate(){
            this.$router.push({
                path:'/vipUpdate',
                query:{
                    less_that_one_month:this.less_that_one_month,
                    grant_card_time_after_one_month:this.grant_card_time_after_one_month
                }
            })
        },
        getappointList(){
            //获取列表
            return http.fetch('/api/user/reg_order_list',{
                rows:60
            })
        },
        getData(){
            
        },
        vipcardList(){
            this.$router.push({
                path:'/vipcardlist',
                query:{
                    type:this.type
                }
            })
        },
        myCard(){

            this.$router.push({
                path:'/mycourse',
                query:{
                    title:'我的优惠券'
                }
            })

        },
		getCardNum(){
			return http.fetch('/api/user/index');
		},
		patientslist(){
			this.$router.push({
				path:'patientslist',
				query:{
					pathfrom:'personalcenter'
				}
			});
		},
		myVipCard(){
			this.$router.push('/myvipcards');
		},
		myAppoint(){
			this.$router.push({
                path:'/myappoint',
                query:{
                    id:0
                }
            });
		},
		myFollow(){
			this.$router.push('/myfollow');
		},
		myCourse(){

            this.$router.push({
                path:'/mycourse',
                query:{
                    title:'我的课程'
              }
            })

		},
		serviceOrder(){
			this.$router.push('/serviceorder');
		},
		myQuestion(){
			this.$router.push('/askDoctorList');
		},
		helpCenter(){
            this.$router.push({
                path:'/mycourse',
                query:{
                    title:'帮助中心'
                }
            })

        },
		hospitalActivity(){
			this.$router.push('/hospitalConcessions');
		},
		paymentlist(){
			this.$router.push('/myvipcards');
		},
		checkreport(){
			this.$router.push('/myvipcards');
		},
		openVipCard(e){
			//this.$router.push('/opencard');
            e = e || window.event;
            this.$router.push({
                path:'/openMember',
                query:{
                    statu:'buy'
                }
            });
		},
        activeVipCard(e){
            this.$router.push({
                path:'/openMember',
                query:{
                    statu:'toactive'
                }
            });
        },
        myInfoLink(tag){
            this.$router.push({
                path:'/myappoint',
                query:{
                    id:tag
                }
            });
            
        },
        personalItemClick(tag){
            if(tag == 'li_1'){
                this.$router.push({
                    path:'/patientslist',
                    query:{
                        pathfrom :'personalcenter'
                    }
                })
            }else if(tag == 'li_2'){
                this.$router.push('/askDoctorList');
            }else if(tag == 'li_3'){
                this.$router.push({
                    path:'/vipcardlist',
                    query:{
                        type:this.type
                    }
                });
            }else if(tag == 'li_4'){
                this.$router.push('/transactionrecord');
            }else if(tag == 'li_5'){
                this.$router.push('/inviteFriend');
            }else if(tag == 'li_6'){
                this.$router.push('/mySend');
            }else if(tag == 'li_7'){
                this.$router.push('/myCollection');
            }else if(tag == 'li_8'){
                this.$router.push('/hospitalConcessions');
            }
        }
	}
}
</script>

<style lang="less">
#personalcenter .shengji{
    position: fixed;
    top: -.1rem;
    right: 0;
    z-index: 999;
    img{
        display: block;
        width: 2.2rem;
    }
}
#personalcenter .hospitalCodeImg{
	width:100%;
	height:100%;
	position:fixed;
	z-index:2;
	left:0;
	top:0;
	background:rgba(0,0,0,.5);
}
#personalcenter .hospitalCodeImg img{
	z-index:3;
	width:5rem;
	height:5rem;
	position:fixed;
	left:50%;
	top:50%;
	transform:translate(-50%,-50%);
}
#personalcenter{
	padding-bottom:.4rem;
}
#personalcenter .personalHeader{
}
#personalcenter .personalBg{
	width:7.5rem;
	height:3.9rem;
    background-color: #48cdbb;
    padding-top: .6rem;
    padding-left: .6rem;
    background-image: url('../../common/images/personalcenter/personal_bg.png');
    background-repeat: no-repeat;
    background-size: 100% auto;
}

#personalcenter .personalLeft{
	float: left;
}
#personalcenter .personalLeft img.head{
	width:1.4rem;
	height:1.4rem;
	border-radius: 100%;
	display:inline-block;
	vertical-align: middle;
    border:.04rem solid #fff;
}
#personalcenter .personalRight{
    float: left;
    margin-left: .4rem;
    h4{
        font-size: .32rem;
        font-weight: bold;
        color: #ffffff;
        margin-bottom:.04rem;
        line-height:.72rem;
        height: .72rem;
    }
    .aboutMember{
        position: relative;
        span{
            display:inline-block;
            vertical-align: middle;
            width: 2.1rem;
            height: .56rem;
            border-radius:.28rem;
            text-align:center;
            line-height:.56rem;
            background: rgba(0,0,0,0.18);
            font-size:.24rem;
            color:#fff;
            img{
                display: inline-block;
                width: .42rem;
                height: .42rem;
                vertical-align:middle;
                margin-right: .1rem;
                margin-bottom:.075rem;
                margin-left: -.22rem;
            }
            img.rightArrow{
                width: .09rem;
                height: .14rem;
                margin-right: 0;
                margin-left: .15rem;
            }
        }
        span:first-child{
            margin-right: .2rem;
        }
    }

}

#personalcenter .myInfo{
	width: 6.9rem;
    height: 2.6rem;
    margin:0 auto;
    margin-top:-1.3rem;
    border-radius: .24rem;
    background-color: #ffffff;
    box-shadow: -0.017rem -0.025rem .238rem 0.002rem rgba(0, 0, 0, 0.11);
    .title{
        border-bottom:.02rem solid #f2f2f2;
        h2{
            font-size:.28rem;
            color:#333;
            line-height:.82rem;
            padding:0 .3rem;
            span{
                font-size:.26rem;
                color:#b3b3b3;
                float: right;
                em{margin-left: .2rem;}
            }
        }
    }
    .myInfo_list{
        margin-top: .4rem;
        li{
            float: left;
            width: 25%;
            text-align:center;
            i{
                position: relative;
                display: block;
                width: .55rem;
                height: .45rem;
                margin:0 auto;
                margin-bottom: .2rem;
                background-repeat: no-repeat;
                background-size: 100% auto;
                background-position: center center;
                em{
                    display: block;
                    position: absolute;
                    width: .33rem;
                    height: .33rem;
                    background: #fd7a86;
                    text-align:center;
                    line-height:.33rem;
                    color:#fff;
                    font-size:.23rem;
                    border-radius:100%;
                    right: -.16rem;
                    top: -.12rem;
                }
            }
            i.list_1{background-image: url('../../common/images/personalcenter/myInfo_1@2x.png');}
            i.list_2{background-image: url('../../common/images/personalcenter/myInfo_2@2x.png');}
            i.list_3{background-image: url('../../common/images/personalcenter/myInfo_3@2x.png');}
            i.list_4{background-image: url('../../common/images/personalcenter/myInfo_4@2x.png');}
            span{
                font-size:.26rem;
                color: #5a5a5a;
            }
        }
    }

}

#personalcenter .personalDot{
	width: .11rem;
    height: .11rem;
    background-color: #ff4621;
    position:absolute;
    right:33%;
    top:0;
    border-radius: 50%;
}
#personalcenter .coiling{
	display: flex;
	justify-content: space-around;
}
#personalcenter .coiling div{
	position:relative;
	width:3.21rem;
	height:1.34rem;
}
#personalcenter .coiling div span{
    font-size: .26rem;
    font-weight: bold;
    letter-spacing: .03rem;
    color: #fefefe;
    position:absolute;
    top:.47rem;
    left:1.35rem;
}
#personalcenter .coiling div img{
	width:3.21rem;
	height:1.34rem;
}

#personalcenter .personalItem{
	font-size:0;
    width: 6.9rem;
    margin: 0 auto;
    margin-top:.3rem;
    border-radius: .24rem;
    background-color: #ffffff;
    box-shadow: -0.017rem -0.025rem .238rem 0.002rem rgba(0, 0, 0, 0.11);
}
#personalcenter .personalItem li:nth-of-type(7),#personalcenter .personalItem li:nth-of-type(8){
	border-bottom:none;
}
#personalcenter .personalItem li{
	height:1.82rem;
	width:25%;
	box-sizing: border-box;
	text-align: center;
	display:inline-block;
}
#personalcenter .personalItem li i{
    display: inline-block;
	width:.5rem;
	height:.5rem;
	margin-top:.48rem;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% auto;
}
#personalcenter .personalItem li i.li_1{background-image: url('../../common/images/personalcenter/li_1@2x.png');}
#personalcenter .personalItem li i.li_2{background-image: url('../../common/images/personalcenter/li_2@2x.png');}
#personalcenter .personalItem li i.li_3{background-image: url('../../common/images/personalcenter/li_3@2x.png');}
#personalcenter .personalItem li i.li_4{background-image: url('../../common/images/personalcenter/li_4@2x.png');}
#personalcenter .personalItem li i.li_5{background-image: url('../../common/images/personalcenter/li_5@2x.png');}
#personalcenter .personalItem li i.li_6{background-image: url('../../common/images/personalcenter/li_6@2x.png');}
#personalcenter .personalItem li i.li_7{background-image: url('../../common/images/personalcenter/li_7@2x.png');}
#personalcenter .personalItem li i.li_8{background-image: url('../../common/images/personalcenter/li_8@2x.png');}
#personalcenter .personalItem li p{
	margin-top:.15rem;
    font-size: .26rem;
    color: #5a5a5a;
}
</style>
