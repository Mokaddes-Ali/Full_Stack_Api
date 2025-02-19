import React, { useState } from 'react';
import axios from 'axios';

export default function ProfileImage() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedImage) {
            alert('Please select an image first!');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/profile/update-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            alert(response.data.message);
            setPreviewImage(response.data.image_url); // Update preview with uploaded image URL
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image!');
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="border p-2 rounded" 
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Upload Image
                </button>
            </form>

            {previewImage && (
                <img 
                    src={previewImage} 
                    alt="Profile Preview" 
                    className="mt-4 w-48 h-48 object-cover rounded-full border" 
                />
            )}
        </div>
    );
}
