import * as React from 'react';
import Box from '@mui/material/Box';
import Products from './Products';

const GalleryBottom = ({ categories }) => {
    return (
        <Box sx={{ minHeight: '100vh', height: 'max-content' }}>
            <Products categories={categories} />
        </Box>
    );
}

export default GalleryBottom;