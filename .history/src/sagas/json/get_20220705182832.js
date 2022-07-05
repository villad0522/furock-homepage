
import { put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../../actions';

export default function* getJsonItems({ payload: { fileName } }) {
    yield put(actions.loading.start("JSONファイル「" + fileName + "」を取得"));
    //
    // クエリパラメータを取得
    var params = new URL(window.location.href).searchParams;
    const oneTimeId = params.get('oneTimeId');
    let version = params.get('version');
    if (!version) {
        version = "production";
    }
    //
    let url = 'https://epn63s2g5a.execute-api.ap-northeast-1.amazonaws.com/production/s3/rentalserver-json/'
        + version + '/' + fileName;
    if (oneTimeId) {
        url += '?oneTimeId=' + oneTimeId;
    }
    try {
        const res = yield axios.get(
            url,
            {
                params: {
                    timestamp: new Date().getTime(),
                }
            }
        );
        if (typeof res.data === "string") {
            if (res.data !== 'PLEASE LOGIN') {
                console.error('サーバーエラー : ' + res.data);
                alert(res.data);
            }
            return;
        }
        yield put(actions?.json.setAll(fileName, res.data));
    }
    catch (e) {
        console.error('ロード中にエラー発生 : ' + e);
    }
    finally {
        yield put(actions.loading.end("JSONファイル「" + fileName + "」を取得"));
    }
}
