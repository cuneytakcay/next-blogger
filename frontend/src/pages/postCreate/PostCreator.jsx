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

  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [teaserText, setTeaserText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
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
        headerImage: imageUrl,
        content,
        authorId: user._id,
        category,
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

  // Handle image upload to the backend
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setIsUploading(true);
    setError(null);

    // FormData to send the image as multipart/form-data
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Send the file to the backend using Axios
      const response = await axios.post(
        'http://localhost:5000/api/images/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Set the uploaded image URL received from the backend
      setImageUrl(response.data.url);
    } catch (err) {
      setUploadError('Failed to upload image');
      console.error(err);
    } finally {
      setIsUploading(false);
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
        <div className={styles['input-container']}>
          <select
            className={styles.input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value=''>-- Select Category --</option>
            <option value='Scient & Technology'>Scient & Technology</option>
            <option value='Business'>Business</option>
            <option value='Entertainment'>Entertainment</option>
            <option value='Health'>Health</option>
            <option value='Sports'>Sports</option>
            <option value='Travel'>Travel</option>
            <option value='Lifestyle'>Lifestyle</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div className={styles.upload}>
          <label htmlFor='image' className={styles['upload-label']}>
            Upload Header Image{' '}
            {isUploading && <FontAwesomeIcon icon={faSpinner} spin />}
          </label>
          <input
            id='image'
            type='file'
            accept='image/*'
            onChange={handleFileChange}
          />
          {uploadError && <p className={styles.error}>{uploadError}</p>}
          {imageUrl && <img src={imageUrl} alt='Uploaded Image' />}
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
