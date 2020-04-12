import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {editUserProfile} from "../../store/actions/userLogAction";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";

const EditUserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const [state, setState] = useState({
        avatar: null,
        displayName: user ? user.displayName || '' : <Redirect to="/"/>
    });
    if (!user) return <Redirect to="/"/>;

    const editProfile = () => {
        const Profile = new FormData();
        Profile.append('avatar', state.avatar);
        Profile.append('displayName', state.displayName);
        dispatch(editUserProfile(Profile));
    };

    const changeInputHandler = e => {
        setState({...state, [e.target.name]: e.target.value})
    };
    const changeFileHandler = e => {
      setState({...state, [e.target.name]: e.target.files[0]})
    };

    return (
        <Grid container justify="center">
            <Grid item xs={12} md={10} lg={4}>
                <Box ml={4}>
                    <Box pt={2} pb={2}>
                        <Typography variant="h4">Edit Profile</Typography>
                    </Box>
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs>
                            <TextField type="text"
                                       value={state.displayName}
                                       name="displayName"
                                       variant="outlined"
                                       onChange={changeInputHandler}
                                       fullWidth
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField type="file"
                                       name="avatar"
                                       variant="outlined"
                                       onChange={changeFileHandler}
                                       fullWidth
                            />
                        </Grid>
                        <Grid item xs>
                            <Button color="primary" variant="contained"
                                    onClick={editProfile}>Save</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default EditUserProfile;