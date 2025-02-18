import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  // Hero section slider content
  const slides = [
    {
      id: 1,
      title: "Welcome to Our Dashboard",
      description: "Manage your account efficiently with our amazing tools.",
      image: "https://source.unsplash.com/1600x900/?technology",
    },
    {
      id: 2,
      title: "Secure and Reliable",
      description: "Your data is safe and secure with our advanced technologies.",
      image: "https://source.unsplash.com/1600x900/?security",
    },
    {
      id: 3,
      title: "Fast and Easy",
      description: "Get things done quickly and easily with our platform.",
      image: "https://source.unsplash.com/1600x900/?speed",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
{/* Navbar */}
<div className="navbar bg-base-100 shadow-md px-4">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost text-xl">MyApp</NavLink>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/portfolio">Portfolio</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <div className="form-control mx-4">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </NavLink>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="btn btn-secondary ml-2"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-white bg-black bg-opacity-50"
            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <h1 className="text-5xl font-bold">{slide.title}</h1>
            <p className="text-xl mt-4">{slide.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer Section */}
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press Kit</a>
        </nav>
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">Terms of Service</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Cookie Policy</a>
        </nav>
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">Facebook</a>
          <a className="link link-hover">Twitter</a>
          <a className="link link-hover">Instagram</a>
        </nav>
      </footer>
    </div>
  );
};

export default Dashboard;


