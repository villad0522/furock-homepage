
import * as React from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function MyPaymentElement({ skelton = false }) {
    const [readyElement, setReadyElement] = React.useState(false);
    return (
        <>
            <Box p={2} />
            {(skelton || !readyElement) &&
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={6}>
                        <Skeleton variant="rectangular" height={60} sx={{ mt: 1 }} />
                    </Grid>
                    <Grid item sm={6} xs={6}>
                        <Skeleton variant="rectangular" height={60} sx={{ mt: 1 }} />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Skeleton variant="rectangular" height={40} sx={{ mt: 1 }} />
                    </Grid>
                    <Grid item sm={3} xs={6}>
                        <Skeleton variant="rectangular" height={40} sx={{ mt: 1 }} />
                    </Grid>
                    <Grid item sm={3} xs={6}>
                        <Skeleton variant="rectangular" height={40} sx={{ mt: 1 }} />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <Skeleton variant="rectangular" height={40} sx={{ mt: 1 }} />
                    </Grid>
                </Grid>
            }
            {!skelton &&
                <PaymentElement onReady={() => setReadyElement(true)} />
            }
        </>
    );
};