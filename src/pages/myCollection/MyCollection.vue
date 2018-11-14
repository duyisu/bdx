<template lang="html">
    <div class="myCollection">
        <div class="hd">
            <ul>
                <li v-for='(item,index) in hd' :class='{active : index == idx}' @click='tabClick(index)'>{{item.txt}}</li>
            </ul>
        </div>
        <div class="bd">
            <ul class="doctorList" v-if='idx == 0'>
                <li :key="index" v-for="(item,index) in doctorList"   @click="appointment(item.doctor_id,index)">
                <div class="clearfix">
                    <div class="doctorLeft">
                        <img :src="item.image" :onerror="errorImg">
                    </div>
                    <div class="doctorRight">
                        <p class="doctorInfo"><span>{{item.name}}</span><span></span></p>
                        <p class="available">
                            <span>
                                <img src="../../common/images/departmentlist/starIcon.png" alt="" />
                                <i><em>
                                    {{ Number(item.star)*2 }}
                                </em></i>
                            </span>
                            <em>问诊量：{{item.ask_count}}</em>
                        </p>
                        <p class="des">擅长：{{item.expertise_disease}}</p>
                        
                        <p class="price">
                            <span>
                                <i>￥{{ item.normal_price }}</i>
                                <em class="not-vip"><img src="../../assets/img/not-vip.png" alt=""></em>
                            </span>
                            <i class="split-line"></i>
                            <span>
                                <i>￥{{ item.vip_price }}</i>
                                <em class="vip"><img src="../../assets/img/vip.png" alt=""></em>
                            </span>
                        </p>
                    </div>
                    <p  class="appointment" @click='cancelFollow(item.doctor_id)'>取消收藏</p>
                </div>
                </li>
            </ul>
            <div class="doctor-forum-list" v-if='idx == 1'>
                <div class="topic clearfix" v-for='item in forumTypeContent' @click='doctorForumLink(item.id)'>
                  <div class="text">
                     <div class="head">{{item.title}}</div>
                     <span class="num">{{item.preview}}</span>
                  </div>
                  <div class="img"><img :src='item.picview' alt=""></div>
               </div>
            </div>
        </div>
        <div class="norecord abs-center" v-if='collectInfoStatu'>
            <img src="../../common/images/noInfo/recharge.png" alt="" style="width:5.5rem;">
            <p style="text-align:center;margin-top:.35rem;font-size:.36rem;color:#898989;">暂无相关信息</p>
        </div>
    </div>
</template>

<script>
import { baseUrl,host } from '@common/js/config';
import { Toast } from 'vux';
import {s_getIndexInfo,s_hospitalNew} from '@service/service';
import http from '@common/js/http.js';
import { getStore,setStore,changePageTitle } from '@common/js/mUtils';
import PriceAbout from '@components/priceAbout/PriceAbout';
import DoctorForum from '@components/doctorForum/DoctorForum';
export default {
    components:{
        PriceAbout,
        DoctorForum
    },
    mounted(){
        changePageTitle('我的收藏');
        this.$nextTick(function(){

            setTimeout(()=>{
                this.getDoctorList();
                
            },16)
            
            s_hospitalNew().then(res => {
               
                this.info = res.info;
            });
        }) 
        http.fetch('api/user/archive_mark_list').then((res)=>{
           
            this.forumTypeContent = res;
        }).catch((arr)=>{

        })
    },
    data(){
        return{
            hd:[
               {
                  txt:'医生'
               },{
                  txt:'资讯'
               }
            ],
            idx:0,
            doctorList:[],
            depart_id:'68',
            doctorIdx:0,
            info:[],
            errorImg: 'this.src="' + require('../../common/images/avatar.png') + '"',
            collectInfoStatu:false,
            forumTypeContent:[]
        }
    },
    methods:{
        tabClick(index){
            this.idx = index;
            if(index == 0){
                if(this.doctorList.length == 0){
                    this.collectInfoStatu = true
                }else{
                    this.collectInfoStatu = false
                }
            }
            if(index == 1){
                if(this.forumTypeContent.length == 0){
                    this.collectInfoStatu = true
                }else{
                    this.collectInfoStatu = false
                }
            }
        },
        getDoctorList(){
            //获取医生列表
            http.fetch('/api/User/doctor_mark_list').then((res)=>{
                    this.doctorList = res;
                    this.tabClick(0);
            }).catch((err)=>{
               
            })

        },
        appointment(){
           
        },
        cancelFollow(id){
            http.fetch('/api/user/mark_doctor',{
                doctor_id:id
            }).then((res)=>{
                window.location.reload(true);
            }).catch((err)=>{
               
            })
        },
        doctorForumLink(id){
            this.$router.push({
                path:'/newsContent',
                query:{
                    id:id
                }
            })
        }
      
    }
}
</script>

<style lang="less">
.price{
    padding-top:.24rem;
    border-top:.02rem solid #f2f2f2;
    span{
        display: inline-block;
    }
    .split-line{
        margin: 0 .07rem;
        display: inline-block;
        width: .03rem;
        height: .29rem;
        border-radius: .01rem;
        background-color: #f2f2f2;
        vertical-align:middle;
    }
}
.price span i{
    font-size:0.28rem;
    color: #898989;
    font-weight: bold;
    display: inline-block;
    vertical-align:middle;
}
.price span em{
    font-size:.22rem;
    display: inline-block;
    margin-left:0rem;
    vertical-align:middle;
    img{
        display: block;
        width: 100%;
        height: 100%;
    }
}
.price span em.not-vip{
    width: 1.05rem;
    height: .46rem;
}
.price span em.vip{
    width: .81rem;
    height: .46rem;
}
.myCollection .bd{
    margin-top: .65rem;
}
.myCollection .doctorList{
    background:#fff;
    padding:0 .3rem;
}
.myCollection .doctorList li{
    position:relative;
    margin-bottom: .3rem;
}
.myCollection .doctorList li>div{
    width:6.9rem;
    margin:0 auto;
    padding:.4rem 0.3rem;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 0 27px 0 rgba(0, 0, 0, 0.09);
}
.myCollection .doctorLeft{
    width:1.9rem;
    height: 2.82rem;
    float:left;
    border-radius:.08rem;
    overflow:hidden;
}
.myCollection .doctorLeft>img{
    display: block;
    width:100%;
    height:100%;
}
.myCollection .doctorRight{
    float:right;
    width: 3.98rem;
}
.myCollection .doctorInfo{
    font-size:0;
    padding-top:0.14rem;
}
.myCollection .doctorInfo span:nth-of-type(1){
    color:#191919;
    font-size:0.32rem;
    display: inline-block;
    vertical-align: bottom;

}
.myCollection .doctorInfo span:nth-of-type(2){
    display: inline-block;
    vertical-align: bottom;
    font-size:.26rem;
    color:#898989;
    margin-left:.21rem;
}
.myCollection .available{
    font-size:0;
    padding-top:0.2rem;
}
.myCollection .available span{
    color:#ffc001;
}
.myCollection .available span i{
    font-weight: bold;
}
.myCollection .available span em:nth-of-type(1){
    font-size:.32rem;
    margin-left:.13rem;
}
.myCollection .available span em:nth-of-type(2){
    font-size:.28rem;
}
.myCollection .available span img{
    width:0.28rem;
    height:0.28rem;
}
.myCollection .available>em{
    font-size:.24rem;
    color:#bbb;
    margin-left:0.31rem;
    font-weight: 500;
}
.myCollection .des{
    display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 2;
    overflow: hidden;
    color:#898989;
    font-size:0.24rem;
    line-height:1.33;
    margin-top: .3rem;
    margin-bottom:.2rem;
}

.myCollection .appointment{
    z-index:2;
    touch-action: none;
    width: 1.2rem;
    height:.6rem;
    opacity: 0.99;
    line-height:.6rem;
    text-align: center;
    font-size: .24rem;
    letter-spacing: .019rem;
    position:absolute;
    color:#898989;
    right:.2rem;
    top:.5rem;
    border-radius: .3rem;
    background-color: #fff;
    border:.02rem solid #b3b3b3;
}
.myCollection{
    padding-top: .5rem;
    .hd{
        ul{
            text-align:center;
            width: 100%;
            li{
                position: relative;
               display: inline-block;
               font-size:.32rem;
               color:#5a5a5a;
               margin-left: .96rem;
            }
            li:first-child{
                margin-left: 0;
            }
            li.active{
                color:#333;
                font-weight:bold;
            }
            li.active:after{
                content:'';
                position: absolute;
                bottom: -.16rem;
                left: 50%;
                margin-left: -.24rem;
                width: .48rem;
                height: .07rem;
                border-radius: .03rem;
                background-color: #48cdbb;
            }
        }
        
    }
}
.doctor-forum-list{
    min-height:1.08rem;
    .errorInfo{
        text-align:center;
        height:1rem;
        line-height:1rem;
    }
    .topic{
        padding:0 .3rem;
        margin-bottom:.35rem;
        .text{
          width: 60%;
          float: left;
          padding-bottom: .39rem;
          border-bottom:.03rem solid #f2f2f2;
          .head{
            line-height:.48rem;
            height:.92rem;
            overflow:hidden;
            margin-bottom:.48rem;
            font-weight:500;
            font-size:.32rem;
            color:#333;
          }
          .num{
            display: block;
            white-space:nowrap;
            text-overflow:ellipsis;
            color:#898989;
            width: 100%;
            font-size:.26rem;
            overflow:hidden;
          }
        }
        .img{
          float: right;
          width: 32%;
          height: 1.6rem;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
    }
}
</style>
