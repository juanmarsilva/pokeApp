import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Home from './Home';
import {store} from '../../store/index'
import { BrowserRouter } from "react-router-dom";



describe('<Home />', ()=>{
    it('renderiza Create Pokemons', () => {
        render(<Provider store={store}><BrowserRouter><Home/></BrowserRouter></Provider>)
        const text = screen.getByText('CREATE');
        expect(text).toBeInTheDocument();
    });
    it('renderiza los componentes de Ordenamientos', () => {
        render(<Provider store={store}><BrowserRouter><Home/></BrowserRouter></Provider>)
        const text1 = screen.getByText('ORDER BY ATTACK:');
        const text2 = screen.getByText('ORDER BY NAME:');
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
    it('renderiza los componentes de Filtros', () => {
        render(<Provider store={store}><BrowserRouter><Home/></BrowserRouter></Provider>)
        const text1 = screen.getByText('FILTER BY TYPE:');
        const text2 = screen.getByText('FILTER BY ORIGIN:');
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();
    });
    it('renderiza un boton para recargar', () => {
        render(<Provider store={store}><BrowserRouter><Home/></BrowserRouter></Provider>)
        const text = screen.getByText('RECHARGE');
        expect(text).toBeInTheDocument();
    });
})