import { useState } from "react";
import { resetPassword } from "../services/api";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate import

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // ✅ Initialize navigate

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await resetPassword(formData);
            setMessage(response.data.message);

            // ✅ Navigate to dashboard/login after password reset
            if (response.data.success) {
                setTimeout(() => {
                    navigate("/login"); // 🔥 Redirect to login/dashboard
                }, 1000);
            }
        } catch (error) {
            setMessage("Failed to reset password");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.password_confirmation}
                    onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
