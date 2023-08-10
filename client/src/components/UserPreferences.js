import { useEffect, useState } from "react";

function UserPreferences(props) {
  const { userID } = props
  const [userPrefs, setUserPrefs] = useState([])
  // database preferences
  const [preferences, setPreferences] = useState([])

  // fetch user_preferences from database
  const fetchUserPreferences = async () => {
    try {
      const response = await fetch(`/user_preferences/${userID}`);
      const jsonData = await response.json();
      setUserPrefs(jsonData)
    } catch (error) {
      
    }
  }

  // fetch userPrefs when component mounts
  useEffect(() => {
    fetchUserPreferences();
  },[userID])

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
          {preferences.map((pref) => {
            return <button key={pref.id}>{pref.name}</button>
          })}
        </div>
        
      </div>
    </section>
  )
}

export default UserPreferences;