import axios from 'axios';

export async function callApi(method, url, params = {}, token = null) {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  const response = await axios({ method: method, url: url, data: params });

  return response.data;
}
