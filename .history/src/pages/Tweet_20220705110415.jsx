import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link, } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Tweet({ categories }) {
    const products = React.useMemo(() => {
        return categories["商品"] ? [...categories["商品"]] : [];
    }, [categories]);

    return (
        <Box sx={{ background: '#f3f3f3' }}>
            <Container>
                <Box p={4} />
                <Typography variant="h4" align="center">
                    Products
                </Typography>
                <Box p={3} />
                <Grid container spacing={2}>
                    {products?.map(item =>
                        <ItemCard key={item.uuid} item={item} />
                    )}
                </Grid>
                <Box p={6} />
            </Container>
        </Box>
    );
}

