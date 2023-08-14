import UserRecipes from "./UserRecipes";
import UserPreferences from "./UserPreferences";
import {Link} from "react-router-dom"

function Profile() {
  
  return (
    <section className="profile">
      <UserRecipes />
      <UserPreferences />
    </section>
  )

}

export default Profile;