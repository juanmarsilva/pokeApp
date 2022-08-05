import React from "react";
import { Link } from "react-router-dom";
import s from'./CardPokemon.module.css';

export default function CardPokemon({ name, image, types, id}) {

    return (
        <div className={s.container} key={id}>

            <img src={image} className={s.image} alt='img not found' width='200px' height='130px' />

            <Link className={s.link} to={`/home/${id}`}>
                <h3>{name.toUpperCase()}</h3>
            </Link>

            <div className={s.containerTypes}>
                {types?.map(t => {
                    if(typeof t === 'object') return (<div className={`${s.type} ${s[t.name]}`} ><span> {`${t.name.toUpperCase()}`} </span> </div> )
                    return (
                        <div className={`${s.type} ${s[t]}`} ><span> {`${t.toUpperCase()}`} </span> </div>
                    )
                })}
            </div>
            
        </div>
    )
}

