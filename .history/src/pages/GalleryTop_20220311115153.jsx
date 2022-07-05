import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { FaLine, FaMapMarkerAlt } from "react-icons/fa";
import { Link, } from "react-router-dom";

const GalleryTop = ({ item, scroll, }) => {
    if (!item) {
        return null;
    }
    return (
        <Box sx={{
            height: '100vh',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box',
            borderTop: '5px solid #fff',
            borderBottom: '5px solid #fff',
        }}>
            <Container>
                <Box sx={{ pt: "25vh" }} />
                <img
                    alt={item.title}
                    src={item.topLogo}
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        position: 'relative',
                        top: -(scroll * 60) + 'vh',
                    }}
                />
                <Typography
                    variant="h5"
                    sx={{
                        opacity: 1 - Math.abs(scroll) * 3,
                    }}
                >
                    {item.subtitle}
                </Typography>
                <Typography sx={{
                    opacity: 1 - Math.abs(scroll) * 3,
                    whiteSpace: 'pre-wrap',
                }}>
                    {item.text}
                </Typography>
            </Container>
            <Box sx={{
                position: 'absolute',
                bottom: "10vh",
                right: '10vw',
                opacity: 1 - Math.abs(scroll) * 3,
            }}>
                <Button
                    sx={{ color: "#333" }}
                    component={Link}
                    to={'/shop'}
                >
                    <Typography variant="h5"   >
                        お取り寄せ
                    </Typography>
                </Button>
            </Box>
            <Box sx={{
                position: 'absolute',
                bottom: '10vh',
                left: "4vw",
                opacity: 1 - Math.abs(scroll) * 3,
            }}>
                {item.instagram ?
                    <IconButton
                        href={item.instagram}
                        target="_blank"
                        sx={{ color: "#555" }}
                    >
                        <InstagramIcon fontSize="large" />
                    </IconButton>
                    : null
                }
                {item.facebook ?
                    <IconButton
                        href={item.facebook}
                        target="_blank"
                        sx={{ color: "#555" }}
                    >
                        <FacebookIcon fontSize="large" />
                    </IconButton>
                    : null
                }
                {item.twitter ?
                    <IconButton
                        href={item.twitter}
                        target="_blank"
                        sx={{ color: "#555" }}
                    >
                        <TwitterIcon fontSize="large" />
                    </IconButton>
                    : null
                }
                {item.line ?
                    <IconButton
                        href={item.line}
                        target="_blank"
                        sx={{ color: "#555" }}
                    >
                        <FaLine size={32} />
                    </IconButton>
                    : null
                }
                {item.googleMap ?
                    <IconButton
                        href={item.googleMap}
                        target="_blank"
                        sx={{ color: "#555" }}
                    >
                        <FaMapMarkerAlt size={30} />
                    </IconButton>
                    : null
                }
            </Box>
        </Box>
    );
}

export default GalleryTop;