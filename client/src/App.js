import Navigation from './components/Navigation';
import Ingredient from './components/Ingredient';
import Recipe from './components/Recipe';
import Filter from './components/Filter';
import './App.css';
import Preference from './components/Preference';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <main className="container">
              <Ingredient />
              <div className="container-center">
                <Preference />
                <Recipe />
              </div>
              <Filter />
            </main> 
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
