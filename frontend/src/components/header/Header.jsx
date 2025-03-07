import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose, faUser } from '@fortawesome/free-solid-svg-icons';
import { clearUser } from '../../store/userSlice';
import styles from './header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
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
      className={styles.header + ' ' + (isMenuOpen && styles['menu-open'])}
    >
      <nav className={styles['nav-top']} aria-label='Secondary navigation'>
        {userData ? (
          <div>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                isActive ? styles['active-link'] : ''
              }
              title='Profile'
            >
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
            <button className={styles['logout-button']} onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <NavLink
              to='/login'
              className={({ isActive }) =>
                isActive ? styles['active-link'] : ''
              }
            >
              Login
            </NavLink>
            <NavLink
              to='/signup'
              className={({ isActive }) =>
                isActive ? styles['active-link'] : ''
              }
            >
              Sign Up
            </NavLink>
          </div>
        )}
      </nav>
      <div className={styles['nav-bottom']}>
        <div className={styles.logo}>
          <h1>BlogSphere</h1>
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
              {userData && (
                <NavLink
                  to='/profile'
                  className={({ isActive }) =>
                    isActive ? styles['active-link'] : ''
                  }
                  title={userData.name + ' ' + 'Profile Page'}
                >
                  Profile
                </NavLink>
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
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
