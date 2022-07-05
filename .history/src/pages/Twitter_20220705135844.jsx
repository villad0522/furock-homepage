import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TwitterTimelineEmbed } from 'react-twitter-embed'

const useStyles = makeStyles((theme) => ({
    tweetsWrapper: {
    },
    tweets: {
        position: 'relative',
        top: '-50px',
        minWidth: '0',
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto',
    },
}));

const Twitter = ({ screenName, contentheight, ...other }) => {
    const classes = useStyles()
    return (
        <div className={classes.tweetsWrapper} {...other}>
            <div className={classes.tweets}>
                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName={screenName}
                    options={{ height: (contentheight + 97) + 'px', }}
                />
            </div>
        </div>
    );
}
export default Twitter

