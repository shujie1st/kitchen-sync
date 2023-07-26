import Navigation from './components/Navigation';
import Ingredient from './components/Ingredient';
import Recipe from './components/Recipe';
import Filter from './components/Filter';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <main className="container">
        <Ingredient />
        <Recipe />
        <Filter />
      </main> 
    </div>
  );
}

export default App;
