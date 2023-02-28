import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function Donation() {
    const navigateTo = useNavigate();
    const [donation,setDonation] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        fetch('http://localhost:8001/donation/create-checkout-session',{
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({amount: donation})
        }).then(res=>{
          if(res.ok) return res.json()/* .then(json => Promise.reject(json)) */
        }).then(({url})=>{
           window.location = url
        }).catch(err=>{
          console.error(err);
        })

    }

  return (
    <div className="container text-center" style={{ height: "100vh" }}>
      <div className="row d-flex justify-content-center h-100">
        <div className="col-12 col-md-12 col-lg-10 text-start">
        <Navbar/>
        <ArrowBackIcon className="mb-5"
        sx={{ fontSize: "50px", cursor: "pointer" }}
        onClick={() => navigateTo(-1)}
      />
      <form onSubmit={handleSubmit}>
      <div className="form-floating mb-3 text-dark w-75">
        <input
          onChange={(e) => {
            setDonation(e.target.value);
          }}
          value={donation}
          type="number"
          className="form-control"
          placeholder="100"
          required
        />
        <label>Donation Amount</label>
      </div>
      <button type='submit' className="btn btn-success">Donate</button>
      </form>
        </div>
      </div>
    </div>
  );
}

export default Donation;
