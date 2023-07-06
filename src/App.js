import React from 'react';
import AddressForm from './Components/AddressForm';
import EditAddress from './Components/EditAddress';

const App = () => {
  return (
    <div>
      <h1>Address Form</h1>
      <AddressForm />
      <hr />
      <h1>Edit Address</h1>
      <EditAddress addressId="" />
    </div>
  );
};

export default App;
