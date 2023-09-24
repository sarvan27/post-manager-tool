import { call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actionType from '../../redux/actionTypes';
import postsSaga, { fetchAllPostsSaga, setPreEditPostSaga } from '../../redux/sagas/posts.js';
import { getAllPostsApi } from '../../redux/api';

describe('Posts saga', () => {
  // to test sagas watcher function and postsSaga
  let generator = null;

  beforeEach(() => {
    generator = postsSaga();
  });

  test('fetch post saga was present', () => {
    expect(generator.next().value).toEqual(
      takeLatest(actionType.FETCH_ALL_POST, fetchAllPostsSaga)
    );
  });

  test('fetch post dispatch working', () => {
    put({ type: actionType.FETCH_ALL_POST });
    expect(generator.next().value).toEqual(
      takeLatest(actionType.FETCH_ALL_POST, fetchAllPostsSaga)
    );
  });

});
