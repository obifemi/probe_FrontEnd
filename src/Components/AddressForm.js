import React, { useState } from 'react';
import axios from 'axios';

const AddressForm = () => {
  const [formData, setFormData] = useState({
    addressNumber: 0,
    name: '',
    address: '',
    bankDetails: '',
    postalCode: '',
    country: '',
    gender: '',
    recordType: '',
    swiftCode: '',
    newField1: '',
    newField2: 0,
    // Add other fields as per your requirements
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }


    if (formData.country === 'Germany' && formData.postalCode.length !== 5) {
      alert('Die Postleitzahl sollte 5 Ziffern für Deutschland enthalten');
      return;
    }
    try {
      await axios.post('http://localhost:3003/api/addresses', formData);
      // Success message or redirect to a new page
    } catch (error) {
      console.error(error);
      // Error handling
    }
  };
  

  const validateGermanyPostalCode = () => {
    if (formData.country === 'Germany' && formData.postalCode.length !== 5) {
      return 'Die Postleitzahl sollte 5 Ziffern für Deutschland enthalten';
    }
    return '';
  };



  return (
    <form onSubmit={handleSubmit}>
      {/* Address fields */}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Other address fields */}
      <div>
        <label htmlFor="gender">Geschlecht:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Geschlecht wählen</option>
          <option value="male">Männlich</option>
          <option value="female">Weiblich</option>
          <option value="others">Divers</option>
        </select>
      </div>
      <div>
        <label htmlFor="address">Adresse:</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      {/* Country selection */}
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select
          name="country"
          id="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">-- Select a country --</option>
          <option value="Germany">Germany</option>
          <option value="Ausland">Ausland (Abroad)</option>
        </select>
      </div>

      {formData.country === 'Ausland' && (
        <div className="form-group">
          <label htmlFor="swiftCode">SWIFT Code</label>
          <input
            type="text"
            name="swiftCode"
            id="swiftCode"
            value={formData.swiftCode}
            onChange={handleChange}
            required
          />
        </div>
      )}  
      <div>
        <label htmlFor="postalCode">Postleitzahl:</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
        />
        {validateGermanyPostalCode() && (
          <span>{validateGermanyPostalCode()}</span>
        )}
      </div>
      {/* International address - Swift code */}
      {formData.country !== 'Germany' && (
        <div>
          <label htmlFor="swiftCode">SWIFT-Code:</label>
          <input
            type="text"
            id="swiftCode"
            name="swiftCode"
            value={formData.swiftCode}
            onChange={handleChange}
          />
        </div>
      )}
      {/* Record type */}
      <div>
        <label htmlFor="recordType">Datensatzart:</label>
        <select
         id="recordType"
          name="recordType"
          value={formData.recordType}
          onChange={handleChange}
        >
          <option value="">Datensatzart wählen</option>
          <option value="Kunde">Kunde</option>
          <option value="Lieferant">Lieferant</option>
          <option value="Sonstige">Sonstige</option>
        </select>
      </div>
      {/* Bank details */}
      <div>
        <label htmlFor="bankDetails">Bankdaten:</label>
        <input
          type="text"
          id="bankDetails"
          name="bankDetails"
          value={formData.bankDetails}
          onChange={handleChange}
        />
      </div>
      {/* Email and postal code fields */}
      {/* Form submission button */}
      <button type="submit">Speichern</button>
    </form>
  );
};

export default AddressForm;

