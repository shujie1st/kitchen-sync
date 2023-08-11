import { useEffect, useState } from "react";

function UserPreferences() {
  const userID = 1

  // database userPrefs
  const [userPrefs, setUserPrefs] = useState([])
  // database preferences
  const [preferences, setPreferences] = useState([])

  // fetch user_preferences from database
  const fetchUserPreferences = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user_preferences`);
      const jsonData = await response.json();
      const userPrefsByID = jsonData.rows.filter(item => item.user_id === userID)
      setUserPrefs(userPrefsByID)
    } catch (error) {
      console.error(error.message)
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


// add userPrefs to database on click
  const addPref = async (preferenceID) => {
    try {
      const response = await fetch (`http://localhost:3001/user_preferences/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: userID,
        preferenceID: preferenceID,
      }),
      });

      if (response.status === 201) {
        fetchUserPreferences();
      }
      
    } catch (error) {
      console.error(error.message)
    }
  }

  // remove userPrefs to database on click
  const removePref = async (preferenceID) => {
    try {
      const response = await fetch (`http://localhost:3001/user_preferences/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: userID,
          preferenceID: preferenceID,
        }),
      });

      if (response.status === 200) {
        fetchUserPreferences();
      }

    } catch (error) {
      console.error(error.message)
    }
  }


  // Filter preferences that are not in userPrefs
  const filteredPreferences = preferences.filter(pref => !userPrefs.some(userPref => userPref.name === pref.name));

  return (
    <section className="user-preferences">
      <div>
        My Preferences
        {userPrefs.map((pref, index) => {
          return <button key={index} onClick={() => removePref(pref.id)} >{pref.name}</button>
        })}
      </div>
      <div>
        All Preferences
        <div>
          {filteredPreferences.map((pref) => {
            return <button key={pref.id} onClick={() => addPref(pref.id)}>{pref.name}</button>
          })}
        </div>
        
      </div>
    </section>
  )
}

export default UserPreferences;