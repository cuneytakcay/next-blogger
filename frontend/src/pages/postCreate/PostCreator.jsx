import { useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import styles from './postCreator.module.css';
import './quill.css';

const PostCreator = () => {
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

  const handleSave = (e) => {
    e.preventDefault();

    if (!title || !quill.container) return;

    const content = quill.root.innerHTML;

    console.log(content);
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
        <div className={styles.quill}>
          <div ref={quillRef} />
        </div>
        <button className={styles.button} type='submit'>
          Save
        </button>
      </form>
    </div>
  );
};

export default PostCreator;
