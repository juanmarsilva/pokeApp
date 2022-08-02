import React from "react";
import { Link } from "react-router-dom";
import s from'./CardPokemon.module.css';

export default function CardPokemon({ name, image, types, id}) {

    return (
        <div className={s.container}>
            <img src={image} className={s.image} alt='img not found' width='200px' height='130px' />
            <Link className={s.link} to={`/home/${id}`}>
                <h3>{name.toUpperCase()}</h3>
            </Link>
            <div className={s.containerTypes}>
                {types?.map(t => {
                    if(typeof t === 'object') return (<h5>{`${t.name[0].toUpperCase() + t.name.slice(1)}`}</h5> )
                    return (
                        <h5 className={s.types}>{`${t[0].toUpperCase() + t.slice(1)}`}</h5>
                    )
                })}
            </div>
        </div>
    )
}