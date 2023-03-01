import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

function Add({user,setUser,transactions,setTransactions}) {


  const handleSubmit = async (e) => {
    e.preventDefault();
    setAmount(amount=>parseFloat(amount));
    try {
      setLoading(true);
      if(!isCredit && (!user.balance || amount > user.balance)){
        toast("insufficient balance");
        setLoading(false);
      }else if(isCredit && amount===0 ){
        console.log(amount)
        toast("Enter an amount");
        setLoading(false);
      }else{
        const {data} = await axios.post("https://paisa-trackey.onrender.com/transaction/add",{
          amount,
          name,
          description,
          isCredit,
          user: user._id
        },{
          headers:{
            "access-token": user.token
          }
        });

        if(data){
          setLoading(false);
          setUser({...user,balance: data.user.balance });
          setAmount(0);
          setName('');
          setDescription('');
          NavigateTo('/')
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const NavigateTo = useNavigate();
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [amount,setAmount] = useState(0);
  const [isCredit,setIsCredit] = useState(null);
  const [loading,setLoading] = useState(false);

  return (
    <div className="container text-center" style={{ height: "100vh" }}>
      <div className="row d-flex justify-content-center h-100">
        <div className="col-12 col-md-12 col-lg-10 ">
        <Navbar/>

          <div className="d-flex flex-row justify-content-between">
            <h3>Enter Transaction</h3>
            <button
              onClick={() => NavigateTo("/")}
              className="btn btn-light"
            >
              My Transactions
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column justify-content-center align-items-center mt-4"
          >
            <div className="form-floating mb-3 text-dark">
              <input onChange={(e)=>{
                setAmount(e.target.value)
              }}
              value={amount}
                type="number"
                className="form-control"
                placeholder="Amount" required
              />
              <label>Amount</label>
            </div>
            <div className="form-floating mb-3 text-dark">
              <input value={name} onChange={(e)=>setName(e.target.value)} required type="text" className="form-control" placeholder="Name" />
              <label>Name</label>
            </div>
            <div className="form-floating mb-3 text-dark">
              <input value={description} onChange={(e)=>setDescription(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Description" required
              />
              <label>Description</label>
            </div>
            <div className="form-check">
                <input required onChange={(e)=>{
                  if(e.target.checked) {
                    setIsCredit(true);
                  }
                }} className="form-check-input" type="radio" name="transactionType" value="credit"/>
                <label className="form-check-label" >
                  Credit
                </label>
              </div>
            <div className="form-check">
                <input required onChange={(e)=>{
                  if(e.target.checked){
                    setIsCredit(false);
                  }
                }} className="form-check-input" type="radio" name="transactionType"  value="debit"/>
                <label className="form-check-label">
                  Debit
                </label>
              </div>
            <button type="submit" className="btn btn-success">
             {loading? "Loading...": "Add Transaction"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
