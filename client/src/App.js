import Navigation from './components/Navigation';
import Ingredient from './components/Ingredient';
import Recipe from './components/Recipe';
import Filter from './components/Filter';
import './App.css';
import Preference from './components/Preference';

function App() {
  return (
    <div className="App">
      <Navigation />
      <main className="container">
        <Ingredient />
        <div className="container-center">
          <Preference />
          <Recipe />
        </div>
        <Filter />
      </main> 
    </div>
  );
}

export default App;
