// import { useState } from 'react';
// import { forgotPassword } from '../services/api';

// const ForgotPassword = () => {
//     const [email, setEmail] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         try {
//             const response = await forgotPassword({ email });
//             console.log(response.data);
//             // Handle success (e.g., show a success message)
//         } catch (error) {
//             setError(error.response?.data || 'An error occurred');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex justify-center items-center bg-gray-50">
//             <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
//                         <input
//                             type="email"
//                             name="email"
//                             id="email"
//                             placeholder="Enter your email"
//                             onChange={(e) => setEmail(e.target.value)}
//                             value={email}
//                             className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     {error && <p className="text-sm text-red-600">{error}</p>}
//                     <div className="flex justify-between items-center">
//                         <button
//                             type="submit"
//                             className={`w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                             disabled={loading}
//                         >
//                             {loading ? 'Sending...' : 'Send Reset Link'}
//                         </button>
//                     </div>
//                 </form>
//                 <p className="mt-4 text-center text-sm text-gray-600">
//                     Remembered your password?{' '}
//                     <a href="/login" className="text-blue-500 hover:text-blue-700">Login</a>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword;


import { useState } from "react";
import { sendOtp } from "../services/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await sendOtp({ email });
            setMessage(response.data.message);
            // Navigate to VerifyOtp page with email as state
            navigate("/verify-otp", { state: { email } });
        } catch (error) {
            setMessage("Something went wrong!");
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send OTP</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;

