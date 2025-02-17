// src/services/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const register = (data) => axios.post(`${API_URL}/register`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
export const logout = () => axios.post(`${API_URL}/logout`, {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const forgotPassword = (data) => axios.post(`${API_URL}/forgot-password`, data);
export const resetPassword = (data) => axios.post(`${API_URL}/reset-password`, data);

// Send OTP
export const sendOtp = (email) => axios.post(`${API_URL}/send-otp`, { email });

// Verify OTP
export const verifyOtp = (otp) => axios.post(`${API_URL}/verify-otp`, { otp });

