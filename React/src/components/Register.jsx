import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { register, sendOtp, verifyOtp } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(180);
  const [otpError, setOtpError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let countdown;
    if (timer > 0 && otpSent) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [timer, otpSent]);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await register(formData);
      // toast.success('Registration successful!');
      setOtpSent(true);
      await sendOtp(formData.email);
      setLoading(false);
      setIsModalOpen(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
      setLoading(false);
    }
  };

  const verifyOtpHandler = async () => {
    if (otp === "") {
      setOtpError("Please enter OTP");
      return;
    }

    try {
      const response = await verifyOtp({ otp });
      localStorage.setItem("token", response.data.token);
      toast.success("OTP verified successfully!");
      navigate("/login");
      setIsModalOpen(false);
    } catch (error) {
      setOtpError("Invalid OTP or expired");
    }
  };

  const resetOtpHandler = async () => {
    setOtpSent(false);
    setOtp("");
    setTimer(180);
    await sendOtp(getValues("email"));
    setOtpSent(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 space-y-4 bg-white rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Create Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="input input-bordered w-full"
              {...formRegister("first_name", {
                required: "First name is required",
              })}
            />
            {errors.first_name && (
              <p className="text-red-500 text-lg">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="input input-bordered w-full"
              {...formRegister("last_name", {
                required: "Last name is required",
              })}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name.message}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...formRegister("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              {...formRegister("phone_number", {
                required: "Phone number is required",
              })}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">
                {errors.phone_number.message}
              </p>
            )}
          </div>
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                {...formRegister("password", {
                  required: "Password is required",
                })}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirmation"
                placeholder="Confirm Password"
                className="input input-bordered w-full"
                {...formRegister("password_confirmation", {
                  required: "Password confirmation is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </div>
            </div>
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary text-md w-full mt-3"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-2">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-[600px] md:w-[300px]">
              <h3 className="text-xl font-semibold text-center mb-4">
                Enter OTP
              </h3>

              <p className="text-green-500 text-center mb-4">
                Successfully sent OTP! Check your email.
              </p>

              <input
                type="text"
                placeholder="Enter OTP"
                className="input input-bordered w-full mb-4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                onClick={verifyOtpHandler}
                className="btn btn-primary w-full mb-2"
              >
                Verify OTP
              </button>

              {timer <= 0 && (
                <p className="text-red-500 text-center">OTP has expired</p>
              )}
              {otpError && (
                <p className="text-red-500 text-center">{otpError}</p>
              )}

              <p className="text-center mb-2">
                Time remaining: {Math.floor(timer / 60)}:{timer % 60}
              </p>

              <button
                onClick={resetOtpHandler}
                className="btn btn-accent w-full mb-2"
              >
                Reset OTP
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-error w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;