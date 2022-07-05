
//yield put({type:'ACTION', ...})   ActionをDispatchする
//yield take(['ACTION'])            指定のActionがDispatchされるまで待つ
//yield takeEvery('ACTION', func)   ActionがDispatchされたら、毎回関数を呼び出すように設定する（同じActionが複数回来た場合は、並列で処理を行う）
//yield call(func, args)            関数をを呼び出して、終了を待つ（関数から戻り値を貰える）
//yield fork(func)                  バックグラウンド処理を開始する。（終了は待たない）
//yield select(selector関数, args)  storeからデータを取りたい
//takeLatest                        処理をキャンセルし、新しい処理を行う
//axios.get(..)                     GET関数とかをコール

import { takeEvery, } from 'redux-saga/effects';
import actions from '../actions';
import getJson from './json/get';
import postImage from './postImage';

export default function* rootSaga() {
    yield takeEvery(actions?.json?.get, getJson);
    yield takeEvery(actions?.imageUploader?.post, postImage);
    //const userId = localStorage.getItem('userId');
    //if (userId) {
    //yield call(loginCheck, oneTimeId);
    //}
}
