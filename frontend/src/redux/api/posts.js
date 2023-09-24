import axios from 'axios';

export const getAllPostsApi = async () => {
  return await axios
    .get('http://43.204.73.132/api/posts')
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};
