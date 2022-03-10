import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = {
    clientSecret: '',
    amount: 0,
};

export default handleActions({
    //============================================================
    [actions?.payment?.set]: (state, { payload: { data } }) => {
        return data;
    },
    //============================================================
}, defaultState);
