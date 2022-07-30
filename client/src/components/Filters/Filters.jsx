import React from "react";

export default function Filters({handleFilterCreated, handleFilterByTypes, allTypes}) {

    return (
        <div>
            <select onChange={(e) => handleFilterCreated(e)}>
                <option value='All'>Todos</option>
                <option value='created'>Creados</option>
                <option value='api'>Existentes</option>
            </select>
            <select onChange={(e) => handleFilterByTypes(e)}>
                    <option value='All'>All</option>
                    {
                        allTypes?.map(type => {
                            return (
                                <option value={type.name}> {type.name} </option>
                            )
                        })
                    }
                </select>
        </div>
    )

}