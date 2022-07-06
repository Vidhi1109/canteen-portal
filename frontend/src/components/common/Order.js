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
let profile = "";
let emailid = "";
const Show = (props) => {
    const navigate = useNavigate();
    const changestatus = (event) => {
        event.preventDefault();


    };
    return (
        <Button variant="contained" onClick={changestatus}>
            CONFIRM PICKUP
        </Button>
    );
};
const UsersList = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        profile = localStorage.getItem('DASS_USERID');
        let userobj = JSON.parse(profile);
        emailid = userobj.email;
        alert(emailid);
        const newUser = {
            buyer: emailid,
        };
        axios
            .post("http://localhost:4000/user/getorder", newUser)
            .then((response) => {
                setUsers(response.data);
                //alert("yahannn");
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <div>
            <Grid container>
                <Grid item xs={14} md={9} lg={9}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell> Sr No.</TableCell>
                                    <TableCell>
                                        Date
                                    </TableCell>
                                    <TableCell>Food</TableCell>
                                    <TableCell>Vendor</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Cost</TableCell>
                                    <TableCell>Rating</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{ind + 1}</TableCell>
                                        <TableCell>{user.date}</TableCell>
                                        <TableCell>{user.food}</TableCell>
                                        <TableCell>{user.vendor}</TableCell>
                                        <TableCell>{user.time}</TableCell>
                                        <TableCell>{user.quantity}</TableCell>
                                        <TableCell>{user.status}</TableCell>
                                        <TableCell>{user.cost}</TableCell>
                                        <TableCell>{user.rating}</TableCell>
                                        <TableCell>{user.status === "READY FOR PICKUP" && <Show />}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default UsersList;
