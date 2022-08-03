import { GET_NAME_POKEMONS, GET_POKEMONS, GET_POKEMON_DETAILS, GET_TYPES, POST_POKEMON, DELETE_POKEMON, FILTER_BY_TYPES, FILTER_CREATED, ORDER_BY_ATTACK, ORDER_BY_NAME } from '../actions/index'

const initialState = {
    pokemons: [],
    types: [],
    allPokemons: [],
    pokemonDetails: []
};


function rootReducer(state=initialState, {type, payload}) {

    if(type === GET_POKEMONS) {
        return {
            ...state, 
            pokemons: payload,
            allPokemons: payload,
        };
    }

    if(type === GET_TYPES) {
        return {
            ...state,
            types: payload
        };
    }

    if(type === FILTER_BY_TYPES) {
        return {
            ...state,
            pokemons: payload
        }
    }

    if(type === FILTER_CREATED) {
        const allPokemons2 = state.allPokemons;
        const createdFiltered = payload === 'created' 
        ? allPokemons2.filter(pokemon => pokemon.createdInDb) 
        : allPokemons2.filter(pokemon => !pokemon.createdInDb)
        return {
            ...state,
            pokemons: payload === 'All' ? allPokemons2 : createdFiltered
        };
    }

    if(type === ORDER_BY_NAME) {
        let orderByNameArr = payload === 'asc' ?
            state.pokemons.sort((a, b) => {
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1;
                return 0;
            }) : 
            state.pokemons.sort((a, b) => {
                if(a.name > b.name) return -1;
                if(b.name > a.name) return 1;
                return 0;
            });
        return {
            ...state, 
            pokemons: orderByNameArr
        };
    }

    if(type === ORDER_BY_ATTACK) {
        return {
            ...state,
            pokemons: payload,
        }
    }

    if(type === GET_NAME_POKEMONS) {
        return {
            ...state,
            pokemons: payload
        };
    };

    if(type === POST_POKEMON) {
        return {
            ...state
        };
    };

    if(type === GET_POKEMON_DETAILS) {
        return {
            ...state,
            pokemonDetails: payload
        };
    };

    if(type === DELETE_POKEMON) {
        return {
            ...state,
        };
    }

    return state;
}

export default rootReducer;