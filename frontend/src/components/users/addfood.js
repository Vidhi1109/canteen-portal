import { useState } from "react";
import React, { Component } from 'react';
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
let profile="";
let emailid="";
let user="";
const Register2 = (props) => {
  const navigate = useNavigate();
  profile = localStorage.getItem('DASS_USERID');
  let userobj = JSON.parse(profile);
  emailid = userobj.email;
  user = localStorage.getItem('DASS_USER');
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [canteen, setCanteen] = useState("");
  const [addon1, setAddon1] = useState("");
  const [addon2, setAddon2] = useState("");
  const [addon3, setAddon3] = useState("");
  const [addon4, setAddon4] = useState("");  
  const [addon1price, setAddon1price] = useState("");
  const [addon2price, setAddon2price] = useState("");
  const [addon3price, setAddon3price] = useState("");
  const [addon4price, setAddon4price] = useState("");
  const [tags1, setTags1] = useState("");
  const [tags2, setTags2] = useState("");
  const [tags3, setTags3] = useState("");
  const [tags4, setTags4] = useState("");

  const onChangeName = (event) => {
    setName(event.target.value);
  };
 const onChangePrice = (event) => {
   setPrice(event.target.value);
 }
  const onChangeType = (event) => {
    setType(event.target.value);
  };
  const onChangeCanteen = (event) => {
    setCanteen(event.target.value);
  };
  const onChangeAddon1 = (event) => {
    setAddon1(event.target.value)
  };
  const onChangeAddon2 = (event) => {
    setAddon2(event.target.value)
  };
  const onChangeAddon3 = (event) => {
    setAddon3(event.target.value)
  };
  const onChangeAddon4 = (event) => {
    setAddon4(event.target.value)
  };   
  const onChangeAddon1price = (event) => {
    setAddon1price(event.target.value)
  };   
  const onChangeAddon2price = (event) => {
    setAddon2price(event.target.value)
  }; 
  const onChangeAddon3price = (event) => {
    setAddon3price(event.target.value)
  };    
  const onChangeAddon4price = (event) => {
    setAddon4price(event.target.value)
  };  
  const onChangetags1 = (event) => {
    setTags1(event.target.value)
  };  
  const onChangetags2 = (event) => {
    setTags2(event.target.value)
  }; 
  const onChangetags3 = (event) => {
    setTags3(event.target.value)
  }; 
  const onChangetags4 = (event) => {
    setTags4(event.target.value)
  };           


  const onSubmit = (event) => {
    let errors = {};
    let error = "";

    event.preventDefault();
    
    if (name === "") {
      //alert("Comes here");
      error += "Name cannot be empty !\n";
      errors["name"] = "Name cannot be empty !";
    }
    else if(!name.match(/^[a-zA-Z]+$/))
    {
      //alert("yahannnnn");
      error += "Name permits only letters\n";
      errors["name"] = "Name permits only letters";
    }
    if (price === "") {
      //alert("Comes here");
      error += "Price cannot be empty !\n";
      errors["name"] = "Name cannot be empty !";
    }
    if (type !== "Veg" && type !== "Non-Veg") {
      //alert("Comes here");
      error += "Food type can be Veg or Non-Veg\n";
      errors["email"] = "Email cannot be empty !";
    }
    if(canteen === "")
    {
      error += "Canteen name cannot be empty!\n";
      errors["contact"] = "Contact cannot be empty!";
    }
    else if(((!(addon1price.match(/^[0-9]+$/) && addon1price !== "")  || (!addon2price.match(/^[0-9]+$/) && addon2price !== "") || (!addon3price.match(/^[0-9]+$/) && addon3price !== "")|| (!addon4price.match(/^[0-9]+$/) && addon4price !== ""))))
    {
      //alert("tapkaaa");
      error += "Prices have to be positive number\n";
    }
    if(error !== "")
    {
        alert(error);
    }
    else {
      const newUser = {
        name: name,
        price: price,
        type: type,
        canteen: canteen,
        addon1: addon1,
        addon2: addon2,
        addon3: addon3,
        addon4: addon4,
        addon1price: addon1price,
        addon2price: addon2price,
        addon3price: addon3price,
        addon4price: addon4price,     
        tags1: tags1,  
        tags2: tags2,  
        tags3: tags3,   
        tags4: tags4, 
        vendor: emailid
      };

      axios
        .post("http://localhost:4000/user/addfood", newUser)
        .then((response) => {
          alert("Created\t" + response.data.message);
          console.log(response.data);
        });
        
    }
    
};

  return (
    <div>
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Food Item Name"
          variant="outlined"
          value={name}
          onChange={onChangeName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Price"
          variant="outlined"
          value={price}
          onChange={onChangePrice}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Type"
          variant="outlined"
          value={type}
          onChange={onChangeType}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Canteen"
          variant="outlined"
          value={canteen}
          onChange={onChangeCanteen}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Addon1 "
          variant="outlined"
          value={addon1}
          onChange={onChangeAddon1}
        />&nbsp;&nbsp;&nbsp;
                <TextField
          label="Addon1 price"
          variant="outlined"
          value={addon1price}
          onChange={onChangeAddon1price}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Addon2 "
          variant="outlined"
          value={addon2}
          onChange={onChangeAddon2}
        />&nbsp;&nbsp;&nbsp;
                <TextField
          label="Addon2 price"
          variant="outlined"
          value={addon2price}
          onChange={onChangeAddon2price}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Addon1 "
          variant="outlined"
          value={addon3}
          onChange={onChangeAddon3}
        />&nbsp;&nbsp;&nbsp;
                <TextField
          label="Addon1 price"
          variant="outlined"
          value={addon3price}
          onChange={onChangeAddon3price}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Addon4 "
          variant="outlined"
          value={addon4}
          onChange={onChangeAddon4}
        />&nbsp;&nbsp;&nbsp;
                <TextField
          label="Addon1 price"
          variant="outlined"
          value={addon4price}
          onChange={onChangeAddon4price}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Tag 1"
          variant="outlined"
          value={tags1}
          onChange={onChangetags1}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Tag 2"
          variant="outlined"
          value={tags2}
          onChange={onChangetags2}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Tag 3"
          variant="outlined"
          value={tags3}
          onChange={onChangetags3}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Tag 4"
          variant="outlined"
          value={tags4}
          onChange={onChangetags4}
        />
      </Grid>
    </Grid>
    <br></br>
    <div align="center">
          <Button align="center" variant="contained" onClick={onSubmit}>
          Add
    </Button>
    </div>
    </div>
  );
};

export default Register2;
