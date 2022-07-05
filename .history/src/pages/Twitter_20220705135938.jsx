import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { Box } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    tweetsWrapper: {
    },
    tweets: {
    },
}));

const Twitter = ({ screenName, contentheight, ...other }) => {
    const classes = useStyles()
    return (
        <Box sx={{
            position: 'relative',
            top: '-50px',
            minWidth: '0',
            maxWidth: '600px',
            width: '100%',
            margin: '0 auto',
        }
        } {...other}>
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName={screenName}
                options={{ height: (contentheight + 97) + 'px', }}
            />
        </Box>
    );
}
export default Twitter

