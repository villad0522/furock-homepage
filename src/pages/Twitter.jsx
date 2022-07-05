import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { Box } from '@mui/material';


const Twitter = ({ screenName, contentheight, ...other }) => {
    return (
        <Box sx={{
            minWidth: '0',
            maxWidth: '600px',
            width: '100%',
            margin: '0 auto',
        }}            {...other}        >
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName={screenName}
                options={{ height: (contentheight + 97) + 'px', }}
            />
        </Box>
    );
}
export default Twitter

