<template lang="html">
    <section>
        <div class="mediical-services">
            <ul class="article-list base-list">
                    <li v-for="item in services" class="item">
                        <a :href="item.url">
                            <div class="img">
                                <span class="label" v-if="item.tag">{{item.tag}}</span>
                                <img :src="item.image" alt="">
                            </div>
                            <div class="title"><span>{{item.title}}</span></div>
                            <p class="desc">{{item.brief}}</p>
                        </a>
                    </li>
                </ul>
        </div>
    </section>
</template>

<script>
import { changePageTitle } from '@common/js/mUtils'
import { s_hospitalService } from '@service/service';
export default {
    mounted() {
        changePageTitle('诊疗服务');
        s_hospitalService().then(res => {
            this.services = res;
        });
    },
    components: {

    },
    data() {
        return {
            services: []
        }
    }
}
</script>

<style lang="less">
@import '../../common/styles/mixin';
.mediical-services{
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
                font-size: .30rem;
                font-weight: bold;
                border-radius: 0 .4rem .4rem 0;
               
                background: #48cdbb;
            }
            .title{
                display: flex;
                padding: .16rem .3rem 0;
                margin-bottom: .1rem;
                height: .66rem;
                line-height: .6rem;
                justify-content: space-between;
                font-size: .30rem;
                font-weight: bold;
                color: #191919;
                span:first-child{
                    display: inline-block;
                    width: 100%;
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
    }
}
</style>
