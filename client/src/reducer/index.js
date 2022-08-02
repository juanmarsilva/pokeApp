
const initialState = {
    pokemons: [],
    types: [],
    allPokemons: [],
    pokemonDetails: []
};


function rootReducer(state=initialState, action) {
    switch(action.type) {
        case 'GET_POKEMONS': 
            return {
                ...state, 
                pokemons: action.payload,
                allPokemons: action.payload,
            };
        case 'GET_TYPES': 
            return {
                ...state,
                types: action.payload
            };
        case 'FILTER_BY_TYPES':
            return {
                ...state,
                pokemons: action.payload
            }
        case 'FILTER_CREATED':
            const allPokemons2 = state.allPokemons;
            const createdFiltered = action.payload === 'created' 
            ? allPokemons2.filter(pokemon => pokemon.createdInDb) 
            : allPokemons2.filter(pokemon => !pokemon.createdInDb)
            return {
                ...state,
                pokemons: action.payload === 'All' ? allPokemons2 : createdFiltered
            };
        case 'ORDER_BY_NAME': 
            let orderByNameArr = action.payload === 'asc' ?
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
        case 'ORDER_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
            }
        case 'ORDER_BY_ATTACK':
            let orderByAttackArr = action.payload === 'asc' ?
                state.pokemons.sort((a, b) => {
                    if(a.attack > b.attack) return 1;
                    if(b.attack > a.attack) return -1;
                    return 0;
                }) : 
                state.pokemons.sort((a, b) => {
                    if(a.attack > b.attack) return -1;
                    if(b.attack > a.attack) return 1;
                    return 0;
                });
            return {
                ...state, 
                pokemons: orderByAttackArr
            };
        case 'GET_NAME_POKEMONS': 
            return {
                ...state,
                pokemons: action.payload
            };
        case 'POST_POKEMON': 
            return {
                ...state
            }
        case 'GET_POKEMON_DETAILS':
            return {
                ...state,
                pokemonDetails: action.payload
            };
        case 'DELETE_POKEMON':
            return {
                ...state,
            };
        default: 
            return state;
    }
}

export default rootReducer;