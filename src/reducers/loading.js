import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = {
    flag: false,
    processList: [],
};

export default handleActions({
    //============================================================
    [actions?.loading?.start]: (state, { payload: { processName } }) => {
        const processList = [
            ...state.processList,
            processName,
        ];
        return {
            flag: true,
            processList,
        };
    },
    //============================================================
    [actions?.loading?.end]: (state, { payload: { processName } }) => {
        const processList = state.processList.filter(item => (item !== processName));
        return {
            flag: (processList?.length > 0),
            processList,
        };
    },
    //============================================================
}, defaultState);
