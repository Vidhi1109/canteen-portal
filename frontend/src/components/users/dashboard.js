import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
let vegtype="";
let nonvegtype="";
let can_jc="";
let can_vc="";
let can_bbc="";
const UsersList = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [vegType , setVegType] = useState("");

  const markVeg = (event) => {
    event.preventDefault();
    if(vegtype === "Veg")
    {
        vegtype = "";
    }
    else
    {
        vegtype = "Veg";
    }
  };
  const markNonVeg = (event) => {
    if(nonvegtype === "")
    {   
        nonvegtype = "Non-Veg";
    }
    else
    {
        nonvegtype = "";
    }
  };
  const markjc = (event) => {
    if(can_jc === "")
    {   
        can_jc="JC";
    }
    else
    {
        can_jc="";
    }
  };
  const markvc = (event) => {
    if(can_vc === "")
    {   
        can_vc="VC";
    }
    else
    {
        can_vc="";
    }
  };
  const markbbc = (event) => {
    if(can_bbc === "")
    {   
        can_vc="BBC";
    }
    else
    {
        can_bbc="";
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/user")
      .then((response) => {
        setUsers(response.data);
        //alert(typeof(users));
        setSortedUsers(response.data);
        setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortChange = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (a.date != undefined && b.date != undefined) {
        return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
      } else {
        return 1;
      }
    });
    setUsers(usersTemp);
    setSortName(!sortName);
  };

  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

//alert(users);
    const filtered = users.filter((filterp) => 
    {
        if(
            filterp.name.toLowerCase().includes(searchText.toLowerCase())
        )
        {
            //alert(typeof(filterp.type) )
                return filterp;

        }
    });


  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={customFunction}
            />
          </List>
        </Grid>
        
      </Grid>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Salary
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Min"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Max"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={6}>
                    <input type="checkbox" onChange={markVeg}></input>
                    &nbsp;&nbsp;Veg
                </Grid>
                <Grid item xs={6}>
                    <input type="checkbox" onChange={markNonVeg}></input>
                    &nbsp;&nbsp;Non-Veg
                </Grid>   
                <Grid item xs={6} onChange={markjc}>
                    <input type="checkbox"></input>
                    &nbsp;&nbsp;JC
                </Grid>     
                <Grid item xs={6} onChange={markvc}>
                    <input type="checkbox"></input>
                    &nbsp;&nbsp;VC
                </Grid>
                <Grid item xs={6} onChange={markbbc}>
                    <input type="checkbox"></input>
                    &nbsp;&nbsp;BBC
                </Grid>        
              </Grid>
            </ListItem>
            <Divider />
            <ListItem divider>
              <Autocomplete
                id="combo-box-demo"
                options={users}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Names"
                    variant="outlined"
                  />
                )}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
          <table align ="center" className="table table-responsive-lg table-hover">
                
                    
                {
                   
          filtered.map((prd) =>
          <tbody>
          <div>
          <tr>
          <th>Food item name: </th>
             <td>{prd.name}</td>
                            </tr>
                            <tr>
           <th>Canteen Name: </th>  
           <td>{prd.canteen}</td>
           </tr>
           <tr>
               <th>Rating: </th>
               <td>{prd.rating}</td>
           </tr>
           <tr>
               <th>Price: </th>
               <td>Rs.{prd.price}</td>
           </tr>
           <tr>
               <th>Addons: </th>
               <td>{prd.addon1}&nbsp;&nbsp;Rs.{prd.addon1price}</td>
               <td>{prd.addon2}&nbsp;&nbsp;Rs.{prd.addon2price}</td>
               <td>{prd.addon3}&nbsp;&nbsp;Rs.{prd.addon3price}</td>
               <td>{prd.addon4}&nbsp;&nbsp;Rs.{prd.addon4price}</td>
           </tr>
           <tr>
               <th>Tags: </th>
               <td>{prd.tags1}</td>
               <td>{prd.tags2}</td>
               <td>{prd.tags3}</td>
               <td>{prd.tags4}</td>
           </tr>
           <tr>
               <th>Type: </th>
               <td>{prd.type}</td>
           </tr>
           <tr>
           <Button variant="contained" onClick={() => {localStorage.setItem('PURCHASE_ITEM' , JSON.stringify(prd)) 
        navigate("/place")}}>
        PLACE ORDER
        </Button>
           </tr>
           </div>
</tbody>
            
          )
      }
                    
                    </table>
                    
          </Paper>
        </Grid>
      </Grid>


    </div>
  );
};

export default UsersList;
