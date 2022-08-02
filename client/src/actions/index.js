import axios from 'axios';

export function getPokemons() {
    return async (dispatch) => {
        var json = await axios.get('http://localhost:3001/pokemons/');
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data,
        });
    };
};


export function getNamePokemons (name) {
    return async function(dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/pokemons?name=' + name);
            return dispatch({
                type: 'GET_NAME_POKEMONS',
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
        console.log(response);
        return response;
    }
}

export function getTypes() {
    return async (dispatch) => {
        var types = await axios.get('http://localhost:3001/types');
        return dispatch({
            type: 'GET_TYPES',
            payload: types.data
        });
    };
};


export function getPokemonDetails(id) {
    return async function(dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/pokemons/' + id);
            return dispatch({
                type: 'GET_POKEMON_DETAILS',
                payload: json.data
            });
        } catch (err) {
            console.log(err);
        };
    };
};

export function filterByTypes(type) {
    return async function(dispatch) {
        try {
            var pokemons = await axios.get('http://localhost:3001/pokemons?type=' + type);
            return dispatch({
                type: 'FILTER_BY_TYPES',
                payload: pokemons.data
            });
        } catch (err) {
            console.log(err);
        };
    };
};

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    };
};

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    };
};

export function orderByAttack(payload) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    };
};

export function orderByAtt(order) {
    return async function(dispatch) {
        try {
            var pokemonsOrdered = await axios.get('http://localhost:3001/pokemons?order=' + order);
            return dispatch({
                type: 'ORDER_POKEMONS',
                payload: pokemonsOrdered.data
            })
        } catch (err) {
            console.log(err); 
        }
    }
}

export function deletePokemon (id) {
    return async function(dispatch) {
        try {
            var json = await axios.delete(`http://localhost:3001/pokemons/${id}`);
            console.log(json.data);
            return dispatch({
                type: 'DELETE_POKEMON',
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    }
};


