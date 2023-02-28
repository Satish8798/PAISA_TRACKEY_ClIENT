import {  useLayoutEffect, useState } from "react";
import { Routes,Route, useNavigate } from "react-router-dom";
import Add from "./pages/Add";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Donation from "./pages/Donation";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/paymentFailure";

function App() {

  const [user,setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigateTo = useNavigate();

  useLayoutEffect(()=>{
    let userData = localStorage.getItem('user');
    if(userData){
      setUser(JSON.parse(userData));
      navigateTo('/');
    }
  },[]);

  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path = '/' element= {<Transactions user={user} setUser={setUser} transactions={transactions} setTransactions={setTransactions} />}/>
        <Route path='/add' element={<Add user={user} transactions={transactions} setTransactions={setTransactions} setUser={setUser}/>}/>
        <Route path='/register' element={<Register user={user} setUser={setUser}/>} />
        <Route path='/profile' element={<Profile user={user} setUser={setUser}/>} />
        <Route path='/donation' element={<Donation user={user} setUser={setUser} transactions={transactions} setTransactions={setTransactions}/>}/>
        <Route path='/donation/success' element={<PaymentSuccess user={user} setUser={setUser} transactions={transactions} setTransactions={setTransactions}/>}/>
        <Route path='/donation/failure' element={<PaymentFailure user={user} setUser={setUser} transactions={transactions} setTransactions={setTransactions}/>}/>
      </Routes>
    </div>
  );
}

export default App;
