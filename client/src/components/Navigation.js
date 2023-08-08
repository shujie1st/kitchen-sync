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
      <span className="nav-text">KitchenSync</span>

      <div className="nav-right">
        {props.firstName && <div className="nav-welcome"><span>Welcome <Link to="/profile">{props.firstName}</Link></span><button className="logout" onClick={logout}>Logout</button></div>}
        {!props.firstName && <div><Link to="/login">Login</Link> / <Link to="/register">Sign Up</Link></div>}
      </div>
    </nav>
  );
}

export default Navigation;