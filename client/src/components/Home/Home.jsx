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

    const dispatch = useDispatch(); 

    const allPokemons = useSelector((state) => state.pokemons); 
    const allTypes = useSelector((state) => state.types);

    const [ currentPage, setCurrentPage ] = useState(1); 
    const [ pokemonsPerPage, setPokemonsPerPage ] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage; 
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; 
    const currentPokemons = !allPokemons.hasOwnProperty('msg') ? allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : [];
    const [ orden, setOrden ] = useState('');
    const [ loader, setLoader ] = useState(false);

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
        dispatch(getTypes())
            .then(() => changeLoaderState())
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
    };

    function changeLoaderState() {
        setLoader(true);
        setTimeout(() => {
            setLoader(false)
        }, 3000)
    };

    if(allPokemons.hasOwnProperty('msg')) {
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
                <span className={s.msg}>POKEMON NOT FOUND..</span>
            </div>
        )
    }

    return (
        <>
            {
                loader 
                ? <Loader />  
                :   <div>
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
                    </div>
            }
        </>
            
    )



}