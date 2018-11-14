import {
	baseUrl,
	host
}
from '@common/js/config';
import {
	getStore, removeStore, isNull, getUrlParam
}
from '@common/js/mUtils.js';
import axios from 'axios';
import store from '@/store';


axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//http request 拦截器
axios.interceptors.request.use(
	config => {
		store.commit('changeLoading', true);
		var access_token = getStore('access_token') || getUrlParam('access_token');

		if (!isNull(access_token)) {
			if (config.method == 'get') {
				config.params.access_token = access_token;
			} else if (config.method == 'post') {
				config.data.access_token = access_token;
			}
		} else {
			window.location.href = host + "#/author";
			return false;
		}
		//console.log(config);
		return config;
	},
	err => {
		return Promise.reject(err);
	}
)

// http response 拦截器
axios.interceptors.response.use(
	response => {
		var data = response.data,
			res;
		store.commit('changeLoading', false);
		if (data.errcode == '0') {
			return data.data;
		} else {
			return Promise.reject(data.msg);
		}
	},
	err => {
		if (err && err.response) {
			store.commit('changeLoading', false);
			if (err.response.status == 403) {
				removeStore('access_token')
				window.location.href = host + "#/author";
				return false;
			} else {
				switch (err.response.status) {
					case 400:
						err.msg = err.response.data.msg
						break

					case 401:
						err.msg = '未授权，请登录'
						break

						// case 403:
						// 	err.msg = '拒绝访问'
						// 	break

					case 404:
						err.msg = `请求地址出错: ${err.response.config.url}`
						break

					case 408:
						err.msg = '请求超时'
						break

					case 500:
						err.msg = err.response.data.msg
						break

					case 501:
						err.msg = '服务未实现'
						break

					case 502:
						err.msg = '网关错误'
						break

					case 503:
						err.msg = '服务不可用'
						break

					case 504:
						err.msg = '网关超时'
						break

					case 505:
						err.msg = 'HTTP版本不受支持'
						break

					default:
						err.msg = '未知错误'
				}
				return Promise.reject(err.msg);
			}
		}
	}
)

/**
 * [HttpService description]
 *  fetch:get请求方法、 post: post请求方法
 * @param url
 * @param params
 * @return (Promise)
 */
var _t = this;
let HttpService = {
	fetch: function(url, params = {}) {
		return new Promise((resolve, reject) => {
			//var url;
			var access_token = getStore('access_token') || getUrlParam('access_token');
			if(!url.indexOf('access_token')){
				if(url.indexOf('?')){
					url = url + '&access_token='+access_token
				}else{
					url = url+ '?access_token=' + access_token
				}
			}
			axios.get(url, {
				params: params,
				withCredentials: true,
				responseType: 'json'
			}).then(response => {
				resolve(response)
			}).catch(err => {
				reject(err)
			})
		})
	},
	post: function(url, params = {}) {
		return new Promise((resolve, reject) => {
			var access_token = getStore('access_token') || getUrlParam('access_token');
			if(!url.indexOf('access_token')){
				if(url.indexOf('?')){
					url = url + '&access_token='+access_token
				}else{
					url = url+ '?access_token=' + access_token
				}
			}
				// console.log(url);
			axios({
				method: "post",
				url: url,
				data: params,
				transformRequest: [function(params) {
					let ret = ''
					for (let it in params) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
					}
					return ret
				}],
			}).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}
}

export default HttpService;
