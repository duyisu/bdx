<template lang="html">
    <section>
        <div class="hospital-map">
            <nav class="nav-menu">
                <span class="nav-item" :class="{on:navIdx==1}" @click="navIdx=1">门诊流程</span>
                <span class="nav-item" :class="{on:navIdx==2}" @click="navIdx=2">住院流程</span>
            </nav>
            <div class="content">
                <div class="clinic-list" v-show="navIdx==1">
                    <div class="item">医院官方电话027-88077999/线上预约诊号</div>
                    <span class="icon-arrow"></span>
                    <div class="item">客服中心办理就诊手续</div>
                    <span class="icon-arrow"></span>
                    <div class="item">
                        对应科室看诊：<br/>
                        2楼：家庭耳鼻喉科、口腔科<br/>
                        3楼：儿童耳鼻喉科、过敏反应科、眼科、<br/>
                        儿科、儿童保健科<br/>
                        6楼：唇腭裂中心、整形美容科<br/>
                    </div>
                    <span class="icon-arrow"></span>
                    <div class="item">
                        检查<br/>
                        2楼：内镜室、听力检测中心、检验科<br/>
                        3楼：过敏反应中心<br/>
                    </div>
                    <div class="col-2">
                        <span class="icon-arrow"></span><span class="icon-arrow"></span>
                    </div>
                    <div class="col-2">
                        <div class="item">需要治疗</div>
                        <div class="item">需要开药</div>
                    </div>
                    <div class="col-2">
                        <span class="icon-arrow"></span><span class="icon-arrow"></span>
                    </div>
                    <div class="col-2">
                        <div class="item align-l">
                            2楼：综合治疗室<br/>
                            3楼：鼻负压置换、雾
                            化、激光、输液室
                        </div>
                        <div class="item">2楼药剂科</div>
                    </div>
                    <div class="col-2">
                        <span class="icon-arrow"></span><span class="icon-arrow"></span>
                    </div>
                    <div class="item">回到诊室，主诊医生交代注意事项及是否需要复诊</div>
                    <span class="icon-arrow"></span>
                    <div class="item">看诊结束 离院</div>
                </div>
                <div class="hospitalized-list" v-show="navIdx==2">
                    <div class="title">入院</div>
                    <span class="icon-arrow w-col-4"></span>
                    <div class="col-3">
                        <div class="item" style="width:2.4rem;">医生开入院证明</div>
                        <span class="icon-arrow-right"></span>
                        <div class="item">参保病人备好身份证、医保卡</div>
                    </div>
                    <span class="icon-arrow col-right"></span>
                    <div class="col-3">
                        <div class="item">入院窗口办理住院手续</div>
                        <span class="icon-arrow-left"></span>
                        <div class="item">交入院预交金或刷医保卡</div>
                    </div>
                    <span class="icon-arrow col-left"></span>
                    <div class="col-3">
                        <div class="item">
                            持入院手续到病房<br/>
                            护士站递交入院手续
                        </div>
                        <span class="icon-arrow-right"></span>
                        <div class="item">
                            签署入院告知<br/>
                            离院告知等相关文书
                        </div>
                    </div>
                    <span class="icon-arrow col-right"></span>
                    <div class="col-3">
                        <div class="item">
                            测量血压、体温、<br/>
                            身高、体重
                        </div>
                        <span class="icon-arrow-left"></span>
                        <div class="item">
                            主管医师安排<br/>
                            相关检查及治疗
                        </div>
                    </div>
                    <span class="icon-arrow col-left"></span>
                    <div class="item mb-60">护士带领病员熟悉病区环境交代相关注意事项</div>

                    <div class="title">出院</div>
                    <span class="icon-arrow w-col-4"></span>
                    <div class="item">护士接出院医嘱后通知患者及家属</div>
                    <span class="icon-arrow "></span>
                    <div class="item">护士申请出院完毕通知患者及家属</div>
                    <span class="icon-arrow "></span>
                    <div class="item">
                        持住院预交金收据及出院证明书<br/>
                        到住院收费处办理出院结账手续
                    </div>
                    <div class="col-2">
                        <span class="icon-arrow"></span><span class="icon-arrow"></span>
                    </div>
                    <div class="col-2">
                        <div class="item">无出院带药者</div>
                        <div class="item">有出院带药者</div>
                    </div>
                    <div class="col2">
                        <span class="icon-arrow-down"></span>
                        <div >
                            <span class="icon-arrow"></span>
                            <div class="item" style="width:4.75rem;">护士取药送交出院患者并交代注意事项</div>
                            <span class="icon-arrow "></span>
                        </div>
                    </div>
                    <div class="item">
                        回病房与护士交接相关手续<br/>
                        如需复印病历资料者告知护士
                    </div>
                    <span class="icon-arrow "></span>
                    <div class="item">出院手续办理完毕，离院</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { changePageTitle } from '@common/js/mUtils'
export default {
    mounted(){
        changePageTitle('就医流程');
    },
    components: {

    },
    data(){
        return {
            navIdx: 1
        }
    }
}
</script>

<style lang="less">
@import '../../common/styles/mixin';
.hospital-map{
    width: 7.5rem;
    .nav-menu{
        position: fixed;
        padding: 0 .7rem;
        display: flex;
        width: 100%;
        height: .7rem;
        justify-content: space-around;
        align-items: center;
        background-color: #fff;
        .nav-item{
            display: inline-flex;
            width: 1.5rem;
            height: .43rem;
            line-height: .43rem;
            font-size: .28rem;
            justify-content: center;
            color: #898989;
            cursor: pointer;
            &.on{
                color: #fff;
                background:url(bg_nav_on.png) no-repeat left center/1.5rem .43rem;
                border-radius: .4rem;
            }
        }
    }
    .content{
        padding: 1rem .4rem .5rem;
        width:100%;
        background-color: #f5f5f5;
        .item{
            display: flex;
            width: 100%;
            padding: .1rem;
            line-height: .45rem;
            text-align: center;
            font-size: .26rem;
            color: #191919;
            justify-content: center;
            align-items: center;
            background-color: #ecfcf9;
            border: 1px solid #66e4cc;
            border-radius: .1rem;
        }
        .icon-arrow{
            display: block;
            width: 100%;
            height: .56rem;
            .bg-image('icon_arrow_down');
            background-size: .3rem .46rem;
            background-position:center top;
            &.w-col-4{
                width: 1.8rem;
            }
            &.col-left,&.col-right{
                width: 2.8rem;
            }
            &.col-right{
                margin-left: 3.6rem;
            }
        }
        .icon-arrow-down{
            display: block;
            margin-left: 1.25rem;
            width: .3rem;
            height: 1.62rem;
            background: url(icon_arrow_down_l.png) no-repeat ;
            background-size: .3rem 1.62rem ;
            background-position:left center;
        }
        .icon-arrow-left{
            display: block;
            width: .56rem;
            height: .56rem;
            .bg-image('icon_arrow_left');
            background-size: .46rem .3rem ;
            background-position:right center;
        }
        .icon-arrow-right{
            display: block;
            width: .56rem;
            height: .56rem;
            .bg-image('icon_arrow_right');
            background-size: .46rem .3rem ;
            background-position:left center;
        }
        .col-2{
            display:flex;
            justify-content: space-between;
            .item,
            .icon-arrow{
                width: 2.8rem;
            }
            .item.align-l{
                text-align:left;
            }
        }
        .col2{
            display: flex;
            justify-content: space-between;
            .icon-arrow:first-child{
                margin-left: 2rem;
                width: 2.8rem;
            }
        }
        .col-3{
            display:flex;
            align-items: center;
            .item{
                width: 2.8rem;
                &:last-child{
                    flex: 1;
                }
            }
        }

        .hospitalized-list{
            .title{
                display: block;
                width: 1.8rem;
                height: .6rem;
                line-height: .6rem;
                text-align: center;
                color: #fff;
                font-size: .26rem;
                .btn_bg_gradient();
                border-radius: .08rem;
            }
        }
        .mb-60{
            margin-bottom: .6rem;
        }
    }
}
</style>
