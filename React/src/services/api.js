// import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api';
// export const fileUrl = 'http://127.0.0.1:8000';

// export const token = () => {
//     const adminInfo = localStorage.getItem('adminInfo');

//     if (!adminInfo) {
//         console.error("No adminInfo found in localStorage");
//         return null; // Return null or handle the error as needed
//     }

//     try {
//         const data = JSON.parse(adminInfo);
//         if (data && data.token) { // Assuming the token is stored in the `token` property
//             return data.token;
//         } else {
//             console.error("Token not found in adminInfo");
//             return null; // Return null or handle the error as needed
//         }
//     } catch (error) {
//         console.error("Error parsing adminInfo from localStorage", error);
//         return null; // Return null or handle the error as needed
//     }
// };



// const api = axios.create({
//     baseURL: API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,

//     },
// });

// export const verifyPassword = async (password) => {
//     try {
//         const response = await axios.post(`${API_URL}/verify-password`, { password }, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };

// // User APIs
// export const getUser = () => api.get('/user');
// export const updateProfile = (data) => api.put('/user/profile', data);
// export const updatePassword = (data) => api.put('/user/password', data);
// export const deleteAccount = () => api.delete('/user');


// // Auth APIs
// export const register = (data) => api.post('/register', data);
// export const login = (data) => api.post('/login', data);
// export const logout = () => axios.post(`${API_URL}/logout`, {}, {
//     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
// });
// export const forgotPassword = (data) => api.post('/forgot-password', data);
// export const resetPassword = (data) => api.post('/reset-password', data);

// // OTP APIs
// export const sendOtp = (email) => api.post('/send-otp', { email });
// export const verifyOtp = (otp) => api.post('/verify-otp', { otp });




import axios from 'axios';

export const URL = 'http://127.0.0.1:8000/api';
const API_URL = 'http://127.0.0.1:8000/api';
export const fileUrl = 'http://127.0.0.1:8000';

// Get token from localStorage or handle missing info
export const token = () => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (!adminInfo) {
        console.error("No adminInfo found in localStorage");
        return null;
    }
    
    try {
        const data = JSON.parse(adminInfo);
        return data?.token || null;
    } catch (error) {
        console.error("Error parsing adminInfo from localStorage", error);
        return null;
    }
};


const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,

    },
});

export const verifyPassword = async (password) => {
    try {
        const response = await axios.post(`${API_URL}/verify-password`, { password }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

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