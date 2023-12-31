import React, { useEffect, useState } from 'react';

function Preference(props){
  const { filteredList, getSelectedPreferences, userPrefs } = props;
  
  // database preferences
  const [preferences, setPreferences] = useState([])

  const backendPort = process.env.REACT_APP_BACKEND_PORT;

  // fetch preferences from database
  const fetchPreferences = async () => {
    try {
      const response = await fetch(`http://localhost:${backendPort}/preferences`)
      const jsonData = await response.json()
      setPreferences(jsonData)
    } catch (error) {
      console.error(error.message)
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