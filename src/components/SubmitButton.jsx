
import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import CustomButton from './CustomButton';
import actions from '../actions';

export default function SubmitButton({ disabled }) {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const loading = useSelector(state => state?.loading?.flag);
    const phone = useSelector(state => state?.shipping?.phone);
    const address = useSelector(state => state?.shipping?.address);
    const name = useSelector(state => state?.shipping?.name);
    const postCode = useSelector(state => state?.shipping?.postCode);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!postCode) {
            await dispatch(actions.shipping.setPostCodeError('空欄です'));
            await dispatch(actions?.message?.set('error', '郵便番号が空欄です', 'top', 'center'));
            return;
        }
        if (!address) {
            await dispatch(actions.shipping.setAddressError('空欄です'));
            await dispatch(actions?.message?.set('error', 'お届け先住所が空欄です', 'top', 'center'));
            return;
        }
        if (!name) {
            await dispatch(actions.shipping.setNameError('空欄です'));
            await dispatch(actions?.message?.set('error', 'お受け取り人さまの氏名が空欄です', 'top', 'center'));
            return;
        }
        if (!phone) {
            await dispatch(actions.shipping.setPhoneError('空欄です'));
            await dispatch(actions?.message?.set('error', '電話番号が空欄です', 'top', 'center'));
            return;
        }
        if (!stripe || !elements) {
            // Stripe.jsはまだロードされていません。
            // Stripe.jsが読み込まれるまで、フォームの送信を無効にしてください。
            return;
        }
        const url = window.location.protocol + "//" + window.location.host + window.location.pathname + "#/shop/complete";
        await dispatch(actions?.loading?.setLoading(true));
        const { error } = await stripe.confirmPayment({
            elements,
            shipping: {
                //参考：https://stripe.com/docs/api/payment_intents/confirm#confirm_payment_intent-shipping
                address: '〒' + postCode + '\n' + address,
                name,
                phone,
            },
            confirmParams: {
                // 必ずお支払い完了ページに変更してください
                return_url: url,
            },
        });
        //
        // このポイントに到達するのは、支払いの確認時にすぐにエラーが発生した場合のみです。
        // それ以外の場合、顧客は `return_url`にリダイレクトされます。
        // iDEALなどの一部の支払い方法では、
        // 顧客は最初に中間サイトにリダイレクトされて支払いを承認し、
        // 次に `return_url`にリダイレクトされます。
        if (error.type === "card_error" || error.type === "validation_error") {
            await dispatch(actions?.message?.set('error', error.message, 'top', 'center'));
        }
        else {
            await dispatch(actions?.message?.set('error', 'An unexpected error occured.', 'top', 'center'));
        }
        await dispatch(actions?.loading?.setLoading(false));
    };

    return (
        <CustomButton
            onClick={handleSubmit}
            disabled={disabled || loading || !stripe || !elements}
        >
            ご注文を確定する
        </CustomButton>
    );
}