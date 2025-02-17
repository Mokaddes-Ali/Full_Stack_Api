import { useState } from "react";
import { sendOtp } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await sendOtp({ email });
        toast.success("OTP sent successfully! We have sent an OTP to email.");
    
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong! Please try again.");
      setMessage("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-center">Forgot Password</h2>
          <form onSubmit={handleForgotPassword}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Enter your email</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-4">
  <button
    type="submit"
    className={`btn text-white ${loading ? "bg-white" : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"} focus:ring-4 focus:ring-blue-300 flex items-center justify-center`}
    disabled={loading}
  >
    {loading ? (
      <>
        {/* Spinner Icon */}
        <svg
          className="w-5 h-5 mr-2 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v4m0 0l-2-2m2 2l2-2m0 0h4m-4 0l-2 2m2-2V4"
          />
        </svg>
        Sending OTP...
      </>
    ) : (
      "Send OTP"
    )}
  </button>
</div>


          </form>
          {message && <p className="text-center text-sm text-error mt-2">{message}</p>}

  
          <div className="text-center mt-4">
            <p>
              Remember your password?{" "}
              <Link to="/login" className="text-primary font-semibold">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
