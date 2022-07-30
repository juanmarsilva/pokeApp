import React from "react";

export default function Orderings({handleOrderByName, handleOrderByAttack}) {

    return (
        <div>
            <label>Name</label>
            <select onChange={(e) => handleOrderByName(e)}>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
            </select>
            <label>Attack</label>
            <select onChange={(e) => handleOrderByAttack(e)}>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
        </div>
    )

}