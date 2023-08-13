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
  const handleClick = (pref) => {
    // check if pref is already selected
    if (!filteredList.includes(pref)) {
      // callback to send data  up to parent App component
      getSelectedPreferences([...filteredList, pref])
    }
  }

  const getAllPreferences = () => {
    return preferences.map(pref => {
      console.log("😊pref: ", pref)
      return (
      <button 
        key={pref.id} 
        onClick={() =>handleClick(pref)}>
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
        {getAllPreferences()}
      </section>
  );
}

export default Preference;