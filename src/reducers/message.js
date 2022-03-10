import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = {
    severity: 'info',
    message: '',
    vertical: 'bottom',
    horizontal: 'left',
};

export default handleActions({
    //============================================================
    [actions?.message?.set]: (state, { payload: { severity, message, vertical, horizontal } }) => {
        return {
            ...state,
            severity,
            message,
            vertical: vertical ? vertical : 'bottom',
            horizontal: horizontal ? horizontal : 'left',
        };
    },
    //============================================================
}, defaultState);
