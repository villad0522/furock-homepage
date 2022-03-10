import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = '';

export default handleActions({
    //============================================================
    [actions?.userId?.set]: (state, { payload: { userId } }) => {
        return userId;
    },
    //============================================================
}, defaultState);
