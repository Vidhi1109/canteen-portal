import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
let profile="";
let email="";
let user="";
const Profile = (props) => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [details2, setDetails2] = useState([]);
  useEffect(() => {
    profile = localStorage.getItem('DASS_USERID');
    let userobj = JSON.parse(profile);
    email = userobj.email;
    user = localStorage.getItem('DASS_USER');
    if(user === "Buyer")
    {
      //alert("here");
      const newUser = {
        email: email
      };
      axios
        .post("http://localhost:4000/user/profile", newUser)
        .then((response) => 
        {
          if(response.status === 200)
          {
            setDetails(response.data);
            alert("Succesfully logged in " + response.data.name);
            //alert(response.data.name);
          }
          console.log(response.data);
          //alert("Hi " + details.name);
        });
        
    }
    if(user === "Vendor")
    {
      const newUser = {
        email: email
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
            <h1>VENDOR PROFILE DETAILS</h1>
            <Button variant="contained" onClick={() => navigate("/editdetails")}>
              EDIT DETAILS
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" onClick={() => navigate("/vendordashboard")}>
              DASHBOARD
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" onClick={() => navigate("/orderdashboard")}>
              ORDER DASHBOARD
        </Button>
        <Button variant="contained" onClick={() => navigate("/stats")}>
              Statistics
        </Button>
            <table className="table table-responsive-lg table-hover">
                <tbody>
                    <tr>
                        <th> Manager's Name </th>
                        <td>{details.name}</td>
                    </tr>
                    <tr>
                        <th>Shop Name</th>
                        <td>{details.shop}</td>
                    </tr>
                    <tr>
                        <th> Email Address </th>
                        <td>{details.email}</td>
                    </tr>
                    <tr>
                        <th>Contact Number</th>
                        <td>{details.contact}</td>
                    </tr>
                    <tr>
                        <th>Canteen Opening Time</th>
                        <td>{details.opening}</td>
                    </tr>
                    <tr>
                        <th>Canteen Closing Time</th>
                        <td>{details.closing}</td>
                    </tr>
                </tbody>
            </table>
        </div>);
};

export default Profile;
