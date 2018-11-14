<template lang="html">

</template>

<script>
import {getAuthInfo} from '@service/service';
import {authUrl} from '@common/js/wechat';
import http from '@common/js/http.js';
import {getStore, setStore, getUrlParam} from '@common/js/mUtils';
import {
	host,
    baseUrl
}
from '@common/js/config';
export default {
    mounted(){
        // http.fetch('api/user/index').then((res)=>{
        //     console.log('res',res)
        // })
    },
    created () {
        this.getAccessToken();
    },
    data(){
        return {
            access_token: ''
        }
    },
    methods: {
        getAccessToken () {

            this.access_token = getUrlParam('access_token') ||  getStore('access_token');
            if(this.access_token == '' || this.access_token == null ){
                let ua = window.navigator.userAgent.toLowerCase()
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                // 跳转到微信授权页面
                    let url = baseUrl + 'page/wxauth/auth?redirect_uri=' + encodeURIComponent(host);
                    window.location.href = url;
                }
            }else{
                setStore('access_token', this.access_token);
                setTimeout(() => {
                    this.goBeforeLoginUrl() // 页面恢复(进入用户一开始请求的页面)
                }, 2000)
            }
        }
    }
}
</script>

<style lang="less">
</style>
