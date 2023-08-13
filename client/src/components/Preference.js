import React, { useEffect, useState } from 'react';

function Preference(props){
  const { filteredList, getSelectedPreferences } = props;
  
  // database preferences
  const [preferences, setPreferences] = useState([])
  // database user preferences for filter
  const [userPrefs, setUserPrefs] = useState([]);

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

  // fetch user preferences from database
  const fetchUserPreferences = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user_preferences`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonData = await response.json();
      setUserPrefs(jsonData);
    } catch (error) {
      console.error("Could not fetch user preferences from the database.", error.message)
    }
  }

  // filter rendering of prefs that not in userPrefs
  const getFilteredPreferences = () => {
    return preferences.filter((pref) => !userPrefs.some((userPref) => userPref.id === pref.id));
  };

  // add pref to filter component on click
  const handleClick = (pref) => {
    // check if pref is already selected
    if (!filteredList.includes(pref)) {
      // callback to send data  up to parent App component
      getSelectedPreferences([...filteredList, pref])
    }
  }


  useEffect(() => {
    fetchPreferences();
    fetchUserPreferences();
  },[]) 

  return ( 
      <section className="preferences">
        {getFilteredPreferences().map((pref) => (
          <button key={pref.id} onClick={() => handleClick(pref)}>{pref.name}</button>
        ))}
      </section>
  );
}

export default Preference;