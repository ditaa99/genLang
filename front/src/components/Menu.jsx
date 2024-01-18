// import React from 'react';
// import { useNavigate } from 'react-router-dom';
import icon from "../assets/icon.png";
// import App from '../App';
// import Info from "./Info";

const Menu = () => {
//   const navigate = useNavigate();

//   const iconClick = () => {
//     // Option 1: Use the Route component (if you want to render the Info component in the same component)
//     // <Route path="/info" component={Info} />

//     // Option 2: Use the navigate function to programmatically navigate
//     navigate("/info");
//   };

  return (
    <div className="menu">
      <img src={icon} alt="Icon" height="45" /> {/* onClick={iconClick} */}
      <button type="button" value="Save" className="menu-item">
        Save
      </button>
      <button type="button" value="Import" className="menu-item">
        Import
      </button>
      <button type="button" value="Examples" className="menu-item">
        Examples
      </button>
      <button type="button" value="Help" className="menu-item">
        Help
      </button>
    </div>
  );
};

export default Menu;
