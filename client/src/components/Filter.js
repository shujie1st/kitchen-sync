import { useEffect, useState } from "react";

function Filter(props){
  const { selectedIngredients } = props
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const getIngredientsList = selectedIngredients.map(ingredient => {
    return <button key={ingredient}>{ingredient}</button>
  })

  setIngredientsList(getIngredientsList)
  },[selectedIngredients])

  

  return ( 
      <section className="filters">
        Filter component
        {ingredientsList}
      </section>
  );
}

export default Filter;