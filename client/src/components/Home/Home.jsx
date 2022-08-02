import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPokemons, getTypes, filterByTypes, filterCreated, orderByName, orderByAttack } from "../../actions";
import Paginated from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";
import s from './Home.module.css';
import Filters from "../Filters/Filters";
import Orderings from "../Orderings/Orderings";
import CardsPokemon from "../Cards/CardsPokemon";
import Loader from "../Loader/Loader";


export default function Home() {

    const dispatch = useDispatch(); // esto reemplaza el mapDispatchToProps

    const allPokemons = useSelector((state) => state.pokemons); // esto es lo mismo que hacer el mapStateToProps()
    const allTypes = useSelector((state) => state.types);

    const [ currentPage, setCurrentPage ] = useState(1); // guardamos la pagina actual, y la inicializamos en 1
    const [ pokemonsPerPage, setPokemonsPerPage ] = useState(12); // guardamos la cantidad de pokemons por pagina
    const indexOfLastPokemon = currentPage * pokemonsPerPage; // 12 
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // 0 
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon); // aca se guardan los pokemons que van a ir en cada pagina
    const [ orden, setOrden ] = useState('');

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
        dispatch(getTypes());
    }

    function handleFilterByTypes(e) {
        dispatch(filterByTypes(e.target.value));
    };

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value));
    };

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    };

    function handleOrderByAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    return (
        <div>
            <div className={s.container}>
                <div className={s.pokeball}></div>
                <Orderings handleOrderByName={handleOrderByName} handleOrderByAttack={handleOrderByAttack}/>
                <Filters handleFilterCreated={handleFilterCreated} handleFilterByTypes={handleFilterByTypes} allTypes={allTypes} />
                <button onClick={e => handleClick(e)} className={s.pulse}>Recharge Pokemons</button>
                <Link to='/pokemons'><button>Create Pokemons</button></Link>
            </div>
            <SearchBar />   
            <div>
                <Paginated pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} />
            </div>
            <div>
                <CardsPokemon currentPokemons={currentPokemons}/>
            </div>
            <div>
                <Paginated pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} />
            </div>
        </div>
    )



}