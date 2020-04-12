import React, {useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import {logoutUser} from "../../store/actions/userLogAction";
import {Avatar, Button} from "@material-ui/core";
import {apiURL} from "../../apiURL";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    mainLink: {
        color: 'inherit',
        textDecoration: 'none'
    },
    mainHeader: {
        color: 'orange'
    }
}));

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                    <NavLink to="/" className={classes.mainLink}>Posts</NavLink>
                </Typography>
                {!user ? (
                    <>
                        <Button component={NavLink} to="/register" color="inherit">Register</Button>
                        <Button component={NavLink} to="/login" color="inherit">Login</Button>
                    </>
                ) : (
                    <>
                        <IconButton color="inherit" onClick={handleClick}>
                            {user.avatar ? (
                                <Avatar src={apiURL + '/uploads/' + user.avatar}/>
                            ) : (
                                <AccountCircleIcon/>
                            )}
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <ListItem disabled>Hello, {user.displayName}!</ListItem>
                            <Divider/>
                            <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
                            <MenuItem onClick={() => dispatch(logoutUser(user))}>Logout</MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;