import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPosts} from "../../store/actions/postsAction";
import {Redirect} from "react-router-dom";
import CardPosts from "../cardPosts/cardPosts";

class Posts extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        if (!this.props.user) return <Redirect to="/login"/>;
        return (
            <>
                <CardPosts posts={this.props.posts}/>
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    posts: state.posts.posts
});

const mapDispatchToProps = dispatch => ({
    getPosts: () => dispatch(getPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);