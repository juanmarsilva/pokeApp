import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreatePokemon from './components/CreatePokemon';
import PokemonDetails from './components/PokemonDetails'

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
