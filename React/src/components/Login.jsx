import { useState } from 'react';
import { login } from '../services/api';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        setLoading(true);
        try {
            const response = await login(formData);
            localStorage.setItem('token', response.data.token);
            toast.success('Logged in successfully');
            navigate('/dashboard');  // Redirect to dashboard
        } catch (error) {
            toast.error(error.response.data.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Sign In</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input 
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <div className="relative">
                            <input 
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                {...register('password', { required: 'Password is required' })}
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute right-3 top-3 text-xl"
                            >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="checkbox checkbox-primary" />
                            <label htmlFor="remember" className="ml-2 text-sm">Remember me</label>
                        </div>
                        <NavLink to='/forgot-password' className="text-sm text-blue-500 hover:text-blue-700">Forgot password?</NavLink>
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading && 'opacity-50 cursor-not-allowed'}`}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account? 
                        <NavLink to="/register" className="text-blue-500 hover:text-blue-700 ml-1">Register</NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

