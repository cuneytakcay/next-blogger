import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './error.module.css';

const Error = () => {
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();

  // Redirect to the login page after 5 seconds
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className='fixed-container'>
      <h1 className={styles.title}>Oops!</h1>
      <p className={styles.message}>{error.message}</p>
      <FontAwesomeIcon className={styles.spinner} icon={faSpinner} spin />
      <p className={styles.redirect}>Redirecting to the login page...</p>
    </div>
  );
};
export default Error;
