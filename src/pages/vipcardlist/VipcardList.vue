<template lang="html">
    <div class="vipcardList">
        <div class="hd">
            <ul>
                <li v-for='(item,index) in hd' :class='{active : index == idx}' @click='tabClick(index)'>{{item.txt}}</li>
            </ul>
        </div>
        <div class="bd">
            <ul v-if='idx == 0'>
                <li v-for='(item,index) in vipCardList' v-if='item.type == 8'>
                    <div class="img" @click='linkTo(index,item.card_type)'>
                        <img src="../../common/images/opencard/personal_card@2x.png" alt="">
                        <p class="time">
                            <span>{{item.card_expire_date}} 到期</span>
                            <span @click.stop='vipcardRecharge(item.card_number,item.type)' >立即续费<em>></em></span>
                        </p>
                        <div class="info">
                            <p>{{item.realname}}</p>
                            <p>NO.{{item.card_number}}</p>
                        </div>
                    </div>
                </li>
                <li v-for='(item,index) in vipCardList' v-if='item.type == 9 && item.card_type == 2'>
                    <div class="img" @click='linkTo(index,item.card_type)'>
                        <img src="../../common/images/opencard/family_card@2x.png" alt="">
                        <p class="time">
                            <span>{{item.card_expire_date}} 到期</span>
                            <span @click.stop='vipcardRecharge(item.card_number,item.type)' >立即续费<em>></em></span>
                        </p>
                        <div class="info">
                            <p>{{item.realname}}</p>
                            <p>NO.{{item.card_number}}</p>
                        </div>
                    </div>
                </li>
                <li v-for='(item,index) in vipCardList' v-if='item.type == 9 && item.card_type==3'>
                    <p class="title" v-if='openStatu'>#我为{{item.realname}}开通了北斗星儿童医院家庭会籍副卡</p>
                    <p class="title" v-if='!openStatu'>#{{item.mainCard.name}}为我开通了北斗星儿童医院家庭会籍副卡</p>
                    <div class="img" @click='linkTo(index,item.card_type)'>
                        <img src="../../common/images/opencard/family_card2.png" alt="">
                        <p class="time">
                            <span>{{item.card_expire_date}} 到期</span>
                            <!-- <span @click.stop='vipcardRecharge(item.card_number,item.type)' >立即续费<em>></em></span> -->
                        </p>
                        <div class="info">
                            <p>{{item.realname}}</p>
                            <p>NO.{{item.card_number}}</p>
                        </div>
                    </div>
                    <div class="btn btn2" v-if='!item.member_id_sub && item.card_type==3' @click='tellHim(item)'><img src="../../common/images/send/send@2x.png" alt="">告诉他</div>
                    <!-- <div class="btn" v-if='item.member_id_sub'>领取成功</div> -->
                </li>
            </ul>
            <div class="memberLegal" v-if='idx == 1'> 
                <img  v-if='type == 8' src="../../common/images/opencard/personallegal.jpg" alt="" >
                <img v-if='type == 9' src="../../common/images/opencard/familylegal.jpg" alt="">
            </div>
        </div>
        <div style="width:100%;height:1.4rem;opacity:0"></div>
        <div class="openbtn" @click='add_sub_card' v-if='openStatu && idx == 0'>开通家庭会籍副卡<span>(最多三张)</span></div>
        <toast v-model="showToast" type="text" :time="1000" :position="position">{{ msg }}</toast>
        <div class="bootPage" v-if='bootPage'>
            <img class="img1" src="../../common/images/invite/know.png" alt="" @click='bootPage = false'>
            <img class="img3" src="../../common/images/invite/share_row.png" alt="">
            <img class="img2" src="../../common/images/invite/share_text.png" alt="">
        </div>
    </div>
</template>
<script>
    import http from '@common/js/http.js';
    import { Toast } from 'vux';
    import { changePageTitle,getStore,setStore } from '@common/js/mUtils';
    import { baseUrl,host } from '@common/js/config';
    import wxShare from '@common/js/wxapi';

    export default{
        mounted(){
            changePageTitle('北斗星会员')
            
            this.getVipCards().then((res)=>{
                this.vipCardList = res;
                this.isMainCard();
                this.type = this.$route.query.type;
            }).catch((err)=>{
                
            })

            
            if(this.$route.query.patient_id){
                this.patient_id  = this.$route.query.patient_id;
                this.name = this.$route.query.name;
            }
           

           
        },
        data(){
            return{
                idx:0,
                hd:[
                    {
                        txt:'会员卡'
                    },{
                        txt:'会员权益'
                    }
                ],
                vipCardList:[],
                type:'',
                showToast:false,
                msg:'',
                position:'middle',
                patient_id:'',
                openStatu:false,
                mainCardName:'',
                bootPage:false,
            }
        },
        methods:{
            tellHim(item){
                //this.item = item;
                this.bootPage = true;

                let mainCardName = item.mainCard.name;
                let id = item.id;

                let params = {

                    title: mainCardName+'为您开通了家庭会员副卡，确认领取', 
                    desc: '', 
                    link: baseUrl+'m/#/reciveCard?id='+id+'&mainCardName='+encodeURIComponent(mainCardName),
                    img: 'http://bdx.bdxdoctor.com/m/static/img/logo.png',
                }
                wxShare.share(params);
                // let url = window.location.href;
                // http.fetch('api/home/getSignature',{
                //     url:url
                // }).then((res)=>{
                       
                //    let info = res.cfg;
                //     wx.config({
                //         debug: false, 
                //         appId: info.appId, // 公众号的唯一标识
                //         timestamp: info.timestamp, // 生成签名的时间戳
                //         nonceStr: info.nonceStr, //生成签名的随机串
                //         signature: info.signature,// 签名
                //         jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareWeibo']
                //     });
                //     wx.ready(function() { //通过ready接口处理成功验证
                //         wx.onMenuShareAppMessage({ // 分享给朋友  
                //             title: params.title, 
                //             desc: params.desc, 
                //             link: params.link,
                //             imgUrl: params.img,
                //             type: '', 
                //             dataUrl: '', 
                //             success: function(res) {
                //             },
                //             cancel: function() {
                            
                //             }
                //         });
                //         wx.onMenuShareTimeline({// 分享到朋友圈
                //             title: params.title, 
                //             link: params.link,
                //             imgUrl: params.img,
                //             desc: params.desc,
                //             type: '', 
                //             dataUrl: '', 
                //             success: function(res) {
                                
                //             },
                //             cancel: function() {
                            
                //             }
                //         });
                //         wx.onMenuShareWeibo({
                //             title: params.title, 
                //             link: params.link,
                //             imgUrl: params.img,
                //             desc: params.desc,
                //             type: '', 
                //             dataUrl: '', 
                //             success: function(res) {
                                
                //             },
                //             cancel: function() {
                            
                //             }
                //         })
                     
                //     });
                //     wx.error(function(res){
                       
                //     });
                // })
            },
            isMainCard(){
                var that = this;
                for(let i=0;i<that.vipCardList.length;i++){
                    
                    if(that.vipCardList[i].card_type == 2){
                        that.openStatu = true;
                        that.mainCardName = that.vipCardList[i].realname;
                    }
                }

                
            },
            tabClick(index){
                this.idx = index
            },
            vipcardRecharge(card_number,type){
                var that = this;
               
                http.fetch('api/user/card_renew').then((res)=>{
                    if(res){
                        
                        let url = `${host}#/personalcenter`;
                        let href = encodeURIComponent(url);
                        let access_token = getStore('access_token') || getUrlParam('access_token');
                        window.location.href = `${baseUrl}pay/wxpay/index.html?redirect_uri=${href}&order_type=renew&order_id=`+res.order_id+`&access_token=${access_token}`;
                    }
                }).catch((arr)=>{

                })
                
            },
            linkTo(index,card_type){
                this.$router.push({
                    path:'/vipcardContent',
                    query:{
                        id:this.vipCardList[index].id,
                        card_type:card_type,
                        type:this.type
                    }
                })
            },
            getVipCards(){
                return http.fetch('/api/user/card_list');
            },
            add_sub_card(){
                var that = this;
                
                this.$router.push({
                    path:'/patientslist',
                    query:{
                        add_sub_card:1
                    }
                })
                    
                
            }
        }
    }
</script>
<style lang='less'>
    .vipcardList{
        .bootPage{
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
                top: 5rem;
            }
            .img2{
                width: 3rem;
                left:50%;
                margin-left: -1.5rem;
                top:2rem;
            }
            .img3{
                width: 2rem;
                top: 0;
                right: .4rem;
            }
        }
        height: 100%;
        background: #fff;
        .hd{
            width: 100%;
            height: 1.2rem;
            line-height:1.2rem;
            background: #fff;
            z-index: 999;

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
                    bottom: .23rem;
                    left: 50%;
                    margin-left: -.24rem;
                    width: .48rem;
                    height: .07rem;
                    border-radius: .03rem;
                    background-color: #48cdbb;
                }
            }
        
        }
        .bd{
            margin-bottom:1.6rem;
            .memberLegal{
                width: 100%;
                margin-top: .68rem;
                img{
                    display: block;
                    width: 100%;
                    height: auto;
                }
            }
            li{
                position: relative;
                display: block;
                width: 6.24rem;
                margin:0 auto;
                margin-bottom: 1rem;
                .btn{
                    width: 1.56rem;
                    height: .6rem;
                    border-radius: .3rem;
                    border: solid .01rem #48cdbb;
                    background-color: #fff;
                    font-size:.28rem;
                    color:#48cdbb;
                    text-align:center;
                    line-height:.6rem;
                    margin:0 auto;
                    margin-top: .3rem;
                    img{
                        display: inline-block;
                        width: .27rem;
                        margin-right: .16rem;
                    }
                }
                .btn2{
                    width: 1.85rem;
                        position: absolute;
                        left: 50%;
                        margin-left: -0.925rem;
                }
                .img{
                    position: relative;
                    height: 3.97rem;
                    overflow:hidden;
                    border-radius:.18rem;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                    p.time{
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: 999;
                        width: 100%;
                        height: .75rem;
                        line-height:.75rem;
                        font-size:.24rem;
                        color:#fff;
                        background: rgba(0,0,0,.3);
                        padding:0 .3rem;
                        text-align:right;
                        span{
                            margin-left: .16rem;
                            em{
                                font-size:.26rem;
                                font-weight:bold;
                                margin-left: .15rem;
                            }
                        }
                    }
                    .info{
                        position: absolute;
                        right: 0;
                        bottom: .2rem;
                        p{
                            color:#fff;
                            font-size:.26rem;
                            text-align:right;
                            padding: 0 .43rem;
                            margin-bottom: .1rem;
                        }
                    }
                }
                p.title{
                    color:#333333;
                    font-size:.26rem;
                    text-align:center;
                    margin-bottom: .3rem;
                }
                
            }
        }
        .openbtn{
            position: fixed;
            left: 50%;
            margin-left: -3.35rem;
            bottom: .6rem;
            letter-spacing:.032rem;
            font-size:.32rem;
            color:#fff;
            width: 6.7rem;
            height: .8rem;
            line-height:.8rem;
            text-align:center;
            border-radius: .4rem;
            background-color: #48cdbb;
            span{
                font-size:.22rem;
            }
        }
    }
</style>