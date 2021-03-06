const consts = require('../actions/CoreActionConsts');

const initialState = {
    mainViewVisible: true,
    type: 'recent'
};

module.exports = function coreStore(state, action) {
    state = state || initialState
    switch (action.type) {
        case consts.SHOW_APPS:
          return { ...state, mainViewVisible: action.val }
        case consts.CHANGE_WRAPPER_VIEW:
          return { ...state, type: action.val }
        default:
            return state;
    }
}
