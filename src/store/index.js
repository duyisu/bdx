import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters'
import actions from '@/store/actions'
import mutations from '@/store/mutations'
import addPatient from '@/store/patientInfo'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
    iosUrl:null,
    webUrl: '',
    wechatObj: '',
    pageTitle: '', //页面标题
    access_token: ''
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
            addPatient
        },
        strict: debug
})
