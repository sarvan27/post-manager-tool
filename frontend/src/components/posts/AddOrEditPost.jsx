import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { createNewPost, resetAddPost, resetEditPost, updatePost } from '../../redux/actions';

const AddOrEditPost = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({});

  const addNew = useSelector((state) => state.postReducer.addNewPost);
  const editPost = useSelector((state) => state.postReducer.editPost);

  useEffect(() => {
    setData({ ...addNew, userId: '', body: '' });
  }, [addNew]);

  useEffect(() => {
    setData(editPost);
  }, [editPost]);

  const handleDataChange = useCallback((key, value) => {
    let temp = { ...data };
    temp[key] = value;
    setData(temp);
  });

  const handleClose = () => {
    if (data.id) {
      dispatch(resetEditPost());
    } else {
      dispatch(resetAddPost());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.id) {
      dispatch(updatePost(data));
    } else {
      dispatch(createNewPost(data));
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth={'sm'}
      open={Boolean(addNew?.title || editPost?.id)}
      onClose={handleClose}>
      <DialogTitle>{editPost?.id ? `Update post - ${editPost?.id}` : 'Add new post'}</DialogTitle>
      <DialogContent>
        <form id="form-add-or-update-post" onSubmit={handleSubmit}>
          <TextField
            value={data?.userId ? data.userId : ''}
            onChange={(e) => handleDataChange('userId', e.target.value)}
            InputProps={{
              inputProps: { min: 1 }
            }}
            size="small"
            autoFocus
            margin="dense"
            label="User ID"
            type="number"
            fullWidth
            required
          />
          <TextField
            value={data?.title ? data.title : ''}
            onChange={(e) => handleDataChange('title', e.target.value)}
            size="small"
            margin="normal"
            label="Title"
            type="text"
            fullWidth
            multiline
            required
          />
          <TextField
            value={data?.body ? data.body : ''}
            onChange={(e) => handleDataChange('body', e.target.value)}
            margin="normal"
            size="small"
            label="Body"
            type="text"
            fullWidth
            multiline
            rows={4}
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="form-add-or-update-post" color="primary" variant="contained">
          {addNew?.title ? 'Create' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditPost;
