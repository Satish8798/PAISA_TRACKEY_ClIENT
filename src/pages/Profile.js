import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function Profile({ user, setUser }) {
  const navigateTo = useNavigate();

  return (
    <div className="profile container mt-5">
      <ArrowBackIcon
        sx={{ fontSize: "50px", cursor: "pointer" }}
        onClick={() => navigateTo(-1)}
      />
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
      <h3>Total Balance: <CurrencyRupeeIcon/>{user.balance.toFixed(2)}</h3>
      <button className="btn btn-danger mt-3" onClick={()=>{
        localStorage.removeItem('user');
        setUser(null);
        navigateTo('/register')
      }}>
        LOG OUT
      </button>
    </div>
  );
}

export default Profile;
