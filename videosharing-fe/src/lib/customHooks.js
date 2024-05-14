import { useState, useEffect } from 'react';
import { getAuthenticatedUser } from './common';
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
        navigate(APP_ROUTES.SIGN_IN);
        return;
      }
      setUser(user);
      setAutenticated(true);
    }
    getUserDetails();
  }, []);

  return { user, authenticated };
}
