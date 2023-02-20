import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useNavigate } from "react-router-dom";

function Register({user,setUser}) {
  const [value, setValue] = React.useState('login');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigateTo = useNavigate();
  useEffect(()=>{
    if(user){
      navigateTo('/');
    }
  });

  return (
    <div className="container text-center" style={{ height: "100vh" }}>
      <div className="row d-flex justify-content-center flex-column align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6">
          <h1>PAISA TRACKEY</h1>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="login" label="LOGIN" sx={{ width: "50%" }} />
            <Tab value="signup" label="SIGNUP" sx={{ width: "50%" }} />
          </Tabs>
          {value === "login" && <Login user={user} setUser={setUser} />}
          {value === "signup" && <Signup setValue={setValue} />}
        </div>
      </div>
    </div>
  );
}

export default Register;
