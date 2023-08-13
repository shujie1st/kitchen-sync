import { useEffect, useState } from "react";
import { BiNotepad } from "@react-icons/all-files/bi/BiNotepad"

function Filter(props){
  const { userPrefs, filteredList } = props
  // const { filteredList, removeItemFromFilterList, userPrefs } = props
  // const [ingredientsList, setIngredientsList] = useState([]);

  // const handleRemoveIngredient = (ingredientName) => {
  //   const removedIngredient = filteredList.filter((ingredient) => ingredient !== ingredientName);
  //   // callback from App component - send filtered array that does not include the ingredient name
  //   removeItemFromFilterList(removedIngredient);
  // }


  // useEffect(() => {
  //   const getIngredientsList = filteredList.map(item => {
  //   return <button key={item.id} onClick={() => handleRemoveIngredient(item.name)} >
  //           {item.name}
  //         </button>
  // })
  // setIngredientsList(getIngredientsList)
  // },[filteredList, removeItemFromFilterList])

  console.log("🎈userPrefs: ", userPrefs)
  console.log("📝filteredList: ", filteredList)

  return ( 
      <section className="filters">
        <div><span>Your List</span><BiNotepad /></div>
          {filteredList.map(item => {
            return <button key={item.id}>{item.name}</button>
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