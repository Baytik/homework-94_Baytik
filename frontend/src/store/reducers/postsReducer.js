import {GET_POST_SUCCESS, GET_TAGS_SUCCESS} from "../actions/postsAction";

const initialState = {
    posts: [],
    tags: []
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POST_SUCCESS:
            return {...state, posts: action.posts};
        case GET_TAGS_SUCCESS:
            return {...state, tags: action.tags};
        default:
            return state;
    }
};

export default postsReducer;