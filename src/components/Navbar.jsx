import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigateTo= useNavigate();

  return (
    <div className="d-flex flex-row justify-content-between align-items-center p-3 mb-3 position-sticky top-0" style={{backgroundColor:"#2B3467"}}>
          <h1>PAISA TRACKEY</h1>
          <AccountBoxIcon sx={{fontSize:"50px", cursor:"pointer"}} onClick={()=>{
            navigateTo('/profile')
          }}/>
        </div>
  )
}

export default Navbar