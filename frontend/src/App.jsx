import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Error from './components/error/Error';
import NotFound from './components/error/NotFound';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem('userData');

    if (userData) {
      // Check if the user is logged in for less than 24 hours
      // If not, remove the user data from the local storage
      const { user, timeStamp } = JSON.parse(userData);

      if (Date.now() - timeStamp < 24 * 60 * 60 * 1000) {
        dispatch(setUser(user));
      } else {
        localStorage.removeItem('userData');
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/error' element={<Error />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
