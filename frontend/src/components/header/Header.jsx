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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
      <div className={styles.logo}>
        <h1>BlogSphere</h1>
      </div>
      <nav className={styles.nav}>
        {userData && (
          <>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                isActive ? styles['active-link'] : ''
              }
              title={userData.name + ' ' + 'Profile Page'}
            >
              <FontAwesomeIcon className={styles.user} icon={faUser} />
            </NavLink>
            <button className={styles['logout-button']} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
        <button className={styles['menu-button']} onClick={toggleMenu}>
          {!isMenuOpen ? (
            <FontAwesomeIcon icon={faBars} />
          ) : (
            <FontAwesomeIcon icon={faClose} />
          )}
        </button>
        {isMenuOpen && (
          <div className={styles['dropdown-menu']}>
            {userData ? (
              <>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    isActive ? styles['active-link'] : ''
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Link 1
                </NavLink>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    isActive ? styles['active-link'] : ''
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Link 2
                </NavLink>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
