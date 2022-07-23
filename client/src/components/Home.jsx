import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPokemons, getTypes, filterByTypes, filterCreated } from "../actions";
import CardPokemon from "./CardPokemon";
import Paginado from "./Paginado";


export default function Home() {

    const dispatch = useDispatch(); // esto reemplaza el mapDispatchToProps

    const allPokemons = useSelector((state) => state.pokemons); // esto es lo mismo que hacer el mapStateToProps()
    const allTypes = useSelector((state) => state.types);

    const [ currentPage, setCurrentPage ] = useState(1); // guardamos la pagina actual, y la inicializamos en 1
    const [ pokemonsPerPage, setPokemonsPerPage ] = useState(12); // guardamos la cantidad de pokemons por pagina
    const indexOfLastPokemon = currentPage * pokemonsPerPage; // 12 
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // 0 
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon); // aca se guardan los pokemons que van a ir en cada pagina

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

    return (
        <div>
            <Link to='/pokemons'>Crear Pokemon</Link>
            <h1>PokeApp</h1>
            <button onClick={e => handleClick(e)}>Volver a cargar todos los pokemons</button>
            <div>
                <select>
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
                                <option value={type.name}>{`${type.name}`}</option>
                            )
                        })
                    }
                </select>
                <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} />
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