import React, { useEffect, useState } from "react";
import CustomerItem from "./CustomerItem";
import CustomerForm from "./CustomerForm";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/customers");
    const data = await response.json();
    setCustomers(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/customers/${id}`, {
      method: "DELETE",
    });
    fetchCustomers();
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <CustomerForm
        editingCustomer={editingCustomer}
        setEditingCustomer={setEditingCustomer}
        fetchCustomers={fetchCustomers}
      />
      <div className="mt-4">
        {customers.map((customer) => (
          <CustomerItem
            key={customer.id}
            customer={customer}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerList;