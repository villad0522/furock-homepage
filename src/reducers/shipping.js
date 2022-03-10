import { handleActions } from 'redux-actions';
import actions from '../actions';

const getDefaultState = () => {
    try {
        return JSON.parse(sessionStorage.getItem('shipping'));
    }
    catch (e) { }
    return {
        zenkaku: false,
        postCode: '',
        postCodeError: '',
        address: '',
        addressError: '',
        name: '',
        nameError: '',
    };
}

const defaultState = {
    ...getDefaultState(),
};

export default handleActions({
    //============================================================
    [actions?.shipping?.setAddress]: (state, { payload: { address } }) => {
        const newState = {
            ...state,
            address,
            addressError: '',
        };
        sessionStorage.setItem('shipping', JSON.stringify(newState));
        return newState;
    },
    //============================================================
    [actions?.shipping?.setName]: (state, { payload: { name } }) => {
        const newState = {
            ...state,
            name,
            nameError: '',
        };
        sessionStorage.setItem('shipping', JSON.stringify(newState));
        return newState;
    },
    //============================================================
    [actions?.shipping?.setPhone]: (state, { payload: { phone } }) => {
        const newState = {
            ...state,
            phone,
            phoneError: '',
        };
        sessionStorage.setItem('shipping', JSON.stringify(newState));
        return newState;
    },
    //============================================================
    [actions?.shipping?.setPostCode]: (state, { payload: { postCode } }) => {
        let newPostCode = postCode.replace(/[０-９]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
        const zenkaku = (postCode !== newPostCode);
        if (zenkaku && state.zenkaku) {
            //全角の２文字目は捨てる
            return {
                ...state,
                zenkaku: false, //文字入力は何も書き換えずに、フラグだけを変更
                postCodeError: '',
            };
        }
        newPostCode = newPostCode.replace(/[^0-9]/g, '');
        const newState = {
            ...state,
            zenkaku,
            postCode: newPostCode,
            postCodeError: '',
        };
        sessionStorage.setItem('shipping', JSON.stringify(newState));
        return newState;
    },
    //============================================================
    [actions?.shipping?.setPostCodeError]: (state, { payload: { message } }) => {
        return {
            ...state,
            postCodeError: message,
        };
    },
    //============================================================
    [actions?.shipping?.setAddressError]: (state, { payload: { message } }) => {
        return {
            ...state,
            addressError: message,
        };
    },
    //============================================================
    [actions?.shipping?.setNameError]: (state, { payload: { message } }) => {
        return {
            ...state,
            nameError: message,
        };
    },
    //============================================================
    [actions?.shipping?.setPhoneError]: (state, { payload: { message } }) => {
        return {
            ...state,
            phoneError: message,
        };
    },
    //============================================================
}, defaultState);
