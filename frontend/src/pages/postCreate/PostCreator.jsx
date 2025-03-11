import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setError } from '../../store/errorSlice';
import 'quill/dist/quill.snow.css';
import styles from './postCreator.module.css';
import './quill.css';

const PostCreator = () => {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ header: [2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline'],
        ['clean'],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
      ],
    },
  });

  const [title, setTitle] = useState('');
  const [teaserText, setTeaserText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!title || !quill.container) return;

    setIsLoading(true);

    const content = quill.root.innerHTML;
    try {
      await axios.post('http://localhost:5000/api/posts/draft', {
        title,
        teaserText,
        content,
        authorId: user._id,
        categories: ['Technology'],
      });

      setIsLoading(false);
      navigate('/posts');
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Failed to save post. Please try again.';
      const errorStatus = err.response?.status || 500;

      dispatch(setError({ status: errorStatus, message: errorMessage }));

      setIsLoading(false);
      navigate('/error');
    }
  };

  return (
    <div className='fixed-container'>
      <h1 className={styles.heading}>Create Post</h1>
      <form className={styles.form} onSubmit={handleSave}>
        <div className={styles['input-container']}>
          <input
            id='title'
            className={styles.input + ' ' + (title.length && styles.filled)}
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor='title' className={styles.label}>
            Blog Post Title
          </label>
        </div>
        <div className={styles['input-container']}>
          <textarea
            id='teaser-text'
            rows='3'
            className={
              styles.input +
              ' ' +
              (teaserText.length && styles.filled) +
              ' ' +
              styles.textarea
            }
            type='text'
            value={teaserText}
            onChange={(e) => setTeaserText(e.target.value)}
            required
          />
          <label htmlFor='teaser-text' className={styles.label}>
            Teaser Text
          </label>
        </div>
        <div className={styles.quill}>
          <div ref={quillRef} />
        </div>
        <button className={styles.button} type='submit'>
          Save
          {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
        </button>
      </form>
    </div>
  );
};

export default PostCreator;
