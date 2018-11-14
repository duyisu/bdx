<template lang="html">
    <section>
        <div class="hospital-news">
            <nav class="nav-menu">
                <span class="nav-item" :class="{on:navIdx==1}" @click="navIdx=1">往期文章</span>
                <span class="nav-item" :class="{on:navIdx==2}" @click="navIdx=2">医院新闻</span>
                <span class="nav-item" :class="{on:navIdx==3}" @click="navIdx=3">通知公告</span>
            </nav>
            <div class="content">
                <ul  v-show="navIdx==1" class="article-list base-list">
                    <li v-for="item in info" class="item">
                        <a :href="item.url">
                            <div class="img">
                                <span class="label"v-if="item.tag">{{item.tag}}</span>
                                <img :src="item.image" alt="">
                            </div>
                            <div class="title"><span>{{item.title}}</span></div>
                            <p class="desc">{{item.brief}}</p>
                        </a>
                    </li>
                </ul>
                <ul v-show="navIdx==2" class="news-list base-list">
                    <li v-for="item in news" class="item">
                        <a :href="item.url">
                            <div class="img">
                                <span class="label" v-if="item.tag">{{item.tag}}</span>
                                <img :src="item.image" alt="">
                            </div>
                            <div class="title"><span>{{item.title}}</span><span class="time">{{item.date_time | filterInfoDate}}</span></div>
                            <p class="desc">{{item.brief}}</p>
                        </a>
                    </li>
                </ul>
                <ul v-show="navIdx==3" class="notice-list">
                    <a v-for="item in notice" :href="item.url" >
                    <li class="notice-item">
                        <span class="icon-item icon-type-01"></span>
                        <div class="notice-content">
                            <div class="title"><span>{{item.title}}</span><span class="time">{{item.date_time | filterInfoDate}}</span></div>
                            <p class="desc">{{item.brief}}</p>
                        </div>
                    </li>
                    </a>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
import { changePageTitle } from '@common/js/mUtils'
import { s_hospitalNew } from '@service/service';
export default {
    mounted() {
        changePageTitle('往期文章');
        s_hospitalNew().then(res => {
           
            this.info = res.info;
            this.news = res.news;
            this.notice = res.notice;
        });
    },
    data(){
        return {
            navIdx: 1,
            info:[],
            news:[],
            notice: []
        }
    },
    filters: {
        filterInfoDate(val){
            return val.substr(0, 10);
        }
    }
}
</script>

<style lang="less">
@import '../../common/styles/mixin';
.hospital-news{
    width: 7.5rem;
    .nav-menu{
        position: relative;
        padding: 0 .4rem;
        display: flex;
        width: 7.5rem;
        height: .88rem;
        justify-content: space-between;
        align-items: center;
        .border-1px(#f5f5f5);
        background-color: #ffffff;

        .nav-item{
            display: inline-flex;
            line-height: .58rem;
            font-size: .32rem;
            color: #898989;
            &.on{
                color: #66e4cc;
                border-bottom: .06rem solid #66e4cc;
            }
        }
    }
    .notice-list{
        background-color: #fff;
        .notice-item{
            display: flex;
            padding: .2rem .4rem .2rem .3rem;
            width: 100%;
            height: 1.2rem;
            .border-1px(#f5f5f5);
            .notice-content{
                flex: 1;
                overflow: hidden;
            }
        }
        .icon-item{
            display: inline-flex;
            flex-basis: .28rem;
            margin-right: .2rem;
            width: .28rem;
            height: .28rem;
            background-size: .28rem .25rem;
            background-position:center;
            &.icon-type-01{
                .bg-image('icon_type_01');
            }
            &.icon-type-02{
                .bg-image('icon_type_02');
            }
        }
        .title{
            display: flex;
            margin-bottom: .1rem;
            line-height: .35rem;
            justify-content: space-between;
            font-size: .28rem;
            color: #191919;
            .time{
                font-size: .24rem;
                color: #bbbbbb;
            }
        }
        .desc{
            line-height: .35rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #898989;
            font-size: .26rem;
            overflow: hidden;
            cursor: pointer;
        }

    }
    .base-list{
        padding: 0 .1rem;
        .item{
            margin-bottom: .1rem;
            width: 100%;
            height: 4.75rem;
            background-color: #fff;
            border-radius: .2rem;
            .img{
                position: relative;
                display: flex;
                width: 100%;
                height: 3.45rem;
                border-radius: .2rem;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                >img{
                    display:block;
                    width: 100%;
                }
            }
            .label{
                position: absolute;
                top: .18rem;
                left: 0;
                width: 1.32rem;
                height: .54rem;
                line-height: .54rem;
                text-align: center;
                color: #fff;
                font-size: .28rem;
                border-radius: 0 .4rem .4rem 0;
                .btn_bg_gradient(right);
            }
            .title{
                display: flex;
                padding: .1rem .3rem 0;
                margin-bottom: .1rem;
                height: .66rem;
                line-height: .6rem;
                justify-content: space-between;
                font-size: .28rem;
                color: #191919;
                span:first-child{
                    display: inline-block;
                    max-width: 4.8rem;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                .time{
                    font-size: .24rem;
                    color: #bbbbbb;
                }
            }
            .desc{
                padding-left: .3rem;
                width: 5.8rem;
                line-height: .3rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: #898989;
                font-size: .24rem;
                overflow: hidden;
                cursor: pointer;
            }
        }
        &.article-list{
            .title{
                span:first-child{
                    display: inline-block;
                    width: 100%;
                    max-width: 100%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
    }

}
</style>
