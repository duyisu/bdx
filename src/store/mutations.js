import {
    SET_TITLE,
    ACCESS_TOKEN
}
from './mutation-types.js'

export default {
    //设置页面标题
    [SET_TITLE](state, title) {
        state.pageTitle = title;
    }, [ACCESS_TOKEN](state, access_token) {
        state.access_token = access_token;
    },
    setUrl: (state, newVal) => { state.iosUrl = newVal }

}
