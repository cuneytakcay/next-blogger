import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearError } from '../../store/errorSlice';
import styles from './home.module.css';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <div className='fixed-container'>
      <div className={styles['text-container']}>
        <h1 className={styles.title}>Write. Share. Inspire.</h1>
        <p className={styles.message}>
          Explore the world of blogging and share your thoughts with the world.
        </p>
      </div>
    </div>
  );
};
export default Home;
