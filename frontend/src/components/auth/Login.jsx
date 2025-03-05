import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../../store/userSlice';
import styles from './auth.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const userData = await response.json();

    if (response.ok) {
      dispatch(setUser(userData));
    } else {
      console.error('Login failed:', userData.message);
    }
  };

  return (
    <div className={styles['form-container']}>
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
