import * as React from 'react';
import { useSelector } from "react-redux";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AppBar from '../components/AppBar';

export default function Join({ fileName }) {
    const files = useSelector(state => state?.json?.files);
    const item = React.useMemo(() => {
        const categories = files[fileName] ? { ...files[fileName] } : {};
        const topItems = categories["一般設定"] ? [...categories["一般設定"]] : [];
        const topItem = topItems[0] ? { ...topItems[0] } : {};
        return topItem;
    }, [files, fileName]);
    if (!item) {
        return null;
    }
    return (
        <Box sx={{ background: '#333', minHeight: '100vh', height: 'max-content' }}>
            <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                <Paper>
                    <AppBar backPath="/products" />
                    <Container maxWidth="md">
                        <img
                            alt=''
                            src={item.teamLogo}
                            style={{
                                width: '150px',
                                padding: '30px',
                            }}
                        />
                        <Box p={1} />
                        <iframe
                            title='参加申込'
                            src="https://docs.google.com/forms/d/e/1FAIpQLSee-gFwzU_u4cmEhmK8_vw-sfv6hcsYgWbJI7H8rIFyiDGRWA/viewform?embedded=true"
                            width="640"
                            height="1500"
                            frameborder="0"
                            marginheight="0"
                            marginwidth="0"
                        >
                            読み込んでいます…
                        </iframe>
                    </Container>
                </Paper>
                <Box p={6} />
            </Container>
        </Box>
    );
}
