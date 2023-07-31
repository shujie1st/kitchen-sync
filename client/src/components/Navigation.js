import {Link} from "react-router-dom";

function Navigation(){
  return ( 
      <nav>
        <span className="nav-text">KitchenSync</span>

        <div className="nav-right">
          <Link to="/login">Login</Link>
        </div>
      </nav>
  );
}

export default Navigation;