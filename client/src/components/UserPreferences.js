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
      console.error("Failed to fetch preferences: ", error.message)
    }
  }

  // fetch prefs when component mounts
  useEffect(() => {
    fetchPreferences();
  },[])

  // add userPrefs to database on Click
  const addPreference = async (preferenceId) => {
    try {
      const response = await fetch (`http://localhost:3001/user_preferences/add`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferenceId: preferenceId,
        }),
      });
      if (response.status === 201) {
        fetchUserPreferences();
      }
    } catch (error) {
      console.error("Failed to add user preference: ", error.message)
    }
  }

  // remove preferences from database on Click
  const removePreferences = async (preferenceId) => {
    try {
      const response = await fetch (`http://localhost:3001/user_preferences/remove`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferenceId: preferenceId,
        }),
      })
      if (response.status === 200) {
        fetchUserPreferences();
      }
    } catch (error) {
      console.error("Failed to remove preference: ", error.message)
    }
  }

  // only render prefs that are not on user pref list
  const filteredPreferences = preferences.filter(pref => !userPrefs.some(userPref => userPref.name === pref.name));

  return (
    <section className="user-preferences">
      <div>
       <h5>My Preferences</h5> 
        <div className="my-preferences">
          {userPrefs.map((pref) => {
            return <button 
                      key={pref.id} 
                      className="filter-btn-remove" 
                      onClick={() => removePreferences(pref.id)} 
                      >{pref.name}</button>
          })}
        </div>
      </div>
      <br/>
      <br/>
      <div>
        <h5>All Preferences</h5>
        <div className="all-preferences">
          {filteredPreferences.map((pref) => {
            return <button 
                      key={pref.id} 
                      className="filter-btn-add" 
                      onClick={() => addPreference(pref.id)} 
                      >{pref.name}</button>
          })}
        </div>
        
      </div>
    </section>
  )
}

export default UserPreferences;