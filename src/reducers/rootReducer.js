
import { combineReducers } from 'redux';
import json from './json';
import loading from './loading';
import imageUploader from './imageUploader';
import payment from './payment';
import cart from './cart';
import message from './message';
import userId from './userId';
import animation from './animation';
import shipping from './shipping';

//親玉Reducer
export default combineReducers({
    loading,
    json,
    imageUploader,
    payment,
    cart,
    message,
    userId,
    animation,
    shipping,
});