import { logout } from '../services/api';

const Dashboard = () => {
    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            console.log('Logged out successfully');
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;