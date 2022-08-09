import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../../actions";
import { IoSearchSharp } from 'react-icons/io5';
import s from './SearchBar.module.css';

export default function SearchBar() {

    const dispatch = useDispatch();

    const [ name, setName ] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNamePokemons(name));
        setName('');
        
    };

    return (
        <div className={s.container}>
            <IoSearchSharp color="white" className={s.icon} onClick={(e) => {handleSubmit(e)}}/>
            <input className={s.searchInput} type='text' placeholder='Search..' onChange={(e) => handleInputChange(e)} value={name} />
        </div>
    )
}
