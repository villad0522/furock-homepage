import * as React from 'react';
import { useSelector } from "react-redux";
import { useLocation, } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
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
                            src={topItem.teamLogo}
                            style={{
                                width: '150px',
                                padding: '30px',
                            }}
                        />
                        <Box p={1} />
                        <Typography variant="h4">
                            {item.title}
                        </Typography>
                        <Box p={1} />
                        <Typography variant="h6">
                            {item.overview}
                        </Typography>
                        <Box p={1} />
                        <Box sx={{
                            width: '80%',
                            maxWidth: '300px',
                            mx: 'auto',
                        }} >
                            <Box sx={{
                                paddingTop: '100%',
                                backgroundImage: 'url("' + item['image' + selectImage] + '")',
                                backgroundPosition: 'center',
                                backgroundAttachment: 'local',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                            }} />
                        </Box>
                        <Grid
                            container
                            spacing={1}
                            sx={{
                                width: '80%',
                                maxWidth: '300px',
                                mx: 'auto',
                            }}
                        >
                            <SmallImageBox
                                url={item.image1}
                                select={selectImage === 1}
                                onMouseEnter={() => setSelectImage(1)}
                            />
                            <SmallImageBox
                                url={item.image2}
                                select={selectImage === 2}
                                onMouseEnter={() => setSelectImage(2)}
                            />
                            <SmallImageBox
                                url={item.image3}
                                select={selectImage === 3}
                                onMouseEnter={() => setSelectImage(3)}
                            />
                            <SmallImageBox
                                url={item.image4}
                                select={selectImage === 4}
                                onMouseEnter={() => setSelectImage(4)}
                            />
                        </Grid>
                        <Box p={2} />
                        <Typography align="left" sx={{ whiteSpace: 'pre-wrap', }}>
                            {item.text}
                        </Typography>
                        <Box p={3} />
                        <Table sx={{
                            minWidth: '200px',
                            maxWidth: '100%',
                            width: 'max-content',
                            mx: 'auto',
                            border: 'solid 0.5px #ddd',
                        }}>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.key}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell
                                            align="right"
                                            sx={{ whiteSpace: 'nowrap', }}
                                            component="th"
                                        >
                                            {row.key}
                                        </TableCell>
                                        <TableCell>{row.text}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Box p={2} />
                    </Container>
                </Paper>
                <Box p={6} />
            </Container>
        </Box>
    );
}
