import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Transaction from "../components/Transaction";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function Transactions({ user, transactions, setTransactions, setUser }) {
  const NavigateTo = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://paisa-trackey.onrender.com/transaction/get/all/" + user._id,{
          headers:{
            "access-token": user.token
          }
        }
      );
      setTransactions([...data].reverse());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        "https://paisa-trackey.onrender.com/transaction/delete/" + id,{
          headers:{
            "access-token": user.token
          }
        }
      );
      setUser({...user,balance: data.balance});
      setToggle(!toggle);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      NavigateTo("/register");
    }
    getTransactions();
  }, [toggle]);

  return (
    <div className="container text-center" style={{ height: "100vh" }}>
      <div className="row d-flex justify-content-center h-100">
        <div className="col-12 col-md-12 col-lg-10 ">
          <Navbar />
          <div
            className="d-flex flex-row justify-content-between position-sticky p-1"
            style={{ backgroundColor: "#2B3467", top: "90px" }}
          >
            <h3>Transactions</h3>
            {user && (
              <p>
                Bal: <CurrencyRupeeIcon style={{fontSize:"15px"}}/>
                {user.balance.toFixed(2)}
              </p>
            )}
            <button
              onClick={() => NavigateTo("/add")}
              className="btn btn-light"
            >
              Add
            </button>
          </div>
          {loading ? (
            <div className="d-flex h-75 mt-2 flex-column justify-content-center align-items-center">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="d-flex mt-2 flex-column justify-content-center align-items-center">
              {!transactions.length ? (
                <h4>No Transactions Yet</h4>
              ) : (
                transactions.map((transaction, i) => (
                  <Transaction
                    handleDelete={handleDelete}
                    transaction={transaction}
                    key={transaction._id}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
