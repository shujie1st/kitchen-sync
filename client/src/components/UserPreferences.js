import React, { useEffect, useState } from 'react';

function UserPreferences() {

  // database preferences
  const [preferences, setPreferences] = useState([])
  const [selectedPrefs, setSelectedPrefs] = useState({});


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

  const handleClick = (prefName) => {
    setSelectedPrefs((prevSelectedPrefs) => ({
      ...prevSelectedPrefs,
      [prefName]: !prevSelectedPrefs[prefName],
    }));
  }


  useEffect(() => {
    fetchPreferences();
  },[])

  return (
    <section className="user-preferences">
    All Preferences
    
    {preferences.map((pref) => {
          if (!selectedPrefs[pref.name]) {
            return <button key={pref.id} onClick={() => handleClick(pref.name)} >{pref.name}</button>;
          }
          return null;
        })}
    My Preferences
    {preferences.map((pref) => {
          if (selectedPrefs[pref.name]) {
            return <button key={pref.id} onClick={() => handleClick(pref.name)} >{pref.name}</button>;
          }
          return null;
        })}
    </section>
  )

}

export default UserPreferences;