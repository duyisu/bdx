<template lang="html">
    <div class="vipInfo">
        <ul>
            <li>
                <p>会员卡类型</p>
                <span v-if='info.type=== 9 && info.card_type === 2'>家庭会员卡(主卡)</span>
                <span v-if='info.type=== 9 && info.card_type === 3'>家庭会员卡(副卡)</span>
                <span v-if='info.type=== 8'>个人会员卡</span>
            </li>
            <li>
                <p>会员卡号</p>
                <span>{{info.card_number}}</span>
            </li>
            <li class="use_log">
                <p>头像</p>
                <span><img :src="info.image" alt=""></span>
            </li>
            <li>
                <p>微信</p>
                <span>{{info.wxname}}</span>
            </li>
            <li>
                <p>姓名</p>
                <span>{{info.realname}}</span>
            </li>
            <li>
                <p>性别</p>
                <span v-if='info.sex === 2'>女</span>
                <span v-if='info.sex === 1'>男</span>
            </li>
            <li class="time">
                <p>出生日期</p>
                <span>{{info.birthday}}</span>
            </li>
            <li>
                <p>身份证号</p>
                <span>{{info.ID_no}}</span>
            </li>
            <li>
                <p>绑定手机</p>
                <span>{{info.mobile}}</span>
            </li>
            <li class="adr">
                <p>地区</p>
                <span @click='toAddress' class="city on">{{info.province}} {{info.city}} {{info.area}} {{city}}<em>></em></span>
            </li>
            <li class="adr_del">
                <p>详细地址</p>
                <span><input type="text" placeholder="请输入详细地址" ref='adr' :value="info.address"></span>
            </li>
        </ul>
        <v-distpicker type="mobile" @selected='selected' v-show="addInp"></v-distpicker>
        <div class="sub" @click='addressSub'>提交</div>
        <toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
    </div>
</template>
<script>
    import http from '@common/js/http.js';
    import { changePageTitle } from '@common/js/mUtils';
    import VDistpicker from 'v-distpicker';
    import { Toast } from 'vux';
    export default{
        mounted(){
            changePageTitle('会员信息');
            this.id = this.$route.query.id
            http.fetch('api/user/card_detail',{id:this.id}).then((res)=>{
                this.info = res;
                if(res.province == ''){
                    this.city = '请选择'
                     $('.city').removeClass('on');
                }
            }).catch((err)=>{
                console.log(err);
            })
        },
        data(){
            return{
                city:'',
                addInp :false,
                mask:false,
                ID_no:'',
                id:'',
                info:{},
                showToast:false,
                position:'middle',  
                msg:'',
            }
        },
        methods:{
            toAddress(){
                if(this.addInp == false){
                    this.addInp = true;
                    $('body').addClass('on');
                    this.info.province = '';
                    this.info.city = '';
                    this.info.area = ''
                   
                }else{
                    this.addInp = false;
                }
                this.mask = true;
                
            },
             // 省市区三级联动
            selected(data){
                //this.mask =false;
                this.addInp = false;
                this.city = data.province.value + ' ' + data.city.value +' ' + data.area.value
            },
            addressSub(){
                var that = this;
                var adr = this.$refs.adr.value
                var province = this.city.split(' ')[0];
                var city = this.city.split(' ')[1];
                var area = this.city.split(' ')[2];
                http.fetch('/api/User/patient_address_save',{
                    id:this.id,
                    province:province,
                    city:city,
                    area:area,
                    address:adr
                }).then((res)=>{
                    this.showToast = true;
                    this.msg = '保存成功'
                    setTimeout(function(){
                        that.$router.push({
                            path:'vipcardContent',
                            query:{
                                id:that.id
                            }
                        })
                    },1000)
                }).catch((arr)=>{
                    this.showToast = true;
                    this.msg = '保存失败'
                })
            }
        },
        components:{
            VDistpicker
        }
    }
</script>
<style lang='less'>
    .vipInfo{
        background: #f2f2f2;
        height: 100%;
        ul{
            li{
                position: relative;
                background: #fff;
                padding:0 .3rem;
                p{
                    border-bottom:.02rem solid #f2f2f2;
                    line-height:.86rem;
                    text-align:left;
                    font-size:.28rem;
                    color:#898989;
                }
                span{
                    position: absolute;
                    right: .3rem;
                    top: 50%;
                    margin-top: -.14rem;
                    font-size:.28rem;
                    line-height:.28rem;
                    color:#b3b3b3;
                    em{
                        margin-left: .22rem;
                    }
                }
            }
            li.use_log{
                p{
                    line-height: 1.7rem;
                    margin-top: .2rem;
                }
                span{
                    display: block;
                    width: 1.1rem;
                    height: 1.1rem;
                    border-radius:100%;
                    overflow:hidden;
                    margin-top:-.5rem;
                    img{
                        display: block;
                        width: 100%;
                        height:100%;
                    }
                }
            }
            li.time,li.adr{margin-top: .2rem;}
            li.adr{
                span{
                    color:#d4d4d4;
                }
                span.on{
                    color:#5a5a5a;
                }
            }
            li.adr_del{
                span{
                    top: 0;
                    margin-top: 0;
                    input{
                        border:none;
                        height: .84rem;
                        text-align:right;
                        color:#5a5a5a;
                    }
                    input::-webkit-input-placeholder{
                        color:#d4d4d4;
                    }
                }
            }
        }
        .sub{
            width: 6.64rem;
            height: .79rem;
            border-radius: .395rem;
            text-align:center;
            line-height:.79rem;
            background: #48cdbb;
            font-size:.32rem;
            color:#fff;
            margin:0 auto;
            margin-top: .2rem;
        }
        
    }
    .distpicker-address-wrapper{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow:auto;
        height: 50%;
    }
</style>