import { useState } from "react";
import { resetPassword } from "../services/api";
import { useNavigate } from "react-router-dom"; 
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [loading, setLoading] = useState(false); 
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
    const navigate = useNavigate(); 

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await resetPassword(formData);

            if (response.data.message === 'Password reset successfully') {
                toast.success("Password reset successfully! Redirecting to login...");

                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                toast.error("Failed to reset password.");
            }
        } catch (error) {
            toast.error("An error occurred while resetting your password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                {/* Email Field */}
                <div className="form-control mb-4 relative">
                    <label htmlFor="email" className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-full pl-4"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>

                {/* New Password Field */}
                <div className="form-control mb-4 relative">
                    <label htmlFor="password" className="label">
                        <span className="label-text">New Password</span>
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Enter new password"
                        className="input input-bordered w-full pl-4"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 cursor-pointer"
                    >
                        {showPassword ? (
                            <AiOutlineEyeInvisible className="text-gray-500" />
                        ) : (
                            <AiOutlineEye className="text-gray-500" />
                        )}
                    </span>
                </div>

                {/* Confirm Password Field */}
                <div className="form-control mb-4 relative">
                    <label htmlFor="password_confirmation" className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="password_confirmation"
                        placeholder="Confirm new password"
                        className="input input-bordered w-full pl-4"
                        value={formData.password_confirmation}
                        onChange={(e) =>
                            setFormData({ ...formData, password_confirmation: e.target.value })
                        }
                        required
                    />
                    <span
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 cursor-pointer"
                    >
                        {showConfirmPassword ? (
                            <AiOutlineEyeInvisible className="text-gray-500" />
                        ) : (
                            <AiOutlineEye className="text-gray-500" />
                        )}
                    </span>
                </div>

                {/* Submit Button */}
                <div className="form-control mt-4">
                    <button
                        type="submit"
                        className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Reset Password"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
