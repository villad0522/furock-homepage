
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ColorButton = styled(Button)(() => ({
    backgroundColor: "#333",
    color: '#fff',
    fontSize: '20px',
    '&:hover': {
        backgroundColor: "#555",
    },
    pointerEvents: 'auto',
    '&.Mui-disabled': {
        color: '#999',
    },
}));

export default function CustomButton({ whiteBack, ...props }) {
    return (
        <Box sx={{
            display: 'inline-block',
            boxSizing: 'border-box',
            padding: '5px',
            background: whiteBack ? 'rgba(255,255,255,0.5)' : 'none',
            borderRadius: '10px',
        }}>
            <Box sx={{
                display: 'inline-block',
                padding: '5px',
                background: whiteBack ? 'rgba(255,255,255,0.9)' : 'none',
                borderRadius: '10px',
            }} >
                <ColorButton {...props} />
            </Box>
        </Box>
    );
}