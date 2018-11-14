<template lang="html">
    <div class="comment">
        <div class="hd">
          <label class="title"><span class="commentNum">{{commentNum}}</span>条会员好评</label>
        </div>
        <ul class="comment-list owl-carousel">
          <li class='item' v-for='item in memberList'>
            <div class="img">
              <img :src="item.headimgurl" alt="" :onerror="errorImg">
            </div>
            <div class="text">
              <h2 class="name">{{item.nickname}}</h2>
              <div class="content">{{item.msg}}</div>
            </div>
          </li>
        </ul>
    </div>
</template>
<script>
    export default{
        props:['memberList','commentNum'],
       
        data(){
            return{
              errorImg: 'this.src="' + require('../../common/images/avatar.png') + '"'
            }
        },
        mounted(){
          //this.commentLength();
        },
        updated(){
          this.commentLength();
        },
        methods:{
          commentLength(){
            $('.comment-list').owlCarousel({
              items:1.2,
              loop:true,
              margin:20,
              dots:false
            });
          }
        }
    }
</script>
<style lang='less'>
     .comment{
      min-height:2.35rem;
      margin-top:.4rem;
      .hd{
        padding: .6rem 0;
        overflow: hidden;
        text-align:center;
        border-top:.03rem solid #f2f2f2;
        .title{
          width:100%;
          font-size: .34rem;
          line-height: .36rem;
          font-weight: bold;
        }
        padding-bottom: .4rem;
        text-align:center;
        .commentNum{
          color:#49ccba;
        }
      }
      .comment-list{
        min-height:1.47rem;
        .owl-stage-outer{
          padding:10px 0;
          padding-left:.3rem;
        }
        .item{
          position: relative;
          width: 6.1rem;
          padding-left: 1.8rem;
          padding-top:.40rem;
          padding-bottom:.40rem;
          padding-right: .41rem;
          box-shadow: 0 0 .27rem rgba(0,0,0,0.09);
          border-radius:.06rem;
          .img{
            position: absolute;
            top: .403rem;
            left:.40rem;
            width: 1rem;
            height: 1rem;
            border-radius:100%;
            background-repeat: no-repeat;
            background-position: center center;
            overflow:hidden;
            img{
              width: 100%;
              height: 100%;

            }
          }
          .text{
            .name{
              font-weight:bold;
              font-size:.28rem;
              color:#333;
              line-height:.28rem;
              margin-bottom: .2rem;
            }
            .content{
              line-height:.4rem;
              height:1.2rem;
              overflow:hidden;
              display: -webkit-box;
             -webkit-box-orient: vertical;
             -webkit-line-clamp: 3;
             color:#666;
             font-size:.24rem;
             color:#5a5a5a;
            }
          }

        }
      }
    }
</style>