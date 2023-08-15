import React, { useEffect, useState } from "react";

const Ingredient = (props) => {
  const { filteredList, getSelectedIngredients } = props

  // database ingredients
  const [ingredients, setIngredients] = useState([]);
  // search
  const [ingredientsSearch, setIngredientsSearch] = useState('')
  // store data from search
  const [filteredResults, setFilteredResults] = useState([]);

  const backendPort = process.env.REACT_APP_BACKEND_PORT;

  // fetch ingredients from database
  const getIngredients = async () => {
    try {
      const response = await fetch(`http://localhost:${backendPort}/ingredients`)
      const jsonData = await response.json()
      setIngredients(jsonData);
    } catch (error) {
      console.error(error.message)
    }
  };


  // select ingredients for Filter component
  const handleIngredientClick = (ingredient) => {
    // check if ingredient is on filteredList
    if (!filteredList.includes(ingredient)) {
      getSelectedIngredients([...filteredList, ingredient])
      setIngredientsSearch('')
      setFilteredResults([]);
    }
  }


  const getIngredientsByCategory = (categoryID) => {
    return ingredients.map(ingredient => {
      if (ingredient.category_id === categoryID) {
        return (
          <button 
            key={ingredient.id} 
            onClick={() => handleIngredientClick(ingredient)}>
              {ingredient.name}
          </button>
          );
      }
      return null;
    })
  }


  // search ingredients
  const handleChange = e => {
    const searchValue = e.target.value;
    setIngredientsSearch(searchValue)
    
    // filter data based on search input
    const filteredSearchData = ingredients.filter((ingredient) => {
      return Object.values(ingredient).join('').toLowerCase().includes(ingredientsSearch.toLowerCase())
    })
    // update the search to the filtered data
    setFilteredResults(filteredSearchData)
  };

  // iterate over searchValue for dropdown search
  const filteredResultsArray = filteredResults.map(item => {
    return (<div key={item.id} onClick={() => handleIngredientClick(item)}className="dropdownSelect">
      {item.name}
    </div>
  )})

  // Render the message if no results are found
  const noResultsMessage = <div>Could not find ingredient</div>;


   useEffect(() => {
    getIngredients();
  }, []);


  return ( 
      <section className="ingredients">
        <div>
          <input 
            type="text" 
            placeholder="Search ingredients..."
            value={ingredientsSearch} 
            onChange={handleChange}>
          </input>
          <div className="dropdown">
            {ingredientsSearch && filteredResults.length > 0
            ? filteredResultsArray.slice(0, 5)
            : ingredientsSearch && noResultsMessage}
          </div>
        </div>
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

          <h4>Fish & Seafood</h4>
             {getIngredientsByCategory(6)}
        </div>
        
      </section>
  );
}

export default Ingredient;
