import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = {
    nowPage: 0,
    nextPage: 0,
    isDown: false,
};

export default handleActions({
    //============================================================
    [actions?.animation?.set]: (state, { payload: { nowPage, nextPage, isDown } }) => {
        return {
            nowPage,
            nextPage,
            isDown,
        };
    },
    //============================================================
}, defaultState);
