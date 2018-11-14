<template lang="html">
	<div id="setVipCard">
		<div>
			<p style="border:none;" class="clearfix">
				<span style="margin-top:.45rem;" class="fl">头像</span>
				<span class="fr">
					<img class="headImg" :src="vipCard.image" />
					<!-- <img class="headImg" src="../../common/images/departmentlist/doctor.jpg" > -->
				</span>
			</p>
		</div>
		<div>
			<p class="clearfix">
				<span class="fl">会员卡类型</span>
				<span class="fr"> {{ vipCard.type==6 ? '家庭会员卡' : '个人会员卡'  }} 
					<i v-if="vipCard.type==6 ? true : false">
						{{ vipCard.card_type == 2 ? '（主卡）' : '（副卡）' }}
					</i>
				</span>
			</p>
			<p style="border:none;" class="clearfix">
				<span class="fl">会员卡号</span>
				<span class="fr">{{ vipCard.card_number }}</span>
			</p>
		</div>
		<div>
			<p class="clearfix">
				<span class="fl">姓名</span>
				<span class="fr">{{ vipCard.realname }}</span>
			</p>
			<p class="clearfix">
				<span class="fl">性别</span>
				<span class="fr">{{ vipCard.sex == 1 ? "男" : "女" }}</span>
			</p>
			<p class="clearfix">
				<span class="fl">出生日期</span>
				<span class="fr">{{ vipCard.birthday }}</span>
			</p>
			<p style="border:none;" class="clearfix">
				<span class="fl">身份证号</span>
				<span class="fr">{{ vipCard.ID_no }}</span>
			</p>
		</div>

		<div>
			<p style="border:none;" class="clearfix">
				<span class="fl">绑定手机</span>
				<span class="fr">{{ vipCard.mobile  }}</span>
			</p>
		</div>

		<div>
			<p class="clearfix">
				<span class="fl">地区</span>
				<span @click="logShow" class="fr">
					<input class="section" type="text" :value="allInfo" readonly="readonly" placeholder="请选择" name="">
					<img class="arrow" src="../../common/images/departmentlist/arrowIcon.png" >
				</span>
			</p>
			<p style="border:none;" class="clearfix">
				<span class="fl">详细地址</span>
				<span class="fr">
					<input class="detailAddress" type="text" :value="addressDetail"  v-on:input="onInputChangeAddrDetail($event.target.value)" placeholder="请输入详细地址" name="">
				</span>
			</p>
		</div>
		
		<i @click="save" class="save">保存</i>
		<x-address 
		:hide-district="false"
		@on-hide="logHide" 
		@on-show="logShow" 
		v-model="vals" 
		title="选择地址"
		:list="addressData" 
		@on-shadow-change="onShadowChange" 
		placeholder="请选择地址" 
		:show.sync="showAddress">
		</x-address>
		<toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import http from '@common/js/http.js';
import { Toast, XAddress, ChinaAddressData } from 'vux';

export default {
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.addressId = to.query.addressId;
		});
	},
	data() {
		return {
			msg: '',
			showToast: false,
			position: 'middle', //top,middle,bottom
			btnStatus: false,
			count: 0,
			showAddress: false,
			vals: [],
			allInfo: '',
			transformVal: '',
			addressData: ChinaAddressData,
			addressId: '',
			vipCard: {},
		};
	},
	computed: {
		...mapState({
			addressDetail: state => state.addPatient.addressDetail,
		}),
	},
	mounted() {
		this.$nextTick(function() {
			setTimeout(() => {
				this.getVipDetail()
					.then(res => {
						this.vipCard = res;
						if (res.province != '') {
							this.allInfo = `${res.province}-${res.city}-${res.area}`;
						}
						this.$store.commit('changeVal', {
							field: 'addressDetail',
							val: res.address,
						});
					})
					.catch(err => {});
			}, 16);
		});
	},
	methods: {
		__changeInputValue(field, value) {
			this.$store.commit('changeVal', {
				field: field,
				val: value,
			});
		},
		onInputChangeAddrDetail(value) {
			this.__changeInputValue('addressDetail', value);
		},
		saveAddress() {
			return http.post('/api/user/patient_address_save', {
				id: this.addressId,
				province: this.allInfo.split('-')[0],
				city: this.allInfo.split('-')[1],
				area: this.allInfo.split('-')[2],
				address: this.addressDetail,
			});
		},
		getVipDetail() {
			return http.fetch('/api/user/card_detail', {
				id: this.addressId,
			});
		},
		save() {
			if (this.allInfo != '') {
				this.saveAddress()
					.then(res => {
						console.log(res);
						this.$router.push({
							path: '/vipdetail',
							query: {
								id: this.addressId,
							},
						});
					})
					.catch(err => {
						console.log(err);
					});
			} else {
				this.msg = '请选择地区';
				this.showToast = true;
			}
		},
		logHide(closeType) {
			if (closeType) {
				this.allInfo = this.transformVal;
				console.log('确定按钮');
			} else {
				console.log('取消按钮');
			}
		},
		logShow() {
			this.showAddress = true;
		},
		onShadowChange(val, names) {
			this.transformVal = names[0] + '-' + names[1] + '-' + names[2];
		},
		goInput(_index) {
			//这个地方传个参数带到inputinfo页面去，来判断是填写什么内容的
			this.$router.push({
				path: '/inputinfo',
				query: {
					addressId: this.addressId,
					val: _index,
				},
			});
		},
	},
	components: {
		XAddress,
		Toast,
	},
};
</script>

<style lang="less">
#setVipCard {
	overflow: hidden;
}
#setVipCard > div:nth-of-type(1) {
	margin-top: 0;
}
#setVipCard > div {
	padding: 0 0.3rem;
	background: #fff;
	margin-top: 0.2rem;
}
#setVipCard p {
	padding: 0.3rem 0;
	border-bottom: 0.02rem solid #f5f5f5;
}
#setVipCard p span:nth-of-type(1) {
	font-size: 0.28rem;
	font-weight: 500;
	font-style: normal;
	letter-spacing: 0.006rem;
	color: #bbbbbb;
}

#setVipCard .headImg {
	width: 1.1rem;
	height: 1.1rem;
	border-radius: 50%;
}

#setVipCard p span:nth-of-type(2) {
	font-size: 0.28rem;
	font-weight: 500;
	font-style: normal;
	letter-spacing: 0.006rem;
	color: #191919;
	margin-top: 0.06rem;
}

#setVipCard p span:nth-of-type(2) i {
	color: #898989;
}
#setVipCard input[type='text'] {
	border: none;
	width: 5rem;
	text-align: right;
	vertical-align: middle;
}

#setVipCard .arrow {
	width: 0.13rem;
	height: 0.2rem;
	vertical-align: middle;
	margin-top: -0.05rem;
}

#setVipCard .save {
	display: block;
	margin: 0.3rem auto 0.5rem;
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
	background-image: -moz-linear-gradient(319deg, #53dfc6, #c3ffe4);
	background-image: -o-linear-gradient(319deg, #53dfc6, #c3ffe4);
	background-image: -webkit-linear-gradient(319deg, #53dfc6, #c3ffe4);
	background-image: linear-gradient(319deg, #53dfc6, #c3ffe4);
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

#setVipCard .vux-cell-box:not(:first-child):before {
	content: ' ';
	position: absolute;
	top: 0;
	width: 100%;
	height: 0;
	border-top: none;
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	left: 15px;
}
#setVipCard .weui-cell {
	display: none;
}
</style>
