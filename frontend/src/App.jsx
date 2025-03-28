import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';

// Pages
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Posts from './pages/posts/Posts';
import PostDetail from './pages/postDetail/PostDetail';
import PostCreator from './pages/postCreate/PostCreator';
import Error from './pages/error/Error';
import NotFound from './pages/error/NotFound';
import LoginSuccess from './pages/auth/LoginSuccess';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem('userData');

    if (userData) {
      // Check if the user is logged in for less than 24 hours
      // If not, remove the user data from the local storage
      const { user, timeStamp } = JSON.parse(userData);

      if (Date.now() - timeStamp < 24 * 60 * 60 * 1000) {
        dispatch(setUser({ user }));
      } else {
        localStorage.removeItem('userData');
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login-success' element={<LoginSuccess />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/post/:id' element={<PostDetail />} />
        <Route path='/create-post' element={<PostCreator />} />
        <Route path='/error' element={<Error />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
