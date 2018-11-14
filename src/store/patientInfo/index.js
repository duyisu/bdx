let addPatient = {
	state:{
		showToast:false,
		msg:'',
		loading:false,
		patientId:'',
		ID_no:'',
		mobile:'',
		realname:'',
		sex:0,
		age:'',
		code:'',
		firstOrsecond:'',
		diseaseInfo:'',
		card_number:'',
		addressDetail:''
	},
	mutations:{
		showText(state,payload){
			state.showToast = payload.status;
			state.msg = payload.text;
		},
		changeLoading(state,status){
			state.loading = status;
		},
		changeVal(state,payload){
			state[payload.field] = payload.val;
		}
		// changeID_no(state,payload){
		// 	state.ID_no = payload;
		// },
		// changeMobile(state,payload){
		// 	state.mobile = payload;
		// },
		// changeRealname(state,payload){
		// 	state.realname = payload;
		// },
		// changeSex(state,payload){
		// 	state.sex = payload;
		// },
		// changeAge(state,payload){
		// 	state.age = payload;
		// },
		// changeCode(state,payload){
		// 	state.code = payload;
		// }
	}
}

export default addPatient