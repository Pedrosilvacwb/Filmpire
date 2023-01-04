import axios from 'axios';

export const movieApi = axios.create({
  baseURL: 'http://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await movieApi.get('/authentication/token/new');

    const token = data.request_token;

    if (data.success) {
      window.localStorage.setItem('@MovieToken', token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}`;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSessionId = async () => {
  const token = window.localStorage.getItem('@MovieToken');

  if (token) {
    try {
      const { data } = await movieApi.post('authentication/session/new', {
        request_token: token,
      });
      window.localStorage.setItem('@MovieId', data.session_id);
      return data.session_id;
    } catch (error) {
      console.log(error);
    }
  }
};
