
import { useState, useEffect } from "react";
import React, { Component } from 'react';
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
let profile="";
let emailid="";
const Register2 = (props) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState("");
  const [details, setDetails] = useState([]);
  const [addon1, setAddon1] = useState("");
  const [addon2, setAddon2] = useState("");
  const [addon3, setAddon3] = useState("");  
  profile = localStorage.getItem('PURCHASE_ITEM');
  let userobj = JSON.parse(profile);
  profile = localStorage.getItem('DASS_USERID');
  let userobj2 = JSON.parse(profile);
  emailid = userobj2.email;

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
 const onChangeAddon1 = (event) => {
   setAddon1(event.target.value);
 }
  const onChangeAddon2 = (event) => {
    setAddon2(event.target.value);
  };
  const onChangeAddon3 = (event) => {
    setAddon3(event.target.value);
  };
  const [amount, setAmount] = useState("");
  const onChangeAmount = (event) => {
    setAmount(event.target.value);
  }

  const onSubmit2 = (event) => {
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
        alert("Amount has been succesfully added");
        window.location.reload(false);
        console.log(response.data);
      });
      
    }
    setAmount("");
  }
  const onSubmit = (event) => {

    let errors = {};
    let error = "";

    event.preventDefault();
    
    if(quantity === "")
    {
        error += "Quantity cannot be empty !\n";
    }
    if(!quantity.match(/^[0-9]+$/))
    {
        error += "Quantity has to be a number\n";
    }
    if(userobj.addon1 === "" && addon1 !== "")
    {
        error += "Addon 1 not available\n";
    }
    if(userobj.addon2 === "" && addon2 !== "")
    {
        error += "Addon 2 not available\n";
    }
    if(userobj.addon3 === "" && addon3 !== "")
    {
        error += "Addon 3 not available\n";
    }
    if( error !== "")
    {
        alert(error);
    }
    else
    {
        var n2 = parseInt(details.wallet , 10);
        var n1 = 0;
        if(addon1 != "" )
        {
            n1 += parseInt(userobj.addon1price);
        }
        if(addon2 != "" )
        {
            n1 += parseInt(userobj.addon2price);
        }
        if(addon3 != "" )
        {
            n1 += parseInt(userobj.addon3price);
        }
        n1 += parseInt(userobj.price) * parseInt(quantity , 10);
        alert(details.wallet);
        alert(n1);
        if(n1 > parseInt(details.wallet))
        {
            alert("Wallet amount is less");
        }
        else
        {
            const newUser = {
                vendor: userobj.vendor,
                food: userobj.name,
                buyer: emailid,
                quantity: quantity,
                cost: "0",
                status: "PLACED",
                rating: userobj.rating,
                addon1: userobj.addon1,
                addon2: userobj.addon2,
                addon3: userobj.addon3,
                addon4: userobj.addon4,
                addon1price: userobj.addon1price,
                addon2price: userobj.addon2price,
                addon3price: userobj.addon3price,
                addon4price: userobj.addon4price,
              };
        
              axios
                .post("http://localhost:4000/user/order", newUser)
                .then((response) => {
                  alert("Order Placed");
                  console.log(response.data);
                });

            var sum=0;
            sum = n2-n1;
            sum.toString();    

                const nUser = {
                    email: details.email,
                    wallet: sum
                  };
                  axios
                  .post("http://localhost:4000/user/wallet", nUser)
                  .then((response) =>
                  {
                    alert("Amount has been succesfully added");
                    window.location.reload(false);
                    console.log(response.data);
                  });    
            

        }
    }   
};
  useEffect(() => {
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
}, []);
  return (
      <div>
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
    <Button align= "right" variant="contained" onClick={onSubmit2} >
      Add Amount
</Button> 
<br></br>  

</div>   

    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Quanity"
          variant="outlined"
          value={quantity}
          onChange={onChangeQuantity}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Addon 1"
          variant="outlined"
          value={addon1}
          onChange={onChangeAddon1}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Addon 2"
          variant="outlined"
          value={addon2}
          onChange={onChangeAddon2}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Addon 3"
          variant="outlined"
          value={addon3}
          onChange={onChangeAddon3}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          PLACE
        </Button>
      </Grid>
    </Grid>
    </div>
  );
  }
export default Register2;
