import { useEffect, useState } from "react";
import { Routes,Route, useNavigate } from "react-router-dom";
import Add from "./pages/Add";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [user,setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigateTo = useNavigate();

  useEffect(()=>{
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
      </Routes>
    </div>
  );
}

export default App;
