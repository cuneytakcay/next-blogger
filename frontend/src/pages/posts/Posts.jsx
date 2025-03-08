import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setPosts } from '../../store/postsSlice';
import PostItem from './PostItem';
import styles from './posts.module.css';

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
      <h1 className={styles.heading}>Posts</h1>
      <div className={styles.posts}>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
