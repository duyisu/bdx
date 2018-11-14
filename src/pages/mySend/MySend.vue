<template lang="html">
    <div class="mySend">
        <div class="top_hd">
            <div><span :class='{active : hd === false}' @click='hdTog_1'>被赠</span><span :class='{active : hd === true}' @click='hdTog_2'>送出</span></div>
        </div>
        <div class="hd">
            <ul>
                <li v-for='(item,index) in hdList' :class='{active : index === hdIdx}' @click='hdClick(index)'>{{item.text}}</li>
            </ul>
        </div>
        <div class="bd">
            <ul class="beizeng" v-if='hd === false'>
                <!-- 未使用 -->
                <li v-if='hdIdx === 0' v-for='item in inboxCanuse.list'>
                    <div class="img">
                        <img :src="item.image" alt="">
                        <span class="li_log">{{item.fromScene}}</span>
                        <p class="card_info"><span>{{item.code}}</span><span>有效期至：{{item.endDate}}</span></p>
                    </div>
                    <div class="content">
                        <div class="text" v-html='item.description'></div>
                        <div class="btn">
                            <span @click='use(item.id)'>立即使用</span>
                            <span v-if='item.canGive == 1' @click='sendtofriend(item)'><img src="../../common/images/send/send@2x.png" alt="">送给好友</span>
                        </div> 
                    </div>
                </li>
                <!-- 已使用 -->
                <li v-if='hdIdx === 1' v-for='item in inboxUsed.list'>
                    <div class="img">
                        <img :src="item.image" alt="">
                        <span class="li_log">{{item.fromScene}}</span>
                        <p class="card_info"><span>{{item.code}}</span><span>有效期至：{{item.endDate}}</span></p>
                    </div>
                    <div class="content">
                        <div class="text" v-html='item.description'></div>
                        <div class="use_info"> 
                            <p><em>发卡时间：</em><span>{{item.startDate}}</span></p>
                            <p><em>使用时间：</em><span>{{item.useTime}}</span></p>
                            <p><em>使用人：</em><span>{{item.useName}}</span></p>
                            <p><em>手机号：</em><span>{{item.useMobile}}</span></p>
                        </div>
                    </div>
                    <div class="send_tip"><img src="../../common/images/send/shiyong.png" alt=""></div>
                </li>
                <!-- 已过期 -->
                <li v-if='hdIdx === 2' v-for='item in inboxExpired.list'>
                    <div class="img">
                        <img :src="item.image" alt="">
                        <span class="li_log">{{item.fromScene}}</span>
                        <p class="card_info"><span>{{item.code}}</span><span>有效期至：{{item.endDate}}</span></p>
                    </div>
                    
                    <div class="content">
                        <div class="text" v-html='item.description'></div>
                        <div class="use_info"> 
                            <p><em>领取时间：</em><span>{{item.getTime}}</span></p>
                            <p><em>领取人：</em><span>{{item.getName}}</span></p>
                            <p><em>手机号：</em><span>{{item.getMobile}}</span></p>
                        </div>
                    </div>
                    <div class="send_tip"><img src="../../common/images/send/guoqi.png" alt=""></div>
                    
                </li>
            </ul>
            <div class="alert_use" v-if='alertStatu'>
                <div class="box">
                    <p><span>工号</span><input ref='gonghao' type="text" placeholder="请输入核销客服工号"></p>
                    <p><span>使用码</span><input type="text" ref='code' placeholder="请输入核销使用码"></p>
                    <p><span>使用人</span><input type="text" ref='name' placeholder="请输入使用人姓名"></p>
                    <p><span>手机号</span><input type="text" ref='mobile' placeholder="请输入使用手机号"></p>
                    <div class="btn" @click='useBtn()'>确定使用</div>
                    <div class="close" @click='alertStatu = false'><img src="../../common/images/send/close.png" alt=""></div>
                </div>
            </div>
            <ul class="songchu" v-if='hd === true'>
                <li v-if='hdIdx === 0' v-for='item in givoutCanuse.list'>
                    <div class="img">
                        <img :src="item.image" alt="">
                        <span class="li_log">{{item.fromScene}}</span>
                        <p class="card_info"><span>{{item.code}}</span><span>有效期至：{{item.endDate}}</span></p>
                    </div>
                    <div class="content">
                        <div class="text" v-html='item.description'></div>
                        <div class="use_info"> 
                            <p><em>领取时间：</em><span>{{item.getTime}}</span></p>
                            <p><em>领取人：</em><span>{{item.getName}}</span></p>
                            <p><em>手机号：</em><span>{{item.getMobile}}</span></p>
                        </div>
                    </div>
                </li>
                <li v-if='hdIdx === 1' v-for='item in givoutUsed.list'>
                    <div class="img">
                        <img :src="item.image" alt="">
                        <span class="li_log">{{item.fromScene}}</span>
                        <p class="card_info"><span>{{item.code}}</span><span>有效期至：{{item.endDate}}</span></p>
                    </div>
                    <div class="content">
                        <div class="text" v-html='item.description'></div>
                        <div class="use_info"> 
                            <p><em>发卡时间：</em><span>{{item.startDate}}</span></p>
                            <p><em>使用时间：</em><span>{{item.useTime}}</span></p>
                            <p><em>使用人：</em><span>{{item.useName}}</span></p>
                            <p><em>手机号：</em><span>{{item.useMobile}}</span></p>
                        </div>
                        
                    </div>
                    <div class="send_tip"><img src="../../common/images/send/shiyong.png" alt=""></div>
                </li>
                <li v-if='hdIdx === 2' v-for='item in givoutExpired.list'>
                    <div class="img">
                        <img :src="item.image" alt="">
                        <span class="li_log">{{item.fromScene}}</span>
                        <p class="card_info"><span>{{item.code}}</span><span>有效期至：{{item.endDate}}</span></p>
                    </div>
                    <div class="content">
                        <div class="text" v-html='item.description'></div>
                        <div class="use_info"> 
                            <p><em>领取时间：</em><span>{{item.getTime}}</span></p>
                            <p><em>领取人：</em><span>{{item.getName}}</span></p>
                            <p><em>手机号：</em><span>{{item.getMobile}}</span></p>
                        </div>
                    </div>
                    <div class="send_tip"><img src="../../common/images/send/guoqi.png" alt=""></div>
                </li>
            </ul>
            <div class="norecord abs-center" v-if='infoStatu'>
                <img src="../../common/images/noInfo/gift.png" alt="" style="width:4rem;">
                <p style="text-align:center;margin-top:.35rem;font-size:.36rem;color:#898989;">暂无礼券</p>
        </div>
        </div>
        <toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
        <div class="bootPage" v-if='bootPage'>
            <img class="img1" src="../../common/images/invite/know.png" alt="" @click='bootPage = false'>
            <img class="img3" src="../../common/images/invite/share_row.png" alt="">
            <img class="img2" src="../../common/images/invite/share_text.png" alt="">
        </div>
    </div>
</template>
<script>
    import http from '@common/js/http.js';
    import {} from '@service/service';
    import { changePageTitle,isMobile,setStore, getStore, } from '@common/js/mUtils';
    import { Toast } from 'vux';
    import { baseUrl,host } from '@common/js/config';
    import wxShare from '@common/js/wxapi';
    export default{
        mounted(){
            changePageTitle('我的赠送')
            http.fetch('api/coupon/my').then((res)=>{
                
                //送出
                this.giveout = res.giveout;
                this.givoutCanuse = res.giveout.canuse;
                this.givoutUsed = res.giveout.used;
                this.givoutExpired = res.giveout.expired;
                //被增
                this.inbox = res.inbox;
                this.inboxCanuse = res.inbox.canuse;
                this.inboxUsed = res.inbox.used;
                this.inboxExpired = res.inbox.expired;

                this.hdList[0].text = '未使用('+ res.inbox.canuse.count + ')';
                this.hdList[1].text = '已使用('+ res.inbox.used.count + ')';
                this.hdList[2].text = '已过期('+ res.inbox.expired.count + ')';

                if(res.inbox.canuse.list.length == 0){
                    if(this.hdIdx == 0){
                        this.infoStatu = true;
                    }else{
                        this.infoStatu = false;
                    }
                }
                    
                
            }).catch((arr)=>{ 

            })
        },
        data(){
            return{
                hd:false,
                hdList:[
                    {
                        text:'未使用'
                    },{
                        text:'已使用'
                    },{
                        text:'已过期'
                    },
                ],
                hdIdx:0,
                alertStatu:false,
                bootPage:false,
                inboxCanuse:{},
                inboxUsed:{},
                inboxExpired:{},
                givoutCanuse:{},
                givoutUsed:{},
                givoutExpired:{},
                showToast: false,
                position: 'middle', //top,middle,bottom
                msg: '提示信息',
                id:'',
                infoStatu:false

            }
        },
        methods:{
            sendtofriend(item){
                this.item = item.code;
                
                this.bootPage = true;
               
                let params = {
                    title: '我给你送了一张'+item.title+'，免费体验，快来领取！', 
                    desc: '', 
                    link: baseUrl+'m/#/mysendRecive?id='+item.code,
                    img: item.image,
                }
                
                wxShare.share(params);
            },
            hdTog_1(){
                if(this.inbox.canuse.list.length == 0){
                    this.infoStatu = true;
                }else{
                    this.infoStatu = false;
                }
                if(this.hd === false){
                    return false
                }else{
                    this.hd = !this.hd
                }
                this.hdList[0].text = '未使用('+ this.inboxCanuse.count + ')';
                this.hdList[1].text = '已使用('+ this.inboxUsed.count + ')';
                this.hdList[2].text = '已过期('+ this.inboxExpired.count + ')';
            },
            hdTog_2(){
                if(this.giveout.canuse.list.length == 0){
                    this.infoStatu = true;
                }else{
                    this.infoStatu = false;
                }
                if(this.hd === true){
                    return false
                }else{
                    this.hd = !this.hd
                }
                this.hdList[0].text = '未使用('+ this.givoutCanuse.count + ')';
                this.hdList[1].text = '已使用('+ this.givoutUsed.count + ')';
                this.hdList[2].text = '已过期('+ this.givoutExpired.count + ')';
            },
            hdClick(index){
                this.hdIdx = index;
                
                if(this.hd == false){
                    if(index == 0){
                        if(this.inboxCanuse.list.length == 0){
                            this.infoStatu = true;
                        }else{
                            this.infoStatu = false;
                        }
                    }
                    if(index == 1){
                        if(this.inboxUsed.list.length == 0){
                            this.infoStatu = true;
                        }else{
                            this.infoStatu = false;
                        }
                    }
                    if(index == 2){
                        if(this.inboxExpired.list.length == 0){
                            this.infoStatu = true;
                        }else{
                            this.infoStatu = false;
                        }
                    }
                   
                }
                if(this.hd == true){
                    if(index == 0){
                        if(this.givoutCanuse.list.length == 0){
                            this.infoStatu = true;
                        }else{
                            this.infoStatu = false;
                        }
                    }
                    if(index == 1){
                        if(this.givoutUsed.list.length == 0){
                            this.infoStatu = true;
                        }else{
                            this.infoStatu = false;
                        }
                    }
                    if(index == 2){
                        if(this.givoutExpired.list.length == 0){
                            this.infoStatu = true;
                        }else{
                            this.infoStatu = false;
                        }
                    }
                }
                
            },
            use(code){
                this.alertStatu = true;
                this.id = code;
            },
            
            sendItemContent(){
                this.$router.push({path:'/sendItemContent'})
            },
            useBtn(){
              
                var that = this;

                if(this.$refs.gonghao.value == ''){
                    this.showToast = true;
                    this.msg='请输入工号'
                    return false
                }else if(this.$refs.code.value == ''){
                    this.showToast = true;
                    this.msg='请输入使用码'
                    return false
                }else if(this.$refs.name.value == ''){
                    this.showToast = true;
                    this.msg='请输入使用人姓名'
                    return false
                }else if(!isMobile(this.$refs.mobile.value)){
                    this.showToast = true;
                    this.msg='请输入正确的手机号'
                   return false
                }else{
                    http.fetch('api/coupon/consume',{
                        id:that.id,//卡券记录id
                        checkerno:this.$refs.gonghao.value,//员工号
                        password:this.$refs.code.value,//使用码
                        user_name:this.$refs.name.value,
                        user_mobile:this.$refs.mobile.value
                    }).then((res)=>{
                        this.showToast = true;
                        this.msg = res
                        this.alertStatu = false;
                    }).catch((arr)=>{
                        this.showToast = true;
                        this.msg = arr
                    })
                }
            }
        },
        watch:{
        }
    }
</script>
<style lang='less'>
    .mySend{

        display: block;
        width: 100%;
        overflow:hidden;
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
        .top_hd{
            height: 1.2rem;
            line-height:1.2rem;
            box-shadow: .02rem 0 .307rem .013rem rgba(207, 207, 207, 0.33);
            padding-top: .23rem;
            div{
                border:.03rem solid #48cdbb;
                border-radius:.1rem;
                height: .7rem;
                width: 3.19rem;
                margin:0 auto;
                line-height:.7rem;
                span{
                    display: inline-block;
                    width: 50%;
                    text-align:center;
                    font-size:.32rem;
                    color:#48cdbb;
                    height: 101%;
                }
                span.active{
                    background: #48cdbb;
                    color:#fff;
                }
            }
            
        }
        .hd{
            text-align:center;
            margin-top: .48rem;
            li{
                position: relative;
                display: inline-block;
                margin-left: .78rem;
                font-size:.32rem;
                color:#5a5a5a;
                padding-bottom: .2rem;
            }
            li:first-child{
                margin-left: 0;
            }
            li.active{
                font-weight:bold;
                color:#333;
            }
            li.active:after{
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
        .bd{
            padding: 0 .3rem;
            margin-top: .1rem;
            li{
                position: relative;
                margin-top:.3rem;
                border-radius:0.08rem;
                .img{
                    position: relative;
                    display: block;
                    img{
                        display: block;
                        width: 100%;
                    }
                    .li_log{
                        position: absolute;
                        right: .09rem;
                        top: .28rem;
                        line-height:.45rem;
                        padding:0 .2rem;
                        font-size:.22rem;
                        color:#fff;
                        opacity:0.8;
                        background: rgba(0,0,0,.4);
                        border-radius:.1rem;
                    }
                    p.card_info{
                        position: absolute;
                        color:#fff;
                        font-size:.22rem;
                        left:.39rem;
                        bottom:.2rem;
                        text-align:left;
                        letter-spacing: .011rem;
                        span{
                            margin-right: .28rem;
                        }
                    }
                }
                .content{
                    box-shadow: 0 0 .57rem 0 rgba(0, 0, 0, 0.18);
                    padding:.4rem .3rem;
                    border-bottom-right-radius:0.1rem;
                    border-bottom-left-radius:0.1rem;
                    min-height:3rem;
                    p{
                        font-size:.24rem;
                        color:rgba(90,90,90,.8);
                        line-height:.4rem;
                        letter-spacing:.014rem;
                        margin-bottom: .08rem;
                    }
                    p.tel,p.adr{
                        color:#898989;
                    }
                    p.tel{
                        margin-top: .3rem;
                    }
                    .btn{
                        margin-top: .35rem;
                        text-align:right;
                        span{
                            display: inline-block;
                            padding:0 .2rem;
                            line-height:.6rem;
                            border:.01rem solid #48cdbb;
                            color:#48cdbb;
                            font-size:.28rem;
                            border-radius:.3rem;
                            margin-left: .3rem;
                            img{
                                margin-right: .16rem;
                                display: inline-block;
                                width: .27rem;
                                margin-bottom: .03rem;
                                vertical-align:middle;
                            }
                        }
                    }
                }
                .send_tip{
                    position: absolute;
                    right: .44rem;
                    bottom: .5rem;
                    z-index: 999;
                    img{
                        display: block;
                        width: 1.86rem;
                    }
                }
                .use_info{
                    margin-top: .3rem;
                    p{
                        font-size:.24rem;
                        color:#5a5a5a;
                        em{
                            display: inline-block;
                            width: 1.6rem;
                            text-align:justify;
                            height: .4rem;
                            line-height:.4rem;
                            vertical-align:middle;
                            margin-right: .1rem;
                        }
                        em:after{
                            content: " ";
                            display: inline-block;
                            width: 100%;
                        }
                        span{
                            color:#48cdbb;
                        }
                    }
                }
            }
            .alert_use{
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: rgba(0,0,0,.5);
                .box{
                    position: absolute;
                    top: 1.5rem;
                    left: 50%;
                    margin-left: -2.95rem;
                    background: #fff;
                    width: 5.9rem;
                    padding:.75rem .42rem;
                    padding-top: .75rem;
                    padding-bottom: .49rem;
                    border-radius:.12rem;
                    p{
                        margin-bottom: .2rem;
                        span{
                            display: inline-block;
                            width: .86rem;
                            margin-right: .28rem;
                            vertical-align:middle;
                            font-size:.28rem;
                            color:#898989;
                            text-align:justify;
                            height: .64rem;
                            line-height: .68rem;
                        }
                        span:after {
                            content: " ";
                            display: inline-block;
                            width: 100%;
                        }
                        input{
                            display: inline-block;
                            width: 3.6rem;
                            border:none;
                            border-bottom:.01rem solid #f2f2f2;
                            height:.64rem;
                            vertical-align:middle;
                        }
                    }
                    .btn{
                        width: 2.57rem;
                        height: .7rem;
                        line-height:.7rem;
                        border-radius: .345rem;
                        background-color: #40cbb7;
                        text-align:center;
                        color:#fff;
                        font-size:.32rem;
                        margin:0 auto;
                        margin-top: .5rem;
                    }
                    .close{
                        position: absolute;
                        left: 50%;
                        margin-left: -.4rem;
                        bottom: -1.2rem;
                        img{
                            display: block;
                            width: .8rem;
                        }
                        
                    }
                }
                
            }
        }
    }
</style>