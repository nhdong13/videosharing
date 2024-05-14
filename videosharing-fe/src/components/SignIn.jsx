import React from 'react';
import { useState } from 'react';
import { API_ROUTES, APP_ROUTES } from '../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../lib/customHooks';
import { storeTokenInLocalStorage } from '../lib/common';
import { callApi } from '../utils/api';
import Notification from './Notification';

const SignIn = () => {
  const navigate = useNavigate();
  const { user, authenticated } = useUser();

  if (user || authenticated) {
    navigate(APP_ROUTES.DASHBOARD);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const defaultError = { heading: '', message: '' };
  const [error, setError] = useState(defaultError);

  const signIn = async () => {
    try {
      const body = { email, password };
      setIsLoading(true);
      const response = await callApi('POST', API_ROUTES.SIGN_IN, body);

      if (!response?.user?.authentication_token) {
        errorHandler({ heading: 'Something went wrong during signing in:', message: response.message });
        return;
      }
      storeTokenInLocalStorage(response.user.authentication_token);
      navigate(APP_ROUTES.DASHBOARD);
    }
    catch (err) {
      errorHandler({ heading: 'Some error occured during signing in::', message: err.message });
    }
    finally {
      setIsLoading(false);
    }
  };

  const errorHandler = (err) => {
    setError(err);

    setTimeout(() => {
      setError(defaultError);
    }, 5000);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-800">
      <Notification heading={error.heading} message={error.message} />

      <div className="w-1/2 h-1/2 shadow-lg rounded-md bg-white p-8 flex flex-col">
        <h2 className="text-center font-medium text-2xl mb-4">
          Sign in
        </h2>
        <div className="flex flex-1 flex-col justify-evenly">
          <input
            className="border-2 outline-none p-2 rounded-md"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); }}
          />
          <input
            className="border-2 outline-none p-2 rounded-md"
            type="password"
            placeholder="*******" value={password}
            onChange={(e) => { setPassword(e.target.value); }}
          />

          <button
            className="
            flex justify-center
            p-2 rounded-md w-1/2 self-center
            bg-gray-800  text-white hover:bg-gray-800"
            onClick={signIn}
          >
            {
              isLoading ?
                <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
            }
            <span>
              SIGN IN
            </span>
          </button>
        </div>
        <div className="text-center text-sm">
          Not a User?
          <Link to="/signup">
            <span className="font-medium text-gray-800 ml-1">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div >
  );
}

export default SignIn;
