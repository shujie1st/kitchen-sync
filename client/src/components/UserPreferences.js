import React, { useEffect, useState } from 'react';

function UserPreferences() {

  // database preferences
  const [preferences, setPreferences] = useState([])

  // fetch preferences from database
  const fetchPreferences = async () => {
    try {
      const response = await fetch(`http://localhost:3001/preferences`)
      const jsonData = await response.json()
      setPreferences(jsonData)
    } catch (error) {
      console.error(error.message)
    }
  }

  const getAllPreferences = () => {
    return preferences.map(pref => {
      return (
      <button key={pref.id} >
        {pref.name}
      </button>
      );
    })
  }

  useEffect(() => {
    fetchPreferences();
  },[])

  return (
    <section className="user-preferences">
      UserPreferences component
    {getAllPreferences()}
    </section>
  )

}

export default UserPreferences;