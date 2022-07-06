import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
// reactstrap components
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

function Dropdown() {
  const navigate = useNavigate();

  const handleClick = () => {
      navigate("/register");
  }
  const handleClick2 = () => {
    navigate("/register2");
}
  return (
    <div align="center">
      <UncontrolledDropdown>
        <DropdownToggle
          caret
          color="secondary"
          id="dropdownMenuButton"
          type="button"
        >
          PLEASE SELECT YOUR CATEGORY
        </DropdownToggle>

        <DropdownMenu aria-labelledby="dropdownMenuButton">
          <DropdownItem  onClick={handleClick}>
            Vendor
          </DropdownItem>
          <DropdownItem  onClick={handleClick2}>
            Buyer
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
}

export default Dropdown;