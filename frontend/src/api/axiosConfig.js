import axios from 'axios';

// Creamos una instancia de Axios apuntando a nuestro backend
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Este "Interceptor" frena cada petición justo antes de salir hacia Spring Boot
api.interceptors.request.use(
    (config) => {
        // Buscamos el token JWT que guardaremos en el navegador al iniciar sesión
        const token = localStorage.getItem('token');

        if (token) {
            // Si hay token, se lo pegamos en la cabecera como un pasaporte
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url || '';
        const esLogin = url.includes('/auth/');

        if (status === 401 && !esLogin) {
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            if (window.location.pathname !== '/login') {
                window.location.assign('/login');
            }
        }

        return Promise.reject(error);
    }
);

export default api;