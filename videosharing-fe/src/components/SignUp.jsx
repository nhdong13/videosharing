import React from 'react';
import { useState } from 'react';
import { API_ROUTES, APP_ROUTES } from '../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { callApi } from '../utils/api';
import Notification from './Notification';

const SignUp = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({});

  const signUp = async () => {
    try {
      setIsLoading(true);
      const body = {
        email,
        password,
        confirmation_password: confirmation
      }
      const { data } = await callApi('POST', API_ROUTES.SIGN_UP, body);
      if (!data?.user) {
        const errMsg = Object.keys(data.message).map(key => `${key} ${data.message[key][0]}`).join(', ')
        notificationHandler({ heading: 'Something went wrong during signing up: ', message: errMsg });
        return;
      }
      navigate(APP_ROUTES.SIGN_IN);
    }
    catch (err) {
      console.log('Some error occured during signing up: ', err);
    }
    finally {
      setIsLoading(false);
    }
  };

  const defaultNotification = { heading: '', message: '' };
  const notificationHandler = (nt) => {
    setNotification(nt);

    setTimeout(() => {
      setNotification(defaultNotification);
    }, 5000);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-800">
      <Notification heading={notification.heading} message={notification.message} />

      <div className="w-1/2 h-3/4 shadow-lg rounded-md bg-white p-8 flex flex-col">
        <h2 className="text-center font-medium text-2xl mb-4">
          Sign Up
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
            placeholder="Password" value={password}
            onChange={(e) => { setPassword(e.target.value); }}
          />
          <input
            className="border-2 outline-none p-2 rounded-md"
            type="password"
            placeholder="Confirmation password" value={confirmation}
            onChange={(e) => { setConfirmation(e.target.value); }}
          />

          <button
            className="
             flex justify-center
             p-2 rounded-md w-1/2 self-center
             bg-gray-800  text-white 
             hover:bg-gray-700"
            onClick={signUp}
          >
            {
              isLoading ?
                <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
            }
            <span>
              SIGN UP
            </span>
          </button>
        </div>
        <div className="text-center text-sm">
          Already a User?
          <Link to="/signin">
            <span className="font-medium text-gray-800 ml-1">
              Sign In
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
