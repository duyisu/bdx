<template lang="html">
	<div id="patientslist">
		<div v-if="patientslist.length" class="hasPList">
      <p v-if='add_sub_card_tip' class="add_sub_card_tip">请选择您的副卡用户，一经开通不可修改</p>
			<ul>
				<li
					@click="selectedPatient(item, item.id)"
					:key="index"
					v-for="item,index in patientslist">
					<div class="topUserInfo">
						<h4>{{ item.realname }}</h4>
						<span>{{ item.sex == 1 ? "男" : "女"}}</span>
						<span>{{ item.age }} 岁</span>
            <template v-if="item.type == 9 && item.card_type == 3">
              <span class="patient_tip">家庭会员副卡</span>
            </template>
            <template v-if="item.type == 9 && item.card_type == 2">
              <span class="patient_tip">家庭会员主卡</span>
            </template>
            <template v-if="item.type == 8">
              <span class="patient_tip">个人会员</span>
            </template>
            <template v-if="item.type == 1">
              <span class="patient_tip">普通用户</span>
            </template>
					</div>
					<p class="bottomUserInfo">
						<span>{{ item.ID_no.substring(0,6)+'*******'+item.ID_no.substring(13) }}</span>
						<span>{{ item.mobile.substring(0,3)+'****'+item.mobile.substring(7) }}</span>
					</p>
					<img v-if="item.card_number == '' ? true : false" @click.self.stop="editPatient(item)" class="editInfo" src="../../common/images/departmentlist/editIcon.png" alt="" />
				</li>
			</ul>
		</div>
		<div v-if="!patientslist.length" class="noPList">
			<img @click.prevent="" src="../../common/images/departmentlist/noPatients.png" alt="" />
			<h4>暂无就诊人</h4>
			<p>赶快添加就诊人吧！</p>
		</div>
		<p @click="addPatient" v-if="patientslist.length > 4 ? false : true" class="sumbitInfo">添加就诊人</p>
    <!-- <p @click="addPatient" class="sumbitInfo">添加就诊人</p> -->
	   <toast v-model="showToast" type="text" :time="800" :position="position">{{ msg }}</toast>
  </div>
</template>

<script>
import http from '@common/js/http.js';
import { getStore,setStore } from '@common/js/mUtils';

export default {
	created(){
    if(window.localStorage.getItem('paramsItem')){
      window.localStorage.removeItem('paramsItem');
    }

		if(this.$route.query){

       setStore('paramsItem',this.$route.query);

       this.savePath = JSON.parse(getStore('paramsItem'));

		}
	},
    data(){
    	return {
        showToast:false,
        position:'middle',  //top,middle,bottom
        msg:'',
			  flag: '',
        savePath:'',
    		recodeText:'',
    		patientslist:[],
    		personCard:'', //个人会员卡信息
    		buycardid:'',
    		buyfamilycard:'',
        card_type:'',
        price:'',
        add_sub_card:0,
        add_sub_card_tip:false
    	}
    },
    mounted(){
      this.$nextTick(function(){
        setTimeout(()=>{
          this.getPatientlist().then((res)=>{
            this.patientslist = res;
          }).catch((err)=>{
            
          })
        })
      })
      this.card_type = this.$route.query.card_type;
      this.price = this.$route.query.price;
      this.add_sub_card = this.$route.query.add_sub_card
      if(this.$route.query.add_sub_card == 1){
        this.add_sub_card_tip = true;
      }
    },
    methods:{
      getPatientlist(){
        //获取就诊人列表
        return http.fetch('/api/user/patient_list')
      },
    	addPatient(){
			this.$store.commit('changeVal',{
                field:'patientId',
                val:''
            });

            this.$store.commit('changeVal',{
                field:'ID_no',
                val:''
            });

            this.$store.commit('changeVal',{
                field:'mobile',
                val:''
            });

            this.$store.commit('changeVal',{
                field:'realname',
                val:''
            });

            this.$store.commit('changeVal',{
                field:'card_number',
                val:''
            });
    		this.$router.push(
	        {
	          path:'/addPatientCard'
	        });
    	},
		//选择就诊人
    	selectedPatient(item, index){
         var that = this;
        //从查看检查报告进来
        if(this.$route.query.checkreport == 1){
           this.$router.push({
              path:'/checkreport',
              query:{
                 id:item.id
              }
           })
           return false;
        }

        //从开通副卡进来
        if(this.add_sub_card == 1){
            
            http.fetch('api/user/add_sub_card',{patient_id:item.id}).then((res)=>{
                
                  that.$router.push({
                      path:'/vipsubcardTip',
                      query:{
                          card_id:res.card_id,
                          mainCardName:res.mainCardName
                      }
                  })
             
            }).catch((arr)=>{
                
                    that.showToast = true;
                    that.msg = arr
               
            })
            return false;
        }

  			//如果从个人中心进来的只能修改，不能选择就诊人
  			if(this.$route.query.pathfrom){
  			  let personal = this.$route.query.pathfrom;
  			  if(personal == 'personalcenter'){
  				   return false;
  			  }
          return false;
  			}

  			//这是从问医生页面来的
  			if(this.savePath.pageFlag && this.savePath.pageFlag == 'askDoctor'){
  			  this.$router.push({
  				 name: 'askDoctor',
  				 params: item
  			   });
  			   return false;
  			}

  			//这是从预约挂号来的
  			if(this.savePath.doctor_id){
  			  this.$router.push({
  				path:'/appointinfo',
  				query:{
  				  id:item.id,
            type:item.type,
  				  ...this.savePath,
            member_id:item.member_id
  				}
  			  })
  			  return false;
  			}

        	//这是从开通会员卡来的
        let buycardid = this.$route.query.personOrfamily;//getStore('buycardid');
        let buyfaimlycard = this.$route.query.cardType;//getStore('familycard') || '';

  			if(buycardid==0 || buycardid==1){ //个人会员
  				if(item.type == 2 || item.type == 6){
  				  this.msg = '您选择的人员已是会员，请重新选择！';
  				  this.showToast = true;
  				  return false;
  				}
  				//判断该就诊人是否已经是会员
          let access_token = getStore('access_token');
          return http.post(`/api/user/patient_is_vip?access_token=${access_token}`,{
  					id:item.id,
                      mobile:item.mobile,
                      realname:item.realname
  				}).then((res)=>{
                      if(res.is_vip==1){
                          this.msg = '您选择的已是会员，请重新选择！';
                          this.showToast = true;
                          return false;
  					          }else{
                          if(buycardid==0){
                              let buyCardObj = {
                                  id:item.id,
                                  patientName:item.realname,
                                  ID_no:item.ID_no,
                                  mobile:item.mobile,
                                  //personOrfamily:0,
                                  //cardType:buyfaimlycard,
                                  card_type:this.card_type,
                                  price:this.price
                              }
                              this.$router.push({
                                  path:'/openPersonalCard',
                                  query:buyCardObj
                              })
                          }else{//家庭卡
                              //判断就诊人是否重复
                              if(buyfaimlycard=='vip1'){
                                  let fuCard1 = JSON.parse(getStore('fuCard1')) || '';
                                  let fuCard2 = JSON.parse(getStore('fuCard2')) || '';
                                  if( (fuCard1!=''&&item.id==fuCard1.id)
                                      || (fuCard2!=''&&fuCard2.id==item.id)){
                                      this.msg = '就诊人不能相同';
                                      this.showToast = true;
                                      return false;
                                  }
  							          }else if(buyfaimlycard=='vip2'){
                                  let mainCard = JSON.parse(getStore('mainCard')) || '';
                                  let fuCard2 = JSON.parse(getStore('fuCard2')) || '';
                                  if( (mainCard!=''&&item.id==mainCard.id)
                                      || (fuCard2!=''&&fuCard2.id==item.id)){
                                      this.msg = '就诊人不能相同';
                                      this.showToast = true;
                                      return false;
                                  }
  							                  }else{
                                  let mainCard = JSON.parse(getStore('mainCard')) || '';
                                  let fuCard1 = JSON.parse(getStore('fuCard1')) || '';
                                  if( (mainCard!=''&&item.id==mainCard.id)
                                      || (fuCard1!=''&&fuCard1.id==item.id)){
                                      this.msg = '就诊人不能相同';
                                      this.showToast = true;
                                      return false;
                                  }
  							              }
                              let buyCardObj = {
                                  patientId:item.id,
                                  patientName:item.realname,
                                  personOrfamily:1,
                                  cardType:buyfaimlycard
                              }
                              this.$router.push({
                                  path:'/opencard',
                                  query:buyCardObj
                              })
                          }

                          return false;
  					}
                  }).catch((err)=>{
                      this.msg = err;
                      this.showToast = true;
                      return false;
                  });
  			}

        // if(this.$route.query.personOrfamily == 1){ //家庭会员
        //   if(item.type == 2 || item.type == 6){
        //     this.msg = '您选择的人员已是会员，请重新选择！';
        //     this.showToast = true;
        //     return false;
        //   }
        //
        //   if(buyfaimlycard == 'vip1'){ //家庭主卡
        //      let  mainCard = {
        //        id:item.id,
        //        realname:item.realname,
        //        is_main:1
        //      }
        //      setStore('mainCard',mainCard);
        //    }
        //
        //    if(buyfaimlycard == 'vip2'){ //家庭副卡
        //      let  fuCard1 = {
        //        id:item.id,
        //        realname:item.realname,
        //        is_main:0
        //      }
        //      setStore('fuCard1',fuCard1);
        //    }
        //
        //    if(buyfaimlycard == 'vip3'){ //家庭副卡
        //      let  fuCard2 = {
        //        id:item.id,
        //        realname:item.realname,
        //        is_main:0
        //      }
        //      setStore('fuCard2',fuCard2);
        //    }
        //
        //     let buyCardObj = {
        //         personOrfamily:1
        //     }
        //     this.$router.push({
        //         path:'/opencard',
        //         query:buyCardObj
        //     })
        //    return false;
        // }

    	},
    	editPatient(item){
    		this.$router.push({
          name:'addpatient',
          params:item
        });
    	}
    }
}
</script>

<style lang="less">

#patientslist{
  width: 100%;
  height: 100%;
  background: #fff;
  .add_sub_card_tip{
    text-align: left;
    color: #999;
    font-size: .28rem;
    line-height: .6rem;
    padding-left: .3rem;
  }
}
#patientslist .hasPList{
	padding-top:.1rem;
}
#patientslist .hasPList li{
	position:relative;
	margin:.2rem auto 0;
	width: 6.9rem;
	padding:.4rem .3rem;
  height: 1.67rem;
  border-radius: .06rem;
  background-color: #ffffff;
  box-shadow: -.017rem -.025rem .238rem 0.002rem rgba(0, 0, 0, 0.11);
  background-color: #ffffff;
}
#patientslist .hasPList .editInfo{
	width:.42rem;
	height:.42rem;
	position:absolute;
	top:50%;
	right:.3rem;
	transform: translate(0,-50%);
}
#patientslist .topUserInfo,.bottomUserInfo{
	font-size:0;
}
#patientslist .bottomUserInfo{
	margin-top:.18rem;
}
#patientslist .topUserInfo>h4{
	display:inline-block;
  	font-size: .325rem;
  	font-weight: 500;
  	color: #191919;
  	vertical-align: bottom;
}
#patientslist .topUserInfo>span{
  	font-size: .28rem;
  	font-weight: 500;
  	color: #191919;
  	margin-left:.21rem;
  	vertical-align: bottom;
}
#patientslist .topUserInfo>span.patient_tip{
  display: inline-block;
  height: .36rem;
  line-height:.34rem;
  text-align:center;
  background: #48cdbb;
  font-size:.22rem;
  color:#fff;
  margin-left: .2rem;
  padding:0 .12rem;
  border-radius:.04rem;
}

#patientslist .bottomUserInfo>span{
  	font-size: .26rem;
  	font-weight: 500;
  	color: #898989;
}
#patientslist .bottomUserInfo>span:nth-of-type(2){
	margin-left:.41rem;
}

#patientslist>.sumbitInfo{
  	font-size: .36rem;
  	font-weight: 500;
  	letter-spacing: .029rem;
  	color: #ffffff;
	  width: 6.9rem;
  	height: .92rem;
  	line-height:.92rem;
  	position:fixed;
	  bottom:.5rem;
	  left:50%;
	  margin-left:-3.45rem;
  	opacity: 0.99;
  	text-align: center;
  	border-radius: .46rem;
    background: #48cdbb;
}
#patientslist .noPList{
	text-align: center;
}
#patientslist .noPList>img{
	width:5.5rem;
	height:3.23rem;
	margin-top:1.8rem;
}
#patientslist .noPList>h4{
  font-size: .365rem;
  font-weight: 500;
  color: #898989;
  margin-top:.25rem;
}
#patientslist .noPList>p{
  font-size: .285rem;
  font-weight: 500;
  color: #bbbbbb;
  margin-top:.29rem;
}
</style>
