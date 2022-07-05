import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Products from './Products';
import { Link, } from "react-router-dom";

import CustomButton from '../components/CustomButton';

const GalleryBottom = ({ categories }) => {
    const item = React.useMemo(() => {
        const topItems = categories["一般設定"] ? [...categories["一般設定"]] : [];
        const topItem = topItems[0] ? { ...topItems[0] } : {};
        return topItem;
    }, [categories]);
    if (!item) {
        return null;
    }
    return (
        <Box sx={{ minHeight: '100vh', height: 'max-content' }}>
            <Products categories={categories} />
            <iframe
                title='参加申込'
                src={`https://docs.google.com/forms/d/e/${item.recruit_form}/viewform?embedded=true`}
                width="100%"
                height="1500"
                frameborder="0"
                marginheight="0"
                marginwidth="0"
            >
                読み込んでいます…
            </iframe>
            <Box sx={{
                pointerEvents: 'none',
                position: 'sticky',
                bottom: '20px',
                textAlign: 'right',
            }}>
                <Container>
                    <CustomButton
                        component={Link}
                        to="/join"
                        sx={{ pointerEvents: 'auto', }}
                    >
                        参加申込
                    </CustomButton>
                </Container>
            </Box>
            <iframe
                title='参加申込'
                src={`https://docs.google.com/forms/d/e/${item.recruit_form}/viewform?embedded=true`}
                width="100%"
                height="1500"
                frameborder="0"
                marginheight="0"
                marginwidth="0"
            >
                読み込んでいます…
            </iframe>
        </Box>
    );
}

export default GalleryBottom;