import { all, put, takeLatest, fork, select } from 'redux-saga/effects';
import * as actionType from '../actionTypes';
import { getAllPostsApi } from '../api';

function* fetchAllPostsSaga() {
  try {
    yield put({ type: actionType.FETCH_ALL_POST_LOADING });
    const data = yield getAllPostsApi();
    if (data?.status === 200 && data?.list) {
      yield put({ type: actionType.FETCH_ALL_POST_SUCCESS, payload: data?.list });
    } else {
      yield put({
        type: actionType.FETCH_ALL_POST_ERROR,
        error: new Error('Unable to get list!')
      });
    }
  } catch (error) {
    yield put({ type: actionType.FETCH_ALL_POST_ERROR, error: error });
  }
}

function* fetchAllPosts() {
  yield takeLatest(actionType.FETCH_ALL_POST, fetchAllPostsSaga);
}

function* selectPostSaga(action) {
  const allPosts = yield select((state) => state.postReducer.allPosts);
  let data = [];
  if (!action?.payload?.id) {
    yield put({
      type: actionType.SET_ADD_NEW_POST,
      payload: { title: action?.payload?.inputValue }
    });
  }
  if (allPosts?.length > 0) {
    if (action?.payload?.title && action.payload?.id) {
      data = [allPosts.find((obj) => obj.id === action.payload.id)];
    } else {
      data = allPosts.map((a) => a);
    }
  }
  yield put({ type: actionType.UPDATE_VIEW_POST, payload: data });
}

function* selectPost() {
  yield takeLatest(actionType.SELECT_POST, selectPostSaga);
}

function* createPostSaga(action) {
  const allPosts = yield select((state) => state.postReducer.allPosts);
  const viewablePosts = yield select((state) => state.postReducer.viewablePosts);

  let tempData = { ...action.payload, userId: Number(action.payload.userId) };
  tempData['id'] = allPosts.length ? allPosts[allPosts.length - 1]['id'] + 1 : 1;

  yield put({
    type: actionType.UPDATE_LIST,
    payload: { allPosts: [...allPosts, tempData], viewablePosts: [...viewablePosts, tempData] }
  });
}

function* createNewPost() {
  yield takeLatest(actionType.CREATE_NEW_POST, createPostSaga);
}

function* setEditPostSaga(action) {
  yield put({
    type: actionType.SET_EDIT_POST_VALUE,
    payload: action.payload
  });
}
function* setEditPost() {
  yield takeLatest(actionType.SET_EDIT_POST, setEditPostSaga);
}

function* setUpdatePostSaga(action) {
  const allPosts = yield select((state) => state.postReducer.allPosts);
  const viewablePosts = yield select((state) => state.postReducer.viewablePosts);

  let payload = {
    allPosts: [...allPosts],
    viewablePosts: [...viewablePosts]
  };

  const data = { ...action.payload, userId: Number(action.payload.userId) };
  const allPostsIndex = allPosts.findIndex((a) => a.id === data.id);
  if (allPostsIndex > -1) {
    payload['allPosts'][allPostsIndex] = { ...data };
  }

  const viewablePostsIndex = viewablePosts.findIndex((a) => a.id === data.id);
  if (viewablePostsIndex > -1) {
    payload['viewablePosts'][viewablePostsIndex] = { ...data };
  }

  yield put({
    type: actionType.UPDATE_LIST,
    payload
  });
}

function* setUpdatePost() {
  yield takeLatest(actionType.UPDATE_POST, setUpdatePostSaga);
}

function* setDeletePostSaga(action) {
  yield put({
    type: actionType.SET_DELETE_POST_VALUE,
    payload: action.payload
  });
}
function* setDeletePost() {
  yield takeLatest(actionType.SET_DELETE_POST, setDeletePostSaga);
}

function* confirmDeletionSaga(action) {
  const allPosts = yield select((state) => state.postReducer.allPosts);
  const viewablePosts = yield select((state) => state.postReducer.viewablePosts);

  let payload = {
    allPosts: [...allPosts],
    viewablePosts: [...viewablePosts]
  };

  const allPostsIndex = allPosts.findIndex((a) => a.id === action.payload.id);
  if (allPostsIndex > -1) {
    payload['allPosts'].splice(allPostsIndex, 1);
  }

  const viewablePostsIndex = viewablePosts.findIndex((a) => a.id === action.payload.id);
  if (viewablePostsIndex > -1) {
    payload['viewablePosts'].splice(viewablePostsIndex, 1);
  }

  yield put({
    type: actionType.UPDATE_LIST,
    payload
  });
}

function* confirmDeletion() {
  yield takeLatest(actionType.DELETE_POST, confirmDeletionSaga);
}

export default function* postsSaga() {
  yield all([
    fork(fetchAllPosts),
    fork(selectPost),
    fork(createNewPost),
    fork(setEditPost),
    fork(setUpdatePost),
    fork(setDeletePost),
    fork(confirmDeletion)
  ]);
}
