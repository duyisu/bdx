<template lang="html">
    <div class="sendItemContent">
        <ul class="clearfix">
            <li>
                <p>北斗星儿童医院会籍礼赠体检 <span>(0-1岁)</span></p>
                <div class="img">
                    <img src="../../common/images/send/suo_1@2x.png" alt="">
                    <div class="fangda" @click='imgClickStatu1 = true'>
                        <img src="../../common/images/send/fangda@2x.png" alt="">
                        <p>点击放大图片</p>
                    </div>
                    <img src="../../common/images/send/da_1.jpg" alt="" class="img_big" v-if='imgClickStatu1' @click='imgClickStatu1 = false' preview preview-text="">
                </div>
            </li>
            <li>
                <p>北斗星儿童医院会籍礼赠体检 <span>(1-3岁)</span></p>
                <div class="img">
                    <img src="../../common/images/send/suo_2@2x.png" alt="">
                    <div class="fangda" @click='imgClickStatu2 = true'>
                        <img src="../../common/images/send/fangda@2x.png" alt="" >
                        <p>点击放大图片</p>
                    </div>
                    <img src="../../common/images/send/da_2.jpg" alt="" class="img_big" v-if='imgClickStatu2' @click='imgClickStatu2 = false' preview preview-text="">
                </div>
            </li>
            <li>
                <p>北斗星儿童医院会籍礼赠体检 <span>(4-18岁)</span></p>
                <div class="img">
                    <img src="../../common/images/send/suo_3@2x.png" alt="">
                    <div class="fangda" @click='imgClickStatu3 = true'>
                        <img src="../../common/images/send/fangda@2x.png" alt="">
                        <p>点击放大图片</p>
                    </div>
                    <img src="../../common/images/send/da_3.jpg" alt="" class="img_big" v-if='imgClickStatu3' @click='imgClickStatu3 = false' preview preview-text="">
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import PinchZoom from '@common/js/pinchzoom';
    export default{
        data(){
            return{
                imgClickStatu1:false,
                imgClickStatu2:false,
                imgClickStatu3:false
            }
        },
        methods:{
        }
    }
</script>
<style lang='less'>
    .sendItemContent{
        padding:0 .5rem;
        padding-top: .49rem;
        ul{
            li{
                width: 2.98rem;
                float: left;
                margin-left: .54rem;
                margin-bottom: .58rem;
                p{
                    width: 100%;
                    padding:0 .17rem;
                    text-aling:center;
                    line-height:.36rem;
                    color:#5a5a5a;
                    font-size:.28rem;
                    margin-bottom: .22rem;
                    span{
                        color:#48cdbb;
                    }
                }
                .img{
                    position: relative;
                    width: 2.98rem;
                    height: 4.21rem;
                    img{
                        display: block;
                        width: 100%;
                    }
                    .fangda{
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                        text-align:center;
                        p{
                            font-size:.28rem;
                            color:#48cdbb;
                        }
                        img{
                            display: inline-block;
                            width: .7rem;
                            margin-bottom: .28rem;
                            margin-top: 1.36rem;
                        }
                    }
                    .img_big{
                        position: fixed;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 999;
                    }
                }
            }
            li:nth-child(2n-1){
                margin-left: 0;
            }
        }
    }
</style>