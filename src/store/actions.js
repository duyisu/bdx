import {
    CHANGE_LOADING,
    CHANGE_ALERT,
    CHANGE_CONFIRM,
    UDATE_DIALOGT_TYPE,
    UPDATE_TIPS_MESSAGE,
    FADE_ALERT,
    CHANGE_MENU,
    UPDATE_CART_NUMS
}
from './mutation-types.js'

export default {
    //显示提示框并自动消失
    [FADE_ALERT]({
        commit,
        state
    }, msg) {
        debugger
        state.tipsMsg = msg;
        state.ifShowAlert = true;
        setTimeout(function() {
            commit('CHANGE_ALERT');
        }, 1000);
    }
}
