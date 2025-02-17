import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

// User APIs
export const getUser = () => api.get('/user');
export const updateProfile = (data) => api.put('/user/profile', data);
export const updatePassword = (data) => api.put('/user/password', data);
export const deleteAccount = () => api.delete('/user');

// Auth APIs
export const register = (data) => api.post('/register', data);
export const login = (data) => api.post('/login', data);
export const logout = () => axios.post(`${API_URL}/logout`, {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const forgotPassword = (data) => api.post('/forgot-password', data);
export const resetPassword = (data) => api.post('/reset-password', data);

// OTP APIs
export const sendOtp = (email) => api.post('/send-otp', { email });
export const verifyOtp = (otp) => api.post('/verify-otp', { otp });


