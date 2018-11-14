<template lang="html">
    <div id="loadmore-wrapper" class="scroll-loadmore-wrapper"
        :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}"
         @touchstart="_touchStart"
         @touchmove="_touchMove"
         @touchend="_touchEnd"
         >
        <div class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
            <ul class="ul-list"><slot></slot></ul>
            <footer class="load-more">
                <slot name="load-more">
                    <span>{{loadMoreTips}}</span>
                </slot>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        offset: {
            type: Number,
            default: 40
        },
        enableInfinite: {
            type: Boolean,
            default: true
        },
        enableRefresh: {
            type: Boolean,
            default: true
        },
        onRefresh: {
            type: Function,
            default: undefined,
            required: false
        },
        onInfinite: {
            type: Function,
            default: undefined,
            require: false
        },
        listData: {
            tyep: Object,
            default: undefined,
            require: false
        },
        page: {
            tyep: Number,
            default: undefined,
            require: false
        }
    },
    data() {
        return {
            top: 0,
            state: 0,
            startY: 0,       //触摸位置
            touching: false,
            infiniteLoading: false,
            loadMoreTips: '',
            obj: document.getElementById('loadmore-wrapper'),
            ifReturnTop: false
        }
    },
    mounted() {
        this.$nextTick(() => {
            if(this.enableInfinite){
                this.loadMoreTips = '上拉加载更多';
            }else{
                if(this.page == 1){
                    this.loadMoreTips = '';
                }else{
                    this.loadMoreTips = '已经全部加载完毕';
                }
            }
        });
    },
    watch: {
        listData() {
            if(this.enableInfinite){
                this.loadMoreTips = '上拉加载更多';
            }else{
                if(this.page == 1){
                    this.loadMoreTips = '';
                }else{
                    this.loadMoreTips = '已经全部加载完毕';
                }
            }
        }
    },
    methods: {
        returnTop() {
            this.$el.scrollTop = 0;
        },
        _touchStart(e) {
            this.startY = e.targetTouches[0].pageY;
            this.startScroll = this.$el.scrollTop || 0;
            this.touching = true;
        },
        _touchMove(e) {
            if (!this.enableRefresh || !this.touching) {
                return false;
            }
            let diff = e.targetTouches[0].pageY - this.startY - this.startScroll;
            //if (diff > 0) e.preventDefault()
            this.top = diff + (this.state === 2 ? this.offset : 0) || 0;

            if (this.state === 2) { // in refreshing
                return false;
            }
            if (diff > 0) {
                this.state = 0;
            } else {
                this.top = 0;
                this.state = 1;
            }
        },
        _touchEnd(e) {
            if(this.state == 1){
                this._onScroll();
            }else if(this.state == 0){
                this.top = 0;
                //this._onRefresh();
            }else{
                this.top = this.offset;
            }
        },
        _onScroll() {
            if (!this.onInfinite || !this.enableInfinite || this.infiniteLoading) {
                return false;
            }
            let scrollTop = this.$el.scrollTop;
            let outerHeight = this.$el.clientHeight;
            let innerHeight = this.$el.querySelector('.inner').clientHeight;
            let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0;
            let infiniteHeight = this.$el.querySelector('.load-more').clientHeight;
            let bottom = innerHeight - outerHeight - scrollTop - ptrHeight;
            
            if (bottom < infiniteHeight){
                this.loadMoreTips = '加载中......';
                this.infiniteLoading = true;
                this.onInfinite(this.infiniteDone);
            }

        },
        _onRefresh() {
            if (!this.enableRefresh) return
            this.touching = false
            if (this.state === 2) { // in refreshing
                this.state = 2
                this.top = this.offset
                return
            }
            if (this.top >= this.offset) { // do refresh
                this.state = 2
                this.top = this.offset
                this.onRefresh(this.refreshDone)
            } else { // cancel refresh
                this.state = 0
                this.top = 0
            }
        },
        refreshDone() {
            this.state = 0
            this.top = 0
        },
        infiniteDone() {
            this.infiniteLoading = false;
            if(this.enableInfinite){
                this.loadMoreTips = '上拉加载更多';
            }else{
                this.loadMoreTips = '已经全部加载完毕';
            }
        }
    }
}
</script>

<style lang="less" rel="stylesheet/less">
@import '../../common/styles/mixin';
.scroll-loadmore-wrapper {
    position: relative;
    // top: 0;
    // bottom: 0;
    width: 6.9rem;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .ul-list{
        font-size: 0;
    }
    .inner {
        position: relative;

        width: 100%;
        transition-duration: 300ms;
    }
    .pull-refresh {
        display: none;;
        position: relative;
        left: 0;
        top: 0;
        display: flex;
        width: 100%;
        height: .8rem;
        justify-content: center;
        align-items: center;
        color: #898989;
    }
    &.touch .inner {
      transition-duration: 0ms;
    }
    &.down .down-tip {
      display: block;
    }
    &.up .up-tip {
      display: block;
    }
    &.refresh .refresh-tip {
      display: block;
    }
    .down-tip,
    .refresh-tip,
    .up-tip {
        display: none;
    }
    .load-more {
        display: flex;
        padding-bottom: .12rem;
        height: .6rem;
        justify-content: center;
        align-items: center;
        color: #898989;
    }

}
.btn-return-top {
    position: fixed;
    right: 0.45rem;
    bottom: 0.55rem;
    width: 0.76rem;
    height: 0.76rem;
    line-height: 0.76rem;
    border-radius: 50%;
    background: url(btn-return-top.png) center/.76rem no-repeat;
    cursor: pointer;
}
</style>
