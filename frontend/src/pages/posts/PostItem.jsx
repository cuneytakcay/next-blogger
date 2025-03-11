import { Link } from 'react-router-dom';
import styles from './postItem.module.css';

const placeholderImg = 'https://picsum.photos/620/200';

const PostItem = ({ post }) => {
  return (
    <div key={post._id} className={styles.post}>
      <div className={styles.image}>
        <Link to={`/posts/${post._id}`}>
          <img src={post.image || placeholderImg} alt={post.title} />
        </Link>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{post.title}</h2>
        <p>{post.teaserText?.substring(0, 120)}...</p>
        <Link to={`/posts/${post._id}`} className={styles['read-more']}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
