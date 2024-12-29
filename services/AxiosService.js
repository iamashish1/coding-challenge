import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//An instance of Axios
const AxiosService = axios.create({
    baseURL: 'https://dummyjson.com/',
});
//Intercepptor to add token to request headers
AxiosService.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
//Interceptor to handle token expiration
AxiosService.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            //_retry property to prevent infinite loop
            originalRequest._retry = true;
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            return axios
                .post('https://dummyjson.com/auth/refresh', { refreshToken: refreshToken, expiresInMins: 1 })
                .then(async (res) => {
                    if (res.status === 200) {
                        //save tokens to async storage
                        await AsyncStorage.setItem('accessToken', res.data.accessToken);
                        await AsyncStorage.setItem('refreshToken', res.data.refreshToken);

                        AxiosService.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken;
                        return AxiosService(originalRequest);
                    }
                });
        }
        return Promise.reject(error);
    }
);

export default AxiosService;