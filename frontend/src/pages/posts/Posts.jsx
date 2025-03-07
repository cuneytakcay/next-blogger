import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setPosts } from '../../store/postsSlice';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.data);

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get('http://localhost:5000/api/posts');

      dispatch(setPosts({ posts: res.data }));
    };

    getPosts();
  }, [dispatch]);

  return (
    <div className='fixed-container'>
      {posts.map((post) => (
        <h1 key={post._id}>{post.title}</h1>
      ))}
    </div>
  );
};

export default Posts;
