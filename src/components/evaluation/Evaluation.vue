<template lang="html">
    <div  class="doctor-evaluation" is="LoadMore" :listData="evalList" :page="page" :enableInfinite="ifLoadMore" :on-infinite="onInfinite">
        <li v-for="item in evalList" class="item">
            <div class="info">
                <img  class="picture" :src="item.member_image" :onerror="errorImg">
                <div class="right">
                    <p class="username">{{item.member_name}}{{item.start}}</p>
                    <div class="score">
                        <span v-for="star in getStore(item.star)" class="icon-score" :class="{active: star=='active'}"></span>
                    </div>
                </div>
            </div>
            <p class="desc">{{item.content}}</p>
            <div v-if="item.tags.length > 0" class="labels">
                <span v-for="label in item.tags">{{label}}</span>
            </div>
        </li>
    </div>
</template>

<script>
import loadMore from '@components/loadMore/index'
export default {
    mixins: [loadMore],
    props:{
        list:{
            type: Object,
            require: true
        }
    },
    computed:{
        evalList(){
            this.totalPage = this.list.totalPage;
            this.page = this.list.page;
            if(this.page == 1){
                this.evaluationList = [];
            }
            if(this.totalPage <= 1){
                this.ifLoadMore = false;
                this.evaluationList = this.list.list;
            }else{
                let data = this.list.list;
                for (var i=0; i < data.length; i++) {
                    this.evaluationList.push( data[i] );
                }
                if(this.totalPage > this.page){
                    this.ifLoadMore = true;
                }
                if(this.totalPage == this.page){
                    this.ifLoadMore = false;
                }
            }
            return this.evaluationList;
        }
    },
    data() {
        return {
            doctor_id: '',
            is_best: '',
            depart_id: '',
            page: '',
            totalPage: '',
            rows: '',
            ifLoadMore: true,
            evaluationList: [],
            errorImg: 'this.src="' + require('../../common/images/avatar.png') + '"'
        }
    },
    methods:{
        getStore(stars){
            var len = parseInt(stars),
                starList = [];
            for(var i=0;i<5;i++){
                if(i < len){
                    starList.push('active');
                }else{
                    starList.push('noActive');
                }
            }
            return starList;
        },
        onInfinite(done){
            var page = parseInt(this.page) + 1;
            this.$emit('loadMoreData', {
                page: page
            });
            done();
        }
    }
}
</script>

<style lang="less">
.doctor-evaluation{
    position: relative;
    margin: 0 auto;
    background-color: #fff;
    .item{
        padding: .42rem .2rem;
        border-bottom: .02rem solid #f2f2f2;
        .info{
            height: .7rem;
            overflow: hidden;
            .picture{
                display: inline-block;
                margin-right: .2rem;
                width: .7rem;
                height: .7rem;
                border-radius: 50%;
                overflow: hidden;
            }
            .right{
                display: inline-block;
                vertical-align: top;
            }
            .username{
                padding-top: 0.06rem;
                line-height: .26rem;
                font-size: .28rem;
            }
            .score{
                margin-top: .1rem;
            }
            .icon-score{
                display: inline-block;
                margin-right: 0.05rem;
                width: .2rem;
                height: .2rem;
                background: url(icon_score.png) no-repeat center center/.2rem;
                &.active{
                    background: url(icon_score_on.png) no-repeat center center/.2rem;
                }
            }
        }
        .desc{
            margin-top: .2rem;
            overflow: hidden;
            line-height: .5rem;
            font-size: .28rem;
            color: #5a5a5a;
            overflow: hidden;
        }
        .labels{
            margin-top: .14rem;
            padding-left: .4rem;
            background: url(icon_labels.png) no-repeat left center/.26rem .26rem;
            overflow: hidden;
            >span{
                margin-right: .35rem;
                font-size: .26rem;
                color: #b3b3b3;
                border-right:.02rem solid #f2f2f2;
                padding-right:.35rem;
                line-height:.26rem;
            }
            >span:last-child{
                border-right:none;
            }
        }
    }
}
</style>
