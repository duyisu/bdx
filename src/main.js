// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from '@/store';
import App from '@/App';
import router from '@/router/router';
import '@common/js/rem';
import Common from '@common/js/common';
import qrcode from '@common/js/jquery.qrcode.min';
import FastClick from 'fastclick';
import http from '@common/js/http.js';
import axios from 'axios';//引入文件
import {
    setCookie, getCookie, setStore, getStore, isNull, changePageTitle, getUrlParam
}
from '@common/js/mUtils';
import wx from 'weixin-js-sdk';
import wxShare from '@common/js/wxapi';
import {baseUrl} from '@common/js/config';
import VConsole from 'vconsole';
import preview from 'vue-photo-preview';
Vue.use(preview);
//const vConsole = new VConsole()

//console.log(vConsole.version)


let url = window.location.href;
http.fetch('api/home/getSignature',{
    url:url
}).then((res)=>{
   
   let params = {
        title: '北斗星儿童医院',
        desc: '北斗星儿童医院', 
        link: baseUrl+'m/#/hospitalHome',
        img:'http://bdx.bdxdoctor.com/m/static/img/logo.png',
    }
    setStore('configInfo',res.cfg)
    wxShare.share(params);
})

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
Vue.prototype.$http = axios;
Vue.use(Common);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})

router.beforeEach((to, from, next) => {

    let access_token = getStore('access_token') || getUrlParam('access_token');
    
    if (!isNull(access_token)) {
        setStore('access_token', access_token);
    }

    if (isNull(access_token) && to.path != '/author') {
        // 第一次进入项目
        setCookie('beforeLoginUrl', to.fullPath); // 保存用户进入的url
        next('/author');
        return false;
    }
   
    if($.inArray(to.path,['/mysend','/vipcardlist','/newsContent','/doctorinfo','/doctorindex','/inviteFriend']) == -1){
    let params = {
            title: '北斗星儿童医院',
            desc: '北斗星儿童医院', 
            link: baseUrl+'m/#/hospitalHome',
            img:'http://bdx.bdxdoctor.com/m/static/img/logo.png',
        }
        wxShare.share(params);
    }

    
    if (to.path == '/author' && !isNull(access_token)) {
        // 用户使用后退返回到授权页，则默认回到首页
        next('/hospitalHome');
        return false;
    }
    if (to.meta.title) {
        changePageTitle(to.meta.title);
    }
    next();
})
