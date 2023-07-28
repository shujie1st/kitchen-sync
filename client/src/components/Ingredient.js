import React, { useEffect, useState } from "react";


const Ingredient = () => {

  const [ingredients, setIngredients] = useState([]);

  const getIngredients = async () => {
    try {
      const response = await fetch('http://localhost:3001/ingredients')
      const jsonData = await response.json()
      console.log("jsonData: ", jsonData)
      setIngredients(jsonData);
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getIngredients();
  }, []);

  return ( 
      <section className="ingredients">
        <form>
          <input type="text" placeholder="Search ingredients"></input>
          <button>Search</button>
        </form>
        <div>
          <h4>Vegetables & Greens ID1</h4>
            <ul>
              {ingredients.map(ingredient => {
                if (ingredient.category_id === 1) {
                  return <li key={ingredient.id}>{ingredient.name}</li>;
                }
              })}
            </ul>
          <h4>Fruits ID2</h4>
            <ul>
              {ingredients.map(ingredient => {
                if (ingredient.category_id === 2) {
                  return <li key={ingredient.id}>{ingredient.name}</li>;
                }
              })}
            </ul>
          <h4>Dairy & Eggs ID3</h4>
            <ul>
              {ingredients.map(ingredient => {
                if (ingredient.category_id === 3) {
                  return <li key={ingredient.id}>{ingredient.name}</li>;
                }
              })}
            </ul>
          <h4>Dairy-Free & Meat Substitutes ID4</h4>
            <ul>
                {ingredients.map(ingredient => {
                  if (ingredient.category_id === 4) {
                    return <li key={ingredient.id}>{ingredient.name}</li>;
                  }
                })}
              </ul>   
          <h4>Meats & Poultry ID5</h4>
            <ul>
              {ingredients.map(ingredient => {
                if (ingredient.category_id === 5) {
                  return <li key={ingredient.id}>{ingredient.name}</li>;
                }
              })}
            </ul>
          <h4>Fish & Seafood ID6</h4>
            <ul>
              {ingredients.map(ingredient => {
                if (ingredient.category_id === 6) {
                  return <li key={ingredient.id}>{ingredient.name}</li>;
                }
              })}
            </ul>
        </div>
        
      </section>
  );
}

export default Ingredient;