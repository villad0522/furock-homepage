import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Products from './Products';
import { Link, } from "react-router-dom";
import Twitter from './Twitter';

import CustomButton from '../components/CustomButton';
import { Typography } from '@mui/material';

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
            {!item.recruit_flag ?
                <Container>
                    <Box p={6} />
                    <Typography>
                        {item.recruit_stop_text}
                    </Typography>
                    <Box p={6} />
                </Container>
                : null
            }
            <Products categories={categories} />
            {item.twitter_embed_flag ?
                <Twitter
                    screenName={item.twitter}
                    contentheight="300px"
                />
                : null
            }
            {item.recruit_flag ?
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
                : null
            }
        </Box>
    );
}

export default GalleryBottom;