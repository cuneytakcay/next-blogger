import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { setUser } from '../../store/userSlice';
import { setError } from '../../store/errorSlice';
import styles from './auth.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { data } = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });

      // Set the local storage with the user data and the time stamp
      // Time stamp will be used to check if the user is logged in for 24 hours
      localStorage.setItem(
        'userData',
        JSON.stringify({ ...data, timeStamp: Date.now() })
      );

      dispatch(setUser(data));
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Login failed. Please try again.';
      const errorStatus = err.response?.status || 500;

      dispatch(setError({ status: errorStatus, message: errorMessage }));

      setIsLoading(false);
      navigate('/error');
    }
  };

  return (
    <div className='fixed-container'>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles['input-container']}>
          <input
            id='email'
            className={styles.input + ' ' + (email.length && styles.filled)}
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={styles.label} htmlFor='email'>
            Email
          </label>
        </div>
        <div className={styles['input-container']}>
          <input
            id='password'
            className={styles.input + ' ' + (password.length && styles.filled)}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className={styles.label} htmlFor='password'>
            Password
          </label>
        </div>
        <button className={styles.button} type='submit' disabled={isLoading}>
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Login'}
        </button>
      </form>
      <p className={styles.text}>
        Don't have an account?{' '}
        <Link to='/signup' className={styles.link}>
          Sign up
        </Link>{' '}
        here
      </p>
    </div>
  );
};

export default Login;
