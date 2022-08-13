import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from './EditPokemon.module.css';
import { Link, useHistory } from "react-router-dom";
import InputRange from "../InputRange/InputRange";
import { IoClose } from 'react-icons/io5';
import { editPokemon, getPokemons } from "../../actions";

const validate = (input) => {
    let errors = {};
    
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
    };

    if(input.weight > 10000) {
        errors.weight = 'Maximum 10,000Kg';
    }  else if(input.weight < 0) {
        errors.weight = 'Negative values are not allowed'
    };

    return errors;
}


export default function EditPokemon({id, pokemonDetail}) {

    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const history = useHistory();


    const [ dataPrev, setDataPrev ] = useState({
        name: pokemonDetail[0]['name'],
        hp: pokemonDetail[0]['hp'],
        attack: pokemonDetail[0]['attack'],
        defense: pokemonDetail[0]['defense'],
        speed: pokemonDetail[0]['speed'],
        weight: pokemonDetail[0]['weight'],
        height: pokemonDetail[0]['height'],
        image: pokemonDetail[0]['image'],
        types: pokemonDetail[0]['types'].map(t => t.name)
    });

    const [input, setInput] = useState({
        attack: dataPrev.attack,
        defense: dataPrev.defense,
        speed: dataPrev.speed,
        hp: dataPrev.hp,
        weight: parseFloat(dataPrev.weight),
        height: parseFloat(dataPrev.height),
        image: dataPrev.image,
        types: dataPrev.types,
    });

    const [ errors, setErrors ] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

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

    const handleDelete = (type, e) => {
        e.preventDefault();
        setInput({
            ...input,
            types: input.types.filter(t => t !== type)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editPokemon(id, input))
        dispatch(getPokemons());
        alert('Pokemon editado correctamente!');
        setInput({
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

   

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={s.form}>
            
            <div className={s.title}>
                <h1>EDIT YOUR POKEMON</h1>
            </div>

            <div className={s.containerName}>
                <label className={s.name}>INSERT NAME: </label>
                <input type='text' name='name' value={dataPrev.name.toUpperCase()} className={s.inputName} placeholder={`${dataPrev.name.toUpperCase()}`} />
            </div>

            <div className={s.inputs}>
                <InputRange handleChange={handleChange} value={input.hp} name='hp' />
                <InputRange handleChange={handleChange} value={input.attack} name='attack' />
                <InputRange handleChange={handleChange} value={input.defense} name='defense' />
                <InputRange handleChange={handleChange} value={input.speed} name='speed' />
            </div>

            <div className={s.containerHeight}>
                
                <label className={s.height}>HEIGHT [m]: </label>
                <input className={errors.height ? `${s.inputWeight} ${s.inputError}` : `${s.inputHeight}`} type='number' value={input.height} name='height' onChange={(e) => handleChange(e)} />
                <span className={s.errorHeight}>{errors?.height}</span>
               
            </div>

            <div className={s.containerWeight}>  

                <span className={s.weight}>WEIGHT [Kg]: </span>
                <input className={errors.weight ? `${s.inputWeight} ${s.inputError}` : `${s.inputWeight}`} type='number' value={input.weight} name='weight' onChange={(e) => handleChange(e)} />
                <span className={s.errorWeight}>{errors?.weight}</span>

            </div>

            <div className={s.containerInputImage}>

                <label>IMAGEN:</label>
                <input type='url' value={input.image} name='image' onChange={handleChange} />

            </div>

            <div className={s.containerTypes}>

                <div className={s.types}>
                    <label>SELECT TYPES:</label>
                </div>

                <div className={ s.selectTypes }>
                    <select onChange={(e) => handleSelect(e)} disabled={input.types.length === 2 ? true : false}>
                        {
                            types.map(type => {
                                return (
                                    <option value={type} > {type} </option>
                                )
                            })
                        }
                    </select>
                </div>

                <span className={s.errorTypes}>{errors?.types}</span>        
                    
            </div>

            <div className={s.typesSelected}>

                <ul>
                    {input.types?.map(type => {
                        return (
                            <div className={`${s.divTypes} ${s[type]}`}>
                                <li className={s.liTypes}> {type} </li>
                                <IoClose className={s.deleteBtn} onClick={(e) => handleDelete(type, e)} color='white' />
                            </div>
                        )
                    })}
                </ul>

            </div>

            <div className={s.containerButton}>

                <Link to='/home'>
                    <button className={s.returnButton}>RETURN HOME</button>
                </Link>

                <button type="submit" disabled={errors.weight || errors.height || errors.types ? true : false}>EDIT</button>

            </div>

            <div className={s.containerImage}>
                <img className={s.image} src={input.image} width='200px'/>
            </div>
            
        </form>
    )

}
