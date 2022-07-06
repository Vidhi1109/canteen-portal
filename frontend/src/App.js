import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Register2 from "./components/common/Register2";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import Dropdown from "./components/common/Dropdown";
import Login from "./components/common/Login";
import Profile2 from "./components/users/Profile2";
import Order from "./components/common/Order"
import Dashboard from "./components/users/dashboard"
import VendorDashboard from "./components/users/vendordashboard"
import AddFood from "./components/users/addfood"
import OrderDashboard from "./components/users/orderdashboard"
import Edit from "./components/users/editdetails"
import Statistics from "./components/users/Statistics"
import Place from "./components/users/placeorder"
const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="dropdown" element={<Dropdown />} />
          <Route path="register" element={<Register />} />
          <Route path="register2" element={<Register2 />} />
          <Route path="login" element={<Login />} />
          <Route path="myorder" element={<Order />} />
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile2" element={<Profile2 />} />
          <Route path="vendordashboard" element={<VendorDashboard />} />
          <Route path="addfood" element={<AddFood />} />
          <Route path="orderdashboard" element={<OrderDashboard />}/>
          <Route path="edit" element={<Edit />}/>
          <Route path="stats" element={<Statistics />}/>
          <Route path="place" element={<Place />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
