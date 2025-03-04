const API_URL = 'http://localhost:3000/api/v1'

export const CHANNEL_URL = 'ws://localhost:3000/cable'

export const API_ROUTES = {
  SIGN_UP: `${API_URL}/sign_up`,
  SIGN_IN: `${API_URL}/sign_in`,
  SIGN_OUT: `${API_URL}/sign_out`,
  GET_USER: `${API_URL}/auth/me`,
  CREATE_VIDEO: `${API_URL}/videos`,
  GET_VIDEOS: API_URL,
  GET_VIDEO: `${API_URL}/videos/:id`
}

export const APP_ROUTES = {
  SIGN_UP: '/signup',
  SIGN_IN: '/signin',
  DASHBOARD: '/dashboard',
  NEW_VIDEO: '/new-movie'
}
