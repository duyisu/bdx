/**
 * 配置编译环境和线上环境之间的切换
 *
 * host: 网站域名
 * baseUrl: 后台域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let host = window.location.origin; //网站域名
// let baseUrl = 'http://dbxdev.s1.natapp.cc/';
let baseUrl = 'http://bdx.bdxdoctor.com/';
let routerMode = 'hash';
let imgBaseUrl;


if (process.env.NODE_ENV == 'development') {
    // baseUrl = 'http://dbxdev.s1.natapp.cc/';
    // baseUrl = 'http://dev.bdxdoctor.com/';
    baseUrl = 'http://bdx.bdxdoctor.com/';
} else if (process.env.NODE_ENV == 'testing') {
    // host = 'http://dbxdev.s1.natapp.cc/front-end/test/';
    host = 'http://bdx.bdxdoctor.com/m/';
    // baseUrl = 'http://dbxdev.s1.natapp.cc/';
    baseUrl = 'http://bdx.bdxdoctor.com/';
} else if (process.env.NODE_ENV == 'prepare') {
    host = '';
    baseUrl = '';
} else if (process.env.NODE_ENV == 'production') {
    //host = 'http://dev.bdxdoctor.com/m/';
    host = 'http://bdx.bdxdoctor.com/m/';
    // baseUrl = 'http://dev.bdxdoctor.com/';
    baseUrl = 'http://bdx.bdxdoctor.com/';

}

export {
    host,
    baseUrl,
    routerMode,
    imgBaseUrl
}
