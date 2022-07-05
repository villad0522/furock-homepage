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
    MESSAGE: {
        SET: (severity, message, vertical, horizontal) => ({ severity, message, vertical, horizontal }),
    },
    ANIMATION: {
        SET: (nowPage, nextPage, isDown) => ({ nowPage, nextPage, isDown }),
    },
})