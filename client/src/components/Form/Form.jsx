import React, { useState } from "react";
import InputRange from "../InputRange/InputRange";
import s from './Form.module.css';

export default function Form({handleSelect, handleChange, handleSubmit, handleDelete, input, types, errors}) {

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={s.form}>
            <div className={s.container}>
                <label>Nombre</label>
                <input type='text'  name='name' value={input.name} onChange={(e) => handleChange(e)} />
                {errors?.name}
            </div>
            <div className={s.container}>
                <InputRange handleChange={handleChange} value={input.hp} name='hp' />
                <InputRange handleChange={handleChange} value={input.attack} name='attack' />
                <InputRange handleChange={handleChange} value={input.defense} name='defense' />
                <InputRange handleChange={handleChange} value={input.speed} name='speed' />
            </div>
            <div className={s.container}>
                <label>Height: </label>
                <input type='number' value={input.height} name='height' onChange={(e) => handleChange(e)} />
                {errors?.height}
                
                <label>Weight: </label>
                <input type='number' value={input.weight} name='weight' onChange={(e) => handleChange(e)} />
                {errors?.weight}
            </div>
            <div className={s.container}>
                <label>Imagen</label>
                <input type='url' value={input.image} name='image' onChange={handleChange} />
            </div>
            <div>
                <h3>Types</h3>
                <select onChange={(e) => handleSelect(e)} disabled={input.types.length === 2 ? true : false}>
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
                                <button className="deleteBtn" onClick={(e) => handleDelete(type, e)}>X</button>
                            </div>
                        )
                    })}
                </ul>
                {errors?.types}
            </div>
            <div>
                <button type="submit" disabled={errors.name || errors.weight || errors.height ? true : false}>Crear Pokemon</button>
            </div>
        </form>
    )
}