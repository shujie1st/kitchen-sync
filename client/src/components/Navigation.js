import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navigation(props){
  const navigate = useNavigate();

  const logout = async () => {

    try {
      const response = await fetch("http://localhost:3001/logout", {
        method: "POST",
        mode: "cors",
        credentials: "include"
      });
      
      if (response.status === 200) {
        props.setFirstName("");
        navigate("/login");
        console.log("Logout successful")
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <nav>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&display=swap');
      </style>
      <span className="nav-text">KitchenSync</span>

      <div className="nav-right">
        {props.firstName && <div className="nav-welcome"><span>Welcome <Link style={{color:"#FFBC29"}} to="/profile">{props.firstName}</Link></span><button className="logout" onClick={logout}>Logout</button></div>}
        {!props.firstName && <div><Link style={{color:"#E6EBF2"}} to="/login">Login</Link> / <Link style={{color:"#e6ebf2"}} to="/register">Sign Up</Link></div>}
      </div>
    </nav>
  );
}

export default Navigation;