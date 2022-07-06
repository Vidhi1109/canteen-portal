import { useState } from "react";
import React, { Component } from 'react';
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
var i=0;
const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password1, setPassword] = useState("");
  const [aler, setAler] = useState("");
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  const onSubmit = (event) => {
    let errors = {}
    event.preventDefault();
    
    if (email === "") {
      //alert("Comes here");
      errors["email"] = "Email cannot be empty !";
      setPassword("");
    }
    else if(!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))
    {
      //alert("Comes here");
      errors["email"] = "Invalid email";
      setPassword("");
    }
    if(password1 === "")
    {
        errors["password"] = "Password cannot be empty !";
    }
    else {
      const newUser = {
        email: email,
        password: password1,
      };
      axios
        .post("http://localhost:4000/user/login", newUser)
        .then((response) => 
        {
          if(response.status === 200)
          {
            setAler(1);
            localStorage.setItem('DASS_USERID', JSON.stringify({email: email}));
            localStorage.setItem('DASS_USER', "Buyer");
            //alert(response.data.name);
            navigate("/profile" , response);
          }
          
          console.log(response.data);
        });

     axios
        .post("http://localhost:4000/user/login2", newUser)
        .then((response) => 
        {
            if(response.status === 200)
            {
              setAler(1);
              localStorage.setItem('DASS_USERID', JSON.stringify({email: email}));
              localStorage.setItem('DASS_USER', "Vendor");
              //alert(response.data.name);
              navigate("/profile2" , response);
            }
          console.log(response.data);
        });    
        resetInputs();
    }
    
};

  return (

    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
        type="password"
          label="Password"
          variant="outlined"
          value={password1}
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Log In
        </Button>
        <br></br>
      </Grid>
      <Grid><b>NOTE: IF YOU ARE NOT BEING LOGGED IN, YOU HAVE AN INCORRECT EMAILID OR PASSWORD</b></Grid>
    </Grid>
  );
};

export default Login;
