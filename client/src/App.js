import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import CreatePokemon from './components/CreatePokemon/CreatePokemon.jsx';
import PokemonDetails from './components/PokemonDetails/PokemonDetails.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/home/:id' component={PokemonDetails} />
          <Route path='/home' component={Home} />
          <Route path='/pokemons' component={CreatePokemon} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
