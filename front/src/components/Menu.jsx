import { useNavigate } from 'react-router-dom';
import icon from "../assets/icon.png";

const Menu = () => {
  const navigate = useNavigate();

  const iconClick = () => {
    navigate("/");
  };
//   const saveClick = () =>{
// // save the file
//   };
  const examplesClick = () => {
    navigate("/examples");
  };
  const infoClick = () => {
    navigate("/info");
  };

  return (
    <div className="menu">
      <img src={icon} className="menu-img" alt="Icon" height="45" onClick={iconClick}/>
      <button type="button" value="Home" className="menu-item"onClick={iconClick}>
        Home
      </button>
      {/* <button type="button" value="Save" className="menu-item" onClick={saveClick}>
        Save
      </button> */}
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
