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


export function getPokemons() {
    return (dispatch) => {
        axios.get('http://localhost:3001/pokemons/')
            .then((json) => {
                return dispatch({
                    type: GET_POKEMONS,
                    payload: json.data,
                })
            })
            .catch(err => console.log(err)); 
    };
    // return async (dispatch) => {
    //     var json = await axios.get('http://localhost:3001/pokemons/')
    //     return dispatch({
    //         type: GET_POKEMONS,
    //         payload: json.data,
    //     });
    // };
};


export function getNamePokemons (name) {
    return async function(dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/pokemons?name=' + name);
            console.log(json.data);
            return dispatch({
                type: GET_NAME_POKEMONS,
                payload: json.data
            });
        } catch(err) {
            console.log(err);
        };
    };
};

export function postPokemons(payload) {
    return async function(dispatch) {
        const response = await axios.post('http://localhost:3001/pokemons', payload);
        return response;
    }
}

export function getTypes() {
    return async (dispatch) => {
        try {
            var types = await axios.get('http://localhost:3001/types')
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
            var json = await axios.get('http://localhost:3001/pokemons/' + id);
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
//             var pokemons = await axios.get('http://localhost:3001/pokemons?type=' + type);
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
//             var pokemonsOrdered = await axios.get('http://localhost:3001/pokemons?order=' + order);
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
            var json = await axios.delete(`http://localhost:3001/pokemons/${id}`);
            return dispatch({
                type: DELETE_POKEMON,
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    }
};



