import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Home from './Home';
import {store} from '../../store/index'
import { BrowserRouter } from "react-router-dom";
import CreatePokemon from '../CreatePokemon/CreatePokemon';


describe('<Home />', ()=>{
    it('renderiza Create Pokemons', () => {
        render(<Provider store={store}><BrowserRouter><Home/></BrowserRouter></Provider>)
        const text = screen.getByText('Create Pokemons');
        expect(text).toBeInTheDocument();
    });
    it('renderiza los componentes de Ordenamientos', () => {
        render(<Provider store={store}><BrowserRouter><Home/></BrowserRouter></Provider>)
        const text1 = screen.getByText('Order by attack:');
        const text2 = screen.getByText('Order by name:');
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
    it('renderiza los componentes de Filtros', () => {
        render(<Provider store={store}><BrowserRouter><Home/></BrowserRouter></Provider>)
        const text1 = screen.getByText('Filter by type:');
        const text2 = screen.getByText('Filter by origin:');
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
    it('renderiza un boton para recargar', () => {
        render(<Provider store={store}><BrowserRouter><Home/></BrowserRouter></Provider>)
        const text = screen.getByText('Recharge Pokemons');
        expect(text).toBeInTheDocument();
    });
})