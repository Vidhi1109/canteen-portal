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
let profile="";
let emailid="";
let user="";
let deletefooditem="";
const UsersList = (props) => {
    const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [vegType , setVegType] = useState("");
 
  useEffect(() => {
    profile = localStorage.getItem('DASS_USERID');
    let userobj = JSON.parse(profile);
    emailid = userobj.email;
    user = localStorage.getItem('DASS_USER');
    //alert(emailid);
    const newUser = {
        vendor: emailid
      };
    axios
      .post("http://localhost:4000/user/getfoodbyvendor" , newUser)
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
          <div align="right">
          <Button align="right" variant="contained" onClick={() => navigate("/addfood")}>
                      ADD FOOD ITEM
        </Button>
          </div>
 
    <table className="table table-responsive-lg table-hover">
    
        {users.map((user,ind) =>
        <tbody>
        <tr>
        <th> Food item : </th>
        <td>{user.name}</td>
        </tr>
        <tr>
        <th> Price : </th>
        <td>{user.price}</td>
    </tr>
    <tr>
        <th> Rating : </th>
        <td>{user.rating}</td>
    </tr>
    <tr>
        <th> Type : </th>
        <td>{user.type}</td>
    </tr>
    <tr>
        <th> Addons : </th>
        <td>{user.addon1}&nbsp;&nbsp;&nbsp;Rs.{user.addon1price}</td>
        <td>{user.addon2}&nbsp;&nbsp;&nbsp;Rs.{user.addon2price}</td>
        <td>{user.addon3}&nbsp;&nbsp;&nbsp;Rs.{user.addon3price}</td>
        <td>{user.addon4}&nbsp;&nbsp;&nbsp;Rs.{user.addon4price}</td>
    </tr>
    <tr>
        <th> Tags : </th>
        <td>{user.tags1}</td>
        <td>{user.tags2}</td>
        <td>{user.tags3}</td>
        <td>{user.tags4}</td>
    </tr>
    <tr>
    <td><Button variant="contained" onClick={() => {localStorage.setItem('EDIT_ITEM' , JSON.stringify(user)) 
        navigate("/edit")}}>
        EDIT 
        </Button></td>
       <td> <Button variant="contained" onClick={() => {
                 const newUser = {
                     vendor : emailid,
                     name: user.name
                  };
            
                  axios
                    .post("http://localhost:4000/user/deletefood", newUser)
                    .then((response) => {
                      alert("Deleted\t");
                      window.location.reload(false);
                      //console.log(response.data);
                    });
       }}>
        DELETE 
        </Button>  </td>  
    </tr>
    </tbody>
        )}
</table>    
</div>

  );
};

export default UsersList;
