import { useEffect, useState } from "react";

function Filter(props){
  const { filteredIngredients, removeSelectedIngredient } = props
  const [ingredientsList, setIngredientsList] = useState([]);

  const handleRemoveIngredient = (ingredientName) => {
    const removedIngredient = filteredIngredients.filter((ingredient) => ingredient !== ingredientName);
    // callback from App component - send filtered array that does not include the ingredient name
    removeSelectedIngredient(removedIngredient);
  }


  useEffect(() => {
    const getIngredientsList = filteredIngredients.map(ingredientName => {
    return <button key={ingredientName} onClick={() => handleRemoveIngredient(ingredientName)} >
            {ingredientName}
          </button>
  })

  setIngredientsList(getIngredientsList)
  },[filteredIngredients, removeSelectedIngredient])

  

  return ( 
      <section className="filters">
        Filter component
        {ingredientsList}
      </section>
  );
}

export default Filter;