import http from '@common/js/http.js';
import wx from 'weixin-js-sdk';
import { changePageTitle,isMobile,setStore, getStore, } from '@common/js/mUtils';
let wxShare  = {
    invite(params){
        //let url = encodeURIComponent(window.location.href.split('#')[0]);
        //let url = window.location.href.split('#')[0];
        //console.log(url)
        let url = window.location.href;
        http.fetch('api/home/getSignature',{
            url:url
        }).then((res)=>{
             var that = this;
             let info = res.cfg;
            wx.config({
                debug: false, 
                appId: info.appId, // 公众号的唯一标识
                timestamp: info.timestamp, // 生成签名的时间戳
                nonceStr: info.nonceStr, //生成签名的随机串
                signature: info.signature,// 签名
                jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareWeibo']
            });
            wx.ready(function() { //通过ready接口处理成功验证
                wx.onMenuShareAppMessage({ // 分享给朋友  
                    title: params.title, 
                    desc: params.desc, 
                    link: params.link,
                    imgUrl: params.img,
                    type: '', 
                    dataUrl: '', 
                    success: function(res) {
                        console.log('分享给朋友')
                    },
                    cancel: function() {
                    
                    }
                });
                wx.onMenuShareTimeline({// 分享到朋友圈
                    title: params.title, 
                    link: params.link,
                    imgUrl: params.img,
                    success: function(res) {
                        
                    },
                    cancel: function() {
                    
                    }
                });
                wx.onMenuShareWeibo({
                    title: params.title, 
                    link: params.link,
                    imgUrl: params.img,
                    success: function(res) {
                        
                    },
                    cancel: function() {
                    
                    }
                })
               
                    
            });
            wx.error(function(res){
                
            });
        }).catch((arr)=>{
            
        })
    },
    share(params){
       let info = JSON.parse(getStore('configInfo'));
       
       wx.config({
            debug: false, 
            appId: info.appId, // 公众号的唯一标识
            timestamp: info.timestamp, // 生成签名的时间戳
            nonceStr: info.nonceStr, //生成签名的随机串
            signature: info.signature,// 签名
            jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareWeibo']
        });
        wx.ready(function() { //通过ready接口处理成功验证
            wx.onMenuShareAppMessage({ // 分享给朋友  
                title: params.title, 
                desc: params.desc, 
                link: params.link,
                imgUrl: params.img,
                type: '', 
                dataUrl: '', 
                success: function(res) {
                },
                cancel: function() {
                
                }
            });
            wx.onMenuShareTimeline({// 分享到朋友圈
                title: params.title, 
                link: params.link,
                imgUrl: params.img,
                desc: params.desc,
                type: '', 
                dataUrl: '', 
                success: function(res) {
                    
                },
                cancel: function() {
                
                }
            });
            wx.onMenuShareWeibo({
                title: params.title, 
                link: params.link,
                imgUrl: params.img,
                desc: params.desc,
                type: '', 
                dataUrl: '', 
                success: function(res) {
                    
                },
                cancel: function() {
                
                }
            })
         
        });
        wx.error(function(res){
           
        });
       
    },
    
}

export default wxShare;