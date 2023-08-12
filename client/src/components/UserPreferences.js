import { useEffect, useState } from "react";

function UserPreferences() {
  // database userPrefs
  const [userPrefs, setUserPrefs] = useState([])
  // database preferences
  const [preferences, setPreferences] = useState([])

  // fetch user_preferences from database
  const fetchUserPreferences = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user_preferences`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }})
      const jsonData = await response.json();
      console.log("👉jsonData: ", jsonData)
      setUserPrefs(jsonData)
    } catch (error) {
      
    }
  }

  // fetch userPrefs when component mounts
  useEffect(() => {
    fetchUserPreferences();
  },[])


  // fetch preferences from database
  const fetchPreferences = async () => {
    try {
      const response = await fetch (`http://localhost:3001/preferences`);
      const jsonData = await response.json()
      setPreferences(jsonData)
    } catch (error) {
      console.error(error.message)
    }
  }

  // fetch prefs when component mounts
  useEffect(() => {
    fetchPreferences();
  },[])

  // only render prefs that are not on user pref list
  const filteredPreferences = preferences.filter(pref => !userPrefs.some(userPref => userPref.name === pref.name));

  return (
    <section className="user-preferences">
      <div>
        My Preferences
        {userPrefs.map((pref) => {
          return <button key={pref.id}>{pref.name}</button>
        })}
      </div>
      <div>
        All Preferences
        <div>
          {filteredPreferences.map((pref) => {
            return <button key={pref.id}>{pref.name}</button>
          })}
        </div>
        
      </div>
    </section>
  )
}

export default UserPreferences;