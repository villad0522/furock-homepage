
import { combineReducers } from 'redux';
import json from './json';
import loading from './loading';
import imageUploader from './imageUploader';
import message from './message';
import userId from './userId';
import animation from './animation';

//親玉Reducer
export default combineReducers({
    loading,
    json,
    imageUploader,
    message,
    userId,
    animation,
});