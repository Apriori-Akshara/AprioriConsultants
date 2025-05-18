import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserFromCookies } from '../src/Store';
import Cookies from 'js-cookie';

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = Cookies.get('user');
    console.log('storedUser', Cookies.get('user')); // Debug log
    
    if (storedUser) {
      // Parse the cookie and set the user in the Redux store
      dispatch(setUserFromCookies(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return null; // This component doesn't need to render anything
};

export default AuthInitializer;
