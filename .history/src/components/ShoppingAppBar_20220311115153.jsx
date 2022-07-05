import * as React from 'react';
import { useSelector, } from "react-redux";
import { Link, } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ShoppingAppBar({ backPath = "/", cartFlag = true }) {
    const cart = useSelector(state => state?.cart);
    const cartNum = React.useMemo(() => {
        let quantity = 0;
        for (const key in cart) {
            quantity += cart[key].quantity;
        }
        return quantity;
    }, [cart]);
    return (
        <Box sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            width: '100%',
        }}>
            <Box sx={{
                background: "rgba(255,255,255,0.9)",
                borderRadius: '4px',
                position: 'absolute',
                top: '5px',
                left: '5px',
            }}>
                <Button
                    component={Link}
                    to={backPath}
                    sx={{ color: '#000' }}
                >
                    戻る
                </Button>
            </Box>
            {cartFlag ?
                <IconButton
                    component={Link}
                    to="/shop/cart"
                    size="large"
                    sx={{
                        position: 'absolute',
                        right: '10px',
                    }}
                >
                    <Badge badgeContent={cartNum} color="primary">
                        <ShoppingCartIcon fontSize="inherit" />
                    </Badge>
                </IconButton >
                : null
            }
        </Box >
    );
}
