
import _http from '@common/js/http';
import {
	host
}
from '@common/js/config';

/**
 * 微信认证信息
 */
export const getAccessToken = (appID, appSecret) => {
	return _http.fetch('https://api.weixin.qq.com/cgi-bin/token', {
		grant_type: 'client_credential',
		appid: appID,
		secret: appSecret
	});
}

export const getTicket = (ACCESS_TOKEN) => {
	return _http.fetch('https://api.weixin.qq.com/cgi-bin/ticket/getticket', {
		access_token: ACCESS_TOKEN,
		type: jsapi
	});
}

export const getSignature = (url) => {
	return _http.fetch('/get-signature', {
		url: encodeURIComponent(url),
		credentials: "same-origin"
	});
}

export const getWeChatUserInfo = (url) => {
	return _http.fetch('/Wap/User/info');
}

export const getAuthInfo = (code) => {
	return _http.fetch('/Wap/User/info', {
		code: code
	});
}

/**
 * 获取首页信息
 */
//  export const s_getIndexInfo = () => {
// 	return _http.fetch('/Wap/User/info');
// }
export const s_getIndexInfo = () => {
	return _http.fetch('api/home/index');
}
/**
 * 获取活动报名信息
 */
export const s_getActivetyInfo = (params) => {
	return _http.fetch('api/activity/signup',{
		tagname:params.tagname,
		name:params.name,
		mobile:params.mobile,
		verifycode:params.verifycode
	});
}

/**
 * 获取手机验证码
 */
export const s_getMobileMessage = (params) => {
	return _http.fetch('/api/User/send_sms_code',{
		mobile:params
	});
}
/**
 * 获取快速咨询标签
 */
export const s_getAskRemarks = () => {
	return _http.fetch('/api/order/remarks');
}

/**
 * 问医生
 */
export const s_submitQuestion = (params) => {
	return _http.fetch('/api/order/create_order', params);
}

/**
 * 问医生详情
 */
export const s_askDocterDetail = (ask_order_id) => {
	return _http.fetch('/api/order/ask_order_detail', {
		ask_order_id: ask_order_id
	});
}

/**
 * 问医生IM
 */
export const s_askDocterIM = () => {
	return _http.fetch('/api/service/getSocket');
}


/**
 * 问诊列表
 */
export const s_askDocterList = (param) => {
	return _http.fetch('/api/order/ask_order_list');
}


/**
 * 首页评价
 */
export const s_evaluationList = (param) => {
	return _http.fetch('/api/user/doctor_comment_list', param);
}

/**
 * 医院资讯
 */
export const s_hospitalNew = () => {
	return _http.fetch('/api/news/information');
}

/**
 * 健康诊疗
 */
export const s_hospitalService = () => {
	return _http.fetch('/api/news/diagnosistreatment');
}

/**
 * 活动
 */
export const s_hospitalActivity = () => {
	return _http.fetch('/api/news/activity');
}

/**
 * 发表评论
 */
export const s_submitEvaluation = (params) => {
	return _http.fetch('/api/user/save_comment', params);
}

/**
 * 获取医生信息
 */
export const s_getDoctorInfo = (params) => {
	return _http.fetch('/api/user/get_name_image', params);
}

/**
 * 详情页
 */
export const s_getContentData = (params) => {
	return _http.fetch('api/cms/archive_detail', params);
}
