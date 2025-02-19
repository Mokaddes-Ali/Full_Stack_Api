import React from "react";

const CustomerItem = ({ customer, onDelete, onEdit }) => {
  return (
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">{customer.name}</h2>
        {customer.image && (
          <img
            src={`http://127.0.0.1:8000/app/public/images/${customer.image}`}
            alt={customer.name}
            className="w-32 h-32 object-cover"
          />
        )}
        <div className="card-actions justify-end">
          <button onClick={() => onEdit(customer)} className="btn btn-sm btn-warning">
            Edit
          </button>
          <button onClick={() => onDelete(customer.id)} className="btn btn-sm btn-error">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerItem;