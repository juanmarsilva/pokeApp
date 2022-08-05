import React from "react";
import s from './Orderings.module.css';

export default function Orderings({handleOrderByName, handleOrderByAttack}) {

    return (
        <div className={s.container}>
            <label className={s.label1}>ORDER BY NAME:</label>
            <select onChange={(e) => handleOrderByName(e)} className={s.select1}>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
            </select>
            <label className={s.label2}>ORDER BY ATTACK:</label>
            <select onChange={(e) => handleOrderByAttack(e)} className={s.select2}>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
            </select>
        </div>
    )

}