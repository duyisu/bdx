<template lang="html">
	<div id="appointinfo">
		<div>
			<div class="ai_header">
				
				<div class="ai_info">
					<p>
						<span>挂号科室：</span>
						<i>{{ appointInfo.depart_name }}</i>
					</p>
					<p>
						<span>医生姓名：</span>
						<i>{{ appointInfo.name }}</i>
					</p>
					<p>
						<span>门诊时间：</span>
						<i class="time">{{ appointInfo.btime }} </i>
					</p>
					<p>
						<span>门诊类型：</span>
						<i>专家门诊</i>
					</p>
					<p>
						<span>挂号费用：</span>
						<i style="color:#fe583d;">
							<span class="v_price" v-if='notvip'><em class='price'>￥{{ appointInfo.price }}</em>(非会员)</span>
							<span class="v_price" v-if='vip'><em class='price'>￥{{ appointInfo.vip_price }}</em>(会员)</span>
						</i>
					</p>
				</div>
			</div>
		</div>
		<div>
			<ul class="ai_bottom">
				<li class="clearfix">
					<span>就诊人</span>
					<span @click="choosePatient">
						<input ref="patient" readonly="readonly" type="text" name="" placeholder="请填写" :value="whoPatients.realname ? whoPatients.realname : ''">
						<img src="../../common/images/departmentlist/arrowIcon.png" alt="" />
					</span>
				</li>
				<li class="clearfix" v-if='whoPatients.type === 9 || whoPatients.type === 8'>
					<span>会员卡</span>
					<span>
						<input ref="vipcard" readonly="readonly" type="text" name="" placeholder="请填写" :value="whoPatients.card_number ? whoPatients.card_number : '暂无' ">
						
					</span>
				</li>
				
			</ul>
		</div>
		<div class="ai_rule">
			<p>
				<img :src='isAgree == 1 ? agreeImg :agreeImg_before' alt="" class="agreeImg" @click='agreeStatus'><span @click="openHandle">我已了解并同意以下规则 <img :style="{'transform': open ? 'rotate(180deg)' : 'rotate(0deg)'}" src="../../common/images/departmentlist/down.png" alt="" /></span>
				
			</p>
			<div :style="{'height': open ? 'auto' : '0','padding-bottom': open ? '.38rem' : '0'}">
				<p><span style="margin-right:.04rem">1.</span>  微信公众号挂号时间：周一至周日 8:30-12:00    14：00-17：30，暂不支持当日挂号</p>
				<p><span style="margin-right:.04rem">2.</span> 微信预约挂号需实名验证（姓名、性别、出生年月日、身份证件号、联系方式）</p>
				<p><span style="margin-right:.04rem">3.</span> 一经挂号成功，恕无法办理退费，请慎重考虑</p>
				<p><span style="margin-right:.04rem">4.</span> 提前10-15分钟到院办理就诊手续</p>
			</div>
		</div>
		<div class="writeDisease">
			<p class="hd">描述您的病情症状</p>
			<div class="content">
				
				<textarea class="text" name="" id="" cols="30" rows="10" placeholder="详细描述您的病情症状, 最少10个字。" v-model='fontNum' maxlength="100"></textarea>
				<span class="sum">{{fontSum}}/100</span>
				
			</div>
		</div>
		
		<p class="sumbitInfo" @click="submitAppoint">提交</p>
		<toast v-model="showToast" type="text" :time="1000" :position="position">{{ msg }}</toast>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { Toast, TransferDom } from 'vux';
import { setStore,getStore,removeStore } from '@common/js/mUtils.js';
import axios from 'axios';
import http from '@common/js/http.js';


export default {
	directives: {
		TransferDom,
	},
	beforeRouteEnter(to,from,next){
	   	next((vm)=>{
			vm.doctor_id = to.query.doctor_id;
	   		vm.depart_id = to.query.depart_id;
	   		vm.type = to.query.type;
	   		vm.s_date = to.query.s_date;
	   		vm.s_time = to.query.s_time;
	        vm.id = to.query.id ? to.query.id : '';
	        //vm.vipStatus = to.query.vipStatus;
	        vm.doctorName = to.query.doctor_name;

	   	});
	   },
	created() {
		var that = this
		if (this.$route.query) {
			this.doctor_id = this.$route.query.doctor_id;
			this.depart_id = this.$route.query.depart_id;
			this.type = this.$route.query.type;
			this.s_date = this.$route.query.s_date;
			this.id = this.$route.query.id ? this.$route.query.id : '';
			this.member_id = this.$route.query.member_id;
		}
	},
	data() {
		return {
			msg: '',
			showToast: false,
			position: 'middle', //top,middle,bottom
			open: false, //规则展开闭合
			mask: false, //弹窗展开收缩
			doctor_id: '',
			depart_id: '',
			s_time:'',
			type: '',
			s_date: '',
			appointInfo: {},
			job: '',
			practice: '',
			id: '',
			whoPatients: {},
			// 临时：疾病详情
			tmplDiseaseDesc: '',
			showDiseDescLayer: false,
            errorImg: 'this.src="' + require('../../common/images/avatar.png') + '"',
            doctorName:'',
            fontNum: '',
            fontSum: 0,
            vipStatus:false,
            agreeImg_before:require('../../common/images/departmentlist/agreeBefore.png'),
            agreeImg:require('../../common/images/departmentlist/agree.png'),
            isAgree:'0',
            vip:true,
            notvip:true,
            member_id:'',
            showToast:false,
            position:'middle',

		};
	},
	computed: {
		...mapState({
			ID_no: state => state.addPatient.ID_no,
			mobile: state => state.addPatient.mobile,
			realname: state => state.addPatient.realname,
			sex: state => state.addPatient.sex,
			age: state => state.addPatient.age,
			code: state => state.addPatient.code,
			firstOrsecond: state => state.addPatient.firstOrsecond,
			diseaseInfo: state => state.addPatient.diseaseInfo,
		}),
	},
	watch:{
		fontNum(val){
			var len = val.split('').length;
			if(len < 100){
				this.fontSum = len;
			}else{
				this.fontSum = 100;
				return
			}
			
		},

	},
	mounted() {
		this.$nextTick(function() {
			setTimeout(() => {
				axios
					.all([this.getAppointInfo(), this.getPatientList()])
					.then(
						axios.spread((res1, res2) => {

							this.appointInfo = res1;
							this.job = res1.job[0];
							this.practice = res1.practice[0];

							if (this.id) {
								let patientinfo = res2.filter(item => {
									return item.id == this.id;
								})[0];

								this.whoPatients = patientinfo;

								http
									.fetch('/api/doctors/get_reg_price', {
										doctor_id: this.doctor_id,
										reg_type: res1.reg_type,
										reg_type_vip: res1.reg_type_vip,
										patient_id: this.id,
									})
									.then(res => {
										this.appointInfo.price = res.fee;
									})
									.catch(err => {
                                        this.msg = err;
                                        this.showToast = true;
                                        return false;
									});
							}
						})
					)
					.catch(err => {
                        this.msg = err;
                        this.showToast = true;
                        
					});
			}, 16);
		});

		//this.isAgree = getStore('isAgree');
		if(this.$route.query.type){
			if(this.$route.query.type == 8 || this.$route.query.type == 9){
				
				this.notvip = false;
			}else{
				this.vip = false;
			}
		}
		if(getStore('isAgree')){
			this.isAgree = getStore('isAgree')
		}
		if(getStore('sayContent')){
			this.fontNum = getStore('sayContent')
		}
	},
	methods: {
		//点击切换同意状态
		agreeStatus(){
			if(this.isAgree == 0){
				this.isAgree = 1;
			}else{
				this.isAgree = 0;
			}
			
		},
		
		// 点击显示疾病弹出层
		onClickShowDiaseaseLayer() {
			this.showDiseDescLayer = true;
			
			this.tmplDiseaseDesc = this.diseaseInfo;
		},
		// 点击隐藏疾病弹出层
		onClickHideDiaseaseLayer() {
			this.showDiseDescLayer = false;
		},
		// 点击保存疾病详情信息
		onClickSaveDiseaseInfo() {
			if (this.tmplDiseaseDesc && this.tmplDiseaseDesc.length <= 200) {
				this.$store.commit('changeVal', {
					field: 'diseaseInfo',
					val: this.tmplDiseaseDesc,
				});
				this.onClickHideDiaseaseLayer();
			} else {
				this.msg = '请输入200字内疾病信息';
				this.showToast = true;
			}
		},
		getAppointInfo() {
			//提交预约信息  type预约类型（0-科室预约 1-门诊预约）
			return http.fetch('/api/doctors/registerInfo', {
				doctor_id: this.doctor_id,
				depart_id: this.depart_id,
				s_date: this.s_date,
				s_time: this.s_time,
				type: this.type,
			});
		},
		getPatientList() {
			return http.fetch('/api/user/patient_list');
		},
		openHandle() {
			this.open = !this.open;
		},
		showMask() {
			this.mask = !this.mask;
		},
		hideMask() {
			this.mask = !this.mask;
		},
		ZD(item) {
			if (item == 1) {
				this.$store.commit('changeVal', {
					field: 'firstOrsecond',
					val: '初诊',
				});
			} else if (item == 2) {
				this.$store.commit('changeVal', {
					field: 'firstOrsecond',
					val: '复诊',
				});
			}
			this.mask = !this.mask;
		},
		inputHandle(_index) {
			this.$router.push({
				path: '/inputinfo',
				query: {
					val: _index,
					doctor_id: this.doctor_id,
					depart_id: this.depart_id,
					s_date: this.s_date,
					s_time: this.s_time,
					type: this.type,
					id: this.id,
				},
			});
		},
		choosePatient() {
			setStore('isAgree',this.isAgree)
			setStore('sayContent',this.fontNum)
			this.$router.push({
				path: '/patientslist',
				query: {
					doctor_id: this.doctor_id,
					depart_id: this.depart_id,
					s_date: this.s_date,
					s_time: this.s_time,
					type: this.type,
				},
			});
		},
		submitAppoint() {
			let patient = this.$refs.patient.value;
			
			if (patient == '') {
				this.msg = '请选择就诊人';
				this.showToast = true;
				return false;
			}else if(this.isAgree == 0){
				alert('请先阅读规则并同意');
				return false
			}

			var access_token = getStore('access_token') || '';
			let parmas = {
				
			}
			
			http
				.post(`/api/doctors/submit_reg?access_token=${access_token}`, {
					doctor_id: this.doctor_id,
					depart_id: this.depart_id,
					patient_id: this.id,
					type: this.type,
					s_date: this.s_date,
					s_time: this.s_time

				})
				.then(res => {
					removeStore('isAgree');
                    removeStore('sayContent');
					window.localStorage.removeItem('dateTime');
					this.$router.push({
						path: '/ordersubmit',
						query: {
							id: this.id,
							ks: this.appointInfo.depart_name,
							appointTime: this.appointInfo.btime,
							fee: this.appointInfo.price,
							order_id: res.order_id,
							doctor_name:this.appointInfo.name,
							type:this.type
						},
					});
				})
				.catch((err) => {
					this.showToast = true;
					this.msg = err;
				});
		},
	},
	components: {
		Toast,
	},
};
</script>

<style lang="less">
#appointinfo{
	background: #f5f5f5;
	height:100%;
	overflow-x:hidden;
}
#appointinfo .writeDisease{
	margin-top: .2rem;
	.hd{
		padding-top: .29rem;
		padding-bottom: .32rem;
		border-bottom:.02rem solid #f2f2f2;
		text-align:left;
		font-size:.28rem;
		color:#333;
	}
	.content{
		position: relative;
		width: 100%;
		.sum{
			position: absolute;
			bottom: .39rem;
			right: .3rem;
			font-size:.28rem;
			color:#d4d4d4;
		}
		.text::-webkit-input-placeholder{
             color:#d4d4d4;
        }
        .text:-moz-placeholder{
             color:#d4d4d4;
        }
        .text::-moz-placeholder{
             color:#d4d4d4;
        }
        .text:-ms-input-placeholder{
             color:#d4d4d4;
        }

		.text{
			position: relative;
			display: block;
			width: 100%;
			height: 100%;
			border:none;
			padding-top: .3rem;
		}
	}
}
#appointinfo > #alertMask {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 1000;
}
#appointinfo #list {
	/*height:3.52rem;*/
	height: 0;
	width: 100%;
	transition: 0.6s;
	background: #fff;
	position: fixed;
	bottom: 0;
	border-radius: 0.1rem 0.1rem 0 0;
	z-index: 1001;
}
#appointinfo #list > li:nth-of-type(1) {
	font-size: 0.28rem;
	border-top: none;
	letter-spacing: 0.022rem;
	color: #bbbbbb;
}
#appointinfo #list > li:nth-of-type(4) {
	color: #bbbbbb;
}
#appointinfo #list > li {
	font-weight: 500;
	height: 0.89rem;
	line-height: 0.89rem;
	text-align: center;
	border-top: 0.02rem solid #f5f5f5;
	font-size: 0.36rem;
	letter-spacing: 0.029rem;
}

#appointinfo > div {
	width: 100%;
	padding-left:0.3rem;
	background-color: #ffffff;
}
#appointinfo > div:nth-of-type(2) {
	margin-top: 0.2rem;
}
#appointinfo .ai_user {
	padding: 0.3rem 0;
	border-bottom: 0.02rem solid #f5f5f5;
}
#appointinfo .ai_user > img {
	width: 1rem;
	height: 1rem;
	border-radius: 50%;
	vertical-align: middle;
}

#appointinfo .ai_doctor {
	margin-left: 0.16rem;
	display: inline-block;
	vertical-align: middle;
}
#appointinfo .ai_doctor > h5 {
	font-size: 0.32rem;
	font-weight: 500;
	color: #191919;
}
#appointinfo .ai_doctor > div {
	margin-top: 0.07rem;
	display: inline-block;
	font-size: 0.26rem;
	color: #898989;
}
#appointinfo .ai_info {
	padding: 0.15rem 0;
	border-bottom: 0.02rem solid #f5f5f5;
}
#appointinfo .ai_info > p {
	line-height: 0.58rem;
}
#appointinfo .ai_info > p span {
	display: inline-block;
	font-size: 0.28rem;
	font-weight: 500;
	letter-spacing: 0.006rem;
	text-align: left;
	color: #898989;
}
#appointinfo .ai_info > p span.v_price:nth-of-type(2){
	margin-left: .46rem;;
}
#appointinfo .ai_info > p i {
	display: inline-block;
	font-size: 0.28rem;
	font-weight: 500;
	letter-spacing: 0.006rem;
	text-align: left;
	color: #333;
}
#appointinfo .ai_info > p i .price{
	color:#48cdbb;
}
#appointinfo .ai_info > p i.time{
	color:#48cdbb;
}
#appointinfo .ai_info > p:nth-of-type(3) i {
	color: #48cdbb;
}

#appointinfo .ai_bottom > li span:nth-of-type(2) input {
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

#appointinfo .ai_rule {
	font-size: 0.28rem;
	font-weight: 500;
	text-align: left;
	color: #898989;
	margin-top: .2rem;
}
#appointinfo .ai_rule .agreeImg{
	position: absolute;
	top: 50%;
	left: 0;
	margin-top: -.16rem;
	display: inline-block;
	vertical-align:middle;
	width: .32rem;
	height: .32rem;
}
#appointinfo .ai_rule > p {
	padding-left: .52rem;
	position: relative;
	line-height: 0.86rem;
	display: inline-block;
}
#appointinfo .ai_rule p span {
	letter-spacing: 0.006rem;
	color:#333;
	font-size:.28rem;
}
#appointinfo .ai_rule p img {
	width: 0.3rem;
	margin-left: 0.06rem;
	display: inline-block;
	vertical-align: middle;
	margin-top: -0.03rem;
	transition:all 0s linear;
}
#appointinfo .ai_rule > div {
	overflow: hidden;
	transition: 0.4s;
	
}
#appointinfo .ai_rule > div > p {
	line-height: 0.4rem;
	font-size: 0.26rem;
	font-weight: 500;
	letter-spacing: 0.005rem;
	color: #898989;
	margin-bottom:.15rem;
}

#appointinfo .ai_bottom > li:nth-of-type(1) {
	border-top: none;
}
#appointinfo .ai_bottom > li {
	height: 0.86rem;
	line-height: 0.86rem;
	border-top: .02rem solid #f2f2f2;
	padding-right: .3rem;
}
#appointinfo .ai_bottom > li span:nth-of-type(1) {
	float: left;
	font-size: 0.28rem;
	font-weight: 500;
	letter-spacing: 0.006rem;
	color: #bbbbbb;
}
#appointinfo .ai_bottom > li span:nth-of-type(2) {
	float: right;
}
#appointinfo .ai_bottom > li span:nth-of-type(2) i {
	display: inline-block;
	font-size: 0.28rem;
	font-weight: 500;
	letter-spacing: 0.006rem;
	color: #d4d4d4;
	margin-right: 0.2rem;
}
#appointinfo .ai_bottom > li span:nth-of-type(2) img {
	display: inline-block;
	width: 0.13rem;
	height: 0.2rem;
}
#appointinfo > .sumbitInfo {
	font-size: 0.36rem;
	font-weight: 500;
	letter-spacing: 0.029rem;
	color: #ffffff;
	width: 6.9rem;
	height: 0.92rem;
	line-height: 0.92rem;
	opacity: 0.99;
	text-align: center;
	border-radius: 0.46rem;
	background-color: #48cdbb;
	margin:.5rem auto;
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
</style>

<style lang="less" scoped>
.m_dialog_mask {
	position: fixed;
	z-index: 2000;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
}
.m_dise_layer {
	position: fixed;
	z-index: 2001;
	left: 0.55rem;
	top: 50%;
	width: 6.4rem;
	background-color: #fff;
	border-radius: 0.1rem;
	transform: translateY(-50%);
	overflow: hidden;
}
.m_dise_form {
	padding: 0.24rem;

	.u_form_row {
		margin-bottom: 0.2rem;
	}
	.u_dise_detl {
		resize: none;
		width: 100%;
		height: 2rem;
		padding: 5px 7px;
		border-radius: 0.1rem;
		box-sizing: border-box;
	}
	.u_form_action {
	}
	.u_btn_save {
		width: 100%;
		height: 0.92rem;
		line-height: 0.92rem;
		font-size: 0.36rem;
		font-weight: 500;
		letter-spacing: 0.029rem;
		color: #fff;
		opacity: 0.99;
		text-align: center;
		border: 0;
		border-radius: 0.46rem;
		background-image: linear-gradient(319deg, #53dfc6, #c3ffe4);
	}
}
</style>
