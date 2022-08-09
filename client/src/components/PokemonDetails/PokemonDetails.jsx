import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePokemon, getPokemons } from "../../actions";
import axios from "axios";
import Loader from "../Loader/Loader";
import s from './PokemonDetails.module.css';



export default function PokemonDetails() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [ pokemonDetail, setPokemonDetail ] = useState(undefined);
    

    useEffect(async () => {
        var json = await axios.get('/pokemons/' + id);
        setPokemonDetail(json.data);
    }, []);

    const handleDeletePokemon = (id, e) => {
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
    
        <div className={!pokemonDetail[0].hasOwnProperty('createdInDb') ? `${s.container} ${s.api}` : s.container}>

            <h2 className={s.name}>{pokemonDetail[0]['name'].toUpperCase()}</h2>
            
            <img src={pokemonDetail[0]['image']} alt='img not found' width='200px' className={s.image} ></img>

            <div className={s.types}>
                {pokemonDetail[0]['types'].map(t => t.hasOwnProperty('name') ? <div className={`${s.containerTypes} ${s[t['name']]}`}><span>{t.name.toUpperCase()}</span></div> : <div className={`${s.containerTypes} ${s[t]}`}><span>{t.toUpperCase()}</span></div> )}
            </div>

            <div  className={s.height}>
                <span>HEIGHT</span>
                <hr />
                {
                    pokemonDetail[0].hasOwnProperty('createdInDb') 
                    ? <span>{pokemonDetail[0]['height']}</span>
                    : <span>{pokemonDetail[0]['height']/10}m</span>
                }
            </div>

            <div className={s.weight}>
                <span>WEIGHT</span>
                <hr />
                {
                    pokemonDetail[0].hasOwnProperty('createdInDb') 
                    ? <span>{pokemonDetail[0]['weight']}</span>
                    : <span>{pokemonDetail[0]['weight']/10}Kg</span>
                }
            </div>
        
            <div className={s.hp}>
                <span >HP</span>
                <span>{pokemonDetail[0]['hp']}</span>
            </div>
            <input type='range' className={s.inputHp} value={pokemonDetail[0]['hp']} max='500'></input>

            <div className={s.attack}>
                <span>ATTACK</span>
                <span> {pokemonDetail[0]['attack']} </span>
            </div>
            <input type='range' className={s.inputAttack} value={pokemonDetail[0]['attack']} max='500'></input>

            <div  className={s.defense}>
                <span>DEFENSE</span>
                <span> {pokemonDetail[0]['defense']}</span>
            </div>
            <input type='range' className={s.inputDefense} value={pokemonDetail[0]['defense']} max='500'></input>

            <div className={s.speed}>
                <span >SPEED</span>
                <span>{pokemonDetail[0]['speed']}</span>
            </div>
            <input type='range' className={s.inputSpeed} value={pokemonDetail[0]['speed']} max='500'></input>


            {
                pokemonDetail[0].hasOwnProperty('createdInDb') 
                ? <div className={s.created}><span>CREATED IN DATABASE</span></div>
                : <div className={s.id}><span className={s.spanId}>{`#${pokemonDetail[0]['id']}`}</span></div>
            }

            
            {
                pokemonDetail[0].hasOwnProperty('createdInDb') 
                    ? <button className={s.deleteBtn} onClick={(e) => handleDeletePokemon(pokemonDetail[0]['id'], e)}>DELETE</button> 
                    : <></>
            }
            
            <Link to='/home'>
                <button className={s.returnBtn}>RETURN</button>
            </Link>
        </div>
        
    )
}
