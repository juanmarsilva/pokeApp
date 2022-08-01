import React from "react";

export default function InputRange({handleChange, value, name}) {

    return (
        <div>
            <label htmlFor={name}>{`${name}: ${value}`}</label>
            <input type='range' min='0' max='500' value={value} name={name} onChange={(e) => handleChange(e)} />
        </div>  
    )

}