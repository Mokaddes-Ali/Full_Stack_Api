import React, { useState } from "react";

const CustomerForm = ({ editingCustomer, setEditingCustomer, fetchCustomers }) => {
  const [name, setName] = useState(editingCustomer?.name || "");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    const url = editingCustomer
      ? `http://127.0.0.1:8000/api/customers/${editingCustomer.id}`
      : "http://127.0.0.1:8000/api/customers";
    const method = editingCustomer ? "PUT" : "POST";

    console.log("Sending request to:", url);
    console.log("Method:", method);
    console.log("Form Data:", formData);

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data);
        fetchCustomers();
        setName("");
        setImage(null);
        setEditingCustomer(null);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full max-w-xs mr-2"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="file-input file-input-bordered w-full max-w-xs mr-2"
      />
      <button type="submit" className="btn btn-primary">
        {editingCustomer ? "Update" : "Add"} Customer
      </button>
    </form>
  );
};

export default CustomerForm;