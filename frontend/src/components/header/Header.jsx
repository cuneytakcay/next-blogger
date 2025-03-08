import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose, faUser } from '@fortawesome/free-solid-svg-icons';
import { clearUser } from '../../store/userSlice';
import styles from './header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsMenuOpen(false);

    try {
      await axios.get('http://localhost:5000/auth/logout');

      localStorage.removeItem('userData');
      // clear user data from redux
      dispatch(clearUser());
      navigate('/login');
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <header
      className={
        styles.header +
        ' ' +
        (isMenuOpen && styles['menu-open']) +
        ' ' +
        (isScrolled && styles['scrolled'])
      }
    >
      <nav aria-label='Secondary navigation'>
        {userData ? (
          <div className={styles['nav-top']}>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                isActive ? styles['active-link'] : ''
              }
              title='Profile'
              aria-label='Profile'
              onClick={() => setIsMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
            <button className={styles['logout-button']} onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className={styles['nav-top']}>
            <NavLink
              to='/login'
              className={({ isActive }) =>
                isActive ? styles['active-link'] : ''
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </NavLink>
            <NavLink
              to='/signup'
              className={({ isActive }) =>
                isActive ? styles['active-link'] : ''
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </NavLink>
          </div>
        )}
      </nav>
      <div className={styles['nav-bottom']}>
        <div className={styles.logo}>
          <h1>
            <NavLink to='/'>BlogSphere</NavLink>
          </h1>
        </div>
        <nav className={styles.nav} aria-label='Main navigation'>
          <button
            className={styles['menu-button']}
            onClick={() => setIsMenuOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {isMenuOpen && (
            <div className={styles['dropdown-menu']}>
              <button
                className={styles['menu-button']}
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive ? styles['active-link'] : ''
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              {userData && (
                <>
                  <NavLink
                    to='/profile'
                    className={({ isActive }) =>
                      isActive ? styles['active-link'] : ''
                    }
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to='/create-post'
                    className={({ isActive }) =>
                      isActive ? styles['active-link'] : ''
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Post
                  </NavLink>
                </>
              )}
              <NavLink
                to='/posts'
                className={({ isActive }) =>
                  isActive ? styles['active-link'] : ''
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Blog Posts
              </NavLink>
              <NavLink
                to='/about'
                className={({ isActive }) =>
                  isActive ? styles['active-link'] : ''
                }
                onClick={() => setIsMenuOpen(false)}
              >
                About BlogSphere
              </NavLink>
              <NavLink
                to='/contact'
                className={({ isActive }) =>
                  isActive ? styles['active-link'] : ''
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
