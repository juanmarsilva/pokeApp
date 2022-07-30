import React from "react";

export default function Form({handleSelect, handleChange, handleSubmit, handleDelete, input, types}) {

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label>Nombre</label>
                <input type='text' value={input.name} name='name' onChange={handleChange}></input>
            </div>
            <div>
                <h3>Especificaciones</h3>
                <label>hp: {input.hp}</label>
                <input type='range' min='0' max='500' value={input.hp} name='hp' onChange={(e) => handleChange(e)}></input>
                <label>attack: {input.attack}</label>
                <input type='range' min='0' max='500' value={input.attack} name='attack' onChange={(e) => handleChange(e)}></input>
                <label>defense: {input.defense}</label>
                <input type='range' min='0' max='500' value={input.defense} name='defense' onChange={(e) => handleChange(e)}></input>
                <label>speed: {input.speed}</label>
                <input type='range' min='0' max='500' value={input.speed} name='speed' onChange={(e) => handleChange(e)}></input>
                <label>height: {input.height}cm</label>
                <input type='range' min='0' max='10000' value={input.height} name='height' onChange={(e) => handleChange(e)}></input>
                <label>weight: {input.weight}Kg</label>
                <input type='range' min='0' max='500' value={input.weight} name='weight' onChange={(e) => handleChange(e)}></input>
            </div>
            <div>
                <label>Imagen</label>
                <input type='url' value={input.image} name='image' onChange={handleChange}></input>
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
                                <button className="deleteBtn" onClick={(e) => handleDelete(type, e)}>X</button>
                            </div>
                        )
                    })}
                </ul>
            </div>
            <div>
                <button type="submit">Crear Pokemon</button>
            </div>
        </form>
    )
}