import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message);
    }
  };

  return (
    <div className='fixed-container'>
      <h1 className={styles.title}>Sign Up</h1>
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
          Sign Up
        </button>
      </form>
      <p className={styles.text}>
        Already have an account? <Link to='/login'>Login</Link> here
      </p>
    </div>
  );
};

export default Signup;
