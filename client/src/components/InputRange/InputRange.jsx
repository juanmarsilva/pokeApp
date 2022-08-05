import React from "react";
import s from './InputRange.module.css'

export default function InputRange({handleChange, value, name}) {

    return (
        <div className={s.input}>
            <span htmlFor={name}>{`${name.toUpperCase()}: ${value}`}</span>
            <input className={s.range} type='range' min='0' max='500' value={value} name={name} onChange={(e) => handleChange(e)} />
        </div>  
    )

}