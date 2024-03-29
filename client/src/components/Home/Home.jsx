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
import { BsGithub } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';

const REPOSITORIO = 'https://github.com/juanmarsilva/pokeApp';
const WHATSAPP = 'https://api.whatsapp.com/send?phone=5492324498482&text=Hola!';

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
        e.preventDefault()
        dispatch(getPokemons())
        dispatch(getTypes())
            .then(() => changeLoaderState())
            .then(() => setCurrentPage(1))
    }

    function handleFilterByTypes(e) {
        setCurrentPage(1)
        dispatch(filterByTypes(e.target.value));
    };

    function handleFilterCreated(e) {
        setCurrentPage(1);
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
        }, 4000)
    };

    function handleNext(e, number) {
        e.preventDefault();
        const pages = Math.ceil(allPokemons.length/pokemonsPerPage);
        if(currentPage !== pages) {
            setCurrentPage(number + 1)
        };
    };

    function handlePrevious(e, number) {
        e.preventDefault();
        const pages = Math.ceil(allPokemons.length/pokemonsPerPage);
        if(currentPage !== 1) {
            setCurrentPage(number - 1)
        };
    };

    return (
        <>
            {
                loader 
                ? <Loader key='loader'/>  
                :   <div>
                        <div className={s.container}>

                            <div className={s.pokeball} key='pokeball'></div>

                            <div className={s.filters}>
                                <Orderings handleOrderByName={handleOrderByName} handleOrderByAttack={handleOrderByAttack} key='orderings '/>

                                <Filters handleFilterCreated={handleFilterCreated} handleFilterByTypes={handleFilterByTypes} allTypes={allTypes} key='filters' />
                            </div>

                            <div className={s.menuBtns}>
                                <button onClick={e => handleClick(e)} className={s.pulse} key='recharge' >RECHARGE</button>

                                <Link to='/pokemons'><button key='create' >CREATE</button></Link>
                            </div>

                        </div>

                        <SearchBar key='searchbar' />   

                        <div>
                            {
                                allPokemons.length 
                                ? <Paginated currentPage={currentPage} pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} key='paginated' handlePrevious={handlePrevious} handleNext={handleNext} />
                                : <></>
                            }
                        </div>

                        {
                            allPokemons.hasOwnProperty('msg') 
                                ? <span className={s.msg}>{allPokemons.msg}</span> 
                                :   <div>
                                        <CardsPokemon currentPokemons={currentPokemons} key='cards' /> 
                                    </div>
                        }

                        <div className={s.social}>
                            <a href={REPOSITORIO}><BsGithub color="white" size='2rem' /></a>

                            <a href={WHATSAPP}><FaWhatsapp color="white" size='2rem' /></a>
                        </div>

                        <div className={s.bottomMenu}>
                            <Orderings handleOrderByName={handleOrderByName} handleOrderByAttack={handleOrderByAttack} key='orderings '/>

                            <Filters handleFilterCreated={handleFilterCreated} handleFilterByTypes={handleFilterByTypes} allTypes={allTypes} key='filters' />
                        </div>
                    </div>
            }
        </>
            
    )



}