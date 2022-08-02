import React from "react";
import s from './Paginated.module.css';

export default function Paginado({ pokemonsPerPage, allPokemons, paginado}) {
    
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className={s.container}>
                {
                    pageNumbers?.map(number => {
                        return (
                            <li key={number}>    
                                <a className={s.number} onClick={() => paginado(number)}>{number}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}