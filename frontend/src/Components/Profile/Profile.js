import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Avatar} from "@material-ui/core";
import {apiURL} from "../../apiURL";
import AccountCircleIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button";
import {NavLink, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
}));

const Profile = () => {
    const classes = useStyles();
    const user = useSelector(state => state.user.user);
    if (!user) return <Redirect to="/login"/>;

    return (
        <Grid container justify="center">
            <Grid item xs={12} md={10} lg={4}>
                <Box ml={4}>
                    <Box pt={2} pb={2} ml={4}>
                        <Typography variant="h4">Profile</Typography>
                    </Box>
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs>
                            {user.avatar ? (
                                <Avatar src={apiURL + '/uploads/' + user.avatar} className={classes.large}/>
                            ) : (
                                <AccountCircleIcon/>
                            )}
                        </Grid>
                        <Grid item xs>
                            <Box ml={6}>
                                <Typography variant="h5">{user.username}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <Box ml={6}>
                                <Typography variant="h6">{user.displayName}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <Box ml={4}>
                                <Button color="primary" component={NavLink} to="/edit/profile">Edit Profile</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Profile;