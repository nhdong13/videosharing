const API_URL = 'http://localhost:3000/api/v1'

export const API_ROUTES = {
  SIGN_UP: `${API_URL}/sign_up`,
  SIGN_IN: `${API_URL}/sign_in`,
  SIGN_OUT: `${API_URL}/sign_out`,
  GET_USER: `${API_URL}/auth/me`,
}

export const APP_ROUTES = {
  SIGN_UP: '/signup',
  SIGN_IN: '/signin',
  DASHBOARD: '/dashboard',
}
