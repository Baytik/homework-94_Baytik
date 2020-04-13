import React from 'react';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import {apiURL} from "../../apiURL";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        marginTop: '20px',
        background: '#3f51b5',
        color: '#fff'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

const CardPosts = (props) => {
    const classes = useStyles();

    return (
        <Grid container justify="center">
            <Grid item xs={12} md={10} lg={4}>
                {props.posts.map(post => (
                <Card className={classes.root} key={post._id}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar} src={apiURL + '/uploads/' + post.user.avatar}/>
                        }
                        action={
                            <IconButton aria-label="settings">
                            </IconButton>
                        }
                        title={post.user.displayName}
                        subheader={post.tags[0]}
                    />
                    <CardMedia
                        className={classes.media}
                        image={apiURL + '/uploads/' + post.image}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {post.title}
                        </Typography>
                    </CardContent>
                </Card>
                ))}
            </Grid>
        </Grid>
    );
};

export default CardPosts;