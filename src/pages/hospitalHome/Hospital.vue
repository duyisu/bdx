<template lang="html">
    <section v-if='banners.length > 0'>
        <div class="hospital-wrapper">
            <div class="header">
                <div class="searchBox">
                    <span class="icon-search weui-icon-search"></span>搜索药品、症状、疾病、对话
                </div>
                <div class="headTogger owl-carousel">
                    <div class="item" v-for='item in banners' @click='pageHrefBanner(item.link)'><img :src="item.picview" alt=""></div>
                </div>
            </div>

            <ul class="nav-menu">
                <li class="menu-item" v-for="(item, idx) in menuList" @click="addItemEvent(item.flag)">
                    <i class="menu-icon" :class="item.icon"></i>
                    <span class="menu-text">{{item.text}}</span>
                </li>
            </ul>

            <div class="activity-area">
                <div class="hd">
                  <label class="title">活动专区</label>
                </div>
                <div class="img-list">
                   <ul>
                     <li v-for='(item,index) in imgList' class="img_li" :class="'img_'+index" @click='pageHref(item.id,item.outLink)'>
                       <img :src="item.picview" alt="" :name='item.name' :onerror="errorImg">
                     </li>
                   </ul>
                </div>
                <div class="join" @click='toJoin'>我想报名</div>
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
                        <p class="tit">报名申请已提交，24小时内将致电确认详情，敬请注意接听电话</p>
                      </div>
                      <div class="warning" v-if='warning.state'>{{warning.msg}}</div>
                      <div class="close" @click='close'><img src="../../assets/img/close.png" alt=""></div>
                    </div>
                    
                </div>
            </div>
            <!-- 会员评论 -->
            <memberEvalution :memberList='comments.recommends' :commentNum='comments.count'></memberEvalution>

            <!-- 线上咨询 -->
            <div class="consultation">
              <div class="hd">
                  <label class="title">线上咨询</label>
              </div>
              <div class="topic clearfix" v-for='item in topicList'>
                  <div class="text clearfix">
                     <div class="head">{{item.name}}</div>
                     <span class="num fl"><i style=""></i>{{item.asktimes}}人提过此类问题</span>
                     <span class="to-ask fr" @click="askDoctor()">我要咨询</span>
                  </div>
                  <div class="img"><img :src='item.picview' alt=""></div>
              </div>
            </div>

            <!-- 健康资讯 -->
            <div class="doctor-forum">
              <div class="hd">
                  <label class="title">健康资讯</label>
              </div>

              <div class="forum-type">
                <ul class="item-wrap">
                  <li v-for='(item,idx) in forumTypeList' class="item" :class="{active: doctorIdx == idx }" @click='doctorForumSelect(idx)'>{{item.channel}}</li>
                </ul>
              </div>
              <doctorForum :topiclist="forumTypeContent" :index='doctorIdx'></doctorForum>
            </div>


            <footerPage></footerPage>
          
        </div>
        <x-dialog class="contactus-dialog" v-model="showContactUs">
            <div class="dialog-body">
                <h3 class="title">拨打电话</h3>
                <span class="telphone">027-88077999</span>
                <a class="btn-telphone" href="tel:027-88077999">立即拨打</a>
            </div>
            <div class="dialog-footer">
                <span class="btn-close" @click="showContactUs=false"></span>
            </div>
        </x-dialog>
    </section>
</template>

<script>
import Evaluation  from '@components/evaluation/Evaluation';
import DoctorForum from '@components/doctorForum/DoctorForum';
import FooterPage from '@components/footerPage/FooterPage';
import MemberEvalution from '@components/memberEvalution/MemberEvalution';
import { XDialog } from 'vux';
import { s_evaluationList,s_getIndexInfo,s_getActivetyInfo,s_getMobileMessage} from '@service/service';
import { changePageTitle,isMobile } from '@common/js/mUtils';
export default {
    mounted() {
        changePageTitle('医院首页');
        this.$nextTick(function(){
            //this.getEvaluationList();
            this.getHomeInfo();
            //this.getActivetyInfo()
        });
    },
    components: {
        Evaluation,
        XDialog,
        DoctorForum,
        FooterPage,
        MemberEvalution
    },
    updated(){
      this.togger();
      this.commentLength();
      if(this.imgList.length<3){
        this.imgList.push(0)
        //this.imgList[1].picview = '...'
      }else{
        return
      }
    },
    data() {
      return {
          banners:[],
          menuList:[{
              icon:'icon_menu_01',
              text:'问医生',
              flag:'askDoctor'
          },{
              icon:'icon_menu_02',
              text:'预约挂号',
              flag:'departmentlist'
          },{
              icon:'icon_menu_04',
              text:'会员服务',
              flag:'memberService'
          },{
              icon:'icon_menu_05',
              text:'来院路线',
              flag:'hospitalWay'
          }],
          imgList:[],
          labelIdx: -1,
          itemIdx: null,
          doctorIdx:0,
          depart_id: '',
          labelList:[],
          typeList:[],
          evaluationFlag: false,
          evaluationList:[],
          showContactUs: false,
          page: 1,
          row: 3,
          joinState:false,
          commentNum:12568,
          isActive:0,
          comments:{},
          topicList:[],
          forumTypeList:[],
          forumTypeContent:[],
          tagname:'',
          name:'',
          mobile:'',
          verifycode:'',
          errorImg: 'this.src="' + require('../../common/images/avatar.png') + '"',
          warning:{
            state:false,
            msg:''
          },
          mobileStatus:false,
          mobileCodeMsg:'获取验证码',
          sublimeStatu:false,
          getCodeTime:60
      }
    },
    methods: {
      pageHref(id,link){
        if(link == ''){
          this.$router.push({
            path:'/newsContent',
            query:{
              id:id
            }
          })
        }else{
           window.location.href = link;
        }
      
      },
      pageHrefBanner(e){
        window.location.href = e;
      
      },
      getHomeInfo(){
        s_getIndexInfo({

        }).then(res =>{
         
          this.banners = res.banners;
          this.imgList = res.activities;
          this.comments = res.comments;
          this.topicList = res.questions;
          this.forumTypeList = res.archives;
          this.typeList = res.activity_tags;
          this.forumTypeContent = res.archives[0].list;

        })
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
        }else if(this.name.length < 2){
          this.warningAlert(true,'请输入一位以上长度姓名');
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
            
              this.warningAlert(false,res);
              setTimeout(function(){
                that.sublimeStatu = true;
              },1000)
          }).catch(res =>{
             this.warningAlert(false,res);
             
          })
          
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
      selectLabel(idx, id){
          if(this.labelIdx == idx){
              this.labelIdx =  -1;
              this.depart_id = '';
          }else{
              this.labelIdx = idx;
              this.depart_id = id;
          }
          this.page = 1;
          this.getEvaluationList();
      },
      getEvaluationList(){
          if(this.depart_id == ''){
              s_evaluationList({
                  is_best: 1,
                  page: this.page,
                  rows: this.row
              }).then(res => {
                  
                  this.labelList = res.tags;
                  this.evaluationList = res;
                  if(res.total > 0){
                      this.evaluationFlag = true;
                  }else{
                      this.evaluationFlag = false;
                  }
              });
          }else{
              s_evaluationList({
                  depart_id: this.depart_id,
                  is_best: 1,
                  page: this.page,
                  rows: this.row
              }).then(res => {
                  this.evaluationList = res;
                  if(res.total > 0){
                      this.evaluationFlag = true;
                  }else{
                      this.evaluationFlag = false;
                  }
              });
          }

      },
      loadEvaluations(data){
          this.page = data.page;
          //this.getEvaluationList();
      },
      headLink(item){
        this.$router.push({
          path:item.link
        })
      },
      addItemEvent(flag){
          if(flag == 'askDoctor'){
              this.$router.push({
                  path:'/askDoctor'
              });
          }else if(flag == 'hospitalMap'){
              this.$router.push({
                  path:'/hospitalMap'
              });
          }else if(flag == 'hospitalWay'){
              this.$router.push({
                  path:'/hospitalWay'
              });
          }else if(flag == 'departmentlist'){
              this.$router.push({
                  path:'/departmentlist'
              });
          }else if(flag == 'department'){
              this.$router.push({
                  path:'/department'
              });
          }else if(flag == 'memberService'){
              this.$router.push({
                  path:'/vipPrivilege',
                  query:{
                    int:1
                  }
              })
          }else if(flag == '1'){
              

          }
      },
      askDoctor(){
        this.$router.push({
          path:'/askDoctor'
        })
      },
      toJoin(){
        this.joinState = true;
        //$('body,html').addClass('on');
        this.sublimeStatu = false;
        
      },
      close(){
        this.joinState = false;
        //$('body,html').removeClass('on');
      },
      doctorForumSelect(idx){
          this.doctorIdx = idx;
          this.forumTypeContent = this.forumTypeList[this.doctorIdx].list
      },

      selectItem(item,idx){
        if(idx == this.itemIdx){
          this.itemIdx = null;
          this.tagname = '';
        }else{
          this.itemIdx = idx;
          this.tagname = item;
        }
        
      },
      commentLength(){
      
        $('.comment-list').owlCarousel({
           items:1.2,
           loop:true,
           margin:20,
           dots:false,
        });
      },
      togger(){
         $('.headTogger').owlCarousel({
           center: true,
           items:1.4,
           loop:true,
           margin:40,
           dots:true,
           lazyLoad: true
          
       });
   
      }
    },
    watch:{
          joinState(statu){
              if(statu == true){
                 $('body,html').addClass('on');
              }else{
                $('body,html').removeClass('on');
              }
          }
    }
}
</script>

<style lang="less">
@import '../../common/styles/mixin';
body.on,html.on{
  overflow:hidden;
}
.hospital-wrapper{
    .header{
        height: auto;
        .headTogger{

          .owl-stage-outer{
            padding:.25rem 0;
            overflow: hidden;
          }
          margin-top:0.25rem;
          .item{
             background: transparent;
             border-radius:.06rem;
             height: 2.5rem;
            
             img{
              display: block;
              width: 100%;
              height: 100%;
              border-radius:.06rem;
              
             }
          }
          .center .item{
             transform: scale(1.2);
          }
          .owl-dots{
            display: block;
            position: absolute;
            bottom:.22rem;
            width:100%;
            text-align:center;
            .owl-dot{
               width: .12rem;
               height: .12rem;
               background: #fff;
               border-radius:100%;
               margin-left:10px;
            }
            .owl-dot.active{
              background: #48cdbc;
              width: .28rem;
              border-radius:10px;
            }
          }
          
        } 
    }
    .searchBox{
        display: none;
        position: relative;
        margin: .2rem auto 0;
        padding-left: .9rem;
        width: 7rem;
        height: .6rem;
        line-height: .6rem;
        border-radius: .3rem;
        background-color: rgba(255, 255, 255,0.4);
        font-size: .28rem;
        color: #fff;
        cursor: pointer;
        .icon-search{
            position: absolute;
            top: .12rem;
            left: .24rem;
            width: .35rem;
            height: .35rem;
            color: #fff;
            font-size: 18px;
            z-index: 99;
        }
    }
    .nav-menu{
        margin-bottom: .4rem;
        height: auto;
        background-color: #fff;
        overflow: hidden;
        .menu-item{
            display: inline-block;
            margin: 0;
            width: 25%;
            text-align: center;
            cursor: pointer;
            .menu-icon{
                display: block;
                margin: .5rem auto .3rem;
                width: .9rem;
                height: .9rem;
                background-size: .9rem .9rem;
                background-position:center;
                overflow: hidden;
            }
            .icon_menu_01{
                .bg-image('icon_menu_01');
            }
            .icon_menu_02{
                .bg-image('icon_menu_02');
            }
            .icon_menu_03{
                .bg-image('icon_menu_03');
            }
            .icon_menu_04{
                .bg-image('icon_menu_04');
            }
            .icon_menu_05{
                .bg-image('icon_menu_05');
            }
            .icon_menu_06{
                .bg-image('icon_menu_06');
            }
            .icon_menu_07{
                .bg-image('icon_menu_07');
            }
            .icon_menu_08{
                .bg-image('icon_menu_08');
            }
            .menu-text{
                font-size: .28rem;
                color: #191919;
            }
        }
    }
    .hd{
         padding: .6rem 0;
         .flex_align_hv;
         overflow: hidden;
         text-align:center;
         border-top:.03rem solid #f2f2f2;
         .title{
            width:100%;
            font-size: .34rem;
            line-height: .36rem;
            font-weight: bold;
         }
    }
    .activity-area{
      padding: 0 .3rem;
      
      .img-list{
        padding-left: 50%;
        position: relative;
        ul{min-height:3.83rem;}
        .img_li{
          display: block;
          background: url('../../assets/img/bg_no_result.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          border-radius:5px;
          overflow:hidden;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .img_0{
          position: absolute;
          left: 0;
          top: 0;
          width: 46%;
          height: 3.8rem;
        }
        .img_1{
          margin-bottom:.2rem;
        }
        .img_1,.img_2{
          width: 100%;
          height: 1.8rem;
        }
      }
      .join{
        width: 1.76rem;
        height: 0.60rem;
        margin:0 auto;
        border-radius:.3rem;
        text-align:center;
        line-height:0.6rem;
        border:.02rem solid #48cdbb;
        color:#48cdbb;
        margin-top: 0.4rem;
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
            
            line-height: .5rem;
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
            height: 8rem;
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
                  font-size:.30rem
                }
              }
            }
            .tit{text-align:center;margin-top:.5rem;color:#b3b3b3;font-size:.2rem;padding-bottom: .3rem;}
          }
          .close{
             width: 0.5rem;
             height: 0.5rem;
             position: absolute;
             right: .3rem;
             margin-left:-0.39rem;
             top:.3rem;
             img{
              display: block;
              width: 100%;
              height: 100%;
             }
          }
        }
        
      }
    }
   
    .consultation{
      margin-top:.25rem;
      min-height:1.92rem;
      .topic:last-child{
        .text{
          border-bottom:none;
        }
      }
      .topic:first-child{
        margin-top: 0;
      }
      .topic{
        padding:0 .3rem;
        min-height:1.03rem;
        margin-top: .25rem;
        .text{
          width: 60%;
          float: left;
          padding-bottom: .40rem;
          border-bottom:.03rem solid #f2f2f2;
          .head{
            font-size:.30rem;
            line-height:.48rem;
            height:.92rem;
            overflow:hidden;
            margin-bottom:.49rem;
          }
          .num{
            color:#898989;
            font-size:.24rem;
            line-height:.24rem;
            padding-left: .4rem;
            position: relative;
            i{
              position: absolute;
              left: 0;
              top: -.07rem;
              display: block;
              width: .25rem;
              height: .3rem;
              background-image:url('../../assets/img/re@2x.png');
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 100% 100%;
            }
          }
          .to-ask{
            color:#48cdbb;
            font-size:.26rem;
            line-height:.26rem;
          }
        }
        .img{
          float: right;
          width: 32%;
          height: 1.6rem;
          border-radius:0.08rem;
          overflow:hidden;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .doctor-forum{
      .forum-type{
        padding-left: .3rem;
        margin-bottom: .65rem;
        .item-wrap{
          display: block;
          width: 100%;
          white-space:nowrap;
          overflow:scroll;
        }
        .item{
          position: relative;
          display: inline-block;
          margin-right: .8rem;
          font-size:.28rem;
          color:#5a5a5a;
          padding-bottom: .19rem;
        }
        .item.active{
          font-size:.30rem;
          color:#333;
          font-weight:bold;
        }
        .item.active:after{
          content:'';
          position: absolute;
          left: 0;
          bottom: 0;
          display: block;
          width: 100%;
          height: .06rem;
          background: #48cdbb;
          border-radius:.03rem;
        }
      }
    }
    .evaluation{
        background-color: #fff;
    }
    .evaluation-hd{
        padding: 0 .3rem;
        height: .99rem;
        .flex_align_hv;
        border-bottom: 1px solid #f5f5f5;
        overflow: hidden;
        .title{
            font-size: .32rem;
            line-height: .99rem;
            font-weight: bold;
        }
        .more{
            display: inline-flex;
            padding-right: .2rem;
            font-size: .26rem;
            color: #999;
            align-items: center;
            cursor: pointer;
            &:after{
                .icon_arrow_right(.16rem);
            }
        }
    }
    .division-list{
        padding: .3rem  .3rem .1rem;
        overflow: hidden;
        .item{
            display: inline-block;
            margin-bottom: .2rem;
            margin-right: .2rem;
            padding:0 .2rem;
            height: .54rem;
            line-height: .54rem;
            font-size: .26rem;
            color: #898989;
            border: 1px solid #d4d4d4;
            border-radius: .4rem;
            cursor: pointer;
            &.active{
                border-color: #66e4cc;
                color: #66e4cc;
            }
        }
    }

}
.contactus-dialog{
    .weui-dialog{
        width: 4.7rem;
        height: 6rem;
        .bg-image('bg_dialog_contactus');
        background-size: 4.7rem  5.26rem;
        background-position: left top;
        background-color: transparent;
    }
    .dialog-body{
        padding-top: 2rem;
        width: 4.7rem;
        height: 5.25rem;
        .title{
            margin-top: .6rem;
            line-height: .38rem;
            font-size: .32rem;
            font-weight: normal;
            text-align: center;
            color: #16c5ab;
        }
        .telphone{
            display: block;
            margin-top: .36rem;
            height: .3rem;
            line-height: .3rem;
            font-size: .32rem;
            text-align: center;
            color: #898989;
        }
        .btn-telphone{
            display: block;
            margin:0 auto;
            margin-top: .6rem;
            width: 2.5rem;
            height: .6rem;
            line-height: .6rem;
            font-size: .32rem;
            font-weight: bold;
            .bg-image('btn_dialog_telphone');
            background-size: 2.5rem  .6rem;
            background-position: center;
            text-align: center;
            color: #fff;
            cursor: pointer;
        }
    }
    .dialog-footer{
        display: flex;
        height: .76rem;
        justify-content: center;
        align-items: bottom;
        .btn-close{
            display: inline-flex;
            margin-top: .2rem;
            width: .5rem;
            height: .5rem;
            .bg-image('btn_dialog_close');
            background-size: .5rem  .5rem;
            background-position: center;
            background-color: transparent;
            cursor: pointer;
        }
    }
}
</style>
