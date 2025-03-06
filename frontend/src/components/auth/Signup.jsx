import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faHome,
  faExclamationTriangle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { setUser } from '../../store/userSlice';
import { setError } from '../../store/errorSlice';
import styles from './auth.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validate form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const subscription = watch((data) => {
      setFormData(data);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      if (response.status >= 200 && response.status < 300) {
        // Set the local storage with the user data and the time stamp
        // Time stamp will be used to check if the user is logged in for 24 hours
        localStorage.setItem(
          'userData',
          JSON.stringify({ ...response.data, time: Date.now() })
        );

        dispatch(setUser(response.data));
      } else {
        dispatch(
          setError({ status: response.status, message: response.statusText })
        );
      }

      setIsLoading(false);
      navigate('/');
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Registration failed. Please try again.';
      const errorStatus = err.response?.status || 500;

      dispatch(setError({ status: errorStatus, message: errorMessage }));

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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['input-container']}>
          <input
            id='firstName'
            className={
              styles.input + ' ' + (formData.firstName.length && styles.filled)
            }
            type='text'
            {...register('firstName', {
              required: 'Field cannot be empty',
            })}
          />
          <label htmlFor='firstName' className={styles.label}>
            First Name
          </label>
          {errors.firstName && (
            <p className={styles.error}>
              {errors.firstName.message}
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </p>
          )}
        </div>
        <div className={styles['input-container']}>
          <input
            id='lastName'
            className={
              styles.input + ' ' + (formData.lastName.length && styles.filled)
            }
            type='text'
            {...register('lastName', {
              required: 'Field cannot be empty',
            })}
          />
          <label className={styles.label} htmlFor='lastName'>
            Last Name
          </label>
          {errors.lastName && (
            <p className={styles.error}>
              {errors.lastName.message}
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </p>
          )}
        </div>
        <div className={styles['input-container']}>
          <input
            id='email'
            className={
              styles.input + ' ' + (formData.email.length && styles.filled)
            }
            type='email'
            {...register('email', {
              required: 'Field cannot be empty',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Not a valid email address.',
              },
            })}
          />
          <label className={styles.label} htmlFor='email'>
            Email
          </label>
          {errors.email && (
            <p className={styles.error}>
              {errors.email.message}
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </p>
          )}
        </div>
        <div className={styles['input-container']}>
          <input
            id='password'
            className={
              styles.input + ' ' + (formData.password.length && styles.filled)
            }
            type='password'
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                message: `Not a valid password`,
              },
            })}
          />
          <label className={styles.label} htmlFor='password'>
            Password
          </label>
          {errors.password && (
            <p className={styles.error}>
              {errors.password.message}
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </p>
          )}
        </div>
        <div className={styles['input-container']}>
          <input
            id='confirmPassword'
            className={
              styles.input +
              ' ' +
              (formData.confirmPassword.length && styles.filled)
            }
            type='password'
            {...register('confirmPassword', {
              required: 'Password confirmation is required',
              validate: (value) =>
                value === formData.password || 'Passwords do not match',
            })}
          />
          <label className={styles.label} htmlFor='confirmPassword'>
            Confirm Password
          </label>
          {errors.confirmPassword && (
            <p className={styles.error}>
              {errors.confirmPassword.message}
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </p>
          )}
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
