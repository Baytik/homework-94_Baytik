import React, {Component} from 'react';
import {connect} from "react-redux";
import {loginUser} from "../../store/actions/userLogAction";
import FacebookLogin from "../FacebookLogin/FacebookLogin";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

class Login extends Component {

    state = {
        username: '',
        password: '',
    };

    changeInputHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    loginUserHandler = async () => {
        const User = {
            username: this.state.username,
            password: this.state.password
        };
        await this.props.loginUser(User);
    };

    render() {
        return (
            <Box ml={4}>
                <Box pt={2} pb={2}>
                    <Typography variant="h4">Login</Typography>
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
                        <Button color="primary" variant="contained" onClick={this.loginUserHandler}>Login</Button>
                    </Grid>
                    <>
                        {this.props.loginError && (
                            <Box mt={2} mb={2}>
                                <Alert severity="error">{this.props.loginError.error}</Alert>
                            </Box>
                        )}
                    </>
                </Grid>
                <Box mt={4}>
                    <FacebookLogin/>
                </Box>
            </Box>
        );
    }
}

const mapStateToProps = state => ({
    loginError: state.user.loginError
});

const mapDispatchToProps = dispatch => ({
    loginUser: (user) => dispatch(loginUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);