import axios from 'axios';

export function getPokemons() {
    return async (dispatch) => {
        var json = await axios.get('http://localhost:3001/pokemons/');
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data,
        })
    }
}

export function getTypes() {
    return async (dispatch) => {
        var json = await axios.get('http://localhost:3001/types');
        console.log(json.data);
        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        });
    };
};

export function filterByTypes(payload) {
    return {
        type: 'FILTER_BY_TYPES',
        payload
    }
};

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
};