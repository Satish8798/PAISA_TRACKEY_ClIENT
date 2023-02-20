import axios from "axios";
import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Transaction from "../components/Transaction";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function Transactions({user,transactions,setTransactions,setUser}) {

    const NavigateTo = useNavigate();
    const [toggle,setToggle] = useState(false);

    const getTransactions = async () =>{
        try {
            const {data} = await axios.get('https://paisa-trackey.onrender.com/transaction/get/all/'+user._id);
            setTransactions([...data].reverse());
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try{
            const {data} = await axios.delete('https://paisa-trackey.onrender.com/transaction/delete/'+id);
            setUser(data);
            setToggle(!toggle);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        if(!user){
            NavigateTo('/register');
        }
        getTransactions();
    },[toggle]);


  return (
    <div className="container text-center" style={{ height: "100vh" }}>
      <div className="row d-flex justify-content-center h-100">
        <div className="col-12 col-md-8 col-lg-6 ">
        <Navbar/>
        <div className="d-flex flex-row justify-content-between">
            <h3>Transactions</h3>
           { user && <p>Total: <CurrencyRupeeIcon/>{user.balance.toFixed(2)}</p>}
            <button onClick={()=>NavigateTo("/add")} className="btn btn-light">
                Add
            </button>
        </div>
        <div className="d-flex mt-2 flex-column justify-content-center align-items-center">
            {
                !transactions.length? <h4>No Transactions Yet</h4>: 
                transactions.map((transaction,i)=>(<Transaction handleDelete={handleDelete} transaction={transaction} key={transaction._id}/>))

            }
        </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
