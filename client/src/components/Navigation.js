import {Link} from "react-router-dom";

function Navigation(props){
  return ( 
      <nav>
        <span className="nav-text">KitchenSync</span>

        <div className="nav-right">
          {props.firstName && <div className="nav-welcome"><span>Welcome {props.firstName}</span><Link to="/logout">Logout</Link></div>}
          {!props.firstName && <Link to="/login">Login</Link>}
        </div>
      </nav>
  );
}

export default Navigation;