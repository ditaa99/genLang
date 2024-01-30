// import React from 'react';
import { useNavigate } from 'react-router-dom';
import icon from "../assets/icon.png";
// import App from '../App';
// import Info from "./Info";

const Menu = () => {
  const navigate = useNavigate();

  const iconClick = () => {
    navigate("/");
  };
  const examplesClick = () => {
    navigate("/examples");
  };
  const infoClick = () => {
    navigate("/info");
  };

  return (
    <div className="menu">
      <img src={icon} alt="Icon" height="45" onClick={iconClick}/> {/*  */}
      <button type="button" value="Save" className="menu-item">
        Save
      </button>
      <button type="button" value="Import" className="menu-item">
        Import
      </button>
      <button type="button" value="Examples" className="menu-item"onClick={examplesClick}>
        Examples
      </button>
      <button type="button" value="Help" className="menu-item"onClick={infoClick}>
        Help
      </button>
    </div>
  );
};

export default Menu;