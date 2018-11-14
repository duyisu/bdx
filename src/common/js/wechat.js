import Wechat from 'wechat-jssdk/dist/client';
import {getSignature}from '@service/service';

const appId = 'wx0c418b3491291a7a',
    appSecret = '37ccf163223f12c8070ecd9e6ad17e37';

const timeStamp = function() {
    var d = new Date().getTime(),
        temp = d.toString();

    return temp;
};

const nonceStr = function() {
    var baseString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        baseStringCount = baseString.length,
        temp = '';

    for (var i = 0; i < 32; i++) {
        temp += baseString.charAt(Math.floor(Math.random() * baseStringCount));
    }
    return temp;
};

const getState = function() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const getConfig = function(param) {
    let config = {
        'appId': appId,
        'nonceStr': param.noncestr,
        'signature': param.signature,
        'timestamp': param.timestamp,
        'success': function(wechatObj) {
            wechatObj.shareOnChat({
                type: 'link',
                title: 'title',
                link: location.href,
                imgUrl: '/logo.png',
                desc: 'description',
                success: function() {},
                cancel: function() {}
            });
            //自定义分享到朋友圈
            wechatObj.shareOnMoment({
                type: 'link',
                title: 'title',
                link: location.href,
                imgUrl: '/logo.png'
            });
        },
        'error': function(err, wechatObj) {},
        'debug': true,
        'jsApiList': ['hideMenuItems', 'onMenuShareTimeline', 'chooseCard', 'addCard', 'openCard', 'chooseWXPay'], //optional, pass all the jsapi you want, the default will be ['onMenuShareTimeline', 'onMenuShareAppMessage']
        'customUrl': '' //set custom weixin js script url, usually you don't need to add this js manually
    }
    return config;
};

const sign = function(fn) {
    let url = window.location.href.split('#')[0];
    getSignature(url).then(function(res) {
        const config = this.getConfig(res);
        const wechatObj = new WechatJSSDK(config);
        this.$store.commit('wechatObj', wechatObj);
    }).then(function(err) {
        console.log(err);
    });
}

const authUrl = function(redirect_uri) {
    if (appId !== null && redirect_uri !== null) {
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + encodeURIComponent(redirect_uri) +
            '&response_type=code&scope=snsapi_base&state=123456#wechat_redirect';
        return url;
    }
}


export {
    sign,
    authUrl,
    getConfig
}
