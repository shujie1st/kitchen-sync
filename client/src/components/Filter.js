import { useEffect, useState } from "react";

function Filter(props){
  const { filteredList, removeItemFromFilterList, userPrefs } = props
  // const [ingredientsList, setIngredientsList] = useState([]);
  const allIngredientsAndPrefs = [...filteredList, ...userPrefs.map(pref => pref.name)]


  const handleRemoveIngredient = (ingredientName) => {
    const removedIngredient = filteredList.filter((ingredient) => ingredient !== ingredientName);
    // callback from App component - send filtered array that does not include the ingredient name
    removeItemFromFilterList(removedIngredient);
  }

  const filterButtons = allIngredientsAndPrefs.map((item, index) => (
    <button key={index} onClick={() => handleRemoveIngredient(item)}>
      {item}
    </button>
  ))


  useEffect(() => {

  },[filteredList, removeItemFromFilterList])

  

  return ( 
      <section className="filters">
        Filter component
        <div>
          {filterButtons}
        </div> 
      </section>
  );
}

export default Filter;