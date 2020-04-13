import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {createPost, getTags} from "../../store/actions/postsAction";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";

class NewPost extends Component {

    state = {
        title: '',
        tags: '',
        image: null
    };

    componentDidMount() {
        this.props.getTags();
    }

    changeInputHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };
    fileChangeHandler = e => {
        this.setState({[e.target.name]: e.target.files[0]})
    };

    tagsChangeHandler = (e, tags) => {
        this.setState({tags: JSON.stringify(tags)})
    };

    newPost = async () => {
        const Post = new FormData();
        Post.append('title', this.state.title);
        Post.append('tags', this.state.tags);
        Post.append('image', this.state.image);
        await this.props.createPost(Post);
    };

    render() {
        if (!this.props.user) return <Redirect to="/login"/>;
        return (
            <div>
                <Grid container justify="center">
                    <Grid item xs={12} md={10} lg={4}>
                        <Box ml={4}>
                            <Box pt={2} pb={2}>
                                <Typography variant="h4">Add new Post</Typography>
                            </Box>
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs>
                                    <TextField type="text"
                                               label="Enter text of the post"
                                               name="title"
                                               variant="outlined"
                                               onChange={this.changeInputHandler}
                                               fullWidth
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Autocomplete
                                        multiple
                                        options={this.props.tags}
                                        onChange={this.tagsChangeHandler}
                                        freeSolo
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField {...params} variant="outlined" label="tags"/>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField type="file"
                                               name="image"
                                               variant="outlined"
                                               onChange={this.fileChangeHandler}
                                               fullWidth
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Button color="primary" variant="contained"
                                            onClick={this.newPost}>Save</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
   user: state.user.user,
   tags: state.posts.tags
});

const mapDispatchToProps = dispatch => ({
    createPost: (post) => dispatch(createPost(post)),
    getTags: () => dispatch(getTags())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);