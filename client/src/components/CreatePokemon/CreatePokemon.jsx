import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, postPokemons } from "../../actions";
import Form from '../Form/Form';
import s from './CreatePokemon.module.css';


const validate = (input, boolean) => {
    let errors = {};

    if(boolean === true) {
        errors.name = 'That Pokemon already exists' 
    };
    
    if(!input.name) {
        errors.name = 'A name is required'
    };

    if(input.types.length === 0) {
        errors.types = 'You have to select at least one type';
    } else if(input.types.length > 2) {
        errors.types = 'You cannot choose more than two types';
    };

    if(input.height > 1000) {
        errors.height = 'Maximum 1000 meters';
    } else if(input.height < 0) {
        errors.height = 'Negative values are not allowed'
    }

    if(input.weight > 10000) {
        errors.weight = 'Maximum 10,000Kg';
    }  else if(input.weight < 0) {
        errors.weight = 'Negative values are not allowed'
    }

    return errors;
}

export default function PokemonCreate() {

    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const allPokemons = useSelector((state) => state.allPokemons);
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

    const [ errors, setErrors ] = useState({});

    const handleChange = (e) => {
        setInput({
            ...input, 
            [e.target.name]: e.target.value
        });
        const repeatPokemon = allPokemons.find(p => p.name.toLowerCase() === input.name.toLowerCase()) ? true : false
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }, repeatPokemon));
    };

    const handleSelect = (e) => {
        setInput({
            ...input, 
            types: [...input.types, e.target.value]
        });
        setErrors(validate({
            ...input,
            types: [...input.types, e.target.value]
        }));
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postPokemons(input));
        dispatch(getPokemons());
        alert('Pokemon creado correctamente!');
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
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <div className={s.container}>
            <Form handleSubmit={handleSubmit} handleChange={handleChange} handleSelect={handleSelect} handleDelete={handleDelete} input={input} types={types} errors={errors} />
        </div>
    )

}