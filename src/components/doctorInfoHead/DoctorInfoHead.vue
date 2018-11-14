<template lang="html">
    <div class="box" id="doctorinfo_head">
        <div class="bg">
            <img class='interested' @click="markDoctor" :data-status="doctorInfo.is_collect" :src="doctorInfo.is_collect === 1 ? defaultImg_on : defaultImg">
            <img :src='defaultImg2' alt="" class="share" @click='shareBut(invite_share_tip = true)'>

        </div>
        <div class="pageheader">
            <p @click="toDoctorIndex" class="doctorIndex">
                医生主页
                <img src="../../common/images/departmentlist/rightArrow.png" alt="" />
            </p>
            <div class="header">
                <div>
                    <img :src="doctorInfo.image" :onerror="errorImg">
                </div>
                <div>
                    <h4>{{ doctorInfo.name }}</h4>
                </div>
                <div>
                    <span>{{ doctorInfo.company }}</span>
                    <i>|</i>
                    <span v-for='item in doctorInfo.practice'>{{ item}}</span>
                    <i>|</i>
                    <span>{{ doctorInfo.depart_name }}</span>
                </div>
                <div>
                    <ul>
                        <li v-for="item in star">
                            <img src="../../common/images/departmentlist/starIcon.png" alt="" />
                        </li>
                        <li class="liopacity" v-for="item in (5 - star)">
                            <img src="../../common/images/departmentlist/starIcon.png" alt="" />
                        </li>
                    </ul>
                    <span>
                        {{ star *2}}
                    </span>
                </div>
                <div v-if="doctorInfo.tag.length">
                    <p :key="index" v-for="item,index in doctorInfo.tag">{{ item }}</p>
                </div>
                <p class="price">
                    <span>
                         <i>￥{{normalPrice}}</i>
                         <em class="not-vip"><img src="../../assets/img/not-vip.png" alt=""></em>
                    </span>
                    <i class="split-line"></i>
                    <span>
                         <i>￥{{vipPrice}}</i>
                         <em class="vip"><img src="../../assets/img/vip.png" alt=""></em>
                    </span>

                </p>
            </div>
        </div>
        <div class="tip" v-if='showToast'>{{msg}}</div>
        <div class="invite_share_tip" v-if='invite_share_tip'>
            <img class="img1" src="../../common/images/invite/know.png" alt="" @click='invite_share_tip = false'>
            <img class="img3" src="../../common/images/invite/share_row.png" alt="">
            <img class="img2" src="../../common/images/invite/share_text.png" alt="">
        </div>
    </div>
</template>
<script>
import http from '@common/js/http.js';
import wxShare from '@common/js/wxapi';
export default{
    props:['doctorInfo','normalPrice','vipPrice','index','star'],
    data(){
        return{
            defaultImg_on:require('../../common/images/departmentlist/likedoctorIcon.png'),
            defaultImg:require('../../common/images/departmentlist/normal.png'),
            defaultImg2:require('../../common/images/departmentlist/share.png'),
            collect:'',
            depart_id:'',
            doctor_id:'',
            errorImg: 'this.src="' + require('../../common/images/avatar.png') + '"',
            msg:'',
            showToast:false,
            invite_share_tip:false
        }
    },
    methods:{
        markDoctor(){
            var that = this;
            http.fetch('/api/user/mark_doctor',{
               doctor_id:that.doctorInfo.doctor_id
            }).then((res)=>{
               that.msg = res;
               that.showToast = true;
               setTimeout(function(){
                   that.showToast = false
               },1000)
               if(res == '关注成功'){
                    this.doctorInfo.is_collect = 1
               }else if(res == '取消关注成功'){
                   this.doctorInfo.is_collect = 0
               }
            });
            
        },
        toDoctorIndex(){
          this.$router.push({
            path:'/doctorindex',
            query:{
                doctor_id:this.doctorInfo.doctor_id,
                depart_id:this.doctorInfo.depart_id,
                index:this.index
            }
          });
        },
        shareBut(){
            
        }
    },
    mounted(){
      
    }
}
</script>
<style lang='less'>
.box{
    .invite_share_tip{
        position: fixed;
        left: 0;
        top: 0;
        display: block;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,.7);
        z-index: 999;
        img{
            position: absolute;
            display: block;
        }
        .img1{
            width: 2.05rem;
            left: 50%;
            margin-left: -1.025rem;
            top: 7rem;
        }
        .img2{
            width: 4.23rem;
            left:50%;
            margin-left: -2.115rem;
            top:3.7rem;
        }
        .img3{
            width: 2rem;
            top: 0;
            right: .4rem;
        }
    }
}
.tip{
    position: absolute;
    display: block;
    width: 3.4rem;
    height: 1.2rem;
    line-height:1.2rem;
    text-align:center;
    left:50%;
    margin-left: -1.7rem;
    top:50%;
    background: #999;
    color:#fff;
    border-radius:.1rem;
}
#doctorinfo_head{
    position:relative;
}
#doctorinfo_head .bg{
    position:relative;
    margin-top:-1px;
    width:7.5rem;
    height:4.19rem;
    background:url(../../common/images/departmentlist/doctorbg.png) no-repeat;
    background-size:cover;
    .share{
        width: .44rem;
        height: .44rem;
        position: absolute;
        right: .54rem;
        top: .44rem;
        z-index: 999;
    }
}
#doctorinfo_head .bg img.interested{
    width:0.46rem;
    height:.40rem;
    position:absolute;
    right:1.45rem;
    top:.43rem;
    z-index:2;
}
#doctorinfo_head .pageheader{
    position:relative;
    left:.3rem;
    top:1.19rem;
    width: 6.9rem;
    border-radius: .08rem;
    background-color: #ffffff;
    box-shadow: -0.014rem -0.014rem .158rem 0.002rem rgba(0, 0, 0, 0.1);
    text-align: center;
    
    margin-top: -4rem;
}
#doctorinfo_head .header{
    padding:0 .3rem;
    margin-top:-0.77rem;

}
#doctorinfo_head .header>div:nth-of-type(1){
    display:inline-block;
    width:1.66rem;
    height:1.66rem;
    background:#fff;
    border:.04rem solid #fff;
    border-radius: 50%;
    overflow:hidden;
        margin-top: -0.8rem;
}
#doctorinfo_head .header>div:nth-of-type(1) img{
    width:1.64rem;
    height:1.64rem;
    border-radius: 50%;
}
#doctorinfo_head .header>div:nth-of-type(2){
    margin-top:0.1rem;
}
#doctorinfo_head .header>div:nth-of-type(2) h4{
  font-size: .36rem;
  font-weight: bold;
  color: #191919;
}
#doctorinfo_head .header>div:nth-of-type(3){
    font-size: 0;
    margin-top:.15rem;
}
#doctorinfo_head .header>div:nth-of-type(3) span{
  font-size: .26rem;
  font-weight: 500;
  color: #898989;
  margin:0 .06rem;
  display:inline-block;
  vertical-align: middle;
}
#doctorinfo_head .header>div:nth-of-type(3) i{
  font-size: .26rem;
  color:#f5f5f5;
  font-weight: bold;
  margin:0 .06rem;
  display:inline-block;
  vertical-align: middle;
}
#doctorinfo_head .header>div:nth-of-type(4){
    font-size:0;
    margin-top:.35rem;
}
#doctorinfo_head .header>div:nth-of-type(4)>span{
    width: 44px;
    height: 25px;
    font-size: .32rem;
    font-weight: 500;
    color: #191919;
}
#doctorinfo_head .header>div:nth-of-type(4) ul{
    display:inline-block;
    margin-right:0.11rem;
}
#doctorinfo_head .header>div:nth-of-type(4) ul li{
    width:0.28rem;
    height:0.28rem;
    display:inline-block;
    margin-right:0.11rem;
}
#doctorinfo_head .header>div:nth-of-type(4) ul li img{
    width:0.28rem;
    height:0.28rem;
}
#doctorinfo_head .header>div:nth-of-type(5){
    font-size:0;
    margin-top:.3rem;
}
#doctorinfo_head .header>div:nth-of-type(5) p{
    display:inline-block;
    padding:0.2rem 0.2rem;
    border-radius: .08rem;
    background-color: #f2f2f2;
    font-size: .26rem;
    font-weight: 500;
    color: #5a5a5a;
    margin:0 .08rem;
}
#doctorinfo_head .doctorIndex{
    position:absolute;
    z-index:2;
    top:.52rem;
    right:-.04rem;
    width: 1.81rem;
    height: .56rem;
    border-radius: .27rem 0 0 .27rem;
    line-height:.54rem;
    text-align: left;
    background-color: #48cdbb;
    font-size: .26rem;
    font-weight: 500;
    color: #ffffff;
    padding-left: .32rem;
}

#doctorinfo_head .doctorIndex>img{
    position: absolute;
    width:.12rem;
    height:.2rem;
    top: 50%;
    margin-top: -.1rem;
    right: .18rem;
}
#doctorinfo_head .pageheader .header{
    .price{
    margin-top: .34rem;
    padding-top:.24rem;
    padding-bottom: .3rem;
    border-top:.02rem dotted #f2f2f2;
    span{
        display: inline-block;
    }
    .split-line{
        margin: 0 .2rem;
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
}

</style>