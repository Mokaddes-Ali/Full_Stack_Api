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
import ProtectedRoute from './services/ProtectedRoute';
import NotFound from './pages/NotFound';
import { AdminRequireAuth } from './components/admin/AdminRequireAuth';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin'

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
                <Route path="/admin/dashboard" element={
                 <AdminRequireAuth>
                  <AdminDashboard />
                  </AdminRequireAuth>} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                     <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
        <ToastContainer />
        </>
    );
};

export default App;