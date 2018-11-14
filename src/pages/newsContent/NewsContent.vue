<template lang="html">
    <div class="newsContent">
        <div class="img"><img :src="contentData.image" alt=""></div>
        <div class="title">
            <h2>{{contentData.title}}</h2>
            <p class="name">
                北斗星耳鼻喉医院
                <em>{{contentData.tags}}</em>
                <span @click='collect' :class="collect_statu ? 'on' : ''" >
                    <img v-if='collect_statu == 1' src="../../common/images/content/shoucang_on@2x.png" alt="">
                    <img v-if='collect_statu == 0' src="../../common/images/content/shoucang@2x.png" alt="">{{collect_statu_text}}
                </span>
            </p>
            <p class="time">{{contentData.publishTime}}</p>
        </div>
        <div class="content">
             <div class="text" v-html='contentData.body'></div>
             <div class="share" @click='invite_share_tip = true'><img src="../../common/images/content/share@2x.png" alt="">分享</div>
        </div>
        <div class="boutPage">
            <h2>相关文章</h2>
            <div class="doctor-forum-list">
                <div class="topic clearfix" v-for='item in contentData.recommends' @click='doctorForumLink(item.id)'>
                  <div class="text">
                     <div class="head">{{item.title}}</div>
                     <span class="num">{{item.preview}}</span>
                  </div>
                  <div class="img"><img :src='item.picview' alt=""></div>
               </div>
               <div class="errorInfo" v-if='recomLen < 1'>暂无相关资讯</div>
            </div>
            
        </div>
        <toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
        <div class="invite_share_tip" v-if='invite_share_tip'>
            <img class="img1" src="../../common/images/invite/know.png" alt="" @click='invite_share_tip = false'>
            <img class="img3" src="../../common/images/invite/share_row.png" alt="">
            <img class="img2" src="../../common/images/invite/share_text.png" alt="">
        </div>
    </div>
</template>
<script>
    import DoctorForum from '@components/doctorForum/DoctorForum';
    import { s_getIndexInfo,s_getContentData} from '@service/service';
    import { changePageTitle,setCookie } from '@common/js/mUtils';
    import {getConfig} from '@common/js/wechat';
    import http from '@common/js/http.js';
    import { Toast } from 'vux';
    import {baseUrl} from '@common/js/config';
    import wxshare from '@common/js/wxapi';
    export default{
        beforeRouteEnter(to,from,next){
            next((vm)=>{
                vm.id = to.query.id;
                setCookie('beforeLoginUrl',to.fullPath)
            });
        },
        mounted(){
            changePageTitle('')
            this.getContentData(this.$route.query.id);
            let params = {
                title: '我的分享', 
                desc: '', 
                link: baseUrl+'m/#/newsContent?id='+this.$route.query.id,
                img: 'http://bdx.bdxdoctor.com/m/static/img/logo.png',
            }
            wxshare.share(params);
            this.id = this.$route.query.id;
        },
        data(){
            return{
                forumTypeContent:[],
                doctorIdx:48,
                collect_statu:'',
                id:'',
                contentData:[],
                recomLen:0,
                collect_statu_text:'',
                showToast:false,
                position:'middle',  
                msg:'',
                invite_share_tip:false
            }
        },
        components:{
            DoctorForum
        },
        methods:{
            
            collect(){

                http.fetch('api/cms/like',{
                    id:this.id
                }).then((res)=>{
                    this.showToast = true;
                    if(this.collect_statu == 1){
                        this.msg = '取消收藏成功'
                    }else{
                        this.msg = '收藏成功'
                    }
                    
                    this.getContentData(this.$route.query.id)
                })

            },
            getContentData(id){
               
                this.$http.get('api/cms/archive_detail',{params:{id:id}}).then(res => {
                    this.contentData = res.detail;
                   
                    this.recomLen = this.contentData.recommends.length;
                    if(res.detail.hasLike == 1){
                        this.collect_statu = 1;
                        this.collect_statu_text = '取消收藏'
                    }else if(res.detail.hasLike == 0){
                        this.collect_statu = 0;
                        this.collect_statu_text = '收藏'
                    }
                    
                })
            },
            share(){
                
            }

        }
    }
</script>
<style lang='less'>
    .newsContent{
        .invite_share_tip{
            position: fixed;
            top:0;
            left:0;
            display: block;
            width: 100%;
            height: 100%;
            background:rgba(0,0,0,.7);
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
        background: #f2f2f2;
        .img{
            width: 100%;
            height: auto;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
            background: #eaeaea;
        }
        .title{
            background: #fff;
            padding:0 .3rem;
            h2{
                font-size:.4rem;
                color:#333;
                line-height:1.5;
                padding-top: .4rem;
            }
            p.name{
                position: relative;
                font-size:.26rem;
                color:#5a5a5a;
                line-height:.7rem;
                text-align:left;
                margin-top: .18rem;
                em{
                    display: inline-block;
                    line-height:.42rem;
                    padding:0 .18rem;
                    background: #f2f2f2;
                    font-size:.24rem;
                    color:#898989;
                    margin-left: .3rem;
                }
                span{
                    position: absolute;
                    top: 0;
                    right: .3rem;
                    display: block;
                    padding:0 .08rem;
                    height: .6rem;
                    line-height:.6rem;
                    text-align:center;
                    border:.01rem solid #d4d4d4;
                    border-radius:.35rem;
                    img{
                        display: inline-block;
                        width: .3rem;
                        height: .26rem;
                        margin-right: .18rem;
                        vertical-align:middle;
                        margin-bottom: .02rem;
                    }
                }
                span.on{
                    color:#fd7a86;
                    border-color:#fd7a86;
                }
            }
            p.time{
                color:#b3b3b3;
                font-size:.26rem;
                text-align:left;
            }
        }
        .content{
            background: #fff;
            padding:0 .3rem;
            padding-top: 1rem;
            padding-bottom: .5rem;
            line-height:.65rem;
            font-size:.32rem;
            color:#5a5a5a;
            .text{
                min-height:5rem;
                p{
                    margin-bottom: .5rem;
                    line-height:.65rem;
                    color:#5a5a5a;
                    font-size:.32rem;
                }
            }

            .share{
                width: 100%;
                color:#5a5a5a;
                font-size:.28rem;
                height: .69rem;
                line-height:.69rem;
                text-align:center;
                border:.01rem solid #d4d4d4;
                border-radius:.35rem;
                margin-top: .6rem;
                img{
                    display: inline-block;
                    height: .27rem;
                    vertical-align:middle;
                    margin-right: .18rem;
                    margin-bottom: .02rem;
                }
            }
        }
        .boutPage{
            margin-top: .2rem;
            background: #fff;
            padding-top: .45rem;
            h2{
                font-size:.36rem;
                color:#333;
                margin-bottom: .6rem;
                padding:0 0.3rem;
            }
        }
    }
    .doctor-forum{padding-bottom: 1.2rem; min-height:3.40rem;}
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
</style>