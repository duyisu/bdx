import Vue from 'vue'
import VueRouter from 'vue-router'
import {
    routerMode
}
from '@common/js/config'

const Author = r => require.ensure([], () => r(require('@pages/Author')), 'author')
const AskDoctor = r => require.ensure([], () => r(require('@pages/askDoctor/AskDoctor')), 'askDoctor')
const AskDoctorIM = r => require.ensure([], () => r(require('@pages/askDoctorIM/IM')), 'im')
const AskDoctorIMList = r => require.ensure([], () => r(require('@pages/askDoctorIM/IMList')), 'imList')
const HospitalHome = r => require.ensure([], () => r(require('@pages/hospitalHome/Hospital')), 'hospitalHome')
const HospitalMap = r => require.ensure([], () => r(require('@pages/hospitalMap/HospitalMap')), 'hospitalMap')
const HospitalNews = r => require.ensure([], () => r(require('@pages/hospitalNews/HospitalNews')), 'hospitalNews')
const HospitalWay = r => require.ensure([], () => r(require('@pages/hospitalWay/HospitalWay')), 'hospitalWay')
const HospitalConcessions = r => require.ensure([], () => r(require('@pages/hospitalConcessions/Concessions')), 'hospitalConcessions')
const MedicalServices = r => require.ensure([], () => r(require('@pages/medicalServices/MedicalServices')), 'medicalServices')
const Evaluations = r => require.ensure([], () => r(require('@pages/evaluations/Evaluations')), 'evaluations')


const DepartmentList = r => require.ensure([], () => r(require('@pages/departmentlist/DepartmentList')), 'departmentlist')
const Department = r => require.ensure([], () => r(require('@pages/department/Department')), 'department')
const DoctorIndex = r => require.ensure([], () => r(require('@pages/doctorindex/DoctorIndex')), 'doctorindex')
const DoctorInfo = r => require.ensure([], () => r(require('@pages/doctorinfo/DoctorInfo')), 'doctorinfo')
const ClinicInfo = r => require.ensure([], () => r(require('@pages/clinicinfo/ClinicInfo')), 'clinicinfo')
const ClinicIndex = r => require.ensure([], () => r(require('@pages/clinicindex/ClinicIndex')), 'clinicindex')
const AppointInfo = r => require.ensure([], () => r(require('@pages/appointinfo/AppointInfo')), 'appointinfo')
const InputInfo = r => require.ensure([], () => r(require('@pages/inputinfo/InputInfo')), 'inputinfo')
const PatientsList = r => require.ensure([], () => r(require('@pages/patientslist/PatientsList')), 'patientslist')
const AddPatient = r => require.ensure([], () => r(require('@pages/addpatient/AddPatient')), 'addpatient')
const BindVipCard = r => require.ensure([], () => r(require('@pages/bindvipcard/BindVipCard')), 'bindvipcard')
const OrderSubmit = r => require.ensure([], () => r(require('@pages/ordersubmit/OrderSubmit')), 'ordersubmit')
const OrderPay = r => require.ensure([], () => r(require('@pages/orderpay/OrderPay')), 'orderpay')
const PersonalCenter = r => require.ensure([], () => r(require('@pages/personalcenter/PersonalCenter')), 'personalcenter')
const MyFollow = r => require.ensure([], () => r(require('@pages/myfollow/MyFollow')), 'myfollow')
const VipDetail = r => require.ensure([], () => r(require('@pages/vipdetail/VipDetail')), 'vipdetail')
const MyVipCards = r => require.ensure([], () => r(require('@pages/myvipcards/MyVipCards')), 'myvipcards')
const VipRecharge = r => require.ensure([], () => r(require('@pages/viprecharge/VipRecharge')), 'viprecharge')
const ReservationClause = r => require.ensure([], () => r(require('@pages/reservationclause/ReservationClause')), 'reservationclause')
const SetVipCard = r => require.ensure([], () => r(require('@pages/setvipcard/SetVipCard')), 'setvipcard')
const ServiceOrder = r => require.ensure([], () => r(require('@pages/serviceorder/ServiceOrder')), 'serviceorder')
const OrderDetail = r => require.ensure([], () => r(require('@pages/orderdetail/OrderDetail')), 'orderdetail')
const MyAppoint = r => require.ensure([], () => r(require('@pages/myappoint/MyAppoint')), 'myappoint')
const RechargeDetail = r => require.ensure([], () => r(require('@pages/rechargedetail/RechargeDetail')), 'rechargedetail')
const PaymentList = r => require.ensure([], () => r(require('@pages/paymentlist/PaymentList')), 'paymentlist')
const TwoReports = r => require.ensure([], () => r(require('@pages/tworeports/TwoReports')), 'tworeports')
const CheckReport = r => require.ensure([], () => r(require('@pages/checkreport/CheckReport')), 'checkreport')
const InspectReport = r => require.ensure([], () => r(require('@pages/inspectreport/InspectReport')), 'inspectreport')
const MyCourse = r => require.ensure([], () => r(require('@pages/mycourse/MyCourse')), 'mycourse')
const HospitalActivity = r => require.ensure([], () => r(require('@pages/hospitalactivity/HospitalActivity')), 'hospitalactivity')
//const OpenCard = r => require.ensure([], () => r(require('@pages/opencard/opencard')), 'OpenCard')
const MemberService = r => require.ensure([], () => r(require('@pages/memberService/MemberService')), 'memberSerivce')
const OpenMember = r => require.ensure([], () => r(require('@pages/openMember/OpenMember')), 'OpenMember')
const OpenPersonalCard = r => require.ensure([], () => r(require('@pages/openPersonalCard/OpenPersonalCard')), 'OpenPersonalCard')
const AddPatientCard = r => require.ensure([], () => r(require('@pages/addPatientCard/AddPatientCard')), 'AddPatientCard')
const Payment = r => require.ensure([], () => r(require('@pages/payment/Payment')), 'Payment')
const MyCollection = r => require.ensure([], () => r(require('@pages/myCollection/MyCollection')), 'MyCollection')
const Transactionrecord = r => require.ensure([], () => r(require('@pages/transactionrecord/Transactionrecord')), 'Transactionrecord')
const VipcardList = r => require.ensure([], () => r(require('@pages/vipcardlist/VipcardList')), 'VipcardList')
const VipcardRecharge = r => require.ensure([], () => r(require('@pages/vipcardRecharge/VipcardRecharge')), 'VipcardRecharge')
const NewsContent = r => require.ensure([], () => r(require('@pages/newsContent/NewsContent')), 'NewsContent')
const VipcardContent = r => require.ensure([], () => r(require('@pages/vipcardContent/VipcardContent')), 'VipcardContent')
const VipInfo = r => require.ensure([], () => r(require('@pages/vipinfo/VipInfo')), 'VipInfo')
const MySend = r => require.ensure([], () => r(require('@pages/mySend/MySend')), 'MySend')
const SendItemContent = r => require.ensure([], () => r(require('@pages/sendItemContent/SendItemContent')), 'SendItemContent')
const InviteFriend = r => require.ensure([], () => r(require('@pages/inviteFriend/InviteFriend')), 'InviteFriend')
const InviteRecord = r => require.ensure([], () => r(require('@pages/inviteRecord/InviteRecord')), 'InviteRecord')
const VipUpdate = r => require.ensure([], () => r(require('@pages/vipUpdate/VipUpdate')), 'VipUpdate')
const VipsubcardTip = r => require.ensure([], () => r(require('@pages/vipsubcardTip/VipsubcardTip')), 'VipsubcardTip')
const ReciveCard = r => require.ensure([], () => r(require('@pages/reciveCard/ReciveCard')), 'ReciveCard')
const MysendRecive = r => require.ensure([], () => r(require('@pages/mysendRecive/MysendRecive')), 'MysendRecive')
const VipPrivilege = r => require.ensure([], () => r(require('@pages/vipPrivilege/VipPrivilege')), 'VipPrivilege')
const MyPrerogative = r => require.ensure([], () => r(require('@pages/MyPrerogative/MyPrerogative')), 'MyPrerogative')
const WxShare = r => require.ensure([], () => r(require('@pages/wxshare/WxShare')), 'WxShare')
const Mysendwxshare = r => require.ensure([], () => r(require('@pages/mysendwxshare/Mysendwxshare')), 'Mysendwxshare')


const routes = [
    {
        path: '',
        redirect: '/author'
    }, //认证页面
    {
        name: 'author',
        path: '/author',
        component: Author
    }, //首页
    {
        path: '/hospitalHome',
        component: HospitalHome,
        meta: {
            title: '医院首页'
        }
    },
    {
        name: 'askDoctor',
        path: '/askDoctor',
        component: AskDoctor,
        meta: {
            title: '问医生'
        }
    }, {
        name: 'IM',
        path: '/askDoctorIM/:askId',
        component: AskDoctorIM,
        meta: {
            title: '问医生'
        }
    }, {
        name: 'IMList',
        path: '/askDoctorList',
        component: AskDoctorIMList,
        meta: {
            title: '我的问诊'
        }
    }, {
        path: '/hospitalMap',
        component: HospitalMap,
        meta: {
            title: '就医流程'
        }
    }, {
        path: '/hospitalNews',
        component: HospitalNews,
        meta: {
            title: '往期文章'
        }
    }, {
        path: '/hospitalWay',
        component: HospitalWay,
        meta: {
            title: '来院路线'
        }
    },{
        path: '/memberService',
        component: MemberService,
        meta:{
            title: "会员服务"
        }

    },{
        path: '/hospitalConcessions',
        component: HospitalConcessions,
        meta: {
            title: '医院活动'
        }
    }, {
        path: '/medicalServices',
        component: MedicalServices,
        meta: {
            title: '诊疗服务'
        }
    }, {
        path: '/evaluations/:orderId/:type',
        name: 'evaluations',
        component: Evaluations,
        props: true,
        meta: {
            title: '发表评论'
        }
    }, {
        path: '/departmentlist',
        name: 'departmentlist',
        component: DepartmentList,
        meta: {
            title: '预约挂号'
        }
        //预约挂号
    }, {
        path: '/department',
        name: 'department',
        component: Department,
        meta: {
            title: '各个科室'
        }
        //各个科室
    }, {
        path: '/clinicinfo',
        name: 'clinicinfo',
        component: ClinicInfo,
        meta: {
            title: '门诊预约'
        }
        //门诊预约
    }, {
        path: '/clinicindex',
        name: 'clinicindex',
        component: ClinicIndex,
        meta: {
            title: '门诊主页'
        }
        //门诊预约
    }, {
        path: '/doctorindex',
        name: 'doctorindex',
        component: DoctorIndex,
        meta: {
            title: '医生主页'
        }
        //医生主页
    }, {
        path: '/doctorinfo',
        name: 'doctorinfo',
        component: DoctorInfo,
        meta: {
            title: '医生详情'
        }
        //医生详情
    }, {
        path: '/appointinfo',
        name: 'appointinfo',
        component: AppointInfo,
        meta: {
            title: '预约信息'
        }
        //预约信息
    }, {
        path: '/inputinfo',
        name: 'inputinfo',
        component: InputInfo,
        meta: {
            title: '填写信息'
        }
        //填写信息
    }, {
        path: '/patientslist',
        name: 'patientslist',
        component: PatientsList,
        props: true,
        meta: {
            title: '就诊人列表'
        }
        //就诊人列表
    }, {
        path: '/addpatient',
        name: 'addpatient',
        component: AddPatient,
        meta: {
            title: '添加就诊人'
        }
        //添加就诊人
    }, {
        path: '/bindvipcard',
        name: 'bindvipcard',
        component: BindVipCard,
        meta: {
            title: '绑定会员卡'
        }
        //绑定会员卡
    }, {
        path: '/ordersubmit',
        name: 'ordersubmit',
        component: OrderSubmit,
        meta: {
            title: '提交订单'
        }
        //提交订单
    }, {
        path: '/orderpay',
        name: 'orderpay',
        component: OrderPay,
        meta: {
            title: '提交订单'
        }
        //提交订单
    }, {
        path: '/personalcenter',
        name: 'personalcenter',
        component: PersonalCenter,
        meta: {
            title: '个人中心'
        }
        //个人中心
    }, {
        path: '/myfollow',
        name: 'myfollow',
        component: MyFollow,
        meta: {
            title: '我的关注'
        }
        //我的关注
    }, {
        path: '/vipdetail',
        name: 'vipdetail',
        component: VipDetail,
        meta: {
            title: '会员卡详情'
        }
        //会员卡详情
    }, {
        path: '/myvipcards',
        name: 'myvipcards',
        component: MyVipCards,
        meta: {
            title: '我的会员卡'
        }
        //我的会员卡
    }, {
        path: '/viprecharge',
        name: 'viprecharge',
        component: VipRecharge,
        meta: {
            title: '会员卡充值'
        }
        //会员卡充值
    }, {
        path: '/reservationclause',
        name: 'reservationclause',
        component: ReservationClause,
        meta: {
            title: '预约条款'
        }
        //预约条款
    }, {
        path: '/setvipcard',
        name: 'setvipcard',
        component: SetVipCard,
        meta: {
            title: '设置会员卡'
        }
        //设置会员卡
    }, {
        path: '/serviceorder',
        name: 'serviceorder',
        component: ServiceOrder,
        meta: {
            title: '服务订单'
        }
        //服务订单
    }, {
        path: '/orderdetail',
        name: 'orderdetail',
        component: OrderDetail,
        meta: {
            title: '订单详情'
        }
        //订单详情
    }, {
        path: '/myappoint',
        name: 'myappoint',
        component: MyAppoint,
        meta: {
            title: '我的预约'
        }
        //我的预约
    }, {
        path: '/rechargedetail',
        name: 'rechargedetail',
        component: RechargeDetail,
        meta: {
            title: '充值明细'
        }
        //充值明细
    }, {
        path: '/paymentlist',
        name: 'paymentlist',
        component: PaymentList,
        meta: {
            title: '缴费清单'
        }
        //缴费清单
    }, {
        path: '/tworeports',
        name: 'tworeports',
        component: TwoReports,
        meta: {
            title: '检查报告和检验报告'
        }
        //检查报告和检验报告
    }, {
        path: '/checkreport',
        name: 'checkreport',
        component: CheckReport,
        meta: {
            title: '检查报告'
        }
        //检查报告
    }, {
        path: '/inspectreport',
        name: 'inspectreport',
        component: InspectReport,
        meta: {
            title: '检验报告'
        }
        //检验报告
    }, {
        path: '/mycourse',
        name: 'mycourse',
        component: MyCourse,
        meta: {
            title: '我的课程'
        }
        //我的课程
    }, {
        path: '/hospitalactivity',
        name: 'hospitalactivity',
        component: HospitalActivity,
        meta: {
            title: '医院活动'
        }
        //医院活动
    }, 
    //{
    //     path: '/opencard',
    //     name: 'opencard',
    //     component: OpenCard,
    //     meta: {
    //         title: '开通会员卡'
    //     }
    //     //开通会员卡
    // },
    {
        path: '/openMember',
        name: 'OpenMember',
        component: OpenMember,
        meta: {
            title: '开通会员卡'
        }
        //开通会员卡
    },
    {
        path: '/openPersonalCard',
        name: 'OpenPersonalCard',
        component: OpenPersonalCard,
        meta: {
            title: '开通个人会员卡'
        }
        //开通个人会员卡
    },
    {
        path:'/addPatientCard',
        name:'AddPatientCard',
        component:AddPatientCard
    },
    {
        path:'/payment',
        name:'Payment',
        component:Payment
    },
    {
        path:'/myCollection',
        name:'MyCollection',
        component:MyCollection
    },
    {
        path:'/transactionrecord',
        name:'Transactionrecord',
        component:Transactionrecord
    },
    {
        path:'/vipcardlist',
        name:'VipcardList',
        component:VipcardList
    },
    {
        path:'/vipcardRecharge',
        name:'VipcardRecharge',
        component:VipcardRecharge
    },
    {
        path:'/newsContent',
        name:'NewsContent',
        component:NewsContent
    },
    {
        path:'/vipcardContent',
        name:'VipcardContent',
        component:VipcardContent
    },
    {
        path:'/vipinfo',
        name:'VipInfo',
        component:VipInfo
    },
    {
        path:'/mySend',
        name:'MySend',
        component:MySend
    },
    {
        path:'/sendItemContent',
        name:'SendItemContent',
        component:SendItemContent 
    },
    {
        path:'/inviteFriend',
        name:'InviteFriend',
        component:InviteFriend 
    },
    {
        path:'/inviteRecord',
        name:'InviteRecord',
        component:InviteRecord 
    },
    {
        path:'/vipUpdate',
        name:'VipUpdate',
        component:VipUpdate 
    },
    {
        path:'/vipsubcardTip',
        name:'VipsubcardTip',
        component:VipsubcardTip 
    },
    {
        path:'/reciveCard',
        name:'ReciveCard',
        component:ReciveCard 
    },
    {
        path:'/mysendRecive',
        name:'MysendRecive',
        component:MysendRecive 
    },
    {
        path:'/vipPrivilege',
        name:'VipPrivilege',
        component:VipPrivilege 
    },
    {
        path:'/MyPrerogative',
        name:'MyPrerogative',
        component:MyPrerogative 
    },
    {
        path:'/wxshare',
        name:'WxShare',
        component:WxShare 
    },
    {
        path:'/mysendwxshare',
        name:'Mysendwxshare',
        component:Mysendwxshare 
    }
];

Vue.use(VueRouter)

export default new VueRouter({
    routes: routes,
    mode: routerMode,
    strict: process.env.NODE_ENV !== 'production',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return {
                x: 0,
                y: to.meta.savedPosition || 0
            }
        }
    }
})


