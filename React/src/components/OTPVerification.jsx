import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp, sendOtp } from "../services/api";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const { state } = useLocation();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(() => {
    // Retrieve the stored timer value from local storage, if available
    const savedTimer = localStorage.getItem("resendTimer");
    return savedTimer ? parseInt(savedTimer, 10) : 180; // Default to 180 seconds
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await verifyOtp({ otp, email: state.email });
      toast.success(response.data.message);
      navigate("/reset-password", { state: { email: state.email } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP functionality
  const handleResendOtp = async () => {
    if (resendTimer > 0) {
      toast.error("Please wait before requesting OTP again.");
      return;
    }

    setResendTimer(180);
    setLoading(true); 
    try {
      await sendOtp({ email: state.email });
      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Countdown for the resend button
  useEffect(() => {
    if (resendTimer === 0) return;

    // Store the timer value in local storage every second
    localStorage.setItem("resendTimer", resendTimer);

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        const newTimer = prev - 1;
        localStorage.setItem("resendTimer", newTimer); // Update local storage
        return newTimer;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  // Format the time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-center">Verify OTP</h2>
          
          {/* OTP Input Form */}
          <form onSubmit={handleVerifyOtp}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Enter OTP</span>
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-4">
  <button
    type="submit"
    className={`btn btn-primary ${loading ? "loading" : ""}`}
    disabled={loading}
  >
    {loading ? (
      <>
        <span className="loading-spinner"></span>
        Verifying...
      </>
    ) : (
      "Verify OTP"
    )}
  </button>
</div>

          </form>

          {/* Message instructing user to check email for OTP */}
          <div className="text-center mt-4">
            <p className="text-sm text-green-600 font-bold">
              We have sent an OTP to your email inbox.
            </p>
          </div>

          {/* Resend OTP Button */}
          <div className="text-center mt-2">
            <p>
              {resendTimer > 0 ? (
                <>Resend OTP in {formatTime(resendTimer)}</>
              ) : (
                <button onClick={handleResendOtp} className="btn btn-link" disabled={loading}>
                  {loading ? "Sending OTP..." : "Resend OTP"}
                </button>
              )}
            </p>
          </div>

          {/* Error or Success Message */}
          {message && <p className="text-center text-sm text-error mt-2">{message}</p>}

          {/* Back to Login Button */}
          <div className="text-center mt-4">
            <button
              className="btn btn-link"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;


