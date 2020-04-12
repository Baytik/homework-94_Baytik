import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {useDispatch} from "react-redux";
import {loginWithFacebook} from "../../store/actions/userLogAction";
import Button from "@material-ui/core/Button";
import FacebookIcon from '@material-ui/icons/Facebook';

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const callback = (facebookData) => {
        if (facebookData.id) {
            dispatch(loginWithFacebook(facebookData));
        }
    };

    return (
        <FacebookLoginButton
            appId="3109373302426478"
            callback={callback}
            render={renderProps => (
                <Button
                    onClick={renderProps.onClick}
                    variant="contained"
                    color="primary"
                    startIcon={<FacebookIcon/>}
                >
                    Login with facebook
                </Button>
            )}
        />
    );
};

export default FacebookLogin;