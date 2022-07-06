import { useState } from "react";
import React, { Component } from 'react';
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const Register2 = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [email, setEmail] = useState("");
  //const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [opening, setOpening] = useState("");
  const [closing, setClosing] = useState("");
  const [password1, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };
 const onChangeShop = (event) => {
   setShop(event.target.value);
 }
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeContact = (event) => {
    setContact(event.target.value);
  };
  const onChangeOpening = (event) => {
    setOpening(event.target.value);
  };
  const onChangeClosing = (event) => {
    setClosing(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangePassword2 = (event) => {
    setPassword2(event.target.value);
  };
  const resetInputs = () => {
    setName("");
    setShop("");
    setEmail("");
    setContact("");
    setOpening("");
    setClosing("");
    setPassword("");
    setPassword2("");
  };

  const onSubmit = (event) => {
    let errors = {};
    let error = "";

    event.preventDefault();
    
    if (name === "") {
      //alert("Comes here");
      error += "Name cannot be empty !\n";
      errors["name"] = "Name cannot be empty !";
      setPassword("");
      setPassword2("");
    }
    else if(!name.match(/^[a-zA-Z]+$/))
    {
      //alert("yahannnnn");
      error += "Name permits only letters\n";
      errors["name"] = "Name permits only letters";
      setPassword("");
      setPassword2("");
    }
    if (shop === "") {
      //alert("Comes here");
      error += "Shop name cannot be empty !\n";
      errors["name"] = "Name cannot be empty !";
      setPassword("");
      setPassword2("");
    }
    if (email === "") {
      //alert("Comes here");
      error += "Email cannot be empty!\n";
      errors["email"] = "Email cannot be empty !";
      setPassword("");
      setPassword2("");
    }
    else if(!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))
    {
      //alert("Comes here");
      error += "Invalid email\n";
      errors["email"] = "Invalid email";
      setPassword("");
      setPassword2("");
    }
    if(contact === "")
    {
        error += "Contact cannot be empty!\n";
      errors["contact"] = "Contact cannot be empty!";
      setPassword("");
      setPassword2("");
    }
    else if(!contact.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/))
    {
      //alert("tapkaaa");
      error += "Invalid Contact\n";
      errors["contact"] = "Invalid Contact";
      setPassword("");
      setPassword2("");
    }
    if(password1 === "" || password2 === "")
    {
        error += "Password fields cannot stay empty\n";
      errors["password"] = "Password fields cannot stay empty";
      setPassword("");
      setPassword2("");
    }
    else if (!password1.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/) || !password2.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/))
    {
        error += "Please make sure that password has at least one digit , uppercase letter and a lowercase letter. Also the length of passsword must be betwwen 8 to 32 characters\n";
      errors["password"] = "Please make sure that password has at least one digit , uppercase letter and a lowercase letter. Also the length of passsword must be betwwen 8 to 32 characters";
      setPassword("");
      setPassword2("");
    }
    else if(password1 !== password2)
    {
        error += "Passowrds do not match\n";
      errors["password"] = "Passwords do not match";
      setPassword("");
      setPassword2("");
    }
    if(error !== "")
    {
        alert(error);
    }
    else {
      const newUser = {
        name: name,
        shop: shop,
        email: email,
        contact: contact,
        opening: opening,
        closing: closing,
        password: password1
      };

      axios
        .post("http://localhost:4000/user/vendor", newUser)
        .then((response) => {
          alert("Created\t" + response.data.message);
          console.log(response.data);
        });
        resetInputs();
    }
    
};

  return (

    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={onChangeUsername}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Shop Name"
          variant="outlined"
          value={shop}
          onChange={onChangeShop}
        />
      </Grid>
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
          label="Contact"
          variant="outlined"
          value={contact}
          onChange={onChangeContact}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Opening Time"
          variant="outlined"
          value={opening}
          onChange={onChangeOpening}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Closing Time"
          variant="outlined"
          value={closing}
          onChange={onChangeClosing}
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
        <TextField
        type="password"
          label="Confirm your Password"
          variant="outlined"
          value={password2}
          onChange={onChangePassword2}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={() => navigate("/login")}>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register2;
