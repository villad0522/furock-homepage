import { createActions } from 'redux-actions'

export default createActions({
    LOADING: {
        START: (processName) => ({ processName }),
        END: (processName) => ({ processName }),
    },
    AUTH: {
        SET_ONE_TIME_ID: (oneTimeId) => ({ oneTimeId }),
        SET_VERIFIED_FLAG: (verifiedFlag) => ({ verifiedFlag }),
        LOGIN_CHECK: () => ({}),
    },
    IMAGE_UPLOADER: {
        POST: (imageId, file) => ({ imageId, file }),
        UPLOADED: (imageId, url) => ({ imageId, url }),
    },
    JSON: {
        GET: (fileName) => ({ fileName }),
        SET_ALL: (fileName, items) => ({ fileName, items }),
    },
    PAYMENT: {
        POST: () => ({}),
        SET: (data) => ({ data }),
    },
    MESSAGE: {
        SET: (severity, message, vertical, horizontal) => ({ severity, message, vertical, horizontal }),
    },
    CART: {
        ADD: (uuid, optionA, optionB, quantity) => ({ uuid, optionA, optionB, quantity }),
        REMOVE: (uuid, optionA, optionB, quantity) => ({ uuid, optionA, optionB, quantity }),
    },
    ANIMATION: {
        SET: (nowPage, nextPage, isDown) => ({ nowPage, nextPage, isDown }),
    },
    SHIPPING: {
        AUTO_COMPLETE: () => ({}),
        SET_POST_CODE: (postCode) => ({ postCode }),
        SET_POST_CODE_ERROR: (message) => ({ message }),
        SET_ADDRESS: (address) => ({ address }),
        SET_ADDRESS_ERROR: (message) => ({ message }),
        SET_NAME: (name) => ({ name }),
        SET_NAME_ERROR: (message) => ({ message }),
        SET_PHONE: (phone) => ({ phone }),
        SET_PHONE_ERROR: (message) => ({ message }),
    },
})