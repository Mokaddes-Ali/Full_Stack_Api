import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getUser, updateProfile, updatePassword, deleteAccount,verifyPassword } from '../services/api';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const MySwal = withReactContent(Swal);

const Profile = () => {
    const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
    const [passwords, setPasswords] = useState({ current_password: '', new_password: '', new_password_confirmation: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate()


    // Fetch user data on component mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser();
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    // Handle profile input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Handle password input changes
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
    };

    // // Update profile
    // const handleUpdateProfile = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await updateProfile(user);
    //         MySwal.fire('Success', 'Profile updated successfully!', 'success');
    //     } catch (error) {
    //         console.error('Error updating profile:', error);
    //         MySwal.fire('Error', 'Failed to update profile', 'error');
    //     }
    // };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        
        // Create a FormData object to handle file upload
        const formData = new FormData();
        formData.append('first_name', user.first_name);
        formData.append('last_name', user.last_name);
        formData.append('email', user.email);
        formData.append('phone_number', user.phone_number);
    
    
        try {
            await updateProfile(formData)
            MySwal.fire('Success', 'Profile updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating profile:', error);
            MySwal.fire('Error', 'Failed to update profile', 'error');
        }
    };
    

    // Update password and refresh page
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            await updatePassword(passwords);
            MySwal.fire('Success', 'Password updated successfully!', 'success');
            setPasswords({ current_password: '', new_password: '', new_password_confirmation: '' }); // Clear password fields
            // window.location.reload(); // Refresh the page
        } catch (error) {
            console.error('Error updating password:', error);
            MySwal.fire('Error', 'Failed to update password', 'error');
        }
    };

    // // Delete account
    // const handleDeleteAccount = async () => {
    //     MySwal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#d33',
    //         cancelButtonColor: '#3085d6',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             try {
    //                 await deleteAccount();
    //                 localStorage.removeItem('token');
    //                 localStorage.removeItem('user');
    //                 MySwal.fire('Deleted!', 'Your account has been deleted.', 'success');
    //                 navigate('/');
    //             } catch (error) {
    //                 console.error('Error deleting account:', error);
    //                 MySwal.fire('Error', 'Failed to delete account', 'error');
    //             }
    //         }
    //     });
    // };


    const handleDeleteAccount = async () => {
        // Password confirmation modal
        const { value: password } = await Swal.fire({
            title: 'Confirm Password',
            input: 'password',
            inputLabel: 'Enter your password',
            inputPlaceholder: 'Password',
            inputAttributes: {
                maxlength: 100,
                autocapitalize: 'off',
                autocorrect: 'off',
            },
            showCancelButton: true,
        });

        if (!password) return;

        try {
            // Verify password
            await verifyPassword(password);

            // Confirm delete modal
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteAccount();
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    Swal.fire('Deleted!', 'Your account has been deleted.', 'success');
                    navigate('/');
                }
            });
        } catch (error) {
            Swal.fire('Error', error.message || 'Failed to delete account', 'error');
        }
    };



    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold text-center">Profile</h1>

            {/* <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                    <label className="block text-gray-700">First Name</label>
                    <input 
                        type="text" 
                        name="first_name" 
                        value={user.first_name} 
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded" 
                        required 
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Last Name</label>
                    <input 
                        type="text" 
                        name="last_name" 
                        value={user.last_name} 
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded" 
                        required 
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Phone Number</label>
                    <input 
                        type="text" 
                        name="phone_number" 
                        value={user.phone_number} 
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded" 
                        required 
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={user.email} 
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded" 
                        required 
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full">Update Profile</button>
            </form> */}


<form onSubmit={handleUpdateProfile} className="space-y-4">
    <div>
        <label className="block text-gray-700">First Name</label>
        <input 
            type="text" 
            name="first_name" 
            value={user.first_name} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" 
            required 
        />
    </div>

    <div>
        <label className="block text-gray-700">Last Name</label>
        <input 
            type="text" 
            name="last_name" 
            value={user.last_name} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" 
            required 
        />
    </div>

    <div>
        <label className="block text-gray-700">Phone Number</label>
        <input 
            type="text" 
            name="phone_number" 
            value={user.phone_number} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" 
            required 
        />
    </div>

    <div>
        <label className="block text-gray-700">Email</label>
        <input 
            type="email" 
            name="email" 
            value={user.email} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" 
            required 
        />
    </div>



    <button type="submit" className="btn btn-primary w-full">Update Profile</button>
</form>


                  <form onSubmit={handleUpdatePassword} className="space-y-4">
             <div>
                   <label className="block text-gray-700">Current Password</label>
                   <div className="relative">
                       <input 
                            type={showPassword ? 'text' : 'password'}
                            name="current_password" 
                            value={passwords.current_password} 
                            onChange={handlePasswordChange} 
                            className="w-full p-2 border border-gray-300 rounded" 
                            required 
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700">New Password</label>
                    <div className="relative">
                        <input 
                            type={showNewPassword ? 'text' : 'password'}
                            name="new_password" 
                            value={passwords.new_password} 
                            onChange={handlePasswordChange} 
                            className="w-full p-2 border border-gray-300 rounded" 
                            required 
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowNewPassword(!showNewPassword)}>
                            {showNewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700">Confirm New Password</label>
                    <div className="relative">
                        <input 
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="new_password_confirmation" 
                            value={passwords.new_password_confirmation} 
                            onChange={handlePasswordChange} 
                            className="w-full p-2 border border-gray-300 rounded" 
                            required 
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-secondary w-full">Update Password</button>
            </form>

            <button 
    className="btn btn-error w-full" 
    onClick={handleDeleteAccount}
>
    Delete Account
</button>

        </div>
    );
};

export default Profile;