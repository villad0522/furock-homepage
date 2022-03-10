import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = {};

export default handleActions({
    //============================================================
    [actions.imageUploader.uploaded]: (state, { payload: { imageId, url } }) => {
        return {
            ...state,
            [imageId]: url,
        };
    },
    //============================================================
}, defaultState);
