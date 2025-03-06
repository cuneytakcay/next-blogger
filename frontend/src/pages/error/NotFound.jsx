import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import styles from './error.module.css';

const NotFound = () => {
  return (
    <div className='fixed-container'>
      <Link to='/' className={styles['home-icon']} title='Homepage'>
        <FontAwesomeIcon icon={faHome} />
      </Link>
      <h1 className={styles.title}>Oops!</h1>
      <p className={styles.message}>
        404&nbsp;&nbsp;|&nbsp;&nbsp;The page you are looking for does not exist
      </p>
    </div>
  );
};

export default NotFound;
