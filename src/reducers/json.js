import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = {
    files: {},
};

export default handleActions({
    //============================================================
    [actions?.json.setAll]: (state, { payload: { fileName, items } }) => {
        return {
            ...defaultState,
            files: {
                ...state.files,
                [fileName]: items,
            }
        };
    },
    //============================================================
}, defaultState);
