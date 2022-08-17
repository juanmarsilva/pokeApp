import React from "react";
import s from './Paginated.module.css';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';

export default function Paginado({ pokemonsPerPage, allPokemons, paginado, handleNext, handlePrevious, currentPage}) {
    
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className={s.nav}>
            <ImArrowLeft2 color="white" size='25px' onClick={(e) => handlePrevious(e, currentPage)} className={s.previous} />
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
            <ImArrowRight2 color="white" size='25px' onClick={(e) => handleNext(e, currentPage)} className={s.next} />
        </nav>
    )
}