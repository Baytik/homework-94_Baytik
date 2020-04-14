import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPosts} from "../../store/actions/postsAction";
import {Redirect} from "react-router-dom";
import CardPosts from "../cardPosts/cardPosts";
import {subscribeUser} from "../../store/actions/userLogAction";
import Modal from "../../UI/Modal/Modal";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField/TextField";
import Alert from "@material-ui/lab/Alert/Alert";

class Posts extends Component {

    state = {
        username: '',
        purchasing: false
    };

    changeInputHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    postSubscribe = async () => {
        const subscribe = {
            username: this.state.username
        };
        await this.props.subscribeUser(subscribe);
        if (!this.props.subscribeResponse.error) {
        this.setState({purchasing: false});
        }
    };

    componentDidMount() {
        this.props.getPosts();
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancel = () => {
        this.setState({purchasing: false});
    };

    render() {
        if (!this.props.user) return <Redirect to="/login"/>;
        return (
            <>
                <Grid container justify="center">
                    <Grid item xs={12} md={10} lg={4}>
                        <Box mt={2} ml={15}>
                            <Button color="primary" variant="contained" onClick={this.purchaseHandler}>Subscribe</Button>
                        </Box>
                    </Grid>
                </Grid>
                <Modal show={this.state.purchasing} close={this.purchaseCancel}>
                    <Grid item xs>
                        <TextField type="text"
                                   label="Enter email"
                                   name="username"
                                   variant="outlined"
                                   onChange={this.changeInputHandler}
                                   fullWidth
                        />
                    </Grid>
                    <Box mt={2}>
                        <Button color="secondary" onClick={this.purchaseCancel} variant="contained">Cancel</Button>
                        <Button color="primary" onClick={this.postSubscribe} variant="contained">Subscribe</Button>
                    </Box>
                    {this.props.subscribeResponse && (
                        <Box mt={2} mb={2}>
                            <Alert severity="error">{this.props.subscribeResponse.error}</Alert>
                        </Box>
                    )}
                </Modal>
                <CardPosts posts={this.props.posts}/>
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    posts: state.posts.posts,
    subscribeResponse: state.user.subscribeResponse,
});

const mapDispatchToProps = dispatch => ({
    getPosts: () => dispatch(getPosts()),
    subscribeUser: (username) => dispatch(subscribeUser(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);