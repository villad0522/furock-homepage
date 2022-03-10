
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'black',
        background: 'rgba(255,255,255,0.8)',
        borderRadius: '10px',
        padding: '5px',
    },
    '& .MuiInput-underline:after': {
        color: 'black',
    },
    '& .MuiOutlinedInput-root': {
        background: '#fff',
        '& fieldset': {
            borderColor: 'rgba(0,0,0,0)',
            boxShadow: 'none',
        },
        '&:hover fieldset': {
            border: 'none',
            boxShadow: 'inset 2px 2px 2px #ccc',
        },
        '&.Mui-focused fieldset': {
            border: 'none',
            boxShadow: 'inset 2px 2px 2px #ccc',
        },
    },
});

export default CssTextField;
