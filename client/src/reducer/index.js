
const initialState = {
    pokemons: [],
    types: [],
    allPokemons: []
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
            const allPokemons = state.allPokemons;
            const filterPokemons = action.payload === 'All' ? allPokemons : allPokemons.filter(pokemon => pokemon.types.includes(action.payload));
            return {
                ...state,
                pokemons: filterPokemons,
            };
        case 'FILTER_CREATED':
            const allPokemons2 = state.allPokemons;
            const createdFiltered = action.payload === 'created' 
            ? allPokemons2.filter(pokemon => pokemon.createdInDb) 
            : allPokemons2.filter(pokemon => !pokemon.createdInDb)
            return {
                ...state,
                pokemons: action.payload === 'All' ? allPokemons2 : createdFiltered
            }
        default: 
            return state;
    }
}

export default rootReducer;