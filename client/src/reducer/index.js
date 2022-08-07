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

    // if(type === FILTER_BY_TYPES) {
    //     return {
    //         ...state,
    //         pokemons: payload
    //     }
    // }

    if(type === FILTER_BY_TYPES) {
        const allPokemons = state.allPokemons;
        const filterPokemons = payload === 'All' ? allPokemons : allPokemons.filter(pokemon => pokemon.types.includes(payload));
        const pokemonsOfDb = allPokemons.filter(pokemon => pokemon.createdInDb);
        let filterPokemonsDb = [];
        let allPokemonsFiltered = [];
        if(pokemonsOfDb.length) {
            pokemonsOfDb.forEach(p => {
                if(payload === 'All') filterPokemonsDb = pokemonsOfDb;
                if(p.types[0] && p.types[1]) {
                    if(p.types[0]['name'] === payload || p.types[1]['name'] === payload) filterPokemonsDb.push(p);
                } else if(p.types[0]) {
                    if(p.types[0]['name'] === payload) filterPokemonsDb.push(p);
                };
            });
        };
        if(filterPokemonsDb.length) {
            allPokemonsFiltered = filterPokemons.concat(filterPokemonsDb);
            return {
                ...state,
                pokemons: allPokemonsFiltered,
            }
        };
        if(!filterPokemons.length) {
            return {
                ...state,
                pokemons: {msg: `IT WAS NOT FOUND ANY POKEMON OF ${payload.toUpperCase()} TYPE`}
            }
        } 
        return {
            ...state,
            pokemons: filterPokemons
        }
    }

    if(type === FILTER_CREATED) {
        const pokemonInDb = state.allPokemons.filter(p => p.createdInDb);
        if(payload === 'created' && !pokemonInDb.length) {
            return {
                ...state,
                pokemons: {msg: 'THERE ARE NO CREATED POKEMONS IN THE DATABASE YET'}
            }
        } 
        return {
            ...state,
            pokemons: payload === 'All' ? state.allPokemons : payload === 'created' ? state.allPokemons.filter(p => p.createdInDb) : state.allPokemons.filter(p => !p.createdInDb)
        }
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
        let orderByAttackArr = payload === 'asc' ?
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
        }
    }

    // if(type === ORDER_BY_ATTACK) {
    //     return {
    //         ...state,
    //         pokemons: payload,
    //     }
    // }

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