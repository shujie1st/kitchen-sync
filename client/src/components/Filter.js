
function Filter(props){
  const { selectedIngredients } = props

 

  return ( 
      <section className="filters">
        Filter component
        {selectedIngredients}
      </section>
  );
}

export default Filter;