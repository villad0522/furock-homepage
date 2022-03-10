
import { put, select } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../actions';

export default function* postImage({ payload: { imageId, file } }) {
    yield put(actions.loading.start("画像ファイル「" + imageId + "」をアップロード"));
    //
    const oneTimeId = yield select(state => state?.auth?.oneTimeId);
    //###########################################################################
    try {
        //###########################################################################
        const res = yield axios.post(
            'https://wvdkbseaqd.execute-api.ap-northeast-1.amazonaws.com/production/s3/ayasugi-image/'
            + imageId + '?public=true&oneTimeId=' + oneTimeId,
            file,
            {
                headers: {
                    'content-type': 'image/png',
                },
            }
        );
        //###########################################################################
        if (typeof res.data === "string") {
            if (res.data === 'PLEASE LOGIN') {
                yield put(actions?.auth?.setAuthCode(''));
                yield put(actions?.auth?.setOneTimeId(''));
                yield put(actions?.auth?.setVerifiedFlag(false));
                alert('セッションの有効期限が切れました。再度ログインしてください。');
            }
            else {
                console.error('サーバーエラー：' + res.data);
                alert(res.data);
            }
            yield put(actions.imageUploader.uploaded(imageId, 'FAILURE'));
            return;
        }
        //###########################################################################
        // 追加完了報告
        yield put(actions.imageUploader.uploaded(imageId, res?.data?.url));
        //
        //###########################################################################
    }
    catch (e) {
        alert('ネットワークエラー');
        console.error('アップロード中にエラー発生 : ' + e);
        yield put(actions.imageUploader.uploaded(imageId, 'FAILURE'));
        return;
    }
    finally {
        yield put(actions.loading.end("画像ファイル「" + imageId + "」をアップロード"));
    }
}

