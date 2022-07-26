import React from "react";
import './CardPokemon.css'

export default function CardPokemon({ name, image, types}) {
    return (
        <div className="card">
            <h3>{name[0].toUpperCase() + name.slice(1)}</h3>
            {types?.map(t => {
                if(typeof t === 'object') return ( <h5>{`${t.name[0].toUpperCase() + t.name.slice(1)}`}</h5> )
                return (
                    <h5>{`${t[0].toUpperCase() + t.slice(1)}`}</h5>
                )
            })}
            <img src={image} alt='img not found' width='100px' height='125px' />
        </div>
    )
}