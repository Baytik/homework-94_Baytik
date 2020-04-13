import axiosAPI from "../../axiosAPI";
import {push} from 'connected-react-router';

export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_ERROR = 'GET_POST_ERROR';
export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';

export const CREATE_ERROR_SUCCESS = 'CREATE_ERROR_SUCCESS';

export const getPostSuccess = (posts) => ({type: GET_POST_SUCCESS, posts});
export const getPostError = (error) => ({type: GET_POST_ERROR, error});
export const createErrorSuccess = (error) => ({type: CREATE_ERROR_SUCCESS, error});
export const getTagsSuccess = (tags) => ({type: GET_TAGS_SUCCESS, tags});

export const getPosts = () => {
  return async (dispatch, getState) => {
      try {
          const token = getState().user.user;
          const response = await axiosAPI.get('/posts', {headers: {'Authorization': token.token}});
          dispatch(getPostSuccess(response.data));
      } catch (error) {
          dispatch(getPostError(error))
      }
  }
};

export const getTags = () => {
  return async (dispatch) => {
      const response = await axiosAPI.get('/posts/tags');
      dispatch(getTagsSuccess(response.data));
  }
};

export const createPost = (post) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user;
            await axiosAPI.post('/posts', post, {headers: {'Authorization': token.token}});
            dispatch(push('/'));
        } catch (error) {
            dispatch(createErrorSuccess(error))
        }
    }
};