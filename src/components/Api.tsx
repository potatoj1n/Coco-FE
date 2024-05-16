import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.yourapp.com',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      if (isExpired) {
        // 토큰 만료 시 요청 중단
        return Promise.reject(new Error('Token expired'));
      }
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
api.interceptors.response.use(
  response => {
    // 성공 응답을 그대로 반환
    return response;
  },
  error => {
    // 응답 에러 처리
    if (error.response && error.response.status === 401) {
      // 예: 토큰 만료 또는 권한 없음
      // 여기에서 로그인 페이지로 리디렉션 등의 처리를 할 수 있음
      return Promise.reject(new Error('Unauthorized or token expired'));
    }
    return Promise.reject(error);
  },
);

export default api;
