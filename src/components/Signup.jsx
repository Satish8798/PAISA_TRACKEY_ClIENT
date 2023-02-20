import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Signup({setValue}) {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {data} = await axios.post('https://paisa-trackey.onrender.com/user/signup',{
        name,email,password
      });

      if(data){
        setValue('login')
      }
      
    } catch (error) {
      setLoading(false);
      toast(error.response.data);
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit} 
      className="d-flex flex-column justify-content-center align-items-center mt-4"
    >
      <div className="form-floating mb-3 text-dark">
        <input required onChange={(e)=>{
            setName(e.target.value)
        }} value={name} type="text" className="form-control" placeholder="name..." />
        <label>Name</label>
      </div>
      <div className="form-floating mb-3 text-dark">
        <input onChange={(e)=>{
            setEmail(e.target.value)
        }} value={email}
          type="email"
          className="form-control text-dark"
          placeholder="name@example.com" required
        /> 
        <label>Email address</label>
      </div>

      <div className="form-floating text-dark">
        <input onChange={(e)=>{
            setPassword(e.target.value)
        }} value={password}
          type="password"
          className="form-control"
          placeholder="Password" required
        />
        <label>Password</label>
      </div>
      <button type="submit" className="btn btn-success mt-2">
        {loading? "Loading...": "SIGN UP" }
      </button>
    </form>
  );
}

export default Signup;
