import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { setUser } from '../../store/userSlice';
import { setError } from '../../store/errorSlice';
import styles from './auth.module.css';

const LoginSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userData = urlParams.get('userData');

    try {
      if (userData) {
        const user = JSON.parse(decodeURIComponent(userData));

        // Set the local storage with the user data and the time stamp
        // Time stamp will be used to check if the user is logged in for 24 hours
        localStorage.setItem(
          'userData',
          JSON.stringify({ user, timeStamp: Date.now() })
        );

        dispatch(setUser({ user }));
        navigate('/');
      } else {
        dispatch(setError({ message: 'Login failed. Please try again.' }));
        navigate('/error');
      }
    } catch (err) {
      dispatch(setError({ message: err.message }));
      navigate('/error');
    }
  }, [dispatch, navigate]);

  return (
    <div className='fixed-container'>
      <FontAwesomeIcon className={styles.spinner} icon={faSpinner} spin />
      <p className={styles.redirect}>Redirecting to the homepage...</p>
    </div>
  );
};

export default LoginSuccess;
