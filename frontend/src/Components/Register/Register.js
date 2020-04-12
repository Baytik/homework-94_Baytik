import React, {Component} from 'react';
import {connect} from "react-redux";
import FacebookLogin from "../FacebookLogin/FacebookLogin";
import {postRegister} from "../../store/actions/userLogAction";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";

class Register extends Component {

    state = {
        username: '',
        password: '',
        displayName: '',
        avatar: null
    };

    changeInputHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };
    fileChangeHandler = e => {
        this.setState({[e.target.name]: e.target.files[0]})
    };

    newUser = async () => {
        const User = new FormData();
        User.append('username', this.state.username);
        User.append('password', this.state.password);
        User.append('avatar', this.state.avatar);
        User.append('displayName', this.state.displayName);
        await this.props.postRegister(User);
    };

    render() {
        return (
            <Box ml={4}>
                <Box pt={2} pb={2}>
                    <Typography variant="h4">Register</Typography>
                </Box>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                        <TextField type="text"
                                   label="Enter your email"
                                   name="username"
                                   variant="outlined"
                                   onChange={this.changeInputHandler}
                                   error={this.state.username.length === 0}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField type="password"
                                   label="Enter your password"
                                   name="password"
                                   variant="outlined"
                                   onChange={this.changeInputHandler}
                                   error={this.state.password.length === 0}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField type="text"
                                   label="Enter your display name"
                                   name="displayName"
                                   variant="outlined"
                                   onChange={this.changeInputHandler}
                                   error={this.state.displayName.length === 0}
                        />
                    </Grid>
                    <Grid item xs>
                        <Button color="primary" variant="contained" onClick={this.newUser}>Register</Button>
                    </Grid>
                </Grid>
                <Box mt={4}>
                    <FacebookLogin/>
                </Box>
            </Box>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    postRegister: (user) => dispatch(postRegister(user)),
});

export default connect(null, mapDispatchToProps)(Register);