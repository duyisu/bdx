<template lang="html">
    <div id="inputinfo">
        <div class="textBox">
            <textarea @input="ifHasContent" id="text" :placeholder="inputMsg"></textarea>
            <img @click="clearText" v-show="showIcon" src="../../common/images/departmentlist/closeIcon.png" alt="" />
        </div>
        <p @click="saveHandle" class="save">保存</p>
        <toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import { Toast } from 'vux'
//textarea自动撑开高度的方法
// import autosize from 'autosize';


export default {
    beforeRouteEnter(to,from,next){
        /*
        1代表预约信息中的  疾病信息   填写

        2代表身份证号填写(字段名字：ID_no)
            (字段名字：sex 0未知  1男 2女)
            (字段名字：age 年龄)
        3代表手机号码(字段名字：mobile)
            (字段名字：code 短信验证码)
        4代表真是姓名(字段名字：realname)

        5代表会员卡号

        6代表输入详细地址
        */
        let val = parseInt(to.query.val);
        next((vm)=>{
            vm.doctor_id = to.query.doctor_id;
            vm.depart_id = to.query.depart_id;
            vm.type = to.query.type;
            vm.s_date = to.query.s_date;
            vm.s_time = to.query.s_time;
            vm.addressId = to.query.addressId;
            vm.id = to.query.id ? to.query.id : '';
            switch(val){
                case 1:
                    window.document.title = vm.inputMsg = '请填写疾病信息';
                break;
                case 4:
                    window.document.title = vm.inputMsg = '请填写就诊人姓名';
                break;
                case 2:
                    window.document.title = vm.inputMsg = '请填写就诊人身份证号';
                break;
                case 3:
                    window.document.title = vm.inputMsg = '请填写就诊人手机号码';
                break;
                case 5:
                    window.document.title = vm.inputMsg = '请填写就诊人会员卡号';
                break;
                case 6:
                    window.document.title = vm.inputMsg = '请填写详细地址';
                break;
                default:
                    window.document.title = vm.inputMsg = '请输入信息';
            }
            
            vm.receiveNum = parseInt(val);
        })
    },
    data(){
        return {
            msg:'',
            showToast:false,
            position:'middle',  //top,middle,bottom
            receiveNum:-1, //接受从其他页面来的信息
            showIcon:false,
            inputMsg:'',
            doctor_id:'',
            depart_id:'',
            type:'',
            s_date:'',
            s_time:'',
            id:'',
            addressId:''
        }
    },
    computed:{
        ...mapState({
            ID_no:state => state.addPatient.ID_no,
            mobile:state => state.addPatient.mobile,
            realname:state => state.addPatient.realname,
            sex:state => state.addPatient.sex,
            age:state => state.addPatient.age,
            code:state => state.addPatient.code,
            diseaseInfo:state => state.addPatient.diseaseInfo
        })
    },
    mounted(){
        // autosize(document.querySelector('#text'));
        document.querySelector('#text').focus();
    },
    methods:{
        clearText(){
            document.querySelector('#text').value = '';
            // document.querySelector('#text').style.height = '41px';
            
        },
        ifHasContent(){
            if(document.querySelector('#text').value.length){
                this.showIcon = true;
            }else{
                this.showIcon = false;
            }
        },
        saveHandle(){
            let cardReg = /^[0-9A-Za-z]{8,16}$/; //卡后验证
            let myreg=/^[1][0-9]{10}$/; //手机号验证
            let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  //身份证前端简单验证下
            
            let content = document.querySelector('#text').value.trim();
            
           
            if(this.receiveNum == 1){
                if(content != '' && content.length <= 200){
                    this.$store.commit('changeVal',{
                        field:'diseaseInfo',
                        val:content
                    });
                }else{
                    this.msg = '请输入200字内疾病信息';
                    this.showToast = true;
                    return false;
                }
            }

            //添加就诊人
            if(this.receiveNum == 4){
                if(content != '' && content.length <= 10){
                    this.$store.commit('changeVal',{
                        field:'realname',
                        val:content
                    });
                }else{
                    this.msg = '请输入10位以内字符';
                    this.showToast = true;
                    return false;
                }
            }

            //身份证号
            if(this.receiveNum == 2){
                if(regIdNo.test(content)){
                    this.$store.commit('changeVal',{
                        field:'ID_no',
                        val:content
                    });
                }else{
                    this.msg = '请输入有效的18位身份证号码';
                    this.showToast = true;
                    return false;
                }
            }

            //手机号码
            if(this.receiveNum == 3){
                if(myreg.test(content)){
                    this.$store.commit('changeVal',{
                        field:'mobile',
                        val:content
                    });
                }else{
                    this.msg = '请输入有效的11位手机号码';
                    this.showToast = true;
                    return false;
                }
            }

            //卡号
            if(this.receiveNum == 5){
                if(content != '' && cardReg.test(content)){
                    this.$store.commit('changeVal',{
                        field:'card_number',
                        val:content
                    });
                    this.$router.push({
                        path:"/bindvipcard",
                        query:{
                            doctor_id:this.doctor_id,
                            depart_id:this.depart_id,
                            s_date:this.s_date,
                            s_time:this.s_time,
                            type:this.type
                        }
                    });
                    return false;
                }else{
                    this.msg = '请输入有效的会员卡号';
                    this.showToast = true;
                    return false;
                }
            }

            if(this.receiveNum == 6){
                if(content != ''){
                    this.$store.commit('changeVal',{
                        field:'addressDetail',
                        val:content
                    });
                    this.$router.push({
                        path:"/setvipcard",
                        query:{
                            addressId:this.addressId
                        }
                    });
                    return false;
                }else{
                    this.msg = '请输入详细地址';
                    this.showToast = true;
                    return false;
                }
            }

            
            if(this.receiveNum == 1){
                if(this.id){
                    this.$router.push({
                        path:'/appointinfo',
                        query:{
                            doctor_id:this.doctor_id,
                            depart_id:this.depart_id,
                            s_date:this.s_date,
                            s_time:this.s_time,
                            type:this.type,
                            id:this.id
                        }
                    });
                }else{
                    this.$router.push({
                        path:'/appointinfo',
                        query:{
                            doctor_id:this.doctor_id,
                            depart_id:this.depart_id,
                            s_date:this.s_date,
                            s_time:this.s_time,
                            type:this.type
                        }
                    });
                }
            }else{
                this.$router.push({
                    path:"/addPatient",
                    query:{
                        doctor_id:this.doctor_id,
                        depart_id:this.depart_id,
                        s_date:this.s_date,
                        s_time:this.s_time,
                        type:this.type
                    }
                });
            }
            
        }
    },
    components:{
        Toast
    }
}
</script>

<style lang="less">

#inputinfo{
    box-sizing: border-box;
    padding-top:.3rem;
}
#inputinfo .save{
    position:fixed;
    bottom:.5rem;
    left:50%;
    margin-left:-3.45rem;
    width: 6.9rem;
    height: .92rem;
    line-height:.92rem;
    font-size: .36rem;
    font-weight: 500;
    letter-spacing: 0.029rem;
    text-align: center;
    color: #ffffff;
    opacity: 0.99;
    border-radius: .46rem;
    background-image: -moz-linear-gradient(319deg, #53dfc6, #c3ffe4);
    background-image: -o-linear-gradient(319deg, #53dfc6, #c3ffe4);
    background-image: -webkit-linear-gradient(319deg, #53dfc6, #c3ffe4);
    background-image: linear-gradient(319deg, #53dfc6, #c3ffe4);
}

#inputinfo .textBox{
    width:6.9rem;
    margin:0 auto;
    overflow: hidden;
    position:relative;
}
#inputinfo .textBox textarea{
    border:none;
    border-radius: .08rem;
    width:100%;
    height:2rem;
    box-sizing: border-box;
    padding:.15rem 1rem .15rem .3rem ;
    font-size: .28rem;
    font-weight: 500;
    color: #898989;
    letter-spacing: 0.006rem;
    resize:none;
    display:inline-block;
}
#inputinfo .textBox img{
    position:absolute;
    right:.3rem;
    top:.15rem;
    width:.36rem;
    height:.36rem;
}


#text::-webkit-input-placeholder{
    color:#d4d4d4;
}
#text:-moz-placeholder{
    color:#d4d4d4;
}
#text::-moz-placeholder{
    color:#d4d4d4;
}
#text:-ms-input-placeholder{
    color:#d4d4d4;
}

</style>
