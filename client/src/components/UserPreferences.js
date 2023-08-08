import React, { useEffect, useState } from 'react';

function UserPreferences() {

  // database preferences
  const [preferences, setPreferences] = useState([])
  

  const initialPrefs = JSON.parse(localStorage.getItem('prefs')) || {};
  const [selectedPrefs, setSelectedPrefs] = useState(initialPrefs);


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
    localStorage.setItem('prefs', JSON.stringify(selectedPrefs))
  },[selectedPrefs])

  return (
    <section className="user-preferences">
      <div>
        <h4>My Preferences</h4>
        <div>
          {preferences.map((pref) => {
          if (selectedPrefs[pref.name]) {
            return <button key={pref.id} onClick={() => handleClick(pref.name)} >{pref.name}</button>;
          }
          return null;
        })}
        </div>
      </div>
      <div>
        <h4>All Preferences</h4>
        <div>
          {preferences.map((pref) => {
          if (!selectedPrefs[pref.name]) {
            return <button key={pref.id} onClick={() => handleClick(pref.name)} >{pref.name}</button>;
          }
          return null;
        })}
        </div>
      </div>
    </section>
  )

}

export default UserPreferences;