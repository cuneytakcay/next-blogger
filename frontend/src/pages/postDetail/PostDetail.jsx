import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDetail } from '../../store/postDetailSlice';
import styles from './postDetail.module.css';

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, loading, error } = useSelector((state) => state.postDetail);

  useEffect(() => {
    dispatch(fetchPostDetail(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className='fixed-container'>
      <div className={styles['post-container']}>
        <div className={styles.post}>
          <div
            className={styles.header}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${post.headerImage})`,
            }}
            role='img'
            aria-label='Post Header'
          >
            <h1 className={styles.title}>{post.title}</h1>
          </div>
          <div className={styles.content}>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
