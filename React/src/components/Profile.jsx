// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import { getUser, updateProfile, updatePassword, deleteAccount } from '../services/api';

// const MySwal = withReactContent(Swal);

// const Profile = () => {
//     const [user, setUser] = useState(() => {
//         const savedUser = localStorage.getItem('user');
//         return savedUser ? JSON.parse(savedUser) : null;
//     });
//     const [loading, setLoading] = useState(!user);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user) {
//             fetchUser();
//         }
//     }, []);

//     const fetchUser = async () => {
//         setLoading(true);
//         try {
//             const response = await getUser();
//             setUser(response.data);
//             localStorage.setItem('user', JSON.stringify(response.data));
//         } catch (error) {
//             console.error('Error fetching user:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleUpdateProfile = async (data) => {
//         setLoading(true);
//         try {
//             const response = await updateProfile(data);
//             setUser(response.data);
//             localStorage.setItem('user', JSON.stringify(response.data));
//             MySwal.fire('Success', 'Profile updated successfully!', 'success');
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             MySwal.fire('Error', 'Failed to update profile', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleUpdatePassword = async (data) => {
//         setLoading(true);
//         try {
//             await updatePassword(data);
//             MySwal.fire('Success', 'Password updated successfully!', 'success');
//         } catch (error) {
//             console.error('Error updating password:', error);
//             MySwal.fire('Error', 'Failed to update password', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDeleteAccount = async () => {
//         MySwal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, delete it!'
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 setLoading(true);
//                 try {
//                     await deleteAccount();
//                     localStorage.removeItem('token');
//                     localStorage.removeItem('user');
//                     MySwal.fire('Deleted!', 'Your account has been deleted.', 'success');
//                     navigate('/');
//                 } catch (error) {
//                     console.error('Error deleting account:', error);
//                     MySwal.fire('Error', 'Failed to delete account', 'error');
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         });
//     };

//     return (
//         <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
//             <h1 className="text-2xl font-bold text-center">Profile</h1>
//             {loading && <div className="text-center">Loading...</div>}
//             {user && (
//                 <div className="text-center">
//                     <img 
//                         className="w-24 h-24 rounded-full mx-auto" 
//                         src={user.image ? `http://your-laravel-backend-url/storage/${user.image}` : 'default-image.png'} 
//                         alt="Profile" 
//                     />
//                     <h2 className="text-xl font-semibold">{user.first_name} {user.last_name}</h2>
//                     <p className="text-gray-600">{user.email}</p>
//                 </div>
//             )}

//             <div className="space-y-4">
//                 <button 
//                     className="btn btn-primary w-full" 
//                     onClick={() => handleUpdateProfile({ first_name: 'NewFirstName' })}>
//                     Update Name
//                 </button>

//                 <button 
//                     className="btn btn-secondary w-full" 
//                     onClick={() => handleUpdatePassword({ current_password: 'oldPassword', new_password: 'newPassword', new_password_confirmation: 'newPassword' })}>
//                     Update Password
//                 </button>

//                 <button 
//                     className="btn btn-error w-full" 
//                     onClick={handleDeleteAccount}>
//                     Delete Account
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Profile;



// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import { getUser, updateProfile, updatePassword, deleteAccount } from '../services/api';

// const MySwal = withReactContent(Swal);

// const Profile = () => {
//     const [user, setUser] = useState(() => {
//         const savedUser = localStorage.getItem('user');
//         return savedUser ? JSON.parse(savedUser) : null;
//     });
//     const [loading, setLoading] = useState(!user);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user) {
//             fetchUser();
//         }
//     }, [user]);

//     const fetchUser = async () => {
//         setLoading(true);
//         try {
//             const response = await getUser();
//             setUser(response.data);
//             localStorage.setItem('user', JSON.stringify(response.data));
//         } catch (error) {
//             console.error('Error fetching user:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleUpdateProfile = async (data) => {
//         setLoading(true);
//         try {
//             const response = await updateProfile(data);
//             setUser(response.data);
//             localStorage.setItem('user', JSON.stringify(response.data));
//             MySwal.fire('Success', 'Profile updated successfully!', 'success');
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             MySwal.fire('Error', 'Failed to update profile', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleUpdatePassword = async (data) => {
//         setLoading(true);
//         try {
//             await updatePassword(data);
//             MySwal.fire('Success', 'Password updated successfully!', 'success');
//         } catch (error) {
//             console.error('Error updating password:', error);
//             MySwal.fire('Error', 'Failed to update password', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDeleteAccount = async () => {
//         MySwal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, delete it!'
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 setLoading(true);
//                 try {
//                     await deleteAccount();
//                     localStorage.removeItem('token');
//                     localStorage.removeItem('user');
//                     MySwal.fire('Deleted!', 'Your account has been deleted.', 'success');
//                     navigate('/');
//                 } catch (error) {
//                     console.error('Error deleting account:', error);
//                     MySwal.fire('Error', 'Failed to delete account', 'error');
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         });
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const formData = new FormData(event.target);
//         const updatedData = {
//             first_name: formData.get('first_name'),
//             last_name: formData.get('last_name'),
//             email: formData.get('email'),
//             phone_number: formData.get('phone_number'),
//             profile_image: formData.get('profile_image')
//         };
//         handleUpdateProfile(updatedData);
//     };

//     const handleChange = (event) => {
//         setUser({
//             ...user,
//             [event.target.name]: event.target.value
//         });
//     };

//     const handleImageChange = (event) => {
//         setUser({
//             ...user,
//             profile_image: event.target.files[0]
//         });
//     };

//     return (
//         <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
//             <h1 className="text-2xl font-bold text-center">Profile</h1>

//             {loading && <div className="text-center">Loading...</div>}
//             {user && (
//                <div className="p-6 max-w-lg mx-auto">
//                <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
//                <form onSubmit={handleSubmit} className="space-y-4">
//                  <label className="form-control">
//                    <span className="label-text">First Name</span>
//                    <input type="text" name="first_name" value={user.first_name} onChange={handleChange} className="input input-bordered w-full" required />
//                  </label>
         
//                  <label className="form-control">
//                    <span className="label-text">Last Name</span>
//                    <input type="text" name="last_name" value={user.last_name} onChange={handleChange} className="input input-bordered w-full" required />
//                  </label>
         
//                  <label className="form-control">
//                    <span className="label-text">Email</span>
//                    <input type="email" name="email" value={user.email} onChange={handleChange} className="input input-bordered w-full" required />
//                  </label>
         
//                  <label className="form-control">
//                    <span className="label-text">Phone Number</span>
//                    <input type="text" name="phone_number" value={user.phone_number} onChange={handleChange} className="input input-bordered w-full" required />
//                  </label>
         
//                  <label className="form-control">
//                    <span className="label-text">Profile Image</span>
//                    <input type="file" name="profile_image" onChange={handleImageChange} className="file-input w-full" />
//                  </label>
         
//                  <button type="submit" className="btn btn-primary w-full">Update Profile</button>
//                </form>
//              </div>
//             )}

//             <div className="space-y-4">
//                 <button 
//                     className="btn btn-primary w-full" 
//                     onClick={() => handleUpdateProfile({ first_name: 'NewFirstName' })}>
//                     Update Name
//                 </button>

//                 <button 
//                     className="btn btn-secondary w-full" 
//                     onClick={() => handleUpdatePassword({ current_password: 'oldPassword', new_password: 'newPassword', new_password_confirmation: 'newPassword' })}>
//                     Update Password
//                 </button>

//                 <button 
//                     className="btn btn-error w-full" 
//                     onClick={handleDeleteAccount}>
//                     Delete Account
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Profile;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getUser, updateProfile, updatePassword, deleteAccount } from '../services/api';

const MySwal = withReactContent(Swal);

const Profile = () => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(!user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, [user]);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await getUser();
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (data) => {
        setLoading(true);
        try {
            const response = await updateProfile(data);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            MySwal.fire('Success', 'Profile updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating profile:', error);
            MySwal.fire('Error', 'Failed to update profile', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (data) => {
        setLoading(true);
        try {
            await updatePassword(data);
            MySwal.fire('Success', 'Password updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating password:', error);
            MySwal.fire('Error', 'Failed to update password', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                try {
                    await deleteAccount();
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    MySwal.fire('Deleted!', 'Your account has been deleted.', 'success');
                    navigate('/');
                } catch (error) {
                    console.error('Error deleting account:', error);
                    MySwal.fire('Error', 'Failed to delete account', 'error');
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const updatedData = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            phone_number: formData.get('phone_number'),
            // profile_image: formData.get('profile_image')
        };
        handleUpdateProfile(updatedData);
    };

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    // const handleImageChange = (event) => {
    //     setUser({
    //         ...user,
    //         profile_image: event.target.files[0]
    //     });
    // };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold text-center">Profile</h1>

            {loading && <div className="text-center">Loading...</div>}
            {user && (
               <div className="p-6 max-w-lg mx-auto">
               <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
               <form onSubmit={handleSubmit} className="space-y-4">
                 <label className="form-control">
                   <span className="label-text">First Name</span>
                   <input type="text" name="first_name" value={user.first_name} onChange={handleChange} className="input input-bordered w-full" required />
                 </label>
         
                 <label className="form-control">
                   <span className="label-text">Last Name</span>
                   <input type="text" name="last_name" value={user.last_name} onChange={handleChange} className="input input-bordered w-full" required />
                 </label>
         
                 <label className="form-control">
                   <span className="label-text">Email</span>
                   <input type="email" name="email" value={user.email} onChange={handleChange} className="input input-bordered w-full" required />
                 </label>
         
                 <label className="form-control">
                   <span className="label-text">Phone Number</span>
                   <input type="text" name="phone_number" value={user.phone_number} onChange={handleChange} className="input input-bordered w-full" required />
                 </label>
         
                 {/* <label className="form-control">
                   <span className="label-text">Profile Image</span>
                   <input type="file" name="profile_image" onChange={handleImageChange} className="file-input w-full" />
                 </label> */}
         
                 <button type="submit" className="btn btn-primary w-full">Update Profile</button>
               </form>
             </div>
            )}

            <div className="space-y-4">
                {/* <button 
                    className="btn btn-primary w-full" 
                    onClick={handleUpdateProfile}>
                    Update Name
                </button> */}

                <button 
                    className="btn btn-secondary w-full" 
                    onClick={() => handleUpdatePassword({ current_password: 'oldPassword', new_password: 'newPassword', new_password_confirmation: 'newPassword' })}>
                    Update Password
                </button>

                <button 
                    className="btn btn-error w-full" 
                    onClick={handleDeleteAccount}>
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default Profile;
