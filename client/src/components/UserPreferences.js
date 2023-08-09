import React, { useEffect, useState } from 'react';

function UserPreferences() {

  // database preferences
  const [preferences, setPreferences] = useState([])
  
  // Load initialPrefs from local storage or set it as an empty object
  // const initialPrefs = JSON.parse(localStorage.getItem('prefs')) || {};
  const initialPrefs = JSON.parse(localStorage.getItem('prefs')) || [];
  const [selectedPrefs, setSelectedPrefs] = useState(initialPrefs);
  const [unselectedPrefs, setUnselectedPrefs] = useState([]);


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
  

  const handlePrefClick = (prefName) => {
    if (selectedPrefs.includes(prefName)) {
      // remove from selected and add to unselected
      setSelectedPrefs(selectedPrefs.filter((pref) => pref !== prefName));
      setUnselectedPrefs([...unselectedPrefs, prefName]);
    } else {
      // remove from unselected and add to selected
      setUnselectedPrefs(unselectedPrefs.filter((pref) => pref !== prefName));
      setSelectedPrefs([...selectedPrefs, prefName]);
    }
  };

  // fetch prefs when component mounts
  useEffect(() => {
    fetchPreferences();
  },[])

  // save selectedPrefs to local storage upon change
  useEffect(() => { 
    localStorage.setItem('prefs', JSON.stringify(selectedPrefs))
  },[selectedPrefs])

  return (
    <section className="user-preferences">
      <div>
        <h4>My Preferences</h4>
        <div>
         {preferences.map((pref) => (
            selectedPrefs.includes(pref.name) && (
              <button
                key={pref.id}
                onClick={() => handlePrefClick(pref.name)}
              >
                {pref.name}
              </button>
            )
          ))}
        </div>
      </div>
      <div>
        <h4>All Preferences</h4>
        <div>
          {preferences.map((pref) => (
            !selectedPrefs.includes(pref.name) && (
              <button
                key={pref.id}
                onClick={() => handlePrefClick(pref.name)}
              >
                {pref.name}
              </button>
            )
          ))}
        </div>
      </div>
    </section>
  )

}

export default UserPreferences;