import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshEmAndamento = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isErro401 = error.response?.status === 401;
    const jaTentouRenovar = originalRequest._retry;
    const isRotaDeAuth = originalRequest.url?.includes('/auth/');

    if (isErro401 && !jaTentouRenovar && !isRotaDeAuth) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        if (!refreshEmAndamento) {
          refreshEmAndamento = axios
            .post('http://localhost:8080/auth/refresh', { refreshToken })
            .then((response) => {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('refreshToken', response.data.refreshToken);
              return response.data.token;
            })
            .finally(() => {
              refreshEmAndamento = null;
            });
        }

        const novoToken = await refreshEmAndamento;
        originalRequest.headers.Authorization = `Bearer ${novoToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
