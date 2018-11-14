Date.prototype.format = function(format) {
	let date = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S+": this.getMilliseconds()
	};
	if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (var k in date) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
		}
	}
	return format;
}

Array.prototype.equals = function(array) {
	// if the other array is a falsy value, return
	if (!array)
		return false;

	// compare lengths - can save a lot of time
	if (this.length != array.length)
		return false;
	this.sort();
	array.sort();

	for (var i = 0, l = this.length; i < l; i++) {
		// Check if we have nested arrays
		if (this[i] instanceof Array && array[i] instanceof Array) {
			// recurse into the nested arrays
			if (!this[i].equals(array[i]))
				return false;
		} else if (this[i] != array[i]) {
			// Warning - two different object instances will never be equal: {x:20} != {x:20}
			return false;
		}
	}
	return true;
}


/**
 * 存储localStorage
 */
const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 存储sessionStorage
 */
const setSession = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
const getSession = name => {
	if (!name) return;
	//return window.sessionStorage.getItem(name);
	return JSON.parse(sessionStorage.getItem(name)) || {};
}

/**
 * 删除sessionStorage
 */
const removeSession = name => {
	if (!name) return;
	window.sessionStorage.removeItem(name);
}

/**
 * 获取cookie
 */
const getCookie = (sName) => {
	var aCookie = document.cookie.split("; ");
	for (var i = 0; i < aCookie.length; i++) {
		var aCrumb = aCookie[i].split("=");
		if (sName == aCrumb[0]) {
			aCrumb.shift();
			return decodeURIComponent(aCrumb.join("="));
		}
	}
	return '';
}

/**
 * 设置cookie
 */
const setCookie = (sName, sValue, dm, sExpires, path) => {
	var sCookie = sName + "=" + encodeURIComponent(sValue),
		dm = dm || ".ehaoyao.com",
		sExpires = sExpires || 30,
		path = path || "/";
	if (sExpires != null) {
		var today = new Date(),
			d = new Date(today.getTime() + (sExpires * 1000 * 60 * 60 * 24));
		sCookie += "; expires=" + d.toUTCString() + "; domain=" + dm + "; path=" +
			path;
	}
	document.cookie = sCookie;
}
const saveCookie = (cookieName,cookieValue,cookieDates) =>{
    var d = new Date();
    d.setDate(d.getDate()+cookieDates);
    document.cookie = cookieName+"="+cookieValue+";expires="+d.toGMTString();
}

/**
 * 删除cookie
 */
const removeCookie = (sName, dm, path) => {
	var dm = dm || location.hostname;
	var path = path || '/';
	document.cookie = sName +
		"=; expires=Fri, 31 Dec 1999 23:59:59 GMT; domain=" + dm + "; path=" +
		path;
}

/**
 * 获取url参数
 */
const getUrlParam = (name, url) => {
	url = url || window.location.href;
	if (url.indexOf('?') > -1) {
		url = url.split('?')[1] || '';
	}
	if (url.indexOf('#/') > -1) {
		url = url.split('#/')[0] || '';
	}
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	var result = url.match(reg);
	return result ? decodeURIComponent(result[2]) : null;
}


/**
 * 时间格式化
 */
const format_date = (date, format) => {
	let newDate = new Date(date * 1000);
	return newDate.format(format);
}

/**
 * 判断为空
 */
const isNull = (val) => {
	var rt = false;
	//val = val.replace(/\s+/g, "");
	if (val == "" || val == null || val == undefined) {
		rt = true;
	}
	return rt;
}

/**
 * 手机号码验证
 */

const isMobile = (val) => {
	const MOBILE = /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/;
	let rt = false;
	if (MOBILE.test(val)) {
		rt = true;
	}
	return rt;
}

/**
 * 登录密码码验证 6-12位数字和字母组合
 */

const isLoginPw = (val) => {
	const PW = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
	let rt = false;
	if (PW.test(val)) {
		rt = true;
	}
	return rt;
}

/**
 * 姓名校验 2-10位字符
 */

const isUsername = (val) => {
	const Name = /^[A-Za-z0-9\u4e00-\u9fa5]{2,10}$/;
	let rt = false;
	if (Name.test(val)) {
		rt = true;
	}
	return rt;
}

/**
 * 判断是否微信浏览器
 */
const isWechat = function() {
	const ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}

/**
 * 针对微信修改单页面title
 */
const changePageTitle = function(t) {
	document.title = t;
	var i = document.createElement('iframe');
	i.src = '';
	i.style.display = 'none';
	i.onload = function() {
		setTimeout(function() {
			i.remove();
		}, 9)
	}
	document.body.appendChild(i);
}



export {
	setStore,
	getStore,
	removeStore,
	setCookie,
	getCookie,
	removeCookie,
	getUrlParam,
	format_date,
	isNull,
	isMobile,
	isLoginPw,
	isUsername,
	isWechat,
	changePageTitle,
	saveCookie
}
