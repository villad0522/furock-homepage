
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useStripe } from "@stripe/react-stripe-js";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Elements, } from '@stripe/react-stripe-js';

import actions from '../actions';
import stripePromise from '../stripePromise';
import ShoppingAppBar from '../components/ShoppingAppBar';

export default function Complete() {
    const dispatch = useDispatch();
    const clientSecret = useSelector(state => state?.payment?.clientSecret);

    useEffect(() => {
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );
        if (!clientSecret) {
            return;
        }
        dispatch(actions?.payment?.set({ clientSecret }));
    }, [dispatch]);

    return (
        <Box sx={{ background: '#f3f3f3', minHeight: '100vh', height: 'max-content' }}>
            <Container maxWidth="md">
                <ShoppingAppBar backPath="/shop" cartFlag={false} />
                <Box p={8} />
                {clientSecret &&
                    <Elements
                        stripe={stripePromise}
                        options={{
                            clientSecret: clientSecret, // サーバーから取得したクライアントシークレットを渡す
                        }}
                    >
                        <Message />
                    </Elements>
                }
            </Container>
        </Box>
    );
}


const Message = () => {
    const stripe = useStripe();
    const [message, setMessage] = useState(null);
    const clientSecret = useSelector(state => state?.payment?.clientSecret);

    useEffect(() => {
        if (!stripe || !clientSecret) {
            return;
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("ご注文が完了しました。");
                    break;
                case "processing":
                    setMessage("処理中です...");
                    break;
                case "requires_payment_method":
                    setMessage("お支払いに失敗しました。もう一度お試しください。");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe, clientSecret]);

    return (
        <Typography variant="h6" align="center">
            {message && <div id="payment-message">{message}</div>}
        </Typography>
    );
}