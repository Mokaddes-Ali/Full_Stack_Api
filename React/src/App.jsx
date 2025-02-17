import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import VerifyOtp from './components/OTPVerification';
import Profile from './components/Profile';

const App = () => {
    return (
        <>
        <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
        <ToastContainer />
        </>
    );
};

export default App;