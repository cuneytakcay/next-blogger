import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import styles from './contact.module.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

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
      const res = await axios.post('/api/contact', {
        name: data.name,
        email: data.email,
        message: data.message,
      });

      setResponse(res.data.message);
      setIsLoading(false);
    } catch (err) {
      setResponse(
        'There was an error sending your message. Please try again later.'
      );
      setIsLoading(false);
      throw new Error(err);
    }
  };

  return (
    <div className='fixed-container'>
      <h1 className={styles.title}>Contact Us</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['input-container']}>
          <input
            id='name'
            className={
              styles.input + ' ' + (formData.name.length && styles.filled)
            }
            type='text'
            {...register('name', {
              required: 'Name is required',
            })}
          />
          <label htmlFor='name' className={styles.label}>
            Name
          </label>
          {errors.name && (
            <p className={styles.error}>
              {errors.name.message}
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
            type='text'
            {...register('email', {
              required: 'Email is required',
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
          <textarea
            id='message'
            rows='5'
            className={
              styles.textarea + ' ' + (formData.message.length && styles.filled)
            }
            {...register('message', {
              required: 'Message is required',
            })}
          />
          <label htmlFor='message' className={styles.label}>
            Message
          </label>
          {errors.message && (
            <p className={styles.error}>
              {errors.message.message}
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </p>
          )}
        </div>
        <button className={styles.button} type='submit' disabled={isLoading}>
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Send'}
        </button>
      </form>
      {response && <p className={styles.text}>{response}</p>}
    </div>
  );
};

export default ContactPage;
