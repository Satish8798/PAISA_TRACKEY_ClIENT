import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

function Transaction({ transaction, handleDelete }) {

  let date = new Date(transaction.date).toDateString();

  return (
    <div className="transaction text-dark d-flex flex-row justify-content-between w-100 mb-2 p-2 bg-light align-items-center">
      <div className="left text-start w-50">
        <h4>{transaction.name}</h4>
        <p>{transaction.description}</p>
      </div>
      <div
        className="right w-50 d-flex flex-row justify-content-around align-items-center"
        style={{ color: transaction.isCredit ? "darkgreen" : "red" }}
      >
        <div>
          <p>
            <span>{transaction.isCredit ? <AddIcon /> : <RemoveIcon />}</span>
            <span>
              <CurrencyRupeeIcon sx={{fontSize:"20px"}}/>
            </span>
            {transaction.amount}
          </p>
          <p>{date}</p>
        </div>
       <div className="p-1">
       <DeleteIcon className="text-dark" style={{cursor:"pointer"}} onClick={()=>handleDelete(transaction._id)}/>
       </div>
      </div>
    </div>
  );
}

export default Transaction;
