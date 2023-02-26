import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Login({user,setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("https://paisa-trackey.onrender.com/user/login", {
        email,
        password,
      });

      if (data) {
        localStorage.setItem('user',JSON.stringify(data));
        setUser(data);
        setLoading(false)
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
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="email"
          className="form-control"
          placeholder="name@example.com"
          required
        />
        <label>Email address</label>
      </div>
      <div className="form-floating text-dark">
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          className="form-control"
          placeholder="Password" required
        />
        <label>Password</label>
      </div>
      <button type="submit" className="btn btn-success mt-2">
        {loading ? "Loading...": "LOG IN"}
      </button>
      <button type="button" className="btn btn-secondary mt-2" onClick = {()=>{
        setEmail("guest@gmail.com");
        setPassword("Guest@123#123");
      }}>
        Guest Login
      </button>
    </form>
  );
}

export default Login;
