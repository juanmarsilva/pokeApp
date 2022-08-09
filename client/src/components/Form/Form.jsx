import React from "react";
import { Link } from "react-router-dom";
import InputRange from "../InputRange/InputRange";
import s from './Form.module.css';
import { IoClose } from 'react-icons/io5';

export default function Form({handleSelect, handleChange, handleSubmit, handleDelete, input, types, errors}) {

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={s.form}>
            
            <div className={s.title}>
                <h1>CREATE YOUR POKEMON</h1>
            </div>

            <div className={s.containerName}>
                <label className={s.name}>INSERT NAME:</label>
                <input type='text' name='name' value={input.name} className={errors.name ? `${s.inputName} ${s.inputError}` : `${s.inputName}`} onChange={(e) => handleChange(e)} />
                <span className={s.errorName}>{errors?.name}</span>
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

                <div className={!errors.types ? s.selectTypes : `${s.selectTypes} ${s.inputError}`}>
                    <select onChange={(e) => handleSelect(e)} disabled={input.types.length === 2 ? true : false}>
                        {
                            types?.map(type => {
                                return (
                                    <option value={type.name} > {type} </option>
                                )
                            })
                        }
                    </select>
                </div>

                <span className={s.errorTypes}>{errors?.types}</span>

            </div>

            <div className={s.typesSelected}>

                <ul>
                    {input.types.map(type => {
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

                <button type="submit" disabled={errors.name || errors.weight || errors.height || errors.types ? true : false}>CREATE</button>

            </div>

            <div className={s.containerImage}>
                <img className={s.image} src={input.image} width='200px'/>
            </div>
            
        </form>
    )
}