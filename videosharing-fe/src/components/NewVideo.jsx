import React from 'react';
import { useState } from 'react';
import { API_ROUTES, APP_ROUTES } from '../utils/constants';
import { Link, useNavigate, Redirect, Navigate } from 'react-router-dom';
import { callApi } from '../utils/api';
import Notification from './Notification';
import { getTokenFromLocalStorage } from '../lib/common';

const NewVideo = () => {
  const navigate = useNavigate();
  const [thumbnailId, setThumbnailId] = useState(null);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const token = getTokenFromLocalStorage();

  if (!token) {
    return <Navigate to={APP_ROUTES.SIGN_IN} state={{ from: APP_ROUTES.NEW_VIDEO }} replace />
  }

  const createVideo = async () => {
    try {
      setIsLoading(true);
      const body = { video: { title, url, description } }
      const res = await callApi('POST', API_ROUTES.CREATE_VIDEO, body, token);

      if (!res?.data?.id) {
        const errMsg = Object.keys(res.data).map(key => `${key} ${res.data[key]}`).join(', ')
        notificationHandler({ heading: 'Something went wrong during create new movie: ', message: errMsg });
        return;
      }
      navigate(APP_ROUTES.DASHBOARD);
    }
    catch (err) {
      notificationHandler({ heading: 'ERROR', message: 'Something went wrong during create new movie' });
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

  const updateThumbnail = () => {
    if (!url) return;
    // eslint-disable-next-line
    var regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/i;
    var match = url.match(regex);
    setThumbnailId(match ? match[1] : null);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-800">
      <Notification heading={notification.heading} message={notification.message} />

      <div className="w-3/4 p shadow-lg rounded-md bg-white p-8 flex flex-col" style={{minHeight: '50%'}}>
        <h2 className="text-center font-medium text-2xl mb-4">
          New Movie
        </h2>
        <div className='flex flex-1'>
          <div className="flex flex-1 flex-col w-1/2 justify-evenly">
            <input
              className="border-2 outline-none p-2 rounded-md"
              type="text"
              placeholder="Enter movie title"
              value={title}
              onChange={(e) => { setTitle(e.target.value); }}
            />

            <input
              className="border-2 outline-none p-2 rounded-md"
              type="text"
              placeholder="Enter movie URL"
              value={url}
              onChange={(e) => { setUrl(e.target.value); }}
              onBlur={(e) => { updateThumbnail() }}
            />

            <input
              className="border-2 outline-none p-2 rounded-md"
              type="text"
              placeholder="Enter movie description"
              value={description}
              onChange={(e) => { setDescription(e.target.value); }}
            />
          </div>
          <div className='w-1/2 p-8'>
            {thumbnailId && <img src={`https://img.youtube.com/vi/${thumbnailId}/hqdefault.jpg`} alt='youtube' />}
          </div>
        </div>
        <button
          className="
             flex justify-center
             p-2 rounded-md w-1/2 self-center
             bg-gray-800  text-white 
             hover:bg-gray-700"
          onClick={createVideo}
        >
          {
            isLoading ?
              <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
          }
          <span>
            Create Movie
          </span>
        </button>
        <div className="text-center text-sm">
          Back to Dashboard
          <Link to="/">
            <span className="font-medium text-blue-800 ml-1">
              Dashboard
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewVideo;
