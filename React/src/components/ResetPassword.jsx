import { useState } from 'react';
import { resetPassword } from '../services/api';

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        token: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await resetPassword(formData);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input type="password" name="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <input type="password" name="password_confirmation" placeholder="Confirm Password" onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })} />
            <input type="hidden" name="token" value={formData.token} />
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPassword;