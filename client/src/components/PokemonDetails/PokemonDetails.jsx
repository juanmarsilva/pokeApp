import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePokemon, getPokemonDetails, getPokemons } from "../../actions";
import axios from "axios";
import Loader from "../Loader/Loader";

export default function PokemonDetails(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [ pokemonDetail, setPokemonDetail ] = useState(undefined);

    useEffect( async () => {
        // dispatch(getPokemonDetails(props.match.params.id));
        var json = await axios.get('http://localhost:3001/pokemons/' + props.match.params.id);
        setPokemonDetail(json.data);
    }, []);

    const handleDelete = (id, e) => {
        e.preventDefault();
        dispatch(deletePokemon(id));
        alert('Pokemon eliminado correctamente');
        history.push('/home');
        dispatch(getPokemons());
    };

    if(!pokemonDetail) {
        return <Loader />
    }

    return (
        <div>
            
            <div>
                <h2>{pokemonDetail[0]['name']}</h2>
                <img src={pokemonDetail[0]['image']} alt='img not found'></img>
                <h3>{pokemonDetail[0]['id']}</h3>
                {pokemonDetail[0]['types'].map(t => {
                t.hasOwnProperty('name') ? <h3>{t.name}</h3> : <h3>{t}</h3>
                })}
                <h4>attack: {pokemonDetail[0]['attack']}</h4>
                <h4>defense: {pokemonDetail[0]['defense']}</h4>
                <h4>speed: {pokemonDetail[0]['speed']}</h4>
                <h4>height: {pokemonDetail[0]['height']}</h4>
                <h4>weight: {pokemonDetail[0]['weight']}</h4>
                <h4>hp: {pokemonDetail[0]['hp']}</h4>
                {pokemonDetail[0].hasOwnProperty('createdInDb') ? <button onClick={(e) => handleDelete(pokemonDetail[0]['id'], e)}>Eliminar</button> : <></>}
            </div>
            
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
}
