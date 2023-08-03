import { useEffect, useState } from "react";

function Filter(props){
  const { filteredList, removeItemFromFilterList } = props
  const [ingredientsList, setIngredientsList] = useState([]);

  const handleRemoveIngredient = (ingredientName) => {
    const removedIngredient = filteredList.filter((ingredient) => ingredient !== ingredientName);
    // callback from App component - send filtered array that does not include the ingredient name
    removeItemFromFilterList(removedIngredient);
  }


  useEffect(() => {
    const getIngredientsList = filteredList.map(ingredientName => {
    return <button key={ingredientName} onClick={() => handleRemoveIngredient(ingredientName)} >
            {ingredientName}
          </button>
  })

  setIngredientsList(getIngredientsList)
  },[filteredList, removeItemFromFilterList])

  

  return ( 
      <section className="filters">
        Filter component
        {ingredientsList}
      </section>
  );
}

export default Filter;