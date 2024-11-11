// src/components/Payment.js
import React from 'react';

function Payment() {
  const handlePayment = (method) => {
    // Implement payment logic here
    console.log('Selected payment method:', method);
  };

  return (
    <div className="payment-container">
      <h2>Payment Options</h2>
      <button onClick={() => handlePayment('UPI')} className="btn">Pay with UPI</button>
      <button onClick={() => handlePayment('Credit Card')} className="btn">Pay with Credit Card</button>
      <button onClick={() => handlePayment('Net Banking')} className="btn">Pay with Net Banking</button>
    </div>
  );
}

export default Payment;
