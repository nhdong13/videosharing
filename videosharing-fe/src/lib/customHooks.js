import { useState, useEffect } from 'react';
import { getAuthenticatedUser, getVideos, removeUserFromLocalStorage } from './common';
import { APP_ROUTES } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

export function useUser() {
  const [user, setUser] = useState(null);
  const [authenticated, setAutenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserDetails() {
      const { user } = await getAuthenticatedUser();
      if (!user) {
        setUser(null);
        setAutenticated(false);
        removeUserFromLocalStorage();
        navigate(APP_ROUTES.SIGN_IN);
        return;
      }
      setUser(user);
      setAutenticated(true);
    }
    getUserDetails();
    // eslint-disable-next-line
  }, []);

  return { user, authenticated };
}

export function useVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function callGetVideos() {
      const { data } = await getVideos();
      setVideos(data.videos);
    }
    callGetVideos()
    // eslint-disable-next-line
  }, []);

  return { videos };
}
