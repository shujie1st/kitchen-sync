import React, { useEffect, useState } from 'react';

function Preference(props){
  const { filteredList, getSelectedPreferences } = props;
  
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

  // add pref to filter component on click
  const handleClick = (prefName) => {
    // check if pref is already selected
    if (!filteredList.includes(prefName)) {
      // callback to send data  up to parent App component
      getSelectedPreferences([...filteredList, prefName])
    }
  }

  const getAllPreferences = () => {
    return preferences.map(pref => {
      return (
      <button 
        key={pref.id} 
        onClick={() =>handleClick(pref.name)}>
          {pref.name}
      </button>
      );
    })
  }

  

  useEffect(() => {
    fetchPreferences();
  },[])

  return ( 
      <section className="preferences">
        Preference components
        {getAllPreferences().slice(0,10)}
      </section>
  );
}

export default Preference;