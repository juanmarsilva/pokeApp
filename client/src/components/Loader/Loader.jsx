import React from "react";
import s from './Loader.module.css'

export default function Loader() {
    return (
        <div className={s.container} >
            <div className={s.pokeball}>
                <div className={s.pokeball__button}></div>
            </div>
        </div>
    )

}