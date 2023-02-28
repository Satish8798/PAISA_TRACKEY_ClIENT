import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PaymentSuccess() {

    const navigateTo = useNavigate();

  return (
    <div className="text-center" style={{marginTop:"40vh"}} >
        <h1>Payment Succesful!!!</h1>
        <h3>Thank you for donating us, we will improve our features</h3>
        <button className='btn btn-warning' onClick={()=>{
            navigateTo('/');
        }}>Home Page</button>
    </div>
  )
}

export default PaymentSuccess