
import { put, select } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../../actions';

export default function* autoComplete() {
    // 住所を取得
    const address1 = yield select(state => state?.shipping?.address);
    if (address1) {
        return;
    }
    yield put(actions.loading.start("住所自動補完"));
    //
    // 郵便番号を取得
    const postCode = yield select(state => state?.shipping?.postCode);
    //
    try {
        const res = yield axios.get(
            "https://zipcloud.ibsnet.co.jp/api/search?zipcode=" + postCode
        );
        //
        // 住所を取得
        const address2 = yield select(state => state?.shipping?.address);
        if (address2) {
            return;
        }
        const result = res?.data?.results?.[0];
        const address = result?.address1 + result?.address2 + result?.address3;
        yield put(actions?.shipping?.setAddress(address));
    }
    catch (e) {
        console.error('住所自動補完中にエラー発生 : ' + e);
    }
    finally {
        yield put(actions.loading.end("住所自動補完"));
    }
}
