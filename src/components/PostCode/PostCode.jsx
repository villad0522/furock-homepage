import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import './textCursor.scss';

const Character = ({ children, focus, hover, error, cursorLeft, cursorRight, background = '#fff' }) => {
    return (
        <span style={{ position: 'relative', textAlign: 'center', }}>
            <span style={{
                boxShadow: ((focus || hover) && background !== 'none') ?
                    'inset 2px 2px 2px #ccc' :
                    'none',
                background: background,
                borderRadius: '5px',
                padding: (background === 'none') ? '10px 0 10px 0' : '10px 5px 10px 5px',
                margin: '0 2px 0 2px',
                border: error ? 'solid 1px red' : 'none',
            }}>　</span>
            <span style={{
                zIndex: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
            }}            >
                {children}
            </span>
            <span
                style={{
                    zIndex: 2,
                    position: 'absolute',
                    top: 0,
                    left: '20%',
                    width: '60%',
                    height: '100%',
                }}
                className={
                    (cursorRight && focus && "text-cursor-right")
                    + " " +
                    (cursorLeft && focus && "text-cursor-left")
                }
            />
        </span>
    );
}

export default function PostCode({ value, onChange, sx, onFocus, helperText, error, ...props }) {
    const [focus, setFocus] = React.useState(false);
    const [hover, setHover] = React.useState(false);
    return (
        <>
            <Box
                {...props}
                sx={{
                    py: '10px',
                    position: 'relative',
                    ...sx,
                }}
            >
                <Character background="none">〒</Character>
                <Character
                    cursorLeft={(value?.length === 0) ? true : false}
                    focus={focus}
                    hover={hover}
                    error={error}
                >
                    {value?.charAt(0)}
                </Character>
                <Character
                    cursorLeft={(value?.length === 1) ? true : false}
                    focus={focus}
                    hover={hover}
                    error={error}
                >
                    {value?.charAt(1)}
                </Character>
                <Character
                    cursorLeft={(value?.length === 2) ? true : false}
                    focus={focus}
                    hover={hover}
                    error={error}
                >
                    {value?.charAt(2)}
                </Character>
                <Character background="none">-</Character>
                <Character
                    cursorLeft={(value?.length === 3) ? true : false}
                    focus={focus}
                    hover={hover}
                    error={error}
                >
                    {value?.charAt(3)}
                </Character>
                <Character
                    cursorLeft={(value?.length === 4) ? true : false}
                    focus={focus}
                    hover={hover}
                    error={error}
                >
                    {value?.charAt(4)}
                </Character>
                <Character
                    cursorLeft={(value?.length === 5) ? true : false}
                    focus={focus}
                    hover={hover}
                    error={error}
                >
                    {value?.charAt(5)}
                </Character>
                <Character
                    cursorLeft={(value?.length === 6) ? true : false}
                    cursorRight={(value?.length === 7) ? true : false}
                    focus={focus}
                    hover={hover}
                    error={error}
                >
                    {value?.charAt(6)}
                </Character>
                <TextField
                    type="tel"
                    value={value}
                    sx={{
                        zIndex: 10,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                    }}
                    onChange={onChange}
                    onFocus={() => {
                        setFocus(true);
                        onFocus();
                    }}
                    onBlur={() => setFocus(false)}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    autoComplete="postal-code"
                />
            </Box>
            <Typography
                variant="caption"
                sx={{
                    pl: 3,
                    pt: '5px',
                    ...error ? { color: 'red' } : {},
                }}
            >
                {helperText}
            </Typography>
        </>
    );
}