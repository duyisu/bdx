<template lang="html">
    <section>
        <div class="askDoctor-wrapper">
            <div class="inquiry-infoWrap">
                 <div class="inquiry-info" @click="selectInquiry">
                      <label class="inquiry-title">就诊人</label>
                      <div  class="inquiry-people">
                          <span class="cardType" v-if="inquiryInfo.type"> {{inquiryInfo.type | filterType}}</span>
                          <span class="inquiryName" :class='choicePatientStatu ? "active" : ""'>{{choicePatient}}</span>
                      </div>
                 </div>
                 <div class="hospitalTag">
                       <ul class="box">
                          <li><img src="../../assets/img/sanjia@2x.png" alt="">三甲医院医师</li>
                          <li><img src="../../assets/img/kuaisu@2x.png" alt="">5分钟内专业回复</li>
                          <li><img src="../../assets/img/yinsi@2x.png" alt="">隐私保护</li>
                      </ul>
                </div>
            </div>

            <div class="disease disease-ask">
                <p class="title">点击以下标签快速咨询病情<span>（必填）</span></p>
                <ul class="label-list">
                    <li v-for="(item, idx) in labelList" class="label-item" :class="{'active' :checkedLabelStatu === idx} " @click="selectDiseaseLabel(item, idx)">{{item.label}}</li>
                </ul>
            </div>
            <div class="disease disease-desc">
                <p class="title">描述您的病情症状</p>
                <group>
                    <x-textarea v-model="details" :max='max'  placeholder="详细描述您的病情症状，最少10个字。上传的图片仅您和医生可见" :rows="textareaRows" @on-blur="checkDetails"></x-textarea>
                    
                </group>
                <div class="pic">
                    <uploader
                       :max="maxImage"
                       :images="diseaseImages"
                       :handle-click="false"
                       :show-header="false"
                       :upload-url="uploadUrl"
                       name="file"
                       size="small"
                       @preview="previewMethod"
                       @add-image="addImageMethod"
                       @remove-image="removeImageMethod"
                       @get-image="getImage">
                   </uploader>
                </div>
            </div>
            <div class="footer-operate">
                <span class="btn" @click="submitQuestion">提交</span>
            </div>
        </div>
        <div class="opentip" v-if='openmemberTip'>
            <div class="opentipbox">
                <img src="../../common/images/askdoctoralert.png" alt="" class="top">
                <p><span style="margin-right:.1rem">—</span>  开通北斗星会员即可获得以下特权  <span style="margin-left:.1rem">—</span></p>
                <img src="../../common/images/askdoctoralert_2.png" alt="" class="mid" style="width:80%;margin:0 auto">
                <div class="submit" @click='toopenMember'>立即开通</div>
                <div class="btn" @click='openmemberTip = false'><img src="../../common/images/send/close.png" alt=""></div>
            </div>
        </div>
        <toast v-model="ifShowToast" type="text" :time="stopTime" width="auto" :text="toastText" position="middle"></toast>
    </section>
</template>

<script>
import {Group,XTextarea,Toast} from 'vux';
import http from '@common/js/http.js';
import Uploader from '@components/vux-uploader/uploader';
import {baseUrl} from '@common/js/config';
import {s_getAskRemarks,s_submitQuestion} from '@service/service'
import { getStore,changePageTitle } from '@common/js/mUtils';
import {getAuthInfo} from '@service/service';

export default {
    beforeRouteEnter(to,from,next){
        next((vm) => {
            vm.footIndex = to.query.index
        })
    },
    created() {
        changePageTitle('问医生');
        if(this.$route.params && this.$route.params.id){
            this.inquiryInfo = this.$route.params;
            this.patient_id = this.inquiryInfo.id;
            this.choicePatient = this.inquiryInfo.realname
            this.choicePatientStatu = true;
        }
        s_getAskRemarks().then(res => {
            if(res.length > 0){
                for(var i=0;i< res.length;i++){
                    this.labelList.push({
                        label: res[i],
                        flag: false
                    });
                    this.checkedLabel.push('false');
                }
            }
        });
        var access_token = getStore('access_token') || getUrlParam('access_token');
            
        this.uploadUrl = '/api/order/upload_image?access_token='+access_token;
    },
    components: {
        Group,
        XTextarea,
        Uploader,
        Toast
    },
    filters: {
        filterType(val) {
            var type = {'1':'普通客户','8':'普通会员','9':'家庭会员'}
            return type[val];
        }
    },
    data(){
        return {
            patient_id:'',//用户名
            textareaRows: 4,
            labelIdx: -1,
            maxImage: 9,
            small: 'small',
            inquiryInfo:{}, //就诊人信息
            diseaseImages: [],
            uploadUrl: '',
            details: '',//病情描述
            labelList: [],
            checkedLabel:[],
            choicePatient:'请选择就诊人',
            max:100,
            footIndex:'',
            ifShowToast:false,
            toastText:'',
            openmemberTip:false,
            choicePatientStatu:false,
            checked_label:'',
            checkedLabelStatu:''
        }
    },
    methods:{
        toopenMember(){
            this.$router.push({
                path:'/openMember',
                query:{
                    statu:'buy'
                }
            })
        },
        selectDiseaseLabel(item,idx) {
          
            this.checked_label = this.checkedLabel[idx];
            this.checkedLabelStatu = idx;
           
        },
        checkDetails() {
            if(this.details.length < 10){
                this.ifShowToast = true;
                this.toastText = '描述不能少于10个字';
                return false;
            }
        },
        selectInquiry() {
            this.$router.push({
                path:'/patientslist',
                query:{
                    pageFlag:'askDoctor'
                }
            })
        },
        previewMethod() {

        },
        addImageMethod() {
        },
        removeImageMethod() {
        },
        getImage(data){
            // var access_token = getStore('access_token') || getUrlParam('access_token');
            
            // this.uploadUrl = '/api/order/upload_image?access_token='+access_token;
            this.diseaseImages = data;
        },
        submitQuestion(){

            let labels = this.checkedLabel.filter(function(val){
                return val != 'false';
            });
            let images = [];
            if(this.patient_id == '' ){
                this.toastText = '请选择问诊人';
                this.ifShowToast = true;
                return false;
            }
            if(this.checked_label == ''){
                this.toastText = '请选择标签';
                this.ifShowToast = true;
                return false;
            }
            if(this.details.length < 1){
                this.toastText = '请填写描述';
                this.ifShowToast = true;
                return false;
            }
            if(this.details.length < 10){
                this.toastText = '描述不能少于10个字';
                this.ifShowToast = true;
                return false;
            }
            if(this.diseaseImages.length > 0){
                for(var i=0;i<this.diseaseImages.length;i++){
                    images.push(this.diseaseImages[i].url);
                }
            }
            http.fetch('api/order/check').then((res)=>{
                if(res.canAsk == 1){
                    let data = {
                        patient_id: this.patient_id,
                        //remarks: labels.join('|'),
                        remarks:this.checked_label,
                        description: this.details,
                        images: images.join('|')
                    };
                    s_submitQuestion(data).then(res => {
                        //this.$router.push({name:'IM' ,params: {askId:res.ask_order_id}});
                        let access_token = getStore('access_token');
                        location.href=baseUrl+'im/index/mobile?group=1&ask_order_id='+ res.ask_order_id +'&access_token='+access_token;
                    });
                }else if(res.canAsk == 0){
                    //this.ifShowToast = true;
                    //this.toastText = '已超过问诊次数'
                    this.openmemberTip = true;
                }
            }).catch((arr)=>{

            })
            
        }

    },
    watch:{
    }
}
</script>

<style lang="less">
@import '../../common/styles/mixin';
.opentip{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background:rgba(0,0,0,.5);
    .opentipbox{
        width: 5.9rem;
        position: absolute;
        left: 50%;
        margin-left: -2.95rem;
        top: 1.8rem;
        background: #fff;

        padding-bottom: .78rem;
        border-radius:.15rem;

        img{
            display: block;
            width: 100%;
        }
        p{
            text-align:center;
            color:#5a5a5a;
            font-size:.26rem;
            margin-top: .6rem;
            margin-bottom: .7rem;
            span{
                color:#d4d4d4;
            }
        }
        .submit{
            font-size:.32rem;
            color:#fff;
            letter-spacing:.032rem;
            width: 2.56rem;
            height: .69rem;
            border-radius: .345rem;
            background-color: #48cdbb;
            margin:0 auto;
            margin-top: .7rem;
            text-align:center;
            line-height:.69rem;

        }
        .btn{
            position: absolute;
            left: 50%;
            display: block;
            width: .8rem;
            height: .8rem;
            margin-left: -.4rem;
            bottom:-1.3rem;
            img{
                display: block;
                width: 100%;
            }
        }
    }
}
.askDoctor-wrapper{
    color: #191919;
    background: #f5f5f5;

    .inquiry-infoWrap{
        padding-bottom: .3rem;
        background: #fff;
    }
    .inquiry-info{
        position: relative;
        padding-left: .3rem;
        padding-right: .55rem;
        height: 1.14rem;
        .flex_align_hv;
        background-color: #fff;

        .inquiry-title{
            font-size: .28rem;
            color: #898989;
        }
        .inquiry-people{
            display: inline-flex;
            height: .5rem;
            line-height: .5rem;
            align-items: center;
            &:after{
                margin-left: .1rem;
                .icon_arrow_right(.16rem);
            }
        }
        .cardType{
            margin-right: .2rem;
            display: inline-block;
            width: 1.47rem;
            height: .5rem;
            line-height: .5rem;
            text-align: center;
            color: #fff;
            border-radius: .4rem;
            background-color: #48cdbb;
            font-size: .24rem;
        }
        .inquiryName{
            font-size: .28rem;
            color: #d4d4d4;
            vertical-align: middle;
        }
        .inquiryName.active{
            color:#333333;
        }
        .icon-arrow-right{
            position: absolute;
            right: .25rem;
            top: .4rem;
            color:#cacaca;
            cursor: pointer;
        }
    }
    .hospitalTag{
        padding:0 .2rem;
        .box{
            display: flex;
            justify-content:space-between;
            width: 100%;
            height: 1.03rem;
            padding:0 .3rem;
            border-radius: .24rem;
            background-color: rgba(72,205,187,.18);
            li{
                line-height:1.03rem;
                color:#5a5a5a;
                font-size:.24rem;
                img{
                    display: inline-block;
                    width: .34rem;
                    height: .4rem;
                    vertical-align:middle;
                    margin-right: .15rem;
                }
            }
        }
    }
    .disease{
        margin: .2rem 0;
        padding:0 .3rem;
        min-height: 2.75rem;
        background-color: #fff;
        overflow: hidden;
        .title{
            line-height: .88rem;
            border-bottom: 1px solid #f5f5f5;
            font-size: .28rem;
            overflow: hidden;
            >span{
                color: #bbb;
            }
        }
    }
    .disease-ask{
        .label-list{
            padding-top: .3rem;
            height: 1.78rem;
            overflow: hidden;
            .label-item{
                display: inline-block;
                margin: 0 .1rem .2rem 0;
                padding:0 .2rem;
                height: .54rem;
                line-height: .54rem;
                font-size: .26rem;
                color: #898989;
                border: 1px solid #eaeaea;
                border-radius: .4rem;
                cursor: pointer;
                &.active{
                    border-color: #48cdbb;
                    color: #48cdbb;
                }
            }
        }
    }
    .disease-desc{
        margin-bottom: 0;
        min-height: 6rem;
        .weui-cells{
            margin-top: 0;
        }
        .weui-cells:before,
        .weui-cells:after{
            display: none;
        }
        .weui-cell{
            padding: 10px 0;
            font-size: .28rem;
            .weui-textarea-counter{
                font-size:.26rem;
                color:#d4d4d4;
            }
        }
        .weui-textarea{
            line-height: .5rem;
        }
        .pic{
            margin-top: .2rem;
        }

    }
    .footer-operate{
        margin-bottom:.6rem;
        .flex_align_hv(center);
        background: #fff;
        .btn{
            display: block;
            width: 6.64rem;
            height: .79rem;
            line-height: .79rem;
            text-align: center;
            font-size: .32rem;
            color: #fff;
            border-radius: .4rem;
            background: #48cdbb;
            cursor: pointer;
            letter-spacing:.032rem;
        }
    }

        .weui-textarea::-webkit-input-placeholder{
        color:#dadada;
        }
        .weui-textarea:-moz-placeholder{
        color:#dadada;
        }
        .weui-textarea::-moz-placeholder{
        color:#dadada;
        }
        .weui-textarea:-ms-input-placeholder{
        color:#dadada;
        }
}
</style>
