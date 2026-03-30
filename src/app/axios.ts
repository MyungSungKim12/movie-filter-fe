import axios, { InternalAxiosRequestConfig } from 'axios';

// 1. 인스턴스 생성
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    withCredentials: true,
});

// 2. 요청 인터셉터: 여기서 토큰이 안 담기면 범인은 localStorage 값 자체입니다.
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3. 응답 인터셉터
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (originalRequest.url.includes('/api/user/reissue') ||
                originalRequest.url.includes('/local/api/user/reissue')) {
                console.warn("리프레시 토큰도 만료되었습니다. 로그아웃 처리합니다.");
                localStorage.removeItem('accessToken');
                window.location.href = '/';
                return Promise.reject(error);
            }

            try {
                const res = await axios.post(
                    'http://localhost:3000/local/api/user/reissue',
                    {},
                    { withCredentials: true }
                );

                if (res.status === 200) {
                    const newAccessToken = res.data.accessToken;
                    localStorage.setItem('accessToken', newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(originalRequest);
                }
            } catch (reissueError) {
                console.error("리프레시 토큰 만료됨");
                localStorage.removeItem('accessToken');
                window.location.href = '/';
                return Promise.reject(reissueError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;