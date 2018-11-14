<template lang="html">
    <section>
        <div class="IMList-wrapper">
            <template v-if="askDocterList.length > 0">
                <div v-for="item in askDocterList" class="IM-item" @click="gotoDetail(item.ask_order_id)">
                    <div class="doctor">
                        <div class="left">
                            <img class="img" :src="item.user_avatar | filterImg" alt="" :onerror="errorImg">
                            <div class="desc">{{item.user_name}}</div>
                        </div>
                        <span class="ask-status" :class="{on: item.status == 1}">{{item.status | filterStatus}}</span>
                    </div>
                    <div class="ask-people">
                        <span>问诊人 : {{item.realname}}</span>
                        <span>{{item.sex | filterSex}}</span>
                        <span>{{item.age}}岁</span>
                        <span>{{item.price | filterPrice}}</span>
                    </div>
                    <div class="ask-info">
                        <p>{{item.description}}</p>
                    </div>
                    <p class="ask-time">{{item.create_time}}</p>
                </div>
            </template>
            <div v-else class="no-result"></div>
        </div>
    </section>
</template>

<script>
import {s_askDocterList} from '@service/service'
import {baseUrl} from '@common/js/config'
import { getStore } from '@common/js/mUtils'
export default {
    mounted() {
        this.$nextTick(() => {
            s_askDocterList().then(res => {
                this.askDocterList = res;
            });
        });
    },
    data() {
        return {
            askDocterList: [],
            errorImg: 'this.src="' + require('../../common/images/avatar.png') + '"'
        }
    },
    filters: {
        filterSex(val) {
            var sex = {'0':'未知', '1':'男', '2':'女'};
            return sex[val];
        },
        filterStatus(val) {
            var status = {'1':'咨询中','2':'已咨询'};
            return status[val];
        },
        filterPrice(val) {
            if(parseInt(val) == '0'){
                return '免费咨询';
            }else{
                return '图文咨询（￥'+ val + ')';
            }
        },
        filterImg(val) {
            if(val.indexOf('http') > 0){
                return val;
            }else{
                return baseUrl + val;
            }
        }
    },
    methods: {
        gotoDetail(id) {
            //this.$router.push({name:'IM' ,params: {askId:id}});
            let access_token = getStore('access_token');
            location.href=baseUrl+'im/index/mobile?group=1&ask_order_id='+ id +'&access_token='+access_token;
        }
    }
}
</script>

<style lang="less">
.IMList-wrapper{
    width: 7.5rem;
    .IM-item{
        margin-bottom: .15rem;
        padding: .3rem;
        width: 100%;
        height: 4.75rem;
        background-color: #fff;
        border-bottom:.02rem solid #f5f5f5;
    }
    .doctor{
        display: flex;
        margin-bottom: .3rem;
        height: .8rem;
        align-items: center;
        justify-content: space-between;
        font-family: PingFang-SC-Medium;
        font-size: .28rem;
        color: #191919;

        .left{
            display: inline-flex;
            align-items: center;
        }
        .img{
            margin-right: .2rem;
            display: inline-block;
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
            overflow: hidden;
        }
        .desc{
             span{
                 font-size: .24rem;
             }
        }
        .ask-status{
            color: #66e4cc;
            &.on{
                color: #ff4621;
            }
        }
    }
    .ask-people{
        margin-bottom: .2rem;
        height: .35rem;
        line-height: .35rem;
        font-size: .26rem;
        color: #bbb;
        overflow: hidden;
        span{
            margin-right: .15rem;
            &:last-child{
                display: inline-block;
                padding-left: .2rem;
                height: .25rem;
                border-left: 1px solid #e5e5e5;
            }
        }
    }
    .ask-info{
        margin-bottom: .3rem;
        padding: .25rem .3rem;
        width: 6.9rem;
        height: 1.9rem;
        border-radius: .2rem;
        box-shadow: 1.9px 5.7px 46px 0 rgba(0, 0, 0, 0.07);
        p{
            height: 1.3rem;
            line-height: .45rem;
            font-size: .28rem;
            color: #898989;
            overflow: scroll;
        }
    }
    .ask-time{
        text-align: right;
        line-height: .3rem;
        font-size: .26rem;
        color: #bbb;
    }
}
</style>
