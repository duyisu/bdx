<template lang="html">
    <div class="doctor-forum-list">
        <div class="topic clearfix" v-for='item in topiclist' @click='doctorForumLink(item.id,item.outLink)'>
          <div class="text">
             <div class="head">{{item.title}}</div>
             <span class="num">{{item.preview}}</span>
          </div>
          <div class="img"><img :src='item.picview' alt=""></div>
       </div>
       <div class="errorInfo" v-if='topiclist.length < 1'>暂无相关资讯</div>
    </div>
</template>
<script>
    export default{
        props:{
            topiclist:{
                type:Array,
                default: []
            },
            index:{
                type:Number,
                default:0
            }
        },
        data(){
            return{
            }
        },
        methods:{
            doctorForumLink(id,link){
              if(link==''){
                this.$router.push({
                  path:'/newsContent',
                  query:{
                    id:id
                  }
                })
              }else{
                 window.location.href = link;
              }
             
              
            }
        }
    }
</script>
<style lang='less'>
    .doctor-forum{padding-bottom: 1.2rem; min-height:3.40rem;}
     .doctor-forum-list{
       min-height:1.08rem;
       .errorInfo{
        text-align:center;
        height:1rem;
        line-height:1rem;
       }
       .topic:last-child .text{
        border-bottom: none;
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
            font-size:.30rem;
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
          border-radius:.08rem;
          overflow:hidden;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
     }
</style>