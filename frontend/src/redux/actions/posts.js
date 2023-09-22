import * as actionType from '../actionTypes';

export const fetchPosts = () => ({ type: actionType.FETCH_ALL_POST });

export const selectPost = (value) => ({ type: actionType.SELECT_POST, payload: value });

export const resetAddPost = () => ({ type: actionType.RESET_ADD_POST });
export const createNewPost = (value) => ({ type: actionType.CREATE_NEW_POST, payload: value });

export const setEditPost = (value) => ({ type: actionType.SET_EDIT_POST, payload: value });
export const resetEditPost = () => ({ type: actionType.RESET_EDIT_POST });
export const updatePost = (value) => ({ type: actionType.UPDATE_POST, payload: value });

export const setDeletePost = (value) => ({ type: actionType.SET_DELETE_POST, payload: value });
export const resetDeletePost = () => ({ type: actionType.RESET_DELETE_POST });
export const removePost = (feedback, id) => ({
  type: actionType.DELETE_POST,
  payload: { feedback, id }
});
