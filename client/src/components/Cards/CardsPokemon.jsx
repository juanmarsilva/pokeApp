import React from "react";
import Loader from "../Loader/Loader";
import CardPokemon from "../Card/CardPokemon";

export default function CardsPokemon({currentPokemons}) {

    return (
        <div>
           {
                !currentPokemons.length  ? <Loader /> : currentPokemons.map(p => {
                    return (
                        <CardPokemon name={p.name} image={p.image} types={p.types} key={p.id} id={p.id}/>
                    )
                })
            }   
        </div>
    )


}