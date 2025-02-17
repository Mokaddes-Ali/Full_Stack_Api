import { useNavigate } from "react-router-dom";
import { logout } from "../services/api";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Check if the user is logged in by looking for token in localStorage
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

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
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
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
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
    </div>
  );
};

export default Dashboard;

