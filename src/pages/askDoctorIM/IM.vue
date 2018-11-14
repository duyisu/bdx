<template lang="html">
    <section>
        问医生
    </section>
</template>

<script>
import $ from 'jquery'
import '@/plugins/IM/customer/bootstrap.min.js'

import whisper from '@/plugins/IM/customer/js/whisper-tool.js'
import {baseUrl} from '@common/js/config'
import {getCookie,changePageTitle} from '@common/js/mUtils'

export default {
    created() {
        changePageTitle('我的问诊');
       
        if(this.$route.params.askId){
            this.askId = this.$route.params.askId;
        }
        this.access_token = getCookie('access_token')
        var ws = new whisper();
        var uid = parseInt(Math.random() * 40) + 1;

        // let group = $(this).attr('data-group');
           // var group = 1;
           // 后面替换成微信用户真实数据
           // 通过access_token获取用户信息
        ws.init({
           id: uid,
           whisper_domain: baseUrl,
           name: '会员' + uid,
           avatar: 'http://wx2.sinaimg.cn/mw690/5db11ff4gy1flxmew7edlj203d03wt8n.jpg',
           group: 1,
           ask_order_id: this.askId,
           access_token: this.access_token
        });
    },
    data() {
        return {
            askId: '',
            access_token: ''
        }
    }
}
</script>

<style lang="less">
</style>
