import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
let profile="";
let emailid="";
let user="";
const Profile = (props) => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [details2, setDetails2] = useState([]);
  const [amount, setAmount] = useState("");
  const onChangeAmount = (event) => {
    setAmount(event.target.value);
  }
  const onSubmit = (event) => {
    event.preventDefault();
    if(amount === "")
    {
      alert("Please enter the amount to be added");
    }
    else if(!amount.match(/^\+?(0|[1-9]\d*)$/))
    {
      alert("Amount can only be a positive integer");
    }
    else
    {
      
      var n1 = parseInt(amount , 10);
      var n2 = parseInt(details.wallet , 10);
      var sum = n1+n2;
      sum.toString();
      //alert(amount);
      //alert(typeof(n2));
      const newUser = {
        email: details.email,
        wallet: sum
      };
      axios
      .post("http://localhost:4000/user/wallet", newUser)
      .then((response) =>
      {
        //alert("Amount has been succesfully added");
        window.location.reload(false);
        console.log(response.data);
      });
      
    }
    setAmount("");
  }
  useEffect(() => {
    
    profile = localStorage.getItem('DASS_USERID');
    let userobj = JSON.parse(profile);
    emailid = userobj.email;
    //alert(emailid)
    /*
    emailid = localStorage.getItem('DASS_USERID');*/
    //alert(emailid);
    user = localStorage.getItem('DASS_USER');
    if(user === "Buyer")
    {
      //alert("here");
      const newUser = {
        email: emailid
      };
      axios
        .post("http://localhost:4000/user/profile", newUser)
        .then((response) => 
        {
          if(response.status === 200)
          {
            setDetails(response.data);
            //alert("Succesfully logged in " + response.data.name);
            //alert(response.data.name);
          }
          console.log(response.data);
          //alert("Hi " + details.name);
        });
        
    }
    if(user === "Vendor")
    {
      //alert("here2");
      const newUser = {
        email: emailid
      };
      axios
        .post("http://localhost:4000/user/profile2", newUser)
        .then((response) => 
        {
          if(response.status === 200)
          {
            setDetails(response.data);
            alert("Succesfully logged in " + response.data.name);
          }
          console.log(response.data);
          //alert("Hi " + details.name);
        });
        
        //alert("Bye");
    }
  }, []);
  return(
    <div>
            <h1>PROFILE DETAILS</h1>
            <div align="right">
            <h4 align="right">Wallet Amount : {details.wallet}</h4>
            <TextField
          label="Amount to be added"
          variant="outlined"
          value={amount}
          onChange={onChangeAmount}
          />
          <br></br>
          <br></br>
            <Button align= "right" variant="contained" onClick={onSubmit} >
              Add Amount
        </Button> 
        <br></br>  

        </div>   
        <Button variant="contained" onClick={() => navigate("/dashboard")} >
              Dashboard
        </Button> 
        &nbsp;&nbsp; &nbsp;    
        <Button  variant="contained" onClick={() => navigate("/myorder")} >
              My Orders
        </Button>      
            <br></br>
            <table className="table table-responsive-lg table-hover">
                <tbody>
                    <tr>
                        <th> Name </th>
                        <td>{details.name}</td>
                    </tr>
                    <tr>
                        <th> Email Address</th>
                        <td>{details.email}</td>
                    </tr>
                    <tr>
                      <th>Contact Number</th>
                      <td>{details.contact}</td>
                      </tr>
                    <tr>
                      <th>Age</th>
                      <td>{details.age}</td>
                    </tr>
                    <tr>
                      <th>Batch Name</th>
                      <td>{details.batch}</td>
                    </tr>
                </tbody>
            </table>
        </div>);
};

export default Profile;
