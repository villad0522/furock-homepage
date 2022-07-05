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
            <a
                class="twitter-timeline"
                href="https://twitter.com/pr_furock?ref_src=twsrc%5Etfw"
            >
                Tweets by pr_furock
            </a>
            <script
                async
                src="https://platform.twitter.com/widgets.js"
                charset="utf-8"
            ></script>
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
        </Box>
    );
}

export default GalleryBottom;