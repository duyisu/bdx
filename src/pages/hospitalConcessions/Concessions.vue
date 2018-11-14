<template lang="html">
    <section>
        <div class="hospital-concessions">
            <!-- <div class="header" :style="bgObject"></div> -->
            <div class="join" @click='toJoin'>我要参加</div>
            <ul class="activity-list">
                <li  v-for="item in list"  class="item">
                    <a class="item-link" :href="item.url">
                        <div class="img">
                            <img :src="item.image" alt=""  :onerror="errorImg">
                        </div>
                        <div class="left">{{item.title}}</div>
                    </a>
                </li>
            </ul>
            <div class="join-info" v-if='joinState'>
                <div class="box">
                  <div class="box-hd"><img src="../../assets/img/to_join@2x.png" alt=""></div>
                  <div class="choice">
                    <p class="type">选择活动项目</p>
                    <ul class="type-list">
                      <li v-for='(item,idx) in typeList' class="item" :class="{active: itemIdx == idx }" @click='selectItem(item,idx)'>{{item}} <span class="actived"><img src="../../assets/img/selected.png" alt=""></span></li>
                    </ul>
                    <p class="write-hd">填写你的信息</p>
                    <ul class="info-list">
                      <li class="input"><span>姓&nbsp;&nbsp;&nbsp;名</span><input type="text"  v-model='name'></li>
                      <li class="input"><span>手机号</span><input type="text" v-model='mobile'></li>
                      <li class="input"><span>验证码</span><input type="text" v-model='verifycode'><em class="get-code" @click='getMobileMessage'>{{mobileCodeMsg}}</em></li>
                      <li class="sub" @click='getActivetyInfo'><input type="submit"></li>
                    </ul>
                    <p class="tit">工作人员将在第一时间联系您</p>
                  </div>
                  <div class="warning" v-if='warning.state'>{{warning.msg}}</div>
                  <div class="close" @click='close'><img src="../../assets/img/close.png" alt=""></div>
                </div>
                
            </div>
        </div>
    </section>
</template>

<script>
import { changePageTitle,isMobile  } from '@common/js/mUtils'
import { s_hospitalActivity } from '@service/service';
import {s_getIndexInfo,s_getMobileMessage,s_getActivetyInfo} from '@service/service';
export default {
    mounted(){
        changePageTitle('医院活动');
        this.getHomeInfo();
        s_hospitalActivity().then(res => {
            this.bgObject.backgroundImage = res.banner.image;
            this.list = res.list;
        });
    },
    data() {
        return {
            banner : [],
            list: [],
            bgObject: {
                backgroundImage:''
            },
            errorImg: 'this.src="' + require('./img_list_01.png') + '"',
            itemIdx: null,
            tagname:'',
            mobileStatus:false,
            mobileCodeMsg:'获取验证码',
            sublimeStatu:false,
            getCodeTime:60,
            warning:{
                state:false,
                msg:''
            },
            tagname:'',
            name:'',
            mobile:'',
            verifycode:'',
            joinState:false,
        }
    },
    methods: {
        selectItem(item,idx){
            if(idx == this.itemIdx){
              this.itemIdx = null;
              this.tagname = '';
            }else{
              this.itemIdx = idx;
              this.tagname = item;
            }
            
        },
        getHomeInfo(){
            s_getIndexInfo({

            }).then(res =>{
              
                this.typeList = res.activity_tags;
            })
        },
        toJoin(){
            this.joinState = true;
            $('body,html').addClass('on');
            this.sublimeStatu = false;
            
        },
        close(){
            this.joinState = false;
            $('body,html').removeClass('on');
        },
        getActivetyInfo(){
                var that = this;
                var parme = {
                  name:that.name,
                  mobile:that.mobile,
                  verifycode:that.verifycode,
                  tagname:that.tagname,
                }
                if(this.tagname == ''){
                  this.warningAlert(true,'请选择活动项目');
                  return false
                }else if(this.name ==''){
                  this.warningAlert(true,'姓名不能为空');
                  return false
                }else if(!isMobile(this.mobile)){
                  this.warningAlert(true,'手机号不能为空或格式错误');
                  return false
                }else if(this.verifycode == ''){
                  this.warningAlert(true,'验证码不能为空');
                  return false
                }else if(this.mobileStatus == false){
                  this.warningAlert(true,'验证码不正确');
                  return false
                }else{
                  s_getActivetyInfo(parme).then(res => {
                    
                    if(res == '报名成功'){
                      this.warningAlert(false,'报名成功');
                    }
                  }).catch(res =>{
                   
                  })
                  that.sublimeStatu = true;
                }

        },
        warningAlert(state,msg){
            var that = this
             this.warning.state = true;
             this.warning.msg = msg;
             setTimeout(function(){
               that.warning.state = false;
               that.joinState = state;
             },1000)
        },
        getMobileMessage(){
            var that = this;
            if(that.getCodeTime == 60){
              if(isMobile(this.mobile)){
                var timer = setInterval(function(){
                   that.getCodeTime --;
                   that.mobileCodeMsg = that.getCodeTime+'s后重新获取'
                   if(that.getCodeTime == 0 || that.sublimeStatu == true){
                      clearInterval(timer);
                      that.mobileCodeMsg = '获取验证码'
                      that.getCodeTime = 60;
                      return
                    }
                },1000);
            
                var mobileCode = this.mobile;
                s_getMobileMessage(mobileCode).then(res =>{
                   
                    if(res ==='短信发送成功'){
                      this.mobileStatus = true;
                      return
                    }
                }).catch(res =>{
                    
                    this.warningAlert(true,res);
                })
              }else{
              this.warningAlert(true,'手机号不能为空或格式错误');
              }
            }else{
              return false;
            }
        },
    }
}
</script>

<style lang="less" scoped>
.hospital-concessions{
    .join{
        width: 1.76rem;
        height: .6rem;
        line-height:.6rem;
        text-align:center;
        color:#49cdba;
        font-size:.26rem;
        border-radius:.3rem;
        margin:.4rem auto;
        border:.02rem solid #48cdbb;
    }
    .header{
        width: 100%;
        height: 3rem;
        background: url(bg_banner.png) no-repeat top center/7.5rem 3rem;
    }
    .activity-list{
        .item{
            display: block;
            width: 6.24rem;
            margin:0 auto;
            border-radius:.14rem;
            overflow:hidden;
            background-color: #fff;
            box-shadow: 0 0 .27rem 0 rgba(0, 0, 0, 0.1);
            margin-bottom: .3rem;
            .left{
                color: #5a5a5a;
                line-height: 1.06rem;
                font-size: .32rem;
                overflow: hidden;
                padding-left: .36rem;
            }
            .datatime{
                line-height: .3rem;
                font-size: .24rem;
                overflow: hidden;
            }
            .img{
                height: 3.24rem;
                overflow: hidden;
                >img{
                    display:block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .join-info{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 999999;
        .box{
          position: relative;
          width: 80%;
          background: #fff;
          margin: 0 auto;
          margin-top:0.74rem;
          border-radius:0.08rem;
          .warning{
            width: auto;
            text-align: center;
            position: absolute;
            left: 50%;
            top: 50%;
            color: #fff;
            background: #666;
            height: 1rem;
            line-height: 1rem;
            border-radius: .2rem;
            transform:translate(-50%,-50%);
            padding:0 .1rem;
          }
          .box-hd{
            background: #48cdbb;
            width:100%;
            height: 1.39rem;
            line-height:1.3rem;
            text-align:center;
            color:#fff;
            border-radius:0.08rem;
            img{
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .choice{
            padding:0 .18rem;
            height: 7rem;
            overflow:scroll;
            .type{
              text-align:center;
              padding-top:0.6rem;
              font-size:.24rem;
              color:#b3b3b3;
              margin-bottom:.39rem;
            }
            .type-list{
              text-align:left;
              .item{
                 position: relative;
                 padding:.19rem .22rem;
                 border:1px solid #d4d4d4;
                 border-radius:.3rem;
                 display: inline-block;
                 margin:0 .09rem;
                 color:#898989;
                 font-size:.24rem;
                 line-height:.24rem;
                 margin-bottom: .3rem;
                 .actived{
                  display: none;
                   position: absolute;
                   bottom: 0;
                   right: 0;
                   img{
                    display: block;
                    width: .2rem;
                    height: .2rem;
                   }
                   
                 }
              }
              .item.active{
                color:#40cbb7;
                border-color:#40cbb7;
                .actived{
                  display: block;
                }
              }
            }
            .write-hd{
              text-align:center;
              font-size: .24rem;
              color: #b3b3b3;
              line-height:.24rem;
              margin-top: .2rem;
              margin-bottom: .23rem;
            }
            .info-list{
              padding:0 .22rem;
              li.input{
                position: relative;
                height: .66rem;
                margin-bottom: .17rem;
                span{
                  display: inline-block;
                  width: 1.1rem;
                  text-align:left;
                  color:#898989;
                  font-size:.28rem;
                }
                input[type='text']{
                  border:none;
                  border-bottom:.03rem solid #f2f2f2;
                  height:100%;
                  width: 3.61rem;
                }
                .get-code{
                  color:#40cbb7;
                  font-size:.24rem;
                  position: absolute;
                  right: 0.45rem;
                  top: 50%;
                  margin-top: -.14rem;
                }
              }
              li.sub{
                margin-top: .5rem;
                input[type='submit']{
                  width: 2.56rem;
                  height: .7rem;
                  background: #40cbb7;
                  border:none;
                  color:#fff;
                  border-radius:25px;
                  margin:0 auto;
                  display: block;
                  font-size:.32rem
                }
              }
            }
            .tit{text-align:center;margin-top:.5rem;color:#b3b3b3;font-size:.24rem;padding-bottom: .3rem;}
          }
          .close{
             width: 0.8rem;
             height: 0.8rem;
             position: absolute;
             left: 50%;
             margin-left:-0.39rem;
             bottom: -1.3rem;
             img{
              display: block;
              width: 100%;
              height: 100%;
             }
          }
        }
        
      }
}
</style>
