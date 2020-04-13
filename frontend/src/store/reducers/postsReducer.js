import {GET_POST_SUCCESS} from "../actions/postsAction";

const initialState = {
    posts: [],
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POST_SUCCESS:
            return {...state, posts: action.posts};
        default:
            return state;
    }
};

export default postsReducer;