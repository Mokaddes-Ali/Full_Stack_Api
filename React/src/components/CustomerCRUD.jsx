// React Frontend with CRUD using Daisy UI and Tailwind CSS

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CustomerCRUD() {
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        const { data } = await axios.get('/api/customers');
        setCustomers(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if (image) formData.append('image', image);

        if (editId) {
            await axios.post(`/api/customers/${editId}`, formData);
        } else {
            await axios.post('/api/customers', formData);
        }
        setName('');
        setImage(null);
        setEditId(null);
        fetchCustomers();
    };

    const handleEdit = (customer) => {
        setName(customer.name);
        setEditId(customer.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/customers/${id}`);
        fetchCustomers();
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full" required />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} className="file-input w-full" required={!editId} />
                <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Create'}</button>
            </form>

            <div className="mt-6">
                {customers.map((customer) => (
                    <div key={customer.id} className="card bg-base-100 shadow-xl p-4 mt-4">
                        <img src={`/storage/${customer.image}`} alt={customer.name} className="w-20 h-20 object-cover rounded-full" />
                        <h2 className="text-xl font-bold">{customer.name}</h2>
                        <button onClick={() => handleEdit(customer)} className="btn btn-secondary">Edit</button>
                        <button onClick={() => handleDelete(customer.id)} className="btn btn-error ml-2">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
