import { useState, useEffect } from "react";
import { confirm } from "react-confirm-box";
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
let rating="";
var orders =0;
function Status(params)
{
  let obj = JSON.parse(params);
  let status = obj.status;
  if(status === "PLACED")
  {
    let obj = JSON.parse(params);
    let status = obj.status;
    profile = localStorage.getItem('DASS_USERID');
    let userobj = JSON.parse(profile);
    emailid = userobj.email;
    if(status === "PLACED")
    {
      const newUser = {
        vendor: emailid,
        time: obj.time,
        status : 'REJECTED'
      };
    axios
      .post("http://localhost:4000/user/editorderbyvendor" , newUser)
      .then((response) => {
        alert("hello");
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
}
function Status2(params)
{
  let obj = JSON.parse(params);
  let status = obj.status;
  if(status !== "REJECTED")
  {
    let obj = JSON.parse(params);
    let status = obj.status;
    profile = localStorage.getItem('DASS_USERID');
    let userobj = JSON.parse(profile);
    emailid = userobj.email;
    if(status === "PLACED")
    {
      orders++;
      if(orders >10)
      {
        alert("Order Limit exceeded");
      }
      else
      {
      const newUser = {
        vendor: emailid,
        time: obj.time,
        status : 'ACCEPTED'
      };
    axios
      .post("http://localhost:4000/user/editorderbyvendor" , newUser)
      .then((response) => {
        //alert("hello");
      })
      .catch((error) => {
        console.log(error);
      });
    }
    }
    if(status === "ACCEPTED")
    {
      orders++;

      const newUser = {
        vendor: emailid,
        time: obj.time,
        status : 'COOKING'
      };
    axios
      .post("http://localhost:4000/user/editorderbyvendor" , newUser)
      .then((response) => {
        //alert("hello");
      })
      .catch((error) => {
        console.log(error);
      });
    
    }
    if(status === "COOKING")
    {
      const newUser = {
        vendor: emailid,
        time: obj.time,
        status : 'READY FOR PICKUP'
      };
    axios
      .post("http://localhost:4000/user/editorderbyvendor" , newUser)
      .then((response) => {
        //alert("hello");
      })
      .catch((error) => {
        console.log(error);
      });
    }
    if(status === "READY FOR PICKUP")
    {
      const newUser = {
        vendor: emailid,
        time: obj.time,
        status : 'COMPLETED'
      };
    axios
      .post("http://localhost:4000/user/editorderbyvendor" , newUser)
      .then((response) => {
        //alert("hello");
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
}
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
      .post("http://localhost:4000/user/getorderbyvendor" , newUser)
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
        <th> PLACED TIME : </th>
        <td>{user.time}</td>
        </tr>
        <tr>
        <th> Vendor Id : </th>
        <td>{user.vendor}</td>
    </tr>
    <tr>
        <th> Food Item : </th>
        <td>{user.food}</td>
    </tr>
    <tr>
        <th> Rating : </th>
        <td>{user.rating}</td>
    </tr>
    <tr>
        <th> Quantity : </th>
        <td>{user.quantity}</td>
    </tr>
    <tr>
        <th> Addons: </th>
        <td>{user.addon1}</td>
        <td>{user.addon2}</td>
        <td>{user.addon3}</td>
        <td>{user.addon4}</td>
    </tr>
    <tr>
        <th> Status : </th>
        <td>{user.status}</td>
        <td><Button variant="contained" onClick={() =>Status2(JSON.stringify(user))}>
      MOVE TO NEXT STAGE
        </Button></td>
        <td><Button variant="contained" disabled= {user.status !== "PLACED"} onClick={() =>Status(JSON.stringify(user))}>
          REJECT
          <p id="here"></p>
        </Button></td>
        <td><Button variant="contained" disabled= {user.status !== "READY FOR PICKUP"} onClick={() =>Status2(JSON.stringify(user))}>
          PICKED UP
          <p id="here"></p>
        </Button></td>
    </tr>
    <tr>

    </tr>

    </tbody>
        )}
</table>    
</div>

  );
};

export default UsersList;
