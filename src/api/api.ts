import axios from "axios";


export const BASE_URL = 'https://strapi.cleverland.by/api/'
export const instance = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
});
export const authAxios = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
});


instance.interceptors.request.use( (config)=> {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

    return config
} )
