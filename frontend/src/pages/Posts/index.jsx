import { Container, Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/actions';
import { useEffect } from 'react';
import PostSearch from '../../components/posts/PostSearch';
import PostCardItem from '../../components/posts/PostCardItem';
import AddOrEditPost from '../../components/posts/AddOrEditPost';
import DeletePostFeedback from '../../components/posts/DeletePostFeedback';

function Posts() {
  const dispatch = useDispatch();
  const postLoading = useSelector((state) => state.postReducer.allPostsLoading);
  const viewablePosts = useSelector((state) => state.postReducer.viewablePosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="md" style={{ marginTop: 64 }}>
      {postLoading ? (
        <>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} height={66} width={'100%'} />
            ))}
        </>
      ) : (
        <>
          <PostSearch />
          <div>
            {viewablePosts?.length > 0 &&
              viewablePosts.map((obj, index) => <PostCardItem key={index} {...obj} />)}
          </div>
          <AddOrEditPost />
          <DeletePostFeedback />
        </>
      )}
    </Container>
  );
}

export default Posts;
