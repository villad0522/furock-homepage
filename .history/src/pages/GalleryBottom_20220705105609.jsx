import * as React from 'react';
import Box from '@mui/material/Box';
import Products from './Products';

const GalleryBottom = ({ categories }) => {
    return (
        <Box sx={{ minHeight: '100vh', height: 'max-content' }}>
            <Products categories={categories} />
            <Box sx={{
                pointerEvents: 'none',
                position: 'sticky',
                bottom: '20px',
                textAlign: 'right',
            }}>
                <Container>
                    <CustomButton
                        component={Link}
                        to="/shop/cart"
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