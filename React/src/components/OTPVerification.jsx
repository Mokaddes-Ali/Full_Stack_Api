import { useState } from "react";
import { verifyOtp } from "../services/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await verifyOtp({ email, otp });
            setMessage(response.data.message);
            
            // If OTP is verified successfully, navigate to Reset Password page
            if (response.data.success) {
                navigate("/reset-password", { state: { email } });
            }
        } catch (error) {
            setMessage("Invalid OTP");
        }
    };

    return (
        <div>
            <h2>Verify OTP</h2>
            <form onSubmit={handleVerifyOtp}>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Enter OTP" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    required 
                />
                <button type="submit">Verify OTP</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VerifyOtp;

