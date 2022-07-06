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
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [password1, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [date, setDate] = useState(null);

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeContact = (event) => {
    setContact(event.target.value);
  };
  const onChangeAge = (event) => {
    setAge(event.target.value);
  };
  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangePassword2 = (event) => {
    setPassword2(event.target.value);
  };
  const resetInputs = () => {
    setName("");
    setEmail("");
    setContact("");
    setAge("");
    setBatch("");
    setPassword("");
    setPassword2("");
    setDate(null);
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
    if(age === "")
    {
        error += "Age cannot be empty!\n";
      errors["age"] = "Age cannot be empty!";
      setPassword("");
      setPassword2("");
    }
    else if(!age.match(/^[0-9]+$/))
    {
        error += "Age has to be a number\n";
      errors["age"] = "Age has to be a number";
      setPassword("");
      setPassword2("");
    }
    if(batch === "")
    {
        error += "Batch cannot be empty!\n";
      errors["batch"] = "Batch cannot be empty!";
      setPassword("");
      setPassword2("");
    }
    else if(batch !== "UG1" && batch !== "UG2" && batch !== "UG3" && batch !== "UG4" && batch !== "UG5")
    {
        error += "Batch has to be one of UG1/UG2/UG3/UG4/UG5\n";
      errors["batch"] = "Batch has to be one of UG1/UG2/UG3/UG4/UG5";
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
        email: email,
        contact: contact,
        age: age,
        batch: batch,
        password: password1,
        password2: password2
      };

      axios
        .post("http://localhost:4000/user/buyer", newUser)
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
          label="Age"
          variant="outlined"
          value={age}
          onChange={onChangeAge}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Batch"
          variant="outlined"
          value={batch}
          onChange={onChangeBatch}
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
          Log In
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register2;
