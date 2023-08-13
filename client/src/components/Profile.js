import UserRecipes from "./UserRecipes";
import UserPreferences from "./UserPreferences";
import {Link} from "react-router-dom"
import FilterControls from "./FilterControls"; // Import the FilterControls component


function Profile(props) {
const { clearFilteredList } = props
  
  return (
    <section className="profile">
      <div className="profile-message"><Link style={{color:"#32324D"}} to="/">Back to Homepage</Link></div>
      <UserRecipes />
      <UserPreferences />
      <FilterControls clearFilteredList={clearFilteredList} />

    </section>
  )

}

export default Profile;