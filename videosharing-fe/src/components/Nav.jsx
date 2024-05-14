import React, { useEffect, useState } from 'react';
import HomeIcon from '../assets/HomeIcon';
import { Link, useNavigate } from 'react-router-dom';
import { callApi } from '../utils/api';
import { API_ROUTES, APP_ROUTES } from '../utils/constants';
import { getTokenFromLocalStorage, removeUserFromLocalStorage, getUserMailFromLocalStorage } from '../lib/common';

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") != null ? true : false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const userMail = getUserMailFromLocalStorage();
  const token = getTokenFromLocalStorage();

  useEffect(() => {
    window.addEventListener('storage', () => {
      setIsLoggedIn(localStorage.getItem("token") ? true : false)
    });
  }, [token])

  const signOut = async () => {
    try {
      setIsLoading(true);
      const response = await callApi('DELETE', API_ROUTES.SIGN_OUT, {}, token);

      if (response?.status === 200) {
        removeUserFromLocalStorage();
        navigate(APP_ROUTES.SIGN_IN);
      } else {
        console.log('Something went wrong during signing in:', response.message);
        return;
      }
    }
    catch (err) {
      console.log('Some error occured during signing in::', err.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 text-white p-4">
      <div className="flex items-centear flex-shrink-0 text-white mr-6">
        <Link to="/" className='contents'>
          <HomeIcon />
          <span className="font-semibold text-4xl tracking-tight pl-3 self-center">Funny Movies</span>
        </Link>
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        {token ?
          <React.Fragment>
            <div className="text-sm lg:flex-grow">
              <Link to="/signup">
                <span className="w-full font-medium text-gray-800 ml-1">
                  Share a movie
                </span>
              </Link>
            </div>

            <div>
              <span>Welcome, {userMail}</span>
              <button
                className="inline-flex justify-center p-6 py-2 ml-3 rounded-md self-center bg-white text-gray-800"
                onClick={signOut}
              >
                {
                  isLoading ? <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
                }
                <span>
                  Sign Out
                </span>
              </button>
            </div>
          </React.Fragment> :
          <React.Fragment>
            <div className="text-sm lg:flex-grow"></div>
            <div>
              <Link to="/signin">
                <button className="justify-center p-6 py-2 rounded-md self-center text-gray-600  bg-white hover:text-gray-900">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <span className="w-full text-white ml-1">
                  Sign Up
                </span>
              </Link>
            </div>
          </React.Fragment>
        }
      </div>
    </nav >
  )
}

export default Nav;
