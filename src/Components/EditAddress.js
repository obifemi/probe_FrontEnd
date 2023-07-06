import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/addresses');
        setAddresses(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchAddresses();
  }, []);

  const handleEdit = (addressId) => {
    const addressToEdit = addresses.find((address) => address._id === addressId);
    setEditingData(addressToEdit);
  };

  const handleChange = (e) => {
    setEditingData({
      ...editingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation and update logic
    try {
      await axios.put(`http://localhost:3003/api/addresses/${editingData._id}`, editingData);
      // Handle success or redirect if needed
    } catch (error) {
      // Handle error
    }

    setEditingData(null);
  };

  return (
    <div>
      <h1>Edit Addresses</h1>
      {addresses.map((address) => (
        <div key={address._id}>
          <h3>{address.name}</h3>
          {/* Display other address fields */}
          {editingData && editingData._id === address._id ? (
            <form onSubmit={handleSubmit}>
              {/* Render form fields for editing */}
              <input
                type="text"
                name="name"
                value={editingData.name}
                onChange={handleChange}
              />
              {/* Render other form fields */}
              <button type="submit">Save</button>
            </form>
          ) : (
            <button onClick={() => handleEdit(address._id)}>Edit</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default EditAddress;
