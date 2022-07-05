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

const ItemCard = ({ item, }) => {
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
    const optionPrice = React.useMemo(() => {
        for (let i = 0; i < 6; i++) {
            if (item['optionA_' + i + '_price'] > 0) {
                return true;
            }
            else if (item['optionB_' + i + '_price'] > 0) {
                return true;
            }
        }
        return false;
    }, [item]);
    return (
        <Grid item lg={3} md={4} xs={6}>
            <Card sx={{ height: '100%', borderRadius: '6px' }}>
                <CardActionArea
                    component={Link}
                    to={"/product/" + item.uuid}
                    sx={{ position: 'relative', height: '100%', }}
                >
                    {item.image1 &&
                        <CardMedia
                            component="img"
                            height={isPhone ? 100 : 160}
                            image={item.image1}
                            alt={item.title + "_1"}
                        />
                    }
                    <CardContent >
                        <Typography sx={{
                            fontSize: isPhone ? '16px' : '22px',
                        }}>
                            {item.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {item.overview}
                        </Typography>
                        <Box sx={{ minHeight: isPhone ? '20px' : "10px" }} />
                        <Typography sx={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '20px',
                        }}>
                            ￥{item.price}
                            {optionPrice && "～"}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default function Products({ categories }) {
    const products = React.useMemo(() => {
        return categories["歴代ロケット"] ? [...categories["歴代ロケット"]] : [];
    }, [categories]);

    return (
        <Box sx={{ background: '#333', color: '#fff' }}>
            <Container>
                <Box p={4} />
                <Typography variant="h4" align="center" id="products">
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

