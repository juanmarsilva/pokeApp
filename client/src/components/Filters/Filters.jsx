import React from "react";
import s from './Filters.module.css';


export default function Filters({handleFilterCreated, handleFilterByTypes, allTypes}) {

    return (
        <div className={s.container}>
            <label className={s.label1}>Filter by origin:</label>
            <select className={s.select1} onChange={(e) => handleFilterCreated(e)}>
                <option value='All'>All</option>
                <option value='created'>Created</option>
                <option value='api'>Api</option>
            </select>
            <label className={s.label2}>Filter by type:</label>
            <select className={s.select2} onChange={(e) => handleFilterByTypes(e)}>
                    <option value='All'>All</option>
                    {
                        allTypes?.map(type => {
                            return (
                                <option value={type.name}> {type.name[0].toUpperCase() + type.name.slice(1)}</option>
                            )
                        })
                    }
                </select>
        </div>
    )

}