<template lang="html">
    <div id="addpatient">
        <div>
            <ul class="apInfo">
                <li class="clearfix">
                    <span>医院</span>
                    <span>
                        <input readonly="readonly" type="text" name="" placeholder="请填写" value="北斗星耳鼻喉医院">
                    </span>
                </li>
                <li class="clearfix">
                    <span>姓名</span>
                    <span>
                        <input type="text" name="" placeholder="请填写" :value="realname" v-on:input="onInputChangeRealName($event.target.value)">
                        <img v-if="!realname" src="../../common/images/departmentlist/arrowIcon.png" alt=""/>
                    </span>
                </li>
                <li class="clearfix">
                    <span>身份证</span>
                    <span>
                        <input  type="text"   name="" placeholder="请填写" :value="ID_no" v-on:input="onInputChangeIDNo($event.target.value)">
                        <img v-if="!ID_no"  src="../../common/images/departmentlist/arrowIcon.png" alt="" />
                    </span>
                </li>
                <li class="clearfix">
                    <span>手机号</span>
                   
                    <template v-if="this.$route.params.realname ? true : false">
                        <span>
                            <input  type="tel" name="" placeholder="请填写" :value="mobile" v-on:input="onInputChangeMobile($event.target.value)">
                            <img v-if="!mobile" src="../../common/images/departmentlist/arrowIcon.png" alt="" />
                        </span>
                    </template>
                </li>
                <li class="mobileCode clearfix">
                    <span>验证码</span>
                    <span>
                        <input ref="vertifyCode" class="mobileText" placeholder="请输入验证码" type="tel" v-model="messagecode" />
                        <i class="split-line"></i>
                        <i :class="{messageCode:getCode}"
                        @click="getMessgeCode" >获取验证码</i>
                    </span>
                </li>
            </ul>
        </div>
        <!-- <div>
            <ul class="apInfo">
                <li class="clearfix">
                    <span>绑定会员卡</span>
                    <span>

                        <span v-if="!isBindings"  @click="isBindingsChange(true)"       class="iscard radio"></span>
                        <span v-if="isBindings"  @click="isBindingsChange(false)"   class="selected iscard radio"></span>

                    </span>
                </li>
                <li class="clearfix" v-if="isBindings">
                    <span>卡号</span>
                    <span>
                        <input ref="vipcard" type="text" name="" placeholder="请填写" :value="card_number" v-on:input="onInputChangeCardNumber($event.target.value)">
                        <img v-if="!card_number" src="../../common/images/departmentlist/arrowIcon.png" alt="" />
                    </span>
                </li>
            </ul>
            <div class="cardDemo" v-if="isBindings">
                <div>
                    <img @click.prevent="" src="../../common/images/departmentlist/democard.png">
                </div>
                <p @click="openCard">暂无会员卡？立即开通</p>
            </div>
        </div> -->
        <p @click="saveInfo" class="sumbitInfo">保存</p>
        <toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import http from '@common/js/http.js';
import { Toast } from 'vux';
import { getStore, setStore, changePageTitle } from '@common/js/mUtils';

let myreg = /^[1][0-9]{10}$/; //手机号验证
let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证前端简单验证下
let cardReg = /^[0-9A-Za-z]{8,16}$/; //卡后验证

export default {
	data() {
		return {
			showToast: false,
			position: 'middle', //top,middle,bottom
			msg: '提示信息',
			getCode: true,
			messagecode: '',
			// 是否绑定会员卡
			isBindings: false,
            disableSubmit: false
			// doctor_id:'',
			// depart_id:'',
			// type:'',
			// s_date:'',
			// s_time:'',
			// buycardid:''
		};
	},
	watch: {
		messagecode() {
			//短信验证码
			this.$store.commit('changeVal', {
				field: 'code',
				val: this.messagecode,
			});
		},
	},
	created() {
		if (this.$route.params.realname && this.$route.params.realname != '') {
			//如果是修改病人信息
			changePageTitle('编辑就诊人');
			let id = this.$route.params.id;
			let ID_no = this.$route.params.ID_no;
			let mobile = this.$route.params.mobile;
			let realname = this.$route.params.realname;
            let card_number = this.$route.params.card_number || '';
			let card_type = this.$route.params.card_type;

			this.$store.commit('changeVal', {
				field: 'patientId',
				val: id,
			});

			this.$store.commit('changeVal', {
				field: 'ID_no',
				val: ID_no,
			});

			this.$store.commit('changeVal', {
				field: 'mobile',
				val: mobile,
			});

			this.$store.commit('changeVal', {
				field: 'realname',
				val: realname,
			});

			this.$store.commit('changeVal', {
				field: 'card_number',
				val: card_number,
            });
            // 目前接受到的 card_type 或 card_number 都是空
            this.isBindings = card_type > 0;
		}
	},
	computed: {
		...mapState({
			patientId: state => state.addPatient.patientId,
			ID_no: state => state.addPatient.ID_no,
			mobile: state => state.addPatient.mobile,
			realname: state => state.addPatient.realname,
			card_number: state => state.addPatient.card_number,
			sex: state => state.addPatient.sex,
			age: state => state.addPatient.age,
			code: state => state.addPatient.code,
		}),
	},
	methods: {


        isBindingsChange(value){
            this.isBindings =value;
        },
		__changeInputValue(field, value) {
			this.$store.commit('changeVal', {
				field: field,
				val: value,
			});
		},
		onInputChangeRealName(value) {
			this.__changeInputValue('realname', value);
		},
		onInputChangeIDNo(value) {
			this.__changeInputValue('ID_no', value);
		},
		onInputChangeMobile(value) {
			this.__changeInputValue('mobile', value);
		},
		onInputChangeCardNumber(value) {
			this.__changeInputValue('card_number', value);
		},
		openCard() {
			this.$router.push('/opencard');
		},
		saveInfo(e) {
            if(this.disableSubmit){
                return false;
            }
			//保存所有信息
			if (!this.realname || this.realname.length > 10) {
				this.msg = '请填写10位以内姓名';
				this.showToast = true;
				return false;
			}

			if (!this.ID_no || !regIdNo.test(this.ID_no)) {
				this.msg = '请输入有效的18位身份证号码';
				this.showToast = true;
				return false;
			}

			if (!this.mobile || !myreg.test(this.mobile)) {
				this.msg = '请输入有效的11位手机号码';
				this.showToast = true;
				return false;
			}

			if (!this.$refs.vertifyCode.value) {
				this.msg = '请输入验证码';
				this.showToast = true;
				return false;
			}

			// var bind_card = 0;
			// var card_number = '';
			// if (this.isBindings) {
			// 	if (!this.$refs.vipcard.value || !cardReg.test(this.$refs.vipcard.value)) {
			// 		this.msg = '请输入有效的会员卡号';
			// 		this.showToast = true;
			// 		return false;
			// 	}
   //              bind_card = 1;
   //              card_number = this.$refs.vipcard.value;
			// }

			let access_token = getStore('access_token');

            this.disableSubmit = true;
			
			http
				.post(`/api/user/patient_save?access_token=${access_token}`, {
					id: this.patientId,
					ID_no: this.ID_no,
					mobile: this.mobile,
					realname: this.realname,
					code: this.$refs.vertifyCode.value,
					//bind_card: bind_card,
					//card_number: card_number,
				})
				.then(res => {

                this.$router.back()
                this.disableSubmit = false;
					
				})
				.catch(err => {
					this.msg = err;
					this.showToast = true;
                    this.disableSubmit = false;
				});
			
		},
		getMessgeCode($event) {
			let myreg = /^[1][0-9]{10}$/; //手机号验证

			if (!myreg.test(this.mobile)) {
				this.msg = '请输入有效的11位手机号码';
				this.showToast = true;
				return false;
			}

			
				
				if (this.getCode) {
					this.getCode = false;
					var seconds = 60;
					var timer = null;
					$event.target.innerHTML = seconds + '秒后重新获取';
					timer = setInterval(() => {
						seconds--;
						$event.target.innerHTML = seconds + '秒后重新获取';

						if (seconds == 0) {
							clearInterval(timer);
							$event.target.innerHTML = '获取验证码';
							this.getCode = true;
						}
					}, 1000);

					http
						.fetch('/api/user/send_sms_code', {
							mobile: this.mobile,
						})
						.then(res => {
							this.msg = res;
							this.showToast = true;
						})
						.catch(err => {
							this.msg = err;
							this.showToast = true;
						});
				}
			
		},
		bindCard() {
			this.$store.commit('changeVal', {
				field: 'code',
				val: this.$refs.vertifyCode.value,
			});
			this.$router.push({
				path: '/bindvipcard',
				query: {
					doctor_id: this.doctor_id,
					depart_id: this.depart_id,
					s_date: this.s_date,
					s_time: this.s_time,
					type: this.type,
				},
			});
		},
	},
	components: {
		Toast,
	},
};
</script>

<style lang="less">
#addpatient > div {
	width: 100%;
	padding: 0 0.3rem;
	background-color: #ffffff;
}
#addpatient > div:nth-of-type(2) {
	margin-top: 0.2rem;
}
#addpatient .apInfo > li:nth-of-type(1) {
	border-top: none;
}
#addpatient .apInfo > li {
	height: 1.08rem;
	line-height: 1.08rem;
	border-top: 0.02rem solid #f5f5f5;
}

#addpatient .apInfo > .bindVipCard {
	line-height: inherit;
}

#addpatient .apInfo > .bindVipCard span:nth-of-type(1) {
	margin-top: 0.3rem;
}

#addpatient .apInfo > li span:nth-of-type(1) {
	float: left;
	font-size: 0.28rem;
	font-weight: 500;
	letter-spacing: 0.006rem;
	color: #898989;
}
#addpatient .apInfo > li span:nth-of-type(2) {
	float: right;
}
#addpatient .apInfo > li span:nth-of-type(2) i {
	display: inline-block;
	font-size: 0.28rem;
	font-weight: 500;
	letter-spacing: 0.006rem;
	color: #d4d4d4;
	margin-right: 0.2rem;
}

#addpatient .apInfo > li span:nth-of-type(2) input {
	height: 0.8rem;
	width: 4rem;
	margin-right: 0.3rem;
	text-align: center;
	border: none;
	color: #191919;
	font-weight: 500;
	font-size: 0.28rem;
	text-align: right;
}
#addpatient .apInfo > .mobileCode span:nth-of-type(2) .mobileText {
	height: 0.8rem;
	width: 2rem;
	margin-right: 0.3rem;
	text-align: center;
	border: none;
	color: #191919;
	font-weight: 500;
	font-size: 0.28rem;
	text-align: center;
}
#addpatient .apInfo > .mobileCode  .split-line{
    margin-right: 0.3rem;
    display: inline-block;
    width: .02rem;
    height: .3rem;
    border-radius: 1px;
    background-color: #f5f5f5;
    vertical-align: middle;
}

#addpatient .apInfo > li span:nth-of-type(2) img {
	display: inline-block;
	width: 0.13rem;
	height: 0.2rem;
}

#addpatient .vipCardImg > img {
	width: 0.4rem;
	height: 0.32rem;
	display: inline-block;
	vertical-align: middle;
}

#addpatient .apInfo > .vipCardImg span:nth-of-type(1) {
	float: none;
	display: inline-block;
	vertical-align: middle;
	margin-left: 0.18rem;
}

#addpatient .messageCode {
	color: #66e4cc !important;
}

#addpatient > .sumbitInfo {
	position: fixed;
	bottom: 0.5rem;
	left: 50%;
	margin-left: -3.45rem;
	width: 6.9rem;
	height: 0.92rem;
	line-height: 0.92rem;
	font-size: 0.36rem;
	font-weight: 500;
	letter-spacing: 0.029rem;
	text-align: center;
	color: #ffffff;
	opacity: 0.99;
	border-radius: 0.46rem;
    background: #48cdbb;
}

input::-webkit-input-placeholder {
	color: #d4d4d4;
}
input:-moz-placeholder {
	color: #d4d4d4;
}
input::-moz-placeholder {
	color: #d4d4d4;
}
input:-ms-input-placeholder {
	color: #d4d4d4;
}

#addpatient .weui-cell__bd {
	display: none;
}
#addpatient .weui-switch:checked,
#addpatient .weui-switch-cp__input:checked ~ .weui-switch-cp__box {
	border-color: #66e4cc;
	background-color: #66e4cc;
}

#addpatient .cardDemo {
	border-top: 0.03rem solid #f5f5f5;
	padding-bottom: 1.8rem;
}
#addpatient .cardDemo div {
	margin: 0 auto;
	width: 6.33rem;
	height: 4.28rem;
	overflow: hidden;
}
#addpatient .cardDemo div img {
	width: 100%;
}
#addpatient .cardDemo p {
	font-size: 0.279rem;
	font-weight: 500;
	font-style: normal;
	line-height: normal;
	letter-spacing: 0.006rem;
	text-align: center;
	color: #66e4cc;
}
#addpatient .apInfo > li span:nth-of-type(2) input.u_chb {
	width: auto;
	vertical-align: middle;
}
#addpatient .radio {
    background-image: url("../../common/images/noSelect.png");
    background-size: 100% 100%;
    width:22px;
    height: 22px;
    float: right;
    margin-top: 10px;


}
#addpatient .selected{

    background-image: url("../../common/images/selected.png") !important;
}
</style>
