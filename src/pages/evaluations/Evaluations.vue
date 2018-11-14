<template lang="html">
    <section class="evaluation-wreapper">
        <div class="content">
            <div class="pic">
                <img v-if='!statu' src="../../common/images/zhuli.png" alt="" :onerror="errorImg">
                <img :src="doctorImg" alt="" v-if='statu'>
            </div>
            <p class="name" v-if='!statu'>名医助理</p>
            <p class="name" v-if='statu'>{{doctorName}}</p>
            <div class="score-box">
                <div class="score-status" :class="{active:styleYellow}"><span>{{labelTitle}}</span></div>
                <div class="starBox">
                    <span v-for="(item, idx) in starList" class="icon-score" :class="{active: item}"  @click="changeStarData(idx)"></span>
                </div>
                <ul  v-if="starIdx > -1" class="label-list">
                    <li v-for="(item, idx) in labelList" class="label-item" :class="{active: item.flag }" @click="selectLabel(item, idx)">{{item.label}}</li>
                </ul>
            </div>
            <div class="remarkBox">
                <textarea class="remark" v-model="remark" placeholder="写出您对医生的感受和建议, 给予其他病友鼓励" rows="7" ></textarea>
            </div>
        </div>
        <div class="footer-operate">
            <span class="btn" @click="submitEvalution">提交评论</span>
        </div>
        <toast v-model="ifShowToast" type="text" :time="stopTime" width="auto" :text="toastText" position="middle"></toast>
    </section>
</template>

<script>
import { s_submitEvaluation,s_getDoctorInfo } from '@service/service';
import {changePageTitle} from '@common/js/mUtils';

export default {
    created(){
        changePageTitle('发表评论');
    },
    mounted(){
        this.$nextTick(function(){
            if(this.$route.params.orderId){
                this.order_id = this.$route.params.orderId;
                this.type = this.$route.params.type;
                s_getDoctorInfo({
                    order_id: this.order_id,
                    order_type: this.type
                }).then(res => {
                    
                    this.doctorName = res.name;
                    this.doctorImg = res.image;
                    // if(res.image)
                    // { this.doctorImg = res.image;}
                    // else{
                    //    this.doctorImg =require('../../common/images/avatar.png' )
                    // }
  
                })
            }
            if(this.$route.params.evaluationStatu){
                this.statu = true;
            }
        });
    },
    data() {
        return {
            order_id: '',
            doctorName: '',
            doctorImg: '',
            styleYellow: false,
            starList: [false,false,false,false,false],
            remark: '',
            starIdx: -1,
            labelTitle: '评价医生',
            labelArray: [{
                title: '非常不满意',
                label: ['态度较差','没有耐心','没有耐心','较不专业','回复较慢','回复较慢']
            },{
                title: '不满意',
                label: ['态度较差','没有耐心','没有耐心','较不专业','回复较慢','回复较慢']
            },{
                title: '一般',
                label: ['医术好','回复及时','有帮助','有经验','态度温和','有责任心']
            },{
                title: '满意',
                label: ['艺术高超','态度温和','经验丰富','讲解仔细','回复及时','耐心负责']
            },{
                title: '非常满意',
                label: ['热情亲切','仁心仁德','妙手回春','医术高超','回复神速','十分敬业']
            }],
            labelList:[],
            checkedLabel:[],
            statu:false,
            errorImg: 'this.src="' + require('../../common/images/avatar.png') + '"'

        }
    },
    methods: {
        getLabelList(){
            if(this.starIdx > -1){
                let obj = this.labelArray[this.starIdx],
                    listArray = [];
                this.labelTitle = obj.title;
                for(var i=0;i<obj.label.length;i++){
                    this.labelList.push({
                        label: obj.label[i],
                        flag: false
                    });
                    this.checkedLabel.push('false');
                }
            }else{
                this.labelList = []
            }
        },
        changeStarData(idx) {
            this.starIdx = idx;
            this.labelList = [];
            this.styleYellow = true;
            for(var i=0; i< this.starList.length ;i++){
                if(i <= idx){
                    this.starList[i] = true;
                }else{
                    this.starList[i] = false;
                }
            }
            this.getLabelList();
        },
        selectLabel(item,idx) {
            if(item.flag){
                this.checkedLabel[idx] = 'false';
            }else{
                let tags = this.checkedLabel.filter(function(val){
                    return val != 'false';
                });
                if(tags.length>2){
                    this.toastText = '最多只能选择3个标签';
                    this.ifShowToast = true;
                    return false;
                }
                this.checkedLabel[idx] = item.label;
            }
            item.flag  = !item.flag;

        },
        submitEvalution() {
            if(this.starIdx < 0){
                this.ifShowToast = true;
                this.toastText = '请给医生评分';
                return false;
            }
            let tags = this.checkedLabel.filter(function(val){
                return val != 'false';
            });
            if(tags.length>3){
                this.toastText = '最多只能选择3个标签';
                this.ifShowToast = true;
                return false;
            }
            let star = this.starIdx + 1,
                param = {
                order_id: this.order_id,
                type: this.type,
                star: star,
                content: this.remark,
                tags: tags.join('|')
            };
            s_submitEvaluation(param).then(res => {
                if(this.type == 1){
                    this.$router.push({
                        name:'IMList'
                    })
                }else{
                    this.$router.push({
                        name:'myappoint',
                        query:{
                            id:3
                        }
                    })
                }
            }).then(err => {
                this.ifShowToast = true;
                this.toastText = err;
                return false;
            });
        }
    }
}
</script>

<style lang="less">
@import '../../common/styles/mixin';
.evaluation-wreapper{
    padding: 1.2rem .3rem .5rem;
    width: 7.5rem;
    background: url('../../common/images/personalcenter/personal_bg.png') no-repeat center top;
    background-size: 100% auto;
    .content{
        position: relative;
        padding-top: .83rem;
        width: 100%;
        height: 8.95rem;
        background-color: #fff;
        box-shadow: -1.4px -1.4px 15.8px 0.2px rgba(0, 0, 0, 0.1);
        border-radius: .08rem;
        .pic{
            position: absolute;
            top: -0.83rem;
            left: 50%;
            margin-left: -0.83rem;
            width: 1.66rem;
            height: 1.66rem;
            /*border: .06rem solid #fff;*/
            border-radius: 50%;
            overflow: hidden;
            img{
                display: block;
                width: 1.66rem;
                height: 1.66rem;
            }
        }
        .name{
            margin-bottom: .2rem;
            height: .74rem;
            line-height: .74rem;
            font-size: .36rem;
            color: #191919;
            text-align: center;
            font-weight: bold;
        }
        .score-box{
            margin:0 auto;
            padding-bottom: .6rem;
            width: 5.1rem;
            border-top: .02rem solid #f5f5f5;
            margin-top: .4rem;
        }
        .score-status{
            margin: -0.13rem auto 0;
            width: 1.68rem;
            height: .26rem;
            line-height: .26rem;
            text-align: center;
            font-size: .28rem;
            color: #898989;
            background-color: #fff;
            &.active{
                color: #ffc001;
            }
        }
        .starBox{
            margin-top: .4rem;
            text-align: center;
            .icon-score{
                display: inline-block;
                margin-right: 0.29rem;
                width: .55rem;
                height: .54rem;
                background: url(icon_score.png) no-repeat center center/.55rem .54rem ;
                &.active{
                    background: url(icon_score_on.png) no-repeat center center/.55rem .54rem ;
                }
                &:last-child{
                    margin-right: 0;
                }
            }
        }

        .label-list{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding-top: .4rem;
            overflow: hidden;
            .label-item{
                display: inline-block;
                margin-top: .2rem;
                width: 1.44rem;
                height: .54rem;
                line-height: .54rem;
                text-align: center;
                font-size: .26rem;
                color: #898989;
                border: 1px solid #efefef;
                border-radius: .27rem;
                cursor: pointer;
                &.active{
                    border-color: #66e4cc;
                    color: #66e4cc;
                }
            }
        }
        .remarkBox{
            margin: 0 auto;
            padding-top: .29rem;
            width: 6.1rem;
            border-top: .02rem solid #f5f5f5;
            .remark{
                width: 100%;
                border: 0;
                font-size: .28rem;
            }
        }
    }
    .footer-operate{
        height: 1.9rem;
        .flex_align_hv(center);
        .btn{
            display: block;
            width: 6.9rem;
            height: .72rem;
            line-height: .72rem;
            text-align: center;
            font-size: .36rem;
            color: #fff;
            border-radius: .4rem;
            background: #48cdbb;
            cursor: pointer;
        }
    }



       .remark::-webkit-input-placeholder{
        color:#dadada;
        }
        .remark:-moz-placeholder{
        color:#dadada;
        }
        .remark::-moz-placeholder{
        color:#dadada;
        }
        .remark:-ms-input-placeholder{
        color:#dadada;
        }
}
</style>
