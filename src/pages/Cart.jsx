
import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Elements, } from '@stripe/react-stripe-js';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Skeleton from '@mui/material/Skeleton';
import FormGroup from '@mui/material/FormGroup';

import TextField from '../components/TextField';
import CustomButton from '../components/CustomButton';
import MyPaymentElement from '../components/MyPaymentElement';
import SubmitButton from '../components/SubmitButton';
import ShoppingAppBar from '../components/ShoppingAppBar';
import PostCode from '../components/PostCode/PostCode';
import stripePromise from '../stripePromise';
import actions from '../actions';

export default function Cart() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state?.loading?.flag);
    const clientSecret = useSelector(state => state?.payment?.clientSecret);
    const amount = useSelector(state => state?.payment?.amount);
    const postage = useSelector(state => state?.payment?.postage);
    const sum = useSelector(state => state?.payment?.sum);
    const items = useSelector(state => state?.payment?.items);

    const address = useSelector(state => state?.shipping?.address);
    const addressError = useSelector(state => state?.shipping?.addressError);
    const name = useSelector(state => state?.shipping?.name);
    const nameError = useSelector(state => state?.shipping?.nameError);
    const postCode = useSelector(state => state?.shipping?.postCode);
    const postCodeError = useSelector(state => state?.shipping?.postCodeError);
    const phone = useSelector(state => state?.shipping?.phone);
    const phoneError = useSelector(state => state?.shipping?.phoneError);

    React.useEffect(() => {
        // ページが読み込まれるとすぐにPaymentIntentを作成します
        dispatch(actions?.payment?.post());
        return () => dispatch(actions?.payment?.set({}));
    }, [dispatch,]);

    React.useEffect(() => {
        if (postCode?.length >= 7) {
            dispatch(actions.shipping.autoComplete());
        }
    }, [dispatch, postCode]);

    const handleAdd = (item) => {
        dispatch(actions?.cart?.add(item.uuid, item.optionA, item.optionB, 1));
        dispatch(actions?.payment?.post());
    };

    const handleRemove = (item) => {
        dispatch(actions?.cart?.remove(item.uuid, item.optionA, item.optionB, 1));
        dispatch(actions?.payment?.post());
    };

    return (
        <Box sx={{ background: '#f3f3f3', minHeight: '100vh', height: 'max-content' }}>
            <Container maxWidth="md">
                <ShoppingAppBar backPath="/shop" cartFlag={false} />
                <Box p={4} />
                <Divider />
                <Box p={1} />
                <Typography variant="h5" align="center">
                    ショッピングカート
                </Typography>
                <Box p={1} />
                <Paper>
                    {(items?.length > 0) ?
                        <List>
                            {items.map(item =>
                                <ListItem
                                    key={item.uuid}
                                    disablePadding
                                    secondaryAction={
                                        <Stack
                                            direction="row"
                                            justifyContent="flex-end"
                                        >
                                            <IconButton
                                                disabled={loading ? true : false}
                                                onClick={() => handleAdd(item)}
                                            >
                                                <AddCircleIcon />
                                            </IconButton>
                                            <Typography sx={{ pt: '7px' }}>
                                                {item.quantity}
                                            </Typography>
                                            <IconButton
                                                disabled={loading ? true : false}
                                                onClick={() => handleRemove(item)}
                                            >
                                                <RemoveCircleIcon />
                                            </IconButton>
                                        </Stack>
                                    }
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={item.title}
                                                src={item.image1}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item?.title}
                                            secondary={
                                                <React.Fragment>
                                                    {item?.optionA_text + ', ' + item?.optionB_text}
                                                    <br />
                                                    {Number(item?.sum)?.toLocaleString()}円
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </List> :
                        <Typography align="center" sx={{ px: 1, py: 6, }} >
                            カートは空です
                        </Typography>
                    }
                </Paper>
                <Box p={1} />
                <Typography align="right">
                    商品合計：
                    {(amount > 0 || amount === 0) ?
                        Number(amount)?.toLocaleString() :
                        <Skeleton variant="text" width="30px" sx={{ display: 'inline-block' }} />
                    }円
                </Typography>
                <Typography align="right">
                    送料：
                    {(postage > 0 || postage === 0) ?
                        Number(postage)?.toLocaleString() :
                        <Skeleton variant="text" width="30px" sx={{ display: 'inline-block' }} />
                    }円
                </Typography>
                <Box p={1} />
                <Typography variant="h6" align="right">
                    合計：
                    {(sum > 0 || sum === 0) ?
                        Number(sum)?.toLocaleString() :
                        <Skeleton variant="text" width="30px" sx={{ display: 'inline-block' }} />
                    }円
                </Typography>
                <Box p={2} />
                <Divider />
                <Box p={1} />
                <FormGroup >
                    <Typography variant="h5" align="center">
                        お届け先
                    </Typography>
                    <Box p={1} />
                    <PostCode
                        value={postCode}
                        onChange={(event) => dispatch(actions.shipping.setPostCode(event.target.value))}
                        onFocus={(event) => dispatch(actions.shipping.setPostCodeError(''))}
                        helperText={postCodeError}
                        error={postCodeError ? true : false}
                    />
                    <Box p={1} />
                    <TextField
                        value={address}
                        placeholder="東京都千代田区大手町１丁目１‐１　〇〇〇マンション101号室"
                        onChange={(event) => dispatch(actions.shipping.setAddress(event.target.value))}
                        onFocus={(event) => dispatch(actions.shipping.setAddressError(''))}
                        multiline
                        rows={4}
                        autoComplete="street-address"
                        helperText={addressError}
                        error={addressError ? true : false}
                    />
                    <Box p={1} />
                    <TextField
                        label="お受取人さまの氏名"
                        value={name}
                        onChange={(event) => dispatch(actions.shipping.setName(event.target.value))}
                        onFocus={(event) => dispatch(actions.shipping.setNameError(''))}
                        autoComplete="name"
                        helperText={nameError}
                        error={nameError ? true : false}
                    />
                    <Box p={3} />
                    <Divider />
                    <Box p={1} />
                    <Typography variant="h5" align="center">
                        ご連絡先
                    </Typography>
                    <Box p={1} />
                    <TextField
                        label="電話番号"
                        value={phone}
                        onChange={(event) => dispatch(actions.shipping.setPhone(event.target.value))}
                        onFocus={(event) => dispatch(actions.shipping.setPhoneError(''))}
                        autoComplete="tel"
                        type="tel"
                        helperText={phoneError}
                        error={phoneError ? true : false}
                    />
                </FormGroup>
                <Box p={3} />
                <Divider />
                <Box p={1} />
                <Typography variant="h5" align="center">
                    お支払い方法
                </Typography>
                {clientSecret ?
                    <Elements
                        stripe={stripePromise}
                        options={{
                            clientSecret: clientSecret, // サーバーから取得したクライアントシークレットを渡す
                            appearance: {
                                variables: {
                                    fontFamily: '"Shippori Mincho B1", serif',
                                    colorPrimary: '#000',
                                    focusBoxShadow: '0 0 0 3px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.5)',
                                },
                                rules: {
                                    '.Input': {
                                        border: 'none',
                                        boxShadow: 'none',
                                    },
                                    '.Input:focus, .Input:hover': {
                                        border: 'none',
                                        boxShadow: 'inset 2px 2px 2px #ccc',
                                    },
                                    '.Input::placeholder': {
                                        color: '#bbb',
                                    },
                                }
                            },// スタイル
                        }}
                    >
                        <MyPaymentElement />
                        <Box p={4} />
                        <Divider />
                        <Box p={2} />
                        <Box sx={{
                            pointerEvents: 'none',
                            position: 'sticky',
                            bottom: '20px',
                            textAlign: 'center',
                        }}>
                            <SubmitButton disabled={amount < 50}>
                                ご注文を確定する
                            </SubmitButton>
                        </Box>
                    </Elements>
                    :
                    <>
                        <MyPaymentElement skelton />
                        <Box p={4} />
                        <Divider />
                        <Box p={2} />
                        <Box sx={{
                            pointerEvents: 'none',
                            position: 'sticky',
                            bottom: '20px',
                            textAlign: 'center',
                        }}>
                            <CustomButton disabled>
                                ご注文を確定する
                            </CustomButton>
                        </Box>
                    </>
                }
                <Box p={2} />
            </Container>
        </Box>
    );
};