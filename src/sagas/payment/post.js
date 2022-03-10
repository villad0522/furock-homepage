
import { select, put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../../actions';

export default function* post() {
    yield put(actions.loading.start("PaymentIntentを取得"));
    //
    const cartItems = yield select(state => state?.cart);
    const paymentIntentId = yield select(state => state?.payment?.paymentIntentId);
    //
    // クエリパラメータを取得
    var params = new URL(window.location.href).searchParams;
    const oneTimeId = params.get('oneTimeId');
    let version = params.get('version');
    if (!version) {
        version = "production";
    }
    try {
        const res = yield axios.post(
            'https://wvdkbseaqd.execute-api.ap-northeast-1.amazonaws.com/production/payment',
            {
                paymentIntentId: paymentIntentId ? paymentIntentId : null,
                cartItems,
                oneTimeId,
                version,
            },
        );
        if (typeof res.data === "string") {
            console.error('サーバーエラー：' + res.data);
            alert(res.data);
        }
        yield put(actions?.payment?.set(res.data));
    }
    catch (e) {
        alert('ネットワークエラー');
        console.error('PaymentIntentを取得中にエラー発生 : ' + e);
    }
    finally {
        yield put(actions.loading.end("PaymentIntentを取得"));
    }
}

