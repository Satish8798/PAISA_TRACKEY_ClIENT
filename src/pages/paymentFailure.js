import React from 'react'
import { useNavigate } from 'react-router-dom';

function PaymentFailure() {
    const navigateTo = useNavigate();
  return (
    <div className="text-center" style={{marginTop:"40vh"}} >
        <h1>Donation Cancelled</h1>
        <h3>Want to Donate some other time? No problem !!</h3>
        <button className='btn btn-warning' onClick={()=>{
            navigateTo('/');
        }}>Home Page</button>
    </div>
  )
}

export default PaymentFailure