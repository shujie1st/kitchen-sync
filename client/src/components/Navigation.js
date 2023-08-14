import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../styles/Navigation.css'

function Navigation(props){
  const navigate = useNavigate();

  const backendPort = process.env.REACT_APP_BACKEND_PORT;

  const logout = async () => {

    try {
      const response = await fetch(`http://localhost:${backendPort}/logout`, {
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
        @import url('https://fonts.googleapis.com/css2?family=Ysabeau+SC:wght@900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&display=swap');
      </style>
      <span className="nav-text">KitchenSync</span>

      <div className="nav-right">
        {props.firstName && 
          <div className="nav-welcome">
            <span>
              <span>Welcome <Link to="/profile" className="userName">{props.firstName}</Link></span>
              <button className="logout" onClick={logout}>Logout</button>
            </span>
          </div>}
        {!props.firstName && <div><Link style={{color:"#E6EBF2"}} to="/login">Login</Link> / <Link style={{color:"#e6ebf2"}} to="/register">Sign Up</Link></div>}
      </div>
    </nav>
  );
}

export default Navigation;