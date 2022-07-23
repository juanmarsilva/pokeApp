import React from "react";

export default function CardPokemon({ name, image, types}) {
    return (
        <div>
            <h3>{name}</h3>
            {types?.map(t => {
                return (
                    <h5>{`${t}`}</h5>
                )
            })}
            <img src={image} alt='img not found' width='100px' height='125px' />
        </div>
    )
}