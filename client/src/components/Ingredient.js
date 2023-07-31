import React, { useEffect, useState } from "react";

const Ingredient = (props) => {
  const { filteredIngredients, getSelectedIngredients } = props

  // database ingredients
  const [ingredients, setIngredients] = useState([]);
  // search
  const [ingredientsSearch, setIngredientsSearch] = useState('')
  // store data from search
  const [filteredResults, setFilteredResults] = useState([]);



  // fetch ingredients from database
  const getIngredients = async () => {
    try {
      const response = await fetch(`http://localhost:3001/ingredients`)
      const jsonData = await response.json()
      setIngredients(jsonData);
    } catch (error) {
      console.error(error.message)
    }
  };

  // select ingredients for Filter component
  const handleIngredientClick = (ingredientName) => {
    // check if ingredient has already been selected
    if (!filteredIngredients.includes(ingredientName)) {
    // callback to send data up to parent App component
    getSelectedIngredients([...filteredIngredients, ingredientName])
  }};

  const getIngredientsByCategory = (categoryID) => {
    return ingredients.map(ingredient => {
      if (ingredient.category_id === categoryID) {
        return (
          <button key={ingredient.id} onClick={() => handleIngredientClick(ingredient.name)}>
            {ingredient.name}
            </button>
            );
      }
      return null;
    })
  }


  // search ingredients
  const handleChange = e => {
    setIngredientsSearch(e.target.value)
    console.log("👉👉👉ingredientsSearch: ", ingredientsSearch)
    // filter data based on search input
    const filteredSearchData = ingredients.filter((ingredient) => {
      return Object.values(ingredient).join('').toLowerCase().includes(ingredientsSearch.toLowerCase())
    })
    // update the search to the filtered data
    console.log("👉👉👉 filteredSearchData: ", filteredSearchData)
    setFilteredResults(filteredSearchData)
  };


   useEffect(() => {
    getIngredients();
  }, []);


  return ( 
      <section className="ingredients">
        <form>
          <input 
            type="text" 
            placeholder="Search ingredients"
            value={ingredientsSearch} 
            onChange={handleChange}>
          </input>
        </form>
        <div>
          <h4>Vegetables & Greens</h4>  
            {getIngredientsByCategory(1)}      
          <h4>Fruits</h4>
            {getIngredientsByCategory(2)}

          <h4>Dairy & Eggs</h4>
            {getIngredientsByCategory(3)}

          <h4>Dairy-Free & Meat Substitutes</h4>
            {getIngredientsByCategory(4)}
     
          <h4>Meats & Poultry</h4>
            {getIngredientsByCategory(5)}

          <h4>Fish & Seafood ID6</h4>
             {getIngredientsByCategory(6)}
        </div>
        
      </section>
  );
}

export default Ingredient;
