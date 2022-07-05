import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link, } from "react-router-dom";

import actions from '../actions';
import CustomButton from '../components/CustomButton';
import ShoppingAppBar from '../components/ShoppingAppBar';

const SmallImageBox = ({ url, select, onMouseEnter }) => {
    return (
        <Grid item xs={3}>
            <Box
                onClick={event => {
                    if (!url) { return; }
                    onMouseEnter(event);
                }}
                onMouseEnter={event => {
                    if (!url) { return; }
                    onMouseEnter(event);
                }}
                sx={{
                    opacity: select ? 0.8 : 1,
                    paddingTop: '100%',
                    backgroundImage: 'url("' + url + '")',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'local',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                }}
            />
        </Grid>
    );
}

export default function Product({ fileName }) {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [selectImage, setSelectImage] = React.useState(1);
    const [quantity, setQuantity] = React.useState(1);
    const files = useSelector(state => state?.json?.files);
    const [topItem, item] = React.useMemo(() => {
        const pathArray = pathname.split('/');
        const childPath = (pathArray.length >= 3) ? pathArray[2] : null;
        const categories = files[fileName] ? { ...files[fileName] } : {};
        const products = categories["歴代ロケット"] ? [...categories["歴代ロケット"]] : [];
        const topItems = categories["一般設定"] ? [...categories["一般設定"]] : [];
        const topItem = topItems[0] ? { ...topItems[0] } : {};
        for (const item of products) {
            if (item.uuid === childPath) {
                return [topItem, item];
            }
        }
        return [topItem, null];
    }, [pathname, files, fileName]);
    const rows = React.useMemo(() => {
        if (!item) {
            return [];
        }
        const row = [];
        for (let i = 0; i < 6; i++) {
            const key = item['list' + i + '_key'];
            const text = item['list' + i + '_text'];
            if (key && text) {
                row.push({
                    key,
                    text,
                });
            }
        }
        return row;
    }, [item]);
    const optionA = React.useMemo(() => {
        if (!item) {
            return [];
        }
        const optionA = [];
        for (let i = 0; i < 6; i++) {
            const text = item['optionA_' + i];
            const price = item['optionA_' + i + '_price'];
            if (text) {
                optionA.push({
                    text,
                    price,
                });
            }
        }
        return optionA;
    }, [item]);
    const optionB = React.useMemo(() => {
        if (!item) {
            return [];
        }
        const optionB = [];
        for (let i = 0; i < 6; i++) {
            const text = item['optionB_' + i];
            const price = item['optionB_' + i + '_price'];
            if (text) {
                optionB.push({
                    text,
                    price,
                });
            }
        }
        return optionB;
    }, [item]);
    const price = React.useMemo(() => {
        if (!item) {
            return [];
        }
        let price = Number(item?.price ? item?.price : 0);
        price += Number(optionA[optionAIndex]?.price ? optionA[optionAIndex]?.price : 0);
        price += Number(optionB[optionBIndex]?.price ? optionB[optionBIndex]?.price : 0);
        return price;
    }, [item, optionA, optionB, optionAIndex, optionBIndex]);
    if (!item) {
        return null;
    }
    return (
        <Box sx={{ background: '#f3f3f3', minHeight: '100vh', height: 'max-content' }}>
            <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                <Paper>
                    <ShoppingAppBar backPath="/products" cartFlag={true} />
                    <Container maxWidth="md">
                        <img
                            alt={topItem.title}
                            src={topItem.teamLogo}
                            style={{
                                width: '150px',
                                padding: '5px',
                                borderTop: 'solid 2px #333',
                                borderBottom: 'solid 2px #333',
                                margin: '30px',
                            }}
                        />
                        <Box p={1} />
                        <Typography variant="h4">
                            {item.title}
                        </Typography>
                        <Box p={1} />
                        <Typography variant="h6">
                            {item.overview}
                        </Typography>
                        <Box p={1} />
                        <Box sx={{
                            width: '80%',
                            maxWidth: '300px',
                            mx: 'auto',
                        }} >
                            <Box sx={{
                                paddingTop: '100%',
                                backgroundImage: 'url("' + item['image' + selectImage] + '")',
                                backgroundPosition: 'center',
                                backgroundAttachment: 'local',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                            }} />
                        </Box>
                        <Grid
                            container
                            spacing={1}
                            sx={{
                                width: '80%',
                                maxWidth: '300px',
                                mx: 'auto',
                            }}
                        >
                            <SmallImageBox
                                url={item.image1}
                                select={selectImage === 1}
                                onMouseEnter={() => setSelectImage(1)}
                            />
                            <SmallImageBox
                                url={item.image2}
                                select={selectImage === 2}
                                onMouseEnter={() => setSelectImage(2)}
                            />
                            <SmallImageBox
                                url={item.image3}
                                select={selectImage === 3}
                                onMouseEnter={() => setSelectImage(3)}
                            />
                            <SmallImageBox
                                url={item.image4}
                                select={selectImage === 4}
                                onMouseEnter={() => setSelectImage(4)}
                            />
                        </Grid>
                        <Box p={2} />
                        <Typography align="left" sx={{ whiteSpace: 'pre-wrap', }}>
                            {item.text}
                        </Typography>
                        <Box p={3} />
                        <Table sx={{
                            minWidth: '200px',
                            maxWidth: '100%',
                            width: 'max-content',
                            mx: 'auto',
                            border: 'solid 0.5px #ddd',
                        }}>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.key}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell
                                            align="right"
                                            sx={{ whiteSpace: 'nowrap', }}
                                            component="th"
                                        >
                                            {row.key}
                                        </TableCell>
                                        <TableCell>{row.text}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Box p={2} />
                    </Container>
                    <Box sx={{
                        pointerEvents: 'none',
                        position: 'sticky',
                        bottom: '5px',
                        textAlign: 'right',
                    }}>
                        {(quantity > 0) ?
                            <CustomButton
                                whiteBack
                                onClick={() => {
                                    dispatch(actions?.cart?.add(
                                        item.uuid, optionAIndex, optionBIndex, quantity
                                    ));
                                    dispatch(actions?.message?.set(
                                        'success',
                                        'カートに' + quantity + '点追加しました',
                                        'top',
                                        'center'
                                    ));
                                    setQuantity(0);
                                }}
                            >
                                カートに入れる
                            </CustomButton> :
                            <CustomButton
                                whiteBack
                                component={Link}
                                to="/shop/cart"
                            >
                                レジに進む
                            </CustomButton>
                        }
                    </Box>
                    <Box p={2} />
                </Paper>
                <Box p={6} />
            </Container>
        </Box>
    );
}
