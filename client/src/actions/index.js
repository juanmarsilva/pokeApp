import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_NAME_POKEMONS = 'GET_NAME_POKEMONS';
export const POST_POKEMON = 'POST_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const FILTER_BY_TYPES = 'FILTER_BY_TYPES';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_ATTACK = 'ORDER_BY_ATTACK';
export const GET_POKEMON_DETAILS = 'GET_POKEMON_DETAILS';
export const DELETE_POKEMON = 'DELETE_POKEMON';
export const EDIT_POKEMON = 'EDIT_POKEMON';

export function getPokemons() {
    return (dispatch) => {
        axios.get('/pokemons')
            .then((json) => {
                return dispatch({
                    type: GET_POKEMONS,
                    payload: json.data,
                })
            })
            .catch(err => console.log(err)); 
    };
};


export function getNamePokemons (name) {
    return async function(dispatch) {
        try {
            var json = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
            let specificPokemon = [];
            const pokemon = {
                id: json.data.id,
                name: json.data.name,
                image: json.data.sprites["other"]["dream_world"]['front_default'],
                types: json.data.types.map(t => t.type.name),
                attack: json.data.stats[1]['base_stat']
            }
            specificPokemon.push(pokemon);
            return dispatch({
                type: GET_NAME_POKEMONS,
                payload: specificPokemon
            })
        } finally {
            try {
                var json = await axios.get('/pokemons?name=' + name);
                return dispatch({
                    type: GET_NAME_POKEMONS,
                    payload: json.data
                });
            } catch(err) {
                console.log(err);
            }
        }
    };
};


export function postPokemons(payload) {
    return async function() {
        const response = await axios.post('/pokemons', payload);
        return response;
    }
}

export function getTypes() {
    return async (dispatch) => {
        try {
            var types = await axios.get('/types')
            return dispatch({
                type: GET_TYPES,
                payload: types.data
            })
        } catch(err) {
            console.log(err)
        }
    }
}


export function getPokemonDetails(id) {
    return async function(dispatch) {
        try {
            var json = await axios.get('/pokemons/' + id);
            return dispatch({
                type: GET_POKEMON_DETAILS,
                payload: json.data
            });
        } catch (err) {
            console.log(err);
        };
    };
};

// export function filterByTypes(type) {
//     return async function(dispatch) {
//         try {
//             var pokemons = await axios.get('/pokemons?type=' + type);
//             return dispatch({
//                 type: FILTER_BY_TYPES,
//                 payload: pokemons.data
//             });
//         } catch (err) {
//             console.log(err);
//         };
//     };
// };

export function filterByTypes(payload) {
    return {
        type: FILTER_BY_TYPES,
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    };
};

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    };
};


// export function orderByAttack(order) {
//     return async function(dispatch) {
//         try {
//             var pokemonsOrdered = await axios.get('/pokemons?order=' + order);
//             return dispatch({
//                 type: ORDER_BY_ATTACK,
//                 payload: pokemonsOrdered.data
//             })
//         } catch (err) {
//             console.log(err); 
//         }
//     }
// }

export function orderByAttack(payload) {
    return {
        type: ORDER_BY_ATTACK,
        payload
    };
};


export function deletePokemon (id) {
    return async function(dispatch) {
        try {
            var json = await axios.delete(`/pokemons/${id}`);
            return dispatch({
                type: DELETE_POKEMON,
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    }
};

export function editPokemon(id, payload) {
    return async function(dispatch) {
        try {
            var json = await axios.put(`/pokemons/${id}`, payload)
            return dispatch({
                type: EDIT_POKEMON,
                payload: json.data
            });
        } catch(err) {
            console.log(err);
        }
    }
}