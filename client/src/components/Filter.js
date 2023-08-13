import { useEffect, useState } from "react";
import { BiNotepad } from "@react-icons/all-files/bi/BiNotepad"

function Filter(props){
  const { userPrefs, filteredList, removeItemFromFilterList } = props

  

  const handleRemoveIngredient = (item) => {
    console.log("🔎item: ", item)
    const removeItem = filteredList.filter((element) => element.name !== item.name)
    // callback from App component
    removeItemFromFilterList(removeItem)
  }


  console.log("🎈userPrefs: ", userPrefs)
  console.log("📝filteredList: ", filteredList)

  return ( 
      <section className="filters">
        <div><span>Your List</span><BiNotepad /></div>
          {filteredList.map((item, index) => {
            return <button key={index} onClick={() => handleRemoveIngredient(item)} >{item.name}</button>
          })}
        <div>My Saved Preferences</div>
        <div>
          {userPrefs.map(item => {
            return <button key={item.id}>{item.name}</button>
          })}
        </div>
      </section>
  );
}

export default Filter;