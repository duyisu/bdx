<template lang="html">
    <div class="payment">
        <div class="head">
            <p>购买北斗星家庭会员卡</p>
            <p class="amount"><span>￥</span>1000</p>
            <p>支付剩余时间 12:20</p>
        </div>
        <div class="payType">
            <p class="clearfix"><img src="../../common/images/payment/pay@2x.png" alt="">微信支付<span></span></p>
        </div>
        <div class="pay">立即支付</div>
    </div>
</template>

<script>
import { baseUrl,host } from '@common/js/config';
import { Toast } from 'vux'
import http from '@common/js/http.js';
import {changePageTitle } from '@common/js/mUtils';
export default {
    mounted(){
        changePageTitle('立即支付');
    }
}
</script>

<style lang="less">
    .payment{
        position: relative;
        height: 100%;
        background: #f2f2f2;
        .head{
            width: 100%;
            height:3.42rem;
            background: url('../../common/images/payment/bg@2x.png') no-repeat left top;
            background-size: 100% auto;
            padding-top: .46rem;
            p{
                font-size:.32rem;
                color:#fff;
                text-align:center;
            }
            p.amount{
                font-size:.7rem;
                margin-top: .38rem;
                margin-bottom: .48rem;
                line-height:.5rem;
                span{
                    font-size:.46rem;
                }
            }
        }
        .payType{
            position: relative;
            width: 100%;
            height: 1.4rem;
            background: #fff;
            text-align:left;
            padding:0 .4rem;
            line-height:1.4rem;
            font-size:.32rem;
            color:#333;
            margin-top: .2rem;
            img{
                display: inline-block;
                width: .5rem;
                height: .4rem;
                vertical-align:middle;
                margin-right: .3rem;
                margin-bottom: .02rem;
            }
            span{
                position: absolute;
                right: .45rem;
                top: 50%;
                margin-top: -.25rem;
                display: block;
                width: .5rem;
                height: .5rem;
                background-repeat: no-repeat;
                background-size: 100% auto;
                background-position: center center;
                background-image: url('../../common/images/payment/select_on@2x.png');
            }
        }
        .pay{
            position: absolute;
            left: 50%;
            margin-left: -3.35rem;
            bottom: .6rem;
            width: 6.7rem;
            height: .9rem;
            border-radius: .45rem;
            text-align:center;
            line-height:.9rem;
            font-size:.36rem;
            letter-spacing:.036rem;
            color:#fff;
            background-color: #48cdbb;
        }
    }
</style>
