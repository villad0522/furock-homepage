import { handleActions } from 'redux-actions';
import actions from '../actions';

const getDefaultState = () => {
    try {
        return JSON.parse(localStorage.getItem('cart'));
    }
    catch (e) { }
    finally { }
    return {};
}

const defaultState = {
    ...getDefaultState(),
};

export default handleActions({
    //============================================================
    [actions?.cart?.add]: (state, { payload: { uuid, optionA, optionB, quantity } }) => {
        const key = uuid + '/' + optionA + '/' + optionB;
        const pastData = state[key] ? state[key] : {};
        const newState = {
            ...state,
            [key]: {
                uuid,
                optionA,
                optionB,
                quantity: pastData.quantity ? Number(pastData.quantity + quantity) : Number(quantity),
            }
        };
        localStorage.setItem('cart', JSON.stringify(newState));
        return newState;
    },
    //============================================================
    [actions?.cart?.remove]: (state, { payload: { uuid, optionA, optionB, quantity } }) => {
        const key = uuid + '/' + optionA + '/' + optionB;
        const pastData = state[key] ? state[key] : {};
        const newState = {
            ...state,
            [key]: {
                uuid,
                optionA,
                optionB,
                quantity: pastData.quantity ? (pastData.quantity - quantity) : 0,
            }
        };
        if (newState[key].quantity <= 0) {
            delete newState[key];
        }
        localStorage.setItem('cart', JSON.stringify(newState));
        return newState;
    },
    //============================================================
}, defaultState);
