import React, { useEffect, useState } from 'react';

function Preference(){
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
      return <button key={pref.id}>{pref.name}</button>
    })
  }

  

  useEffect(() => {
    fetchPreferences();
  },[])

  return ( 
      <section className="preferences">
        Preference components
        {getAllPreferences()}
      </section>
  );
}

export default Preference;