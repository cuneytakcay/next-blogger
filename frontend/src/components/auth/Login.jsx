import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../../store/userSlice';
import { setError } from '../../store/errorSlice';
import styles from './auth.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();

        // Set the local storage with the user data and the time stamp
        // Time stamp will be used to check if the user is logged in for 24 hours
        localStorage.setItem(
          'userData',
          JSON.stringify({ ...userData, timeStamp: Date.now() })
        );

        dispatch(setUser(userData));
      } else {
        dispatch(setError({ status: 401, message: 'Login failed.' }));
        navigate('/error');
      }
    } catch (err) {
      dispatch(
        setError({
          status: 500,
          message: 'Something went wrong. Please try again.',
        })
      );
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
        <button className={styles.button} type='submit'>
          Login
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
