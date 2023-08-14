import { BiNotepad } from "@react-icons/all-files/bi/BiNotepad"
import FilterControls from "./FilterControls"; // Import the FilterControls component
import { useEffect } from "react";


function Filter(props){
  const { 
    userPrefs, 
    filteredList, 
    removeItemFromFilterList, 
    fetchUserPreferences, 
    clearFilteredList,
    firstName,
  } = props


  const handleRemoveIngredient = (item) => {
    const removeItem = filteredList.filter((element) => element.name !== item.name)
    // callback from App component
    removeItemFromFilterList(removeItem)
  }

  // remove user prefs from database
  const handleRemoveUserPrefs = async (preferenceId) => {
    try {
      const response = await fetch(`http://localhost:3001/user_preferences/remove`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          preferenceId: preferenceId,
        }),
      })
      if (response.status === 200) {
        fetchUserPreferences() 
      }
    } catch (error) {
      console.error("Could not remove user preference from database.", error.message)
    }
  }

  // check if user is logged in and render user's preference list
  const SavedPreferences = () => {
    if (firstName) {
      return (
        <div>
        <h6>My Saved Preferences</h6> 
        <div>
          {userPrefs.map(item => {
            return <button 
                      key={item.id}
                      className="filter-btn-remove" 
                      onClick={() => handleRemoveUserPrefs(item.id)}>{item.name}</button>
          })}
        </div>
        </div>
      )
    } else {
      return null;
    }}
  
    // only render clear button if filters have been added
    const renderClearFilter = () => {
      if (filteredList.length > 0) {
        return <FilterControls clearFilteredList={clearFilteredList} />
      } else {
        return null;
      }
    }


  useEffect(() => {
    fetchUserPreferences();
  },[]);

  return ( 
      <section className="filters">
        <div><span>My List</span><BiNotepad /></div>
          {filteredList.map((item, index) => {
            return <button key={index} onClick={() => handleRemoveIngredient(item)} >{item.name}</button>

          })}
          {renderClearFilter()}
          < SavedPreferences />
      </section>
  );
}

export default Filter;