import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, postPokemons } from "../actions";

const validate = (input) => {
    let errors = {};
    if(!input.name) {
        errors.name = 'Se requiere un nombre!';
    } else if(input.hp < 0 || input.attack < 0 || input.defense < 0 || input.speed < 0 || input.height < 0 || input.weight < 0) {
        errors.errNegative = 'Los valores no pueden ser negativos'; 
    } else if(input.hp > 250 || input.attack > 250 || input.defense > 250 || input.speed > 250) {
        errors.errStats = 'No puede ser mayor a 250';
    } else if(input.height > 150) {
        errors.heigth = 'No puede medir mas de 150 metros!';
    } else if(input.weight > 1000) {
        errors.weight = 'No puede pesar mas de 1000Kg!';
    } else if(input.types.length === 0) {
        errors.types1 = 'Tienes que seleccionar un tipo!';
    } else if(input.types.length > 2) {
        errors.types2 = 'No puedes seleccionar mas de dos tipos!'
    };
    return errors;
};

//Me conviene deshabilitar el boton si hay algun valor en el objeto de errors!

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

    const [ errors, setErrors ] = useState({});

    const handleChange = (e) => {
        setInput({
            ...input, 
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
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

    const handleDelete = (type) => {
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
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input type='text' value={input.name} name='name' onChange={handleChange}></input>
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div>
                    <h3>Especificaciones</h3>
                    <label>hp: </label>
                    <input type='number' value={input.hp} name='hp' onChange={(e) => handleChange(e)}></input>
                    <label>attack: </label>
                    <input type='number' value={input.attack} name='attack' onChange={(e) => handleChange(e)}></input>
                    <label>defense: </label>
                    <input type='number' value={input.defense} name='defense' onChange={(e) => handleChange(e)}></input>
                    <label>speed: </label>
                    <input type='number' value={input.speed} name='speed' onChange={(e) => handleChange(e)}></input>
                    <label>height: </label>
                    <input type='number' value={input.height} name='height' onChange={(e) => handleChange(e)}></input>
                    <label>weight: </label>
                    <input type='number' value={input.weight} name='weight' onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Imagen</label>
                    <input type='text' value={input.image} name='image' onChange={handleChange}></input>
                </div>
                <div>
                    <h3>Types</h3>
                    <select onChange={(e) => handleSelect(e)}>
                        {
                            types?.map(type => {
                                return (
                                    <option value={type.name} > {type.name} </option>
                                )
                            })
                        }
                    </select>
                    <ul>
                        {input.types.map(type => {
                            return (
                                <div>
                                    <li>{type}</li>
                                    <button className="deleteBtn" onClick={() => handleDelete(type)}>X</button>
                                </div>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <button type="submit">Crear Pokemon</button>
                </div>
            </form>
        </div>
    )

}