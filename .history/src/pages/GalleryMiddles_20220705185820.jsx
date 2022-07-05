import * as React from 'react';
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSpring, animated } from "react-spring";

const GallerySubs = ({ item, index, }) => {
    const nextPage = useSelector(state => state?.animation?.nextPage);
    const isDown = useSelector(state => state?.animation?.isDown);
    const [titleStyles, titleApi] = useSpring(() => ({
        marginTop: 0,
        config: { frequency: 1 },
    }));
    const [underlineStyles, underlineApi] = useSpring(() => ({
        marginTop: 0,
        config: { frequency: 1 },
    }));
    const [textStyles, textApi] = useSpring(() => ({
        marginTop: 0,
        config: { frequency: 1 },
    }));
    const [image1Styles, image1Api] = useSpring(() => ({
        marginTop: 0,
        config: { frequency: 1 },
    }));
    const [image2Styles, image2Api] = useSpring(() => ({
        marginTop: 0,
        config: { frequency: 1 },
    }));
    React.useEffect(() => {
        const startAnimation = (api, name) => {
            const moveX = item[name + '_moveX'] ? item[name + '_moveX'] : 0;
            const moveY = item[name + '_moveY'] ? item[name + '_moveY'] : 0;
            const opacity = item[name + '_opacity'] ? item[name + '_opacity'] : 0;
            const fadeout = item[name + '_fadeout'] ? 0 : opacity;
            if (index === nextPage) {
                if (isDown) {
                    api.start({
                        from: {
                            marginLeft: -moveX,
                            marginTop: moveY,
                            opacity: fadeout,
                        },
                        to: {
                            marginLeft: 0,
                            marginTop: 0,
                            opacity: opacity,
                        },
                    });
                }
                else {
                    api.start({
                        from: {
                            marginLeft: moveX,
                            marginTop: -moveY,
                            opacity: fadeout,
                        },
                        to: {
                            marginLeft: 0,
                            marginTop: 0,
                            opacity: opacity,
                        },
                    });
                }
            }
            else if (index === (nextPage - 1)) {
                api.start({
                    from: {
                        marginLeft: 0,
                        marginTop: 0,
                        opacity: opacity,
                    },
                    to: {
                        marginLeft: moveX,
                        marginTop: -moveY,
                        opacity: fadeout,
                    },
                });
            }
            else if (index === (nextPage + 1)) {
                api.start({
                    from: {
                        marginLeft: 0,
                        marginTop: 0,
                        opacity: opacity,
                    },
                    to: {
                        marginLeft: -moveX,
                        marginTop: moveY,
                        opacity: fadeout,
                    },
                });
            }
        }
        startAnimation(titleApi, 'title');
        startAnimation(underlineApi, 'underline');
        startAnimation(textApi, 'text');
        startAnimation(image1Api, 'image1');
        startAnimation(image2Api, 'image2');
    }, [
        nextPage,
        isDown,
        index,
        item,
        titleApi,
        underlineApi,
        textApi,
        image1Api,
        image2Api,
    ]);
    //
    return (
        <Box sx={{
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box',
        }}>
            <Box sx={{
                zIndex: -100,
                width: '100vw',
                height: '100vh',
                position: 'absolute',
                background: item.bgColor ?
                    ('rgb(' + item.bgColor + ',' + item.bgColor + ',' + item.bgColor + ')') :
                    '#000',
            }} />
            {item.title ?
                <div style={{
                    zIndex: -1,
                    position: 'absolute',
                    width: '300vw',
                    top: item.title_Y ? (item.title_Y + 'vh') : 0,
                    left: item.title_X ? ((item.title_X - 100) + 'vw') : '-100vw',
                }}>
                    <Typography
                        align="center"
                        sx={{
                            color: item.title_color ?
                                ('rgb(' + item.title_color + ',' + item.title_color + ',' + item.title_color + ')') :
                                '#000',
                            fontSize: item.title_size ? (item.title_size + 'px') : '40px',
                        }}
                    >
                        <animated.span style={{
                            ...titleStyles,
                            whiteSpace: 'pre-wrap',
                            padding: '0 10px 0 10px',
                            background:
                                (item.title_bgColor ?
                                    'rgba(' + item.title_bgColor + ',' + item.title_bgColor + ',' + item.title_bgColor :
                                    'rgba(0,0,0'
                                )
                                + ',' + (item.title_bgOpacity ? item.title_bgOpacity : 0) + ')',
                        }}>
                            {item.title}
                        </animated.span>
                        <br />
                        <animated.span style={{
                            ...underlineStyles,
                            whiteSpace: 'pre-wrap',
                            padding: '0 30px 0 30px',
                            borderTop: '3px solid',
                            color: 'rgba(255,255,255,0)',
                            borderColor: item.underline_color ?
                                ('rgb(' + item.underline_color + ',' + item.underline_color + ',' + item.underline_color + ')') :
                                '#000',
                        }} >
                            {item.title}
                        </animated.span>
                    </Typography>
                </div> :
                null
            }
            {item.text ?
                <animated.div style={{
                    ...textStyles,
                    zIndex: -2,
                    position: 'absolute',
                    width: item.text_X ? ((100 - item.text_X) + 'vw') : '100vw',
                    left: item.text_X ? (item.text_X + 'vw') : 0,
                    top: item.text_Y ? (item.text_Y + 'vh') : 0,
                }} >
                    <Container sx={{
                        background:
                            (item.text_bgColor ?
                                'rgba(' + item.text_bgColor + ',' + item.text_bgColor + ',' + item.text_bgColor :
                                'rgba(0,0,0'
                            )
                            + ',' + (item.text_bgOpacity ? item.text_bgOpacity : 0) + ')',
                    }} >
                        <Typography sx={{
                            whiteSpace: 'pre-wrap',
                            p: 1,
                            color: item.text_color ? ('rgb(' + item.text_color + ',' + item.text_color + ',' + item.text_color + ')') : '#000',
                            fontSize: item.fontSize ? (item.fontSize + 'px') : '16px',
                        }}>
                            {item.text}
                        </Typography>
                    </Container>
                </animated.div>
                : null
            }
            {item.image1 ?
                <animated.img
                    alt=""
                    src={item.image1}
                    style={{
                        ...image1Styles,
                        borderRadius: item.image1_borderRadius ? item.image1_borderRadius : 0,
                        zIndex: -3,
                        position: 'absolute',
                        height: item.image1_size ? (item.image1_size + 'vh') : '50vh',
                        top: item.image1_Y ? (item.image1_Y + 'vh') : 0,
                        left: item.image1_X ? (item.image1_X + 'vw') : 0,
                    }}
                /> :
                null
            }
            {item.image2 ?
                <animated.img
                    alt=""
                    src={item.image2}
                    style={{
                        ...image2Styles,
                        borderRadius: item.image2_borderRadius ? item.image2_borderRadius : 0,
                        zIndex: -3,
                        position: 'absolute',
                        height: item.image2_size ? (item.image2_size + 'vh') : '50vh',
                        top: item.image2_Y ? (item.image2_Y + 'vh') : 0,
                        left: item.image2_X ? (item.image2_X + 'vw') : 0,
                    }}
                /> :
                null
            }
        </Box>
    );
}
export default GallerySubs;