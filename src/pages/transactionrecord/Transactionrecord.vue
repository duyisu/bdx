<template lang='html'>
    <div class="Transactionrecord">
        <div class="hd">
            <ul>
                <li v-for='(item,index) in hd' :class='{active : index == idx}' @click='tabClick(index)'>{{item.txt}}</li>
            </ul>
        </div>
        <div class="bd">
            <div class="page_1" v-if='idx == 0'>
                <div class="balance">
                    <span class="title">账户余额</span>
                    <span class="con">¥ <i v-if='!cardBalance.balance'>0</i>{{cardBalance.balance}}</span>
                </div>
                <ul>
                    <li v-for='item in buyrechargelist'>
                        <p>{{item.desc}}</p>
                        <p>{{item.交易时间}}</p>
                        <span class="chong" :class='item.金额 < 0 ? "red" : ""'><em v-if='item.金额 > 0'>+</em>{{item.金额}}</span>
                    </li>
                </ul>
            </div>
            <div class="page_2" v-if='idx == 1'>
                <div class="select_date" @click='selectDate'>
                    <img src="../../common/images/personalcenter/rechargeIcon.png" >
                    <i>{{ val }}</i>
                </div>
                <div class="balance">
                    <span class="title">账户{{val}}月支出</span>
                    <span class="con">¥{{totalMoney}}</span>
                </div>
                <ul>
                    <li v-for='item in filterTime'>
                        <p v-if='item.vak06 == 1'>门诊挂号扣费</p>
                        <p v-if='item.vak06 == 2'>门诊收费</p>
                        <p v-if='item.vak06 == 4'>住院收费</p>
                        <p>{{item.vak13}}</p>
                        <span>-{{item.vak24}}</span>
                    </li>
                </ul>
                <group>
                    <calendar 
                    @on-change="onChange" 
                    v-model="demo3" 
                    title="禁止选择今天以后" disable-future>
                    </calendar>
                </group>
            </div>
        </div>
        <div class="norecord abs-center" v-if='infoStatu'>
            <img src="../../common/images/noInfo/recharge.png" alt="" style="width:5.5rem;">
            <p style="text-align:center;margin-top:.35rem;font-size:.36rem;color:#898989;">暂无相关信息</p>
        </div>
        <toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
        
    </div>
</template>
<script>
    import http from '@common/js/http.js';
    import { changePageTitle } from '@common/js/mUtils';
    import { Toast,Group,Calendar } from 'vux';
    export default{
        mounted(){
            changePageTitle('交易记录');
                this.$nextTick(function(){
                    this.getRechargeLi().then((res)=>{
                        this.consumelist = res;
                        this.getFilterTime();
                    }).catch((err)=>{
                       
                    })
                    // 购卡充值查询
                    http.fetch('/api/User/card_recharge_record').then((res)=>{
                        this.buyrechargelist = res;
                        this.tabClick(0)
                    }).catch((err)=>{
                        
                    })
                    //会员卡余额
                    http.fetch('/api/User/card_balance').then((res)=>{
                        this.cardBalance = res;
                        
                    }).catch((err)=>{
                        
                    })
                })

        },
        data(){
            return{
                buyrechargelist:[],
                msg:'弹框提示',
                showToast:false,
                position:'middle',
                demo3:'TODAY',
                idx:0,
                dateStr:'',
                consumelist:[],
                filterTime:[],
                totalMoney:'',
                showGroup:false,
                cardBalance:'',
                val:'',
                hd:[
                    {
                        txt:'购卡充值'
                    },{
                        txt:'缴费明细'
                    }
                ],
                infoStatu:false,
                errorImg: 'this.src="' + require('../../common/images/avatar.png') + '"'
            }
        },
        methods:{
            selectDate(){
                this.showGroup = true;
            },
            tabClick(index){
                this.idx = index;
                if(index == 0){
                    if(this.buyrechargelist.length == 0){
                        this.infoStatu = true;
                    }else{
                        this.infoStatu = false;
                    }
                }
                if(index == 1){
                    if(this.cardBalance.length == 0){
                        this.infoStatu = true;
                    }else{
                        this.infoStatu = false;
                    }
                }
            },
            getFilterTime(){
                this.filterTime = [];
                this.filterTime = this.consumelist.filter((item)=>{
                    return item.vak13.substring(0,7) == this.dateStr;
                })
                this.totalMoney = 0;
                for(var i=0;i<this.filterTime.length;i++){
                    this.totalMoney += Number(this.filterTime[i].vak24);
                }
            },
            getRechargeLi(){
                return http.fetch('/api/User/card_consume_record')
            },
            onChange (val) {
                  this.dateStr = val.substring(0,7);

                  let year = new Date().getFullYear();
                  let month = new Date().getMonth()+1 < 10 ? '0'+ (new Date().getMonth()+1) :new Date().getMonth()+1;

                  let yearAndmonth = year+'-'+month;

                  if(yearAndmonth == this.dateStr){
                    this.val = '本月';
                  }else{
                    this.val = this.dateStr;
                  }

                  // this.msg = this.dateStr;
                  // this.showToast = true;

                  this.getFilterTime();
                
            }
        },
        components:{
            Toast,
            Group,
            Calendar
        }
    }
</script>
<style lang='less'>
.Transactionrecord .vux-calendar{
    position:fixed!important;
    left:0;
    top:1.2rem;
    height:1rem;
    width:1.5rem;
    overflow:hidden;
    z-index:3;
    opacity:0;
}
.Transactionrecord{
    height: 100%;
    padding-top: 1.2rem;
    background: #f5f5f5;
    .hd{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 1.2rem;
        line-height:1.2rem;
        background: #fff;
        box-shadow: .02rem 0 .307rem .013rem rgba(207, 207, 207, 0.33);
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
        .page_2{
            margin-top: 1rem;
        }
        .select_date{
            position: fixed;
            top: 1.2rem;
            left:0;
            padding-left: .32rem;
            background: #fff;
            height: 1rem;
            line-height:1rem;
            width: 100%;
            img{
                display: inline-block;
                width: .43rem;
                height: .35rem;
                margin-right: .3rem;
                vertical-align:middle;
                margin-bottom: .02rem;
            }
        }

        .balance{
            background: #f2f2f2;
            height: 1.06rem;
            line-height:1.06rem;
            padding: 0 .3rem;
            .title{
                float: left;
                font-size:.28rem;
                color:#898989;
            }
            .con{
                float: right;
                font-size:.36rem;
                color:#5a5a5a;
            }
        }
        ul{
            li{
                position: relative;
                height: 1.58rem;
                padding:0 .3rem;
                padding-top: .38rem;
                border-bottom:.03rem solid #f5f5f5;
                background: #fff;
                p:nth-of-type(1){
                    margin-bottom: .28rem;
                    font-size:.32rem;
                    line-height:.32rem;
                    color:#5a5a5a;
                }
                p:nth-of-type(2){
                    font-size:.26rem;
                    line-height:.26rem;
                    color:#b3b3b3;
                }
                span{
                    position: absolute;
                    right: .3rem;
                    top: 50%;
                    margin-top: -.18rem;
                    font-size:.36rem;
                    color:#ff5259;
                }
                span.chong{
                    color:#5a5a5a;
                }
                span.red{
                    color:#ff5259;
                }
            }
        }
    }
}
</style>