import * as React from 'react';
import { Link, } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function ShoppingAppBar({ backPath = "/" }) {
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
        </Box >
    );
}
