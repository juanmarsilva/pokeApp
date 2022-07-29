import React, { useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePokemon, getPokemonDetails, getPokemons } from "../actions";

export default function PokemonDetails(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getPokemonDetails(props.match.params.id));
    }, [dispatch]);

    const handleDelete = (id, e) => {
        e.preventDefault();
        dispatch(deletePokemon(id));
        alert('Pokemon eliminado correctamente');
        history.push('/home');
        dispatch(getPokemons());
    };

    const pokemon = useSelector((state) => state.pokemonDetails)

    return (
        <div>
            {
                pokemon.length > 0
                ?   <div>
                        <h2>{pokemon[0]['name']}</h2>
                        <img src={pokemon[0]['image']} alt='img not found'></img>
                        <h3>{pokemon[0]['id']}</h3>
                        {pokemon[0]['types'].map(t => {
                           t.hasOwnProperty('name') ? <h3>{t.name}</h3> : <h3>{t}</h3>
                        })}
                        <h4>attack: {pokemon[0]['attack']}</h4>
                        <h4>defense: {pokemon[0]['defense']}</h4>
                        <h4>speed: {pokemon[0]['speed']}</h4>
                        <h4>height: {pokemon[0]['height']}</h4>
                        <h4>weight: {pokemon[0]['weight']}</h4>
                        <h4>hp: {pokemon[0]['hp']}</h4>
                        {pokemon[0].hasOwnProperty('createdInDb') ? <button onClick={(e) => handleDelete(pokemon[0]['id'], e)}>Eliminar</button> : <></>}
                    </div>
                : <h2>Loading..</h2>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
}
