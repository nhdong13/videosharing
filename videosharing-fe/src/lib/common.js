import { callApi } from '../utils/api';
import { API_ROUTES } from '../utils/constants';

export function storeUserInLocalStorage(data) {
  localStorage.setItem('token', data.authentication_token);
  localStorage.setItem('email', data.email);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

export function getUserMailFromLocalStorage() {
  return localStorage.getItem('email');
}

export function removeUserFromLocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
}

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return defaultReturnObject;
    }
    const { data } = await callApi('GET', API_ROUTES.GET_USER, {}, token);
    const { user } = data;
    if (!user) {
      removeUserFromLocalStorage();
    }

    return { user };
  } catch (err) {
    console.log('getAuthenticatedUser, Something Went Wrong', err);
    return defaultReturnObject;
  }
}
