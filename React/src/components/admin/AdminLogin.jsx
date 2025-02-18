import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { URL } from '../../services/api';
import { toast } from 'react-toastify';
import { AuthContext } from './context/Auth';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        if (loading) return; // Prevent double submission
        setLoading(true);

        try {
            const response = await fetch(`${URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (result.status === 200) {
                const adminInfo = {
                    token: result.token,
                    id: result.id,
                    firstName: result.first_name,
                    lastName: result.last_name,
                    email: result.email,
                };
                login(adminInfo);
                localStorage.setItem('adminInfo', JSON.stringify(adminInfo));
                toast.success('Login successful!');
                navigate('/admin/dashboard');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <nav aria-label="breadcrumb" className="py-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Login
                    </li>
                </ol>
            </nav>

            <h3 className="mb-4 text-center text-primary">Login</h3>

            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card shadow-sm mb-4 border-0">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control mb-3">
                                    <label className="label">
                                        <span className="label-text text-secondary">Email Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                                message: 'Enter a valid email address',
                                            },
                                        })}
                                        className={`input input-bordered shadow-sm ${errors.email ? 'input-error' : ''}`}
                                    />
                                    {errors.email && (
                                        <p className="text-error text-xs">{errors.email?.message}</p>
                                    )}
                                </div>

                                <div className="form-control mb-3">
                                    <label className="label">
                                        <span className="label-text text-secondary">Password</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            {...register('password', {
                                                required: 'Password is required',
                                                minLength: {
                                                    value: 6,
                                                    message: 'Password must be at least 6 characters',
                                                },
                                            })}
                                            className={`input input-bordered shadow-sm w-full ${errors.password ? 'input-error' : ''}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-secondary"
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-error text-xs">{errors.password?.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className={`btn btn-primary w-full shadow ${loading ? 'btn-disabled' : ''}`}
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        'Login'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
