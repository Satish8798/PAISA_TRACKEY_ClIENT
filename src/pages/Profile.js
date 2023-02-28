import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import axios from "axios";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

function Profile({ user, setUser }) {
  const navigateTo = useNavigate();

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = async () => {

    if(user.name === name && user.email === email){
      setEdit(false);
      return;
    }

        try {
          const {data} = await axios.put("https://paisa-trackey.onrender.com/user/update",{
            name,email,id: user._id
          });
          setUser(data);
          setName(data.name);
          setEmail(data.email);
          setEdit(false);
        } catch (error) {
          setEdit(false);
          toast(error.response.data)
        }
  }

  return (
    <div className="profile container mt-5">
      <div className="header d-flex flex-row justify-content-between align-items-center">
      <h1 style={{color:"#2B3467"}}>PAISA TRACKEY</h1>
      <button onClick={()=>{
        navigateTo('/donation');
      }} className="btn btn-success">Donate us <VolunteerActivismIcon/></button>
      </div>
      <ArrowBackIcon
        sx={{ fontSize: "50px", cursor: "pointer" }}
        onClick={() => navigateTo(-1)}
      />
      {!edit ? (
        <div className="profile-edit d-flex flex-row justify-content-between">
          <div className="profile mt-5">
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <h3>
              Total Balance: <CurrencyRupeeIcon />
              {user.balance.toFixed(2)}
            </h3>
          </div>
          <EditIcon
            sx={{ cursor: "pointer" }}
            onClick={() => setEdit(true)}
          />
        </div>
      ) : (
        <div className="mt-5 profile-edit d-flex flex-row justify-content-between">
          <div className="updateform">
            <div className="form-floating mb-3 text-dark">
              <input
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                className="form-control"
                placeholder="name..."
              />
              <label>Name</label>
            </div>
            <div className="form-floating mb-3 text-dark">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                className="form-control text-dark"
                placeholder="name@example.com"
                required
              />
              <label>Email address</label>
            </div>
            
          </div>
          <div className="options">
              <DoneIcon sx={{fontSize:"50px",cursor:"pointer"}} onClick={handleSubmit}/>
              <CloseIcon sx={{fontSize:"50px",cursor:"pointer"}} onClick={()=>setEdit(false)}/>
            </div>
        </div>
      )}
      <button
        className="btn btn-danger mt-3"
        onClick={() => {
          localStorage.removeItem("user");
          setUser(null);
          navigateTo("/register");
        }}
      >
        LOG OUT
      </button>
    </div>
  );
}

export default Profile;
