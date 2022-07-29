import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPokemons, getTypes, filterByTypes, filterCreated, orderByName, orderByAttack } from "../../actions";
import CardPokemon from "../Card/CardPokemon";
import Paginated from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";
import s from './Home.module.css';


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
            <Link to='/pokemons'>Crear Pokemon</Link>
            <h1>PokeApp</h1>
            <button onClick={e => handleClick(e)}>Volver a cargar todos los pokemons</button>
            <div>
                <label>Name</label>
                <select onChange={(e) => handleOrderByName(e)}>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
                <label>Attack</label>
                <select onChange={(e) => handleOrderByAttack(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select onChange={(e) => handleFilterCreated(e)}>
                    <option value='All'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existentes</option>
                </select>
                <select onChange={(e) => handleFilterByTypes(e)}>
                    <option value='All'>All</option>
                    {
                        allTypes?.map(type => {
                            return (
                                <option value={type.name}> {type.name} </option>
                            )
                        })
                    }
                </select>
                <Paginated pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} />
                <SearchBar />
                {
                    !currentPokemons.length ? <h3>Cargando...</h3> : currentPokemons.map(p => {
                        return (
                            <fragment>
                                <Link to={`/home/${p.id}`}>
                                    <CardPokemon name={p.name} image={p.image} types={p.types} key={p.id} />
                                </Link>
                            </fragment>
                        )
                    })
                }
            </div>
        </div>
    )



}