import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, postPokemons } from "../../actions";
import Form from '../Form/Form';


export default function PokemonCreate() {

    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const history = useHistory();

    const [ input, setInput ] = useState({
        name: '',
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        image: '',
        types: []
    });


    const handleChange = (e) => {
        setInput({
            ...input, 
            [e.target.name]: e.target.value
        });
    };

    const handleSelect = (e) => {
        setInput({
            ...input, 
            types: [...input.types, e.target.value]
        });
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postPokemons(input));
        dispatch(getPokemons());
        alert('Personaje creado correctamente!');
        setInput({
            name: '',
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            image: '',
            types: []
        });
        history.push('/home');
    };

    const handleDelete = (type, e) => {
        e.preventDefault();
        setInput({
            ...input,
            types: input.types.filter(t => t !== type)
        })
    }

    useEffect(()=> {
        dispatch(getTypes());
    }, []);

    return (
        <div>
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            <h1>Crea tu Pokemon</h1>
            <Form handleSubmit={handleSubmit} handleChange={handleChange} handleSelect={handleSelect} handleDelete={handleDelete} input={input} types={types}/>
        </div>
    )

}