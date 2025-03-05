import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faHome } from '@fortawesome/free-solid-svg-icons';
import { setUser } from '../../store/userSlice';
import { setError } from '../../store/errorSlice';
import styles from './auth.module.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
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
        dispatch(
          setError({ status: response.status, message: response.statusText })
        );
        setIsLoading(false);
        navigate('/error');
      }
    } catch (err) {
      console.error('catch err', err);
      dispatch(
        setError({
          status: 500,
          message: 'Something went wrong. Please try again.',
        })
      );
      setIsLoading(false);
      navigate('/error');
    }
  };

  return (
    <div className='fixed-container'>
      <h1 className={styles.title}>Sign Up</h1>
      <Link to='/' className={styles['home-icon']} title='Homepage'>
        <FontAwesomeIcon icon={faHome} />
      </Link>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles['input-container']}>
          <input
            id='firstName'
            className={styles.input + ' ' + (firstName.length && styles.filled)}
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor='firstName' className={styles.label}>
            First Name
          </label>
        </div>
        <div className={styles['input-container']}>
          <input
            id='lastName'
            className={styles.input + ' ' + (lastName.length && styles.filled)}
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className={styles.label} htmlFor='lastName'>
            Last Name
          </label>
        </div>
        <div className={styles['input-container']}>
          <input
            id='email'
            className={styles.input + ' ' + (email.length && styles.filled)}
            type='text'
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
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Sign Up'}
        </button>
      </form>
      <p className={styles.text}>
        Already have an account? <Link to='/login'>Login</Link> here
      </p>
    </div>
  );
};

export default Signup;
